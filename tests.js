// Verificações de consistência do banco de itens e simulação do motor adaptativo. Uso: node tests.js
const fs=require("fs");
global.localStorage={getItem(){return null},setItem(){}};global.window={scrollTo(){}};global.navigator={language:"pt"};
global.document={documentElement:{},getElementById(){return {append(){},set textContent(v){}}},createElement(){return {append(){},setAttribute(){},addEventListener(){},set className(v){}}},createElementNS(){return {append(){},setAttribute(){},addEventListener(){}}},createTextNode(){return {}}};
const langFiles=fs.readdirSync(__dirname+"/src").filter(f=>/^lang-.*\.js$/.test(f)&&!f.includes(".mock.")&&!f.includes(".patch.")).sort((a,b)=>(a==="lang-pt.js"?-1:b==="lang-pt.js"?1:a.localeCompare(b)));
const patchFiles=fs.readdirSync(__dirname+"/src").filter(f=>/^lang-.*\.patch\.js$/.test(f)).sort();
const romFiles=fs.readdirSync(__dirname+"/src").filter(f=>/^rom-.*\.js$/.test(f));
let src=["data.js","game.js","rom.js","models.js","run.js",...langFiles,...patchFiles,...romFiles,"app.js"].map(f=>fs.readFileSync(__dirname+"/src/"+f,"utf8")).join("\n");
src=src.replace('"use strict";','').replace(/S=load\(\);[\s\S]*$/,"");
src+=`
let errs=[];
for(const l of Object.keys(LANG)) if(!STUDY_LANGS.find(x=>x.code===l)) errs.push(l+": idioma fora do registro do estudo");
for(const l of Object.keys(LANG)){
  const uiKeys=Object.keys(LANG.pt.ui); for(const k of uiKeys) if(LANG[l].ui[k]==null) errs.push(l+": falta ui."+k);
  for(const c of Object.keys(LANG.pt.sbc)) if(!LANG[l].sbc[c]) errs.push(l+": falta sbc "+c);
  for(const s of SKILLS){const x=LANG[l].skills[s.id]; if(!x||!x.story||x.theory.length!==3) errs.push(l+": habilidade "+s.id); for(const c of s.sbc) if(!LANG.pt.sbc[c]) errs.push("sbc inexistente "+c);}
  for(const it of ITEMS.concat(BOSS_ITEMS)){const x=LANG[l].items[it.id]; if(!x){errs.push(l+": falta item "+it.id);continue}
    for(const f of ["title","prompt","hint","why","analogy"]) if(!x[f]&&!(f==="hint"&&it.boss)) errs.push(l+": "+it.id+"."+f);
    if(it.type==="mc"&&!it.opts&&(!x.opts||x.opts.length!==4)) errs.push(l+": opts "+it.id);
    if(it.type==="code"&&LANG[l].ui.bands&&LANG[l].ui.bands.length!==5) errs.push(l+": faixas de nota");
    if(it.type==="sort"&&(!x.bins||x.bins.length!==2||!x.cards||x.cards.length!==it.key.length)) errs.push(l+": cartões "+it.id);
    if(it.type==="parsons"&&!it.code&&!it.shared){ if(!x.lines||x.lines.length<3||new Set(x.lines).size!==x.lines.length||x.lines.length!==LANG.pt.items[it.id].lines.length) errs.push(l+": etapas "+it.id); }
    if(["pt","en","es"].includes(l)&&/\\u2014/.test(JSON.stringify(x))) errs.push(l+": travessão em "+it.id);} // em russo e outros idiomas o travessão é ortografia, não estilo
  for(const id of Object.keys(LANG[l].items)) if(!IT[id]) errs.push(l+": item órfão "+id);
}
for(const it of ITEMS.concat(BOSS_ITEMS)){
  if(it.code) for(const p of Object.keys(PLS)){ if(!it.code[p]) errs.push(it.id+": sem código "+p);
    const n=it.code[p].split("\\n"); if(it.type==="bug"&&!(it.answer<n.length)) errs.push(it.id+": answer fora "+p);
    if(it.type==="parsons"&&new Set(n).size!==n.length) errs.push(it.id+": linhas repetidas "+p);}
  if(it.type==="bug"&&!it.code) errs.push(it.id+": sem linhas");
  if(it.type==="sort"&&it.key.filter(k=>k===0).length===0) errs.push(it.id+": chave");
  if(it.type==="code"){ if(!it.fn) errs.push(it.id+": sem nome de função");
    if(!it.stub||Object.keys(PLS).some(p=>!it.stub[p])) errs.push(it.id+": falta esqueleto em alguma linguagem");
    if(!it.tests||it.tests.length<3) errs.push(it.id+": menos de 3 casos de teste");
    if(it.tests&&!it.tests.some(c=>c.oculto)) errs.push(it.id+": sem caso oculto");
    if(it.stub&&Object.keys(PLS).some(p=>it.stub[p]&&it.stub[p].indexOf(it.fn)<0)) errs.push(it.id+": esqueleto sem o nome da função"); }
  if(it.opts&&new Set(it.opts).size!==it.opts.length) errs.push(it.id+": opções repetidas");
}
const CODEY=s=>s.length<=30&&(s.includes("<")||s.includes(">")||s.includes("==")||s.includes("!="));   // expressões de código dispensam tradução, como no gerador
const flatT=(o,p,out)=>{if(typeof o==="string")out[p]=o;else for(const k in o)flatT(o[k],p+"."+k,out);return out};
{const enF=flatT(LANG.en,"",{}); for(const l of Object.keys(LANG)){ if(["pt","en","es"].includes(l))continue; const meta=STUDY_LANGS.find(x=>x.code===l)||{}, f=flatT(LANG[l],"",{}), latin=meta.script==="Latin";
  const same=Object.keys(enF).filter(k=>enF[k]===f[k]&&enF[k].length>(latin?40:12)&&!/provAnthropic|provOpenAI|t3\.title|hardcore|\.models\./.test(k)&&!CODEY(enF[k]));
  if(same.length) errs.push(l+": "+same.length+" textos ficaram em inglês (ex.: "+same[0]+"). Rode: node tools/gerar-idioma.js "+l); }}
for(const l of Object.keys(LANG)){const g=LANG[l].game; if(!g){errs.push(l+": falta game");continue}
  SHOP.forEach(p=>{if(!g.shop[p.id])errs.push(l+": loja "+p.id)}); BOUNTIES.forEach(b=>{if(!g.bounties[b.id])errs.push(l+": desafio "+b.id)});
  BOSSES.forEach(b=>{const x=g.bosses[b.id]; if(!x||!x.story||!x.trophy)errs.push(l+": chefão "+b.id); b.stages.forEach(st=>{if(!IT[st]||IT[st].boss!==b.id)errs.push("fase "+st)})});
  for(const k of Object.keys(MODES)) if(!LANG[l].ui.modes[k]||!LANG[l].ui.modeDesc[k]) errs.push(l+": modo "+k);}
for(const s of SKILLS) if(GATES[s.id]===undefined) errs.push("portão "+s.id);
for(const s of SKILLS) if(EX[s.id]) for(const p of Object.keys(PLS)) if(!EX[s.id][p]) errs.push("EX "+s.id+" "+p);
const area={prog:0,se:0}; ITEMS.forEach(i=>area[SK[i.skill].area]++); console.log("itens por área:",JSON.stringify(area));
const per={}; ITEMS.forEach(i=>per[i.skill]=(per[i.skill]||0)+1);
console.log("idiomas com pacote:",Object.keys(LANG).join(", "),"de",STUDY_LANGS.length,"do estudo");
console.log("itens:",ITEMS.length,JSON.stringify(per));
// simulação: iniciante que aprende a cada ticket (resposta gerada por um 3PL com a habilidade verdadeira), em cada modo
for(const mode of Object.keys(MODES)){ let tot=0,xpT=0,bal=0,stuck=0,runs=150;
  for(let r=0;r<runs;r++){ S=fresh(); S.started=true; S.mode=mode; let n=0; const TRUE={};
    while(!SKILLS.every(s=>mastered(s.id))&&n<900){ pendingMissions().forEach(m=>S.brief[m.id]=true); fillBoard();
      if(!S.board.length){stuck++;break}
      const it0=IT[S.board[0]], key0=tkey(it0.skill); TRUE[key0]=(TRUE[key0]??0); const c0=isTyped(it0)?0.03:guessProb(it0), p0=c0+(1-c0)/(1+Math.exp(-(TRUE[key0]-KT.itemB(it0))));
      cur={item:it0,hint:false,mode:S.mode,typed:isTyped(it0)}; resolve(Math.random()<p0); TRUE[key0]+=0.3; n++;   // aluno realista: habilidade verdadeira por habilidade, começa em 0 logit e aprende 0,3 por ticket
      if(S.sprint.done.length>=5)S.sprint=newSprint(S.sprint.n+1,S.skills); }
    tot+=n; xpT+=S.xpTotal; bal+=S.xp; }
  console.log(mode.padEnd(9),"["+pilot()+"] tickets até dominar tudo:",(tot/runs).toFixed(1)," XP acumulado:",Math.round(xpT/runs)," saldo:",Math.round(bal/runs)," travou:",stuck);
  if(stuck)errs.push("quadro vazio no modo "+mode); }
errs=[...new Set(errs)];
{const miss={},mit={},rest=[];for(const e of errs){const m=/^(\\w+): falta ui\\.(.+)$/.exec(e),mi=/^(\\w+): falta item (.+)$/.exec(e);if(m)(miss[m[1]]=miss[m[1]]||[]).push(m[2]);else if(mi)(mit[mi[1]]=mit[mi[1]]||[]).push(mi[2]);else rest.push(e)}
 const ls=Object.keys(miss);if(ls.length){const n=miss[ls[0]].length;rest.unshift(ls.length+" pacotes sem "+n+" textos novos da interface ("+miss[ls[0]].slice(0,4).join(", ")+"...): "+ls.join(", ")+". Enquanto isso aparecem em inglês. Rode: node tools/gerar-idioma.js revisar")}{const ls2=Object.keys(mit);if(ls2.length){const n2=mit[ls2[0]].length;rest.unshift(ls2.length+" pacotes sem "+n2+" itens novos ("+mit[ls2[0]].slice(0,4).join(", ")+"...): "+ls2.join(", ")+". Rode: node tools/gerar-idioma.js revisar")}}
 errs=rest} console.log(errs.length?"ERROS:\\n"+errs.join("\\n"):"OK: sem inconsistências"); process.exit(errs.length?1:0);
`;
eval(src);
