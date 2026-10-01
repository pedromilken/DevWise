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
  const g = { localStorage: { getItem() { return null; }, setItem() {} }, window: { scrollTo() {} }, navigator: { language: "pt" }, location: { search: "" },
    document: { documentElement: { setAttribute() {} }, getElementById() { return stubEl(); }, createElement: stubEl, createElementNS: stubEl, createTextNode() { return {}; }, createDocumentFragment() { return { append() {} }; }, body: { append() {} } } };
  const fn = new Function(...Object.keys(g), src + `;return {get S(){return S},set S(v){S=v},setCur(v){cur=v},getCur(){return cur},
    fresh,fillBoard,pendingMissions,resolve,newSprint,exportCSV,researchRows,itemOpts,guessProb,itT,skT,trk,mastered,unlocked,
    IT,ITEMS,SKILLS,SK,LANG,STUDY_LANGS,PLS,KT,RUN,L0};`);
  return fn(...Object.values(g));
}

/* ---------------- cérebros ---------------- */
function makeBrain(spec) {
  const [kind, ...rest] = spec.split(":"), model = rest.join(":");
  const stats = { calls: 0, ms: 0, inTok: 0, outTok: 0, fails: 0 };
  async function call(messages, { temperature = 0.7, max = 80 } = {}) {
    const t0 = Date.now(); let text = "";
    try {
      if (kind === "simulado") text = simulated(messages);
      else if (kind === "ollama") {
        const base = process.env.OLLAMA_HOST || "http://localhost:11434";
        const body = { model, messages, stream: false, think: false, options: { temperature, num_predict: max, num_ctx: 8192 } };
        let r = await fetch(base + "/api/chat", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
        if (!r.ok && r.status === 400) { delete body.think; r = await fetch(base + "/api/chat", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) }); }
        if (!r.ok) throw new Error("Ollama HTTP " + r.status + " " + (await r.text()).slice(0, 160));
        const d = await r.json(); text = (d.message && d.message.content) || ""; stats.inTok += d.prompt_eval_count || 0; stats.outTok += d.eval_count || 0;
      } else if (kind === "openai") {
        const base = (process.env.OPENAI_BASE_URL || "https://api.openai.com/v1").replace(/\/+$/, "");
        const r = await fetch(base + "/chat/completions", { method: "POST", headers: { "content-type": "application/json", authorization: "Bearer " + process.env.OPENAI_API_KEY },
          body: JSON.stringify({ model, messages, temperature, max_tokens: max }) });
        if (!r.ok) throw new Error("HTTP " + r.status + " " + (await r.text()).slice(0, 160));
        const d = await r.json(); text = d.choices[0].message.content || ""; if (d.usage) { stats.inTok += d.usage.prompt_tokens; stats.outTok += d.usage.completion_tokens; }
      } else if (kind === "anthropic") {
        const sys = messages.filter(m => m.role === "system").map(m => m.content).join("\n");
        const r = await fetch("https://api.anthropic.com/v1/messages", { method: "POST", headers: { "content-type": "application/json", "x-api-key": process.env.ANTHROPIC_API_KEY, "anthropic-version": "2023-06-01" },
          body: JSON.stringify({ model, system: sys, messages: messages.filter(m => m.role !== "system"), temperature, max_tokens: max }) });
        if (!r.ok) throw new Error("HTTP " + r.status + " " + (await r.text()).slice(0, 160));
        const d = await r.json(); text = d.content.map(c => c.text || "").join(""); if (d.usage) { stats.inTok += d.usage.input_tokens; stats.outTok += d.usage.output_tokens; }
      } else throw new Error("cérebro desconhecido: " + spec);
    } catch (e) { stats.fails++; if (stats.fails <= 3) console.error("   aviso: " + e.message); if (stats.fails > 20) throw new Error("falhas demais no cérebro; o servidor está no ar?"); }
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
  const hasNotes = /NOTES:\n(?!\(none\))/.test(u), p = hasNotes ? 0.85 : 0.3, right = Math.random() < p;
  const k = (u.match(/CORRECT_FOR_SIMULATION: (.*)/) || [])[1] || "";
  if (right) return "ANSWER: " + k;
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
const shuf = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
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
  const wrong = 1 + Math.floor(Math.random() * (opts(lang).length - 1));
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

/* ---------------- piloto ---------------- */
const PILOT_SKILLS = ["var", "cond", "req", "git"];
async function pilot(opts) {
  const brain = makeBrain(opts.cerebro), langs = opts.idiomas, budgetMs = opts.minutos * 60000, t0 = Date.now();
  await preflight(brain); NOTES_MODE = opts.notas;
  const out = path.join(ROOT, "agentes", "saida", new Date().toISOString().slice(0, 16).replace(/[:T]/g, "-") + "-" + opts.cerebro.replace(/[^\w.-]+/g, "_") + (DIALECT ? "-dialeto" : ""));
  fs.mkdirSync(out, { recursive: true });
  const E0 = loadEngine(); E0.S = E0.fresh(); E0.S.lang = "en"; E0.S.pl = "js";
  const SK_ = opts.habilidades ? opts.habilidades.split(",") : E0.SKILLS.map(x => x.id);
  const items = E0.ITEMS.filter(i => SK_.includes(i.skill) && i.type !== "code" && !i.extra);
  const reps = opts.reps, gameTickets = opts.tickets, tutorN = opts.tutor;
  console.log("Piloto: " + brain.spec + " | idiomas " + langs.join(",") + " | " + items.length + " itens x 2 condições x " + reps + " repetições + partida de " + gameTickets + " tickets + " + tutorN + " itens de tutor, por idioma");
  const med = [], game = [], fixed = [], tut = [], perLang = [], timeLeft = () => budgetMs - (Date.now() - t0);
  for (const lang of langs) {
    if (timeLeft() <= 0) { console.log("Tempo esgotado antes de " + lang + "."); break; }
    const E = loadEngine(); E.S = E.fresh(); E.S.lang = lang; E.S.pl = "js"; E.S.started = true; E.S.confirm = false;
    const tl = Date.now(), st0 = { ...brain.stats }; process.stdout.write(lang + ": medição");
    /* C0 e C1: taxa de acerto medida de cada item, sem notas e com todas as notas do piloto */
    const truth = {};
    for (const it of items) { truth[it.id] = { c0: 0, c1: 0, n: 0 };
      for (let r = 0; r < reps; r++) { const a0 = await askStudent(E, brain, lang, it, [], "js"), a1 = await askStudent(E, brain, lang, it, [it.skill], "js");
        truth[it.id].c0 += a0.ok; truth[it.id].c1 += a1.ok; truth[it.id].n++;
        med.push({ lang, item: it.id, skill: it.skill, type: it.type, rep: r + 1, c0: a0.ok ? 1 : 0, c1: a1.ok ? 1 : 0, fmt0: a0.fmt, fmt1: a1.fmt, key0: a0.key, key1: a1.key, raw0: a0.raw.slice(0, 120), raw1: a1.raw.slice(0, 120) }); } }
    for (const k in truth) { truth[k].c0 /= truth[k].n; truth[k].c1 /= truth[k].n; }
    /* C2: partida real, com degrau conhecido: notas da habilidade só depois do 3º ticket dela */
    process.stdout.write(" | partida");
    const seen = {}, notes = new Set(); let n = 0;
    while (n < gameTickets && timeLeft() > 0) {
      E.pendingMissions().forEach(m => E.S.brief[m.id] = true); E.fillBoard(); if (!E.S.board.length) break;
      const it = E.IT[E.S.board[0]]; seen[it.skill] = (seen[it.skill] || 0) + 1;
      if (seen[it.skill] > 3) notes.add(it.skill);   /* degrau conhecido: notas a partir do 4º ticket da habilidade */
      const a = await askStudent(E, brain, lang, it, notes.has(it.skill) ? [it.skill] : [], "js");   /* RAG: só as notas da habilidade do ticket */
      E.setCur({ t0: Date.now(), item: it, hint: false, mode: "normal", typed: false, res: it.type === "code" ? { pct: a.ok ? 1 : 0, modo: "exec" } : null, tel: { pastes: 0, runs: 1 }, code: "" });
      E.resolve(a.ok); n++;
      const tr = truth[it.id]; game.push({ lang, row: n, item: it.id, skill: it.skill, kc_index: seen[it.skill], has_notes: notes.has(it.skill) ? 1 : 0,
        p_true: tr ? +(notes.has(it.skill) ? tr.c1 : tr.c0).toFixed(3) : "", y: a.ok ? 1 : 0 });
      if (E.S.sprint.done.length >= 5) E.S.sprint = E.newSprint(E.S.sprint.n + 1);
    }
    /* previsões gravadas pelo jogo (online) e reconstruídas do zero (replay), linha a linha */
    const rr = E.researchRows(), cols = ["pred_elo", "pred_irt", "pred_bkt", "pred_pfa", "pred_afm", "rpred_elo", "rpred_irt", "rpred_bkt", "rpred_pfa", "rpred_afm"];
    const head = ["schema", "student", "row", "timestamp", "session", "position", "sprint", "item", "skill", "area", "pl", "item_type", "bloom", "difficulty", "b", "c", "correct", "score", "mode", "hint", "typed", "ai", "bonus", "boss", "pilot", "log_version", ...cols];
    const gl = game.filter(g => g.lang === lang); rr.forEach((r, i) => { if (gl[i]) cols.forEach(c => gl[i][c] = r[head.indexOf(c)]); });
    /* C2 FIXA: o mesmo degrau (notas a partir do 4º ticket de cada habilidade), mas todos os itens em ordem aleatória,
       sem o piloto escolher a dificuldade. Separa a detecção de aprendizagem do efeito da seleção adaptativa, que sobe a
       dificuldade conforme o aluno melhora e por isso esconde o ganho na taxa de acerto. Previsões por replay, do zero. */
    if (opts.partida !== "adaptativa") {
      process.stdout.write(" | partida fixa");
      const seenF = {}, notesF = new Set(), rowsF = [];
      for (const it of shuf(items)) { if (timeLeft() <= 0) break;
        seenF[it.skill] = (seenF[it.skill] || 0) + 1; if (seenF[it.skill] > 3) notesF.add(it.skill);
        const a = await askStudent(E, brain, lang, it, notesF.has(it.skill) ? [it.skill] : [], "js"), tr = truth[it.id];
        rowsF.push({ lang, row: rowsF.length + 1, item: it.id, skill: it.skill, area: (E.SK[it.skill] || {}).area, kc_index: seenF[it.skill], has_notes: notesF.has(it.skill) ? 1 : 0,
          p_true: tr ? +(notesF.has(it.skill) ? tr.c1 : tr.c0).toFixed(3) : "", y: a.ok ? 1 : 0, fmt: a.fmt }); }
      const rp = E.KT.replay(rowsF.map(g => ({ key: g.skill, item: E.IT[g.item], c: E.guessProb(E.IT[g.item]), y: g.y })), E.L0);
      rowsF.forEach((g, i) => ["elo", "irt", "bkt", "pfa", "afm"].forEach(m => g["rpred_" + m] = rp[i][m]));
      fixed.push(...rowsF);
    }
    /* tutores */
    process.stdout.write(" | tutores");
    const tItems = shuf(items.filter(i => i.type === "mc" && !i.opts)).slice(0, tutorN);
    for (const it of tItems) { if (timeLeft() <= 0) break; tut.push(...await tutorRun(E, brain, lang, it)); }
    const d = k => brain.stats[k] - st0[k]; perLang.push({ lang, calls: d("calls"), min: (Date.now() - tl) / 60000, inTok: d("inTok"), outTok: d("outTok") });
    console.log(" | " + ((Date.now() - tl) / 60000).toFixed(1) + " min");
  }
  /* gravação */
  const csv = (rows) => { if (!rows.length) return ""; const h = Object.keys(rows[0]); return [h.join(","), ...rows.map(r => h.map(k => { const v = r[k] == null ? "" : String(r[k]); return /[",\n]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v; }).join(","))].join("\n"); };
  fs.writeFileSync(path.join(out, "medicao.csv"), csv(med)); fs.writeFileSync(path.join(out, "jogo.csv"), csv(game)); if (fixed.length) fs.writeFileSync(path.join(out, "jogo-fixo.csv"), csv(fixed));
  fs.writeFileSync(path.join(out, "tutores.jsonl"), tut.map(r => JSON.stringify(r)).join("\n"));
  fs.writeFileSync(path.join(out, "RESUMO.md"), report(brain, langs, med, game, tut, Date.now() - t0, E0, perLang, fixed));
  console.log("\nPronto em " + ((Date.now() - t0) / 60000).toFixed(1) + " min. Resultados em " + path.relative(ROOT, out) + "\\RESUMO.md");
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
  const shuffled = {}; for (const l of langs) { const rows = game.filter(g => g.lang === l); if (!rows.length) continue;
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
  console.log("Piloto de 5 idiomas (~1.300 chamadas): ~" + (1300 * per / 60).toFixed(0) + " min. Estudo completo (~28 mil): ~" + (28000 * per / 3600).toFixed(0) + " h.");
}

/* ---------------- linha de comando ---------------- */
const argv = process.argv.slice(2), cmd = argv[0], arg = (k, d) => { const i = argv.indexOf("--" + k); return i >= 0 ? argv[i + 1] : d; };
const opts = { cerebro: arg("cerebro", "ollama:qwen3:8b"), idiomas: arg("idiomas", "pt,en,zh,hi,ar").split(","), minutos: +arg("minutos", 60), reps: +arg("repeticoes", 2), habilidades: arg("habilidades", null), notas: arg("notas", "ricas"), dialeto: arg("dialeto", "nao"), partida: arg("partida", "ambas"), tickets: +arg("tickets", 60), tutor: +arg("tutor", 8) };
(cmd === "piloto" ? (async () => { const modes = opts.dialeto === "ambos" ? [false, true] : [opts.dialeto === "sim"];
  for (const c of (arg("cerebros") || opts.cerebro).split(",")) for (const dm of modes) { DIALECT = dm; for (const k in DICT) delete DICT[k]; await pilot({ ...opts, cerebro: c }); } })() : cmd === "calibrar" ? calibrate(opts) : Promise.resolve(console.log("Uso: node tools/agentes/laboratorio.js calibrar|piloto --cerebro ollama:qwen3:8b [--idiomas pt,en,zh,hi,ar] [--minutos 60]")))
  .catch(e => { console.error("\nERRO: " + e.message); process.exit(1); });
