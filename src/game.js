/* DevWise - camada de jogo: economia de XP, dificuldade, loja, desafios e chefões */

/* Modos de dificuldade. mult: multiplicador de XP; pen: XP perdido por erro (x dificuldade do item);
   hint: "free" | "paid" | "none"; typed: resposta digitada quando o item permite; timer: segundos (0 = sem relógio). */
const MODES = {
  normal:  {mult:1,   pen:2,  hint:"free", typed:false, timer:0},
  medio:   {mult:1.5, pen:4,  hint:"paid", typed:false, timer:0},
  dificil: {mult:2,   pen:6,  hint:"none", typed:true,  timer:0},
  hardcore:{mult:3,   pen:10, hint:"none", typed:true,  timer:60}
};
const HINT_COST = 5;
const MODE_ICON = {normal:"🌱", medio:"⚙️", dificil:"🔥", hardcore:"💀"};
const COMEBACK = 5; // bônus por acertar logo depois de um erro

/* XP acumulado exigido para abrir cada fase (além dos pré-requisitos de domínio). */
const GATES = {var:0, req:0, git:30, cond:60, agil:100, loop:150, func:240, test:320, col:380, rec:450, design:520};

/* Loja. kind: "power" (consumível) | "title" (cosmético, compra única). */
const SHOP = [
  {id:"shield", icon:"🛡️", kind:"power", cost:30},
  {id:"fifty", icon:"✂️",  kind:"power", cost:25},
  {id:"time", icon:"⏳",   kind:"power", cost:15},
  {id:"boost", icon:"⚡",  kind:"power", cost:40},
  {id:"tBug", icon:"🐛",   kind:"title", cost:80},
  {id:"tArch", icon:"🏛️",  kind:"title", cost:150},
  {id:"tLegend", icon:"🚀",kind:"title", cost:300}
];

/* Desafios extras de cada sprint. */
const BOUNTIES = [{id:"b1", xp:20}, {id:"b2", xp:25}, {id:"b3", xp:40}];

/* Chefões: 3 fases, 1 erro permitido, sem dicas. need: habilidades com 60% de domínio; gate: XP acumulado. */
const BOSSES = [
  {id:"bossA", icon:"🕵️", need:["var","cond","loop"], gate:200, reward:100, fail:20, stages:["xa1","xa2","xa3"]},
  {id:"bossB", icon:"📦", need:["func","col","rec"], gate:500, reward:150, fail:25, stages:["xb1","xb2","xb3"]},
  {id:"bossC", icon:"🚨", need:["req","agil","git","test","design"], gate:700, reward:200, fail:30, stages:["xc1","xc2","xc3"]}
];

const BOSS_ITEMS = [
{id:"xa1",skill:"loop",type:"mc",d:3,bloom:4,mono:true,boss:"bossA",opts:["115","125","120","110"],code:four(
`sales = [12, 55, 50, 8]
total = 0
for s in sales:
    if s >= 50:
        s = s - s // 10
    total += s
print(total)`,
`const sales = [12, 55, 50, 8];
let total = 0;
for (let s of sales) {
  if (s >= 50) s = s - Math.floor(s / 10);
  total += s;
}
console.log(total);`,
`int[] sales = {12, 55, 50, 8};
int total = 0;
for (int s : sales) {
  if (s >= 50) s = s - s / 10;
  total += s;
}
System.out.println(total);`,
`int sales[] = {12, 55, 50, 8};
int total = 0;
for (int i = 0; i < 4; i++) {
  int s = sales[i];
  if (s >= 50) s = s - s / 10;
  total += s;
}
printf("%d", total);`)},
{id:"xa2",skill:"loop",type:"bug",d:3,bloom:4,boss:"bossA",answer:3,code:four(
`sales = [12, 55, 50, 8]
count = 0
for s in sales:
    count = 0
    if s >= 50:
        count += 1
print(count)`,
`const sales = [12, 55, 50, 8];
let count = 0;
for (const s of sales) {
  count = 0;
  if (s >= 50) count += 1;
}
console.log(count);`,
`int[] sales = {12, 55, 50, 8};
int count = 0;
for (int s : sales) {
  count = 0;
  if (s >= 50) count += 1;
}
System.out.println(count);`,
`int sales[] = {12, 55, 50, 8};
int count = 0;
for (int i = 0; i < 4; i++) {
  count = 0;
  if (sales[i] >= 50) count += 1;
}
printf("%d", count);`)},
{id:"xa3",skill:"cond",type:"parsons",d:3,bloom:3,boss:"bossA",code:four(
`price = 64
paid = price + 36
if paid < price:
    print("insufficient")
else:
    change = paid - price
    print(change // 10, change % 10)`,
`const price = 64;
const paid = price + 36;
if (paid < price) {
  console.log("insufficient");
} else {
  const change = paid - price;
  console.log(Math.floor(change / 10), change % 10);
}`,
`int price = 64;
int paid = price + 36;
if (paid < price) {
  System.out.println("insufficient");
} else {
  int change = paid - price;
  System.out.println(change / 10 + " " + change % 10);
}`,
`int price = 64;
int paid = price + 36;
if (paid < price) {
  printf("insufficient");
} else {
  int change = paid - price;
  printf("%d %d", change / 10, change % 10);
}`)},
{id:"xb1",skill:"rec",type:"mc",d:3,bloom:4,mono:true,boss:"bossB",opts:["16","20","9","@err"],code:four(
`def total(v, i):
    if i == len(v): return 0
    return v[i] + total(v, i + 1)
print(total([4, 7, 9], 1))`,
`function total(v, i) {
  if (i === v.length) return 0;
  return v[i] + total(v, i + 1);
}
console.log(total([4, 7, 9], 1));`,
`static int total(int[] v, int i) {
  if (i == v.length) return 0;
  return v[i] + total(v, i + 1);
}
System.out.println(total(new int[]{4, 7, 9}, 1));`,
`int total(int v[], int n, int i) {
  if (i == n) return 0;
  return v[i] + total(v, n, i + 1);
}
printf("%d", total((int[]){4, 7, 9}, 3, 1));`)},
{id:"xb2",skill:"rec",type:"bug",d:3,bloom:4,boss:"bossB",answer:1,code:four(
`def count(v, i):
    if i > len(v): return 0
    return 1 + count(v, i + 1)
print(count([5, 2, 8], 0))`,
`function count(v, i) {
  if (i > v.length) return 0;
  return 1 + count(v, i + 1);
}
console.log(count([5, 2, 8], 0));`,
`static int count(int[] v, int i) {
  if (i > v.length) return 0;
  return 1 + count(v, i + 1);
}
System.out.println(count(new int[]{5, 2, 8}, 0));`,
`int count(int n, int i) {
  if (i > n) return 0;
  return 1 + count(n, i + 1);
}
printf("%d", count(3, 0));`)},
{id:"xb3",skill:"func",type:"parsons",d:3,bloom:3,boss:"bossB",code:four(
`def count_big(v, limit):
    c = 0
    for n in v:
        if n > limit:
            c += 1
    return c
print(count_big([3, 9, 12], 5))`,
`function countBig(v, limit) {
  let c = 0;
  for (const n of v) if (n > limit) c += 1;
  return c;
}
console.log(countBig([3, 9, 12], 5));`,
`static int countBig(int[] v, int limit) {
  int c = 0;
  for (int n : v) if (n > limit) c += 1;
  return c;
}
System.out.println(countBig(new int[]{3, 9, 12}, 5));`,
`int count_big(int v[], int n, int limit) {
  int c = 0;
  for (int i = 0; i < n; i++) if (v[i] > limit) c += 1;
  return c;
}
printf("%d", count_big((int[]){3, 9, 12}, 3, 5));`)},
{id:"xc1",skill:"test",type:"mc",d:3,bloom:5,boss:"bossC"},
{id:"xc2",skill:"git",type:"mc",d:3,bloom:5,boss:"bossC"},
{id:"xc3",skill:"agil",type:"mc",d:3,bloom:5,boss:"bossC"}
];
