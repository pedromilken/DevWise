#!/usr/bin/env node
/* Kit de revisão de textos com o Qwen (ou qualquer revisor humano), para os 20 idiomas.

   Uso:   node tools/revisao-qwen.js todos        prepara os 20 idiomas
          node tools/revisao-qwen.js zh ja ko     prepara só os citados

   Para cada idioma cria revisao/<xx>/ com:
     auditoria.txt     problemas que dá para achar sem IA: texto em inglês, marcador {x} trocado, nome próprio traduzido,
                       número com separador decimal errado, texto vazio;
     parte-01.md ...   prompt + textos, em partes de ~28 mil caracteres, prontas para colar no chat do Qwen
                       ou para o Qwen Code ler (um arquivo por vez).
   O revisor devolve SÓ o que mudou, num JSON plano {"caminho": "texto novo"}; salve como revisao/<xx>/correcoes-01.json
   e aplique com:  node tools/aplicar-patch.js revisao/<xx>/correcoes-01.json --lang <xx>

   Nada aqui usa API nem custa nada. Roda sobre os pacotes que estão na sua pasta, não sobre cópias antigas. */
const fs = require("fs"), path = require("path");
const root = path.join(__dirname, ".."), srcDir = path.join(root, "src"), outDir = path.join(root, "revisao");
const langList = fs.readdirSync(srcDir).filter(f => /^lang-.*\.js$/.test(f) && !f.includes(".mock."));
const code = ["data.js", "game.js", ...langList.filter(f => !f.includes(".patch.")), ...langList.filter(f => f.includes(".patch."))]
  .map(f => fs.readFileSync(path.join(srcDir, f), "utf8")).join("\n").replace('"use strict";', "");
const { LANG, STUDY_LANGS } = new Function(code + ";return {LANG, STUDY_LANGS};")();
const ESTILO = JSON.parse(fs.readFileSync(path.join(__dirname, "estilo.json"), "utf8"));

const flat = (o, p, out) => { if (typeof o === "string") out[p] = o; else if (o && typeof o === "object") for (const k in o) flat(o[k], p ? p + "." + k : k, out); return out; };
/* o nome não se traduz; o pronome de tratamento (Dona, Seu) pode ser adaptado: Doña Lúcia, Mr Antônio */
const PERSONS = ["Lúcia", "Rosa", "Marta", "Caio", "Bia", "Helena", "Antônio"], ORGS = ["Ponte", "Roda Viva", "Pix"], NAMES = [...PERSONS, ...ORGS];
/* Regra de nomes (decisão de set/2026): sempre em letras latinas; nas escritas não latinas, a primeira menção de cada pessoa
   em cada história de missão (skills.<id>.story) leva a transliteração entre parênteses: Dona Lúcia（露西亚太太）.
   Organizações e produtos (Ponte, Roda Viva, Pix) ficam só em letras latinas. */
const INTRO = /^skills\.[^.]+\.story$/;
const bare = s => String(s).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
const KEEP = /(^|\.)(provAnthropic|provOpenAI|hardcore|models\.\w+|t3\.title)$/;
const CODEY = s => s.length <= 30 && /[<>]=?|==|!=/.test(s);
const DOT_DECIMAL = new Set(["en", "zh", "ja", "ko", "hi", "mr", "bn", "te", "ta", "pa", "ur", "ar"]);   /* 1.5; vietnamita, russo, turco e indonésio usam vírgula */
const ph = s => (String(s).match(/\{[a-z]\}/g) || []).sort().join(",");
/* referência de cada idioma: o inglês; para o inglês e o espanhol, o português (de onde foram escritos) */
const refOf = c => c === "en" || c === "es" ? "pt" : "en";

function audit(c) {
  const ref = flat(LANG[refOf(c)], "", {}), tgt = flat(LANG[c], "", {}), meta = STUDY_LANGS.find(x => x.code === c) || {}, out = [];
  for (const k of Object.keys(ref)) {
    const a = ref[k], b = tgt[k];
    if (b === undefined || !String(b).trim()) { out.push("FALTA        " + k); continue; }
    if (ph(a) !== ph(b)) out.push("MARCADOR     " + k + "   " + (ph(a) || "nenhum") + " -> " + (ph(b) || "nenhum"));
    if (c !== "pt" && c !== "en" && c !== "es" && a === b && a.length > (meta.script === "Latin" ? 40 : 12) && !KEEP.test(k) && !CODEY(a)) out.push("EM INGLÊS    " + k + "   " + a.slice(0, 70));
    for (const n of NAMES) {
      if (!bare(a).includes(bare(n))) continue;
      const bb = bare(b), i = bb.indexOf(bare(n));
      if (i < 0) { out.push("NOME         " + k + "   \"" + n + "\" não aparece em letras latinas"); continue; }
      if (meta.script !== "Latin" && PERSONS.includes(n) && INTRO.test(k) && !/^\s*[(（]/.test(bb.slice(i + bare(n).length, i + bare(n).length + 4)))
        out.push("NOME 1ª VEZ  " + k + "   \"" + n + "\" sem a transliteração entre parênteses na primeira menção");
    }
    if (DOT_DECIMAL.has(c) && /\d,\d(?!\d\d)/.test(b) && !/\d,\d(?!\d\d)/.test(a)) out.push("DECIMAL      " + k + "   vírgula decimal num idioma que usa ponto: " + b.match(/\d+,\d+/)[0]);
  }
  return out;
}

const HEADER = (c, part, total, meta, ref) => `# Revisão de textos do DevWise: ${meta.native} (${c}), parte ${part} de ${total}

Você é revisor nativo de ${meta.en} e professor de programação. O DevWise é um jogo que ensina programação e engenharia de software a iniciantes adultos com histórias num bairro brasileiro (padaria de Dona Lúcia, posto de saúde da enfermeira Rosa, escola de Marta, biblioteca de Seu Antônio, cartório de Helena, cooperativa Roda Viva) e analogias do cotidiano.

Abaixo, um JSON em que cada chave é um caminho e cada valor tem "ref" (texto de referência, em ${ref === "pt" ? "português" : "inglês"}) e "txt" (o texto atual em ${meta.en}).

## O que revisar
1. **Ortografia, gramática e pontuação** em ${meta.en}.
2. **Sentido**: o texto diz o mesmo que a referência? Atenção a palavras ambíguas do inglês: "balance" aqui é saldo de pontos (não equilíbrio); "free" em "free challenge" é desafio livre, aberto (não gratuito); "boss" é o chefão de fase de jogo; "ticket" é tarefa de trabalho.
3. **Naturalidade**: soa como um professor nativo falando com a turma, sem cheiro de tradução.
4. **Consistência**: o mesmo termo para a mesma coisa em todas as partes.${ESTILO[c] && ESTILO[c].tratamento ? "\n5. **Forma de tratamento**: " + ESTILO[c].tratamento : ""}${ESTILO[c] && ESTILO[c].glossario && ESTILO[c].glossario.ticket ? "\n6. **Glossário**: \"ticket\" = " + ESTILO[c].glossario.ticket[0] + "." : ""}
${c !== "pt" && c !== "en" && c !== "es" ? "- **Texto que ficou em inglês** deve ser traduzido.\n" : ""}
## O que NÃO pode mudar
- marcadores entre chaves, como {n}, {s}, {x}, {d}: copie exatamente;
- código, operadores, nomes de funções e variáveis, e números;
- **nomes**: Lúcia, Rosa, Marta, Caio, Bia, Helena e Antônio ficam sempre em letras latinas (o tratamento "Dona" e "Seu" pode ser adaptado ao idioma).${meta.script !== "Latin" ? " Nas histórias de missão (caminhos \\`skills.<id>.story\\`), na PRIMEIRA vez que cada pessoa aparece, acrescente logo depois do nome a transliteração em " + meta.en + " entre parênteses" + (["Han", "Kana", "Hangul"].includes(meta.script) ? " de largura cheia, como Dona Lúcia（露西亚太太）" : ", como Dona Lúcia (…)") + "; nas demais menções e em todos os outros textos, só letras latinas, sem transliteração." : ""} Ponte, Roda Viva e Pix são nomes de organização e produto: só em letras latinas, nunca traduzidos nem transliterados;
- siglas e nomes técnicos: Git, commit, push, merge, CI, CD, TDD, MVP, SOLID, XP, SBC, BKT, PFA, AFM, Elo/Rasch, 3PL IRT with EAP, Brier, AUC, CSV, PDF;
- o sentido do que é ensinado e a ordem de listas: nos caminhos terminados em .0, .1, .2, a posição importa (em "opts" o primeiro é a resposta certa).
${DOT_DECIMAL.has(c) ? "- números decimais em " + meta.en + " usam PONTO (1.5), não vírgula.\n" : ""}
## Formato da resposta
Responda APENAS com um bloco de código JSON **plano**, contendo só os caminhos que você corrigiu e o texto novo completo:

\`\`\`json
{ "ui.balance": "texto corrigido", "items.v6.analogy": "texto corrigido" }
\`\`\`

Se nada precisar mudar nesta parte, responda \`{}\`. Não repita o que está bom, não explique fora do JSON.

## Textos

`;

function prepare(c) {
  const meta = STUDY_LANGS.find(x => x.code === c); if (!meta || !LANG[c]) { console.log(c + ": sem pacote, ignorado"); return; }
  const ref = refOf(c), R = flat(LANG[ref], "", {}), T = flat(LANG[c], "", {});
  const dir = path.join(outDir, c); fs.mkdirSync(dir, { recursive: true });
  for (const f of fs.readdirSync(dir)) if (/^parte-\d+\.md$/.test(f)) fs.unlinkSync(path.join(dir, f));
  const au = audit(c);
  fs.writeFileSync(path.join(dir, "auditoria.txt"), au.length ? au.join("\n") + "\n" : "Nenhum problema automático encontrado.\n");
  /* partes de ~28 mil caracteres, sem partir um item ao meio (itens agrupados pelo prefixo items.<id>) */
  const keys = Object.keys(R).filter(k => !KEEP.test(k)), groups = [];
  for (const k of keys) { const g = k.split(".").slice(0, 2).join("."); if (!groups.length || groups[groups.length - 1].g !== g) groups.push({ g, ks: [] }); groups[groups.length - 1].ks.push(k); }
  const parts = []; let cur = {}, size = 0;
  for (const gr of groups) {
    const chunk = {}; for (const k of gr.ks) chunk[k] = { ref: R[k], txt: T[k] === undefined ? "" : T[k] };
    const len = JSON.stringify(chunk).length;
    if (size && size + len > 28000) { parts.push(cur); cur = {}; size = 0; }
    Object.assign(cur, chunk); size += len;
  }
  if (size) parts.push(cur);
  parts.forEach((p, i) => fs.writeFileSync(path.join(dir, "parte-" + String(i + 1).padStart(2, "0") + ".md"),
    HEADER(c, i + 1, parts.length, meta, ref) + "```json\n" + JSON.stringify(p, null, 1) + "\n```\n"));
  const kinds = {}; for (const l of au) { const k = l.slice(0, 12).trim(); kinds[k] = (kinds[k] || 0) + 1; }
  console.log((meta.native + " (" + c + ")").padEnd(26) + String(parts.length).padStart(2) + " partes   " + String(au.length).padStart(3) + " alertas" + (au.length ? "   " + Object.entries(kinds).map(([k, n]) => k.toLowerCase() + ": " + n).join(", ") : ""));
  return au.length;
}

const args = process.argv.slice(2);
if (!args.length) { console.log("Uso: node tools/revisao-qwen.js todos | <códigos>"); process.exit(1); }
const list = args.includes("todos") ? STUDY_LANGS.map(x => x.code).filter(c => LANG[c]) : args;
let tot = 0; for (const c of list) tot += prepare(c) || 0;
fs.writeFileSync(path.join(outDir, "LEIA-ME.md"), `# Revisão dos textos

Cada pasta tem \`auditoria.txt\` (o que o computador achou sozinho) e \`parte-NN.md\` (prompt + textos).

**Com o Qwen Code** (lê os arquivos sozinho), aberto na pasta do repositório:

> Leia revisao/zh/parte-01.md e faça exatamente o que ele pede. Salve só o JSON da resposta em revisao/zh/correcoes-01.json. Depois faça o mesmo com as próximas partes, sem pedir confirmação.

**No chat do Qwen**: abra a parte num editor, copie TUDO e cole na caixa de mensagem (não anexe o arquivo: anexo vira resumo). Salve o JSON da resposta como \`correcoes-01.json\` na mesma pasta.

**Aplicar** (valida marcadores, listas e caminhos; o que estiver errado é recusado com o motivo):

    node tools/aplicar-patch.js revisao/zh/correcoes-01.json --lang zh
    node tests.js
    python build.py
`);
console.log("\nTotal de alertas automáticos: " + tot + ". Veja revisao/<idioma>/auditoria.txt e revisao/LEIA-ME.md.");
