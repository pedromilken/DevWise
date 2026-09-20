#!/usr/bin/env node
/* DevWise - gerador de pacote de idioma.

   Uso:   node tools/gerar-idioma.js hi            gera src/lang-hi.js a partir do inglês
          node tools/gerar-idioma.js ja --from pt  usa o português como fonte
          node tools/gerar-idioma.js todos         gera todos os idiomas do estudo que ainda não têm pacote
          node tools/gerar-idioma.js revisar       repassa os 17 pacotes gerados: refaz só os blocos que o validador reprova
          node tools/gerar-idioma.js hi --mock     ensaio sem API (testa o encanamento)
          node tools/gerar-idioma.js romanizar     gera os mapas de romanização de zh, ja, ar e ur (src/rom-xx.js)
          node tools/gerar-idioma.js ja --romanizar   idem, para um idioma
          node tools/gerar-idioma.js avaliar       revisão de coesão, compreensão e naturalidade por um "editor nativo" (LLM); gera tools/relatorio-qualidade.md
          node tools/gerar-idioma.js ko --avaliar  idem, para um idioma
          node tools/gerar-idioma.js pos-edicao    reaplica tools/pos-edicao.json em todos os pacotes (sem API)

   tools/estilo.json      forma de tratamento por idioma e notas de tradução (entra no prompt e reprova blocos fora do padrão)
   tools/pos-edicao.json  correções manuais, reaplicadas ao fim de cada geração

   Provedor (variáveis de ambiente; nada é lido de arquivos .env, de propósito):
     ANTHROPIC_API_KEY                                   usa a API da Anthropic
     OPENAI_API_KEY [+ OPENAI_BASE_URL]                  qualquer API compatível (OpenAI, DeepSeek, Qwen, Ollama)
     DEVWISE_MODEL                                       nome do modelo (padrão: claude-sonnet-5 ou gpt-4o-mini)
     DEVWISE_THINKING                                    "on" religa o modo de raciocínio do DeepSeek (padrão: desligado, para não pagar raciocínio)
     DEVWISE_PARALLEL                                    blocos simultâneos (padrão: 4)
     DEVWISE_MAX_TOKENS                                  teto de saída por bloco (padrão: 16000)

   O que o script garante antes de gravar: mesmas chaves da fonte, mesmos tamanhos de lista, marcadores {x}
   preservados, ordem das opções preservada (a primeira é a correta) e escrita esperada presente no texto.
   O que ele NÃO garante: naturalidade e correção pedagógica. Revise com um falante antes de publicar. */
const fs = require("fs"), path = require("path"), crypto = require("crypto");
const root = path.join(__dirname, ".."), srcDir = path.join(root, "src"), cacheDir = path.join(__dirname, "cache");
const args = process.argv.slice(2), mock = args.includes("--mock");
const from = args.includes("--from") ? args[args.indexOf("--from") + 1] : "en";
const target = args.find(a => !a.startsWith("--") && a !== from) || "";

/* carrega dados e pacotes existentes, como o tests.js faz */
global.four = undefined;
const files = ["data.js", "game.js", ...fs.readdirSync(srcDir).filter(f => /^lang-.*\.js$/.test(f) && !f.includes(".mock."))];
const code = files.map(f => fs.readFileSync(path.join(srcDir, f), "utf8")).join("\n").replace('"use strict";', "");
const { LANG, STUDY_LANGS } = new Function(code + ";return {LANG, STUDY_LANGS};")();

const ESTILO = JSON.parse(fs.readFileSync(path.join(__dirname, "estilo.json"), "utf8")), POS = JSON.parse(fs.readFileSync(path.join(__dirname, "pos-edicao.json"), "utf8"));
const SCRIPT_RE = { Han: /[\u4e00-\u9fff]/, Devanagari: /[\u0900-\u097f]/, Arabic: /[\u0600-\u06ff]/, Bengali: /[\u0980-\u09ff]/, Cyrillic: /[\u0400-\u04ff]/,
  Kana: /[\u3040-\u30ff\u3005\u4e00-\u9fff]/, Telugu: /[\u0c00-\u0c7f]/, Tamil: /[\u0b80-\u0bff]/, Hangul: /[\uac00-\ud7af]/, Gurmukhi: /[\u0a00-\u0a7f]/ };

function placeholders(s) { return (String(s).match(/\{[a-z]\}/g) || []).sort().join(","); }
function validate(a, b, where, errs) {
  if (typeof a === "string") { if (typeof b !== "string" || !b.trim()) errs.push(where + ": vazio ou tipo errado"); else if (placeholders(a) !== placeholders(b)) errs.push(where + ": marcadores {x} diferentes"); return; }
  if (Array.isArray(a)) { if (!Array.isArray(b) || a.length !== b.length) { errs.push(where + ": tamanho de lista"); return; } a.forEach((x, i) => validate(x, b[i], where + "[" + i + "]", errs)); return; }
  if (a && typeof a === "object") { if (!b || typeof b !== "object") { errs.push(where + ": objeto ausente"); return; }
    for (const k of Object.keys(a)) validate(a[k], b[k], where + "." + k, errs);
    for (const k of Object.keys(b)) if (!(k in a)) errs.push(where + "." + k + ": chave inventada"); }
}

let jsonMode = true, noThink = (process.env.DEVWISE_THINKING || "off").toLowerCase() !== "on";
const PARALLEL = Math.max(1, +(process.env.DEVWISE_PARALLEL || 4));
const usage = { in: 0, out: 0, think: 0 }, MAXTOK = +(process.env.DEVWISE_MAX_TOKENS || 16000);
/* Detecta tradução que não aconteceu: valores longos idênticos à fonte e, em escritas não latinas, texto sem a escrita esperada. */
const KEEP = /(^|\.)(provAnthropic|provOpenAI|t3\.title|hardcore)$/;
function untranslated(a, b, where, meta, errs) {
  if (typeof a === "string") { if (typeof b !== "string") return; const latin = meta.script === "Latin", re = SCRIPT_RE[meta.script];
    if (KEEP.test(where) || a.length <= 12) return;
    if (a === b && (!latin || a.length > 40)) errs.push(where + ": ficou em inglês");
    else if (re && a.length > 40 && !re.test(b)) errs.push(where + ": sem a escrita " + meta.script);
    return; }
  if (a && typeof a === "object") for (const k of Object.keys(a)) untranslated(a[k], (b || {})[k], where + "." + k, meta, errs);
}
/* Preferências de estilo (não bloqueiam): forma de tratamento em qualquer texto e termos do glossário nos textos cuja fonte contém a palavra. */
const STYLE_OFF = new Set();
function styleHits(src, out, code) { if (STYLE_OFF.has(code)) return 0; const st = ESTILO[code] || {}, reg = st.evitar ? new RegExp(st.evitar, "u") : null; let n = 0;
  const gl = Object.entries(st.glossario || {}).filter(([, v]) => v[1]).map(([term, v]) => [new RegExp("\\b" + term, "i"), new RegExp(v[1], "iu")]);
  (function w(a, b) { if (typeof b === "string") { if (reg && reg.test(b)) n++; else if (typeof a === "string") for (const [ts, bad] of gl) if (ts.test(a) && bad.test(b)) { n++; break; } }
    else if (b && typeof b === "object") for (const k in b) w(a && a[k], b[k]); })(src, out); return n; }
function applyPostEdits(code, file) { const list = POS[code]; if (!list || !fs.existsSync(file)) return 0; let s = fs.readFileSync(file, "utf8"), n = 0;
  for (const [a, b] of list) if (s.includes(a)) { s = s.split(a).join(b); n++; } if (n) fs.writeFileSync(file, s); return n; }
async function callLLM(prompt) {
  const model = process.env.DEVWISE_MODEL;
  if (process.env.ANTHROPIC_API_KEY) {
    const r = await fetch("https://api.anthropic.com/v1/messages", { method: "POST", headers: { "content-type": "application/json", "x-api-key": process.env.ANTHROPIC_API_KEY, "anthropic-version": "2023-06-01" },
      body: JSON.stringify({ model: model || "claude-sonnet-5", max_tokens: MAXTOK, messages: [{ role: "user", content: prompt }] }) });
    if (!r.ok) throw new Error("Anthropic HTTP " + r.status + " " + (await r.text()).slice(0, 200));
    const d = await r.json(); if (d.usage) { usage.in += d.usage.input_tokens || 0; usage.out += d.usage.output_tokens || 0; }
    return d.content.map(c => c.text || "").join("");
  }
  if (process.env.OPENAI_API_KEY || process.env.OPENAI_BASE_URL) {
    const base = (process.env.OPENAI_BASE_URL || "https://api.openai.com/v1").replace(/\/+$/, ""), hd = { "content-type": "application/json" };
    if (process.env.OPENAI_API_KEY) hd.authorization = "Bearer " + process.env.OPENAI_API_KEY;
    const body = { model: model || "gpt-4o-mini", max_tokens: MAXTOK, messages: [{ role: "user", content: prompt }] };
    if (jsonMode) body.response_format = { type: "json_object" };
    /* DeepSeek V4 "pensa" por padrão e cobra o raciocínio como saída (5x mais tokens numa tradução). Desligado, salvo DEVWISE_THINKING=on. */
    if (noThink && /deepseek/i.test(base + " " + body.model)) body.thinking = { type: "disabled" };
    let r = await fetch(base + "/chat/completions", { method: "POST", headers: hd, body: JSON.stringify(body) });
    if (r.status === 400 && body.thinking) { noThink = false; delete body.thinking; r = await fetch(base + "/chat/completions", { method: "POST", headers: hd, body: JSON.stringify(body) }); }
    if (r.status === 400 && jsonMode) { jsonMode = false; delete body.response_format; r = await fetch(base + "/chat/completions", { method: "POST", headers: hd, body: JSON.stringify(body) }); }
    if (r.status === 429 || r.status >= 500) { await new Promise(z => setTimeout(z, 8000)); r = await fetch(base + "/chat/completions", { method: "POST", headers: hd, body: JSON.stringify(body) }); }
    if (!r.ok) throw new Error("HTTP " + r.status + " " + (await r.text()).slice(0, 200));
    const d = await r.json(); if (d.usage) { usage.in += d.usage.prompt_tokens || 0; usage.out += d.usage.completion_tokens || 0; usage.think += (d.usage.completion_tokens_details || {}).reasoning_tokens || 0; }
    return d.choices[0].message.content;
  }
  throw new Error("Defina ANTHROPIC_API_KEY ou OPENAI_API_KEY (ou use --mock).");
}
function mockTranslate(o, tag) { if (typeof o === "string") return "[" + tag + "] " + o; if (Array.isArray(o)) return o.map(x => mockTranslate(x, tag)); const r = {}; for (const k in o) r[k] = mockTranslate(o[k], tag); return r; }

function cachePath(name, chunk, meta) { const key = crypto.createHash("sha256").update(JSON.stringify([meta.code, from, process.env.DEVWISE_MODEL || "", chunk])).digest("hex").slice(0, 24); return path.join(cacheDir, meta.code + "-" + name + "-" + key + ".json"); }
async function translateChunk(name, chunk, meta) {
  const cf = cachePath(name, chunk, meta);
  if (!mock && fs.existsSync(cf)) { let c = JSON.parse(fs.readFileSync(cf, "utf8")); const aceito = c && c.__aceito; if (aceito) c = c.data; const e = [];
    validate(chunk, c, name, e); if (from === "en") untranslated(chunk, c, name, meta, e); if (!e.length && !aceito && styleHits(chunk, c, meta.code)) e.push(name + ": tratamento ou termo fora do guia de estilo");
    if (!e.length) return c; console.log("\n   cache reprovado em " + name + " (" + e[0] + "); gerando de novo"); }
  if (mock) return mockTranslate(chunk, meta.code);
  const prompt = `You are localising DevWise, an educational game that teaches programming and software engineering to adult beginners through real-world stories and everyday analogies.
Rewrite every string VALUE of the JSON below in ${meta.en} (${meta.native}, script: ${meta.script}). Compose each sentence the way a native speaker and teacher would say it; do not translate word for word.
${[...(ESTILO.geral || []), (ESTILO[meta.code] || {}).tratamento, ...Object.entries((ESTILO[meta.code] || {}).glossario || {}).map(([k, v]) => "Glossary: always translate '" + k + "' as " + v[0] + ".")].filter(Boolean).map(x => "- " + x).join("\n")}
Rules:
- Return ONLY valid JSON with exactly the same keys, nesting and array lengths. Never translate keys.
- Keep array order untouched: in "opts" arrays the FIRST option is the correct answer and must stay first.
- Keep placeholders such as {n}, {s}, {x} exactly as they are. Keep code, identifiers, operators, numbers, "XP", "Git", "commit", "push", "sprint", "Scrum", "Kanban", "MVP", "SOLID" and SBC codes such as "RF-ES C.5.3" unchanged.
- Keep proper names (Dona Lúcia, Rosa, Marta, Caio, Bia, Helena, Seu Antônio, Ponte, Pix, Roda Viva). The stories are set in a Brazilian neighbourhood; keep that setting.
- Adapt analogies only when the original image would be unfamiliar to readers of ${meta.en}; keep the concept being taught identical.
- Use the established programming terminology of ${meta.en} speakers (keep the English term when that is what developers actually say).
- Plain text only: no markdown, no em dashes.
JSON:
${JSON.stringify(chunk)}`;
  let best = null;
  for (let attempt = 1; attempt <= 3; attempt++) {
    const raw = await callLLM(prompt), m = raw.replace(/```json|```/g, "").trim();
    try { const out = JSON.parse(m.slice(m.indexOf("{"), m.lastIndexOf("}") + 1)), errs = []; validate(chunk, out, name, errs); if (from === "en") untranslated(chunk, out, name, meta, errs);
      if (!errs.length) { const hits = styleHits(chunk, out, meta.code); if (!best || hits < best.hits) best = { out, hits };
        if (!hits || attempt >= 2) break; console.log("   tentativa " + attempt + " em " + name + ": " + hits + " trecho(s) fora do guia de estilo"); continue; }
      console.log("   tentativa " + attempt + " reprovada em " + name + ": " + errs.slice(0, 3).join("; "));
    } catch (e) { console.log("   tentativa " + attempt + " com JSON inválido em " + name); }
  }
  /* estrutura válida é obrigatória; forma de tratamento é preferência: fica a melhor tentativa (fala citada, como "qual é o teu número?", é legítima) */
  if (best) { fs.mkdirSync(cacheDir, { recursive: true }); fs.writeFileSync(cf, JSON.stringify(best.hits ? { __aceito: true, data: best.out } : best.out)); return best.out; }
  throw new Error("Não foi possível validar o bloco " + name);
}

async function generate(code, opts) {
  opts = opts || {}; const revLog = [];
  const meta = STUDY_LANGS.find(x => x.code === code);
  if (!meta) throw new Error("Idioma fora do estudo: " + code + ". Opções: " + STUDY_LANGS.map(x => x.code).join(", "));
  const src = LANG[from]; if (!src) throw new Error("Pacote fonte inexistente: " + from);
  console.log("Gerando " + meta.native + " (" + code + ") a partir de " + from + (mock ? " [ensaio]" : ""));
  const out = { name: meta.native, llmName: meta.en, ui: {}, sbc: null, skills: {}, items: {}, game: null };
  const uiKeys = Object.keys(src.ui), itemKeys = Object.keys(src.items), chunks = [];
  for (let i = 0; i < uiKeys.length; i += 60) chunks.push(["ui" + i, Object.fromEntries(uiKeys.slice(i, i + 60).map(k => [k, src.ui[k]])), r => Object.assign(out.ui, r)]);
  chunks.push(["sbc", src.sbc, r => out.sbc = r], ["game", src.game, r => out.game = r]);
  for (const k of Object.keys(src.skills)) chunks.push(["skill-" + k, { [k]: src.skills[k] }, r => Object.assign(out.skills, r)]);
  for (let i = 0; i < itemKeys.length; i += 8) chunks.push(["items" + i, Object.fromEntries(itemKeys.slice(i, i + 8).map(k => [k, src.items[k]])), r => Object.assign(out.items, r)]);
  if (!mock) { let bad = 0, seen = 0; for (const [name, chunk] of chunks) { const cf = cachePath(name, chunk, meta); if (!fs.existsSync(cf)) continue; seen++;
      try { let c = JSON.parse(fs.readFileSync(cf, "utf8")); if (c && c.__aceito) continue; const e0 = []; validate(chunk, c, name, e0); if (!e0.length && styleHits(chunk, c, meta.code)) bad++; } catch (e) {} }
    if (seen && bad > seen * 0.5) { STYLE_OFF.add(meta.code); console.log("   AVISO: " + bad + " de " + seen + " blocos reprovam só pelo guia de estilo. Isso indica regra mal calibrada em tools/estilo.json para '" + meta.code + "', e não tradução ruim; o guia de estilo foi desligado para este idioma nesta execução, para não gastar à toa."); } }
  let done = 0, next = 0;
  const worker = async () => { while (next < chunks.length) { const [name, chunk, put] = chunks[next++]; const r = await translateChunk(name, chunk, meta); if (opts.review) await reviewChunk(meta.code, name, chunk, r, meta, revLog); put(applyReview(meta.code, name, r)); process.stdout.write("\r   blocos: " + (++done) + "/" + chunks.length + "  "); } };
  await Promise.all(Array.from({ length: mock ? 1 : PARALLEL }, worker));
  console.log("");
  const errs = []; validate({ name: "x", llmName: "x", ui: src.ui, sbc: src.sbc, skills: src.skills, items: src.items, game: src.game }, out, code, errs);
  const re = SCRIPT_RE[meta.script]; if (re && !mock) { const sample = Object.values(out.items).map(x => x.why).join(" "); if (!re.test(sample)) errs.push("o texto não contém a escrita " + meta.script); }
  if (errs.length) throw new Error("Pacote reprovado:\n" + errs.slice(0, 10).join("\n"));
  const file = path.join(srcDir, "lang-" + code + (mock ? ".mock" : "") + ".js");
  fs.writeFileSync(file, "/* Pacote gerado por tools/gerar-idioma.js a partir de \"" + from + "\". REVISAR com um falante nativo antes de publicar. */\nLANG." + code + " = " + JSON.stringify(out, null, 1) + ";\n");
  if (opts.review) { const total = Object.keys(flatP(out, "", {})).length; if (!mock) writeQualityReport(meta, revLog, total); console.log("   revisão de qualidade: " + revLog.length + " de " + total + " textos reescritos" + (mock ? " (ensaio)" : "; detalhes em tools/relatorio-qualidade.md")); }
  const ped = mock ? 0 : applyPostEdits(code, file); if (ped) console.log("   pós-edições reaplicadas: " + ped);
  console.log("   gravado: " + path.relative(root, file) + (mock ? " (ensaio; não entra no build)" : "\n   próximos passos: node tests.js && python build.py"));
}

/* ---------- revisão de qualidade: coesão, compreensão e naturalidade ---------- */
const flatP = (o, p, out) => { if (typeof o === "string") out[p] = o; else for (const k in o) flatP(o[k], p ? p + "\u0001" + k : k, out); return out; };
const setP = (o, p, v) => { const ks = p.split("\u0001"); let x = o; for (let i = 0; i < ks.length - 1; i++) x = x[ks[i]]; x[ks[ks.length - 1]] = v; };
const revFile = (code, name, target) => path.join(cacheDir, "rev-" + code + "-" + name + "-" + crypto.createHash("sha256").update(JSON.stringify(target)).digest("hex").slice(0, 24) + ".json");
function applyReview(code, name, target) { const f = revFile(code, name, target); if (!fs.existsSync(f)) return target; const ch = JSON.parse(fs.readFileSync(f, "utf8")), out = JSON.parse(JSON.stringify(target));
  for (const p in ch) try { setP(out, p, ch[p].novo); } catch (e) {} return out; }
/* Revisa um bloco recém-traduzido (texto bruto do cache de tradução). As mudanças ficam em cache próprio, indexado pelo conteúdo do bloco:
   regenerar o pacote reaplica a revisão sem custo, e um bloco retraduzido é revisado de novo. */
async function reviewChunk(code, name, chunkSrc, raw, meta, log) {
  const f = revFile(code, name, raw), a = flatP(chunkSrc, "", {}), b = flatP(raw, "", {}); let ch = null;
  if (fs.existsSync(f)) ch = JSON.parse(fs.readFileSync(f, "utf8"));
  else { const keys = Object.keys(b).filter(k => a[k] != null && b[k].length > 3), ids = Object.fromEntries(keys.map((k, i) => ["t" + i, k])), payload = Object.fromEntries(keys.map((k, i) => ["t" + i, { en: a[k], xx: b[k] }]));
    const prompt = ESTILO.rubrica.split("{lang}").join(meta.en) + "\n" + [(ESTILO[code] || {}).tratamento, ...Object.entries((ESTILO[code] || {}).glossario || {}).map(([k, v]) => "Glossary: '" + k + "' is always " + v[0] + ".")].filter(Boolean).map(x => "- " + x).join("\n") +
      "\nReturn ONLY valid JSON: an object whose keys are the ids of the entries you rewrote, each with {\"novo\": the improved text in " + meta.en + ", \"motivo\": one short sentence in Brazilian Portuguese naming the problem}. Entries that are already good must NOT appear. If everything is good, return {}.\nEntries:\n" + JSON.stringify(payload);
    ch = {}; for (let at = 1; at <= 2; at++) { try { const rawR = mock ? "{}" : await callLLM(prompt), m = rawR.replace(/```json|```/g, "").trim(), out = JSON.parse(m.slice(m.indexOf("{"), m.lastIndexOf("}") + 1));
        for (const id in out) { const k = ids[id], v = out[id]; if (!k || !v || typeof v.novo !== "string" || !v.novo.trim() || v.novo === b[k] || v.novo === a[k]) continue;
          if (placeholders(a[k]) !== placeholders(v.novo)) continue; const re = SCRIPT_RE[meta.script]; if (re && a[k].length > 40 && !re.test(v.novo)) continue;
          if (styleHits({ x: a[k] }, { x: v.novo }, code)) continue; ch[k] = { antes: b[k], novo: v.novo, motivo: String(v.motivo || "") }; }
        break; } catch (e) { if (at === 2) console.log("\n   bloco " + name + " sem resposta válida na revisão; mantido como está"); } }
    if (!mock) { fs.mkdirSync(cacheDir, { recursive: true }); fs.writeFileSync(f, JSON.stringify(ch)); } }
  for (const k in ch) log.push([name, k.split("\u0001").join("."), ch[k].antes, ch[k].novo, ch[k].motivo]);
}
function writeQualityReport(meta, log, total) { const rel = path.join(__dirname, "relatorio-qualidade.md"), esc = s => String(s).replace(/\|/g, "/").replace(/\n/g, " ");
  fs.appendFileSync(rel, "\n## " + meta.native + " (" + meta.label + "): " + log.length + " de " + total + " textos reescritos (" + (100 * log.length / total).toFixed(1) + "%)\n\n| Onde | Antes | Depois | Motivo |\n|---|---|---|---|\n" + log.map(r => "| " + r[1] + " | " + esc(r[2]) + " | " + esc(r[3]) + " | " + esc(r[4]) + " |").join("\n") + "\n"); }

async function romanize(code) {
  const meta = STUDY_LANGS.find(x => x.code === code), guide = (ESTILO.romanizacao || {})[code];
  if (!meta || !guide) throw new Error("Romanização por mapa só existe para: " + Object.keys(ESTILO.romanizacao).join(", ") + ". As demais escritas são romanizadas por regra, no navegador.");
  if (!LANG[code]) throw new Error("Gere primeiro o pacote lang-" + code + ".js");
  const re = code === "ja" ? /[\u3005\u3040-\u30ff\u4e00-\u9fff]/ : code === "zh" ? /[\u4e00-\u9fff]/ : /[\u0600-\u06ff]/, all = new Set();
  (function w(x) { if (typeof x === "string") { if (re.test(x)) all.add(x); } else if (x && typeof x === "object") for (const k in x) w(x[k]); })(LANG[code]);
  fs.mkdirSync(cacheDir, { recursive: true }); const store = path.join(cacheDir, "rom-" + code + ".json"), done = fs.existsSync(store) ? JSON.parse(fs.readFileSync(store, "utf8")) : {};
  const todo = [...all].filter(s => done[s] == null); console.log("Romanizando " + meta.native + " (" + code + "): " + all.size + " textos, " + todo.length + " novos");
  const batches = []; for (let i = 0; i < todo.length; i += 40) batches.push(todo.slice(i, i + 40)); let next = 0, n = 0;
  const worker = async () => { while (next < batches.length) { const b = batches[next++], obj = Object.fromEntries(b.map((s, i) => [String(i), s]));
    const prompt = "Romanise every string VALUE of the JSON below from " + meta.en + " into the Latin alphabet using " + guide + ". Return ONLY valid JSON with exactly the same keys. Keep placeholders such as {n}, numbers, punctuation, Latin-script words, code and identifiers unchanged. Do not translate: only romanise.\nJSON:\n" + JSON.stringify(obj);
    for (let a = 1; a <= 3; a++) { try { const raw = mock ? JSON.stringify(Object.fromEntries(b.map((s, i) => [String(i), "rom:" + s.replace(new RegExp(re.source, "g"), "x")]))) : await callLLM(prompt), m = raw.replace(/```json|```/g, "").trim(), out = JSON.parse(m.slice(m.indexOf("{"), m.lastIndexOf("}") + 1));
        let ok = 0; b.forEach((s, i) => { const r = out[String(i)]; if (typeof r === "string" && r.trim() && placeholders(s) === placeholders(r) && !re.test(r)) { done[s] = r; ok++; } });
        if (ok >= b.length * 0.9) break; console.log("\n   lote com " + (b.length - ok) + " textos reprovados; nova tentativa"); } catch (e) { console.log("\n   lote com JSON inválido; nova tentativa"); } }
    fs.writeFileSync(store, JSON.stringify(done)); process.stdout.write("\r   lotes: " + (++n) + "/" + batches.length + "  "); } };
  await Promise.all(Array.from({ length: mock ? 1 : PARALLEL }, worker));
  let furi = null;
  if (code === "ja" && ESTILO.furigana) { const kan = /[\u3005\u4e00-\u9fff]/, fstore = path.join(cacheDir, "furi-ja.json"), fd = fs.existsSync(fstore) ? JSON.parse(fs.readFileSync(fstore, "utf8")) : {};
    const ft = [...all].filter(s => kan.test(s) && fd[s] == null), fb = []; for (let i = 0; i < ft.length; i += 30) fb.push(ft.slice(i, i + 30)); let fnext = 0, fn = 0;
    console.log("\n   furigana: " + ft.length + " textos novos");
    const okF = (s, r) => typeof r === "string" && r.replace(/\[[\u3041-\u3096\u30fc]+\]/g, "") === s && !/[\u3005\u4e00-\u9fff](?![\u3005\u4e00-\u9fff\[])/.test(r);
    const fworker = async () => { while (fnext < fb.length) { const b = fb[fnext++], obj = Object.fromEntries(b.map((s, i) => [String(i), s]));
      const prompt = "Add furigana to every string VALUE of the JSON below. " + ESTILO.furigana + " Return ONLY valid JSON with exactly the same keys.\nJSON:\n" + JSON.stringify(obj);
      for (let a = 1; a <= 3; a++) { try { const raw = mock ? JSON.stringify(Object.fromEntries(b.map((s, i) => [String(i), s.replace(/([\u3005\u4e00-\u9fff]+)/g, "$1[かな]")]))) : await callLLM(prompt), m = raw.replace(/```json|```/g, "").trim(), out = JSON.parse(m.slice(m.indexOf("{"), m.lastIndexOf("}") + 1));
          let ok = 0; b.forEach((s, i) => { if (okF(s, out[String(i)])) { fd[s] = out[String(i)]; ok++; } }); if (ok >= b.length * 0.9) break; console.log("\n   lote de furigana com " + (b.length - ok) + " reprovados; nova tentativa"); } catch (e2) { console.log("\n   lote de furigana com JSON inválido; nova tentativa"); } }
      fs.writeFileSync(fstore, JSON.stringify(fd)); process.stdout.write("\r   lotes de furigana: " + (++fn) + "/" + fb.length + "  "); } };
    await Promise.all(Array.from({ length: mock ? 1 : PARALLEL }, fworker));
    furi = Object.fromEntries([...all].filter(s => fd[s] != null).map(s => [s, fd[s]])); }
  const map = Object.fromEntries([...all].filter(s => done[s] != null).map(s => [s, done[s]]));
  const file = path.join(srcDir, "rom-" + code + (mock ? ".mock" : "") + ".js"); fs.writeFileSync(file, "/* Mapa de romanização gerado por tools/gerar-idioma.js --romanizar. */\nROM." + code + " = " + JSON.stringify(map, null, 0) + ";\n" + (furi ? "FURI." + code + " = " + JSON.stringify(furi, null, 0) + ";\n" : ""));
  if (furi) console.log("\n   furigana: " + Object.keys(furi).length + " textos com leitura");
  console.log("\n   gravado: " + path.relative(root, file) + " (" + Object.keys(map).length + " de " + all.size + " textos)");
}

(async () => {
  if (target === "pos-edicao") { for (const c of Object.keys(POS)) if (c !== "_") { const n = applyPostEdits(c, path.join(srcDir, "lang-" + c + ".js")); if (n) console.log(c + ": " + n + " correções aplicadas"); } return; }
  if (target === "avaliar" || args.includes("--avaliar")) { const list = target === "avaliar" ? STUDY_LANGS.map(x => x.code).filter(c => !["pt", "en", "es"].includes(c) && LANG[c]) : [target];
    for (const c of list) { try { await generate(c, { review: true }); } catch (e) { console.log("\n   FALHOU " + c + ": " + e.message.split("\n")[0]); } if (!mock) console.log("   tokens acumulados nesta execução: entrada " + usage.in + ", saída " + usage.out); } return; }
  if (target === "romanizar" || args.includes("--romanizar")) { const list = target === "romanizar" ? Object.keys(ESTILO.romanizacao).filter(c => LANG[c]) : [target];
    for (const c of list) { await romanize(c); if (!mock) console.log("   tokens acumulados nesta execução: entrada " + usage.in + ", saída " + usage.out); } return; }
  if (!target) { console.log("Uso: node tools/gerar-idioma.js <código|todos> [--from en|pt|es] [--mock]\nIdiomas do estudo: " + STUDY_LANGS.map(x => x.code + (LANG[x.code] ? "*" : "")).join(" ") + "   (* já tem pacote)"); return; }
  /* "todos": só os que faltam. "revisar": repassa todos os pacotes gerados; o cache torna gratuito o que já está bom e só os blocos reprovados são refeitos. */
  const list = target === "todos" ? STUDY_LANGS.filter(x => !LANG[x.code]).map(x => x.code) : target === "revisar" ? STUDY_LANGS.map(x => x.code).filter(c => !["pt", "en", "es"].includes(c)) : [target];
  const falhas = [];
  for (const c of list) {
    try { await generate(c); } catch (e) { falhas.push(c); console.log("\n   FALHOU " + c + ": " + e.message.split("\n")[0] + " (rode de novo; o cache preserva os blocos prontos)"); }
    if (!mock) console.log("   tokens acumulados nesta execução: entrada " + usage.in + ", saída " + usage.out + (usage.think ? " (dos quais " + usage.think + " de raciocínio)" : ""));
  }
  console.log("\nConcluídos: " + (list.length - falhas.length) + " de " + list.length + (falhas.length ? ". Pendentes: " + falhas.join(", ") : ""));
})().catch(e => { console.error("\nERRO: " + e.message); process.exit(1); });
