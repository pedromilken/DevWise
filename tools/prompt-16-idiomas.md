Você é uma equipe de professores nativos que localiza o DevWise, um jogo que ensina programação e engenharia de software a iniciantes adultos por meio de histórias e analogias do cotidiano. As histórias se passam num bairro brasileiro: a padaria de Dona Lúcia, o posto de saúde onde trabalha a enfermeira Rosa, a escola da secretária Marta, a biblioteca de Seu Antônio, o cartório de Helena e a cooperativa de entregas Roda Viva.

Traduza o JSON no fim desta mensagem para os 16 idiomas abaixo, de uma vez, e devolve TUDO num único JSON.

## Idiomas e forma de tratamento

- **zh** = Mandarin Chinese (Simplified) (中文). Address the learner with '你' (never '您'). Glossary: "ticket" = 工单.
- **hi** = Hindi (हिन्दी). Address the learner with 'आप'. Glossary: "ticket" = टिकट.
- **fr** = French (Français). Address the learner with 'vous'. Glossary: "ticket" = ticket.
- **ar** = Modern Standard Arabic (العربية). Use Modern Standard Arabic with masculine singular address as the neutral default. Glossary: "ticket" = تذكرة (جمع: تذاكر).
- **bn** = Bengali (বাংলা). Address the learner politely with 'আপনি' (never 'তুমি'). Glossary: "ticket" = টিকিট.
- **ru** = Russian (Русский). Address the learner with lowercase 'вы' and plural imperatives such as 'Учитесь', 'Выберите' (never 'ты'). Glossary: "ticket" = задача (задачи, задачу...).
- **ur** = Urdu (اردو). Address the learner politely with 'آپ' (never 'تم'). Glossary: "ticket" = ٹکٹ.
- **id** = Indonesian (Bahasa Indonesia). Address the learner with 'kamu' (never 'Anda'). Glossary: "ticket" = tiket.
- **de** = German (Deutsch). Address the learner informally with 'du' (never 'Sie'). Glossary: "ticket" = Ticket.
- **ja** = Japanese (日本語). Use polite です/ます style and omit the pronoun 'あなた' wherever natural Japanese would drop it. Glossary: "ticket" = チケット.
- **mr** = Marathi (मराठी). Address the learner with 'तुम्ही'. Glossary: "ticket" = तिकीट (अनेकवचन: तिकिटे).
- **te** = Telugu (తెలుగు). Address the learner politely with 'మీరు' (never 'నువ్వు'). Glossary: "ticket" = టికెట్.
- **tr** = Turkish (Türkçe). Address the learner informally with 'sen' forms (never 'siz' forms). Use 'görev' for ticket. Glossary: "ticket" = görev.
- **ta** = Tamil (தமிழ்). Address the learner with 'நீங்கள்' and use one imperative style consistently (-ுங்கள்). Glossary: "ticket" = டிக்கெட்.
- **vi** = Vietnamese (Tiếng Việt). Address the learner with 'bạn'. Glossary: "ticket" = ticket.
- **pa** = Punjabi (Gurmukhi) (ਪੰਜਾਬੀ). Address the learner with 'ਤੁਸੀਂ'. Glossary: "ticket" = ਟਿਕਟ.

## Regras de tradução

- 'pick up the tickets' is an idiom: it means start working on the tasks. Do not translate it as physically lifting or grabbing something.
- 'software shop' means a small software company, not a store.
- For 'analogy' use the everyday word a teacher would say, not a rare learned term.
- Address the learner the same way in every sentence; never switch between informal and formal address.
- In the modelling mission, class names such as Book, Copy, Reader and Loan are domain concepts, not code: translate them.
- Never leave English words in the middle of a sentence when the language has its own everyday term; placeholders in braces such as {d} or {h} stand for names the game fills in, so keep them exactly.
- Cohesion: the title, prompt, hint, explanation and analogy of one item form a single short lesson; use the same terms across them and natural connectives of the language.
- Comprehension: write for an adult beginner; prefer short sentences and the word order a native teacher would use when speaking to a class.
- Naturalness: compose each sentence as people in that country really say it; avoid calques of English syntax, English punctuation habits and passive constructions that the language avoids. Follow local conventions for numbers, percent signs and quotation marks.
- Componha cada frase como um professor nativo falaria em sala, não traduza palavra por palavra.
- Coesão: título, enunciado, dica, explicação e analogia de um item formam uma lição curta; use o mesmo termo para a mesma coisa nos cinco.
- Compreensão: iniciante adulto, frases curtas, ordem de palavras natural do idioma.
- Se uma analogia não funcionar culturalmente no país, troque a imagem mantendo exatamente o mesmo conceito ensinado. Atenção especial a: trocar o conteúdo de dois copos (v9), mala de viagem com xampu de hotel (g9), duas salas disputando a mesma parede na planta (q11), placa de entrada para idosos e crianças (c7), tomar as medidas do cliente e provar a roupa (q7).

## Regras que não podem ser quebradas

- Devolva APENAS JSON válido, sem comentários e sem texto antes ou depois.
- Estrutura exata: um objeto cujas chaves são os 16 códigos de idioma; dentro de cada um, os mesmos campos `ui` e `items` do original, com AS MESMAS chaves.
- Não traduza nenhuma chave, apenas os valores de texto.
- Preserve os marcadores entre chaves exatamente como estão: {d}, {n}, {m}, {p}, {s}, {x}, {a}, {b}, {c}, {h}, {y}.
- Mantenha o tamanho de todos os arrays e NÃO mude a ordem: em `opts` a primeira opção é a resposta correta; em `cards` a ordem corresponde ao gabarito; em `lines` a ordem é a solução correta do exercício.
- Não altere: código, identificadores, números, operadores, os cartões "temperature >= 39", "temperature > 39", "age <= 12", "age < 12" (item c8), nomes próprios (Dona Lúcia, Rosa, Marta, Caio, Bia, Helena, Seu Antônio, Ponte, Pix, Roda Viva), README, .gitignore, Git, Brier, AUC, SBC, XP, PDF, e os nomes dos modelos em `ui.models` (Elo/Rasch, 3PL IRT with EAP, BKT, PFA, AFM), que ficam em inglês em todos os idiomas.
- Não troque o conceito ensinado, os fatos nem os números.
- Em v9, "change" significa troco (dinheiro devolvido ao cliente), não saldo bancário.
- Em g9 e g11, "change calculation" é o cálculo do troco da padaria.
- Em q7 e q8, "elicitation" é o termo técnico de engenharia de requisitos.

## Formato da resposta

{
 "zh": { "ui": { ... }, "items": { ... } },
 "hi": { "ui": { ... }, "items": { ... } },
 ... os 16 códigos, na ordem listada acima ...
}

Se a resposta não couber de uma vez, entregue em partes, cada parte um JSON completo e válido com um subconjunto dos idiomas, e diga ao final quais faltam. Nunca corte um JSON no meio.

## JSON a traduzir (inglês)

```json
{
 "ui": {
  "modelH": "Knowledge tracing model",
  "pilot": "Model that drives the game",
  "pilotNote": "One model drives the game: it computes mastery, unlocks stages and adjusts difficulty. The others run in the background and only record what they predicted before each answer, for later comparison. The percentage next to each name is that model's mastery threshold.",
  "models": {
   "elo": "Elo/Rasch",
   "irt": "3PL IRT with EAP",
   "bkt": "BKT",
   "pfa": "PFA",
   "afm": "AFM"
  },
  "rolePilot": "drives",
  "roleShadow": "observes",
  "cmpH": "Model comparison on this history",
  "cmpP": "Before each answer, the five models record the probability of a correct response they predicted. Brier measures prediction error (lower is better); AUC measures whether the model separates correct answers from mistakes (0.5 is chance and 1 is perfect).",
  "cmpNote": "With few answers from a single student these numbers swing a lot. A valid comparison uses the exported logs of many students, split by student.",
  "colModel": "Model",
  "colRole": "Role",
  "colAcc": "Accuracy",
  "confirmRule": "Require mastery to be confirmed by a correct answer on another day",
  "confirmNote": "Mastery reached today. To confirm it, get a ticket of this skill right on another day: a single session mixes knowledge with momentum.",
  "stC": "To be confirmed on another day",
  "confirmTag": "Confirmation",
  "printBtn": "Print or save as PDF",
  "studentName": "Student name (optional, shown on the printed report)",
  "printedOn": "Generated on {d}",
  "repFor": "Student: {n}",
  "navHome": "Home",
  "homeMissions": "missions with story and theory",
  "homeTickets": "tickets in the bank",
  "homeLangs": "languages",
  "homePls": "programming languages",
  "homeSciH": "How the tool was built",
  "homeSbc": "The 14 missions cover programming and software engineering, and each one states the competencies from the SBC Curriculum Guidelines (2017) that it trains. The same concept appears in four programming languages, with the same answer key.",
  "homeI18n": "The game exists in 20 languages, the same ones from the translation and tokenisation analysis that guides the project. Right-to-left scripts are supported, and languages with their own script offer a romanised version."
 },
 "items": {
  "v6": {
   "title": "The counter maths",
   "prompt": "Two loaves at 4 reais and a sum done in the head. What does the program print?",
   "hint": "In programming, as in maths, multiplication is worked out before addition.",
   "why": "First 3 × 4 = 12, then 2 + 12 = 14. To add first you would have to write (2 + 3) * 4.",
   "analogy": "It is the priority lane at the till: whoever has priority goes first, even if they arrived later. Parentheses are the pass that changes the order."
  },
  "v7": {
   "title": "The cents that vanish",
   "prompt": "Dona Lúcia adds two amounts and compares them with what she expected. What does the program print?",
   "hint": "Decimal numbers are stored in binary, and not every decimal fits exactly in that form.",
   "why": "In binary, 0.1 and 0.2 are repeating fractions: the sum gives 0.30000000000000004 and the exact comparison fails. For money, compare with a tolerance or work in cents, with whole numbers.",
   "analogy": "It is like measuring a centimetre cut with an inch ruler: every conversion leaves an invisible remainder, and adding remainders throws the total off."
  },
  "v8": {
   "title": "Grams turned into tonnes",
   "prompt": "The recipe uses 500 grams of flour, but the program prints 500000. Which line is wrong?",
   "hint": "A kilo has a thousand grams. To go from grams to kilos, do you multiply or divide?",
   "why": "The conversion is inverted: from grams to kilos you divide by 1000. Multiplying goes the opposite way.",
   "analogy": "It is converting currency in the wrong direction: the number grows huge and the maths looks right until someone checks the final amount."
  },
  "v9": {
   "title": "Swapping jars without spilling",
   "prompt": "Assemble the program that swaps the values of a and b using a temporary variable and prints the result.",
   "hint": "Store one of the values before it gets overwritten.",
   "why": "The temporary variable holds the first value while it is replaced. Without it, one of the two is lost, as in the till ticket where the swap went wrong.",
   "analogy": "To swap the contents of two full glasses you use a third, empty one. It is the same move, in code."
  },
  "v10": {
   "title": "Whole or decimal",
   "prompt": "Classify each piece of bakery data by the numeric type that fits best.",
   "bins": [
    "Whole number",
    "Decimal number"
   ],
   "cards": [
    "Number of loaves sold today",
    "Price per kilo of flour",
    "Number of customers in the queue",
    "Weight of the dough in kilos"
   ],
   "hint": "Ask whether half of that thing makes any sense.",
   "why": "What you count one unit at a time calls for an integer; what you measure in parts calls for a decimal. Half a customer does not exist; half a kilo does.",
   "analogy": "It is the difference between counting eggs and weighing flour: one fits in a box, the other needs scales."
  },
  "c6": {
   "title": "A question inside another",
   "prompt": "What does the program print?",
   "hint": "The second test only happens if the first one is true.",
   "why": "5 > 3 is true, so it enters the inner block. There, 5 > 10 is false and the program falls to the inner else. The outer else is never reached.",
   "analogy": "It is triage behind two doors: whoever passes the first still meets another decision ahead, and whoever does not never sees it."
  },
  "c7": {
   "title": "An elderly patient with no priority",
   "prompt": "Patients aged 65 or over, and also children up to 12, should get priority. The program never flags anyone. Which line needs fixing?",
   "hint": "Is there any age that is at the same time over 65 and under 12?",
   "why": "With AND, both conditions must hold together, which is impossible. The rule joins two separate groups, so it calls for OR.",
   "analogy": "It is the sign \"entrance for the elderly and children\": nobody is both at once. Swapping \"and\" for \"or\" opens the door to both groups."
  },
  "c8": {
   "title": "Does the limit count or not",
   "prompt": "Classify each triage condition by what it does with the exact limit value.",
   "bins": [
    "Includes the limit",
    "Excludes the limit"
   ],
   "cards": [
    "temperature >= 39",
    "temperature > 39",
    "age <= 12",
    "age < 12"
   ],
   "hint": "The line under the sign is what carries the \"or equal\".",
   "why": "The signs >= and <= include the limit value; > and < leave exactly that value out. This is where boundary errors are born.",
   "analogy": "It is the difference between \"from 65\" and \"over 65\": someone who is exactly 65 is in under one rule and out under the other."
  },
  "c9": {
   "title": "Rosa's triage, in three levels",
   "prompt": "Assemble the triage: a fever of 39 or more is red; otherwise, age 65 or over is yellow; everyone else is green.",
   "hint": "The most serious rule comes first, and each patient leaves with a single level.",
   "why": "The if, elif and else chain guarantees that only one level is assigned and that the most serious rule is tested first. The data must exist before the test, and printing comes after the decision.",
   "analogy": "It is the protocol pinned to the clinic wall: you read it top to bottom and stop at the first line that applies."
  },
  "c10": {
   "title": "The division that never happens",
   "prompt": "With x equal to zero, dividing by x would fail. What does the program print?",
   "hint": "When the first test of an AND is already false, does the second one get evaluated at all?",
   "why": "The AND operator short-circuits: since x != 0 is false, the division is never run and the program goes to the else, with no error. This pattern guards risky operations.",
   "analogy": "It is checking for fuel before turning the key: if there is none, nobody tries to start the engine. The order of the tests is the protection."
  },
  "q7": {
   "title": "Finding out or checking",
   "prompt": "Classify each requirements engineering activity.",
   "bins": [
    "Elicitation (finding out)",
    "Validation (checking)"
   ],
   "cards": [
    "Interviewing the receptionist about the daily routine",
    "Reviewing the requirements list with the director before coding",
    "Watching patients use the ticket kiosk",
    "Showing a prototype and checking whether this is really what is expected"
   ],
   "hint": "Ask whether the activity seeks new information or confirms what has already been written.",
   "why": "Interviewing and observing surface requirements that were not yet on paper. Reviewing and checking prototypes verify whether what was written matches the real need.",
   "analogy": "It is the difference between taking the client's measurements and trying the garment on them. The first discovers; the second confirms."
  },
  "q8": {
   "title": "The path of a requirement",
   "prompt": "Put the stages of requirements engineering in order.",
   "lines": [
    "Elicitation: find out what people need",
    "Analysis: resolve conflicts and set priorities",
    "Specification: write the requirements in a verifiable way",
    "Validation: check with the people who asked whether this is right",
    "Management: control changes throughout the project"
   ],
   "hint": "First you find out, then you organise, write and check; controlling changes runs alongside all the rest.",
   "why": "Each stage feeds the next: you do not prioritise what was never raised, nor validate what was never written. Management starts when requirements begin to change, and they always do.",
   "analogy": "It is building a house: talking to the family, deciding what fits the budget, drawing the plan, showing the drawing, and then recording every change of mind."
  },
  "q9": {
   "title": "\"The system notifies the patient\"",
   "prompt": "The requirement says only: \"the system notifies the patient\". Why is it a problem?",
   "opts": [
    "It does not say when, by which channel, or what to do if the notice fails",
    "It is too long and should be split",
    "It uses the word system, which should be avoided",
    "It is no problem: it is clear enough"
   ],
   "hint": "Picture two people implementing that sentence without talking to each other. Would they build the same thing?",
   "why": "An ambiguous requirement is one that allows more than one reasonable reading. Notifying the day before by text is different from notifying at the time by email, and both fit that sentence.",
   "analogy": "It is telling a friend \"let me know\": they may call at six in the morning or leave word with a neighbour. Without agreeing on it, each one delivers in their own way."
  },
  "q10": {
   "title": "Acceptance criteria",
   "prompt": "What turns a user story into something the team knows it has finished?",
   "opts": [
    "Acceptance criteria: verifiable conditions that say when it is done",
    "The developer's estimate in hours",
    "The name of whoever asked for the feature",
    "The screen drawn by the designer"
   ],
   "hint": "Think about what lets you answer yes or no to: is it finished?",
   "why": "Acceptance criteria describe the expected behaviour in verifiable conditions. Without them, \"done\" becomes a matter of opinion.",
   "analogy": "It is the snagging list at a property handover: without it, handing over the keys turns into an argument about what was agreed."
  },
  "q11": {
   "title": "Two requests that contradict each other",
   "prompt": "The director wants a complete patient record; the front desk wants scheduling in under a minute. What is the best course of action?",
   "opts": [
    "Take the conflict to both parties and negotiate an explicit solution, such as a minimal record now and the full one later",
    "Side with the director, because she has more authority",
    "Side with the front desk, because they are closer to the problem",
    "Implement both and let them sort it out in practice"
   ],
   "hint": "A conflict between requirements is a problem to settle in analysis, not in code.",
   "why": "Conflicting requirements must be reconciled with the stakeholders before they become code. Choosing in silence moves the conflict into the product, where it costs far more.",
   "analogy": "Two rooms are fighting over the same wall on the plan. The architect sits down with the family and decides beforehand; once built, the wall costs a renovation."
  },
  "g7": {
   "title": "Undoing without erasing the history",
   "prompt": "A change already released broke the bakery system. Put the steps for undoing it safely in order.",
   "lines": [
    "Identify the commit that caused the failure in the history",
    "Create a revert commit that undoes those changes",
    "Run the tests to confirm the system is back to normal",
    "Push the revert to the remote repository",
    "Investigate the cause calmly and prepare the definitive fix"
   ],
   "hint": "Restore the service first; understanding why comes later, with the system stable.",
   "why": "A revert creates a new commit that undoes the previous one, without erasing the history other people have already pulled. Investigating afterwards is safe because the system already works again.",
   "analogy": "In bookkeeping you do not scratch out a wrong entry: you post a reversing entry. The mistake stays on record, and the balance comes right."
  },
  "g8": {
   "title": "Fetch or already merge",
   "prompt": "What is the difference between fetch and pull in Git?",
   "opts": [
    "Fetch only brings the changes from the remote; pull brings them and merges into your branch",
    "They are two names for the same operation",
    "Fetch sends changes; pull receives them",
    "Fetch works only on main; pull on any branch"
   ],
   "hint": "One of the two changes your files right away. Which?",
   "why": "Fetch updates your view of the remote repository without touching your work, letting you see what changed before integrating. Pull does both at once and can raise a conflict there and then.",
   "analogy": "It is the difference between collecting the post and opening the envelopes on the desk you are working at. Fetch leaves it in the box; pull spreads it out now."
  },
  "g9": {
   "title": "What belongs in the repository",
   "prompt": "Classify each file of the bakery project.",
   "bins": [
    "Version it",
    "Keep it out (.gitignore)"
   ],
   "cards": [
    "The source code of the change calculation",
    "The file with the database password",
    "The README with installation instructions",
    "The folder of libraries downloaded automatically"
   ],
   "hint": "Ask whether the team wrote the file and whether anyone with access to the repository may see it.",
   "why": "You version what the team writes and needs to share. Secrets never go in, because Git history is permanent; downloaded dependencies do not either, because they can be rebuilt from the dependency file.",
   "analogy": "It is packing a suitcase: your clothes go in, the hotel shampoo stays. And your house key certainly does not travel in an open case."
  },
  "g10": {
   "title": "The force push",
   "prompt": "A colleague suggests force pushing to the main branch to \"tidy up\" the history. Why is that dangerous?",
   "opts": [
    "It rewrites history others have already pulled and can erase their work",
    "It makes the repository slower",
    "It only works with admin rights",
    "It is not dangerous: it is the recommended way to organise commits"
   ],
   "hint": "What happens to someone who already pulled the old version and kept working on top of it?",
   "why": "A force push replaces the remote history. Commits other people already pulled vanish from the timeline, and the work built on them is orphaned. On a shared branch, revert instead.",
   "analogy": "It is reprinting the minutes of a meeting everyone already took home. Whoever annotated the old version is left holding a document that no longer exists."
  },
  "g11": {
   "title": "The commit that does everything",
   "prompt": "One commit changes the change calculation, renames twenty variables and adds a new screen. What is the problem?",
   "opts": [
    "It cannot be reviewed, reverted or traced back to the source of a defect in isolation",
    "None: big commits save time",
    "Git has a limit of files per commit",
    "The message will be far too long"
   ],
   "hint": "Think of the day when only one of those three changes has to be undone.",
   "why": "Each commit should hold one coherent change. Mixing three, a revert drags along what was right, and the review gets lost between renames and new logic.",
   "analogy": "It is packing the kitchen, the bathroom and the office in the same box. To find one cup you turn everything over, and you cannot send back only what arrived wrong."
  }
 }
}
```
