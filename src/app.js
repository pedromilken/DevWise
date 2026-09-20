/* DevWise - motor do jogo */
const SK = Object.fromEntries(SKILLS.map(s=>[s.id,s]));
const IT = Object.fromEntries(ITEMS.concat(BOSS_ITEMS).map(i=>[i.id,i]));
const KEY="devwise-v2", L0=0.15, T=0.2, SLIP=0.1, MASTER=0.95, UNLOCK=0.6, SPRINT=5;
let evoSel=null, evoPl=null;
let S, view="home", boss=null, tick=null, cur=null, selSkill=null, briefId=null, resetArmed=false, showJson=false, setMsg="";

/* ---------- Estado ---------- */
/* Domínio por linguagem: habilidades de programação têm um rastreador BKT para cada linguagem (Python, JS, Java, C).
   Ao estrear numa linguagem, parte-se de uma priori de transferência: metade do caminho já percorrido na melhor das outras. */
const TRANSFER=0.5;
const isProg=id=>SK[id].area==="prog";
const tkey=(id,pl)=>isProg(id)?id+"@"+(pl||S.pl):id;
function trk(id,pl){
  const e=S.skills[id]; if(!isProg(id))return e; pl=pl||S.pl;
  if(!e.pl[pl]){const best=Math.max(L0,...Object.values(e.pl).map(x=>x.L)); e.pl[pl]={L:L0+TRANSFER*(best-L0),n:0,c:0,prior:+(L0+TRANSFER*(best-L0)).toFixed(3)};}
  return e.pl[pl];
}
const practiced=(id,pl)=>isProg(id)?(S.skills[id].pl[pl]||null):S.skills[id];
function snapshot(){const o={};SKILLS.forEach(s=>o[tkey(s.id)]=trk(s.id).L);return o}
function guessLang(){const n=(navigator.language||"pt").slice(0,2).toLowerCase();return LANG[n]?n:"pt"}
function newSprint(n){return {n,done:[],start:snapshot(),b:{},run:0}}
function blankSkills(){const skills={}; SKILLS.forEach(s=>skills[s.id]=s.area==="prog"?{pl:{}}:{L:L0,n:0,c:0}); return skills}
function fresh(){
  const o={v:2,started:false,lang:guessLang(),pl:"py",skills:blankSkills(),brief:{},seen:{},log:[],xp:0,xpTotal:0,mode:"normal",inv:{shield:0,fifty:0,time:0},boost:0,titles:[],title:null,bosses:{},daily:{date:"",item:null,done:false},streak:0,best:0,board:[],
    sprint:{n:1,done:[],start:{},b:{},run:0},ai:{provider:"anthropic",key:"",model:"",base:""}};
  return o;
}
function load(){
  try{const d=JSON.parse(localStorage.getItem(KEY)||"null");
    if(d&&d.v===2&&d.skills){const f=fresh();SKILLS.forEach(s=>{const e=d.skills[s.id]; if(!e)d.skills[s.id]=f.skills[s.id]; else if(s.area==="prog"&&!e.pl){const pl=PLS[d.pl]?d.pl:"py";d.skills[s.id]={pl:{[pl]:{L:e.L,n:e.n,c:e.c}}}}}); // migra o domínio único da v3 para a linguagem em uso
      if(d.xpTotal===undefined)d.xpTotal=d.xp||0; for(const k in f)if(d[k]===undefined)d[k]=f[k]; d.sprint.b=d.sprint.b||{}; d.sprint.run=d.sprint.run||0; if(!MODES[d.mode])d.mode="normal"; if(!LANG[d.lang])d.lang="pt"; if(!PLS[d.pl])d.pl="py"; d.ai=d.ai||f.ai; d.brief=d.brief||{}; return d;}}catch(e){}
  return fresh();
}
function save(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}}

/* ---------- i18n ---------- */
const Lg=()=>LANG[S.lang]||LANG.pt;
const romOn=()=>!!(S&&S.rom&&ROMANIZER.available(S.lang));
const rz=x=>typeof x==="string"&&romOn()?ROMANIZER.convert(S.lang,x):x;
function t(k,vars){let s=Lg().ui[k]; if(s==null)s=LANG.en.ui[k]; if(s==null)s=LANG.pt.ui[k]; if(s==null)return k;
  const fz=x=>furiOn()?(FURI.ja[x]||x):rz(x);
  if(vars&&typeof s==="string"){s=fz(s);for(const v in vars)s=s.split("{"+v+"}").join(fz(String(vars[v])));} return s;}
const frac=(a,b)=>a+"/"+b;
const fill=x=>typeof x==="string"?x.split("{d}").join(rz(t("modes").dificil)).split("{h}").join(rz(t("modes").hardcore)):x;
const furiOn=()=>!!(S&&S.furi&&S.lang==="ja"&&FURI.ja);
const FURI_SRC="([\\u3005\\u4e00-\\u9fff]+)\\[([\\u3041-\\u3096\\u30fc]+)\\]";
function textNode(x){
  if(typeof x!=="string")return document.createTextNode(x);
  if(furiOn()){const s=FURI.ja[x]||x, re=new RegExp(FURI_SRC,"g"); if(re.test(s)){re.lastIndex=0;const fr=document.createDocumentFragment();let last=0,m;
    while((m=re.exec(s))){if(m.index>last)fr.append(s.slice(last,m.index));const rb=document.createElement("ruby");rb.append(m[1]);const rt=document.createElement("rt");rt.textContent=m[2];rb.append(rt);fr.append(rb);last=re.lastIndex}
    if(last<s.length)fr.append(s.slice(last));return fr} return document.createTextNode(s)}
  return document.createTextNode(rz(x));
}
const langName=l=>{const m=STUDY_LANGS.find(x=>x.code===l);return m?(m.native===m.label?m.native:m.native+" ("+m.label+")"):(LANG[l]||{}).name||l};
const skT=id=>Lg().skills[id]||LANG.pt.skills[id];
const itT=id=>Lg().items[id]||LANG.pt.items[id];
function itemCode(it){return it.shared||(it.code?it.code[S.pl]||it.code.py:null)}
function itemOpts(it){return (it.opts||itT(it.id).opts).map(o=>o==="@err"?t("err"):o==="@none"?t("none"):o)}

/* ---------- Motor adaptativo (BKT) ---------- */
const mastered=id=>trk(id).L>=MASTER;
const preOk=id=>SK[id].pre.every(p=>trk(p).L>=UNLOCK);
const gateOk=id=>S.xpTotal>=(GATES[id]||0)||!!S.brief[id];
const unlocked=id=>preOk(id)&&gateOk(id);
function earn(x){S.xp+=x;S.xpTotal+=x}
const gt=()=>Lg().game||LANG.pt.game;
const isTyped=it=>MODES[S.mode].typed&&it.type==="mc"&&it.mono&&!!it.code;
const normOut=s=>String(s).replace(/,/g," ").replace(/\s+/g," ").trim();
const bossOpen=b=>b.need.every(k=>trk(k).L>=UNLOCK)&&S.xpTotal>=b.gate;
const allMastered=()=>SKILLS.every(s=>mastered(s.id));
const avgL=()=>SKILLS.reduce((a,s)=>a+trk(s.id).L,0)/SKILLS.length;
function career(){const r=t("roles"); if(allMastered())return r[4]; const a=avgL(); return a>=.8?r[3]:a>=.55?r[2]:a>=.3?r[1]:r[0]}
function shuffle(a){a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
function pickItem(skillId,avoid){
  const L=trk(skillId).L, target=L<.4?1:L<.7?2:3;
  let pool=ITEMS.filter(i=>i.skill===skillId&&!avoid.includes(i.id));
  if(!pool.length)return null;
  const unseen=pool.filter(i=>!S.seen[i.id]), missed=pool.filter(i=>S.seen[i.id]&&!S.seen[i.id].ok);
  pool=unseen.length?unseen:missed.length?missed:pool;
  const best=Math.min(...pool.map(i=>Math.abs(i.d-target)));
  return shuffle(pool.filter(i=>Math.abs(i.d-target)===best))[0];
}
function pendingMissions(){return SKILLS.filter(s=>unlocked(s.id)&&!S.brief[s.id]&&!mastered(s.id))}
function fillBoard(lastId){
  let eligible=SKILLS.filter(s=>unlocked(s.id)&&!mastered(s.id)&&S.brief[s.id]).map(s=>s.id);
  if(!eligible.length&&!pendingMissions().length)eligible=SKILLS.filter(s=>S.brief[s.id]||allMastered()).map(s=>s.id); // revisão: mantém o XP fluindo até o próximo portão
  S.board=S.board.filter(id=>IT[id]&&id!==lastId&&eligible.includes(IT[id].skill));
  const used=S.board.map(id=>IT[id].skill);
  const order=eligible.filter(k=>!used.includes(k)).sort((a,b)=>(trk(a).L+Math.random()*.3)-(trk(b).L+Math.random()*.3));
  for(const k of order){ if(S.board.length>=3)break; const it=pickItem(k,lastId?[lastId]:[]); if(it)S.board.push(it.id); }
  if(!S.board.length&&eligible.length){const it=pickItem(eligible[0],[]); if(it)S.board.push(it.id);}
}
function guessProb(it){return it.type==="mc"?1/itemOpts(it).length:it.type==="bug"?1/itemCode(it).split("\n").length:it.type==="sort"?1/Math.pow(2,it.key.length):0.05}
function bkt(L,ok,g){const post=ok? L*(1-SLIP)/(L*(1-SLIP)+(1-L)*g) : L*SLIP/(L*SLIP+(1-L)*(1-g)); return Math.min(.995,post+(1-post)*T)}
function resolve(ok){
  stopTimer();
  const it=cur.item, sk=trk(it.skill), before=sk.L, roleBefore=career(), m=MODES[cur.mode];
  const openBefore=SKILLS.filter(s=>unlocked(s.id)).map(s=>s.id);
  let g=guessProb(it); if(cur.typed)g=0.03; else if(cur.fifty||cur.hint)g=Math.max(.5,g);
  sk.L=bkt(before,ok,g); sk.n++; if(ok)sk.c++;
  const res={ok,before,after:sk.L,mi:Math.floor(Math.random()*4),comeback:0,streak:0,xp:0,pen:0,shield:false,bounties:[],newly:[],promo:null,masteredNow:before<MASTER&&sk.L>=MASTER};
  S.log.push({i:S.log.length+1,sprint:S.sprint.n,item:it.id,skill:it.skill,bloom:it.bloom,d:it.d,ok,hint:cur.hint,ai:!!cur.aiUsed,mode:cur.mode,typed:!!cur.typed,timeout:!!cur.timeout,boss:it.boss||null,lang:S.lang,pl:isProg(it.skill)?S.pl:null,before:+before.toFixed(3),after:+sk.L.toFixed(3),t:Date.now()});
  if(it.boss){ if(!ok)boss.errors++; }
  else{
    S.streak=ok?S.streak+1:0; S.best=Math.max(S.best,S.streak);
    if(ok){ let xp=Math.round(it.d*10*m.mult); if(cur.hint)xp=Math.ceil(xp/2); if(S.streak>=3){xp+=5;res.streak=S.streak} if(S.lastWrong){xp+=COMEBACK;res.comeback=COMEBACK} if(S.boost>0)xp*=2; if(cur.daily)xp*=2; res.xp=xp; earn(xp); }
    else{ const pen=m.pen*it.d; if(S.inv.shield>0){S.inv.shield--;res.shield=true} else {res.pen=Math.min(S.xp,pen);S.xp-=res.pen} }
    S.lastWrong=!ok;
    if(S.boost>0)S.boost--;
    if(cur.daily)S.daily.done=true;
    S.seen[it.id]={n:(S.seen[it.id]?S.seen[it.id].n:0)+1,ok};
    const sp=S.sprint; sp.done.push({item:it.id,ok}); sp.run=ok&&!cur.hint?sp.run+1:0;
    const met={b1:sp.run>=3,b2:ok&&(cur.mode==="dificil"||cur.mode==="hardcore"),b3:sp.done.length>=SPRINT&&sp.done.every(d=>d.ok)};
    BOUNTIES.forEach(b=>{if(met[b.id]&&!sp.b[b.id]){sp.b[b.id]=true;earn(b.xp);res.bounties.push(b)}});
    res.newly=SKILLS.filter(s=>unlocked(s.id)&&!openBefore.includes(s.id)).map(s=>skT(s.id).name);
    res.promo=career()!==roleBefore?career():null;
    fillBoard(it.id);
  }
  cur.done=true; cur.result=res; save();
}
/* ---------- Efeitos visuais (respeitam prefers-reduced-motion) ---------- */
const calm=()=>window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;
function burst(emojis,n){
  if(calm())return; const box=h("div",{class:"fx","aria-hidden":"true"}), cols=["var(--gold)","var(--prog)","var(--se)","var(--ok)"];
  for(let i=0;i<n;i++){ const e=i%3===0, p=h("span",{class:e?"em":"sq"},e?emojis[i%emojis.length]:"");
    p.style.setProperty("--dx",(Math.random()*2-1)*46+"vw"); p.style.setProperty("--dy",-(20+Math.random()*55)+"vh"); p.style.setProperty("--r",(Math.random()*720-360)+"deg");
    p.style.animationDelay=Math.random()*.15+"s"; if(!e)p.style.background=cols[i%4]; box.append(p); }
  document.body.append(box); setTimeout(()=>box.remove(),2000);
}
function floatXp(txt){ if(calm())return; const el=h("div",{class:"xpfloat","aria-hidden":"true"},txt); document.body.append(el); setTimeout(()=>el.remove(),1500); }
function celebrate(r,isBoss){
  if(!r.ok)return; const big=r.masteredNow||r.promo||r.bounties.length||r.newly.length;
  burst(big?["🏆","🎉","⭐","🚀"]:["✨","🎉","⭐"],big?48:22); if(!isBoss&&r.xp)floatXp("+"+r.xp+" XP");
  const b=document.getElementById("bal"); if(b&&!calm()){b.classList.remove("bump");void b.offsetWidth;b.classList.add("bump")}
}
function stopTimer(){if(tick){clearInterval(tick);tick=null}}
function startTimer(){
  stopTimer(); const sec=MODES[cur.mode].timer; if(!sec)return; cur.deadline=Date.now()+sec*1000;
  tick=setInterval(()=>{ if(view!=="ticket"||!cur||cur.done){stopTimer();return}
    const left=Math.ceil((cur.deadline-Date.now())/1000), el=document.getElementById("timer");
    if(left<=0){cur.timeout=true;resolve(false);render();return} if(el)el.textContent=t("timeLeft",{s:left}); },250);
}
function ensureDaily(){
  const d=new Date(), today=d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate(); if(S.daily.date===today)return;
  const pool=ITEMS.filter(i=>S.brief[i.skill]&&unlocked(i.skill)); if(!pool.length)return;
  S.daily={date:today,item:shuffle(pool)[0].id,done:false};
}
function buy(p){
  if(S.xp<p.cost)return; if(p.kind==="title"&&S.titles.includes(p.id))return; S.xp-=p.cost;
  if(p.kind==="title"){S.titles.push(p.id);S.title=p.id} else if(p.id==="boost")S.boost+=3; else S.inv[p.id]++;
  save(); render(); burst([p.icon,"✨"],18);
}

/* ---------- Tutor com LLM ---------- */
const AI={sample:null,
  ready(){return !!this.sample||!!(S.ai&&(S.ai.key||(S.ai.provider==="openai"&&S.ai.base)))},
  async ask(prompt){
    if(this.sample){const r=await this.sample(prompt,{modelTier:"quick",cache:false}); return r.text;}
    const a=S.ai;
    if(a.provider==="anthropic"){
      const r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"content-type":"application/json","x-api-key":a.key,"anthropic-version":"2023-06-01","anthropic-dangerous-direct-browser-access":"true"},
        body:JSON.stringify({model:a.model||"claude-haiku-4-5-20251001",max_tokens:400,messages:[{role:"user",content:prompt}]})});
      if(!r.ok)throw new Error("HTTP "+r.status); const d=await r.json(); return d.content.map(c=>c.text||"").join("");
    }
    const base=(a.base||"https://api.openai.com/v1").replace(/\/+$/,""), hd={"content-type":"application/json"}; if(a.key)hd.authorization="Bearer "+a.key;
    const r=await fetch(base+"/chat/completions",{method:"POST",headers:hd,body:JSON.stringify({model:a.model||"gpt-4o-mini",max_tokens:400,messages:[{role:"user",content:prompt}]})});
    if(!r.ok)throw new Error("HTTP "+r.status); const d=await r.json(); return d.choices[0].message.content;
  }};
function aiContext(it){
  const tx=itT(it.id), code=itemCode(it);
  return "You are the tutor inside DevWise, an educational game that teaches programming and software engineering through real-world stories and everyday analogies.\n"+
    "Skill: "+skT(it.skill).name+". Story context: "+skT(it.skill).client+" - "+skT(it.skill).title+".\n"+
    "Task type: "+it.type+". Question: "+tx.prompt+"\n"+(code?"Code ("+(it.shared?"shell":PLS[S.pl])+"):\n"+code+"\n":"")+
    (it.type==="mc"?"Options: "+itemOpts(it).join(" | ")+"\n":"")+(it.type==="sort"?"Categories: "+tx.bins.join(" / ")+". Cards: "+tx.cards.join(" | ")+"\n":"")+(tx.lines?"Steps to be ordered (shown shuffled to the student): "+shuffle(tx.lines).join(" | ")+"\n":"")+
    "Student's estimated mastery of this skill: "+Math.round(trk(it.skill).L*100)+"%.\n";
}
async function aiHint(){
  cur.hint=true; cur.aiUsed=true; cur.aiText=t("aiThinking"); render();
  try{cur.aiText=(await AI.ask(aiContext(cur.item)+"Give ONE Socratic hint of at most 55 words built on a practical everyday analogy. Never reveal the answer, never name or quote the correct option or line. Plain text, no markdown. Reply in "+Lg().llmName+".")).trim();}
  catch(e){cur.aiText=t("aiFail")+" "+t("tutorHint")+itT(cur.item.id).hint;}
  if(view==="ticket")render();
}
async function aiExplain(){
  const it=cur.item, tx=itT(it.id); cur.aiAfter=t("aiThinking"); render();
  let given=""; if(it.type==="mc"&&cur.sel!=null)given=itemOpts(it)[cur.sel]; if(it.type==="bug"&&cur.sel!=null)given="line "+(cur.sel+1);
  try{cur.aiAfter=(await AI.ask(aiContext(it)+"The student answered "+(cur.result.ok?"correctly":"incorrectly")+(given?" ("+given+")":"")+". Official explanation: "+tx.why+"\nAnalogy already shown: "+tx.analogy+"\nExplain the concept again in at most 80 words using a NEW everyday analogy, different from the one shown"+(cur.result.ok?"":", and point out the likely misconception behind the wrong answer")+". Plain text, no markdown. Reply in "+Lg().llmName+".")).trim();}
  catch(e){cur.aiAfter=t("aiFail");}
  if(view==="ticket")render();
}

/* ---------- DOM ---------- */
function h(tag,attrs,...kids){
  const el=document.createElement(tag);
  for(const k in attrs||{}){const v=attrs[k]; if(v==null||v===false)continue;
    if(k==="class")el.className=v; else if(k==="value")el.value=v; else if(k.startsWith("on"))el.addEventListener(k.slice(2),v); else el.setAttribute(k,v===true?"":v);}
  const raw=attrs&&attrs["data-raw"];
  for(const kid of kids.flat(3)){ if(kid==null||kid===false)continue; el.append(kid.nodeType?kid:raw?document.createTextNode(kid):textNode(kid)); }
  return el;
}
function sv(tag,attrs,...kids){
  const el=document.createElementNS("http://www.w3.org/2000/svg",tag);
  for(const k in attrs||{}){ if(attrs[k]==null)continue; if(k.startsWith("on"))el.addEventListener(k.slice(2),attrs[k]); else el.setAttribute(k,attrs[k]); }
  for(const kid of kids.flat()){ if(kid==null)continue; el.append(kid.nodeType?kid:document.createTextNode(rz(kid))); }
  return el;
}
const pct=x=>Math.round(x*100)+"%";
function go(v){if(v!=="ticket")stopTimer(); view=v; resetArmed=false; setMsg=""; render(); window.scrollTo(0,0)}
const langMeta=l=>STUDY_LANGS.find(x=>x.code===l)||{};
function applyLang(){const el=document.documentElement; el.lang=S.lang; if(el.setAttribute)el.setAttribute("dir",langMeta(S.lang).rtl?"rtl":"ltr")}
function setLang(l){S.lang=l; save(); applyLang(); render()}
function setPl(p){S.pl=p; SKILLS.forEach(s=>{const k=tkey(s.id); if(S.sprint.start[k]===undefined)S.sprint.start[k]=trk(s.id).L}); fillBoard(); save(); render()}
function langBar(){
  const ks=Object.keys(LANG), can=ROMANIZER.available(S.lang);
  return h("div",{class:"langbar"},
    h("select",{class:"langsel","aria-label":t("uiLang"),onchange:e=>setLang(e.target.value)},ks.map(l=>h("option",{value:l,selected:S.lang===l,"data-raw":1},langName(l)))),
    S.lang==="ja"&&FURI.ja&&h("button",{"aria-pressed":String(!!S.furi),title:"ふりがな","aria-label":"ふりがな","data-raw":1,onclick:()=>{S.furi=!S.furi;if(S.furi)S.rom=false;save();render()}},"ふ"),
    can&&h("button",{"aria-pressed":String(!!S.rom),title:t("rom"),"aria-label":t("rom"),"data-raw":1,onclick:()=>{S.rom=!S.rom;if(S.rom)S.furi=false;save();render()}},"Aa"));
}
function plTabs(){return h("div",{class:"tabs",role:"group","aria-label":t("codeLang")},Object.keys(PLS).map(p=>h("button",{"aria-pressed":String(S.pl===p),onclick:()=>setPl(p)},PLS[p])))}

/* ---------- Telas ---------- */
function topbar(){
  const onBoard=["board","ticket","retro","brief","boss"].includes(view);
  return h("header",{class:"top"},
    h("button",{class:"brand",onclick:()=>go(S.started?"board":"home")},"DevWise"),
    S.started&&h("div",{class:"stats"},h("span",null,t("role")+" ",h("b",null,career())),
      S.title&&h("span",null,SHOP.find(p=>p.id===S.title).icon+" ",h("b",null,gt().shop[S.title][0])),
      h("span",null,"💰 "+t("balance")+" ",h("b",{id:"bal"},S.xp+" XP")),h("span",null,t("total")+" ",h("b",null,String(S.xpTotal))),
      h("span",null,(S.streak>=3?"🔥 ":"")+t("streak")+" ",h("b",null,String(S.streak))),
      S.boost>0&&h("span",{class:"tag",style:"background:var(--gold-soft)"},"⚡ "+t("boostOn",{n:S.boost}))),
    h("nav",{class:"nav"},
      S.started&&h("button",{"aria-current":onBoard?"page":null,onclick:()=>go("board")},t("navBoard")),
      S.started&&h("button",{"aria-current":view==="shop"?"page":null,onclick:()=>go("shop")},"🛍️ "+t("navShop")),
      S.started&&h("button",{"aria-current":view==="report"?"page":null,onclick:()=>go("report")},t("navReport")),
      S.started&&h("button",{"aria-current":view==="settings"?"page":null,onclick:()=>go("settings")},t("navSettings")),
      langBar()));
}
function home(){
  return h("main",{class:"home"},
    h("div",null,h("h1",{style:"font-size:clamp(2.4rem,6.5vw,4.4rem)"},t("homeH")),h("p",{class:"lead"},t("homeLead")),
      h("button",{class:"btn",onclick:()=>{S.started=true;fillBoard();save();go("board")}},S.log.length?t("cont"):t("start"))),
    h("ol",{class:"loop"},t("steps").map(s=>h("li",null,h("div",null,h("strong",null,s[0]),s[1])))));
}
function ticketCard(it,daily){
  const se=SK[it.skill].area==="se", rev=mastered(it.skill)&&!daily;
  return h("button",{class:"ticket"+(se?" se":"")+(daily?" daily":""),onclick:()=>openTicket(it.id,{daily})},
    h("span",{class:"id"},"DW-"+it.id.toUpperCase()+"  "+skT(it.skill).client),
    h("span",{class:"tt"},itT(it.id).title),
    h("span",{class:"meta"},daily&&h("span",{class:"tag",style:"background:var(--gold-soft)"},t("dailyTag")),rev&&h("span",{class:"tag plain"},t("review")),
      h("span",{class:"tag"+(se?" se":"")},skT(it.skill).name),h("span",{class:"tag plain"},t("types")[it.type]),h("span",{class:"tag plain"},t("bloom")[it.bloom-1]),
      h("span",{class:"pts",role:"img","aria-label":t("diff",{d:it.d})},"●".repeat(it.d)+"○".repeat(3-it.d))));
}
function bossCard(b){
  const x=gt().bosses[b.id], won=!!S.bosses[b.id], open=bossOpen(b);
  return h("button",{class:"bosscard"+(won?" won":""),disabled:!open||won,onclick:()=>{boss={id:b.id,stage:0,errors:0,phase:"intro"};go("boss")}},
    h("span",{class:"who"},x.client),h("span",{class:"tt"},(won?"🏆":open?b.icon:"🔒")+" "+x.name),
    h("span",{class:"note"},won?t("bossDefeated")+": "+x.trophy:open?t("bossFight")+". "+t("reward",{x:Math.round(b.reward*MODES[S.mode].mult)}):t("bossLocked",{p:b.need.map(k=>skT(k).name).join(", "),x:b.gate})));
}
function modePanel(){
  return h("div",{class:"panel",style:"margin-bottom:18px"},
    h("div",{class:"tabs",role:"group","aria-label":t("modeH")},Object.keys(MODES).map(k=>h("button",{"aria-pressed":String(S.mode===k),onclick:()=>{S.mode=k;save();render()}},MODE_ICON[k]+" "+t("modes")[k]+" ×"+String(MODES[k].mult).replace(".",S.lang==="en"?".":",")))),
    h("p",{class:"note",style:"margin:6px 0 14px"},t("modeDesc")[S.mode]),
    h("b",{style:"font-family:var(--display)"},"🎯 "+t("bountiesH")),
    h("ul",{class:"bounties"},BOUNTIES.map(b=>h("li",{class:S.sprint.b[b.id]?"ok":null},(S.sprint.b[b.id]?"✅ ":"")+fill(gt().bounties[b.id])+"  +"+b.xp+" XP"))));
}
function missionCard(s){
  const x=skT(s.id);
  return h("button",{class:"mission",onclick:()=>{briefId=s.id;go("brief")}},h("span",{class:"who"},x.client),h("span",{class:"tt"},x.title),
    h("span",{class:"meta"},h("span",{class:"tag"+(s.area==="se"?" se":"")},x.name),h("span",null,t("openBrief"))));
}
function pips(){
  const el=h("div",{class:"pips",role:"img","aria-label":S.sprint.done.length+" / "+SPRINT});
  for(let i=0;i<SPRINT;i++){const d=S.sprint.done[i]; el.append(h("span",{class:"pip"+(d?(d.ok?" ok":" bad"):"")}));}
  return el;
}
function skillMap(){
  const R=25, C=2*Math.PI*R;
  const svg=sv("svg",{viewBox:"0 0 610 412",role:"group","aria-label":t("map")},
    sv("defs",null,sv("marker",{id:"arr",viewBox:"0 0 10 10",refX:"9",refY:"5",markerWidth:"7",markerHeight:"7",orient:"auto-start-reverse"},sv("path",{d:"M0 0L10 5L0 10z",fill:"var(--muted)"}))),
    sv("text",{x:"30",y:"18","font-size":"13.5",fill:"var(--muted)","font-family":"var(--body)"},t("areaProg")+" ("+PLS[S.pl]+")"),
    sv("text",{x:"30",y:"208","font-size":"13.5",fill:"var(--muted)","font-family":"var(--body)"},t("areaSE")));
  SKILLS.forEach(s=>s.pre.forEach(p=>{
    const a=SK[p],dx=s.x-a.x,dy=s.y-a.y,len=Math.hypot(dx,dy),ux=dx/len,uy=dy/len,open=trk(p).L>=UNLOCK;
    svg.append(sv("line",{x1:a.x+ux*(R+4),y1:a.y+uy*(R+4),x2:s.x-ux*(R+7),y2:s.y-uy*(R+7),stroke:"var(--muted)","stroke-width":open?"2":"1.5","stroke-dasharray":open?null:"4 5",opacity:open?".9":".55","marker-end":"url(#arr)"}));
  }));
  SKILLS.forEach(s=>{
    const L=trk(s.id).L, un=unlocked(s.id), m=mastered(s.id), col=m?"var(--ok)":s.area==="se"?"var(--se)":"var(--prog)", nm=skT(s.id).name;
    const pick=()=>{selSkill=s.id;render()};
    const g=sv("g",{class:"node"+(un?"":" locked"),transform:`translate(${s.x} ${s.y})`,tabindex:"0",role:"button","aria-label":nm+", "+(un?t("masteryAria")+" "+pct(L):t("lockedAria")),
      onclick:pick,onkeydown:e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();pick()}}});
    g.append(sv("circle",{r:R,fill:"var(--surface)",stroke:"var(--line)","stroke-width":"5","stroke-dasharray":un?null:"3 5"}));
    if(un){g.append(sv("circle",{r:R,fill:"none",stroke:col,"stroke-width":"5","stroke-linecap":"round","stroke-dasharray":`${L*C} ${C}`,transform:"rotate(-90)"}));
      g.append(sv("text",{class:"pct","text-anchor":"middle",y:"5"},String(Math.round(L*100))));}
    else{g.append(sv("path",{d:"M-5 -2v-4a5 5 0 0 1 10 0v4",fill:"none",stroke:"var(--muted)","stroke-width":"2"}));g.append(sv("rect",{x:"-8",y:"-2",width:"16",height:"12",rx:"2.5",fill:"var(--muted)"}));}
    if(selSkill===s.id)g.append(sv("circle",{r:R+7,fill:"none",stroke:"var(--gold)","stroke-width":"2"}));
    g.append(sv("text",{class:"lbl","text-anchor":"middle",y:R+20},nm));
    svg.append(g);
  });
  return h("div",{class:"mapwrap"},svg);
}
function skillInfo(){
  if(!selSkill)return h("p",{class:"skillinfo empty"},t("mapHint"));
  const s=SK[selSkill],x=skT(selSkill),st=trk(selSkill),un=unlocked(selSkill),pre=s.pre.map(p=>skT(p).name).join(t("and")),gate=GATES[selSkill]||0;
  const why=un?(mastered(selSkill)?t("masteredTxt"):t("estTxt",{p:pct(st.L)}))+t("hits",{c:st.c,n:st.n})
    :preOk(selSkill)?t("lockedXpOnly",{x:gate,y:S.xpTotal}):gate?t("lockedXp",{p:pre,x:gate,y:S.xpTotal}):t("locked",{p:pre});
  return h("div",{class:"skillinfo","aria-live":"polite"},h("h4",null,x.name),h("p",null,x.about),h("p",{class:"note"},why),
    un&&h("button",{class:"btn ghost small",onclick:()=>{briefId=selSkill;go("brief")}},t("reread")));
}
function board(){
  if(S.sprint.done.length>=SPRINT)return retro();
  fillBoard(); ensureDaily(); save();
  const miss=pendingMissions(), free=allMastered(), dl=S.daily.item&&IT[S.daily.item];
  return h("main",null,
    h("div",{class:"sprintbar"},h("h2",null,t("sprint",{n:S.sprint.n})),pips(),h("span",{class:"note"},free?t("freePlay"):t("ticketOf",{n:S.sprint.done.length+1,m:SPRINT}))),
    h("div",{class:"board"},
      h("section",{class:"col"},
        miss.length>0&&[h("h3",null,t("missions")),h("div",{class:"tickets"},miss.map(missionCard))],
        h("h3",{class:miss.length?"gap":null},t("todo")),
        S.board.length?h("div",{class:"tickets"},S.board.map(id=>ticketCard(IT[id]))):h("p",{class:"empty"},t("todoEmpty")),
        dl&&[h("h3",{class:"gap"},"📅 "+t("dailyH")),S.daily.done?h("p",{class:"empty"},t("dailyDone")):h("div",{class:"tickets"},ticketCard(dl,true))],
        h("h3",{class:"gap"},"⚔️ "+t("bossesH")),h("div",{class:"tickets"},BOSSES.map(bossCard)),
        h("div",{class:"done"},h("h3",null,t("doneSprint")),
          S.sprint.done.length?h("div",{class:"chips"},S.sprint.done.map(d=>h("span",{class:"chip"+(d.ok?"":" bad")},"DW-"+d.item.toUpperCase()+" "+(d.ok?t("resolved"):t("toReview"))))):h("p",{class:"empty"},t("nothingDone")))),
      h("section",{class:"col"},h("h3",null,t("modeH")),modePanel(),h("h3",null,t("map")),h("div",{class:"panel"},skillMap(),skillInfo()))));
}
function brief(){
  const s=SK[briefId], x=skT(briefId), first=!S.brief[briefId];
  return h("main",{class:"brief"},
    h("p",{class:"client"},t("client")+": "+x.client),
    h("h2",null,x.title),
    h("p",{class:"story"},x.story),
    h("h3",null,t("arsenal")+": "+x.name),
    h("div",{class:"theory"},x.theory.map(c=>h("div",null,h("b",null,c[0]),c[1]))),
    EX[briefId]&&[h("h3",{style:"font-size:1.15rem"},t("example")),plTabs(),h("pre",{class:"code"},EX[briefId][S.pl]),h("p",{class:"note"},t("snippetNote"))],
    h("div",{class:"sbc"},h("b",null,t("sbcH")),h("ul",null,s.sbc.map(c=>h("li",null,Lg().sbc[c]||LANG.pt.sbc[c])))),
    h("div",{class:"row"},
      h("button",{class:"btn",onclick:()=>{S.brief[briefId]=true;fillBoard();save();go("board")}},first?t("startTickets"):t("backBoard"))));
}
function openTicket(id,o){
  const it=IT[id]; o=o||{};
  cur={item:it,sel:null,hint:false,done:false,result:null,aiText:null,aiAfter:null,aiUsed:false,mode:S.mode,daily:!!o.daily,typed:isTyped(it),text:"",fifty:false,timeout:false};
  if(it.type==="mc")cur.order=shuffle(itemOpts(it).map((_,i)=>i));
  if(it.type==="bug"||it.type==="parsons"){cur.prose=!itemCode(it);cur.lines=cur.prose?itT(it.id).lines.slice():itemCode(it).split("\n");}
  if(it.type==="sort")cur.pick=it.key.map(()=>null);
  if(it.type==="parsons"){let b;do{b=shuffle(cur.lines.map((_,i)=>i))}while(b.every((v,i)=>v===i));cur.bank=b;cur.sol=[]}
  go("ticket"); startTimer();
}
function bossView(){
  const b=BOSSES.find(x=>x.id===boss.id), x=gt().bosses[b.id], mult=MODES[S.mode].mult;
  if(boss.phase==="intro")return h("main",{class:"brief"},h("p",{class:"client"},t("client")+": "+x.client),h("h2",null,b.icon+" "+x.name),h("p",{class:"story"},x.story),
    h("div",{class:"sbc"},h("b",null,t("modes")[S.mode]+" ×"+mult+". "),t("bossRules")+" "+t("reward",{x:Math.round(b.reward*mult)})),
    h("div",{class:"row"},h("button",{class:"btn",onclick:()=>{boss.phase="fight";openTicket(b.stages[0])}},t("bossStart")),h("button",{class:"btn ghost",onclick:()=>go("board")},t("backBoard"))));
  if(!boss.settled){boss.settled=true; if(boss.won){boss.gain=Math.round(b.reward*mult);earn(boss.gain);S.bosses[b.id]=true;setTimeout(()=>burst(["🏆","🎉","⭐",b.icon],60),50)} else {boss.loss=Math.min(S.xp,b.fail);S.xp-=boss.loss} save();}
  return h("main",{class:"work"},h("section",{class:"fb"+(boss.won?"":" bad")},h("h3",null,boss.won?"🏆 "+t("bossWin"):"🌱 "+t("bossLose")),
    h("p",null,boss.won?t("bossWinP",{x:boss.gain,t:x.trophy}):t("bossLoseP",{x:boss.loss})),h("button",{class:"btn",onclick:()=>{boss=null;go("board")}},t("backBoard"))));
}
function bossAdvance(){
  const b=BOSSES.find(x=>x.id===boss.id);
  if(boss.errors>1){boss.phase="end";boss.won=false;cur=null;go("boss");return}
  if(boss.stage>=b.stages.length-1){boss.phase="end";boss.won=true;cur=null;go("boss");return}
  boss.stage++; openTicket(b.stages[boss.stage]);
}
function shop(){
  const card=p=>{const x=gt().shop[p.id], has=p.kind==="title"&&S.titles.includes(p.id), n=p.id==="boost"?S.boost:S.inv[p.id], can=S.xp>=p.cost;
    return h("div",{class:"panel shopitem"+(can||has?"":" far")},h("div",{class:"ico","aria-hidden":"true"},p.icon),h("h3",null,x[0]),h("p",null,fill(x[1])),
      p.kind==="power"&&h("p",{class:"note"},(n>0?"🎒 ":"")+t("owned",{n})),
      has?h("button",{class:"btn ghost small",onclick:()=>{S.title=S.title===p.id?null:p.id;save();render()}},S.title===p.id?"✅ "+t("equipped")+". "+t("unequip"):t("equip"))
         :h("button",{class:"btn small",disabled:!can,onclick:()=>buy(p)},can?t("buy",{c:p.cost}):"🔒 "+t("need",{n:p.cost-S.xp,c:p.cost})));};
  return h("main",null,h("h2",{style:"font-size:1.9rem;font-weight:800"},"🛍️ "+t("shopH")),h("p",{style:"max-width:46em"},t("shopP")),
    h("div",{class:"analogy",style:"background:var(--surface);max-width:46em"},h("b",null,t("analogy")),t("shopA")),
    h("div",{class:"kpis"},h("div",null,h("b",null,"💰 "+S.xp+" XP"),t("balance")),h("div",null,h("b",null,"⭐ "+S.xpTotal),t("total"))),
    h("h3",{style:"margin:22px 0 12px;font-size:1.3rem"},"⚡ "+t("powers")),h("div",{class:"grid2",style:"margin-top:0"},SHOP.filter(p=>p.kind==="power").map(card)),
    h("h3",{style:"margin:26px 0 12px;font-size:1.3rem"},"🎖️ "+t("titlesH")),h("div",{class:"grid2",style:"margin-top:0"},SHOP.filter(p=>p.kind==="title").map(card)));
}
function ticket(){
  const it=cur.item, tx=itT(it.id), se=SK[it.skill].area==="se", r=cur.result, body=[], opts=it.type==="mc"?itemOpts(it):null, m=MODES[cur.mode], isBoss=!!it.boss;
  const check=()=>{
    if(cur.typed&&!normOut(cur.text))return;
    const ok=cur.typed?normOut(cur.text)===normOut(opts[0]):it.type==="mc"?cur.sel===0:it.type==="bug"?cur.sel===it.answer:it.type==="sort"?cur.pick.every((p,i)=>p===it.key[i]):cur.sol.map(i=>cur.lines[i]).join("\n")===cur.lines.join("\n");
    resolve(ok); render(); celebrate(cur.result,isBoss); const fb=document.getElementById("fb"); if(fb){fb.focus();fb.scrollIntoView({block:"nearest",behavior:"smooth"})}
  };
  if(it.type==="mc"){
    if(itemCode(it))body.push(h("pre",{class:"code"},itemCode(it)));
    if(cur.typed){
      body.push(h("label",{class:"typed"},t("typedLbl"),h("input",{type:"text",id:"typed",value:cur.text,placeholder:t("typedPh"),disabled:cur.done,autocomplete:"off",spellcheck:"false",
        oninput:e=>{cur.text=e.target.value},onkeydown:e=>{if(e.key==="Enter")check()}})));
      if(cur.done)body.push(h("p",{class:"note"},t("yourAnswer",{a:cur.text||"-"})+"   "+t("expected",{a:opts[0]})));
    } else body.push(h("div",{class:"opts",role:"group","aria-label":t("options")},cur.order.map(i=>{
      let cls="opt"+(it.mono?" mono":""); if(cur.done){ if(i===0)cls+=" right"; else if(i===cur.sel)cls+=" wrong"; }
      return h("button",{class:cls,"aria-pressed":String(cur.sel===i),disabled:cur.done,onclick:()=>{cur.sel=i;render()}},opts[i]);})));
  }
  if(it.type==="bug"){
    body.push(h("div",{class:"codelines",role:"group","aria-label":t("codeLines")},cur.lines.map((ln,i)=>{
      let cls="cl"; if(cur.done){ if(i===it.answer)cls+=" right"; else if(i===cur.sel)cls+=" wrong"; }
      return h("button",{class:cls,"aria-pressed":String(cur.sel===i),disabled:cur.done,onclick:()=>{cur.sel=i;render()}},h("span",{class:"n"},String(i+1)),h("span",null,ln));})));
  }
  if(it.type==="sort"){
    body.push(h("p",{class:"note"},t("sortHint")));
    body.push(h("div",{class:"sortcards"},tx.cards.map((c,i)=>{const okc=cur.done&&cur.pick[i]===it.key[i];
      return h("div",{class:"sortcard"+(cur.done?(okc?" right":" wrong"):"")},h("p",null,c),
        h("div",{class:"tabs",role:"group"},tx.bins.map((b,k)=>h("button",{"aria-pressed":String(cur.pick[i]===k),disabled:cur.done,class:cur.done&&it.key[i]===k?"goal":null,onclick:()=>{cur.pick[i]=k;render()}},b))));})));
  }
  if(it.type==="parsons"){
    const move=(i,dir)=>{const j=i+dir;if(j<0||j>=cur.sol.length)return;[cur.sol[i],cur.sol[j]]=[cur.sol[j],cur.sol[i]];render()};
    body.push(h("div",{class:"parsons"+(cur.prose?" prose":"")},
      h("div",{class:"zone"},h("h4",null,t("bank")),cur.bank.length?cur.bank.map(i=>h("div",{class:"prow"},h("button",{class:"pline",disabled:cur.done,onclick:()=>{cur.bank=cur.bank.filter(x=>x!==i);cur.sol.push(i);render()}},cur.lines[i].trimStart()))):h("p",{class:"empty"},t("allUsed"))),
      h("div",{class:"zone sol"},h("h4",null,t("sol")),cur.sol.map((i,pos)=>h("div",{class:"prow"},
        h("button",{class:"pline",disabled:cur.done,onclick:()=>{cur.sol=cur.sol.filter(x=>x!==i);cur.bank.push(i);render()}},cur.lines[i]),
        !cur.done&&h("button",{class:"mv","aria-label":t("up"),onclick:()=>move(pos,-1)},"↑"),
        !cur.done&&h("button",{class:"mv","aria-label":t("down"),onclick:()=>move(pos,1)},"↓"))))));
    if(cur.done&&!r.ok)body.push(h("p",{class:"note"},t("correctOrder")),cur.prose?h("ol",{class:"steps"},cur.lines.map(l=>h("li",null,l))):h("pre",{class:"code"},cur.lines.join("\n")));
  }
  const ready=cur.typed?true:it.type==="parsons"?cur.sol.length===cur.lines.length:it.type==="sort"?cur.pick.every(p=>p!==null):cur.sel!==null;
  const over=S.sprint.done.length>=SPRINT, busy=cur.aiText===t("aiThinking")||cur.aiAfter===t("aiThinking");
  const hints=isBoss?"none":m.hint, canPay=hints!=="paid"||S.xp>=HINT_COST, payHint=()=>{if(hints==="paid"){S.xp-=HINT_COST;save()}};
  const timed=m.timer>0&&!cur.done, b=isBoss&&BOSSES.find(x=>x.id===it.boss);
  const useFifty=()=>{const wrong=shuffle(cur.order.filter(i=>i!==0)).slice(0,2);cur.order=cur.order.filter(i=>!wrong.includes(i));if(wrong.includes(cur.sel))cur.sel=null;cur.fifty=true;S.inv.fifty--;save();render()};
  return h("main",{class:"work"},
    isBoss&&h("p",{class:"promo",style:"margin-bottom:8px"},gt().bosses[it.boss].name+": "+t("bossStage",{n:boss.stage+1,m:b.stages.length})+". "+t("bossLives",{n:Math.max(0,1-boss.errors)})),
    h("div",{class:"meta"},h("span",{class:"tag plain"},"DW-"+it.id.toUpperCase()),h("span",{class:"tag"+(se?" se":"")},skT(it.skill).name),!isBoss&&h("span",{class:"tag plain"},skT(it.skill).client),
      h("span",{class:"tag plain"},t("types")[it.type]),h("span",{class:"tag plain"},t("bloom")[it.bloom-1]),it.code&&h("span",{class:"tag plain"},PLS[S.pl]),
      h("span",{class:"tag",style:"background:var(--gold-soft)"},t("modes")[cur.mode]+" ×"+m.mult),cur.daily&&h("span",{class:"tag",style:"background:var(--gold-soft)"},t("dailyTag"))),
    h("h2",null,tx.title),
    timed&&h("p",{class:"timer",id:"timer",role:"timer"},"⏱️ "+t("timeLeft",{s:Math.max(0,Math.ceil((cur.deadline-Date.now())/1000))})),
    h("p",{class:"prompt"},tx.prompt), body,
    cur.hint&&!cur.aiUsed&&h("div",{class:"hint"},h("b",null,t("tutorHint")),tx.hint),
    cur.aiText&&h("div",{class:"ai","aria-live":"polite"},h("b",null,t("aiLabel")),cur.aiText),
    !cur.done&&h("div",{class:"row"},
      h("button",{class:"btn",disabled:!ready,onclick:check},t("check")),
      hints!=="none"&&!cur.hint&&h("button",{class:"btn ghost",disabled:!canPay,onclick:()=>{payHint();cur.hint=true;render()}},hints==="paid"?t("hintPaid",{c:HINT_COST}):t("hint")),
      hints!=="none"&&!cur.aiUsed&&!cur.hint&&AI.ready()&&h("button",{class:"btn ghost",disabled:busy||!canPay,onclick:()=>{payHint();aiHint()}},t("aiHint")),
      !isBoss&&!cur.typed&&it.type==="mc"&&!cur.fifty&&S.inv.fifty>0&&h("button",{class:"btn ghost",onclick:useFifty},"✂️ "+t("useFifty",{n:S.inv.fifty})),
      timed&&!isBoss&&S.inv.time>0&&h("button",{class:"btn ghost",onclick:()=>{cur.deadline+=30000;S.inv.time--;save();render()}},"⏳ "+t("useTime",{n:S.inv.time})),
      !timed&&!isBoss&&h("button",{class:"btn ghost",onclick:()=>go("board")},t("backBoard"))),
    !cur.done&&h("p",{class:"note",style:"margin-top:10px"},hints==="none"?t("noHints"):!cur.hint&&hints==="free"?t("hintNote"):null),
    cur.done&&h("section",{class:"fb"+(r.ok?"":" bad"),id:"fb",tabindex:"-1","aria-live":"polite"},
      h("h3",null,r.ok?"🎉 "+t("cheers")[r.mi]:cur.timeout?"⏰ "+t("timeout"):"🌱 "+t("notYet")),
      !r.ok&&h("p",{class:"soft"},t("oops")[r.mi]+(isBoss?"":" "+t("keepGoing"))),
      h("p",null,h("b",null,t("why")),tx.why),
      h("div",{class:"analogy"},h("b",null,t("analogy")),tx.analogy),
      cur.aiAfter&&h("div",{class:"ai"},h("b",null,t("aiLabel")),cur.aiAfter),
      h("p",{class:"delta"},t("delta",{s:skT(it.skill).name,a:pct(r.before),b:pct(r.after),x:r.xp})),
      r.streak>0&&h("p",{class:"promo"},"🔥 "+t("streakMsg",{n:r.streak})),
      r.comeback>0&&h("p",{class:"promo"},"💪 "+t("comeback",{x:r.comeback})),
      r.pen>0&&h("p",{class:"note"},t("lost",{x:r.pen})),
      r.shield&&h("p",{class:"delta"},"🛡️ "+t("shieldUsed")),
      !r.ok&&r.after>r.before&&h("p",{class:"note"},t("roseNote")),
      r.bounties.map(bn=>h("p",{class:"promo"},"🎯 "+t("bountyDone",{s:fill(gt().bounties[bn.id]),x:bn.xp}))),
      r.masteredNow&&h("p",{class:"promo"},"🏅 "+t("masteredNow",{s:skT(it.skill).name})),
      r.newly.length>0&&h("p",{class:"promo"},"🔓 "+t("unlockedNow",{s:r.newly.join(", ")})),
      r.promo&&h("p",{class:"promo"},"📈 "+t("promo",{r:r.promo})),
      h("div",{class:"row"},
        isBoss?h("button",{class:"btn",onclick:bossAdvance},boss.errors>1||boss.stage>=b.stages.length-1?t("bossResult"):t("bossNext"))
              :h("button",{class:"btn",onclick:()=>go(over?"retro":"board")},over?t("toRetro"):t("backBoard")),
        AI.ready()&&!cur.aiAfter&&h("button",{class:"btn ghost",disabled:busy,onclick:aiExplain},t("aiExplain")))));
}
function weakest(){return SKILLS.filter(s=>unlocked(s.id)&&!mastered(s.id)).sort((a,b)=>trk(a.id).L-trk(b.id).L)[0]||null}
function retro(){
  const d=S.sprint.done, ok=d.filter(x=>x.ok).length, w=weakest();
  const moved=SKILLS.filter(s=>Math.abs(trk(s.id).L-(S.sprint.start[tkey(s.id)]??L0))>.004);
  return h("main",{class:"work"},h("h2",null,t("retroH",{n:S.sprint.n})),
    h("p",{class:"prompt"},t("retroSum",{c:ok,n:d.length})+(ok===d.length?t("retroA"):ok>=3?t("retroB"):t("retroC"))),
    h("div",{class:"panel"},h("h3",null,t("changed")),h("div",{class:"tblwrap"},h("table",null,h("thead",null,h("tr",null,h("th",null,t("colSkill")),h("th",null,t("colStart")),h("th",null,t("colNow")))),
      h("tbody",null,moved.map(s=>h("tr",null,h("td",null,skT(s.id).name),h("td",null,pct(S.sprint.start[tkey(s.id)]??L0)),h("td",null,h("b",null,pct(trk(s.id).L))))))))),
    h("p",{style:"margin-top:18px"},w?t("suggestion",{s:skT(w.id).name,p:pct(trk(w.id).L)}):t("allDone")),
    h("button",{class:"btn",onclick:()=>{S.sprint=newSprint(S.sprint.n+1);fillBoard();save();go("board")}},t("nextSprint",{n:S.sprint.n+1})));
}
function evolution(){
  const pl=evoPl||S.pl, rows=S.log.filter(l=>!l.pl||pl==="all"||l.pl===pl), series={};
  rows.forEach((l,x)=>{const k=l.pl?l.skill+"@"+l.pl:l.skill; (series[k]=series[k]||{k,skill:l.skill,pl:l.pl,pts:[]}).pts.push({x:x+1,y:l.after,ok:l.ok,b:l.before})});
  const list=Object.values(series), N=Math.max(rows.length,2), W=640,H=250,pl_=38,pr=12,pt=12,pb=30;
  const X=x=>pl_+(x-0)*(W-pl_-pr)/N, Y=y=>pt+(1-y)*(H-pt-pb);
  if(!list.find(z=>z.k===evoSel))evoSel=list.length?list[list.length-1].k:null;
  const label=z=>skT(z.skill).name+(z.pl&&pl==="all"?" ("+PLS[z.pl]+")":"");
  const tabs=h("div",{class:"tabs",role:"group","aria-label":t("codeLang")},["all"].concat(Object.keys(PLS)).map(p=>h("button",{"aria-pressed":String(pl===p),onclick:()=>{evoPl=p;render()}},p==="all"?t("evoAll"):PLS[p])));
  if(!list.length)return h("section",{class:"panel",style:"margin-top:20px"},h("h3",null,"📈 "+t("evoH")),tabs,h("p",{class:"empty"},t("evoEmpty")));
  const svg=sv("svg",{viewBox:`0 0 ${W} ${H}`,role:"img","aria-label":t("evoH")});
  [0,.5,1].forEach(v=>{svg.append(sv("line",{x1:pl_,x2:W-pr,y1:Y(v),y2:Y(v),stroke:"var(--line)","stroke-width":"1"}),sv("text",{x:pl_-6,y:Y(v)+4,"text-anchor":"end","font-size":"11",fill:"var(--muted)"},Math.round(v*100)+"%"))});
  [[UNLOCK,"var(--gold)"],[MASTER,"var(--ok)"]].forEach(([v,c])=>{svg.append(sv("line",{x1:pl_,x2:W-pr,y1:Y(v),y2:Y(v),stroke:c,"stroke-width":"1.5","stroke-dasharray":"5 5"}),sv("text",{x:W-pr,y:Y(v)-4,"text-anchor":"end","font-size":"11",fill:c},Math.round(v*100)+"%"))});
  svg.append(sv("text",{x:(W+pl_)/2,y:H-6,"text-anchor":"middle","font-size":"11",fill:"var(--muted)"},t("evoX")+" (1 - "+rows.length+")"));
  const path=z=>"M"+X(z.pts[0].x-1)+" "+Y(z.pts[0].b)+z.pts.map(p=>" L"+X(p.x)+" "+Y(p.y)).join("");
  list.filter(z=>z.k!==evoSel).forEach(z=>svg.append(sv("path",{d:path(z),fill:"none",stroke:"var(--muted)","stroke-width":"1.5",opacity:".35"})));
  const sel=series[evoSel], col=SK[sel.skill].area==="se"?"var(--se)":"var(--prog)";
  svg.append(sv("path",{d:path(sel),fill:"none",stroke:col,"stroke-width":"3.5","stroke-linejoin":"round"}));
  sel.pts.forEach(p=>svg.append(sv("circle",{cx:X(p.x),cy:Y(p.y),r:"5",fill:p.ok?"var(--ok)":"var(--gold)",stroke:"var(--surface)","stroke-width":"2"})));
  return h("section",{class:"panel",style:"margin-top:20px"},h("h3",null,"📈 "+t("evoH")),h("p",{class:"note"},t("evoP")),tabs,
    h("div",{class:"mapwrap"},svg),
    h("div",{class:"tabs",style:"margin-top:10px"},list.map(z=>h("button",{"aria-pressed":String(z.k===evoSel),onclick:()=>{evoSel=z.k;render()}},label(z)))),
    h("div",{class:"tblwrap",style:"margin-top:12px"},h("table",null,h("thead",null,h("tr",null,h("th",null,t("colSkill")),h("th",null,t("colFirst")),h("th",null,t("colNow")),h("th",null,t("colGain")),h("th",null,t("colTries")))),
      h("tbody",null,list.map(z=>{const a=z.pts[0].b,b=z.pts[z.pts.length-1].y,g=Math.round((b-a)*100);return h("tr",null,h("td",null,label(z)),h("td",null,pct(a)),h("td",null,h("b",null,pct(b))),h("td",null,(g>=0?"+":"")+g+" pp"),h("td",null,String(z.pts.length)))})))));
}
function plPanel(){
  const pls=Object.keys(PLS), acc=p=>{const ls=S.log.filter(l=>l.pl===p);return ls.length?frac(ls.filter(l=>l.ok).length,ls.length):t("noData")};
  return h("section",{class:"panel"},h("h3",null,"💻 "+t("plH")),h("p",{class:"note"},t("plP")),
    h("div",{class:"tblwrap"},h("table",null,h("thead",null,h("tr",null,h("th",null,t("colSkill")),pls.map(p=>h("th",null,PLS[p]+(p===S.pl?" ●":""))))),
      h("tbody",null,SKILLS.filter(s=>s.area==="prog").map(s=>h("tr",null,h("td",null,skT(s.id).name),pls.map(p=>{const x=practiced(s.id,p);return h("td",null,x&&x.n?h("b",null,pct(x.L)):x?pct(x.L):"-")}))),
        h("tr",null,h("td",null,h("b",null,t("plAcc"))),pls.map(p=>h("td",null,acc(p))))))),
    h("div",{class:"analogy",style:"background:var(--sunken)"},h("b",null,t("analogy")),t("plA")));
}
function langPanel(){
  const used=[...new Set(S.log.map(l=>l.lang))];
  return h("section",{class:"panel"},h("h3",null,"🌍 "+t("studyH")),h("p",{class:"note"},t("studyP")),
    used.length>0&&h("p",null,h("b",null,t("langH")+": "),used.map(l=>{const ls=S.log.filter(x=>x.lang===l);return (LANG[l]?LANG[l].name:l)+" "+frac(ls.filter(x=>x.ok).length,ls.length)}).join("; ")),
    h("div",{class:"tblwrap"},h("table",null,h("thead",null,h("tr",null,h("th",null,t("colLang")),h("th",null,t("colScript")),h("th",null,"FLORES-200"),h("th",null,t("colTok")),h("th",null,t("colStatus")))),
      h("tbody",null,STUDY_LANGS.map(x=>h("tr",null,h("td",{"data-raw":1},x.native+(x.native===x.label?"":" ("+x.label+")")),h("td",null,x.script),h("td",{class:"note"},x.flores),h("td",null,String(x.tok)),h("td",null,LANG[x.code]?"✅ "+t("available"):"⏳ "+t("pending"))))))));
}
function exportData(){return JSON.stringify({app:"DevWise",version:3,skills:S.skills,log:S.log},null,1)}
function report(){
  const n=S.log.length, c=S.log.filter(l=>l.ok).length, w=weakest();
  const bloom=t("bloom").map((name,i)=>{const ls=S.log.filter(l=>l.bloom===i+1);return {name,n:ls.length,c:ls.filter(l=>l.ok).length}});
  const recs=[];
  if(!n)recs.push(t("recNone")); else{
    if(w)recs.push(t("recPriority",{s:skT(w.id).name,p:pct(trk(w.id).L),c:trk(w.id).c,n:trk(w.id).n}));
    const wb=bloom.filter(b=>b.n>=2).sort((a,b)=>a.c/a.n-b.c/b.n)[0]; if(wb&&wb.c/wb.n<.7)recs.push(t("recBloom",{b:wb.name,c:wb.c,n:wb.n}));
    const hints=S.log.filter(l=>l.hint).length; if(hints/n>.4)recs.push(t("recHints",{p:pct(hints/n)}));
    const bl=SKILLS.filter(s=>!unlocked(s.id)); if(bl.length)recs.push(t("recLocked",{s:bl.map(s=>skT(s.id).name).join(", ")}));
  }
  const status=s=>mastered(s.id)?t("stM"):!unlocked(s.id)?t("stL"):!S.brief[s.id]?t("stB"):t("stP");
  return h("main",null,h("h2",{style:"font-size:1.9rem;font-weight:800"},t("repH")),h("p",{class:"note"},t("repSub")),
    h("div",{class:"kpis"},h("div",null,h("b",null,String(n)),t("k1")),h("div",null,h("b",null,n?pct(c/n):"0%"),t("k2")),
      h("div",null,h("b",null,frac(SKILLS.filter(s=>mastered(s.id)).length,SKILLS.length)),t("k3")),h("div",null,h("b",null,String(S.best)),t("k4")),h("div",null,h("b",null,String(S.xpTotal)),t("kTotal")),h("div",null,h("b",null,frac(Object.keys(S.bosses).length,BOSSES.length)),t("kBosses"))),
    evolution(),
    h("div",{class:"grid2"},
      plPanel(),
      h("section",{class:"panel"},h("h3",null,t("bySkill")),h("div",{class:"tblwrap"},h("table",null,
        h("thead",null,h("tr",null,h("th",null,t("colSkill")),h("th",null,t("colMastery")),h("th",null,""),h("th",null,t("colHits")),h("th",null,t("colStatus")),h("th",null,t("colSbc")))),
        h("tbody",null,SKILLS.map(s=>{const st=trk(s.id);return h("tr",null,h("td",null,skT(s.id).name),h("td",null,h("div",{class:"bar"+(s.area==="se"?" se":"")},h("i",{style:"width:"+pct(st.L)}))),
          h("td",null,pct(st.L)),h("td",null,frac(st.c,st.n)),h("td",null,status(s)),h("td",{class:"note"},s.sbc.map(x=>x.replace("-"," ")).join(", ")))}))))),
      h("section",{class:"panel"},h("h3",null,t("recs")),h("ul",{style:"margin:0;padding-left:20px"},recs.map(r=>h("li",{style:"margin-bottom:8px"},r))),
        h("h3",{style:"margin-top:20px"},t("bloomAcc")),h("div",{class:"tblwrap"},h("table",null,h("tbody",null,bloom.map(b=>h("tr",null,h("td",null,b.name),
          h("td",null,h("div",{class:"bar"},h("i",{style:"width:"+(b.n?pct(b.c/b.n):"0%")}))),h("td",null,b.n?frac(b.c,b.n):t("noData")))))))),
      h("section",{class:"panel"},h("h3",null,"🏆 "+t("trophies")),Object.keys(S.bosses).length?h("ul",{style:"margin:0;padding-left:20px"},Object.keys(S.bosses).map(k=>h("li",null,h("b",null,gt().bosses[k].trophy),"  ("+gt().bosses[k].name+")"))):h("p",{class:"empty"},t("noTrophies"))),
      h("section",{class:"panel"},h("h3",null,t("how")),h("p",null,t("howP")),h("div",{class:"analogy",style:"background:var(--sunken)"},h("b",null,t("analogy")),t("howA")),h("p",{class:"note"},t("howParams"))),
      langPanel(),
      h("section",{class:"panel"},h("h3",null,t("data")),h("p",{class:"note"},t("dataP")),
        h("div",{class:"row"},
          h("button",{class:"btn ghost small",onclick:()=>{showJson=!showJson;render()}},showJson?t("hideJson"):t("showJson")),
          h("button",{class:"btn ghost small",onclick:()=>{try{const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([exportData()],{type:"application/json"}));a.download="devwise-log.json";a.click()}catch(e){} showJson=true;render()}},t("download")),
          h("button",{class:"btn ghost small",onclick:()=>{ if(!resetArmed){resetArmed=true;render();return;} const keep={lang:S.lang,pl:S.pl,ai:S.ai,mode:S.mode}; S=Object.assign(fresh(),keep);save();selSkill=null;cur=null;go("home") }},resetArmed?t("resetConfirm"):t("reset"))),
        showJson&&h("textarea",{readonly:true,"aria-label":"JSON",style:"margin-top:12px",onfocus:e=>e.target.select()},exportData()))));
}
function settings(){
  const a=S.ai, f={}; const inp=(k,type,ph)=>f[k]=h("input",{type,value:a[k]||"",placeholder:ph,autocomplete:"off"});
  f.provider=h("select",{onchange:e=>{a.provider=e.target.value;render()}},h("option",{value:"anthropic",selected:a.provider==="anthropic"},t("provAnthropic")),h("option",{value:"openai",selected:a.provider==="openai"},t("provOpenAI")));
  const status=AI.sample?t("aiClaude"):AI.ready()?t("aiKeyOn",{m:a.model||(a.provider==="anthropic"?"claude-haiku-4-5":"gpt-4o-mini")}):t("aiOff");
  return h("main",{class:"work"},h("h2",null,t("setH")),
    h("div",{class:"form"},
      h("label",null,t("uiLang"),h("select",{onchange:e=>setLang(e.target.value)},Object.keys(LANG).map(l=>h("option",{value:l,selected:S.lang===l,"data-raw":1},langName(l))))),
      ROMANIZER.available(S.lang)&&h("label",{class:"chk"},h("input",{type:"checkbox",checked:!!S.rom,onchange:e=>{S.rom=e.target.checked;save();render()}}),t("rom")),
      h("label",null,t("codeLang"),h("select",{onchange:e=>setPl(e.target.value)},Object.keys(PLS).map(p=>h("option",{value:p,selected:S.pl===p},PLS[p]))))),
    h("h2",{style:"margin-top:34px;font-size:1.6rem"},t("aiH")),h("p",null,t("aiP")),h("p",{class:"delta"},status),
    !AI.sample&&h("div",{class:"form"},
      h("label",null,t("provider"),f.provider),
      a.provider==="openai"&&h("label",null,t("base"),inp("base","url","https://api.openai.com/v1")),
      h("label",null,t("key"),inp("key","password","sk-...")),
      h("label",null,t("model"),inp("model","text",a.provider==="anthropic"?"claude-haiku-4-5-20251001":"gpt-4o-mini")),
      h("div",{class:"row"},
        h("button",{class:"btn",onclick:()=>{["base","key","model"].forEach(k=>{if(f[k])a[k]=f[k].value.trim()});save();setMsg=t("saved");render()}},t("save")),
        h("button",{class:"btn ghost",onclick:()=>{a.key="";save();render()}},t("clear"))),
      setMsg&&h("p",{class:"delta",role:"status"},setMsg),
      h("p",{class:"note"},t("keyNote"))));
}
function render(){
  const app=document.getElementById("app"); app.textContent="";
  if(view==="ticket"&&!cur)view="board"; if(view==="brief"&&!briefId)view="board"; if(view!=="home"&&!S.started)view="home";
  if(view==="boss"&&!boss)view="board";
  const v={home,ticket,retro,report,settings,brief,board,shop,boss:bossView}[view]||board;
  app.append(topbar(),v());
}
S=load(); applyLang(); if(!Object.keys(S.sprint.start).length)S.sprint.start=snapshot(); view=S.started?"board":"home"; render();
/* Dentro do claude.ai, o tutor IA usa a capacidade "sample"; fora dele (GitHub Pages), usa a chave informada em Ajustes. */
if(window.claude&&typeof window.claude.use==="function"){window.claude.use("sample").then(fn=>{if(fn){AI.sample=fn;if(view==="settings")render()}}).catch(()=>{})}
