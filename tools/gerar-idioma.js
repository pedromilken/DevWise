#!/usr/bin/env node
/* DevWise - gerador de pacote de idioma.

   Uso:   node tools/gerar-idioma.js hi            gera src/lang-hi.js a partir do inglês
          node tools/gerar-idioma.js ja --from pt  usa o português como fonte
          node tools/gerar-idioma.js todos         gera todos os idiomas do estudo que ainda não têm pacote
          node tools/gerar-idioma.js hi --mock     ensaio sem API (testa o encanamento)

   Provedor (variáveis de ambiente; nada é lido de arquivos .env, de propósito):
     ANTHROPIC_API_KEY                                   usa a API da Anthropic
     OPENAI_API_KEY [+ OPENAI_BASE_URL]                  qualquer API compatível (OpenAI, DeepSeek, Qwen, Ollama)
     DEVWISE_MODEL                                       nome do modelo (padrão: claude-sonnet-5 ou gpt-4o-mini)
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
const files = ["data.js", "game.js", ...fs.readdirSync(srcDir).filter(f => /^lang-.*\.js$/.test(f))];
const code = files.map(f => fs.readFileSync(path.join(srcDir, f), "utf8")).join("\n").replace('"use strict";', "");
const { LANG, STUDY_LANGS } = new Function(code + ";return {LANG, STUDY_LANGS};")();

const SCRIPT_RE = { Han: /[\u4e00-\u9fff]/, Devanagari: /[\u0900-\u097f]/, Arabic: /[\u0600-\u06ff]/, Bengali: /[\u0980-\u09ff]/, Cyrillic: /[\u0400-\u04ff]/,
  Kana: /[\u3040-\u30ff]/, Telugu: /[\u0c00-\u0c7f]/, Tamil: /[\u0b80-\u0bff]/, Hangul: /[\uac00-\ud7af]/, Gurmukhi: /[\u0a00-\u0a7f]/ };

function placeholders(s) { return (String(s).match(/\{[a-z]\}/g) || []).sort().join(","); }
function validate(a, b, where, errs) {
  if (typeof a === "string") { if (typeof b !== "string" || !b.trim()) errs.push(where + ": vazio ou tipo errado"); else if (placeholders(a) !== placeholders(b)) errs.push(where + ": marcadores {x} diferentes"); return; }
  if (Array.isArray(a)) { if (!Array.isArray(b) || a.length !== b.length) { errs.push(where + ": tamanho de lista"); return; } a.forEach((x, i) => validate(x, b[i], where + "[" + i + "]", errs)); return; }
  if (a && typeof a === "object") { if (!b || typeof b !== "object") { errs.push(where + ": objeto ausente"); return; }
    for (const k of Object.keys(a)) validate(a[k], b[k], where + "." + k, errs);
    for (const k of Object.keys(b)) if (!(k in a)) errs.push(where + "." + k + ": chave inventada"); }
}

const usage = { in: 0, out: 0 }, MAXTOK = +(process.env.DEVWISE_MAX_TOKENS || 16000);
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
    const r = await fetch(base + "/chat/completions", { method: "POST", headers: hd, body: JSON.stringify({ model: model || "gpt-4o-mini", max_tokens: MAXTOK, messages: [{ role: "user", content: prompt }] }) });
    if (!r.ok) throw new Error("HTTP " + r.status + " " + (await r.text()).slice(0, 200));
    const d = await r.json(); if (d.usage) { usage.in += d.usage.prompt_tokens || 0; usage.out += d.usage.completion_tokens || 0; }
    return d.choices[0].message.content;
  }
  throw new Error("Defina ANTHROPIC_API_KEY ou OPENAI_API_KEY (ou use --mock).");
}
function mockTranslate(o, tag) { if (typeof o === "string") return "[" + tag + "] " + o; if (Array.isArray(o)) return o.map(x => mockTranslate(x, tag)); const r = {}; for (const k in o) r[k] = mockTranslate(o[k], tag); return r; }

async function translateChunk(name, chunk, meta) {
  const key = crypto.createHash("sha256").update(JSON.stringify([meta.code, from, process.env.DEVWISE_MODEL || "", chunk])).digest("hex").slice(0, 24);
  const cf = path.join(cacheDir, meta.code + "-" + name + "-" + key + ".json");
  if (!mock && fs.existsSync(cf)) return JSON.parse(fs.readFileSync(cf, "utf8"));
  if (mock) return mockTranslate(chunk, meta.code);
  const prompt = `You are localising DevWise, an educational game that teaches programming and software engineering to adult beginners through real-world stories and everyday analogies.
Rewrite every string VALUE of the JSON below in ${meta.en} (${meta.native}, script: ${meta.script}). Compose each sentence the way a native speaker and teacher would say it; do not translate word for word.
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
  for (let attempt = 1; attempt <= 3; attempt++) {
    const raw = await callLLM(prompt), m = raw.replace(/```json|```/g, "").trim();
    try { const out = JSON.parse(m.slice(m.indexOf("{"), m.lastIndexOf("}") + 1)), errs = []; validate(chunk, out, name, errs);
      if (!errs.length) { fs.mkdirSync(cacheDir, { recursive: true }); fs.writeFileSync(cf, JSON.stringify(out)); return out; }
      console.log("   tentativa " + attempt + " reprovada em " + name + ": " + errs.slice(0, 3).join("; "));
    } catch (e) { console.log("   tentativa " + attempt + " com JSON inválido em " + name); }
  }
  throw new Error("Não foi possível validar o bloco " + name);
}

async function generate(code) {
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
  let done = 0;
  for (const [name, chunk, put] of chunks) { put(await translateChunk(name, chunk, meta)); process.stdout.write("\r   blocos: " + (++done) + "/" + chunks.length); }
  console.log("");
  const errs = []; validate({ name: "x", llmName: "x", ui: src.ui, sbc: src.sbc, skills: src.skills, items: src.items, game: src.game }, out, code, errs);
  const re = SCRIPT_RE[meta.script]; if (re && !mock) { const sample = Object.values(out.items).map(x => x.why).join(" "); if (!re.test(sample)) errs.push("o texto não contém a escrita " + meta.script); }
  if (errs.length) throw new Error("Pacote reprovado:\n" + errs.slice(0, 10).join("\n"));
  const file = path.join(srcDir, "lang-" + code + (mock ? ".mock" : "") + ".js");
  fs.writeFileSync(file, "/* Pacote gerado por tools/gerar-idioma.js a partir de \"" + from + "\". REVISAR com um falante nativo antes de publicar. */\nLANG." + code + " = " + JSON.stringify(out, null, 1) + ";\n");
  console.log("   gravado: " + path.relative(root, file) + (mock ? " (ensaio; não entra no build)" : "\n   próximos passos: node tests.js && python build.py"));
}

(async () => {
  if (!target) { console.log("Uso: node tools/gerar-idioma.js <código|todos> [--from en|pt|es] [--mock]\nIdiomas do estudo: " + STUDY_LANGS.map(x => x.code + (LANG[x.code] ? "*" : "")).join(" ") + "   (* já tem pacote)"); return; }
  const list = target === "todos" ? STUDY_LANGS.filter(x => !LANG[x.code]).map(x => x.code) : [target];
  for (const c of list) { await generate(c); if (!mock) console.log("   tokens acumulados nesta execução: entrada " + usage.in + ", saída " + usage.out); }
})().catch(e => { console.error("\nERRO: " + e.message); process.exit(1); });
