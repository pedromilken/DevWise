/* DevWise - romanização.
   Escritas fonéticas são convertidas por regra, no navegador e sem custo: cirílico (ru), hangul (ko, Romanização Revisada com ligação
   entre sílabas) e as escritas brâmicas de hi, mr, bn, pa, ta e te (padrão ISO 15919, com apagamento do schwa onde a língua o faz).
   Chinês, japonês, árabe e urdu não são romanizáveis por regra (ideogramas e vogais não escritas): usam um mapa ROM.xx gerado por
   "node tools/gerar-idioma.js xx --romanizar". */
const ROMANIZER = (() => {
  const CYR = {а:"a",б:"b",в:"v",г:"g",д:"d",е:"e",ё:"yo",ж:"zh",з:"z",и:"i",й:"y",к:"k",л:"l",м:"m",н:"n",о:"o",п:"p",р:"r",с:"s",т:"t",у:"u",ф:"f",х:"kh",ц:"ts",ч:"ch",ш:"sh",щ:"shch",ъ:"",ы:"y",ь:"'",э:"e",ю:"yu",я:"ya"};
  function cyrillic(s){ return s.replace(/[А-Яа-яЁё]/g, ch => { const lo = ch.toLowerCase(), r = CYR[lo]; if (r == null) return ch; return ch !== lo && r ? r[0].toUpperCase() + r.slice(1) : r; }); }

  const HI = ["g","kk","n","d","tt","r","m","b","pp","s","ss","","j","jj","ch","k","t","p","h"];
  const HM = ["a","ae","ya","yae","eo","e","yeo","ye","o","wa","wae","oe","yo","u","wo","we","wi","yu","eu","ui","i"];
  const HF = ["","k","k","k","n","n","n","t","l","k","m","l","l","l","p","l","m","p","p","t","t","ng","t","t","k","t","p","t"];
  /* ligação: quando a sílaba seguinte começa por vogal, a consoante final (ou a segunda de um par) passa para ela */
  const HL = {1:["","g"],2:["","kk"],3:["k","s"],4:["","n"],5:["n","j"],6:["n",""],7:["","d"],8:["","r"],9:["l","g"],10:["l","m"],11:["l","b"],12:["l","s"],13:["l","t"],14:["l","p"],15:["","r"],16:["","m"],17:["","b"],18:["p","s"],19:["","s"],20:["","ss"],22:["","j"],23:["","ch"],24:["","k"],25:["","t"],26:["","p"],27:["",""]};
  function hangul(s){
    const cs = [...s]; let out = "", prevFin = false;
    for (let i = 0; i < cs.length; i++) {
      const c = cs[i].charCodeAt(0) - 0xAC00; if (c < 0 || c > 11171) { out += cs[i]; prevFin = false; continue; }
      const ini = Math.floor(c / 588), med = Math.floor(c % 588 / 28), fin = c % 28;
      const n = i + 1 < cs.length ? cs[i + 1].charCodeAt(0) - 0xAC00 : -1, nIni = n >= 0 && n <= 11171 ? Math.floor(n / 588) : -1;
      let f = HF[fin], carry = "";
      if (fin && nIni === 11 && HL[fin]) { f = HL[fin][0]; carry = HL[fin][1]; }
      else if (fin === 8 && nIni === 5) f = "l";
      else if (nIni === 2 || nIni === 6 || (nIni === 5 && fin !== 8 && fin !== 4)) f = ({k:"ng", t:"n", p:"m"})[f] || f; /* nasalização: 습니다 -> seumnida, 합류 -> hamnyu */
      out += (ini === 5 && i > 0 && out.endsWith("l") ? "l" : ini === 5 && /(m|ng)$/.test(out) && prevFin ? "n" : HI[ini]) + HM[med] + f + carry; prevFin = fin && !carry;
    }
    return out;
  }

  const BC = {0x15:"k",0x16:"kh",0x17:"g",0x18:"gh",0x19:"ṅ",0x1A:"c",0x1B:"ch",0x1C:"j",0x1D:"jh",0x1E:"ñ",0x1F:"ṭ",0x20:"ṭh",0x21:"ḍ",0x22:"ḍh",0x23:"ṇ",0x24:"t",0x25:"th",0x26:"d",0x27:"dh",0x28:"n",0x29:"ṉ",0x2A:"p",0x2B:"ph",0x2C:"b",0x2D:"bh",0x2E:"m",0x2F:"y",0x30:"r",0x31:"ṟ",0x32:"l",0x33:"ḷ",0x34:"ḻ",0x35:"v",0x36:"ś",0x37:"ṣ",0x38:"s",0x39:"h",0x58:"q",0x59:"kh",0x5A:"ġ",0x5B:"z",0x5C:"ṛ",0x5D:"ṛh",0x5E:"f",0x5F:"y"};
  const NUKTA = {k:"q",kh:"kh",g:"ġ",j:"z",ph:"f","ḍ":"ṛ","ḍh":"ṛh"};
  function brahmic(s, base, o){
    const e = o.drav ? "ē" : "e", oo = o.drav ? "ō" : "o";
    const V = {5:"a",6:"ā",7:"i",8:"ī",9:"u",0xA:"ū",0xB:"r̥",0xE:"e",0xF:e,0x10:"ai",0x12:"o",0x13:oo,0x14:"au"};
    const M = {0x3E:"ā",0x3F:"i",0x40:"ī",0x41:"u",0x42:"ū",0x43:"r̥",0x46:"e",0x47:e,0x48:"ai",0x4A:"o",0x4B:oo,0x4C:"au"};
    const inBlock = ch => { const c = ch.codePointAt(0); return c >= base && c < base + 0x80; };
    const word = w => {
      const u = []; let gem = false;
      for (const ch of w) { const k = ch.codePointAt(0) - base, last = u[u.length - 1];
        if (BC[k] != null) { u.push({c: BC[k], v: "a", inh: true, tail: "", gem}); gem = false; }
        else if (V[k] != null) u.push({c: "", v: V[k], inh: false, tail: ""});
        else if (M[k] != null) { if (last) { last.v = M[k]; last.inh = false; } }
        else if (k === 0x4D) { if (last) { last.v = ""; last.inh = false; } }
        else if (k === 0x3C) { if (last && NUKTA[last.c]) last.c = NUKTA[last.c]; }
        else if (k === 1 || k === 2 || k === 0x70) { if (last) last.tail += "ṁ"; }
        else if (k === 3) { if (last) last.tail += "ḥ"; }
        else if (k === 0x71) gem = true;
        else if (k === 0x4E) u.push({c: "t", v: "", inh: false, tail: ""});
        else if (k >= 0x66 && k <= 0x6F) u.push({c: String(k - 0x66), v: "", inh: false, tail: ""});
        else if (k === 0x64 || k === 0x65) u.push({c: ".", v: "", inh: false, tail: ""});
      }
      if (o.schwa && u.length > 1) {
        const z = u[u.length - 1]; if (z.inh && z.c && !z.tail && u[u.length - 2].v !== "") z.v = "";
        if (o.schwa === "medial") for (let i = u.length - 2; i >= 1; i--) { const x = u[i], p = u[i - 1], n = u[i + 1]; if (x.inh && x.v === "a" && !x.tail && p.v !== "" && n.c && n.v !== "") x.v = ""; }
      }
      return u.map(x => (x.gem ? x.c[0] : "") + x.c + x.v + x.tail).join("");
    };
    let out = "", buf = "";
    for (const ch of s) { if (inBlock(ch)) buf += ch; else { if (buf) { out += word(buf); buf = ""; } out += ch; } }
    return (out + (buf ? word(buf) : "")).replace(/\u0964/g, ".").replace(/\u0965/g, ".");
  }

  const RULES = {
    ru: cyrillic, ko: hangul,
    hi: s => brahmic(s, 0x0900, {schwa: "medial"}), mr: s => brahmic(s, 0x0900, {schwa: "medial"}),
    bn: s => brahmic(s, 0x0980, {schwa: "final"}),  pa: s => brahmic(s, 0x0A00, {schwa: "medial"}),
    ta: s => brahmic(s, 0x0B80, {drav: true}),      te: s => brahmic(s, 0x0C00, {drav: true})
  };
  return {
    available: l => !!RULES[l] || !!(typeof ROM !== "undefined" && ROM[l]),
    byRule: l => !!RULES[l],
    convert(l, s){ if (typeof s !== "string" || !s) return s; const m = typeof ROM !== "undefined" && ROM[l]; if (m && m[s] != null) return m[s]; return RULES[l] ? RULES[l](s) : s; }
  };
})();
