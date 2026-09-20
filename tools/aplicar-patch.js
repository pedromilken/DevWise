#!/usr/bin/env node
/* Valida um JSON de traduções feito fora do gerador e grava src/lang-xx.patch.js para cada idioma aprovado.

   Uso:  node tools/aplicar-patch.js caminho/para/traducoes.json

   O JSON pode ter duas formas:
     { "ko": { "ui": {...}, "items": {...} }, "ja": { ... } }      vários idiomas de uma vez
     { "ui": {...}, "items": {...} }                               um idioma só, passado como  --lang xx

   Cada idioma é conferido contra o inglês: mesmas chaves, mesmos marcadores {x}, mesmo tamanho e ordem de arrays,
   escrita esperada presente e texto que não ficou em inglês. Idioma com problema não é gravado, e o relatório diz onde.
   Nada aqui usa API: é só verificação e escrita de arquivo. */
const fs = require("fs"), path = require("path");
const root = path.join(__dirname, ".."), srcDir = path.join(root, "src");
const args = process.argv.slice(2), file = args.find(a => !a.startsWith("--"));
const only = args.includes("--lang") ? args[args.indexOf("--lang") + 1] : null;
if (!file) { console.log("Uso: node tools/aplicar-patch.js traducoes.json [--lang xx]"); process.exit(1); }

const langList = fs.readdirSync(srcDir).filter(f => /^lang-.*\.js$/.test(f) && !f.includes(".mock."));
const code = ["data.js", "game.js", ...langList.filter(f => !f.includes(".patch.")), ...langList.filter(f => f.includes(".patch."))]
  .map(f => fs.readFileSync(path.join(srcDir, f), "utf8")).join("\n").replace('"use strict";', "");
const { LANG, STUDY_LANGS, ITEMS } = new Function(code + ";return {LANG, STUDY_LANGS, ITEMS};")();
const IT = Object.fromEntries(ITEMS.map(i => [i.id, i]));
const SCRIPT_RE = { Han: /[\u4e00-\u9fff]/, Devanagari: /[\u0900-\u097f]/, Arabic: /[\u0600-\u06ff]/, Bengali: /[\u0980-\u09ff]/, Cyrillic: /[\u0400-\u04ff]/,
  Kana: /[\u3005\u3040-\u30ff\u4e00-\u9fff]/, Telugu: /[\u0c00-\u0c7f]/, Tamil: /[\u0b80-\u0bff]/, Hangul: /[\uac00-\ud7af]/, Gurmukhi: /[\u0a00-\u0a7f]/ };
const KEEP = /(^|\.)(provAnthropic|provOpenAI|hardcore|models\.\w+|t3\.title)$/;
const CODEY = s => s.length <= 30 && /[<>]=?|==|!=|[+\-*/%]\s*\d/.test(s);
const ph = s => (String(s).match(/\{[a-z]\}/g) || []).sort().join(",");

let raw; try { raw = JSON.parse(fs.readFileSync(file, "utf8")); } catch (e) { console.error("JSON inválido: " + e.message); process.exit(1); }
const pack = raw.ui || raw.items ? { [only || ""]: raw } : raw;
if ((raw.ui || raw.items) && !only) { console.error("JSON de um idioma só: informe --lang xx"); process.exit(1); }

let gravados = 0, recusados = 0;
for (const codeLang of Object.keys(pack)) {
  const meta = STUDY_LANGS.find(x => x.code === codeLang);
  const errs = [], got = pack[codeLang] || {};
  if (!meta) { console.log("\n" + codeLang + ": não é um idioma do estudo; ignorado"); recusados++; continue; }
  const re = SCRIPT_RE[meta.script];

  const cmp = (a, b, p) => {
    if (typeof a === "string") {
      if (typeof b !== "string" || !b.trim()) return errs.push(p + ": vazio ou ausente");
      if (ph(a) !== ph(b)) return errs.push(p + ": marcadores " + (ph(a) || "nenhum") + " viraram " + (ph(b) || "nenhum"));
      if (a === b && a.length > 12 && !KEEP.test(p) && !CODEY(a)) errs.push(p + ": ficou em inglês");
      else if (re && a.length > 40 && !re.test(b)) errs.push(p + ": sem a escrita " + meta.script);
      return;
    }
    if (Array.isArray(a)) { if (!Array.isArray(b) || a.length !== b.length) return errs.push(p + ": lista com " + (b && b.length) + " em vez de " + a.length); return a.forEach((x, i) => cmp(x, b[i], p + "." + i)); }
    for (const k in a) { if (b == null || b[k] === undefined) errs.push(p + "." + k + ": ausente"); else cmp(a[k], b[k], p + "." + k); }
  };
  const ui = got.ui || {}, items = got.items || {};
  for (const k of Object.keys(ui)) LANG.en.ui[k] === undefined ? errs.push("ui." + k + ": não existe no inglês") : cmp(LANG.en.ui[k], ui[k], "ui." + k);
  for (const k of Object.keys(items)) {
    if (!LANG.en.items[k]) { errs.push("items." + k + ": não existe"); continue; }
    cmp(LANG.en.items[k], items[k], "items." + k);
    const it = IT[k]; if (!it) continue;
    if (it.type === "sort" && items[k].cards && items[k].cards.length !== it.key.length) errs.push("items." + k + ": cartões não batem com o gabarito");
    if (it.type === "parsons" && !it.code && items[k].lines && new Set(items[k].lines).size !== items[k].lines.length) errs.push("items." + k + ": etapas repetidas");
  }
  if (!Object.keys(ui).length && !Object.keys(items).length) errs.push("nada para aplicar");

  const nome = meta.native + " (" + codeLang + ")";
  if (errs.length) { console.log("\n" + nome + ": RECUSADO, " + errs.length + " problema(s)"); errs.slice(0, 8).forEach(e => console.log("   - " + e)); if (errs.length > 8) console.log("   ... e mais " + (errs.length - 8)); recusados++; continue; }

  const out = "/* Traduções feitas fora do gerador (revisão humana ou outro modelo). Carregado DEPOIS de lang-" + codeLang + ".js,\n" +
    "   então sobrescreve as chaves abaixo e não é apagado por uma nova geração do pacote. */\n" +
    (Object.keys(ui).length ? "Object.assign(LANG." + codeLang + ".ui, " + JSON.stringify(ui, null, 1) + ");\n" : "") +
    (Object.keys(items).length ? "Object.assign(LANG." + codeLang + ".items, " + JSON.stringify(items, null, 1) + ");\n" : "");
  fs.writeFileSync(path.join(srcDir, "lang-" + codeLang + ".patch.js"), out);
  console.log("\n" + nome + ": ok, " + Object.keys(ui).length + " textos de interface e " + Object.keys(items).length + " itens -> src/lang-" + codeLang + ".patch.js");
  gravados++;
}
console.log("\nGravados: " + gravados + "  |  recusados: " + recusados + "\nPróximos passos: node tests.js && python build.py");
