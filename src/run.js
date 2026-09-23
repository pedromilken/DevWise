/* DevWise - execução e avaliação de código escrito pelo estudante.

   Onde cada linguagem roda:
     js    no próprio navegador, num Web Worker isolado (sem DOM, sem rede), com limite de tempo;
     py    no próprio navegador, com Pyodide (Python compilado para WebAssembly), baixado de um CDN na primeira vez;
     java, c   NÃO rodam no navegador. Só são avaliadas se um docente configurar um serviço de execução compatível com o
           Piston (servidor próprio, ou a API pública com token de autorização). Sem serviço, o exercício fica indisponível
           nessas linguagens: nada de nota "aproximada".

   Dois tipos de falha, tratados de forma diferente:
     falha do código do estudante (erro de sintaxe, compilação, exceção, laço infinito, função com outro nome):
           todos os casos contam como errados e a nota é 0;
     falha da infraestrutura (sem Worker, Pyodide não baixou, serviço fora do ar ou sem autorização):
           a entrega não é avaliada, o estudante não perde nada e a tela explica o motivo. */
const RUN = (() => {
  const TIMEOUT = 4000, PYODIDE = "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js";

  /* comparação tolerante: número com margem, lista e objeto por conteúdo, texto exato sem espaços nas pontas */
  function same(a, b) {
    if (typeof b === "number" && typeof a === "number") return Math.abs(a - b) < 1e-9 || (Math.abs(b) > 1 && Math.abs(a - b) / Math.abs(b) < 1e-9);
    if (Array.isArray(b)) return Array.isArray(a) && a.length === b.length && a.every((x, i) => same(x, b[i]));
    if (b && typeof b === "object") { if (!a || typeof a !== "object") return false; const kb = Object.keys(b), ka = Object.keys(a);
      return kb.length === ka.length && kb.every(k => same(a[k], b[k])); }
    if (typeof b === "string") return String(a).trim() === b.trim();
    return a === b;
  }
  const show = v => v === undefined ? "undefined" : typeof v === "string" ? v : JSON.stringify(v);

  /* ---------- JavaScript: Web Worker descartável ---------- */
  function runJS(code, fn, cases) {
    return new Promise(resolve => {
      const src = `self.onmessage=function(e){var out=[];try{${""}
        var f=(function(){ ${"\u0000CODE\u0000"} ; return typeof ${"\u0000FN\u0000"}==="function"?${"\u0000FN\u0000"}:null; })();
        if(!f){self.postMessage({erro:"noFn"});return}
        for(var i=0;i<e.data.length;i++){ try{ out.push({v:f.apply(null,e.data[i])}) }catch(err){ out.push({e:String(err&&err.message||err)}) } }
        self.postMessage({out:out});
      }catch(err){ self.postMessage({erro:String(err&&err.message||err)}) }};`
        .split("\u0000CODE\u0000").join(code).split("\u0000FN\u0000").join(fn);
      let w, done = false;
      const finish = r => { if (done) return; done = true; try { w && w.terminate(); } catch (e) {} resolve(r); };
      try { w = new Worker(URL.createObjectURL(new Blob([src], { type: "text/javascript" }))); }
      catch (e) { return finish({ infra: "worker" }); }
      const timer = setTimeout(() => finish({ erro: "timeout" }), TIMEOUT);
      w.onmessage = e => { clearTimeout(timer); finish(e.data); };
      w.onerror = e => { clearTimeout(timer); finish({ erro: String((e && e.message) || "erro") }); };
      w.postMessage(cases.map(c => c.args));
    });
  }

  /* ---------- Python: Pyodide sob demanda ---------- */
  let pyLoading = null;
  function loadPyodide() {
    if (window.loadPyodide) return window.loadPyodide({ indexURL: PYODIDE.replace(/pyodide\.js$/, "") });
    if (!pyLoading) pyLoading = new Promise((ok, fail) => { const s = document.createElement("script"); s.src = PYODIDE; s.onload = ok; s.onerror = () => fail(new Error("rede")); document.head.append(s); })
      .then(() => window.loadPyodide({ indexURL: PYODIDE.replace(/pyodide\.js$/, "") }));
    return pyLoading;
  }
  let pyReady = null;
  async function runPY(code, fn, cases) {
    let py;
    try { if (!pyReady) pyReady = loadPyodide(); py = await pyReady; }
    catch (e) { pyReady = null; return { infra: "pyodide" }; }
    try {
      const prog = code + "\nimport json as _json\ndef _dw(cases):\n    out=[]\n    for a in cases:\n        try:\n            out.append({'v': " + fn + "(*a)})\n        except Exception as _e:\n            out.append({'e': str(_e)})\n    return _json.dumps(out)\n";
      py.runPython(prog);
      if (py.globals.get(fn) === undefined) return { erro: "noFn" };
      return { out: JSON.parse(py.runPython("_dw(" + JSON.stringify(cases.map(c => c.args)) + ")")) };
    } catch (e) { return { erro: String((e && e.message) || e).split("\n").filter(Boolean).slice(-2).join(" ").slice(0, 200) }; }
  }

  /* ---------- Serviço externo: Java e C ---------- */
  const jLit = (t, v) => t === "int[]" ? "new int[]{" + v.join(",") + "}" : t === "double" ? String(Number(v).toFixed(4)) : t === "String" ? JSON.stringify(v) : String(v);
  function javaProgram(code, item, cases) {
    const calls = cases.map(c => '    try { o.append("{\\"v\\":" + J(' + item.fn + "(" + c.args.map((a, k) => jLit(item.sig.args[k], a)).join(", ") + '))+"}"); }\n' +
      '    catch (Throwable e) { o.append("{\\"e\\":\\"" + String.valueOf(e).replace("\\\\","/").replace("\\"","\'") + "\\"}"); }').join('\n    o.append(",");\n');
    return "import java.util.*;\npublic class Main {\n" + code + "\n" +
      '  static String J(int x){return String.valueOf(x);}\n  static String J(long x){return String.valueOf(x);}\n  static String J(double x){return String.valueOf(x);}\n' +
      '  static String J(String s){return s==null?"null":"\\""+s.replace("\\\\","\\\\\\\\").replace("\\"","\\\\\\"")+"\\"";}\n' +
      '  public static void main(String[] argv){\n    StringBuilder o = new StringBuilder("[");\n' + calls + '\n    System.out.println(o.append("]"));\n  }\n}\n';
  }
  function cProgram(code, item, cases) {
    const fmt = item.sig.ret === "String" ? '\\"%s\\"' : item.sig.ret === "double" ? "%g" : "%d";
    const calls = cases.map((c, i) => {
      const decl = [], args = [];
      c.args.forEach((a, k) => { const t = item.sig.args[k];
        if (t === "int[]") { decl.push("int a" + i + "_" + k + "[" + Math.max(1, a.length) + "] = {" + (a.length ? a.join(",") : "0") + "};"); args.push("a" + i + "_" + k, String(a.length)); }
        else args.push(t === "double" ? Number(a).toFixed(4) : t === "String" ? JSON.stringify(a) : String(a)); });
      return '  { ' + decl.join(" ") + ' printf("{\\"v\\":' + fmt + '}", ' + item.fn + "(" + args.join(", ") + ")); }";
    }).join('\n  printf(",");\n');
    return "#include <stdio.h>\n#include <string.h>\n#include <stdlib.h>\n" + code + '\nint main(void) {\n  printf("[");\n' + calls + '\n  printf("]\\n");\n  return 0;\n}\n';
  }
  async function runRemote(cfg, lang, item, code, cases) {
    const src = lang === "java" ? javaProgram(code, item, cases) : cProgram(code, item, cases);
    const headers = { "content-type": "application/json" }; if (cfg.token) headers.authorization = cfg.token;
    let d;
    try {
      const r = await fetch(cfg.url, { method: "POST", headers,
        body: JSON.stringify({ language: lang, version: "*", files: [{ name: lang === "java" ? "Main.java" : "main.c", content: src }], run_timeout: 3000, compile_timeout: 10000 }) });
      if (r.status === 401 || r.status === 403) return { infra: "auth" };
      if (!r.ok) return { infra: "HTTP " + r.status };
      d = await r.json();
    } catch (e) { return { infra: "rede" }; }
    if (d.compile && d.compile.code) return { erro: (d.compile.stderr || d.compile.output || "compilação").split("\n").filter(Boolean).slice(0, 2).join(" ").slice(0, 200) };
    const run = d.run || {};
    try { return { out: JSON.parse((run.stdout || "").trim()) }; }
    catch (e) { return { erro: (run.stderr || run.output || (run.signal ? "interrompido: " + run.signal : "sem saída")).split("\n").filter(Boolean).slice(0, 2).join(" ").slice(0, 200) }; }
  }

  /* ---------- Restrições dos desafios ----------
     O código é limpo de comentários e de textos entre aspas antes da busca, para que um "*" dentro de uma mensagem
     não conte como multiplicação. É verificação estática: um estudante determinado consegue driblar, e para aprender basta. */
  function strip(code, lang) {
    let c = code;
    if (lang === "py") c = c.replace(/("""|''')[\s\S]*?\1/g, " ").replace(/#[^\n]*/g, " ");
    else c = c.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/\/\/[^\n]*/g, " ");
    return c.replace(/"(?:\\.|[^"\\\n])*"/g, '""').replace(/'(?:\\.|[^'\\\n])*'/g, "''").replace(/`(?:\\.|[^`\\])*`/g, "``");
  }
  function rules(code, lang, list) {
    const c = strip(code, lang);
    return (list || []).map(r => {
      const spec = r.forbid || r.require, re = spec[lang] || spec.all;
      if (!re) return null;                                   /* regra que não se aplica a esta linguagem */
      const n = (c.match(new RegExp(re, "g")) || []).length;
      return { id: r.id, ok: r.forbid ? n === 0 : n >= (spec.min || 1) };
    }).filter(Boolean);
  }
  const CAP = 0.59;   /* código que funciona mas quebra a regra fica, no máximo, em Regular */

  /* ---------- Verificação estrutural (Java, C, ou quando a execução falha) ---------- */
  function structural(code, checks) {
    const limpo = code.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/\/\/[^\n]*/g, " ").replace(/#[^\n]*/g, " ");
    return (checks || []).map(c => ({ id: c.id, ok: c.absent ? !new RegExp(c.re, "m").test(limpo) : new RegExp(c.re, "m").test(limpo), peso: c.peso || 1 }));
  }

  return {
    /* Avalia o código e devolve { modo, pct, casos, checks, erro }. modo: "exec" (rodou) ou "estrutura". */
    /* Avalia e devolve { modo, pct, casos, checks, erro }.
       modo "exec": rodou (a nota vale, mesmo que seja 0 por erro no código);
       modo "indisponivel": a infraestrutura falhou ou não existe, e a entrega não é avaliada. */
    async evaluate(item, lang, code, cfg) {
      const cases = item.tests || [];
      let r;
      if (lang === "java" || lang === "c") r = cfg && cfg.url ? await runRemote(cfg, lang, item, code, cases) : { infra: "semServico" };
      else if (lang === "js") r = typeof Worker !== "undefined" ? await runJS(code, item.fn, cases) : { infra: "worker" };
      else r = await runPY(code, item.fn, cases);
      if (r.infra) return { modo: "indisponivel", erro: r.infra, casos: [], checks: [], pct: null };
      const st = structural(code, item.checks), pesoS = st.reduce((a, x) => a + x.peso, 0);
      if (r.erro) {   /* o código não rodou: nota 0, com o motivo em cada caso */
        const casos = cases.map(c => ({ nome: c.nome || (item.fn + "(" + c.args.map(show).join(", ") + ")"), esperado: show(c.out), obtido: "", ok: false, peso: c.peso || 1, oculto: !!c.oculto }));
        return { modo: "exec", erro: r.erro, casos, checks: st, regras: rules(code, lang, item.rules), pct: 0 };
      }
      const casos = cases.map((c, i) => { const got = r.out[i] || {}; const ok = !("e" in got) && same(got.v, c.out);
        return { nome: c.nome || (item.fn + "(" + c.args.map(show).join(", ") + ")"), esperado: show(c.out), obtido: "e" in got ? got.e : show(got.v), ok, peso: c.peso || 1, oculto: !!c.oculto }; });
      const peso = casos.reduce((a, x) => a + x.peso, 0) || 1, pctCasos = casos.reduce((a, x) => a + (x.ok ? x.peso : 0), 0) / peso;
      /* a estrutura só entra quando o código de fato rodou: 20% da nota */
      const pct = pesoS ? 0.8 * pctCasos + 0.2 * (st.reduce((a, x) => a + (x.ok ? x.peso : 0), 0) / pesoS) : pctCasos;
      const rg = rules(code, lang, item.rules), violou = rg.some(x => !x.ok);
      return { modo: "exec", casos, checks: st, regras: rg, violou, pct: violou ? Math.min(pct, CAP) : pct };
    },
    /* A linguagem executa neste momento? (JS e Python sempre; Java e C só com serviço configurado) */
    canRun: (lang, cfg) => lang === "js" || lang === "py" || !!(cfg && cfg.url),
    javaProgram, cProgram, rules, strip,
    /* Impressão digital do que foi enviado: prova o conteúdo e o instante, não a autoria. */
    async hash(txt) {
      try { const b = new TextEncoder().encode(txt), d = await crypto.subtle.digest("SHA-256", b);
        return [...new Uint8Array(d)].map(x => x.toString(16).padStart(2, "0")).join("").slice(0, 32); }
      catch (e) { let h = 0; for (let i = 0; i < txt.length; i++) { h = (h * 31 + txt.charCodeAt(i)) | 0; } return "fnv" + (h >>> 0).toString(16); }
    },
    same, structural
  };
})();
