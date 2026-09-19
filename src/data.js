"use strict";
/* DevWise - dados independentes de idioma natural.
   Textos ficam em src/lang-*.js. Para acrescentar um idioma, copie um desses arquivos e traduza. */
const LANG = {};
const PLS = {py:"Python", js:"JavaScript", java:"Java", c:"C"};

/* Os 20 idiomas do estudo de tradução e tokenização (matriz_traducao): código do jogo, nome nativo, nome em inglês
   (usado nos prompts do tutor IA e do gerador de pacotes), código FLORES-200, escrita, direção e custo em tokens
   por 1000 caracteres medido no estudo para o tokenizador do claude-fable-5. */
const STUDY_LANGS = [
  {code:"en",native:"English",en:"English",flores:"eng_Latn",script:"Latin",tok:342},
  {code:"zh",native:"中文",en:"Mandarin Chinese (Simplified)",flores:"zho_Hans",script:"Han",tok:1114},
  {code:"hi",native:"हिन्दी",en:"Hindi",flores:"hin_Deva",script:"Devanagari",tok:724},
  {code:"es",native:"Español",en:"Latin American Spanish",flores:"spa_Latn",script:"Latin",tok:413},
  {code:"fr",native:"Français",en:"French",flores:"fra_Latn",script:"Latin",tok:403},
  {code:"ar",native:"العربية",en:"Modern Standard Arabic",flores:"arb_Arab",script:"Arabic",rtl:true,tok:689},
  {code:"bn",native:"বাংলা",en:"Bengali",flores:"ben_Beng",script:"Bengali",tok:901},
  {code:"pt",native:"Português",en:"Brazilian Portuguese",flores:"por_Latn",script:"Latin",tok:417},
  {code:"ru",native:"Русский",en:"Russian",flores:"rus_Cyrl",script:"Cyrillic",tok:407},
  {code:"ur",native:"اردو",en:"Urdu",flores:"urd_Arab",script:"Arabic",rtl:true,tok:774},
  {code:"id",native:"Bahasa Indonesia",en:"Indonesian",flores:"ind_Latn",script:"Latin",tok:492},
  {code:"de",native:"Deutsch",en:"German",flores:"deu_Latn",script:"Latin",tok:487},
  {code:"ja",native:"日本語",en:"Japanese",flores:"jpn_Jpan",script:"Kana",tok:925},
  {code:"mr",native:"मराठी",en:"Marathi",flores:"mar_Deva",script:"Devanagari",tok:792},
  {code:"te",native:"తెలుగు",en:"Telugu",flores:"tel_Telu",script:"Telugu",tok:905},
  {code:"tr",native:"Türkçe",en:"Turkish",flores:"tur_Latn",script:"Latin",tok:534},
  {code:"ta",native:"தமிழ்",en:"Tamil",flores:"tam_Taml",script:"Tamil",tok:843},
  {code:"vi",native:"Tiếng Việt",en:"Vietnamese",flores:"vie_Latn",script:"Latin",tok:574},
  {code:"ko",native:"한국어",en:"Korean",flores:"kor_Hang",script:"Hangul",tok:1045},
  {code:"pa",native:"ਪੰਜਾਬੀ",en:"Punjabi (Gurmukhi)",flores:"pan_Guru",script:"Gurmukhi",tok:2019}
];

/* Habilidades, pré-requisitos, posição no mapa e competências dos Referenciais de Formação da SBC (2017). */
const SKILLS = [
  {id:"var",   area:"prog", pre:[],       x:60,  y:62,  sbc:["CC-C.1.3","ES-C.1.1","ES-C.6.4"]},
  {id:"cond",  area:"prog", pre:["var"],  x:180, y:62,  sbc:["CC-C.1.3","ES-C.1.1","ES-C.6.4"]},
  {id:"loop",  area:"prog", pre:["cond"], x:300, y:62,  sbc:["CC-C.1.3","ES-C.1.1","ES-C.6.4"]},
  {id:"func",  area:"prog", pre:["loop"], x:420, y:62,  sbc:["CC-C.1.3","ES-C.1.1","ES-C.6.4"]},
  {id:"col",   area:"prog", pre:["func"], x:540, y:62,  sbc:["CC-C.1.3","ES-C.1.1"]},
  {id:"rec",   area:"prog", pre:["func"], x:556, y:158, sbc:["CC-C.1.3","ES-C.1.1"]},
  {id:"req",   area:"se",   pre:[],       x:60,  y:254, sbc:["ES-C.5.3"]},
  {id:"agil",  area:"se",   pre:["req"],  x:180, y:254, sbc:["ES-C.4.2","ES-C.4.4"]},
  {id:"git",   area:"se",   pre:[],       x:300, y:254, sbc:["ES-C.6.3"]},
  {id:"test",  area:"se",   pre:["cond"], x:420, y:254, sbc:["ES-C.6.2","ES-C.7.3"]},
  {id:"design",area:"se",   pre:["func"], x:540, y:254, sbc:["ES-C.6.1","ES-C.6.7","ES-C.4.3"]},
  {id:"model", area:"se",   pre:["req"],  x:60,  y:356, sbc:["ES-C.5.4"]},
  {id:"qual",  area:"se",   pre:["git"],  x:300, y:356, sbc:["ES-C.7.1","ES-C.7.2","ES-C.6.2"]},
  {id:"devops",area:"se",   pre:["git","test"], x:420, y:356, sbc:["ES-C.6.5","ES-C.6.3"]}
];

/* Exemplo de código do arsenal teórico, por habilidade e linguagem. */
const EX = {
var:{py:`price = 4.50     # decimal
qty = 3          # inteiro / integer
item = "bread"   # texto / text
total = price * qty`,
js:`const price = 4.5;    // number
let qty = 3;
const item = "bread";  // string
let total = price * qty;`,
java:`double price = 4.50;
int qty = 3;
String item = "bread";
double total = price * qty;`,
c:`double price = 4.50;
int qty = 3;
char item[] = "bread";
double total = price * qty;`},
cond:{py:`if temp >= 39:
    level = "red"
elif temp >= 37.5:
    level = "yellow"
else:
    level = "green"`,
js:`if (temp >= 39) {
  level = "red";
} else if (temp >= 37.5) {
  level = "yellow";
} else {
  level = "green";
}`,
java:`if (temp >= 39) {
  level = "red";
} else if (temp >= 37.5) {
  level = "yellow";
} else {
  level = "green";
}`,
c:`if (temp >= 39) {
  level = 'R';
} else if (temp >= 37.5) {
  level = 'Y';
} else {
  level = 'G';
}`},
loop:{py:`total = 0
for grade in grades:
    total += grade
mean = total / len(grades)`,
js:`let total = 0;
for (const grade of grades) {
  total += grade;
}
const mean = total / grades.length;`,
java:`double total = 0;
for (double grade : grades) {
  total += grade;
}
double mean = total / grades.length;`,
c:`double total = 0;
for (int i = 0; i < n; i++) {
  total += grades[i];
}
double mean = total / n;`},
func:{py:`def freight(km):
    return 5 + 2 * km

print(freight(10))   # 25`,
js:`function freight(km) {
  return 5 + 2 * km;
}
console.log(freight(10)); // 25`,
java:`static int freight(int km) {
  return 5 + 2 * km;
}
System.out.println(freight(10)); // 25`,
c:`int freight(int km) {
  return 5 + 2 * km;
}
printf("%d", freight(10)); // 25`},
col:{py:`books = ["Dom Casmurro", "Vidas Secas"]
copies = {"Dom Casmurro": 2}
books.append("O Cortiço")
print(books[0], copies["Dom Casmurro"])`,
js:`const books = ["Dom Casmurro", "Vidas Secas"];
const copies = {"Dom Casmurro": 2};
books.push("O Cortiço");
console.log(books[0], copies["Dom Casmurro"]);`,
java:`List<String> books = new ArrayList<>(List.of("Dom Casmurro", "Vidas Secas"));
Map<String, Integer> copies = new HashMap<>();
copies.put("Dom Casmurro", 2);
System.out.println(books.get(0) + " " + copies.get("Dom Casmurro"));`,
c:`const char *books[3] = {"Dom Casmurro", "Vidas Secas"};
int copies[3] = {2, 1};
printf("%s %d", books[0], copies[0]);
/* C puro não tem dicionário: usam-se vetores paralelos ou structs */`},
rec:{py:`def total(n):
    if n == 0:            # caso base / base case
        return 0
    return n + total(n - 1)`,
js:`function total(n) {
  if (n === 0) return 0;   // caso base / base case
  return n + total(n - 1);
}`,
java:`static int total(int n) {
  if (n == 0) return 0;    // caso base / base case
  return n + total(n - 1);
}`,
c:`int total(int n) {
  if (n == 0) return 0;    /* caso base / base case */
  return n + total(n - 1);
}`}
};

/* Banco de itens. type: mc | parsons | bug. d: dificuldade 1-3. bloom: 1-5.
   "parsons" sem código ordena frases do pacote de idioma (lines). "sort" classifica cartões em duas categorias: key traz a categoria correta de cada cartão.
   Em "mc" a primeira opção é a correta (a tela embaralha). "@err" e "@none" são traduzidos.
   Itens sem "opts" aqui têm opções textuais no arquivo de idioma. */
const four = (py,js,java,c)=>({py,js,java,c});
const ITEMS = [
/* ---------------- Variáveis ---------------- */
{id:"v1",skill:"var",type:"mc",d:1,bloom:2,mono:true,opts:["5","8","13","@err"],code:four(
`x = 5
y = x
x = 8
print(y)`,
`let x = 5;
let y = x;
x = 8;
console.log(y);`,
`int x = 5;
int y = x;
x = 8;
System.out.println(y);`,
`int x = 5;
int y = x;
x = 8;
printf("%d", y);`)},
{id:"v2",skill:"var",type:"mc",d:2,bloom:2,mono:true,opts:["34","7","3 4","@err"],code:four(
`print("3" + "4")`,
`console.log("3" + "4");`,
`System.out.println("3" + "4");`,
`char s[8] = "3";
strcat(s, "4");
printf("%s", s);`)},
{id:"v3",skill:"var",type:"bug",d:2,bloom:4,answer:2,code:four(
`a = 1
b = 2
a = b
b = a
print(a, b)`,
`let a = 1;
let b = 2;
a = b;
b = a;
console.log(a, b);`,
`int a = 1;
int b = 2;
a = b;
b = a;
System.out.println(a + " " + b);`,
`int a = 1;
int b = 2;
a = b;
b = a;
printf("%d %d", a, b);`)},
{id:"v4",skill:"var",type:"mc",d:3,bloom:3,mono:true,opts:["3 1","3.5 0","4 1","3 0.5"],code:four(
`a = 7 // 2
b = 7 % 2
print(a, b)`,
`let a = Math.floor(7 / 2);
let b = 7 % 2;
console.log(a, b);`,
`int a = 7 / 2;
int b = 7 % 2;
System.out.println(a + " " + b);`,
`int a = 7 / 2;
int b = 7 % 2;
printf("%d %d", a, b);`)},
{id:"v5",skill:"var",type:"mc",d:1,bloom:2},
/* ---------------- Condicionais ---------------- */
{id:"c1",skill:"cond",type:"mc",d:1,bloom:2,mono:true,opts:["A","B","A B","@none"],code:four(
`n = 7
if n >= 7:
    print("A")
else:
    print("B")`,
`let n = 7;
if (n >= 7) {
  console.log("A");
} else {
  console.log("B");
}`,
`int n = 7;
if (n >= 7) {
  System.out.println("A");
} else {
  System.out.println("B");
}`,
`int n = 7;
if (n >= 7) {
  printf("A");
} else {
  printf("B");
}`)},
{id:"c2",skill:"cond",type:"mc",d:2,bloom:2,mono:true,opts:["A","B","A B","@none"],code:four(
`t = 30
if t > 20:
    print("A")
elif t > 28:
    print("B")`,
`let t = 30;
if (t > 20) {
  console.log("A");
} else if (t > 28) {
  console.log("B");
}`,
`int t = 30;
if (t > 20) {
  System.out.println("A");
} else if (t > 28) {
  System.out.println("B");
}`,
`int t = 30;
if (t > 20) {
  printf("A");
} else if (t > 28) {
  printf("B");
}`)},
{id:"c3",skill:"cond",type:"parsons",d:2,bloom:3,code:four(
`n = 10
if n % 2 == 0:
    print("even")
else:
    print("odd")`,
`let n = 10;
if (n % 2 === 0) {
  console.log("even");
} else {
  console.log("odd");
}`,
`int n = 10;
if (n % 2 == 0) {
  System.out.println("even");
} else {
  System.out.println("odd");
}`,
`int n = 10;
if (n % 2 == 0) {
  printf("even");
} else {
  printf("odd");
}`)},
{id:"c4",skill:"cond",type:"mc",d:3,bloom:3,code:four(
`print(True or False and False)`,
`console.log(true || false && false);`,
`System.out.println(true || false && false);`,
`printf("%d", 1 || 0 && 0);`)},
{id:"c5",skill:"cond",type:"bug",d:2,bloom:4,answer:2,code:four(
`age = 60
price = 100
if age > 60:
    price = price / 2
print(price)`,
`let age = 60;
let price = 100;
if (age > 60) {
  price = price / 2;
}
console.log(price);`,
`int age = 60;
int price = 100;
if (age > 60) {
  price = price / 2;
}
System.out.println(price);`,
`int age = 60;
int price = 100;
if (age > 60) {
  price = price / 2;
}
printf("%d", price);`)},
/* ---------------- Laços ---------------- */
{id:"l1",skill:"loop",type:"mc",d:1,bloom:2,mono:true,opts:["0 1 2","1 2 3","0 1 2 3","3"],code:four(
`for i in range(3):
    print(i)`,
`for (let i = 0; i < 3; i++) {
  console.log(i);
}`,
`for (int i = 0; i < 3; i++) {
  System.out.println(i);
}`,
`for (int i = 0; i < 3; i++) {
  printf("%d ", i);
}`)},
{id:"l2",skill:"loop",type:"mc",d:2,bloom:3,mono:true,opts:["10","15","6","4"],code:four(
`total = 0
for i in range(1, 5):
    total += i
print(total)`,
`let total = 0;
for (let i = 1; i < 5; i++) {
  total += i;
}
console.log(total);`,
`int total = 0;
for (int i = 1; i < 5; i++) {
  total += i;
}
System.out.println(total);`,
`int total = 0;
for (int i = 1; i < 5; i++) {
  total += i;
}
printf("%d", total);`)},
{id:"l3",skill:"loop",type:"bug",d:2,bloom:4,answer:3,code:four(
`n = 3
while n > 0:
    print(n)
    n += 1
print("end")`,
`let n = 3;
while (n > 0) {
  console.log(n);
  n += 1;
}
console.log("end");`,
`int n = 3;
while (n > 0) {
  System.out.println(n);
  n += 1;
}
System.out.println("end");`,
`int n = 3;
while (n > 0) {
  printf("%d ", n);
  n += 1;
}
printf("end");`)},
{id:"l4",skill:"loop",type:"parsons",d:3,bloom:3,code:four(
`v = [6, 9, 4]
best = v[0]
for n in v:
    if n > best:
        best = n
print(best)`,
`const v = [6, 9, 4];
let best = v[0];
for (const n of v) {
  if (n > best) best = n;
}
console.log(best);`,
`int[] v = {6, 9, 4};
int best = v[0];
for (int n : v) {
  if (n > best) best = n;
}
System.out.println(best);`,
`int v[] = {6, 9, 4};
int best = v[0];
for (int i = 0; i < 3; i++) {
  if (v[i] > best) best = v[i];
}
printf("%d", best);`)},
{id:"l5",skill:"loop",type:"mc",d:3,bloom:3,mono:true,opts:["4","3","5","8"],code:four(
`n = 16
c = 0
while n > 1:
    n = n // 2
    c += 1
print(c)`,
`let n = 16;
let c = 0;
while (n > 1) {
  n = Math.floor(n / 2);
  c += 1;
}
console.log(c);`,
`int n = 16;
int c = 0;
while (n > 1) {
  n = n / 2;
  c += 1;
}
System.out.println(c);`,
`int n = 16;
int c = 0;
while (n > 1) {
  n = n / 2;
  c += 1;
}
printf("%d", c);`)},
/* ---------------- Funções ---------------- */
{id:"f1",skill:"func",type:"mc",d:1,bloom:2,mono:true,opts:["9","8","5","@err"],code:four(
`def twice(x):
    return x * 2

r = twice(4)
print(r + 1)`,
`function twice(x) {
  return x * 2;
}
let r = twice(4);
console.log(r + 1);`,
`static int twice(int x) {
  return x * 2;
}
// main
int r = twice(4);
System.out.println(r + 1);`,
`int twice(int x) {
  return x * 2;
}
// main
int r = twice(4);
printf("%d", r + 1);`)},
{id:"f2",skill:"func",type:"mc",d:2,bloom:2},
{id:"f3",skill:"func",type:"mc",d:2,bloom:2,mono:true,opts:["10","99","0","@err"],code:four(
`x = 10
def change():
    x = 99
change()
print(x)`,
`let x = 10;
function change() {
  let x = 99;
}
change();
console.log(x);`,
`static int x = 10;
static void change() {
  int x = 99;
}
// main
change();
System.out.println(x);`,
`int x = 10;
void change() {
  int x = 99;
}
// main
change();
printf("%d", x);`)},
{id:"f4",skill:"func",type:"parsons",d:3,bloom:3,code:four(
`def mean(v):
    total = 0
    for n in v:
        total += n
    return total / len(v)
print(mean([6, 8, 10]))`,
`function mean(v) {
  let total = 0;
  for (const n of v) total += n;
  return total / v.length;
}
console.log(mean([6, 8, 10]));`,
`static double mean(int[] v) {
  int total = 0;
  for (int n : v) total += n;
  return (double) total / v.length;
}
System.out.println(mean(new int[]{6, 8, 10}));`,
`double mean(int v[], int n) {
  int total = 0;
  for (int i = 0; i < n; i++) total += v[i];
  return (double) total / n;
}
printf("%.1f", mean((int[]){6, 8, 10}, 3));`)},
{id:"f5",skill:"func",type:"mc",d:3,bloom:4,mono:true,opts:["5","6","@none","@err"],code:four(
`def add_one(n):
    n = n + 1

x = 5
add_one(x)
print(x)`,
`function addOne(n) {
  n = n + 1;
}
let x = 5;
addOne(x);
console.log(x);`,
`static void addOne(int n) {
  n = n + 1;
}
// main
int x = 5;
addOne(x);
System.out.println(x);`,
`void add_one(int n) {
  n = n + 1;
}
// main
int x = 5;
add_one(x);
printf("%d", x);`)},
/* ---------------- Coleções ---------------- */
{id:"k1",skill:"col",type:"mc",d:1,bloom:2,mono:true,opts:["20","10","30","@err"],code:four(
`v = [10, 20, 30]
print(v[1])`,
`const v = [10, 20, 30];
console.log(v[1]);`,
`int[] v = {10, 20, 30};
System.out.println(v[1]);`,
`int v[] = {10, 20, 30};
printf("%d", v[1]);`)},
{id:"k2",skill:"col",type:"mc",d:2,bloom:4,mono:true,opts:["9","1","2","@err"],code:four(
`a = [1, 2]
b = a
b[0] = 9
print(a[0])`,
`const a = [1, 2];
const b = a;
b[0] = 9;
console.log(a[0]);`,
`int[] a = {1, 2};
int[] b = a;
b[0] = 9;
System.out.println(a[0]);`,
`int a[] = {1, 2};
int *b = a;
b[0] = 9;
printf("%d", a[0]);`)},
{id:"k3",skill:"col",type:"mc",d:2,bloom:5},
{id:"k4",skill:"col",type:"bug",d:3,bloom:4,answer:1,code:four(
`v = [7, 8, 9]
for i in range(len(v) + 1):
    print(v[i])`,
`const v = [7, 8, 9];
for (let i = 0; i <= v.length; i++) {
  console.log(v[i]);
}`,
`int[] v = {7, 8, 9};
for (int i = 0; i <= v.length; i++) {
  System.out.println(v[i]);
}`,
`int v[3] = {7, 8, 9};
for (int i = 0; i <= 3; i++) {
  printf("%d ", v[i]);
}`)},
{id:"k5",skill:"col",type:"mc",d:2,bloom:3,mono:true,opts:["2","3","1","16"],code:four(
`v = [3, 5, 8]
c = 0
for n in v:
    if n > 4:
        c += 1
print(c)`,
`const v = [3, 5, 8];
let c = 0;
for (const n of v) {
  if (n > 4) c += 1;
}
console.log(c);`,
`int[] v = {3, 5, 8};
int c = 0;
for (int n : v) {
  if (n > 4) c += 1;
}
System.out.println(c);`,
`int v[] = {3, 5, 8};
int c = 0;
for (int i = 0; i < 3; i++) {
  if (v[i] > 4) c += 1;
}
printf("%d", c);`)},
/* ---------------- Recursão ---------------- */
{id:"r1",skill:"rec",type:"mc",d:1,bloom:1},
{id:"r2",skill:"rec",type:"mc",d:2,bloom:3,mono:true,opts:["24","10","4","@err"],code:four(
`def fact(n):
    if n <= 1:
        return 1
    return n * fact(n - 1)
print(fact(4))`,
`function fact(n) {
  if (n <= 1) return 1;
  return n * fact(n - 1);
}
console.log(fact(4));`,
`static int fact(int n) {
  if (n <= 1) return 1;
  return n * fact(n - 1);
}
System.out.println(fact(4));`,
`int fact(int n) {
  if (n <= 1) return 1;
  return n * fact(n - 1);
}
printf("%d", fact(4));`)},
{id:"r3",skill:"rec",type:"bug",d:2,bloom:4,answer:3,code:four(
`def count(n):
    if n == 0: return
    print(n)
    count(n)`,
`function count(n) {
  if (n === 0) return;
  console.log(n);
  count(n);
}`,
`static void count(int n) {
  if (n == 0) return;
  System.out.println(n);
  count(n);
}`,
`void count(int n) {
  if (n == 0) return;
  printf("%d ", n);
  count(n);
}`)},
{id:"r4",skill:"rec",type:"mc",d:3,bloom:4,mono:true,opts:["1 2 3","3 2 1","3","@none"],code:four(
`def f(n):
    if n == 0: return
    f(n - 1)
    print(n)
f(3)`,
`function f(n) {
  if (n === 0) return;
  f(n - 1);
  console.log(n);
}
f(3);`,
`static void f(int n) {
  if (n == 0) return;
  f(n - 1);
  System.out.println(n);
}
f(3);`,
`void f(int n) {
  if (n == 0) return;
  f(n - 1);
  printf("%d ", n);
}
f(3);`)},
{id:"r5",skill:"rec",type:"mc",d:3,bloom:4,mono:true,opts:["5","8","3","@err"],code:four(
`def f(n):
    if n < 2: return n
    return f(n - 1) + f(n - 2)
print(f(5))`,
`function f(n) {
  if (n < 2) return n;
  return f(n - 1) + f(n - 2);
}
console.log(f(5));`,
`static int f(int n) {
  if (n < 2) return n;
  return f(n - 1) + f(n - 2);
}
System.out.println(f(5));`,
`int f(int n) {
  if (n < 2) return n;
  return f(n - 1) + f(n - 2);
}
printf("%d", f(5));`)},
/* ---------------- Engenharia de software (texto no arquivo de idioma) ---------------- */
{id:"q1",skill:"req",type:"mc",d:1,bloom:2},{id:"q2",skill:"req",type:"mc",d:2,bloom:5},{id:"q3",skill:"req",type:"mc",d:2,bloom:2},
{id:"q4",skill:"req",type:"mc",d:3,bloom:4},{id:"q5",skill:"req",type:"mc",d:2,bloom:3},
{id:"a1",skill:"agil",type:"mc",d:1,bloom:1},{id:"a2",skill:"agil",type:"mc",d:2,bloom:2},{id:"a3",skill:"agil",type:"mc",d:2,bloom:2},
{id:"a4",skill:"agil",type:"mc",d:3,bloom:5},{id:"a5",skill:"agil",type:"mc",d:2,bloom:4},
{id:"g1",skill:"git",type:"mc",d:1,bloom:1},
{id:"g2",skill:"git",type:"parsons",d:2,bloom:3,shared:`git checkout -b fix-login
git add login.py
git commit -m "Fix login validation"
git push origin fix-login`},
{id:"g3",skill:"git",type:"mc",d:2,bloom:2},{id:"g4",skill:"git",type:"mc",d:3,bloom:4},{id:"g5",skill:"git",type:"mc",d:2,bloom:5},
{id:"t1",skill:"test",type:"mc",d:1,bloom:1},{id:"t2",skill:"test",type:"mc",d:2,bloom:3,mono:true,opts:["17, 18, 19","20, 30, 40","18","1000, 2000"]},
{id:"t3",skill:"test",type:"parsons",d:2,bloom:3,code:four(
`def test_discount():
    price = 100
    final = apply_discount(price, 10)
    assert final == 90`,
`test("discount", () => {
  const price = 100;
  const final = applyDiscount(price, 10);
  expect(final).toBe(90);
});`,
`@Test
void testDiscount() {
  int price = 100;
  int result = applyDiscount(price, 10);
  assertEquals(90, result);
}`,
`void test_discount(void) {
  int price = 100;
  int final = apply_discount(price, 10);
  assert(final == 90);
}`)},
{id:"t4",skill:"test",type:"mc",d:3,bloom:5},{id:"t5",skill:"test",type:"mc",d:2,bloom:3},
{id:"d1",skill:"design",type:"mc",d:1,bloom:2},{id:"d2",skill:"design",type:"mc",d:2,bloom:3},{id:"d3",skill:"design",type:"mc",d:2,bloom:2},
{id:"d4",skill:"design",type:"mc",d:3,bloom:5,code:four(
`def charge(kind, value):
    if kind == "pix": ...
    elif kind == "card": ...
    elif kind == "boleto": ...`,
`function charge(kind, value) {
  if (kind === "pix") { /* ... */ }
  else if (kind === "card") { /* ... */ }
  else if (kind === "boleto") { /* ... */ }
}`,
`void charge(String kind, double value) {
  if (kind.equals("pix")) { /* ... */ }
  else if (kind.equals("card")) { /* ... */ }
  else if (kind.equals("boleto")) { /* ... */ }
}`,
`void charge(int kind, double value) {
  if (kind == PIX) { /* ... */ }
  else if (kind == CARD) { /* ... */ }
  else if (kind == BOLETO) { /* ... */ }
}`)},
{id:"d5",skill:"design",type:"mc",d:3,bloom:4},
/* itens de engenharia de software em formatos próprios: classificar e ordenar etapas */
{id:"q6",skill:"req",type:"sort",d:2,bloom:4,key:[0,1,0,1]},
{id:"a6",skill:"agil",type:"parsons",d:2,bloom:2},
{id:"g6",skill:"git",type:"parsons",d:3,bloom:3},
{id:"t6",skill:"test",type:"parsons",d:2,bloom:3},
{id:"d6",skill:"design",type:"sort",d:3,bloom:4,key:[0,1,0,1]},
/* Modelagem */
{id:"m1",skill:"model",type:"mc",d:1,bloom:2},{id:"m2",skill:"model",type:"mc",d:2,bloom:3},{id:"m3",skill:"model",type:"sort",d:2,bloom:4,key:[0,1,0,1]},
{id:"m4",skill:"model",type:"parsons",d:2,bloom:3},{id:"m5",skill:"model",type:"mc",d:3,bloom:5},
/* Qualidade e revisão de código */
{id:"u1",skill:"qual",type:"mc",d:1,bloom:2},{id:"u2",skill:"qual",type:"mc",d:2,bloom:5},{id:"u3",skill:"qual",type:"sort",d:2,bloom:4,key:[0,1,0,1]},
{id:"u4",skill:"qual",type:"mc",d:2,bloom:3},{id:"u5",skill:"qual",type:"mc",d:3,bloom:4},
/* Entrega contínua */
{id:"o1",skill:"devops",type:"mc",d:1,bloom:1},{id:"o2",skill:"devops",type:"parsons",d:2,bloom:3},{id:"o3",skill:"devops",type:"mc",d:2,bloom:4},
{id:"o4",skill:"devops",type:"sort",d:2,bloom:4,key:[0,1,0,1]},{id:"o5",skill:"devops",type:"mc",d:3,bloom:5}
];
