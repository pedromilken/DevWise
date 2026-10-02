#!/usr/bin/env node
/* DevWise - Laboratório de agentes (tese STUDx, QP2, QP3 e QP4)

   Agente = CÉREBRO (um LLM) + BASE DE CONHECIMENTO (as notas que ele "estudou": o arsenal teórico do próprio DevWise,
   no idioma do jogo). Dois papéis:

   APRENDIZ (QP3, QP4). Responde aos tickets do DevWise com a base controlada pelo experimento:
     C0  sem notas            mede o VAZAMENTO: o quanto o cérebro já sabe sozinho
     C1  todas as notas       sem aprendizagem durante a partida (o análogo do controle do ENEM)
     C2  partida real         o agente joga o motor do DevWise; as notas de cada habilidade só chegam depois do
                              3º ticket dela: um degrau de aprendizagem num instante CONHECIDO. O próprio jogo
                              registra as previsões dos 5 modelos (Elo/Rasch, TRI 3PL, BKT, PFA, AFM) antes de cada resposta.
     C3  C2 embaralhado       o teste de embaralhamento por estudante, agora com controle; não gasta chamadas
   A "verdade" de cada resposta da C2 não é suposta: é a taxa de acerto MEDIDA do mesmo item em C0 (antes do degrau)
   ou em C1 (depois). Assim se pergunta: o modelo detecta o degrau? inventa aprendizagem em C1?

   TUTOR (QP2). Diante de um erro simulado do aluno, escreve uma dica sem entregar a resposta, por três estratégias:
     S1  geração direta no idioma-alvo
     S2  RAG localizado: S1 + as notas da habilidade no idioma-alvo + a explicação de outro item da mesma habilidade
     S3  gera em inglês e traduz (a revisão humana fica para uma amostra, fora do piloto)
   Métricas automáticas: fidelidade de escrita (o texto saiu no sistema de escrita certo?), vazamento da resposta,
   chrF contra a dica de referência do jogo e tamanho. As saídas ficam em JSONL para LaBSE depois.

   Uso:
     node tools/agentes/laboratorio.js calibrar --cerebro ollama:qwen3:8b
     node tools/agentes/laboratorio.js piloto   --cerebro ollama:qwen3:8b --idiomas pt,en,zh,hi,ar --minutos 60
     node tools/agentes/laboratorio.js piloto   --cerebro simulado          (sem LLM: testa o encanamento)
   Cérebros: ollama:<modelo> (local, http://localhost:11434), openai:<modelo> (OPENAI_BASE_URL + OPENAI_API_KEY,
   serve para DeepSeek, Qwen pago por uso, GPT, Gemini compatível), anthropic:<modelo> (ANTHROPIC_API_KEY), simulado.
   Saída: agentes/saida/<data>-<cérebro>/ com medicao.csv, jogo.csv, tutores.jsonl e RESUMO.md. */
"use strict";
const fs = require("fs"), path = require("path"), vm = require("vm");
const ROOT = path.join(__dirname, "..", "..");

/* ---------------- motor do DevWise sem interface (o mesmo que os testes usam) ---------------- */
function loadEngine() {
  const S = path.join(ROOT, "src"), ls = fs.readdirSync(S);
  const langs = ls.filter(f => /^lang-.*\.js$/.test(f) && !f.includes(".mock.") && !f.includes(".patch.")).sort((a, b) => a === "lang-pt.js" ? -1 : b === "lang-pt.js" ? 1 : a.localeCompare(b));
  const patches = ls.filter(f => /^lang-.*\.patch\.js$/.test(f)).sort(), roms = ls.filter(f => /^rom-.*\.js$/.test(f));
  let src = ["data.js", "game.js", "rom.js", "models.js", "run.js", ...langs, ...patches, ...roms, "app.js"].map(f => fs.readFileSync(path.join(S, f), "utf8")).join("\n");
  src = src.replace('"use strict";', "").replace(/S=load\(\);[\s\S]*$/, "");
  const stubEl = () => ({ append() {}, setAttribute() {}, addEventListener() {}, style: { setProperty() {} }, set className(v) {}, set textContent(v) {} });
  const M2 = Object.create(Math); M2.random = () => RNG();
  const g = { Math: M2, localStorage: { getItem() { return null; }, setItem() {} }, window: { scrollTo() {} }, navigator: { language: "pt" }, location: { search: "" },
    document: { documentElement: { setAttribute() {} }, getElementById() { return stubEl(); }, createElement: stubEl, createElementNS: stubEl, createTextNode() { return {}; }, createDocumentFragment() { return { append() {} }; }, body: { append() {} } } };
  const fn = new Function(...Object.keys(g), src + `;return {get S(){return S},set S(v){S=v},setCur(v){cur=v},getCur(){return cur},
    fresh,fillBoard,pendingMissions,resolve,newSprint,exportCSV,researchRows,itemOpts,guessProb,itT,skT,trk,mastered,unlocked,
    IT,ITEMS,SKILLS,SK,LANG,STUDY_LANGS,PLS,KT,RUN,L0,RESEARCH_COLS};`);
  return fn(...Object.values(g));
}

/* ---------------- cérebros ---------------- */
function makeBrain(spec) {
  const [kind, ...rest] = spec.split(":"), model = rest.join(":");
  const stats = { calls: 0, ms: 0, inTok: 0, outTok: 0, fails: 0, retries: 0 };
  let consecutive = 0, noThink = false;
  /* Rodadas longas: cada chamada tem tempo limite de 2 min e até 3 tentativas com espera crescente. A rodada só aborta
     se o servidor falhar 10 vezes SEGUIDAS (fora do ar); soluços isolados viram resposta vazia, que conta como erro. */
  const post = async (url, headers, body) => {
    const ac = new AbortController(), tm = setTimeout(() => ac.abort(), 120000);
    try { return await fetch(url, { method: "POST", headers, body: JSON.stringify(body), signal: ac.signal }); } finally { clearTimeout(tm); }
  };
  async function once(messages, temperature, max) {
    if (kind === "simulado") return simulated(messages);
    if (kind === "ollama") {
      const base = process.env.OLLAMA_HOST || "http://localhost:11434", h = { "content-type": "application/json" };
      const body = { model, messages, stream: false, think: false, options: { temperature, num_predict: max, num_ctx: 8192, seed: Math.floor(RNG() * 2147483647) } };
      if (noThink) delete body.think;   /* modelo que recusou "think" uma vez não recebe de novo */
      let r = await post(base + "/api/chat", h, body);
      if (!r.ok && r.status === 400 && !noThink) { noThink = true; delete body.think; r = await post(base + "/api/chat", h, body); }
      if (!r.ok) throw new Error("Ollama HTTP " + r.status + " " + (await r.text()).slice(0, 160));
      const d = await r.json(); stats.inTok += d.prompt_eval_count || 0; stats.outTok += d.eval_count || 0; return (d.message && d.message.content) || "";
    }
    if (kind === "openai") {
      const base = (process.env.OPENAI_BASE_URL || "https://api.openai.com/v1").replace(/\/+$/, "");
      const r = await post(base + "/chat/completions", { "content-type": "application/json", authorization: "Bearer " + process.env.OPENAI_API_KEY }, { model, messages, temperature, max_tokens: max });
      if (!r.ok) throw new Error("HTTP " + r.status + " " + (await r.text()).slice(0, 160));
      const d = await r.json(); if (d.usage) { stats.inTok += d.usage.prompt_tokens; stats.outTok += d.usage.completion_tokens; } return d.choices[0].message.content || "";
    }
    if (kind === "anthropic") {
      const sys = messages.filter(m => m.role === "system").map(m => m.content).join("\n");
      const r = await post("https://api.anthropic.com/v1/messages", { "content-type": "application/json", "x-api-key": process.env.ANTHROPIC_API_KEY, "anthropic-version": "2023-06-01" },
        { model, system: sys, messages: messages.filter(m => m.role !== "system"), temperature, max_tokens: max });
      if (!r.ok) throw new Error("HTTP " + r.status + " " + (await r.text()).slice(0, 160));
      const d = await r.json(); if (d.usage) { stats.inTok += d.usage.input_tokens; stats.outTok += d.usage.output_tokens; } return d.content.map(c => c.text || "").join("");
    }
    throw new Error("cérebro desconhecido: " + spec);
  }
  async function call(messages, { temperature = 0.7, max = 80 } = {}) {
    const t0 = Date.now(); let text = "";
    for (let att = 1; att <= 3; att++) {
      try { text = await once(messages, temperature, max); consecutive = 0; break; }
      catch (e) {
        if (att < 3) { stats.retries++; await new Promise(r => setTimeout(r, att * (kind === "simulado" ? 1 : 1500))); continue; }
        stats.fails++; consecutive++;
        if (stats.fails <= 3) console.error("\n   aviso: " + (e.name === "AbortError" ? "sem resposta em 2 min" : e.message));
        if (consecutive >= 10) throw new Error("o cérebro falhou 10 vezes seguidas; o servidor está no ar? Rode o mesmo comando com a mesma --rodada para retomar.");
      }
    }
    stats.calls++; stats.ms += Date.now() - t0;
    return text.replace(/<think>[\s\S]*?<\/think>/g, "").trim();
  }
  return { spec, kind, model, call, stats };
}
/* Cérebro sem LLM, para testar o encanamento: acerta 85% com notas da habilidade e 30% sem; o tutor devolve a referência. */
function simulated(messages) {
  const u = messages[messages.length - 1].content, sys = messages[0].content;
  if (/^Translate/.test(sys)) return u;
  if (/TUTOR/.test(sys)) { const m = u.match(/REFERENCE_HINT: (.*)/); return m ? m[1] : "..."; }
  const hasNotes = /NOTES:\n(?!\(none\))/.test(u), p = hasNotes ? 0.85 : 0.3, right = RNG() < p;
  const k = (u.match(/CORRECT_FOR_SIMULATION: (.*)/) || [])[1] || "";
  if (right) return "ANSWER: " + k;
  if (/Which line has the bug/.test(u)) return "ANSWER: " + (k === "1" ? "2" : "1");
  if (/ORDER/.test(u)) return "ANSWER: " + k.split(",").reverse().join(",");
  if (/BINS/.test(u)) return "ANSWER: " + k.split(",").map(x => x.replace(/[12]$/, d => d === "1" ? "2" : "1")).join(",");
  const L = (u.match(/^([A-D])\) /gm) || ["A) "]).map(x => x[0]).filter(x => x !== k); return "ANSWER: " + (L[0] || "A");
}

/* Antes de gastar tempo: o Ollama está no ar e o modelo foi baixado? */
async function preflight(brain) {
  if (brain.kind !== "ollama") return;
  const base = process.env.OLLAMA_HOST || "http://localhost:11434";
  let tags; try { tags = await (await fetch(base + "/api/tags")).json(); }
  catch (e) { throw new Error("O Ollama não respondeu em " + base + ". Instale (winget install Ollama.Ollama), abra o aplicativo e tente de novo."); }
  const have = (tags.models || []).map(m => m.name);
  if (!have.some(n => n === brain.model || n === brain.model + ":latest")) throw new Error("O modelo " + brain.model + " não está baixado. Rode: ollama pull " + brain.model + "\nModelos disponíveis: " + (have.join(", ") || "nenhum"));
}

/* ---------------- notas (base de conhecimento) ---------------- */
/* ---------------- dialeto cifrado (opcional) ----------------
   Nos itens de PROGRAMAÇÃO, as palavras-chave do JavaScript viram palavras inventadas, e cada habilidade tem o seu próprio
   dialeto: o "if" de Condicionais não é o "if" de Laços. Sem as notas (que trazem o dicionário daquela habilidade), o código
   fica ilegível até para um cérebro que sabe programar; com as notas, volta a ser legível. Isso cria um degrau de
   aprendizagem limpo e por habilidade. Os itens de engenharia de software não têm código e ficam sem dialeto: servem de
   controle interno, itens em que não há o que aprender com as notas além do que o cérebro já sabe.
   O degrau medido é o de aprender um VOCABULÁRIO, não programação: serve para validar instrumentos de KT. */
let DIALECT = false;
const KEYWORDS = ["console.log", "Math.floor", "function", "return", "const", "while", "false", "true", "else", "let", "for", "if", "of"];
const DICT = {};
function pseudoWords(seed, n, taken) {
  const C = "bdfgklmnprstvz", V = "aeiou"; let x = 0; for (const ch of seed) x = (x * 31 + ch.charCodeAt(0)) >>> 0;
  const rnd = () => ((x = (x * 1103515245 + 12345) >>> 0) / 4294967296), out = [];
  while (out.length < n) { let w = ""; for (let s = 0; s < 3; s++) w += C[Math.floor(rnd() * C.length)] + V[Math.floor(rnd() * V.length)]; if (!taken.has(w)) { taken.add(w); out.push(w); } }
  return out;
}
function dictFor(E, skill) {
  if (DICT[skill]) return DICT[skill];
  const taken = new Set(Object.values(DICT).flatMap(d => Object.values(d)));
  E.ITEMS.forEach(i => { const c = (i.code && i.code.js) || (i.stub && i.stub.js) || ""; (c.match(/[A-Za-z_]\w*/g) || []).forEach(w => taken.add(w.toLowerCase())); });
  const words = pseudoWords("devwise:" + skill, KEYWORDS.length, taken);
  return DICT[skill] = Object.fromEntries(KEYWORDS.map((k, i) => [k, words[i]]));
}
const isProgSkill = (E, s) => (E.SK[s] || {}).area === "prog";
/* troca só fora de textos entre aspas, para não alterar mensagens que o programa imprime */
function mapOutsideStrings(code, f) { return code.split(/("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`)/).map((part, i) => i % 2 ? part : f(part)).join(""); }
function encipher(E, skill, code) {
  if (!DIALECT || !code || !isProgSkill(E, skill)) return code;
  const d = dictFor(E, skill);
  return mapOutsideStrings(code, s => { for (const k of KEYWORDS) s = s.replace(new RegExp("(?<![\\w.])" + k.replace(".", "\\.") + "(?!\\w)", "g"), d[k]); return s; });
}
function decipher(E, skill, code) {
  if (!DIALECT || !code || !isProgSkill(E, skill)) return code;
  const d = dictFor(E, skill);
  return mapOutsideStrings(code, s => { for (const k of KEYWORDS) s = s.replace(new RegExp("\\b" + d[k] + "\\b", "g"), k); return s; });
}
function dictionaryNote(E, lang, skill) {
  if (!DIALECT || !isProgSkill(E, skill)) return "";
  const d = dictFor(E, skill);
  return "\nDIALECT OF THIS SKILL (the code in these tickets uses these words):\n" + KEYWORDS.map(k => "  " + d[k] + " = " + k).join("\n");
}

let NOTES_MODE = "ricas";
/* Notas = o que o agente "estudou". Básicas: os três conceitos do arsenal teórico. Ricas: os conceitos e até 4 exemplos
   resolvidos, que são as explicações de OUTROS tickets da mesma habilidade (nunca do ticket que está sendo respondido). */
function notesFor(E, lang, skills, exclude) {
  if (!skills.length) return "(none)";
  return skills.map(id => { const s = (E.LANG[lang].skills[id] || E.LANG.en.skills[id]);
    let t = "## " + s.name + dictionaryNote(E, lang, id) + "\n" + s.theory.map(x => "- " + (Array.isArray(x) ? x.filter(Boolean).join(": ") : (x.t || x.h || "") + ": " + (x.p || x.x || ""))).join("\n");
    if (NOTES_MODE === "ricas") { const ex = E.ITEMS.filter(j => j.skill === id && j.id !== exclude && !j.extra && j.type !== "code").slice(0, 4);
      t += "\nWORKED EXAMPLES:\n" + ex.map(j => { const x = E.LANG[lang].items[j.id] || E.LANG.en.items[j.id]; return "* " + x.title + ": " + x.why; }).join("\n"); }
    return t; }).join("\n\n");
}

/* Leitura tolerante da resposta: aceita o formato pedido ("ANSWER: B") e também o que modelos pequenos costumam
   devolver ("B", "C) 8", "Resposta: B", "उत्तर: B", a opção escrita por extenso). Devolve {v, fmt}:
   fmt "pedido" = veio como ANSWER:; "tolerado" = entendido fora do formato; "ilegivel" = não deu para entender. */
function readAnswer(a, kind, opts) {
  const s = String(a || "").trim(), strict = /ANSWER\s*[:：]/i.test(s), body = s.replace(/^[\s\S]*?(?:ANSWER|[^\s:：]{1,12})\s*[:：]\s*/i, m => /[:：]\s*$/.test(m) ? "" : m);
  const tag = v => v == null ? { v: null, fmt: "ilegivel" } : { v, fmt: strict ? "pedido" : "tolerado" };
  if (kind === "letter") {
    const m = (strict ? s.replace(/^[\s\S]*?ANSWER\s*[:：]\s*/i, "") : s).match(/(?:^|[\s(（\[:：*])([A-H])(?=$|[)）\].:：,*]|\s+(?![a-zà-ÿ]))/);   /* "A variável..." é artigo, não resposta */
    if (m) return tag(m[1].toUpperCase());
    if (opts) { const low = s.toLowerCase(), hit = opts.map((o, i) => [i, String(o).toLowerCase().trim()]).filter(([, o]) => o.length >= 3 && low.includes(o));
      if (hit.length === 1) return tag("@" + hit[0][0]); }
    return tag(null);
  }
  if (kind === "number") { const m = (strict ? s.replace(/^[\s\S]*?ANSWER\s*[:：]\s*/i, "") : s).match(/\d+/); return tag(m ? m[0] : null); }
  if (kind === "seq") { const nums = ((strict ? s.replace(/^[\s\S]*?ANSWER\s*[:：]\s*/i, "") : s).match(/\d+/g) || []); return tag(nums.length ? nums.join(",") : null); }
  if (kind === "pairs") { const pr = [...s.matchAll(/(\d+)\s*[:：\-=]\s*([12])/g)]; return tag(pr.length ? pr.map(([, c, b]) => c + ":" + b).join(",") : null); }
  return tag(s);
}

/* ---------------- apresentação de um ticket ao aprendiz, e correção ---------------- */
const shuf = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(RNG() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
function presentItem(E, lang, it, pl) {
  const x = E.LANG[lang].items[it.id] || E.LANG.en.items[it.id], code = it.code ? encipher(E, it.skill, it.code[pl]) : null;
  let body = "TICKET: " + x.title + "\n" + x.prompt + "\n", key = "", grade;
  if (it.type === "mc") {
    const prev = E.S.lang; E.S.lang = lang; const opts = E.itemOpts(it); E.S.lang = prev;
    const ord = shuf(opts.map((_, i) => i)), L = "ABCDEFGH";
    if (code) body += "\nCODE:\n" + code + "\n";
    body += "\n" + ord.map((o, i) => L[i] + ") " + opts[o]).join("\n") + "\n\nReply with one line: ANSWER: <letter>";
    key = L[ord.indexOf(0)];
    grade = a => { const r = readAnswer(a, "letter", ord.map(o => opts[o])); if (r.v && r.v[0] === "@") r.v = L[+r.v.slice(1)]; return { ok: r.v === key, fmt: r.fmt }; };
  } else if (it.type === "bug") {
    body += "\nCODE (numbered lines):\n" + code.split("\n").map((l, i) => (i + 1) + "  " + l).join("\n") + "\n\nWhich line has the bug? Reply with one line: ANSWER: <line number>";
    key = String(it.answer + 1); grade = a => { const r = readAnswer(a, "number"); return { ok: r.v === key, fmt: r.fmt }; };
  } else if (it.type === "parsons") {
    const lines = code ? code.split("\n") : it.shared ? it.shared.split("\n") : x.lines, ord = shuf(lines.map((_, i) => i));
    body += "\nORDER these lines (they are shuffled):\n" + ord.map((o, i) => (i + 1) + "  " + lines[o]).join("\n") + "\n\nReply with one line: ANSWER: <numbers in the correct order, comma separated>";
    key = lines.map((_, i) => ord.indexOf(i) + 1).join(",");
    grade = a => { const r = readAnswer(a, "seq"); return { ok: r.v === key, fmt: r.fmt }; };
  } else if (it.type === "sort") {
    body += "\nBINS: 1 = " + x.bins[0] + "   2 = " + x.bins[1] + "\nCARDS:\n" + x.cards.map((c, i) => (i + 1) + "  " + c).join("\n") + "\n\nReply with one line: ANSWER: <card>:<bin>, e.g. 1:2,2:1,...";
    key = it.key.map((k, i) => (i + 1) + ":" + (k + 1)).join(",");
    grade = a => { const r = readAnswer(a, "pairs"); if (!r.v) return { ok: false, fmt: r.fmt }; const got = {}; r.v.split(",").forEach(x => { const [c, b] = x.split(":"); got[c] = +b - 1; }); return { ok: it.key.every((k, i) => got[i + 1] === k), fmt: r.fmt }; };
  } else if (it.type === "code") {
    body += "\nWrite the function " + it.fn + (DIALECT ? " in the dialect used by this ticket" : " in JavaScript") + ". Reply ONLY with the code, no explanation.\n\nSTARTER:\n" + encipher(E, it.skill, it.stub.js);
    key = "(code)"; grade = a => ({ ok: gradeJS(it, decipher(E, it.skill, a)) >= 0.6, fmt: /```|function\s/.test(a) ? "pedido" : "tolerado" });
  }
  return { body, key, grade };
}
/* código do aprendiz em JavaScript, num contexto isolado com limite de tempo */
function gradeJS(it, answer) {
  const code = (answer.match(/```(?:javascript|js)?\s*([\s\S]*?)```/) || [, answer])[1];
  let ok = 0;
  for (const c of it.tests) { try { const ctx = vm.createContext({}); vm.runInContext(code + "\n;globalThis.__f=" + it.fn + ";", ctx, { timeout: 1000 });
      const v = vm.runInContext("__f(..." + JSON.stringify(c.args) + ")", ctx, { timeout: 1000 }); if (JSON.stringify(v) === JSON.stringify(c.out) || (typeof v === "number" && Math.abs(v - c.out) < 1e-9)) ok++; } catch (e) {} }
  return ok / it.tests.length;
}
const STUDENT_SYS = lang => `You are role-playing an adult BEGINNER learning programming and software engineering in a game. You only know what is written in your NOTES below; if the NOTES do not cover the question, answer the way a beginner would guess, without using knowledge you are not supposed to have. The game is in ${lang}. Follow the reply format exactly and write nothing else.`;

async function askStudent(E, brain, lang, it, notesSkills, pl) {
  const p = presentItem(E, lang, it, pl), notes = notesFor(E, lang, notesSkills, it.id);
  const u = "NOTES:\n" + notes + "\n\n" + p.body + (brain.kind === "simulado" ? "\nCORRECT_FOR_SIMULATION: " + p.key : "");
  const a = await brain.call([{ role: "system", content: STUDENT_SYS(langName(E, lang)) }, { role: "user", content: u }], { temperature: 0.7, max: it.type === "code" ? 400 : 40 });
  const g = p.grade(a); return { ok: !!g.ok, fmt: g.fmt, key: p.key, raw: a.slice(0, 200) };
}
const langName = (E, c) => { const m = E.STUDY_LANGS.find(x => x.code === c); return m ? m.en : c; };

/* ---------------- tutor: três estratégias ---------------- */
const TUTOR_SYS = "You are a TUTOR in a programming game for adult beginners. Write ONE short hint (at most 60 words) that helps the student see their mistake WITHOUT revealing the correct answer. Plain text only.";
const SCRIPTS = { Latin: /[A-Za-zÀ-ÿĀ-žƀ-ɏ]/, Han: /[\u4e00-\u9fff]/, Devanagari: /[\u0900-\u097f]/, Arabic: /[\u0600-\u06ff]/, Bengali: /[\u0980-\u09ff]/, Cyrillic: /[\u0400-\u04ff]/,
  Kana: /[\u3040-\u30ff\u4e00-\u9fff]/, Telugu: /[\u0c00-\u0c7f]/, Tamil: /[\u0b80-\u0bff]/, Hangul: /[\uac00-\ud7af]/, Gurmukhi: /[\u0a00-\u0a7f]/ };
function scriptShare(text, script) { const re = SCRIPTS[script] || SCRIPTS.Latin, letters = [...text].filter(ch => /\p{L}/u.test(ch)); return letters.length ? letters.filter(ch => re.test(ch)).length / letters.length : 0; }
function chrF(hyp, ref, n = 6, beta = 2) {   /* chrF (Popović, 2015): F-beta médio de n-gramas de caracteres, sem espaços */
  const H = hyp.replace(/\s+/g, ""), R = ref.replace(/\s+/g, ""); let P = 0, Rc = 0, k = 0;
  for (let q = 1; q <= n; q++) { const g = s => { const m = new Map(); for (let i = 0; i + q <= s.length; i++) { const x = s.slice(i, i + q); m.set(x, (m.get(x) || 0) + 1); } return m; };
    const a = g(H), b = g(R); if (!a.size || !b.size) continue; let m = 0; for (const [x, c] of a) m += Math.min(c, b.get(x) || 0);
    P += m / [...a.values()].reduce((s, v) => s + v, 0); Rc += m / [...b.values()].reduce((s, v) => s + v, 0); k++; }
  if (!k) return 0; P /= k; Rc /= k; return P + Rc ? (1 + beta * beta) * P * Rc / (beta * beta * P + Rc) * 100 : 0;
}
async function tutorRun(E, brain, lang, it) {
  const meta = E.STUDY_LANGS.find(x => x.code === lang), L = langName(E, lang);
  const X = l => E.LANG[l].items[it.id] || E.LANG.en.items[it.id];
  const prevLang = E.S.lang, opts = l => { E.S.lang = l; const o = E.itemOpts(it); E.S.lang = prevLang; return o; };
  const wrong = 1 + Math.floor(RNG() * (opts(lang).length - 1));
  const task = l => "ITEM: " + X(l).title + "\n" + X(l).prompt + "\nOPTIONS:\n" + opts(l).map((o, i) => "- " + o).join("\n") + "\nTHE STUDENT CHOSE: " + opts(l)[wrong] + "\n" +
    (brain.kind === "simulado" ? "REFERENCE_HINT: " + X(l).hint + "\n" : "");
  const out = {};
  out.S1 = await brain.call([{ role: "system", content: TUTOR_SYS }, { role: "user", content: task(lang) + "Write the hint in " + L + "." }], { temperature: 0.3, max: 160 });
  const other = E.ITEMS.find(j => j.skill === it.skill && j.id !== it.id && !j.extra && E.LANG[lang].items[j.id]);
  const rag = "NOTES (" + L + "):\n" + notesFor(E, lang, [it.skill]) + (other ? "\nEXAMPLE EXPLANATION FROM ANOTHER TICKET:\n" + E.LANG[lang].items[other.id].why : "");
  out.S2 = await brain.call([{ role: "system", content: TUTOR_SYS }, { role: "user", content: rag + "\n\n" + task(lang) + "Write the hint in " + L + ", using the vocabulary of the NOTES." }], { temperature: 0.3, max: 160 });
  const en = lang === "en" ? null : await brain.call([{ role: "system", content: TUTOR_SYS }, { role: "user", content: task("en") + "Write the hint in English." }], { temperature: 0.3, max: 160 });
  out.S3 = lang === "en" ? out.S1 : await brain.call([{ role: "system", content: "Translate the text into " + L + ". Keep code, numbers and proper names unchanged. Output only the translation." }, { role: "user", content: en }], { temperature: 0.2, max: 220 });
  const correct = opts(lang)[0], ref = X(lang).hint || "";
  const rows = [];
  for (const s of ["S1", "S2", "S3"]) { const t = out[s] || "";
    rows.push({ lang, item: it.id, skill: it.skill, strategy: s, text: t, reference: ref, script: meta.script, script_share: +scriptShare(t, meta.script).toFixed(3),
      leak: correct.length >= 6 && t.toLowerCase().includes(correct.toLowerCase().slice(0, Math.min(40, correct.length))) ? 1 : 0, chrf: +chrF(t, ref).toFixed(1), chars: [...t].length }); }
  return rows;
}

/* ---------------- sementes: a mesma rodada, refeita, dá o mesmo resultado ----------------
   Tudo que é sorteado (ordem das opções, partida fixa, escolhas do jogo, erro simulado do tutor, amostragem do LLM)
   sai de um gerador com semente derivada de (semente da rodada, cérebro, modo, idioma, aluno). */
let RNG = Math.random;
function seedRNG(...parts) {
  const s = parts.join("|"); let h = 1779033703 ^ s.length;
  for (let i = 0; i < s.length; i++) { h = Math.imul(h ^ s.charCodeAt(i), 3432918353); h = (h << 13) | (h >>> 19); }
  let a = h >>> 0;
  RNG = () => { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}

/* ---------------- piloto e estudo completo ---------------- */
const PILOT_SKILLS = ["var", "cond", "req", "git"];
const MODELS = ["elo", "irt", "bkt", "pfa", "afm"];
const csvOf = rows => { if (!rows.length) return ""; const h = [...new Set(rows.flatMap(r => Object.keys(r)))]; return [h.join(","), ...rows.map(r => h.map(k => { const v = r[k] == null ? "" : String(r[k]); return /[",\n]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v; }).join(","))].join("\n"); };

async function runLanguage(opts, brain, lang, items, timeLeft) {
  const L = { med: [], game: [], fixed: [], tut: [], perLang: [] }, tl = Date.now(), st0 = { ...brain.stats }, slug = brainSlug(opts.cerebro);
  seedRNG(opts.semente, slug, DIALECT, lang, "medicao");
  const E = loadEngine(); E.S = E.fresh(); E.S.lang = lang; E.S.pl = "js"; E.S.started = true; E.S.confirm = false;
  process.stdout.write(lang + ": medição");
  /* C0 e C1: taxa de acerto medida de cada item, sem notas e com as notas da habilidade */
  const truth = {};
  for (const it of items) { truth[it.id] = { c0: 0, c1: 0, n: 0 };
    for (let r = 0; r < opts.reps; r++) { const a0 = await askStudent(E, brain, lang, it, [], "js"), a1 = await askStudent(E, brain, lang, it, [it.skill], "js");
      truth[it.id].c0 += a0.ok; truth[it.id].c1 += a1.ok; truth[it.id].n++;
      L.med.push({ lang, item: it.id, skill: it.skill, type: it.type, rep: r + 1, c0: a0.ok ? 1 : 0, c1: a1.ok ? 1 : 0, fmt0: a0.fmt, fmt1: a1.fmt, key0: a0.key, key1: a1.key, raw0: a0.raw.slice(0, 120), raw1: a1.raw.slice(0, 120) }); } }
  for (const k in truth) { truth[k].c0 /= truth[k].n; truth[k].c1 /= truth[k].n; }
  const cols = ["pred_elo", "pred_irt", "pred_bkt", "pred_pfa", "pred_afm", "rpred_elo", "rpred_irt", "rpred_bkt", "rpred_pfa", "rpred_afm"];
  for (let s = 1; s <= opts.alunos; s++) {
    if (timeLeft() <= 0) break;
    const student = lang + "-" + s;
    /* C2 adaptativa: o jogo real; notas da habilidade só a partir do 4º ticket dela (degrau conhecido) */
    if (opts.partida !== "fixa") {
      process.stdout.write(" | aluno " + s);
      seedRNG(opts.semente, slug, DIALECT, lang, "aluno", s, "adaptativa");
      const Es = loadEngine(); Es.S = Es.fresh(); Es.S.lang = lang; Es.S.pl = "js"; Es.S.started = true; Es.S.confirm = false; Es.S.sid = slug + "-" + student;
      const seen = {}, notes = new Set(), rows = []; let n = 0;
      while (n < opts.tickets && timeLeft() > 0) {
        Es.pendingMissions().forEach(m => Es.S.brief[m.id] = true); Es.fillBoard(); if (!Es.S.board.length) break;
        const it = Es.IT[Es.S.board[0]]; seen[it.skill] = (seen[it.skill] || 0) + 1; if (seen[it.skill] > 3) notes.add(it.skill);
        const a = await askStudent(Es, brain, lang, it, notes.has(it.skill) ? [it.skill] : [], "js");
        Es.setCur({ t0: Date.now(), item: it, hint: false, mode: "normal", typed: false, res: it.type === "code" ? { pct: a.ok ? 1 : 0, modo: "exec" } : null, tel: { pastes: 0, runs: 1 }, code: "" });
        Es.resolve(a.ok); n++;
        const tr = truth[it.id];
        rows.push({ lang, student, row: n, item: it.id, skill: it.skill, area: (Es.SK[it.skill] || {}).area, kc_index: seen[it.skill], has_notes: notes.has(it.skill) ? 1 : 0, p_true: tr ? +(notes.has(it.skill) ? tr.c1 : tr.c0).toFixed(3) : "", y: a.ok ? 1 : 0, fmt: a.fmt });
        if (Es.S.sprint.done.length >= 5) Es.S.sprint = Es.newSprint(Es.S.sprint.n + 1);
      }
      const rr = Es.researchRows(), head = Es.RESEARCH_COLS;
      rr.forEach((r, i) => { if (rows[i]) cols.forEach(c => rows[i][c] = r[head.indexOf(c)]); });
      L.game.push(...rows);
    }
    /* C2 fixa: o mesmo degrau, todos os itens em ordem aleatória, sem adaptação; previsões por replay */
    if (opts.partida !== "adaptativa") {
      process.stdout.write(opts.partida === "fixa" ? " | aluno " + s + " (fixa)" : "+fixa");
      seedRNG(opts.semente, slug, DIALECT, lang, "aluno", s, "fixa");
      const seenF = {}, notesF = new Set(), rowsF = [];
      for (const it of shuf(items)) { if (timeLeft() <= 0) break;
        seenF[it.skill] = (seenF[it.skill] || 0) + 1; if (seenF[it.skill] > 3) notesF.add(it.skill);
        const a = await askStudent(E, brain, lang, it, notesF.has(it.skill) ? [it.skill] : [], "js"), tr = truth[it.id];
        rowsF.push({ lang, student, row: rowsF.length + 1, item: it.id, skill: it.skill, area: (E.SK[it.skill] || {}).area, kc_index: seenF[it.skill], has_notes: notesF.has(it.skill) ? 1 : 0,
          p_true: tr ? +(notesF.has(it.skill) ? tr.c1 : tr.c0).toFixed(3) : "", y: a.ok ? 1 : 0, fmt: a.fmt }); }
      const rp = E.KT.replay(rowsF.map(g => ({ key: g.skill, item: E.IT[g.item], c: E.guessProb(E.IT[g.item]), y: g.y })), E.L0);
      rowsF.forEach((g, i) => MODELS.forEach(m => g["rpred_" + m] = rp[i][m]));
      L.fixed.push(...rowsF);
    }
  }
  /* tutores: não dependem do dialeto, então rodam uma vez por cérebro (na passada sem dialeto) */
  if (opts.tutor > 0 && (!DIALECT || opts.dialeto === "sim") && timeLeft() > 0) {
    process.stdout.write(" | tutores"); seedRNG(opts.semente, slug, lang, "tutor");
    const tItems = shuf(items.filter(i => i.type === "mc" && !i.opts)).slice(0, opts.tutor);
    for (const it of tItems) { if (timeLeft() <= 0) break; L.tut.push(...await tutorRun(E, brain, lang, it)); }
  }
  const d = k => brain.stats[k] - st0[k]; L.perLang.push({ lang, calls: d("calls"), min: (Date.now() - tl) / 60000, inTok: d("inTok"), outTok: d("outTok") });
  console.log(" | " + ((Date.now() - tl) / 60000).toFixed(1) + " min");
  return L;
}
const brainSlug = spec => spec.replace(/[^\w.-]+/g, "_");

async function pilot(opts) {
  const brain = makeBrain(opts.cerebro), langs = opts.idiomas, budgetMs = opts.minutos > 0 ? opts.minutos * 60000 : Infinity, t0 = Date.now();
  await preflight(brain); NOTES_MODE = opts.notas;
  const out = path.join(ROOT, "agentes", "saida", opts.rodada, brainSlug(opts.cerebro) + (DIALECT ? "-dialeto" : "")), parc = path.join(out, "parcial");
  fs.mkdirSync(parc, { recursive: true });
  fs.writeFileSync(path.join(out, "config.json"), JSON.stringify({ ...opts, dialetoNestaPassada: DIALECT, cerebro: opts.cerebro, inicio: new Date().toISOString() }, null, 1));
  const E0 = loadEngine(); E0.S = E0.fresh(); E0.S.lang = "en"; E0.S.pl = "js";
  const SK_ = opts.habilidades ? opts.habilidades.split(",") : E0.SKILLS.map(x => x.id);
  const items = E0.ITEMS.filter(i => SK_.includes(i.skill) && i.type !== "code" && !i.extra);
  console.log("\n== " + brain.spec + (DIALECT ? " · com dialeto" : " · sem dialeto") + " · rodada " + opts.rodada + " · " + items.length + " itens · " + opts.reps + " repetições · " + opts.alunos + " alunos · semente " + opts.semente);
  const all = { med: [], game: [], fixed: [], tut: [], perLang: [] }, timeLeft = () => budgetMs - (Date.now() - t0);
  for (const lang of langs) {
    const pf = path.join(parc, lang + ".json");
    let L;
    if (fs.existsSync(pf)) { L = JSON.parse(fs.readFileSync(pf, "utf8"));
      const nAl = new Set((opts.partida === "adaptativa" ? L.game : L.fixed).map(g => g.student)).size;
      if (nAl < opts.alunos) { console.log(lang + ": gravado com " + nAl + " de " + opts.alunos + " alunos; refazendo"); fs.unlinkSync(pf); L = null; }
      else console.log(lang + ": já feito nesta rodada, retomado do disco"); }
    if (L) { for (const k in all) all[k].push(...L[k]); continue; }
    else { if (timeLeft() <= 0) { console.log("Tempo esgotado antes de " + lang + ". Rode o mesmo comando com --rodada " + opts.rodada + " para continuar daqui."); break; }
      L = await runLanguage(opts, brain, lang, items, timeLeft);
      const nAl = new Set((opts.partida === "adaptativa" ? L.game : L.fixed).map(g => g.student)).size;
      if (nAl < opts.alunos) { console.log("   " + lang + " ficou incompleto (" + nAl + " de " + opts.alunos + " alunos) e não foi gravado; será refeito na retomada."); break; }
      fs.writeFileSync(pf + ".tmp", JSON.stringify(L)); fs.renameSync(pf + ".tmp", pf); }   /* gravação atômica: um arquivo pela metade nunca é lido como pronto */
    for (const k in all) all[k].push(...L[k]);
  }
  fs.writeFileSync(path.join(out, "medicao.csv"), csvOf(all.med)); fs.writeFileSync(path.join(out, "jogo.csv"), csvOf(all.game));
  if (all.fixed.length) fs.writeFileSync(path.join(out, "jogo-fixo.csv"), csvOf(all.fixed));
  fs.writeFileSync(path.join(out, "tutores.jsonl"), all.tut.map(r => JSON.stringify(r)).join("\n"));
  const units = unitMetrics(E0, all.med, all.game, all.fixed);
  fs.writeFileSync(path.join(out, "metricas.json"), JSON.stringify({ cerebro: opts.cerebro, dialeto: DIALECT, units }, null, 1));
  fs.writeFileSync(path.join(out, "RESUMO.md"), report(brain, langs, all.med, all.game, all.tut, Date.now() - t0, E0, all.perLang, all.fixed) + varianceSection(units));
  console.log("Pronto em " + ((Date.now() - t0) / 60000).toFixed(1) + " min. Resultados em " + path.relative(ROOT, out));
}

/* ---------------- métricas por aluno (unidade = idioma × aluno) e intervalos ---------------- */
function unitMetrics(E, med, game, fixed) {
  const mean = a => a.length ? a.reduce((s, v) => s + v, 0) / a.length : null;
  const c0 = {}; med.forEach(x => { const k = x.lang + "|" + x.skill; (c0[k] = c0[k] || []).push(x.c0); });
  const units = [];
  for (const st of [...new Set(fixed.map(g => g.student))]) {
    const F = fixed.filter(g => g.student === st && g.p_true !== ""), A = game.filter(g => g.student === st && g.p_true !== ""), lang = st.split("-")[0];
    const P = [];
    for (const sk of [...new Set(F.map(g => g.skill))]) { const R = F.filter(g => g.skill === sk);
      const rp = E.KT.replay(R.map(g => ({ key: sk, item: E.IT[g.item], c: E.guessProb(E.IT[g.item]), y: g.y })), Math.min(.95, Math.max(.05, mean(c0[lang + "|" + sk] || [E.L0]))));
      R.forEach((g, i) => P.push({ g, p: rp[i] })); }
    const u = { student: st, lang };
    const dTrue = (rows, f) => mean(rows.filter(g => f(g).kc_index >= 4).map(g => +f(g).p_true)) - mean(rows.filter(g => f(g).kc_index <= 3).map(g => +f(g).p_true));
    u.mask_adapt = A.length ? dTrue(A, g => g) : null; u.mask_fixed = dTrue(F, g => g);
    for (const ar of ["prog", "se"]) { const Q = P.filter(x => x.g.area === ar); if (Q.length < 6) continue;
      const dT = dTrue(Q, x => x.g); u["dtrue_" + ar] = dT;
      for (const m of MODELS) { const dP = mean(Q.filter(x => x.g.kc_index >= 4).map(x => x.p[m])) - mean(Q.filter(x => x.g.kc_index <= 3).map(x => x.p[m]));
        u[m + "_excess_" + ar] = dP - dT; u[m + "_brier_" + ar] = mean(Q.map(x => (x.p[m] - x.g.p_true) ** 2)); } }
    units.push(u);
  }
  return units;
}
function ci(vals, B = 2000) {   /* média e intervalo de 95% por bootstrap sobre as unidades */
  const v = vals.filter(x => x != null && !isNaN(x)); if (v.length < 2) return null;
  const m = v.reduce((s, x) => s + x, 0) / v.length, bs = [];
  let a = 987654321; const r = () => { a = (a * 1103515245 + 12345) >>> 0; return a / 4294967296; };
  for (let b = 0; b < B; b++) { let s = 0; for (let i = 0; i < v.length; i++) s += v[Math.floor(r() * v.length)]; bs.push(s / v.length); }
  bs.sort((x, y) => x - y); return { m, lo: bs[Math.floor(.025 * B)], hi: bs[Math.floor(.975 * B)], n: v.length };
}
function ciLang(units, key, B = 2000) {   /* bootstrap de IDIOMAS inteiros: respeita a dependência entre alunos do mesmo idioma */
  const by = {}; for (const u of units) { const v = typeof key === "function" ? key(u) : u[key]; if (v == null || isNaN(v)) continue; (by[u.lang] = by[u.lang] || []).push(v); }
  const L = Object.keys(by); if (L.length < 2) return ci(units.map(u => typeof key === "function" ? key(u) : u[key]));
  const all = L.flatMap(l => by[l]), m = all.reduce((s, x) => s + x, 0) / all.length, bs = [];
  let a = 123456789; const r = () => { a = (a * 1103515245 + 12345) >>> 0; return a / 4294967296; };
  for (let b = 0; b < B; b++) { let s2 = 0, n = 0; for (let i = 0; i < L.length; i++) { const g = by[L[Math.floor(r() * L.length)]]; for (const x of g) { s2 += x; n++; } } bs.push(s2 / n); }
  bs.sort((x, y) => x - y); return { m, lo: bs[Math.floor(.025 * B)], hi: bs[Math.floor(.975 * B)], n: all.length };
}
const fci = c => c ? (c.m >= 0 ? "+" : "") + c.m.toFixed(2) + " [" + c.lo.toFixed(2) + ", " + c.hi.toFixed(2) + "]" : "-";
function varianceSection(units) {
  if (units.length < 2) return "";
  let r = `\n## 6. Variância entre alunos (${units.length} unidades = idiomas × alunos), prior correto, partida fixa\n\nMédia e intervalo de 95% por bootstrap de idiomas inteiros (os alunos de um mesmo idioma compartilham itens e verdade medida, então não são independentes). **Excesso** = ganho previsto menos o verdadeiro: em engenharia de software (nada a aprender) é o **alarme falso**; em programação com dialeto, positivo é exagerar a aprendizagem real e negativo é não enxergá-la. Um intervalo que não contém zero indica efeito consistente entre alunos.\n\n`;
  r += `**Mascaramento**: verdade antes → depois do degrau, Δ na partida adaptativa ${fci(ciLang(units, "mask_adapt"))}; na fixa ${fci(ciLang(units, "mask_fixed"))}.\n\n`;
  r += "| Modelo | Alarme falso (eng. software) | Excesso em programação | Brier em programação |\n|---|---|---|---|\n";
  for (const m of MODELS) r += `| ${m.toUpperCase()} | ${fci(ciLang(units, m + "_excess_se"))} | ${fci(ciLang(units, m + "_excess_prog"))} | ${fci(ciLang(units, m + "_brier_prog"))} |\n`;
  return r;
}

/* ---------------- consolidação: todos os cérebros e modos de uma rodada ---------------- */
function consolidate(opts) {
  const base = path.join(ROOT, "agentes", "saida", opts.rodada);
  if (!fs.existsSync(base)) throw new Error("Rodada não encontrada: " + base);
  const runs = fs.readdirSync(base).filter(d => fs.existsSync(path.join(base, d, "metricas.json"))).sort();
  let r = `# Consolidado da rodada ${opts.rodada}\n\nCada linha: um cérebro num modo. Médias com intervalo de 95% por bootstrap de idiomas inteiros (alunos do mesmo idioma não são independentes), partida fixa, prior correto.\n\n## Alarme falso (engenharia de software, nada a aprender)\n\n| Cérebro | Dialeto | n | ` + MODELS.map(m => m.toUpperCase()).join(" | ") + " |\n|---|---|---|" + MODELS.map(() => "---").join("|") + "|\n";
  const rows = runs.map(d => ({ d, j: JSON.parse(fs.readFileSync(path.join(base, d, "metricas.json"), "utf8")) }));
  for (const { j } of rows) r += `| ${j.cerebro} | ${j.dialeto ? "sim" : "não"} | ${j.units.length} | ` + MODELS.map(m => fci(ciLang(j.units, m + "_excess_se"))).join(" | ") + " |\n";
  r += "\n## Excesso em programação (com dialeto, onde há aprendizagem real)\n\n| Cérebro | Ganho verdadeiro | " + MODELS.map(m => m.toUpperCase()).join(" | ") + " |\n|---|---|" + MODELS.map(() => "---").join("|") + "|\n";
  for (const { j } of rows.filter(x => x.j.dialeto)) r += `| ${j.cerebro} | ${fci(ciLang(j.units, "dtrue_prog"))} | ` + MODELS.map(m => fci(ciLang(j.units, m + "_excess_prog"))).join(" | ") + " |\n";
  r += "\n## Mascaramento pela adaptação\n\n| Cérebro | Dialeto | Δ verdade, adaptativa | Δ verdade, fixa |\n|---|---|---|---|\n";
  for (const { j } of rows) r += `| ${j.cerebro} | ${j.dialeto ? "sim" : "não"} | ${fci(ciLang(j.units, "mask_adapt"))} | ${fci(ciLang(j.units, "mask_fixed"))} |\n`;
  const all = rows.flatMap(x => x.j.units);
  r += `\n## Todos juntos (${all.length} unidades)\n\n| Modelo | Alarme falso | Excesso em programação (só com dialeto) |\n|---|---|---|\n`;
  const dial = rows.filter(x => x.j.dialeto).flatMap(x => x.j.units);
  for (const m of MODELS) r += `| ${m.toUpperCase()} | ${fci(ciLang(all, m + "_excess_se"))} | ${fci(ciLang(dial, m + "_excess_prog"))} |\n`;
  r += "\n## Idiomas: custo de tokens e viés da medida\n\nPor cérebro: custo de tokens de entrada relativo ao inglês, e correlação de Spearman (entre idiomas) desse custo com o excesso dos modelos onde não há o que aprender, com p por permutação. Sinais opostos entre cérebros indicam que o viés é do par cérebro × idioma, não do idioma.\n\n";
  const rank = v => { const o = v.map((x, i) => [x, i]).sort((a, b) => a[0] - b[0]), r2 = Array(v.length); o.forEach(([, i], k) => r2[i] = k); return r2; };
  const pear = (a, b) => { const ma = a.reduce((s, x) => s + x, 0) / a.length, mb = b.reduce((s, x) => s + x, 0) / b.length; let n = 0, da = 0, db = 0; for (let i = 0; i < a.length; i++) { n += (a[i] - ma) * (b[i] - mb); da += (a[i] - ma) ** 2; db += (b[i] - mb) ** 2; } return da && db ? n / Math.sqrt(da * db) : 0; };
  const sp = (a, b) => pear(rank(a), rank(b));
  const perm = (a, b) => { const r0 = Math.abs(sp(a, b)); let c = 0, x = 7; const bb = b.slice(); for (let k = 0; k < 2000; k++) { for (let i = bb.length - 1; i > 0; i--) { x = (x * 1103515245 + 12345) >>> 0; const j2 = x % (i + 1); [bb[i], bb[j2]] = [bb[j2], bb[i]]; } if (Math.abs(sp(a, bb)) >= r0) c++; } return c / 2000; };
  for (const cer of [...new Set(rows.map(x => x.j.cerebro))]) {
    const tok = {}; for (const { d, j } of rows.filter(x => x.j.cerebro === cer && !x.j.dialeto)) { const pd = path.join(base, d, "parcial");
      if (fs.existsSync(pd)) for (const f of fs.readdirSync(pd)) { const P = JSON.parse(fs.readFileSync(path.join(pd, f), "utf8")); for (const x of P.perLang || []) tok[x.lang] = x.inTok; } }
    if (!tok.en) continue;
    const U2 = rows.filter(x => x.j.cerebro === cer).flatMap(x => x.j.units), L = Object.keys(tok).filter(l => U2.some(u => u.lang === l)).sort((a, b) => tok[b] - tok[a]);
    if (L.length < 5) continue;
    const rel = L.map(l => tok[l] / tok.en), ex = m => L.map(l => { const v = U2.filter(u => u.lang === l && u[m + "_excess_se"] != null).map(u => u[m + "_excess_se"]); return v.reduce((s, x) => s + x, 0) / v.length; });
    r += `**${cer}** · custo: ` + L.map((l, i) => l + " " + rel[i].toFixed(2) + "×").join(", ") + "\n\n| Modelo | ρ (custo × excesso) | p |\n|---|---|---|\n";
    for (const m of MODELS) { const e = ex(m); r += `| ${m.toUpperCase()} | ${(sp(rel, e) >= 0 ? "+" : "") + sp(rel, e).toFixed(2)} | ${perm(rel, e).toFixed(3)} |\n`; }
    r += "\n";
  }
  fs.writeFileSync(path.join(base, "CONSOLIDADO.md"), r);
  console.log(r); console.log("\nGravado em " + path.relative(ROOT, path.join(base, "CONSOLIDADO.md")));
}

/* ---------------- relatório ---------------- */
function auc(p, y) { const pos = [], neg = []; p.forEach((v, i) => (y[i] ? pos : neg).push(v)); if (!pos.length || !neg.length) return null; let w = 0; for (const a of pos) for (const b of neg) w += a > b ? 1 : a === b ? .5 : 0; return w / (pos.length * neg.length); }
const mean = a => a.length ? a.reduce((s, v) => s + v, 0) / a.length : null, f2 = v => v == null ? "-" : v.toFixed(2), f3 = v => v == null ? "-" : v.toFixed(3);
function report(brain, langs, med, game, tut, ms, E, perLang = [], fixed = []) {
  const st = brain.stats, models = ["elo", "irt", "bkt", "pfa", "afm"];
  let r = `# Piloto do laboratório de agentes\n\nCérebro: \`${brain.spec}\` · notas: ${NOTES_MODE} · dialeto cifrado: ${DIALECT ? "sim" : "não"} · idiomas: ${langs.join(", ")} · duração: ${(ms / 60000).toFixed(1)} min · chamadas: ${st.calls} (${st.fails} falhas) · latência média: ${(st.ms / Math.max(1, st.calls) / 1000).toFixed(2)} s` +
    (st.inTok ? ` · tokens: ${st.inTok} de entrada, ${st.outTok} de saída` : "") + "\n\n";
  r += "## 1. Aprendizes: vazamento e efeito das notas (C0 e C1)\n\nC0 é a taxa de acerto sem notas: o quanto o cérebro já sabe sozinho. Se ficar perto de C1, as notas não fazem diferença e o degrau da C2 fica invisível.\n\n| Idioma | C0 sem notas | C1 com notas | Ganho |\n|---|---|---|---|\n";
  for (const l of langs) { const m = med.filter(x => x.lang === l); if (!m.length) continue; const a = mean(m.map(x => x.c0)), b = mean(m.map(x => x.c1)); r += `| ${l} | ${f2(a)} | ${f2(b)} | ${f2(b - a)} |\n`; }
  r += "\n**Por área** (com o dialeto ligado, programação é onde as notas ensinam o vocabulário; engenharia de software fica como controle):\n\n| Área | C0 | C1 | Ganho |\n|---|---|---|---|\n";
  for (const ar of ["prog", "se"]) { const m = med.filter(x => (E.SK[x.skill] || {}).area === ar); if (m.length) r += `| ${ar === "prog" ? "programação" : "engenharia de software"} | ${f2(mean(m.map(x => x.c0)))} | ${f2(mean(m.map(x => x.c1)))} | ${f2(mean(m.map(x => x.c1 - x.c0)))} |\n`; }
  r += "\n**Conformidade de formato**: fração das respostas que vieram no formato pedido (\`ANSWER: ...\`). Abaixo de 1, o corretor tolerante entendeu o resto; \"ilegível\" é o que nem ele entendeu e conta como erro. Seguir instruções pior num idioma também é desigualdade.\n\n| Idioma | No formato | Tolerado | Ilegível |\n|---|---|---|---|\n";
  for (const l of langs) { const f = med.filter(x => x.lang === l).flatMap(x => [x.fmt0, x.fmt1]); if (!f.length) continue; const q = k => f.filter(v => v === k).length / f.length; r += `| ${l} | ${f2(q("pedido"))} | ${f2(q("tolerado"))} | ${f2(q("ilegivel"))} |\n`; }
  r += "\n**Por tipo de item** (todos os idiomas):\n\n| Tipo | C0 | C1 | Ganho | n |\n|---|---|---|---|---|\n";
  for (const ty of [...new Set(med.map(x => x.type))]) { const m = med.filter(x => x.type === ty); r += `| ${ty} | ${f2(mean(m.map(x => x.c0)))} | ${f2(mean(m.map(x => x.c1)))} | ${f2(mean(m.map(x => x.c1 - x.c0)))} | ${m.length} |\n`; }
  const byIt = {}; med.forEach(x => { const b = byIt[x.item] = byIt[x.item] || { c0: [], c1: [] }; b.c0.push(x.c0); b.c1.push(x.c1); });
  const informative = new Set(Object.keys(byIt).filter(k => mean(byIt[k].c1) - mean(byIt[k].c0) >= 0.2)), ceiling = Object.keys(byIt).filter(k => mean(byIt[k].c0) >= 0.95).length;
  r += `\n${ceiling} de ${Object.keys(byIt).length} itens já são acertados em 95% das vezes sem notas. ${informative.size} itens são **informativos** (as notas sobem o acerto em 0,2 ou mais): ${[...informative].join(", ") || "nenhum"}.\n`;
  r += "\n## 2. Os modelos de KT na partida real (C2) e embaralhada (C3)\n\n`p_true` é a taxa de acerto medida do mesmo item na condição em que o agente estava (C0 antes do degrau, C1 depois). Brier contra a verdade mede se o modelo acompanha o conhecimento real; AUC mede se separa acertos de erros. Viés = previsão menos a verdade do mesmo item, nos tickets 1–3 e 4+ de cada habilidade: o ideal é chegar a zero depois do degrau; positivo é aprendizagem fantasma (prever mais acerto do que existe). C3 refaz o replay com a ordem das respostas embaralhada dentro do estudante.\n\n| Modelo | AUC (respostas) | Brier vs verdade | Viés antes do degrau | Viés depois | AUC embaralhado (C3) |\n|---|---|---|---|---|---|\n";
  const G = game.filter(g => g.p_true !== "" && g.rpred_elo !== undefined && g.rpred_elo !== "");
  const dTrue = mean(G.filter(g => g.kc_index >= 4).map(g => +g.p_true)) - mean(G.filter(g => g.kc_index <= 3).map(g => +g.p_true));
  const shuffled = {}; for (const st of [...new Set(game.map(g => g.student || g.lang))]) { const rows = game.filter(g => (g.student || g.lang) === st); if (!rows.length) continue;
    const perm = shuf(rows), rp = E.KT.replay(perm.map(g => ({ key: g.skill, item: E.IT[g.item], c: E.guessProb(E.IT[g.item]), y: g.y })), E.L0);
    perm.forEach((g, i) => models.forEach(m => (shuffled[m] = shuffled[m] || { p: [], y: [] }).p.push(rp[i][m]) && shuffled[m].y.push(g.y))); }
  for (const m of models) { const p = G.map(g => +g["rpred_" + m]), y = G.map(g => g.y), pt = G.map(g => +g.p_true);
    const brier = mean(p.map((v, i) => (v - pt[i]) ** 2)), bias = sel => mean(G.filter(sel).map(g => +g["rpred_" + m] - +g.p_true));
    r += `| ${m.toUpperCase()} | ${f3(auc(p, y))} | ${f3(brier)} | ${f2(bias(g => g.kc_index <= 3))} | ${f2(bias(g => g.kc_index >= 4))} | ${f3(shuffled[m] ? auc(shuffled[m].p, shuffled[m].y) : null)} |\n`; }
  const GI = G.filter(g => informative.has(g.item));
  if (GI.length >= 10) { const dT = mean(GI.filter(g => g.kc_index >= 4).map(g => +g.p_true)) - mean(GI.filter(g => g.kc_index <= 3).map(g => +g.p_true));
    r += `\n**Só nos itens informativos** (${GI.length} linhas), onde o degrau existe de fato:\n\n| Modelo | AUC | Brier vs verdade | Δ previsto | Δ verdadeiro |\n|---|---|---|---|---|\n`;
    for (const m of models) { const p = GI.map(g => +g["rpred_" + m]), y = GI.map(g => g.y), pt = GI.map(g => +g.p_true);
      const dP = mean(GI.filter(g => g.kc_index >= 4).map(g => +g["rpred_" + m])) - mean(GI.filter(g => g.kc_index <= 3).map(g => +g["rpred_" + m]));
      r += `| ${m.toUpperCase()} | ${f3(auc(p, y))} | ${f3(mean(p.map((v, i) => (v - pt[i]) ** 2)))} | ${f2(dP)} | ${f2(dT)} |\n`; } }
  for (const ar of ["prog", "se"]) { const GA = G.filter(g => (E.SK[g.skill] || {}).area === ar); if (GA.length < 10) continue;
    r += `\n**${ar === "prog" ? "Programação" : "Engenharia de software"}** (${GA.length} linhas): viés antes → depois do degrau\n\n| Modelo | Antes | Depois | Brier vs verdade |\n|---|---|---|---|\n`;
    for (const m of models) { const b = sel => mean(GA.filter(sel).map(g => +g["rpred_" + m] - +g.p_true));
      r += `| ${m.toUpperCase()} | ${f2(b(g => g.kc_index <= 3))} | ${f2(b(g => g.kc_index >= 4))} | ${f3(mean(GA.map(g => (+g["rpred_" + m] - +g.p_true) ** 2)))} |\n`; } }
  if (fixed.length) {
    const tv = (rows, sel) => mean(rows.filter(sel).map(g => +g.p_true));
    r += "\n### Partida fixa (sem seleção adaptativa)\n\nMesmo degrau, itens em ordem aleatória. Aqui a diferença de verdade antes e depois do degrau é o ganho real de conhecimento, sem a dificuldade crescente misturada. Δ previsto deveria se aproximar de Δ verdadeiro; viés depois do degrau deveria ficar perto de zero.\n";
    for (const [lab, sel] of [["Todas as áreas", () => true], ["Programação", g => g.area === "prog"], ["Engenharia de software", g => g.area === "se"]]) {
      const F = fixed.filter(g => g.p_true !== "" && sel(g)); if (F.length < 10) continue;
      const dT = tv(F, g => g.kc_index >= 4) - tv(F, g => g.kc_index <= 3);
      r += `\n**${lab}** (${F.length} linhas) · verdade ${f2(tv(F, g => g.kc_index <= 3))} → ${f2(tv(F, g => g.kc_index >= 4))} (Δ verdadeiro ${f2(dT)})\n\n| Modelo | AUC | Brier vs verdade | Δ previsto | Viés depois |\n|---|---|---|---|---|\n`;
      for (const m of models) { const p = F.map(g => +g["rpred_" + m]), y = F.map(g => g.y), pt = F.map(g => +g.p_true), pm = s2 => mean(F.filter(s2).map(g => +g["rpred_" + m]));
        r += `| ${m.toUpperCase()} | ${f3(auc(p, y))} | ${f3(mean(p.map((v, i) => (v - pt[i]) ** 2)))} | ${f2(pm(g => g.kc_index >= 4) - pm(g => g.kc_index <= 3))} | ${f2(mean(F.filter(g => g.kc_index >= 4).map(g => +g["rpred_" + m] - +g.p_true)))} |\n`; } }
    /* Prior correto: o mesmo replay, mas cada habilidade começa do acerto MEDIDO do agente sem notas (C0), e não dos 15% do jogo.
       Com o ponto de partida certo, ganho previsto onde não há aprendizagem é fantasma puro, e não o modelo "alcançando" o aluno. */
    const c0 = {}; med.forEach(x => { const k = x.lang + "|" + x.skill; (c0[k] = c0[k] || []).push(x.c0); });
    const FP = []; for (const l of [...new Set(fixed.map(g => g.lang))]) for (const sk of [...new Set(fixed.filter(g => g.lang === l).map(g => g.skill))]) {
      const R = fixed.filter(g => g.lang === l && g.skill === sk && g.p_true !== ""); if (!R.length) continue;
      const L0c = Math.min(.95, Math.max(.05, mean(c0[l + "|" + sk] || [E.L0])));
      const rp = E.KT.replay(R.map(g => ({ key: sk, item: E.IT[g.item], c: E.guessProb(E.IT[g.item]), y: g.y })), L0c);
      R.forEach((g, i) => FP.push({ g, p: rp[i] })); }
    r += "\n### Partida fixa com o prior correto\n\nCada habilidade começa do acerto medido do agente sem notas, não dos 15% do jogo. Isso retira o efeito de o modelo estar só alcançando o aluno: o que sobra de ganho previsto onde não há aprendizagem é aprendizagem fantasma.\n\n| Área | Δ verdadeiro | " + models.map(m => m.toUpperCase() + " Δ (Brier)").join(" | ") + " |\n|---|---|" + models.map(() => "---").join("|") + "|\n";
    const det = {};
    for (const ar of ["prog", "se"]) { const P = FP.filter(x => x.g.area === ar); if (P.length < 10) continue;
      const tv2 = sel => mean(P.filter(x => sel(x.g.kc_index)).map(x => +x.g.p_true)), dT = tv2(k => k >= 4) - tv2(k => k <= 3);
      r += `| ${ar === "prog" ? "programação" : "engenharia de software"} | ${f2(dT)} | ` + models.map(m => { const d = mean(P.filter(x => x.g.kc_index >= 4).map(x => x.p[m])) - mean(P.filter(x => x.g.kc_index <= 3).map(x => x.p[m]));
        (det[m] = det[m] || {})[ar] = { d, dT }; return f2(d) + " (" + f3(mean(P.map(x => (x.p[m] - x.g.p_true) ** 2))) + ")"; }).join(" | ") + " |\n"; }
    if (det.elo && det.elo.prog && det.elo.se) {
      r += "\n**Placar do detector** (prior correto): *alarme falso* é o ganho previsto além do verdadeiro em engenharia de software, onde não há o que aprender; *fração detectada* é o ganho previsto sobre o verdadeiro em programação (1,0 = viu exatamente o que existe; só faz sentido com o dialeto ligado, quando há ganho real).\n\n| Modelo | Alarme falso | Fração detectada |\n|---|---|---|\n";
      for (const m of models) { const x = det[m]; r += `| ${m.toUpperCase()} | ${f2(x.se.d - x.se.dT)} | ${x.prog.dT > 0.03 ? f2(x.prog.d / x.prog.dT) : "-"} |\n`; } }
    const A = G, F = fixed.filter(g => g.p_true !== "");
    r += `\n**Mascaramento pela adaptação**: verdade antes → depois do degrau, na partida adaptativa ${f2(tv(A, g => g.kc_index <= 3))} → ${f2(tv(A, g => g.kc_index >= 4))}, na fixa ${f2(tv(F, g => g.kc_index <= 3))} → ${f2(tv(F, g => g.kc_index >= 4))}. Se a adaptativa desce enquanto a fixa sobe, a seleção de itens mais difíceis está escondendo a aprendizagem na taxa de acerto.\n`;
  }
  r += `\n${G.length} linhas da partida com verdade medida.\n\n## 3. Tutores: três estratégias de localização\n\nEscrita: fração das letras no sistema de escrita do idioma (1,0 = todo o texto na escrita certa). Vazamento: a dica contém a resposta certa. chrF contra a dica de referência do jogo (nos idiomas gerados por máquina, a referência também é tradução, então serve para comparar estratégias entre si, não como nota absoluta).\n\n| Idioma | Estratégia | Escrita | Vazamento | chrF | Caracteres |\n|---|---|---|---|---|---|\n`;
  for (const l of langs) for (const s of ["S1", "S2", "S3"]) { const t = tut.filter(x => x.lang === l && x.strategy === s); if (!t.length) continue;
    r += `| ${l} | ${s} | ${f2(mean(t.map(x => x.script_share)))} | ${f2(mean(t.map(x => x.leak)))} | ${mean(t.map(x => x.chrf)).toFixed(1)} | ${Math.round(mean(t.map(x => x.chars)))} |\n`; }
  if (perLang.length) { r += "\n## 4. Custo por idioma (QP4)\n\nMesmas tarefas em todos os idiomas: diferenças de tempo e de tokens são o custo do idioma para este cérebro.\n\n| Idioma | Chamadas | Minutos | Tokens de entrada | Tokens de saída | Entrada relativa à base (inglês, ou o 1º idioma) |\n|---|---|---|---|---|---|\n";
    const base = perLang.find(x => x.lang === "en") || perLang[0]; for (const x of perLang) r += `| ${x.lang} | ${x.calls} | ${x.min.toFixed(1)} | ${x.inTok} | ${x.outTok} | ${base && base.inTok ? (x.inTok / base.inTok).toFixed(2) + "×" : "-"} |\n`; }
  const perCall = st.ms / Math.max(1, st.calls) / 1000, full = 28000 * perCall / 3600;
  r += `\n## 5. Projeção para o estudo completo\n\nCom a latência medida (${perCall.toFixed(2)} s por chamada), o estudo completo com este cérebro (~28 mil chamadas, 20 idiomas) levaria cerca de **${full.toFixed(0)} horas** de máquina.\n\n## Limites deste piloto\n\n- Notas recuperadas pela habilidade do ticket (recuperação por etiqueta), não por similaridade; o estudo completo usa embeddings multilíngues.\n- Exercícios de código livre e desafios extras ficaram fora da medição C0/C1; na partida, código é escrito em JavaScript e executado num contexto isolado.\n- S1 usa instruções em inglês com conteúdo e resposta no idioma-alvo; o prompt inteiramente nativo pede modelos de instrução traduzidos e revisados.\n- Agentes não cansam, não esquecem e já sabem programação: isto valida instrumentos de medida, não substitui aprendizes reais (Fase 5).\n`;
  return r;
}

/* ---------------- calibração ---------------- */
async function calibrate(opts) {
  const brain = makeBrain(opts.cerebro); await preflight(brain); const E = loadEngine(); E.S = E.fresh(); E.S.lang = "pt"; E.S.pl = "js";
  const its = E.ITEMS.filter(i => PILOT_SKILLS.includes(i.skill) && i.type !== "code" && !i.extra).slice(0, 8);
  console.log("Calibrando " + brain.spec + " com 8 chamadas...");
  let ok = 0; for (const it of its) { const a = await askStudent(E, brain, "pt", it, PILOT_SKILLS, "js"); ok += a.ok; console.log("  " + it.id.padEnd(4) + (a.ok ? " certo  " : " errado ") + JSON.stringify(a.raw).slice(0, 70)); }
  const s = brain.stats, per = s.ms / s.calls / 1000;
  console.log("\nLatência média: " + per.toFixed(2) + " s por chamada (" + s.fails + " falhas). Acertos com notas: " + ok + "/8.");
  const nIt = E.ITEMS.filter(i => i.type !== "code" && !i.extra).length, perLangCalls = nIt * 2 * opts.reps + opts.alunos * (opts.tickets + nIt) + opts.tutor * 4;
  const plan = (langs, modes) => perLangCalls * langs * modes * per;
  console.log("Por idioma, com " + opts.alunos + " alunos e " + opts.reps + " repetições: ~" + perLangCalls + " chamadas.");
  console.log("Este cérebro, sem e com dialeto: 5 idiomas ~" + (plan(5, 2) / 60).toFixed(0) + " min · 20 idiomas ~" + (plan(20, 2) / 3600).toFixed(1) + " h. (A latência quente costuma ser menor que a desta calibração, que inclui carregar o modelo.)");
}

/* ---------------- linha de comando ---------------- */
const argv = process.argv.slice(2), cmd = argv[0], arg = (k, d) => { const i = argv.indexOf("--" + k); return i >= 0 ? argv[i + 1] : d; };
const opts = { cerebro: arg("cerebro", "ollama:qwen3:8b"), idiomas: arg("idiomas", "pt,en,zh,hi,ar").split(","), minutos: +arg("minutos", 0),   /* 0 = sem limite; o limite antigo de 60 min cortava as passadas longas */ reps: +arg("repeticoes", 2), habilidades: arg("habilidades", null), notas: arg("notas", "ricas"), dialeto: arg("dialeto", "nao"), partida: arg("partida", "ambas"), alunos: +arg("alunos", 1), semente: arg("semente", "devwise"), rodada: arg("rodada", new Date().toISOString().slice(0, 16).replace(/[:T]/g, "-")), tickets: +arg("tickets", 60), tutor: +arg("tutor", 8) };
(cmd === "consolidar" ? Promise.resolve(consolidate(opts)) : cmd === "piloto" ? (async () => { const modes = opts.dialeto === "ambos" ? [false, true] : [opts.dialeto === "sim"];
  for (const c of (arg("cerebros") || opts.cerebro).split(",")) for (const dm of modes) { DIALECT = dm; for (const k in DICT) delete DICT[k]; await pilot({ ...opts, cerebro: c }); } })() : cmd === "calibrar" ? calibrate(opts) : Promise.resolve(console.log("Uso: node tools/agentes/laboratorio.js calibrar|piloto|consolidar --cerebro ollama:qwen3:8b [--idiomas pt,en,zh,hi,ar] [--minutos 60]")))
  .catch(e => { console.error("\nERRO: " + e.message); process.exit(1); });
