/* DevWise - motor do jogo */
const SK = Object.fromEntries(SKILLS.map(s=>[s.id,s]));
const IT = Object.fromEntries(ITEMS.map(i=>[i.id,i]));
const KEY="devwise-v2", L0=0.15, T=0.2, SLIP=0.1, MASTER=0.95, UNLOCK=0.6, SPRINT=5;
let S, view="home", cur=null, selSkill=null, briefId=null, resetArmed=false, showJson=false, setMsg="";

/* ---------- Estado ---------- */
function snapshot(sk){const o={};for(const k in sk)o[k]=sk[k].L;return o}
function guessLang(){const n=(navigator.language||"pt").slice(0,2).toLowerCase();return LANG[n]?n:"pt"}
function fresh(){
  const skills={}; SKILLS.forEach(s=>skills[s.id]={L:L0,n:0,c:0});
  return {v:2,started:false,lang:guessLang(),pl:"py",skills,brief:{},seen:{},log:[],xp:0,streak:0,best:0,board:[],
    sprint:{n:1,done:[],start:snapshot(skills)},ai:{provider:"anthropic",key:"",model:"",base:""}};
}
function load(){
  try{const d=JSON.parse(localStorage.getItem(KEY)||"null");
    if(d&&d.v===2&&d.skills){const f=fresh();SKILLS.forEach(s=>{if(!d.skills[s.id])d.skills[s.id]=f.skills[s.id]});
      if(!LANG[d.lang])d.lang="pt"; if(!PLS[d.pl])d.pl="py"; d.ai=d.ai||f.ai; d.brief=d.brief||{}; return d;}}catch(e){}
  return fresh();
}
function save(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}}

/* ---------- i18n ---------- */
const Lg=()=>LANG[S.lang]||LANG.pt;
function t(k,vars){let s=Lg().ui[k]; if(s==null)s=LANG.pt.ui[k]; if(s==null)return k;
  if(vars&&typeof s==="string")for(const v in vars)s=s.split("{"+v+"}").join(vars[v]); return s;}
const skT=id=>Lg().skills[id]||LANG.pt.skills[id];
const itT=id=>Lg().items[id]||LANG.pt.items[id];
function itemCode(it){return it.shared||(it.code?it.code[S.pl]||it.code.py:null)}
function itemOpts(it){return (it.opts||itT(it.id).opts).map(o=>o==="@err"?t("err"):o==="@none"?t("none"):o)}

/* ---------- Motor adaptativo (BKT) ---------- */
const mastered=id=>S.skills[id].L>=MASTER;
const unlocked=id=>SK[id].pre.every(p=>S.skills[p].L>=UNLOCK);
const allMastered=()=>SKILLS.every(s=>mastered(s.id));
const avgL=()=>SKILLS.reduce((a,s)=>a+S.skills[s.id].L,0)/SKILLS.length;
function career(){const r=t("roles"); if(allMastered())return r[4]; const a=avgL(); return a>=.8?r[3]:a>=.55?r[2]:a>=.3?r[1]:r[0]}
function shuffle(a){a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
function pickItem(skillId,avoid){
  const L=S.skills[skillId].L, target=L<.4?1:L<.7?2:3;
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
  if(!eligible.length&&allMastered())eligible=SKILLS.map(s=>s.id);
  S.board=S.board.filter(id=>IT[id]&&id!==lastId&&eligible.includes(IT[id].skill));
  const used=S.board.map(id=>IT[id].skill);
  const order=eligible.filter(k=>!used.includes(k)).sort((a,b)=>(S.skills[a].L+Math.random()*.3)-(S.skills[b].L+Math.random()*.3));
  for(const k of order){ if(S.board.length>=3)break; const it=pickItem(k,lastId?[lastId]:[]); if(it)S.board.push(it.id); }
  if(!S.board.length&&eligible.length){const it=pickItem(eligible[0],[]); if(it)S.board.push(it.id);}
}
function guessProb(it){return it.type==="mc"?1/itemOpts(it).length:it.type==="bug"?1/itemCode(it).split("\n").length:0.05}
function bkt(L,ok,g){const post=ok? L*(1-SLIP)/(L*(1-SLIP)+(1-L)*g) : L*SLIP/(L*SLIP+(1-L)*(1-g)); return Math.min(.995,post+(1-post)*T)}
function resolve(ok){
  const it=cur.item, sk=S.skills[it.skill], before=sk.L, roleBefore=career();
  const openBefore=SKILLS.filter(s=>unlocked(s.id)).map(s=>s.id);
  const g=cur.hint?Math.max(.5,guessProb(it)):guessProb(it);
  sk.L=bkt(before,ok,g); sk.n++; if(ok)sk.c++;
  S.streak=ok?S.streak+1:0; S.best=Math.max(S.best,S.streak);
  let xp=ok?it.d*10:2; if(ok&&cur.hint)xp=Math.ceil(xp/2); if(ok&&S.streak>=3)xp+=5; S.xp+=xp;
  S.seen[it.id]={n:(S.seen[it.id]?S.seen[it.id].n:0)+1,ok};
  S.log.push({item:it.id,skill:it.skill,bloom:it.bloom,d:it.d,ok,hint:cur.hint,ai:!!cur.aiUsed,lang:S.lang,pl:it.code?S.pl:null,before:+before.toFixed(3),after:+sk.L.toFixed(3),t:Date.now()});
  S.sprint.done.push({item:it.id,ok});
  const newly=SKILLS.filter(s=>unlocked(s.id)&&!openBefore.includes(s.id)).map(s=>skT(s.id).name);
  cur.done=true; cur.result={ok,before,after:sk.L,xp,newly,promo:career()!==roleBefore?career():null,masteredNow:before<MASTER&&sk.L>=MASTER};
  fillBoard(it.id); save();
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
    (it.type==="mc"?"Options: "+itemOpts(it).join(" | ")+"\n":"")+
    "Student's estimated mastery of this skill: "+Math.round(S.skills[it.skill].L*100)+"%.\n";
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
  for(const kid of kids.flat(3)){ if(kid==null||kid===false)continue; el.append(kid.nodeType?kid:document.createTextNode(kid)); }
  return el;
}
function sv(tag,attrs,...kids){
  const el=document.createElementNS("http://www.w3.org/2000/svg",tag);
  for(const k in attrs||{}){ if(attrs[k]==null)continue; if(k.startsWith("on"))el.addEventListener(k.slice(2),attrs[k]); else el.setAttribute(k,attrs[k]); }
  for(const kid of kids.flat()){ if(kid==null)continue; el.append(kid.nodeType?kid:document.createTextNode(kid)); }
  return el;
}
const pct=x=>Math.round(x*100)+"%";
function go(v){view=v; resetArmed=false; setMsg=""; render(); window.scrollTo(0,0)}
function setLang(l){S.lang=l; save(); document.documentElement.lang=l; render()}
function langBar(){return h("div",{class:"langbar",role:"group","aria-label":t("uiLang")},Object.keys(LANG).map(l=>h("button",{"aria-pressed":String(S.lang===l),title:LANG[l].name,onclick:()=>setLang(l)},l.toUpperCase())))}
function plTabs(){return h("div",{class:"tabs",role:"group","aria-label":t("codeLang")},Object.keys(PLS).map(p=>h("button",{"aria-pressed":String(S.pl===p),onclick:()=>{S.pl=p;save();render()}},PLS[p])))}

/* ---------- Telas ---------- */
function topbar(){
  const onBoard=["board","ticket","retro","brief"].includes(view);
  return h("header",{class:"top"},
    h("button",{class:"brand",onclick:()=>go(S.started?"board":"home")},"DevWise"),
    S.started&&h("div",{class:"stats"},h("span",null,t("role")+" ",h("b",null,career())),h("span",null,t("xp")+" ",h("b",null,String(S.xp))),h("span",null,t("streak")+" ",h("b",null,String(S.streak)))),
    h("nav",{class:"nav"},
      S.started&&h("button",{"aria-current":onBoard?"page":null,onclick:()=>go("board")},t("navBoard")),
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
function ticketCard(it){
  const se=SK[it.skill].area==="se";
  return h("button",{class:"ticket"+(se?" se":""),onclick:()=>openTicket(it.id)},
    h("span",{class:"id"},"DW-"+it.id.toUpperCase()+"  "+skT(it.skill).client),
    h("span",{class:"tt"},itT(it.id).title),
    h("span",{class:"meta"},h("span",{class:"tag"+(se?" se":"")},skT(it.skill).name),h("span",{class:"tag plain"},t("types")[it.type]),h("span",{class:"tag plain"},t("bloom")[it.bloom-1]),
      h("span",{class:"pts",role:"img","aria-label":t("diff",{d:it.d})},"●".repeat(it.d)+"○".repeat(3-it.d))));
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
  const svg=sv("svg",{viewBox:"0 0 610 310",role:"group","aria-label":t("map")},
    sv("defs",null,sv("marker",{id:"arr",viewBox:"0 0 10 10",refX:"9",refY:"5",markerWidth:"7",markerHeight:"7",orient:"auto-start-reverse"},sv("path",{d:"M0 0L10 5L0 10z",fill:"var(--muted)"}))),
    sv("text",{x:"30",y:"18","font-size":"13.5",fill:"var(--muted)","font-family":"var(--body)"},t("areaProg")+" ("+PLS[S.pl]+")"),
    sv("text",{x:"30",y:"208","font-size":"13.5",fill:"var(--muted)","font-family":"var(--body)"},t("areaSE")));
  SKILLS.forEach(s=>s.pre.forEach(p=>{
    const a=SK[p],dx=s.x-a.x,dy=s.y-a.y,len=Math.hypot(dx,dy),ux=dx/len,uy=dy/len,open=S.skills[p].L>=UNLOCK;
    svg.append(sv("line",{x1:a.x+ux*(R+4),y1:a.y+uy*(R+4),x2:s.x-ux*(R+7),y2:s.y-uy*(R+7),stroke:"var(--muted)","stroke-width":open?"2":"1.5","stroke-dasharray":open?null:"4 5",opacity:open?".9":".55","marker-end":"url(#arr)"}));
  }));
  SKILLS.forEach(s=>{
    const L=S.skills[s.id].L, un=unlocked(s.id), m=mastered(s.id), col=m?"var(--ok)":s.area==="se"?"var(--se)":"var(--prog)", nm=skT(s.id).name;
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
  const s=SK[selSkill],x=skT(selSkill),st=S.skills[selSkill],un=unlocked(selSkill);
  return h("div",{class:"skillinfo","aria-live":"polite"},h("h4",null,x.name),h("p",null,x.about),
    h("p",{class:"note"},un?(mastered(selSkill)?t("masteredTxt"):t("estTxt",{p:pct(st.L)}))+t("hits",{c:st.c,n:st.n}):t("locked",{p:s.pre.map(p=>skT(p).name).join(t("and"))})),
    un&&h("button",{class:"btn ghost small",onclick:()=>{briefId=selSkill;go("brief")}},t("reread")));
}
function board(){
  if(S.sprint.done.length>=SPRINT)return retro();
  fillBoard(); save();
  const miss=pendingMissions(), free=allMastered();
  return h("main",null,
    h("div",{class:"sprintbar"},h("h2",null,t("sprint",{n:S.sprint.n})),pips(),h("span",{class:"note"},free?t("freePlay"):t("ticketOf",{n:S.sprint.done.length+1,m:SPRINT}))),
    h("div",{class:"board"},
      h("section",{class:"col"},
        miss.length>0&&[h("h3",null,t("missions")),h("div",{class:"tickets"},miss.map(missionCard))],
        h("h3",{class:miss.length?"gap":null},t("todo")),
        S.board.length?h("div",{class:"tickets"},S.board.map(id=>ticketCard(IT[id]))):h("p",{class:"empty"},t("todoEmpty")),
        h("div",{class:"done"},h("h3",null,t("doneSprint")),
          S.sprint.done.length?h("div",{class:"chips"},S.sprint.done.map(d=>h("span",{class:"chip"+(d.ok?"":" bad")},"DW-"+d.item.toUpperCase()+" "+(d.ok?t("resolved"):t("toReview"))))):h("p",{class:"empty"},t("nothingDone")))),
      h("section",{class:"col"},h("h3",null,t("map")),h("div",{class:"panel"},skillMap(),skillInfo()))));
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
function openTicket(id){
  const it=IT[id];
  cur={item:it,sel:null,hint:false,done:false,result:null,aiText:null,aiAfter:null,aiUsed:false};
  if(it.type==="mc")cur.order=shuffle(itemOpts(it).map((_,i)=>i));
  if(it.type!=="mc"){cur.lines=itemCode(it).split("\n");}
  if(it.type==="parsons"){let b;do{b=shuffle(cur.lines.map((_,i)=>i))}while(b.every((v,i)=>v===i));cur.bank=b;cur.sol=[]}
  go("ticket");
}
function ticket(){
  const it=cur.item, tx=itT(it.id), se=SK[it.skill].area==="se", r=cur.result, body=[], opts=it.type==="mc"?itemOpts(it):null;
  if(it.type==="mc"){
    if(itemCode(it))body.push(h("pre",{class:"code"},itemCode(it)));
    body.push(h("div",{class:"opts",role:"group","aria-label":t("options")},cur.order.map(i=>{
      let cls="opt"+(it.mono?" mono":""); if(cur.done){ if(i===0)cls+=" right"; else if(i===cur.sel)cls+=" wrong"; }
      return h("button",{class:cls,"aria-pressed":String(cur.sel===i),disabled:cur.done,onclick:()=>{cur.sel=i;render()}},opts[i]);})));
  }
  if(it.type==="bug"){
    body.push(h("div",{class:"codelines",role:"group","aria-label":t("codeLines")},cur.lines.map((ln,i)=>{
      let cls="cl"; if(cur.done){ if(i===it.answer)cls+=" right"; else if(i===cur.sel)cls+=" wrong"; }
      return h("button",{class:cls,"aria-pressed":String(cur.sel===i),disabled:cur.done,onclick:()=>{cur.sel=i;render()}},h("span",{class:"n"},String(i+1)),h("span",null,ln));})));
  }
  if(it.type==="parsons"){
    const move=(i,dir)=>{const j=i+dir;if(j<0||j>=cur.sol.length)return;[cur.sol[i],cur.sol[j]]=[cur.sol[j],cur.sol[i]];render()};
    body.push(h("div",{class:"parsons"},
      h("div",{class:"zone"},h("h4",null,t("bank")),cur.bank.length?cur.bank.map(i=>h("div",{class:"prow"},h("button",{class:"pline",disabled:cur.done,onclick:()=>{cur.bank=cur.bank.filter(x=>x!==i);cur.sol.push(i);render()}},cur.lines[i].trimStart()))):h("p",{class:"empty"},t("allUsed"))),
      h("div",{class:"zone sol"},h("h4",null,t("sol")),cur.sol.map((i,pos)=>h("div",{class:"prow"},
        h("button",{class:"pline",disabled:cur.done,onclick:()=>{cur.sol=cur.sol.filter(x=>x!==i);cur.bank.push(i);render()}},cur.lines[i]),
        !cur.done&&h("button",{class:"mv","aria-label":t("up"),onclick:()=>move(pos,-1)},"↑"),
        !cur.done&&h("button",{class:"mv","aria-label":t("down"),onclick:()=>move(pos,1)},"↓"))))));
    if(cur.done&&!r.ok)body.push(h("p",{class:"note"},t("correctOrder")),h("pre",{class:"code"},cur.lines.join("\n")));
  }
  const ready=it.type==="parsons"?cur.sol.length===cur.lines.length:cur.sel!==null;
  const check=()=>{
    const ok=it.type==="mc"?cur.sel===0:it.type==="bug"?cur.sel===it.answer:cur.sol.map(i=>cur.lines[i]).join("\n")===cur.lines.join("\n");
    resolve(ok); render(); const fb=document.getElementById("fb"); if(fb){fb.focus();fb.scrollIntoView({block:"nearest",behavior:"smooth"})}
  };
  const over=S.sprint.done.length>=SPRINT, busy=cur.aiText===t("aiThinking")||cur.aiAfter===t("aiThinking");
  return h("main",{class:"work"},
    h("div",{class:"meta"},h("span",{class:"tag plain"},"DW-"+it.id.toUpperCase()),h("span",{class:"tag"+(se?" se":"")},skT(it.skill).name),h("span",{class:"tag plain"},skT(it.skill).client),
      h("span",{class:"tag plain"},t("types")[it.type]),h("span",{class:"tag plain"},t("bloom")[it.bloom-1]),it.code&&h("span",{class:"tag plain"},PLS[S.pl])),
    h("h2",null,tx.title), h("p",{class:"prompt"},tx.prompt), body,
    cur.hint&&!cur.aiUsed&&h("div",{class:"hint"},h("b",null,t("tutorHint")),tx.hint),
    cur.aiText&&h("div",{class:"ai","aria-live":"polite"},h("b",null,t("aiLabel")),cur.aiText),
    !cur.done&&h("div",{class:"row"},
      h("button",{class:"btn",disabled:!ready,onclick:check},t("check")),
      !cur.hint&&h("button",{class:"btn ghost",onclick:()=>{cur.hint=true;render()}},t("hint")),
      !cur.aiUsed&&AI.ready()&&h("button",{class:"btn ghost",disabled:busy,onclick:aiHint},t("aiHint")),
      h("button",{class:"btn ghost",onclick:()=>go("board")},t("backBoard"))),
    !cur.done&&!cur.hint&&h("p",{class:"note",style:"margin-top:10px"},t("hintNote")),
    cur.done&&h("section",{class:"fb"+(r.ok?"":" bad"),id:"fb",tabindex:"-1","aria-live":"polite"},
      h("h3",null,r.ok?t("solved"):t("notYet")),
      h("p",null,h("b",null,t("why")),tx.why),
      h("div",{class:"analogy"},h("b",null,t("analogy")),tx.analogy),
      cur.aiAfter&&h("div",{class:"ai"},h("b",null,t("aiLabel")),cur.aiAfter),
      h("p",{class:"delta"},t("delta",{s:skT(it.skill).name,a:pct(r.before),b:pct(r.after),x:r.xp})),
      !r.ok&&r.after>r.before&&h("p",{class:"note"},t("roseNote")),
      r.masteredNow&&h("p",{class:"promo"},t("masteredNow",{s:skT(it.skill).name})),
      r.newly.length>0&&h("p",{class:"promo"},t("unlockedNow",{s:r.newly.join(", ")})),
      r.promo&&h("p",{class:"promo"},t("promo",{r:r.promo})),
      h("div",{class:"row"},h("button",{class:"btn",onclick:()=>go(over?"retro":"board")},over?t("toRetro"):t("backBoard")),
        AI.ready()&&!cur.aiAfter&&h("button",{class:"btn ghost",disabled:busy,onclick:aiExplain},t("aiExplain")))));
}
function weakest(){return SKILLS.filter(s=>unlocked(s.id)&&!mastered(s.id)).sort((a,b)=>S.skills[a.id].L-S.skills[b.id].L)[0]||null}
function retro(){
  const d=S.sprint.done, ok=d.filter(x=>x.ok).length, w=weakest();
  const moved=SKILLS.filter(s=>Math.abs(S.skills[s.id].L-(S.sprint.start[s.id]??L0))>.004);
  return h("main",{class:"work"},h("h2",null,t("retroH",{n:S.sprint.n})),
    h("p",{class:"prompt"},t("retroSum",{c:ok,n:d.length})+(ok===d.length?t("retroA"):ok>=3?t("retroB"):t("retroC"))),
    h("div",{class:"panel"},h("h3",null,t("changed")),h("div",{class:"tblwrap"},h("table",null,h("thead",null,h("tr",null,h("th",null,t("colSkill")),h("th",null,t("colStart")),h("th",null,t("colNow")))),
      h("tbody",null,moved.map(s=>h("tr",null,h("td",null,skT(s.id).name),h("td",null,pct(S.sprint.start[s.id]??L0)),h("td",null,h("b",null,pct(S.skills[s.id].L))))))))),
    h("p",{style:"margin-top:18px"},w?t("suggestion",{s:skT(w.id).name,p:pct(S.skills[w.id].L)}):t("allDone")),
    h("button",{class:"btn",onclick:()=>{S.sprint={n:S.sprint.n+1,done:[],start:snapshot(S.skills)};fillBoard();save();go("board")}},t("nextSprint",{n:S.sprint.n+1})));
}
function exportData(){return JSON.stringify({app:"DevWise",version:2,skills:S.skills,log:S.log},null,1)}
function report(){
  const n=S.log.length, c=S.log.filter(l=>l.ok).length, w=weakest();
  const bloom=t("bloom").map((name,i)=>{const ls=S.log.filter(l=>l.bloom===i+1);return {name,n:ls.length,c:ls.filter(l=>l.ok).length}});
  const recs=[];
  if(!n)recs.push(t("recNone")); else{
    if(w)recs.push(t("recPriority",{s:skT(w.id).name,p:pct(S.skills[w.id].L),c:S.skills[w.id].c,n:S.skills[w.id].n}));
    const wb=bloom.filter(b=>b.n>=2).sort((a,b)=>a.c/a.n-b.c/b.n)[0]; if(wb&&wb.c/wb.n<.7)recs.push(t("recBloom",{b:wb.name,c:wb.c,n:wb.n}));
    const hints=S.log.filter(l=>l.hint).length; if(hints/n>.4)recs.push(t("recHints",{p:pct(hints/n)}));
    const bl=SKILLS.filter(s=>!unlocked(s.id)); if(bl.length)recs.push(t("recLocked",{s:bl.map(s=>skT(s.id).name).join(", ")}));
  }
  const status=s=>mastered(s.id)?t("stM"):!unlocked(s.id)?t("stL"):!S.brief[s.id]?t("stB"):t("stP");
  return h("main",null,h("h2",{style:"font-size:1.9rem;font-weight:800"},t("repH")),h("p",{class:"note"},t("repSub")),
    h("div",{class:"kpis"},h("div",null,h("b",null,String(n)),t("k1")),h("div",null,h("b",null,n?pct(c/n):"0%"),t("k2")),
      h("div",null,h("b",null,t("of",{a:SKILLS.filter(s=>mastered(s.id)).length,b:SKILLS.length})),t("k3")),h("div",null,h("b",null,String(S.best)),t("k4"))),
    h("div",{class:"grid2"},
      h("section",{class:"panel"},h("h3",null,t("bySkill")),h("div",{class:"tblwrap"},h("table",null,
        h("thead",null,h("tr",null,h("th",null,t("colSkill")),h("th",null,t("colMastery")),h("th",null,""),h("th",null,t("colHits")),h("th",null,t("colStatus")),h("th",null,t("colSbc")))),
        h("tbody",null,SKILLS.map(s=>{const st=S.skills[s.id];return h("tr",null,h("td",null,skT(s.id).name),h("td",null,h("div",{class:"bar"+(s.area==="se"?" se":"")},h("i",{style:"width:"+pct(st.L)}))),
          h("td",null,pct(st.L)),h("td",null,t("of",{a:st.c,b:st.n})),h("td",null,status(s)),h("td",{class:"note"},s.sbc.map(x=>x.replace("-"," ")).join(", ")))}))))),
      h("section",{class:"panel"},h("h3",null,t("recs")),h("ul",{style:"margin:0;padding-left:20px"},recs.map(r=>h("li",{style:"margin-bottom:8px"},r))),
        h("h3",{style:"margin-top:20px"},t("bloomAcc")),h("div",{class:"tblwrap"},h("table",null,h("tbody",null,bloom.map(b=>h("tr",null,h("td",null,b.name),
          h("td",null,h("div",{class:"bar"},h("i",{style:"width:"+(b.n?pct(b.c/b.n):"0%")}))),h("td",null,b.n?t("of",{a:b.c,b:b.n}):t("noData")))))))),
      h("section",{class:"panel"},h("h3",null,t("how")),h("p",null,t("howP")),h("div",{class:"analogy",style:"background:var(--sunken)"},h("b",null,t("analogy")),t("howA")),h("p",{class:"note"},t("howParams"))),
      h("section",{class:"panel"},h("h3",null,t("data")),h("p",{class:"note"},t("dataP")),
        h("div",{class:"row"},
          h("button",{class:"btn ghost small",onclick:()=>{showJson=!showJson;render()}},showJson?t("hideJson"):t("showJson")),
          h("button",{class:"btn ghost small",onclick:()=>{try{const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([exportData()],{type:"application/json"}));a.download="devwise-log.json";a.click()}catch(e){} showJson=true;render()}},t("download")),
          h("button",{class:"btn ghost small",onclick:()=>{ if(!resetArmed){resetArmed=true;render();return;} const keep={lang:S.lang,pl:S.pl,ai:S.ai}; S=Object.assign(fresh(),keep);save();selSkill=null;cur=null;go("home") }},resetArmed?t("resetConfirm"):t("reset"))),
        showJson&&h("textarea",{readonly:true,"aria-label":"JSON",style:"margin-top:12px",onfocus:e=>e.target.select()},exportData()))));
}
function settings(){
  const a=S.ai, f={}; const inp=(k,type,ph)=>f[k]=h("input",{type,value:a[k]||"",placeholder:ph,autocomplete:"off"});
  f.provider=h("select",{onchange:e=>{a.provider=e.target.value;render()}},h("option",{value:"anthropic",selected:a.provider==="anthropic"},t("provAnthropic")),h("option",{value:"openai",selected:a.provider==="openai"},t("provOpenAI")));
  const status=AI.sample?t("aiClaude"):AI.ready()?t("aiKeyOn",{m:a.model||(a.provider==="anthropic"?"claude-haiku-4-5":"gpt-4o-mini")}):t("aiOff");
  return h("main",{class:"work"},h("h2",null,t("setH")),
    h("div",{class:"form"},
      h("label",null,t("uiLang"),h("select",{onchange:e=>setLang(e.target.value)},Object.keys(LANG).map(l=>h("option",{value:l,selected:S.lang===l},LANG[l].name)))),
      h("label",null,t("codeLang"),h("select",{onchange:e=>{S.pl=e.target.value;save();render()}},Object.keys(PLS).map(p=>h("option",{value:p,selected:S.pl===p},PLS[p]))))),
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
  const v={home,ticket,retro,report,settings,brief,board}[view]||board;
  app.append(topbar(),v());
}
S=load(); document.documentElement.lang=S.lang; view=S.started?"board":"home"; render();
/* Dentro do claude.ai, o tutor IA usa a capacidade "sample"; fora dele (GitHub Pages), usa a chave informada em Ajustes. */
if(window.claude&&typeof window.claude.use==="function"){window.claude.use("sample").then(fn=>{if(fn){AI.sample=fn;if(view==="settings"||view==="board")render()}}).catch(()=>{})}
