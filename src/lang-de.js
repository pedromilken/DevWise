/* Pacote gerado por tools/gerar-idioma.js a partir de "en". REVISAR com um falante nativo antes de publicar. */
LANG.de = {
 "name": "Deutsch",
 "llmName": "German",
 "ui": {
  "role": "Rolle",
  "streak": "Serie",
  "freePlay": "Du hast alles gemeistert. Das Brett ist jetzt freies Üben.",
  "locked": "Gesperrt: Erreiche 60% in {p}, um freizuschalten.",
  "hits": "{c} von {n} Tickets richtig.",
  "masteryAria": "Beherrschung",
  "correctOrder": "Richtige Reihenfolge:",
  "down": "Nach unten",
  "why": "Warum: ",
  "colNow": "Jetzt",
  "k3": "Fähigkeiten gemeistert",
  "colStatus": "Status",
  "stM": "Gemeistert",
  "recLocked": "Noch gesperrt: {s}. Sie öffnen sich, wenn die Voraussetzungen über 60% liegen.",
  "bloomAcc": "Genauigkeit nach Bloom-Stufe",
  "data": "Deine Daten",
  "setH": "Einstellungen",
  "uiLang": "Sprache des Spiels",
  "balance": "Bilanz",
  "total": "Lebenszeit-XP",
  "modes": {
   "normal": "Normal",
   "medio": "Mittel",
   "dificil": "Schwer",
   "hardcore": "Extra Hardcore"
  },
  "typedPh": "Programmausgabe",
  "shieldUsed": "Dein Schild hat die Strafe abgefangen.",
  "boostOn": "Doppelte XP: noch {n} Tickets",
  "lockedXpOnly": "Gesperrt: benötigt {x} Lebenszeit-XP (du hast {y}).",
  "bossNext": "Nächste Stufe",
  "bossLose": "Der Boss hat dieses Mal gewonnen",
  "bossRules": "Drei verkettete Stufen, keine Hinweise und keine Power-ups. Du darfst dir einen einzigen Fehler erlauben. Der auf dem Brett gewählte Schwierigkeitsgrad gilt auch hier.",
  "trophies": "Trophäen",
  "equip": "Diesen Titel verwenden",
  "evoP": "Jede Zeile ist die geschätzte Beherrschung einer Fähigkeit über die Tickets, die du beantwortet hast. Tippe auf eine Fähigkeit, um sie hervorzuheben: grüne Punkte sind richtige Antworten und gelbe Punkte sind Fehler. Gestrichelte Linien markieren das Freischalten (60%) und die Beherrschung ({m}).",
  "models": {
   "elo": "Elo/Rasch",
   "irt": "3PL IRT mit EAP",
   "bkt": "BKT",
   "pfa": "PFA",
   "afm": "AFM"
  },
  "cmpH": "Modellvergleich auf dieser Historie",
  "confirmTag": "Bestätigung",
  "studentName": "Name des Schülers (optional, wird im gedruckten Bericht angezeigt)",
  "homeLangs": "Sprachen",
  "homePls": "Programmiersprachen",
  "runErr": "Der Code lief nicht, daher ist die Punktzahl 0: {e}",
  "hidden": "Versteckte Fälle: {a} von {b} richtig. Sie existieren, damit die Lösung wirklich funktioniert, nicht nur für die sichtbaren Beispiele.",
  "codeEmpty": "Noch keine Code-Übung beantwortet.",
  "teacherP": "Technische Einstellungen. Spieler müssen hier nichts ändern.",
  "runnerP": "JavaScript und Python laufen direkt im Browser. Java und C benötigen einen Server, der den Code kompiliert und ausführt; ohne einen solchen bleiben die Code-Übungen in diesen Sprachen verborgen. Verwende deinen eigenen Piston-Server oder die öffentliche API von Piston, die seit Februar 2026 ein Token erfordert, das für nicht-kommerzielle Bildungsprojekte gewährt wird.",
  "navLab": "Werkstatt",
  "freeNote": "Freie Herausforderung: Wähle deinen eigenen Weg. Die Testfälle entscheiden.",
  "ruleN": {
   "noMul": "ohne den *-Operator",
   "useFor": "mit for",
   "noPow": "ohne eingebaute Potenzfunktion (**, pow)",
   "useLoop": "mit einer Schleife",
   "noMax": "ohne max oder eingebautes Sortieren",
   "noSum": "ohne eingebaute Summenfunktion (sum, reduce, stream)",
   "noMod": "ohne den %-Operator",
   "useCond": "mit einer Bedingung",
   "noRev": "ohne eingebautes Umkehren (reverse, [::-1], StringBuilder)",
   "noEval": "ohne eval",
   "noLoop": "ohne for oder while",
   "selfCall": "sich selbst aufrufend"
  },
  "kindRule": "mit einer Einschränkung",
  "start": "Starte den ersten Sprint",
  "sprint": "Sprint {n}",
  "todo": "Zu erledigen",
  "doneSprint": "In diesem Sprint erledigt",
  "map": "Kompetenzkarte",
  "sbcH": "Hier trainierte Kompetenzen aus den SBC-Curriculum-Richtlinien (2017)",
  "check": "Antwort prüfen",
  "aiFail": "Der KI-Tutor hat nicht geantwortet. Überprüfe die Einstellungen oder nutze den normalen Hinweis.",
  "allUsed": "Alle Zeilen wurden verwendet.",
  "options": "Optionen",
  "codeLines": "Codezeilen",
  "delta": "Kompetenz von {s}: {a} auf {b}   (+{x} XP)",
  "changed": "Was sich an deiner Kompetenz geändert hat",
  "k1": "beantwortete Tickets",
  "colHits": "Richtig",
  "recNone": "Noch keine Antworten. Löse ein paar Tickets, damit der Tutor Daten hat.",
  "howP": "Der Tutor verwendet ein Elo/Rasch-Modell. Jede deiner Fähigkeiten hat eine Bewertung, und jedes Ticket hat eine Schwierigkeit auf derselben Skala. Der Unterschied zwischen beiden ergibt die Wahrscheinlichkeit einer richtigen Antwort; nach deiner Antwort bewegt sich die Bewertung proportional zur Überraschung nach oben oder unten. Die angezeigte Kompetenz ist deine Chance, ein Ticket mit durchschnittlicher Schwierigkeit ohne Raten zu lösen, und eine Fähigkeit gilt ab {m} als beherrscht.",
  "aiP": "Der KI-Tutor schreibt maßgeschneiderte sokratische Hinweise und neue Analogien in der Spielsprache, ohne die Antwort zu verraten. Ohne ihn verwendet das Spiel die von den Autoren geschriebenen Hinweise.",
  "aiClaude": "Verbunden durch Claude über diesen Link. In der auf GitHub veröffentlichten Version benötigt der Tutor einen API-Schlüssel.",
  "none": "Nichts",
  "titleLbl": "Titel",
  "modeDesc": {
   "normal": "XP ×1. Kostenlose Hinweise (ein Hinweis mit richtiger Antwort bringt die Hälfte). Jeder Fehler kostet 2 XP pro Ticket-Level.",
   "medio": "XP ×1,5. Jeder Hinweis kostet 5 XP. Jeder Fehler kostet 4 XP pro Ticket-Level.",
   "dificil": "XP ×2. Keine Hinweise und keine Optionen bei Ausgabe-Tickets: Du tippst, was das Programm ausgibt. Jeder Fehler kostet 6 XP pro Level.",
   "hardcore": "XP ×3. Keine Hinweise, getippte Antworten und 60 Sekunden auf der Uhr. Jeder Fehler kostet 10 XP pro Level."
  },
  "lost": "Strafe: -{x} XP von deinem Guthaben.",
  "useTime": "+30 s verwenden ({n})",
  "bossLives": "Noch erlaubte Fehler: {n}",
  "shopP": "Tausche dein XP-Guthaben gegen Power-ups und Titel. Das Ausgeben des Guthabens verringert nicht die Lebenszeit-XP, die Stufen und Bosse freischaltet.",
  "powers": "Power-ups",
  "buy": "Einlösen für {c} XP",
  "evoH": "Wissenszuwachs",
  "plP": "Jede Sprache hat ihren eigenen Kompetenz-Tracker; die verwendete ist mit ● markiert. Wenn du eine Sprache zum ersten Mal ausprobierst, beginnst du mit einer Übertragungsschätzung: die Hälfte des Weges, den du in deiner besten Sprache bereits zurückgelegt hast. Fettgedruckte Werte wurden geübt.",
  "pilot": "Modell, das das Spiel antreibt",
  "rolePilot": "treibt an",
  "cmpNote": "Bei wenigen Antworten eines einzelnen Schülers schwanken diese Zahlen stark. Ein gültiger Vergleich verwendet die exportierten Protokolle vieler Schüler, aufgeteilt nach Schüler.",
  "colRole": "Rolle",
  "confirmRule": "Erfordere, dass die Kompetenz an einem anderen Tag durch eine richtige Antwort bestätigt wird",
  "homeMissions": "Missionen mit Geschichte und Theorie",
  "homeTickets": "Tickets in der Bank",
  "submit": "Zur Bewertung einreichen",
  "noExecP": "Diese Übung kann nur mit einem Code-Ausführungsdienst bewertet werden, den ein Lehrer in den Einstellungen unter Für Lehrer und Forschung einrichtet. Wähle in der Zwischenzeit Python oder JavaScript in den Einstellungen aus, um die Code-Übungen zu lösen.",
  "checkN": {
   "loop": "verwendet eine Schleife",
   "cond": "verwendet eine Bedingung",
   "rec": "ruft sich selbst auf",
   "base": "hat einen Basisfall",
   "return": "gibt einen Wert zurück"
  },
  "aiStatusShort": "KI-Tutor:",
  "teacherH": "Für Lehrer und Forschung",
  "runnerH": "Code-Ausführung",
  "infraH": "Es konnte gerade nicht bewertet werden.",
  "infra": {
   "semServico": "Für diese Sprache ist kein Ausführungsdienst konfiguriert.",
   "auth": "Der Ausführungsdienst hat den Zugriff verweigert. Überprüfe das Token in den Einstellungen.",
   "rede": "Der Ausführungsdienst hat nicht geantwortet. Überprüfe die Verbindung und versuche es erneut.",
   "pyodide": "Python konnte nicht heruntergeladen werden. Beim ersten Mal wird Internet benötigt; überprüfe die Verbindung und versuche es erneut.",
   "worker": "Dieser Browser erlaubt keine isolierte JavaScript-Ausführung. Versuche einen anderen Browser.",
   "outro": "Der Ausführungsdienst hat einen Fehler zurückgegeben. Versuche es gleich noch einmal."
  },
  "labLangs": "Java und C erscheinen in der Sprachliste jeder Herausforderung, aber sie laufen erst, wenn ein Lehrer den Ausführungsdienst einrichtet.",
  "backLab": "Zurück zur Werkstatt",
  "navReport": "Bericht",
  "homeLead": "Du bist gerade bei Ponte eingestiegen, einer kleinen Softwarefirma, die die Bäckerei in der Nachbarschaft, das Gesundheitszentrum, die Schule und die Liefergenossenschaft betreut. Jeder Kunde bringt ein echtes Problem mit: Du hörst dir die Geschichte an, studierst den Theoriebaukasten und nimmst erst dann die Tickets in Angriff.",
  "steps": [
   [
    "Dem Kunden zuhören",
    "Jede Mission beginnt mit der Geschichte eines echten Problems, erzählt von den Menschen, die es erleben."
   ],
   [
    "Deinen Theoriebaukasten aufbauen",
    "Schlüsselkonzepte, ein Codebeispiel in der von dir gewählten Sprache und die SBC-Lehrplankompetenz, die trainiert wird."
   ],
   [
    "Die Tickets lösen",
    "Sage Ausgaben voraus, bringe Code in die richtige Reihenfolge, jage Bugs und triff technische Entscheidungen. Zu jeder Antwort gibt es eine praktische Analogie, und der Tutor verfolgt deinen Lernfortschritt."
   ]
  ],
  "toReview": "zu überprüfen",
  "areaProg": "Programmierung",
  "mapHint": "Tippe auf eine Fähigkeit, um Details zu sehen. Die Zahl ist die geschätzte Wahrscheinlichkeit, dass du sie bereits beherrschst.",
  "and": " und ",
  "story": "Die Geschichte",
  "snippetNote": "Java- und C-Snippets lassen die Klasse und die main-Funktion weg, um den Fokus auf dem Konzept zu halten.",
  "startTickets": "Ich bin bereit: Gib die Tickets dieser Mission frei",
  "backBoard": "Zurück zum Board",
  "types": {
   "mc": "Analysiere und antworte",
   "parsons": "Bringe den Code in die richtige Reihenfolge",
   "bug": "Jage den Bug",
   "sort": "Klassifiziere",
   "code": "Schreibe Code"
  },
  "diff": "Schwierigkeit {d} von 3",
  "hintNote": "Mit einem Hinweis bringt eine richtige Antwort halbe XP und gilt als schwächerer Nachweis der Beherrschung.",
  "up": "Nach oben verschieben",
  "notYet": "Diesmal nicht",
  "roseNote": "Er ist trotz des Fehlers leicht gestiegen, weil das Modell annimmt, dass das Lesen der Erklärung auch lehrt.",
  "toRetro": "Zur Sprint-Retrospektive",
  "retroSum": "{c} von {n} Tickets gelöst. ",
  "colSkill": "Fähigkeit",
  "allDone": "Alle Fähigkeiten sind gemeistert. Die nächsten Sprints sind freies Üben.",
  "nextSprint": "Starte Sprint {n}",
  "repSub": "Eine Ansicht für den Lernenden und für alle, die ihn unterstützen: Was ist gemeistert, wo sind die Fehler und was sollte als Nächstes geübt werden.",
  "k2": "Genauigkeit",
  "stL": "Gesperrt",
  "showJson": "Zeige das JSON-Log",
  "reset": "Fortschritt löschen",
  "model": "Modell",
  "modeH": "Schwierigkeit",
  "yourAnswer": "Deine Antwort: {a}",
  "timeout": "Die Zeit ist um.",
  "hintPaid": "Einen Hinweis anfordern (kostet {c} XP)",
  "noHints": "In diesem Modus gibt es keine Hinweise.",
  "useFifty": "Verwende Zwei entfernen ({n})",
  "bountyDone": "Herausforderung abgeschlossen: {s} (+{x} XP)",
  "bossesH": "Bosse",
  "bossLocked": "Erfordert 60% in {p} und {x} Lebenszeit-XP.",
  "bossDefeated": "Besiegt",
  "bossFight": "Stelle dich dem Boss",
  "titlesH": "Titel",
  "owned": "Du hast: {n}",
  "unequip": "Nicht mehr verwenden",
  "sortHint": "Wähle für jede Karte eine der beiden Kategorien.",
  "modelH": "Wissensverfolgungsmodell",
  "running": "Dein Code wird ausgeführt...",
  "gotExp": "erhielt {g}, erwartet {e}",
  "checks": "Struktur:",
  "telDone": "Aufzeichnung dieser Einreichung: {p} Einfügungen (größte mit {m} Zeichen), {r} Ausführungen, {s} s insgesamt. Code-Fingerabdruck: {h}",
  "runnerUrl": "Adresse des Ausführungsdienstes",
  "pilotUrl": "Forschungsmodus an: Die Adresse dieser Seite setzt {m} als treibendes Modell. Entferne den Parameter ?piloto=, um zum Standard zurückzukehren.",
  "runnerOff": "Java und C: keine Ausführung. Die Codeübungen in diesen Sprachen bleiben ausgeblendet.",
  "bonusP": "Optional. Bringt XP ×1,5 und zählt zur Beherrschung der Fähigkeit. Gut, um vor einem Bosskampf XP aufzubauen.",
  "bonusTag": "Bonus",
  "bonusXp": "Bonus-Herausforderung: XP mit 1,5 multipliziert.",
  "compP": "Durchschnittliche Punktzahl in den Bonus-Herausforderungen, getrennt nach solchen mit Einschränkung (die Grundlagen, ohne fertige Werkzeuge) und den freien (Problemlösung). Der Workshop wird separat angezeigt, da er Übung ist und nicht zur Beherrschung zählt.",
  "labStat": "{n} Versuche, bester {b}",
  "homeH": "Lerne Programmieren und Softwareentwicklung, indem du echte Probleme von Menschen löst",
  "todoEmpty": "Öffne oben eine Mission, um ihre Tickets zu erhalten.",
  "lockedAria": "gesperrt",
  "aiHint": "Frage den KI-Tutor nach einem Hinweis",
  "tutorHint": "Hinweis des Tutors: ",
  "solved": "Ticket gelöst",
  "promo": "Beförderung: Deine Rolle ist jetzt {r}.",
  "aiExplain": "Frage den KI-Tutor nach einer anderen Analogie",
  "retroC": "Harter Sprint. Tickets zur Überprüfung kommen später wieder auf das Board.",
  "stP": "In Arbeit",
  "noData": "keine Daten",
  "resetConfirm": "Bestätigen: Gesamten Fortschritt löschen",
  "codeLang": "Programmiersprache der Tickets",
  "aiOff": "Aus: Das Spiel verwendet die von den Autoren geschriebenen Hinweise. Um es einzuschalten, gib unten einen Anbieter ein.",
  "provider": "Anbieter",
  "provAnthropic": "Anthropic (Claude)",
  "provOpenAI": "OpenAI-kompatibel (OpenAI, Ollama, LM Studio usw.)",
  "key": "API-Schlüssel",
  "save": "Tutoreinstellungen speichern",
  "err": "Fehler",
  "dailyTag": "Doppelte XP",
  "bossWinP": "Du hast {x} XP und die Trophäe \"{t}\" verdient.",
  "bossStart": "Kampf starten",
  "noTrophies": "Noch keine. Bosse erscheinen auf dem Board, sobald du genug Meisterschaft und XP hast.",
  "kTotal": "Gesamt-XP",
  "oops": [
   "Fast geschafft. Jeder Entwickler zerstört den Build, bevor er ihn repariert.",
   "Fehler gehören zum Weg: Jetzt weißt du, wo die Falle war.",
   "Du hast einen Fehler in deiner Überlegung gefunden, und so lernt man Debuggen.",
   "Diesmal nicht, und das ist in Ordnung. Nimm dir Zeit für die Erklärung."
  ],
  "comeback": "Komm zurück: +{x} XP, wenn du es direkt nach einem Fehler richtig machst.",
  "evoEmpty": "Beantworte ein paar Tickets in dieser Sprache, um deine Lernkurve zu sehen.",
  "evoAll": "Alle",
  "colGain": "Gewinn",
  "colModel": "Modell",
  "colAcc": "Genauigkeit",
  "printedOn": "Erstellt am {d}",
  "homeI18n": "Das Spiel gibt es in 20 Sprachen, denselben wie in der Übersetzungs- und Tokenisierungsanalyse, die das Projekt leitet. Rechts-nach-links-Schriften werden unterstützt, und Sprachen mit eigener Schrift bieten eine romanisierte Version.",
  "aiDebug": "Frage den Tutor um Hilfe",
  "telLive": "Dein bisheriger Prozess: {p} Einfügungen, {r} Ausführungen, {s} s.",
  "colPaste": "Einfügungen",
  "codeP": "Jede Einreichung speichert die Punktzahl, den Prozess, der dazu führte, und einen Fingerabdruck des gesendeten Codes.",
  "labP": "Freies Üben für alle, die weiter gehen wollen. Hier testest du, scheiterst und versuchst es erneut, so viel du willst: Deine Fertigkeits-Meisterschaft ändert sich nicht, und XP gibt es nur beim ersten Mal, wenn eine Herausforderung 60 % überschreitet. Jede Herausforderung öffnet sich, wenn die Mission ihrer Fertigkeit öffnet.",
  "labBest": "beste: {p}",
  "labXp": "+{x} XP, wenn du diese Herausforderung zum ersten Mal bestehst.",
  "ruleBroken": "Der Code funktioniert, aber er hat eine Herausforderungsregel gebrochen: Die Punktzahl wurde auf Befriedigend begrenzt.",
  "bonusH": "Bonus-Herausforderung",
  "compH": "Code-Kompetenzprofil",
  "xp": "XP",
  "navSettings": "Einstellungen",
  "cont": "Weitermachen, wo ich aufgehört habe",
  "openBrief": "Geschichte anhören und Theorie lernen",
  "resolved": "gelöst",
  "estTxt": "Geschätzte Beherrschung von {p}. ",
  "arsenal": "Theorie-Werkzeugkasten",
  "example": "Codebeispiel",
  "aiLabel": "KI-Tutor: ",
  "aiThinking": "Der Tutor denkt nach...",
  "bank": "Verfügbare Zeilen (tippen zum Verwenden)",
  "sol": "Dein Programm (Zeile antippen, um sie zurückzugeben)",
  "retroH": "Rückblick auf Sprint {n}",
  "retroB": "Gutes Tempo; schau dir die zurückgelassenen noch einmal an.",
  "colStart": "Sprintbeginn",
  "suggestion": "Vorschlag des Tutors für den nächsten Sprint: Konzentriere dich auf {s}, derzeit bei {p}.",
  "bySkill": "Beherrschung nach Fähigkeit",
  "colSbc": "SBC",
  "recPriority": "Priorität: {s} ({p} Beherrschung, {c} von {n} richtig).",
  "recHints": "Hinweise in {p} der Tickets verwendet. Versuche, eine Hypothese zu bilden, bevor du fragst.",
  "how": "Wie die Beherrschung berechnet wird",
  "howParams": "Designparameter, noch nicht mit Daten kalibriert: Tickets der Stufen 1, 2 und 3 haben Schwierigkeiten von -1,2, 0 und +1,2 Logits; anfänglicher Zuwachs 1,8, der mit jeder Antwort schrumpft, wobei Fehler mit 70 % gewichtet werden, um Ausrutscher zu tolerieren; Raten nach Format (1 von 4 bei Optionen, 1 pro Zeile bei Fehlern, 1 von 16 beim Klassifizieren, 5 % beim Ordnen, 3 % bei getippten Antworten und 50 % mit Hinweis). Freischaltung bei 60 %, Beherrschung bei {m}, an einem anderen Tag bestätigt. 3PL IRT, BKT, PFA und AFM beobachten nur.",
  "dataP": "Der Fortschritt wird nur in diesem Browser gespeichert. Das Protokoll folgt dem Langformat von Knowledge-Tracing-Datensätzen (Aufgabe, Fähigkeit, Korrektheit, Sprache, Programmiersprache, Zeitstempel).",
  "hideJson": "JSON-Protokoll ausblenden",
  "download": "JSON herunterladen",
  "aiH": "KI-Tutor",
  "aiKeyOn": "Konfiguriert mit deinem eigenen Schlüssel ({m}).",
  "typedLbl": "Tippe genau das, was das Programm ausgibt",
  "expected": "Korrekte Ausgabe: {a}",
  "timeLeft": "Zeit: {s} s",
  "lockedXp": "Gesperrt: Benötigt 60 % in {p} und {x} Lebenszeit-XP (du hast {y}).",
  "bossResult": "Ergebnis ansehen",
  "bossLoseP": "Du hast {x} XP von deinem Konto verloren. Schau dir die beteiligten Missionen an und komm für eine Revanche zurück.",
  "review": "Überprüfen",
  "shopH": "Shop",
  "kBosses": "Bosse besiegt",
  "cheers": [
   "Gut gemacht!",
   "Großartiges Code-Lesen!",
   "Genau richtig, scharfsinnige Überlegung!",
   "Ticket mit Stil geschlossen!"
  ],
  "need": "{n} XP nötig (kostet {c})",
  "evoX": "beantwortete Tickets",
  "colFirst": "Erste Schätzung",
  "plH": "Beherrschung nach Programmiersprache",
  "rom": "Romanisierten Text anzeigen (lateinisches Alphabet)",
  "pilotNote": "Ein Modell steuert das Spiel: Es berechnet die Beherrschung, schaltet Stufen frei und passt die Schwierigkeit an. Die anderen laufen im Hintergrund und zeichnen nur auf, was sie vor jeder Antwort vorhergesagt haben, zum späteren Vergleich. Der Prozentsatz neben jedem Namen ist die Beherrschungsschwelle dieses Modells.",
  "roleShadow": "beobachtet",
  "cmpP": "Vor jeder Antwort zeichnen die fünf Modelle die Wahrscheinlichkeit einer korrekten Antwort auf, die sie vorhergesagt haben. Brier misst den Vorhersagefehler (niedriger ist besser); AUC misst, ob das Modell richtige Antworten von Fehlern trennt (0,5 ist Zufall und 1 ist perfekt).",
  "confirmNote": "Beherrschung heute erreicht. Um sie zu bestätigen, löse ein Ticket dieser Fähigkeit an einem anderen Tag richtig: Eine einzelne Sitzung mischt Wissen mit Schwung.",
  "stC": "Noch an einem anderen Tag zu bestätigen",
  "repFor": "Schüler: {n}",
  "navHome": "Start",
  "homeSciH": "Wie das Werkzeug gebaut wurde",
  "bands": [
   "Unregelmäßig",
   "Befriedigend",
   "Gut",
   "Sehr gut",
   "Ausgezeichnet"
  ],
  "noExecH": "{l} läuft nicht im Browser.",
  "scored": "Punktzahl: {p} ({b})",
  "colScore": "Punktzahl",
  "colRuns": "Läufe",
  "colHash": "Fingerabdruck",
  "runnerNote": "Der Java- und C-Code der Schüler wird an diesen Server gesendet, um kompiliert und ausgeführt zu werden. Wenn das Feld leer ist, verlässt nichts den Browser.",
  "pilotFixed": "{m} steuert das Spiel: Es berechnet die Beherrschung, schaltet Stufen frei und wählt die Schwierigkeit, mit Beherrschung von {p}. BKT, PFA, AFM und 3PL IRT laufen bei jeder Antwort im Hintergrund und zeichnen nur auf, was sie vorhergesagt haben, zum Vergleich im Bericht-Tab und in den exportierten Daten.",
  "kindFree": "kostenlos",
  "compEmpty": "Noch keine zusätzliche Code-Herausforderung gelöst.",
  "navBoard": "Board",
  "roles": [
   "Praktikant",
   "Junior",
   "Mid-level",
   "Senior",
   "Staff"
  ],
  "ticketOf": "Ticket {n} von {m}",
  "missions": "Neue Missionen",
  "nothingDone": "Noch nichts. Nimm ein Ticket, um den Sprint zu öffnen.",
  "areaSE": "Softwaretechnik",
  "masteredTxt": "Gemeistert. ",
  "reread": "Geschichte und Theorie noch einmal lesen",
  "client": "Kunde",
  "bloom": [
   "Erinnern",
   "Verstehen",
   "Anwenden",
   "Analysieren",
   "Bewerten"
  ],
  "hint": "Einen Hinweis anfordern",
  "analogy": "Analogie: ",
  "masteredNow": "Fertigkeit gemeistert: {s}.",
  "unlockedNow": "Neue Mission freigeschaltet: {s}.",
  "retroA": "Sauberer Sprint.",
  "repH": "Lernbericht",
  "k4": "längste richtige Serie",
  "colMastery": "Beherrschung",
  "stB": "Zu öffnende Mission",
  "recs": "Empfehlungen des Tutors",
  "recBloom": "Kognitive Stufe mit den meisten Fehlern: {b} ({c} von {n}). Übe diese Art von Ticket in Ruhe, ohne Hinweise.",
  "howA": "Es ist die Schach-Wertungszahl. Einen starken Gegner zu schlagen bringt viel, einen schwachen zu schlagen bringt wenig, und gegen einen schwachen zu verlieren kostet viel. Hier ist der Gegner das Ticket.",
  "base": "Basis-URL",
  "clear": "Schlüssel entfernen",
  "saved": "Einstellungen gespeichert.",
  "keyNote": "Der Schlüssel wird nur in diesem Browser gespeichert (localStorage) und direkt an den Anbieter gesendet. Verwende ihn nicht auf einem gemeinsam genutzten Computer. Für den Unterricht bevorzuge einen lokalen Server (z. B. Ollama unter http://localhost:11434/v1), der keinen Schlüssel benötigt.",
  "navShop": "Shop",
  "bountiesH": "Sprint-Herausforderungen",
  "dailyH": "Tägliche Herausforderung",
  "dailyDone": "Tägliche Herausforderung geschafft. Morgen kommt eine neue.",
  "bossStage": "Stufe {n} von {m}",
  "bossWin": "Boss besiegt",
  "reward": "Belohnung: {x} XP",
  "shopA": "Das sind die Meilen eines Vielfliegerprogramms. Du gibst das Guthaben für Tickets aus; dein Kartenstatus hängt von den insgesamt geflogenen Meilen ab und sinkt nicht, wenn du sie einlöst.",
  "equipped": "In Gebrauch",
  "keepGoing": "Dieses Ticket kommt später für eine Revanche auf das Board zurück.",
  "streakMsg": "{n} in Folge! Serienbonus: +5 XP.",
  "colTries": "Tickets",
  "plA": "Wer ein Auto mit Schaltgetriebe fahren kann, fängt bei einem Automatikauto nicht wieder bei null an, braucht aber ein paar Runden um den Block, um zu zeigen, dass er sich angepasst hat.",
  "plAcc": "Richtig",
  "printBtn": "Drucken oder als PDF speichern",
  "homeSbc": "Die 14 Missionen decken Programmierung und Softwaretechnik ab, und jede gibt die Kompetenzen aus den SBC-Richtlinien für Lehrpläne (2017) an, die sie trainiert. Dasselbe Konzept erscheint in vier Programmiersprachen, mit demselben Lösungsschlüssel.",
  "codeFn": "Schreibe die Funktion {f}. Der Name muss genau so lauten.",
  "runBtn": "Ausführen",
  "codeH": "Übungen mit freiem Code",
  "colTime": "Zeit",
  "codeAuth": "Was das beweist und was nicht: Der Fingerabdruck und der Zeitstempel beweisen, dass dieser Code zu diesem Zeitpunkt eingereicht wurde; die Anzahl der Einfügungen und die Zeit beschreiben den Prozess. Nichts davon beweist die Urheberschaft, denn alles wird im Browser des Lernenden aufgezeichnet. Für eine benotete Prüfung ergänze betreute Arbeit oder eine Verteidigung des Codes selbst.",
  "codeHidden": "Übungen mit freiem Code in {l} bleiben ausgeblendet, bis ein Lehrer einen Ausführungsdienst einrichtet. In Python und JavaScript erscheinen sie wie üblich.",
  "runnerToken": "Autorisierungstoken (falls der Dienst einen benötigt)",
  "runnerOn": "Java und C: Ausführung an.",
  "labH": "Code-Werkstatt",
  "labLocked": "öffnet sich mit der Mission",
  "labOk": "Herausforderung in der Werkstatt gelöst!",
  "labAgain": "Du hattest diese Herausforderung schon bestanden: diesmal keine XP, nur Übung.",
  "labNoMastery": "In der Werkstatt ändert sich die Beherrschung einer Fertigkeit nicht. Damit es zählt, löse die Bonus-Herausforderungen auf dem Board.",
  "tryAgain": "Noch einmal versuchen",
  "needsRunner": "benötigt einen Dienst",
  "rulesH": "Regeln der Herausforderung:",
  "rulesCap": "Wenn der Code funktioniert, aber eine Regel verletzt, wird die Punktzahl auf Befriedigend (59%) begrenzt."
 },
 "sbc": {
  "CC-C.1.3": "RF-CC C.1.3: Probleme mithilfe von Programmierumgebungen lösen (Algorithmen, Programmiertechniken, Datenstrukturen).",
  "ES-C.1.1": "RF-ES C.1.1: Probleme lösen, die eine algorithmische Lösung haben (Algorithmen, Programmierung, Datenstrukturen).",
  "ES-C.6.4": "RF-ES C.6.4: Die im Softwareprodukt zu verwendenden Technologien anwenden (Programmiertechniken und -paradigmen).",
  "ES-C.5.3": "RF-ES C.5.3: Techniken und Verfahren zur Anforderungsspezifikation anwenden (Ermittlung, Spezifikation, Validierung und Verwaltung).",
  "ES-C.4.2": "RF-ES C.4.2: Softwarekonstruktionsprozesse anwenden (Konzept und Modelle von Softwareprozessen).",
  "ES-C.4.4": "RF-ES C.4.4: Softwareprojekte verwalten (Umfang, Zeit, Qualität, Kommunikation, Risiken, Stakeholder).",
  "ES-C.6.3": "RF-ES C.6.3: Die Softwarekonstruktionsumgebung definieren (Werkzeuge für das Konfigurationsmanagement).",
  "ES-C.6.2": "RF-ES C.6.2: Statische und dynamische Verifikations- und Validierungstechniken und -verfahren anwenden.",
  "ES-C.7.3": "RF-ES C.7.3: Verifikations- und Validierungstechniken und -verfahren im Rahmen der Softwarequalität anwenden.",
  "ES-C.6.1": "RF-ES C.6.1: Softwareentwicklungstechniken und -verfahren anwenden (Entwurfsprinzipien, Muster, Wiederverwendung).",
  "ES-C.6.7": "RF-ES C.6.7: Prinzipien, Muster und bewährte Praktiken der Softwareentwicklung anwenden.",
  "ES-C.4.3": "RF-ES C.4.3: Techniken und Verfahren für Softwarewartung und -evolution anwenden (Refactoring).",
  "ES-C.5.4": "RF-ES C.5.4: Techniken der Softwaremodellierung anwenden (statische, funktionale und dynamische Modelle).",
  "ES-C.7.1": "RF-ES C.7.1: Die Qualitätsattribute eines Softwareprodukts und ihren Zweck verstehen.",
  "ES-C.7.2": "RF-ES C.7.2: Mechanismen zur Messung der Softwareproduktqualität anwenden (Metriken und Bewertungstechniken).",
  "ES-C.6.5": "RF-ES C.6.5: Techniken zur Integration der Systemteile anwenden (Integrationsumgebungen, Build-Werkzeuge)."
 },
 "skills": {
  "var": {
   "name": "Variablen",
   "about": "Werte speichern, Typen und grundlegende Operatoren.",
   "client": "Dona Lúcias Bäckerei",
   "title": "Die Kasse, die nie stimmt",
   "story": "Jeden Abend schließt Dona Lúcia die Bäckereikasse in einem Notizbuch, und die Zahlen stimmen nie überein. Ihr Neffe hat eine Tabellenkalkulation erstellt, aber der Brotpreis wurde als Text eingegeben, und das Addieren von zwei Broten ergab \"4.504.50\". Sie bittet um etwas Einfaches: Preis, Menge und Wechselgeld fehlerfrei erfassen. Bevor es irgendeinen schönen Bildschirm gibt, muss das System jede einzelne Information mit dem richtigen Typ speichern.",
   "theory": [
    [
     "Eine Variable ist ein Name für einen Wert",
     "Sie hält ein Stück Daten im Speicher für die spätere Verwendung. Die Zuweisung kopiert den Wert zu diesem Zeitpunkt; sie stellt keine dauerhafte Verbindung zwischen zwei Variablen her."
    ],
    [
     "Jeder Wert hat einen Typ",
     "Ganzzahlen, Dezimalzahlen, Text und boolesche Werte verhalten sich unterschiedlich. Bei Text verbindet +; bei Zahlen addiert es. Geld erfordert eine Dezimalzahl; Menge erfordert eine Ganzzahl."
    ],
    [
     "Ganzzahldivision und Rest",
     "Die Ganzzahldivision entfernt den Dezimalteil, und der %-Operator gibt den Rest zurück. Sie sind die Grundlage für Wechselgeld, Parität und das Aufteilen in Gruppen."
    ]
   ]
  },
  "cond": {
   "name": "Bedingungen",
   "about": "Den Programmweg mit if, else if und else wählen.",
   "client": "Gesundheitsstation im Viertel",
   "title": "Die Schlange, die nicht nach Ankunft bedient werden kann",
   "story": "In der Gesundheitsstation macht Krankenschwester Rosa die Triage im Kopf: Hohes Fieber kommt zuerst dran, ältere Menschen haben Vorrang, alle anderen warten. Wenn sie nicht da ist, wird die Schlange nach Ankunft bedient, und ein ernster Fall wartet zwei Stunden. Die Klinik möchte, dass das System Rosas Regeln jedes Mal anwendet, einschließlich Grenzfällen wie Fieber von genau 39 Grad.",
   "theory": [
    [
     "Eine Bedingung ist eine Ja-oder-Nein-Frage",
     "Das Programm wertet einen booleschen Ausdruck aus und folgt einem einzigen Pfad. Operatoren wie >, >= und == legen genau fest, wo die Grenze liegt."
    ],
    [
     "Die Reihenfolge der Tests ist wichtig",
     "In einer if / else if-Kette gewinnt der erste wahre Test, und der Rest wird nicht einmal ausgewertet. Die strengste Regel muss zuerst kommen."
    ],
    [
     "Bedingungen kombinieren",
     "UND (and, &&) erfordert, dass beide wahr sind; ODER (or, ||) erfordert mindestens eines. UND wird vor ODER ausgewertet; im Zweifelsfall Klammern verwenden."
    ]
   ]
  },
  "loop": {
   "name": "Schleifen",
   "about": "Wiederholen von Anweisungen mit for und while.",
   "client": "Städtische Schule Paulo Freire",
   "title": "Vierhundert Zeugnisse von Hand",
   "story": "Marta, die Schulsekretärin, berechnet den Durchschnitt von 400 Schülern mit einem Taschenrechner, einen nach dem anderen, jedes Trimester. Es dauert drei Tage und ein Fehler schleicht sich immer ein. Die Berechnung ist für alle gleich; nur die Noten ändern sich. Es ist das Bild einer Aufgabe, die nach automatischer Wiederholung verlangt: Schreibe die Regel einmal und lasse den Computer die ganze Liste durchgehen.",
   "theory": [
    [
     "for: für jedes Element wiederholen",
     "Verwende es, wenn die Anzahl der Wiederholungen bekannt ist: jeder Schüler in der Liste, jede Zahl von 0 bis n-1. Die Zählung beginnt normalerweise bei 0 und stoppt vor der Grenze."
    ],
    [
     "while: wiederholen, solange etwas wahr ist",
     "Verwende es, wenn du nicht weißt, wie viele Runden es geben wird. Etwas innerhalb der Schleife muss sich auf den Ausgang zubewegen, sonst endet sie nie."
    ],
    [
     "Das Akkumulator-Muster",
     "Eine Variable beginnt mit einem neutralen Wert (0, leer, erstes Element) und wird in jeder Runde aktualisiert: Summe, Anzahl, größter Wert."
    ]
   ]
  },
  "func": {
   "name": "Funktionen",
   "about": "Logik verpacken: Parameter, Rückgabe und Gültigkeitsbereich.",
   "client": "Lieferkooperative Roda Viva",
   "title": "Versandkosten an drei Stellen berechnet",
   "story": "Die Kurierkooperative berechnet den Versand auf der Website, in der App und in der Finanztabelle. Als der Kilometerpreis stieg, hat jemand nur zwei der drei Stellen aktualisiert, und eine Woche lang wurden die Kuriere unterbezahlt. Es gibt eine Regel; sie muss an einem Ort leben und von allen aufgerufen werden.",
   "theory": [
    [
     "Eine Funktion ist eine Regel mit einem Namen",
     "Sie nimmt Parameter entgegen, führt Schritte aus und gibt ein Ergebnis mit return zurück. Einmal definieren und überall aufrufen beseitigt abweichende Kopien."
    ],
    [
     "Zurückgeben ist nicht Ausgeben",
     "Ausgeben zeigt den Wert auf dem Bildschirm; Zurückgeben übergibt den Wert an den Aufrufer, der ihn in weiteren Berechnungen verwenden kann."
    ],
    [
     "Gültigkeitsbereich und Wertübergabe",
     "Variablen, die innerhalb einer Funktion erstellt werden, sind lokal und verschwinden am Ende. Zahlen, die als Argumente übergeben werden, kommen als Kopien an: Sie innerhalb der Funktion zu ändern, ändert nicht das Original."
    ]
   ]
  },
  "col": {
   "name": "Collections",
   "about": "Listen und Wörterbücher, Indizes und Referenzen.",
   "client": "Gemeindebibliothek Casa das Letras",
   "title": "Das Ausleihheft ist weg",
   "story": "Die Gemeindebibliothek hielt ihre Ausleihen in einem Notizbuch fest, das beim letzten Sturm durchnässt wurde. Herr Antônio möchte wissen, welche Bücher es gibt, wie viele Exemplare von jedem vorhanden sind und wer was hat. Das ist eine Menge gleichartiger Daten: lose Variablen können das nicht fassen. Es ist Zeit, Daten in Collections zu organisieren.",
   "theory": [
    [
     "Liste: eine geordnete Folge",
     "Sie enthält mehrere Werte, auf die über die Position zugegriffen wird. Der Index beginnt bei 0, eine Liste mit 3 Elementen läuft also von Index 0 bis 2."
    ],
    [
     "Wörterbuch oder Map: Nachschlagen über einen Schlüssel",
     "Es verknüpft einen Schlüssel mit einem Wert, etwa Titel mit Exemplaranzahl. Es ist die richtige Wahl, wenn man nach Name statt nach Position sucht."
    ],
    [
     "Collections werden per Referenz geteilt",
     "Wenn man eine Liste einer anderen Variablen zuweist, werden die Daten nicht kopiert: beide Namen zeigen auf dieselbe Collection. Um sie zu duplizieren, muss man explizit kopieren."
    ]
   ]
  },
  "rec": {
   "name": "Rekursion",
   "about": "Funktionen, die sich selbst aufrufen, und der Basisfall.",
   "client": "Notariat des 2. Bezirks",
   "title": "Ordner in Ordnern in Ordnern",
   "story": "Das Notariat hat 40 Jahre Dokumente in Ordner in Ordnern gescannt, ohne einheitliche Tiefe. Helena, die Angestellte, muss zählen, wie viele Dateien insgesamt vorhanden sind. Eine einfache Schleife reicht nicht, weil jeder Ordner weitere enthalten kann. Die natürliche Lösung ist: Zähle die Dateien in diesem Ordner und wiederhole dasselbe Verfahren für jeden Unterordner.",
   "theory": [
    [
     "Ein Problem, das durch sich selbst definiert ist",
     "Die Funktion löst einen kleinen Teil und delegiert den Rest an einen Aufruf von sich selbst auf ein kleineres Problem."
    ],
    [
     "Basisfall: die Bremse",
     "Das ist die einfache Situation, die ohne neuen Aufruf beantwortet wird (leerer Ordner, n gleich 0). Jeder rekursive Aufruf muss sich darauf zubewegen."
    ],
    [
     "Der Aufrufstapel",
     "Jeder Aufruf wartet, bis der nächste fertig ist. Was nach dem rekursiven Aufruf kommt, wird erst auf dem Rückweg ausgeführt, vom innersten zum äußersten."
    ]
   ]
  },
  "req": {
   "name": "Anforderungen",
   "about": "Herausfinden und Festhalten, was die Software tun muss.",
   "client": "Gesundheitszentrum im Viertel",
   "title": "\"Ich will eine App\"",
   "story": "Die Leiterin des Gesundheitszentrums kommt entschlossen zum Meeting: \"Ich will eine App wie die von meiner Bank\". Nach einer halben Stunde Gespräch zeigt sich das eigentliche Problem: Patientinnen und Patienten verpassen Termine, weil sie das Datum vergessen, und 30% der Slots bleiben ungenutzt. Vielleicht ist die Lösung eine einfache SMS-Erinnerung. Wer das baut, was bestellt wurde, ohne zu verstehen, was gebraucht wird, liefert pünktlich die falsche Software.",
   "theory": [
    [
     "Bedürfnisse vor Lösungen",
     "Kundinnen und Kunden beschreiben Lösungen; die Entwicklerin untersucht das Problem dahinter mit Interviews, Beobachtung und Prototypen (Anforderungsermittlung)."
    ],
    [
     "Funktional und nicht-funktional",
     "Funktional ist, was das System tut (Termin planen, erinnern). Nicht-funktional ist, wie gut es das tut (Antwortzeit, Sicherheit, Verfügbarkeit)."
    ],
    [
     "Eine gute Anforderung ist überprüfbar",
     "\"Schnell\" und \"benutzerfreundlich\" kann man nicht testen. \"Antwortet innerhalb von 2 s bei 95% der Anfragen\" schon. User Stories folgen dem Muster: Als [Rolle] möchte ich [Aktion], damit [Nutzen]."
    ]
   ]
  },
  "agil": {
   "name": "Agile",
   "about": "Sprints, MVP und inkrementelle Auslieferung.",
   "client": "Städtische Schule Paulo Freire",
   "title": "Anmeldung beginnt in sechs Wochen",
   "story": "Die Schule möchte ein vollständiges Anmeldesystem mit Zeugnissen, Essen und Transport. Die Anmeldung beginnt in sechs Wochen, und die Wunschliste würde sechs Monate dauern. Wenn das Team verschwindet und erst zurückkommt, wenn alles fertig ist, ist es zu spät. Der Ausweg ist, zuerst den wesentlichen Teil funktionsfähig zu liefern, die Anmeldung, und aus der tatsächlichen Nutzung zu wachsen.",
   "theory": [
    [
     "In kurzen Zyklen liefern",
     "Ein Sprint hat eine feste Länge und endet mit einem nutzbaren Inkrement. Das Feedback echter Nutzer leitet den nächsten Zyklus."
    ],
    [
     "MVP: früh lernen",
     "Das Minimum Viable Product löst das Kernproblem durchgängig im kleinen Maßstab, um Hypothesen zu validieren, bevor mehr investiert wird."
    ],
    [
     "Der Umfang ist die Stellschraube",
     "Termin und Qualität bleiben fest; was hineinkommt, wird verhandelt. Die Begrenzung paralleler Arbeit hilft dem Team, etwas zu beenden, bevor es etwas Neues beginnt."
    ]
   ]
  },
  "git": {
   "name": "Git",
   "about": "Code versionieren: Commits, Branches und Merges.",
   "client": "Das Ponte-Team",
   "title": "Der Freitag, an dem der Code verschwand",
   "story": "Am Freitagnachmittag bearbeiteten Caio und Bia dieselbe Datei des Bäckerei-Systems. Jeder speicherte seine Version im gemeinsamen Ordner als \"final_diesmal_wirklich_final.zip\". Der letzte Speichervorgang überschrieb die Arbeit des anderen, und niemand konnte sagen, welche Version live war. Ponte beschloss: Ab Montag liegt der gesamte Code in einem Git-Repository.",
   "theory": [
    [
     "Commit: ein Schnappschuss mit Beschreibung",
     "Er hält den Zustand des Projekts mit Autor, Datum und Nachricht fest. Klare Nachrichten sagen, was sich geändert hat und warum."
    ],
    [
     "Branch: parallel arbeiten",
     "Jedes Feature entsteht auf einem isolierten Branch, und der Hauptzweig bleibt stabil, bis Überprüfung und Integration (Merge) stattfinden."
    ],
    [
     "Ein Konflikt ist eine Bitte um Entscheidung",
     "Wenn zwei Branches dieselben Zeilen ändern, entscheidet Git nicht allein: Es zeigt beide Versionen und bittet jemanden, zu entscheiden."
    ]
   ]
  },
  "test": {
   "name": "Testen",
   "about": "Code mit automatisierten Tests überprüfen.",
   "client": "Dona Lúcias Bäckerei",
   "title": "Der Rabatt, der zu viel berechnete",
   "story": "Die Bäckerei führte 10% Rabatt für Einkäufe ab 50 Reais ein. Eine Kundin gab genau 50 aus und bekam keinen Rabatt; eine andere bekam ihn doppelt. Dona Lúcia erstattete die ganze Woche Geld zurück. Der Fehler lag in einem Grenzwertvergleich, den niemand getestet hatte. Ein dreizeiliger automatisierter Test hätte Alarm geschlagen, bevor es die Kundin tat.",
   "theory": [
    [
     "Unit-Test",
     "Er prüft eine kleine isolierte Einheit, wie eine Funktion, schnell und wiederholbar. Das Muster ist Arrange, Act, Assert."
    ],
    [
     "Grenzwerte",
     "Fehler häufen sich an den Grenzen von Regeln. Teste knapp darunter, genau auf und knapp über der Grenze."
    ],
    [
     "Regressionstests und die Grenzen des Testens",
     "Jeder behobene Fehler bekommt einen Test, der ihn reproduziert, damit er nie wiederkehrt. Tests zeigen das Vorhandensein von Fehlern, beweisen aber nicht deren Abwesenheit."
    ]
   ]
  },
  "design": {
   "name": "Design",
   "about": "Kohäsion, Kopplung, SOLID und Refactoring.",
   "client": "Lieferkooperative Roda Viva",
   "title": "Noch eine Zahlungsart, noch ein Flicken",
   "story": "Die Kooperative nahm Bargeld; dann kamen Karten, dann Sofortzahlungen per Pix, jetzt Essensgutscheine. Bei jeder Neuerung fügt jemand ein weiteres \"if\" zu einer 300 Zeilen langen Funktion hinzu, die niemand anzufassen wagt. Nach der letzten Änderung funktionierte Pix zwei Tage lang nicht. Die Software funktioniert, aber sie ist teuer zu ändern. Das ist ein Designproblem.",
   "theory": [
    [
     "Hohe Kohäsion, geringe Kopplung",
     "Jedes Modul kümmert sich um ein Thema und hängt wenig von den anderen ab. So kann es isoliert verstanden, getestet und ersetzt werden."
    ],
    [
     "SOLID-Prinzipien",
     "Single Responsibility: ein Grund für Änderungen. Open/Closed: erweitern ohne zu bearbeiten, was bereits funktioniert. Dependency Inversion: von Schnittstellen abhängen, nicht von konkreten Implementierungen."
    ],
    [
     "Refactoring",
     "Struktur verbessern ohne das Verhalten zu ändern, in kleinen Schritten, die durch Tests abgesichert sind: Funktion extrahieren, Duplikate entfernen, klare Namen vergeben."
    ]
   ]
  },
  "model": {
   "name": "Modellierung",
   "about": "Diagramme, die das Team vor dem Code ausrichten: Anwendungsfälle, Klassen und Sequenzen.",
   "client": "Gemeindebibliothek Casa das Letras",
   "title": "Drei Menschen, drei Systeme im Kopf",
   "story": "Bevor das Team die Ausleihe programmierte, setzte es sich mit Herrn Antônio, einer Freiwilligen und einem Leser zusammen. Jeder beschrieb \"das System\", und es klang nach drei verschiedenen Produkten: Für den einen hatte ein Buch mehrere Exemplare, für den anderen war jedes Exemplar ein Buch. Niemand hatte unrecht; es fehlte ein gemeinsames Bild. Ein einfaches Diagramm an der Wand klärte in zwanzig Minuten, was drei Besprechungen nicht geschafft hatten.",
   "theory": [
    [
     "Ein Modell ist eine Vereinfachung mit einem Zweck",
     "Ein Diagramm zeigt nur, was zur Beantwortung einer Frage wichtig ist: wer was nutzt, welche Daten es gibt, in welcher Reihenfolge Dinge geschehen. Es bringt Menschen auf einen Stand, bevor Code existiert."
    ],
    [
     "Drei Sichtweisen, die sich ergänzen",
     "Anwendungsfälle zeigen, wer was tut (funktionale Sicht). Das Klassendiagramm zeigt Konzepte und ihre Beziehungen (statische Sicht). Das Sequenzdiagramm zeigt Nachrichten, die im Laufe der Zeit ausgetauscht werden (dynamische Sicht)."
    ],
    [
     "Beziehungen und Multiplizitäten",
     "Ein Buch hat viele Exemplare; ein Exemplar gehört zu einem einzigen Buch. Die Angabe von 1 und * an den Enden der Linie verhindert das teuerste Missverständnis in einem System: das im Datenmodell."
    ]
   ]
  },
  "qual": {
   "name": "Qualität",
   "about": "Qualitätsattribute, Code-Review, Metriken und technische Schulden.",
   "client": "Das Team von Ponte",
   "title": "Der Code, den nur Caio versteht",
   "story": "Caio ging in den Urlaub und das System der Bäckerei fiel aus. Bia öffnete den Code: Variablen mit Namen wie x1 und x2, eine 400 Zeilen lange Funktion, kein Hinweis darauf, warum Entscheidungen getroffen wurden. Sie brauchte zwei Tage, um eine Zeile zu korrigieren. Der Code funktionierte, aber nur für die Person, die ihn geschrieben hatte. Ponte entschied: Keine Änderung erreicht die Hauptlinie, bevor nicht jemand anderes sie gelesen hat.",
   "theory": [
    [
     "Qualität hat mehrere Attribute",
     "Über das Funktionieren hinaus muss Software lesbar, testbar, sicher, effizient und leicht änderbar sein. ISO/IEC 25010 ordnet diese Attribute; Wartbarkeit wirkt sich über die Jahre am stärksten auf die Kosten aus."
    ],
    [
     "Code-Review",
     "Jemand anderes liest die Änderung, bevor sie zusammengeführt wird (Pull Request). Kleine, häufige Reviews decken Fehler früh auf, verbreiten Wissen und verhindern, dass das System von einem einzelnen Kopf abhängt. Das Ziel ist der Code, niemals der Autor."
    ],
    [
     "Technische Schulden und Messung",
     "Die Abkürzungen von heute fordern morgen Zinsen: Jede Änderung wird langsamer. Metriken wie zyklomatische Komplexität, Duplikation und Abdeckung, erhoben durch statische Analyse, zeigen, wo sich die Schulden anhäufen."
    ]
   ]
  },
  "devops": {
   "name": "Continuous Delivery",
   "about": "Kontinuierliche Integration und Auslieferung, reproduzierbare Umgebungen und Rollback.",
   "client": "Liefergenossenschaft Roda Viva",
   "title": "\"Auf meinem Rechner läuft es\"",
   "story": "Die neue Version der App lief auf Bias Laptop einwandfrei. Auf dem Server brach sie zusammen: eine andere Sprachversion, eine fehlende Bibliothek, eine vergessene Einstellung. Das Veröffentlichen war ein manuelles Ritual aus 23 Schritten, notiert in einem Heft, durchgeführt in den frühen Morgenstunden einmal im Monat, immer mit Angst. Das Team möchte, dass das Veröffentlichen ein Nicht-Ereignis wird: automatisch, wiederholbar und umkehrbar.",
   "theory": [
    [
     "Kontinuierliche Integration (CI)",
     "Bei jedem Push baut ein Server das Projekt von Grund auf neu und führt alle Tests aus. Wenn etwas kaputtgeht, erfährt das Team es innerhalb von Minuten, solange die Behebung noch günstig ist."
    ],
    [
     "Continuous Delivery (CD)",
     "Derselbe automatisierte Prozess trägt die Software bis in die Produktion: Build, Tests, Paketierung und Veröffentlichung. Manuelle Schritte werden zu Skripten, und was wiederholbar ist, hört auf, beängstigend zu sein."
    ],
    [
     "Identische Umgebungen und ein schneller Weg zurück",
     "In einer Datei deklarierte Abhängigkeiten und standardisierte Umgebungen machen \"Auf meinem Rechner läuft es\" ein Ende. Kleine, häufige Releases mit einem Rollback in Reichweite verringern den Schaden jedes Fehlers."
    ]
   ]
  }
 },
 "items": {
  "v1": {
   "title": "Das Etikett, das umzog",
   "prompt": "Dona Lúcia hat den alten Preis kopiert, bevor sie ihn erhöhte. Was gibt das Programm aus?",
   "hint": "Geh Zeile für Zeile vor: Welchen Wert hatte x in dem Moment, als y ihn bekam?",
   "why": "y erhält eine Kopie des Wertes, den x in diesem Moment hatte (5). x später zu ändern, beeinflusst y nicht.",
   "analogy": "Eine Variable ist ein Etikett auf einem Wert. y hat sein eigenes Etikett auf der 5 bekommen; das x-Etikett auf die 8 zu verschieben, berührt y's nicht."
  },
  "v2": {
   "title": "Die Summe, die nicht addiert",
   "prompt": "Das war der Tabellenkalkulationsfehler des Neffen. Was gibt das Programm aus?",
   "hint": "Schau auf die Anführungszeichen: Sind diese Werte Zahlen oder Text?",
   "why": "In Anführungszeichen sind 3 und 4 Text. Bei Text fügt die Operation zusammen, statt zu addieren.",
   "analogy": "Strings sind Perlenketten: Zwei Ketten aneinanderzureihen ergibt eine längere Kette, keine Summe. Um zu addieren, konvertiere zuerst in Zahlen."
  },
  "v3": {
   "title": "Ein Tausch, der einen Wert verliert",
   "prompt": "Der Code sollte a und b tauschen, gibt aber 2 2 aus. In welcher Zeile geht der ursprüngliche Wert von a verloren?",
   "hint": "Nach welcher Zeile existiert die Zahl 1 in keiner Variable mehr?",
   "why": "Wenn a b erhält, wird die 1 überschrieben, ohne gesichert zu werden. Ein korrekter Tausch verwendet eine temporäre Variable.",
   "analogy": "Um den Inhalt zweier Gläser zu tauschen, brauchst du ein drittes Glas. Das eine direkt in das andere zu gießen, verliert eines der Getränke."
  },
  "v4": {
   "title": "Das Wechselgeld aufteilen",
   "prompt": "Sieben Münzen auf zwei Kassen aufgeteilt. Was gibt das Programm aus?",
   "hint": "Ganzzahldivision verwirft den Dezimalteil; % gibt den Rest zurück.",
   "why": "Die Ganzzahldivision von 7 durch 2 ist 3 und der Rest ist 1.",
   "analogy": "7 Bonbons zwischen 2 Kindern teilen: Jedes bekommt 3 und 1 bleibt auf dem Tisch."
  },
  "v5": {
   "title": "Der richtige Typ für einen Preis",
   "prompt": "Welcher Datentyp speichert am besten den Preis 4,50 eines Brotlaibs?",
   "opts": [
    "Dezimalzahl (Gleitkomma)",
    "Ganzzahl",
    "Text",
    "Boolescher Wert"
   ],
   "hint": "Der Wert hat Centbeträge und wird in Berechnungen verwendet.",
   "why": "Ein Preis hat Dezimalstellen und ist an Arithmetik beteiligt, also braucht er einen dezimalen numerischen Typ. Als Text könnte er nicht addiert werden; als Ganzzahl würden die Cent verloren gehen.",
   "analogy": "Es ist die Wahl des richtigen Behälters: Wasser kommt in eine Flasche, nicht in ein Sieb. Jeder Datentyp wurde für eine Art von Inhalt gemacht."
  },
  "c1": {
   "title": "Ein Fieber von genau 39",
   "prompt": "Eine Grenzwertregel bei der Triage. Was gibt das Programm aus?",
   "hint": ">= bedeutet größer als ODER gleich.",
   "why": "7 >= 7 ist wahr, also läuft nur der erste Block und das else wird übersprungen.",
   "analogy": "if/else ist eine Weggabelung: Das Auto nimmt nur eine Seite, niemals beide."
  },
  "c2": {
   "title": "Die Reihenfolge von Rosas Regeln",
   "prompt": "Die Regeln wurden in dieser Reihenfolge geschrieben. Was gibt das Programm aus?",
   "hint": "Sobald ein Test in der Kette wahr ist, werden die folgenden gar nicht erst ausgewertet.",
   "why": "30 > 20 ist bereits wahr, also wird nur A ausgegeben. Die strengere Bedingung (t > 28) sollte zuerst kommen.",
   "analogy": "Es ist eine Reihe von Drehkreuzen: Wer das erste passiert, versucht die anderen nicht. Das anspruchsvollste Drehkreuz muss vorne stehen."
  },
  "c3": {
   "title": "Gerade oder ungerade Ticketnummer",
   "prompt": "Die Klinik ruft gerade Nummern zu Schalter 1 und ungerade zu Schalter 2. Baue das Programm, das die Nummer klassifiziert.",
   "hint": "Zuerst existieren die Daten; dann kommt der Test auf den Rest der Division durch 2.",
   "why": "Die Daten müssen existieren, bevor der Test kommt. Ein Rest von null bei Division durch 2 bedeutet gerade; else deckt alles andere ab.",
   "analogy": "Wie bei der Triage: Zuerst kommt der Patient an, dann kommt die Frage, und jede Antwort führt zu einem Raum."
  },
  "c4": {
   "title": "Wer zuerst kommt: UND oder ODER",
   "prompt": "Ist das Ergebnis des Ausdrucks wahr oder falsch?",
   "opts": [
    "Wahr",
    "Falsch",
    "Fehler",
    "Es hängt von der Sprache ab"
   ],
   "hint": "So wie die Multiplikation vor der Addition kommt, wird ein logischer Operator zuerst ausgewertet.",
   "why": "UND hat Vorrang vor ODER. Zuerst ergibt falsch UND falsch falsch; dann ergibt wahr ODER falsch wahr. Das gilt in allen vier Sprachen des Spiels.",
   "analogy": "Wie bei 2 + 3 × 0: Zuerst wird die Multiplikation ausgeführt. UND ist die Multiplikation der Logik; im Zweifel setze Klammern."
  },
  "c5": {
   "title": "Sechzig und kein Rabatt",
   "prompt": "Personen, die genau 60 Jahre alt sind, sollten den halben Preis zahlen, zahlen aber den vollen. Welche Zeile muss korrigiert werden?",
   "hint": "Teste es im Kopf mit 60: Ist die Bedingung wahr?",
   "why": "60 > 60 ist falsch. Die Regel „ab 60“ verlangt >=. Grenzfehler gehören zu den häufigsten Fehlern in Bedingungen.",
   "analogy": "Es ist das Schild „Mindestgröße 1,40 m“ mit einem Wächter, der alle anhält, die genau 1,40 m groß sind. Die Regel ist richtig; der Vergleich ist falsch."
  },
  "l1": {
   "title": "Wo das Zählen beginnt",
   "prompt": "Welche Werte gibt die Schleife aus?",
   "hint": "Das Zählen beginnt bei 0 und endet vor 3.",
   "why": "Sie erzeugt 0, 1 und 2: drei Werte, beginnend bei null und ohne die 3.",
   "analogy": "Wie Stockwerke in einem Gebäude, das auf Erdgeschossniveau (0) beginnt: Drei Stockwerke gehen von 0 bis 2."
  },
  "l2": {
   "title": "Die Noten zusammenzählen",
   "prompt": "Was gibt das Programm aus?",
   "hint": "Die Schleife schließt 1 ein und lässt 5 weg.",
   "why": "Die Schleife durchläuft 1, 2, 3 und 4, und die Summe ist 10. Die Obergrenze wird ausgelassen.",
   "analogy": "total ist ein Sparschwein: In jeder Runde wird eine Münze im Wert von i hineingeworfen. Am Ende zählst du, was drin ist."
  },
  "l3": {
   "title": "Countdown ohne Ende",
   "prompt": "Der Code soll 3, 2, 1 und dann „Ende“ ausgeben, aber er hört nie auf. Welche Zeile muss korrigiert werden?",
   "hint": "Damit die Schleife stoppt, muss n > 0 irgendwann falsch werden.",
   "why": "Das Addieren von 1 entfernt n von null, daher ist die Bedingung immer wahr. Die Lösung ist, 1 zu subtrahieren.",
   "analogy": "Es ist, als ob man eine Treppe hinuntergeht, aber bei jedem Schritt eine Stufe hinaufsteigt: Man erreicht nie das Erdgeschoss. Jede while-Schleife muss sich auf den Ausgang zubewegen."
  },
  "l4": {
   "title": "Die höchste Note der Klasse",
   "prompt": "Marta möchte die höchste Note in der Liste. Baue das Programm zusammen.",
   "hint": "Beginne mit der Annahme, die erste sei die höchste; vergleiche dann mit jeder.",
   "why": "Das Muster ist: anfängliche Vermutung (erstes Element), alles durchgehen, den Champion ersetzen, wenn jemand höher auftaucht, und erst nach der Schleife ausgeben.",
   "analogy": "Es ist „König des Hügels“: Der erste klettert auf den Hügel und jeder Herausforderer übernimmt nur, wenn er höher ist. Wer am Ende dort ist, ist das Maximum."
  },
  "l5": {
   "title": "Wie oft kann man es halbieren",
   "prompt": "Was gibt das Programm aus?",
   "hint": "Verfolge n in jeder Runde: 16, 8, ...",
   "why": "n durchläuft 8, 4, 2 und 1: vier Divisionen, bis n > 1 falsch wird.",
   "analogy": "Ein Blatt Papier immer wieder in der Mitte falten: Die while-Schleife weiß nicht im Voraus, wie viele Faltungen es geben wird; sie hört einfach auf, wenn keine mehr möglich sind."
  },
  "f1": {
   "title": "Den zurückgegebenen Wert verwenden",
   "prompt": "Was gibt das Programm aus?",
   "hint": "return übergibt das Ergebnis an denjenigen, der die Funktion aufgerufen hat.",
   "why": "Die Funktion gibt 8 zurück, die in r gespeichert wird. Dann ist 8 + 1 = 9.",
   "analogy": "Eine Funktion ist ein Entsafter: Obst geht hinein (Argument) und ein Glas kommt heraus (Rückgabewert), das du nach Belieben verwendest."
  },
  "f2": {
   "title": "Drucken ist nicht Zurückgeben",
   "prompt": "Eine Funktion berechnet die Versandkosten und gibt sie nur aus, ohne sie zurückzugeben. Was ist die Folge?",
   "opts": [
    "Der Aufrufer kann den Wert nicht in weiteren Berechnungen verwenden",
    "Keine: Drucken und Zurückgeben sind gleichwertig",
    "Die Funktion wird schneller",
    "Der Wert wird automatisch global"
   ],
   "hint": "Wo landet ein gedruckter Wert? Und ein zurückgegebener?",
   "why": "Drucken schickt den Wert nur auf den Bildschirm. Zurückgeben übergibt den Wert an den aufrufenden Code, der ihn addieren, speichern oder weiterreichen kann.",
   "analogy": "Drucken heißt, das Gericht im Schaufenster zu zeigen; Zurückgeben heißt, es dem Kunden zu überreichen. Wer nur das Fenster gesehen hat, geht mit leeren Händen."
  },
  "f3": {
   "title": "Das x drinnen und das x draußen",
   "prompt": "Was gibt das Programm aus?",
   "hint": "Ist die Variable, die innerhalb der Funktion erstellt wird, dieselbe wie die außerhalb?",
   "why": "x = 99 ist eine lokale Variable, die nur während des Aufrufs existiert. Das äußere x ist immer noch 10.",
   "analogy": "Eine Funktion ist ein Raum mit eigener Tafel. Was drinnen geschrieben wird, wird beim Verlassen weggewischt und ändert nichts an der Tafel im Flur."
  },
  "f4": {
   "title": "Eine Funktion für den Durchschnitt",
   "prompt": "Baue die Funktion, die den Durchschnitt einer Liste berechnet, und den Aufruf, der das Ergebnis ausgibt.",
   "hint": "Innerhalb der Funktion: Summe zurücksetzen, in der Schleife aufaddieren und erst danach die Division zurückgeben.",
   "why": "return kommt nach der Schleife, sonst würde die Funktion in der ersten Runde verlassen. Der Aufruf kommt nach der Definition.",
   "analogy": "Ein Kuchenrezept: zuerst der Name des Rezepts, dann die Schritte in Reihenfolge, und serviert wird erst am Ende. Man kann nicht mitten beim Mischen servieren."
  },
  "f5": {
   "title": "Das Argument ist eine Kopie",
   "prompt": "Was gibt das Programm aus?",
   "hint": "Erhält die Funktion die Variable x selbst oder eine Kopie ihres Werts?",
   "why": "Zahlen werden als Wert übergeben: n ist eine Kopie von x. Änderungen an n innerhalb der Funktion ändern x nicht, das immer noch 5 ist.",
   "analogy": "Man übergibt eine Fotokopie des Dokuments. Auf der Kopie darf beliebig gekritzelt werden: das Original in der Schublade bleibt unversehrt."
  },
  "k1": {
   "title": "Indizes beginnen bei null",
   "prompt": "Was gibt das Programm aus?",
   "hint": "Das erste Element steht am Index 0.",
   "why": "Die Indizes sind 0 (10), 1 (20) und 2 (30).",
   "analogy": "Der Index ist der Abstand zum Anfang der Warteschlange: Die erste Person ist 0 Schritte entfernt, die zweite 1 Schritt."
  },
  "k2": {
   "title": "Zwei Variablen, eine einzige Liste",
   "prompt": "Was gibt das Programm aus?",
   "hint": "Ist die zweite Variable eine neue Sammlung oder ein anderer Name für dieselbe?",
   "why": "Zuweisung kopiert die Sammlung nicht: beide Namen zeigen auf dieselben Daten. Eine Änderung über b erscheint auch in a.",
   "analogy": "a und b sind zwei Schlüssel zur selben Schublade. Wer mit Schlüssel b etwas hineinlegt, ändert das, was Schlüssel a vorfindet."
  },
  "k3": {
   "title": "Liste oder Wörterbuch",
   "prompt": "Herr Antônio möchte nachschlagen, wie viele Exemplare eines Buches es gibt, indem er den Titel eingibt. Welche Struktur passt am besten?",
   "opts": [
    "Ein Wörterbuch (Map) von Titel zu Anzahl",
    "Eine Liste von Anzahlen in Eingangsreihenfolge",
    "Eine Variable pro Buch",
    "Ein einziger Text mit allem, durch Kommas getrennt"
   ],
   "hint": "Erfolgt die Suche über die Position oder über den Namen?",
   "why": "Ein Wörterbuch verknüpft Schlüssel mit Wert und schlägt direkt über den Schlüssel nach. Bei einer Liste müsste man die Position kennen oder alles durchsuchen.",
   "analogy": "Ein Wörterbuch ist wie eine Kontaktliste: Man sucht nach dem Namen und findet die Telefonnummer, ohne die ganze Liste zu lesen."
  },
  "k4": {
   "title": "Ein Schritt hinter das Ende",
   "prompt": "Die Schleife versucht, auf eine Position zuzugreifen, die nicht existiert. Welche Zeile verursacht das Problem?",
   "hint": "Bei 3 Elementen, was ist der größte gültige Index?",
   "why": "Die Schleife erzeugt die Indizes 0, 1, 2 und 3, aber 3 existiert nicht. Die korrekte Grenze ist die Größe der Sammlung, ohne sie einzuschließen.",
   "analogy": "Das ist der Zaunpfahl-Fehler: Bei einem Zaun mit 3 Brettern versucht jemand, der bis 4 zählt, ein Brett anzunageln, das es nicht gibt."
  },
  "k5": {
   "title": "Wie viele Bücher mit mehr als vier Exemplaren",
   "prompt": "Was gibt das Programm aus?",
   "hint": "c zählt Elemente; es addiert keine Werte.",
   "why": "Nur 5 und 8 sind größer als 4, also endet der Zähler bei 2.",
   "analogy": "Es ist der Türsteher mit einem Handzähler: ein Klick pro Person, die die Regel erfüllt, egal wie groß jeder Einzelne ist."
  },
  "r1": {
   "title": "Die Bremse der Rekursion",
   "prompt": "Was muss jede rekursive Funktion haben, damit sie sich nicht unendlich oft selbst aufruft?",
   "opts": [
    "Einen Basisfall, der ohne neuen Aufruf antwortet",
    "Eine innere while-Schleife",
    "Eine globale Steuervariable",
    "Mindestens zwei Parameter"
   ],
   "hint": "Denke darüber nach, was die Aufrufe stoppt.",
   "why": "Der Basisfall ist die einfache Situation, die direkt gelöst wird. Jeder rekursive Aufruf muss sich ihm nähern.",
   "analogy": "Matrjoschka-Puppen: Du öffnest eine, findest eine kleinere und hörst bei der massiven Puppe auf. Ohne sie würdest du endlos Puppen öffnen."
  },
  "r2": {
   "title": "Fakultät Schritt für Schritt",
   "prompt": "Was gibt das Programm aus?",
   "hint": "Erweitere: fact(4) = 4 × fact(3) = ...",
   "why": "4 × 3 × 2 × 1 = 24. Jeder Aufruf wartet auf die Antwort des kleineren Aufrufs und multipliziert dann.",
   "analogy": "Eine Schlange von Leuten, die den Vordermann fragen: „Was ist deine Zahl?“. Der Erste antwortet 1, und die Antwort wandert zurück durch die Schlange und wird multipliziert."
  },
  "r3": {
   "title": "Rekursion, die sich nicht bewegt",
   "prompt": "Die Funktion soll n, n-1, ..., 1 ausgeben, aber der Aufrufstapel läuft über. Welche Zeile ist falsch?",
   "hint": "Bewegt sich der rekursive Aufruf auf den Basisfall zu?",
   "why": "Der Aufruf von count(n) wiederholt dasselbe Problem endlos. Die Lösung ist count(n - 1), das bis auf null heruntergeht.",
   "analogy": "Es ist, als würde man jemanden bitten, die Treppe hinunterzugehen, während er auf derselben Stufe stehen bleibt. Der Basisfall existiert; er wird nur nie erreicht."
  },
  "r4": {
   "title": "Ausgabe auf dem Rückweg",
   "prompt": "Was gibt das Programm aus?",
   "hint": "Die Ausgabe kommt nach dem rekursiven Aufruf. Wann wird sie endlich ausgeführt?",
   "why": "Jeder Aufruf geht zuerst zum Basisfall hinunter; die Ausgabe erfolgt erst bei der Rückkehr, vom innersten (1) zum äußersten (3).",
   "analogy": "Ein Stapel Teller: Du stapelst 3, 2, 1 und spülst erst beim Abtragen. Der letzte wird zuerst gespült."
  },
  "r5": {
   "title": "Zwei Aufrufe auf einmal",
   "prompt": "Was gibt das Programm aus?",
   "hint": "Arbeite von unten nach oben: f(0), f(1), f(2)...",
   "why": "Es ist die Fibonacci-Folge: 0, 1, 1, 2, 3, 5. Also ist f(5) = 5.",
   "analogy": "Ein umgekehrter Stammbaum: Jede Antwort hängt von den beiden vorherigen ab, bis du die bekannten Vorfahren (die Basisfälle) erreichst."
  },
  "q1": {
   "title": "Funktional oder nicht-funktional",
   "prompt": "Welche dieser Anforderungen ist eine NICHT-funktionale Anforderung an das Kliniksystem?",
   "opts": [
    "Das System muss innerhalb von 2 Sekunden antworten",
    "Der Patient kann einen Termin umbuchen",
    "Das System sendet eine SMS-Erinnerung",
    "Die Rezeptionistin registriert Patienten"
   ],
   "hint": "Nicht-funktional beschreibt die Qualität (wie gut), nicht das Verhalten (was es tut).",
   "why": "Die Antwortzeit ist ein Qualitätsmerkmal. Die anderen drei beschreiben Funktionen, die das System ausführt.",
   "analogy": "Bei einem Auto ist funktional: fahren, bremsen und das Licht einschalten. Nicht-funktional ist der Kraftstoffverbrauch, der Komfort und die Sicherheit, mit der es das tut."
  },
  "q2": {
   "title": "Eine Anforderung, die man testen kann",
   "prompt": "Welche Anforderung ist überprüfbar formuliert?",
   "opts": [
    "Die Suche liefert Ergebnisse in unter 1 s für 95 % der Anfragen",
    "Das System muss schnell sein",
    "Die Oberfläche muss freundlich sein",
    "Das System muss modern und robust sein"
   ],
   "hint": "Frage dich: Wie würde ich nachweisen, dass dies erfüllt ist?",
   "why": "Nur die erste Option hat ein messbares Kriterium. „Schnell“, „freundlich“ und „modern“ führen bei der Abnahme zu Diskussionen.",
   "analogy": "Es ist der Unterschied, ob man den Maurer um „eine hohe Mauer“ oder um „eine 2,80 m hohe Mauer“ bittet. Nur die zweite kann mit einem Maßband überprüft werden."
  },
  "q3": {
   "title": "Eine wohlgeformte User Story",
   "prompt": "Welche Option folgt dem User-Story-Format?",
   "opts": [
    "Als Patientin möchte ich einen Tag vorher eine Erinnerung, damit ich meinen Termin nicht verpasse.",
    "Erstelle die Tabelle Termine mit einem Fremdschlüssel auf Patient.",
    "Das System muss im Frontend React verwenden.",
    "Terminplanungsbildschirm, Version 2"
   ],
   "hint": "Das Format ist: Als [Rolle] möchte ich [Aktion], damit [Nutzen].",
   "why": "Die Story benennt, wer es braucht, was sie brauchen und warum, ohne die technische Lösung vorzuschreiben.",
   "analogy": "Es ist wie eine Bestellung im Restaurant: Der Gast nennt das Gericht und den Hunger, den er stillen möchte, nicht die Pfannenmarke, die der Koch verwenden soll."
  },
  "q4": {
   "title": "„Genau wie bei der Bank“",
   "prompt": "Die Direktorin verlangt „eine App genau wie bei der Bank“. Was ist der beste erste Schritt?",
   "opts": [
    "Fragen, welches Alltagsproblem sie lösen möchte.",
    "Sofort mit dem Bau der App beginnen.",
    "Ablehnen, weil Apps teuer sind.",
    "Den Termin schätzen und später sprechen."
   ],
   "hint": "Sie hat eine Lösung beschrieben. Was ist das Bedürfnis dahinter?",
   "why": "Anforderungen kommen oft als Lösungen. Das Verstehen des eigentlichen Bedürfnisses (verpasste Termine) kann etwas Einfacheres und Nützlicheres aufdecken.",
   "analogy": "Der Patient kommt herein und verlangt Antibiotika; ein guter Arzt fragt zuerst, was er fühlt."
  },
  "q5": {
   "title": "Validieren vor dem Bauen",
   "prompt": "Welche Technik validiert Anforderungen mit der Rezeption der Klinik, bevor irgendwelcher Code geschrieben wird?",
   "opts": [
    "Einen Papierprototyp der Bildschirme zeigen und beobachten, wie sie ihn benutzen.",
    "Das fertige System liefern und Beschwerden sammeln.",
    "Das Anforderungsdokument per E-Mail senden und warten.",
    "Nur die Direktorin fragen, ob alles in Ordnung ist."
   ],
   "hint": "Suche die günstigste Option, die den echten Benutzer mit der Idee konfrontiert.",
   "why": "Low-Fidelity-Prototypen kosten nur Minuten und decken Missverständnisse früh auf, wenn Korrekturen noch billig sind.",
   "analogy": "Ein Schneider macht die Anprobe mit Nadeln vor dem Nähen. Eine Nadel zu versetzen dauert Sekunden; eine Naht aufzutrennen kostet den Anzug."
  },
  "a1": {
   "title": "Was ein Sprint ist",
   "prompt": "In Scrum ist ein Sprint:",
   "opts": [
    "Ein kurzer Zyklus fester Länge, der ein nutzbares Inkrement liefert.",
    "Die letzte Testphase vor dem Start.",
    "Ein 15-minütiges tägliches Meeting.",
    "Das Dokument mit allen Projektanforderungen."
   ],
   "hint": "Denke an Rhythmus: wiederholte Zyklen mit einer Lieferung am Ende.",
   "why": "Sprints haben eine feste Länge (üblicherweise 1 bis 4 Wochen) und enden mit etwas, das funktioniert und bewertet werden kann.",
   "analogy": "Genau wie in diesem Spiel: Alle 5 Tickets hältst du inne, schaust, was du geliefert hast, und passt den Kurs an, statt alles erst am Ende zu beurteilen."
  },
  "a2": {
   "title": "Wozu das Daily dient",
   "prompt": "Was ist der Zweck des Daily-Meetings?",
   "opts": [
    "Das Team synchronisieren und Hindernisse aufdecken.",
    "Einzeln an das Management berichten.",
    "Die technische Lösung jeder Aufgabe detaillieren.",
    "Das gesamte Product Backlog neu planen."
   ],
   "hint": "Es dauert etwa 15 Minuten. Was passt in diese Zeit?",
   "why": "Das Daily richtet das Team auf das Sprintziel aus und deckt Blocker früh auf. Lange Diskussionen werden danach mit den Beteiligten fortgesetzt.",
   "analogy": "Es ist die kurze Besprechung des Teams in der Halbzeitpause: Wer deckt wen und wo ist das Problem. Das große Teamgespräch ist für einen anderen Moment."
  },
  "a3": {
   "title": "Das Einschreibungs-MVP",
   "prompt": "Was wäre ein gutes MVP für die Schule?",
   "opts": [
    "Online-Einschreibung funktioniert durchgängig, ohne Zeugnisse oder Essen.",
    "Alle Bildschirme entworfen, aber keiner funktioniert.",
    "Das vollständige System, geliefert in sechs Monaten.",
    "Nur die Datenbank, ganz ohne Bildschirm."
   ],
   "hint": "Ein MVP ist die kleinste Version, die das Kernproblem für echte Benutzer bereits löst.",
   "why": "Das MVP liefert Wert durchgängig in kleinem Maßstab und erlaubt, aus der echten Nutzung zu lernen, bevor man in den Rest investiert.",
   "analogy": "Wer von A nach B will, bekommt nicht zuerst ein Rad und dann ein Fahrgestell. Er bekommt ein Skateboard, dann ein Fahrrad, dann ein Auto: Jede Stufe bringt ihn schon voran."
  },
  "a4": {
   "title": "Das passt nicht in den Sprint",
   "prompt": "Zwei Tage vor Sprintende erkennt das Team, dass es nicht alles liefern wird. Was ist der beste Schritt?",
   "opts": [
    "Den Umfang mit dem Product Owner neu verhandeln und die Qualität halten.",
    "Die Tests überspringen, um alles zu liefern.",
    "Den Sprint verlängern, ohne jemandem Bescheid zu sagen.",
    "Still Überstunden machen, bis es passt."
   ],
   "hint": "In agil sind Termin und Qualität fix. Was ist flexibel?",
   "why": "Der Umfang ist die Stellschraube. Qualität zu kürzen erzeugt technische Schulden, und das Problem zu verstecken bricht die Transparenz.",
   "analogy": "Ein volles Restaurant: Besser heute Abend ein Gericht von der Karte nehmen, als rohes Hähnchen an jeden Tisch zu servieren."
  },
  "a5": {
   "title": "Alles angefangen, nichts beendet",
   "prompt": "Das Team-Board zeigt 12 Aufgaben „in Arbeit“ für 3 Personen, und nichts wird fertig. Welche Kanban-Praxis geht das an?",
   "opts": [
    "Begrenzung der parallelen Arbeit (WIP-Limit).",
    "Weitere Spalten zum Board hinzufügen.",
    "Längere Meetings abhalten.",
    "Den Sprint verlängern."
   ],
   "hint": "Der Engpass ist nicht das Anfangen, sondern das Beenden.",
   "why": "Ein WIP-Limit erzwingt das Beenden vor dem Anfangen, reduziert Kontextwechsel und macht Engpässe sichtbar.",
   "analogy": "Ein Herd mit vier Flammen und 12 Töpfen: Nichts wird richtig gar. Besser vier Gerichte fertigstellen und erst dann die nächsten aufsetzen."
  },
  "g1": {
   "title": "Was ein Commit ist",
   "prompt": "Ein Git-Commit ist:",
   "opts": [
    "Eine Aufzeichnung des Projektzustands zu diesem Zeitpunkt, mit einer Nachricht",
    "Das Hochladen der Dateien auf den Server",
    "Eine Sicherungskopie in einem anderen Ordner",
    "Das Löschen alter Versionen"
   ],
   "hint": "Das Senden an den Server ist ein anderer Befehl (push).",
   "why": "Ein Commit speichert einen lokalen Schnappschuss der Änderungen, mit Autor, Datum und Nachricht. Das Senden an das Remote-Repository erfolgt später mit push.",
   "analogy": "Es ist ein Speicherpunkt in einem Spiel: Wenn der Boss dich besiegt, kannst du genau zu diesem Moment zurückkehren."
  },
  "g2": {
   "title": "Einen Fix veröffentlichen",
   "prompt": "Ordne die Befehle, um einen Branch zu erstellen, die Änderung aufzuzeichnen und sie an das Remote-Repository zu senden.",
   "hint": "Zuerst der Arbeitsbereich, dann stage (add), aufzeichnen (commit) und senden (push).",
   "why": "Du erstellst den Branch vor der Änderung; add wählt aus, was hineinkommt; commit zeichnet auf; push veröffentlicht.",
   "analogy": "Ein Paket verschicken: Hol die Kiste (Branch), leg die Gegenstände hinein (add), verschließe und beschrifte sie (commit), und erst dann bring sie zur Post (push)."
  },
  "g3": {
   "title": "Wozu ein Branch dient",
   "prompt": "Warum sollte Bia einen Branch für den neuen Rabattbildschirm erstellen?",
   "opts": [
    "Um isoliert zu arbeiten, ohne die Hauptlinie zu beeinflussen",
    "Um das Repository schneller zu machen",
    "Weil Git Commits auf main verbietet",
    "Um die alte Historie zu löschen"
   ],
   "hint": "Denk daran, was passiert, wenn unfertiger Code direkt in main landet.",
   "why": "Ein Branch isoliert die laufende Arbeit. Main bleibt stabil, bis die Änderung überprüft und integriert ist.",
   "analogy": "Es ist der Entwurf eines Dokuments: Du experimentierst frei und kopierst es erst in das Original, wenn der Text gut ist."
  },
  "g4": {
   "title": "Warum der Merge kollidiert ist",
   "prompt": "Wann passiert ein Merge-Konflikt?",
   "opts": [
    "Wenn zwei Branches dieselben Zeilen unterschiedlich ändern",
    "Immer wenn zwei Personen im selben Repository arbeiten",
    "Wenn der Branch mehr als zehn Commits hat",
    "Wenn auf einem der Branches eine neue Datei erstellt wird"
   ],
   "hint": "Git merged Änderungen an verschiedenen Stellen selbstständig. Was kann es nicht entscheiden?",
   "why": "Wenn beide Versionen dieselbe Stelle berührt haben, weiß Git nicht, welche es wählen soll, und verlangt eine menschliche Entscheidung.",
   "analogy": "Zwei Personen haben denselben Satz eines Vertrags umgeschrieben. Der Notar entscheidet nicht allein: Beide werden hinzugezogen, um den endgültigen Wortlaut festzulegen."
  },
  "g5": {
   "title": "Eine gute Commit-Nachricht",
   "prompt": "Welche Commit-Nachricht ist für jemanden, der die Historie in einem Jahr liest, am nützlichsten?",
   "opts": [
    "Fix Rabattberechnung für Käufe von genau R$ 50",
    "tweaks",
    "endgültige Version diesmal wirklich",
    "Änderungen von Caio am Freitag"
   ],
   "hint": "Die Nachricht sollte sagen, was geändert wurde und warum, ohne jemanden zu zwingen, den Code zu öffnen.",
   "why": "Eine gute Nachricht beschreibt die Änderung und ihren Grund. „tweaks“ hilft nicht, zu finden, wann sich ein Verhalten geändert hat.",
   "analogy": "Es ist das Etikett auf Umzugskartons: „Küche, zerbrechliche Gläser“ erspart dir, zwanzig Kartons mit der Aufschrift „Kram“ zu öffnen."
  },
  "t1": {
   "title": "Was ein Unit-Test ist",
   "prompt": "Ein Unit-Test überprüft:",
   "opts": [
    "Eine kleine isolierte Code-Einheit, wie eine Funktion",
    "Das gesamte System über die Benutzeroberfläche",
    "Ob der Server hohen Datenverkehr bewältigen kann",
    "Ob der Kunde mit der Lieferung zufrieden war"
   ],
   "hint": "Der Name verrät es: Was ist die „Unit“?",
   "why": "Unit-Tests sind klein, schnell und isoliert. Das gesamte System ist End-to-End-Testing; hoher Datenverkehr ist Lasttest.",
   "analogy": "Es ist das Testen jeder Glühbirne, bevor die Lichterkette zusammengesetzt wird. Wenn das Set später ausfällt, weißt du bereits, dass die Glühbirnen nicht das Problem sind."
  },
  "t2": {
   "title": "Testwerte auswählen",
   "prompt": "Die Regel gilt „ab 18“. Welche Eingabemenge testet die Funktion am besten?",
   "hint": "Wo verstecken sich Vergleichsfehler (> statt >=) am ehesten?",
   "why": "Defekte häufen sich an Grenzen. Das Testen knapp unter, genau an und knapp über dem Limit deckt ein >= auf, das mit > vertauscht wurde.",
   "analogy": "Um zu prüfen, ob eine Tür gut schließt, untersuchst du den Rahmen, nicht die Mitte der Wand."
  },
  "t3": {
   "title": "Arrange, act, assert",
   "prompt": "Baue den Bäckerei-Rabatt-Test nach arrange, act, assert zusammen.",
   "hint": "Zuerst die Daten, dann der Aufruf der zu testenden Funktion und zuletzt die Überprüfung.",
   "why": "Der Test richtet das Szenario ein, führt die Aktion aus und vergleicht das Ergebnis mit dem Erwarteten.",
   "analogy": "Wie beim Ausprobieren eines Rezepts: Lege die Zutaten zurecht, koche und probiere erst dann, ob es gelungen ist."
  },
  "t4": {
   "title": "Alles grün, null Bugs?",
   "prompt": "Alle 200 Tests bestanden und die Abdeckung liegt bei 100%. Kannst du behaupten, die Software habe keine Fehler?",
   "opts": [
    "Nein: Tests zeigen die Anwesenheit von Fehlern, sie beweisen nicht deren Abwesenheit",
    "Ja: 100% Abdeckung garantiert es",
    "Ja, solange es Unit-Tests sind",
    "Nein, weil 200 Tests zu wenige sind; 1000 wären genug"
   ],
   "hint": "Abdeckung misst ausgeführte Zeilen, nicht geprüfte Situationen.",
   "why": "Abdeckung bedeutet, dass die Zeilen durchlaufen wurden, nicht dass jede Kombination von Eingaben und Anforderungen geprüft wurde. Das ist Dijkstras klassische Bemerkung.",
   "analogy": "Ein stiller Rauchmelder bedeutet, dass gerade kein Rauch da ist, nicht dass die Verkabelung des ganzen Hauses in Ordnung ist."
  },
  "t5": {
   "title": "Der Rabattfehler darf nicht zurückkehren",
   "prompt": "Du hast die Ursache für den R$ 50-Fehler gefunden. Was ist die beste Reihenfolge?",
   "opts": [
    "Schreibe einen Test, der den Fehler reproduziert, behebe ihn und behalte den Test",
    "Behebe ihn direkt in der Produktion und sage Dona Lúcia Bescheid",
    "Behebe ihn und teste einmal manuell",
    "Notiere den Fehler in einem Dokument, um ihn später zu erinnern"
   ],
   "hint": "Wie stellst du sicher, dass niemand denselben Fehler in sechs Monaten erneut einführt?",
   "why": "Ein Regressionstest schlägt vor der Korrektur fehl, besteht danach und wacht für immer.",
   "analogy": "Es ist wie eine Impfung: Das System trifft den Eindringling einmal und erkennt ihn jedes Mal, wenn er zurückkommen will."
  },
  "d1": {
   "title": "Die Klasse, die alles macht",
   "prompt": "Die Klasse Report berechnet Summen, rendert das PDF und versendet die E-Mail. Welches Prinzip verletzt sie?",
   "opts": [
    "Single Responsibility (SRP)",
    "Liskov-Substitution (LSP)",
    "Dependency Inversion (DIP)",
    "Keines: Alles zusammenzuhalten erleichtert die Wartung"
   ],
   "hint": "Wie viele verschiedene Gründe gibt es, diese Klasse zu ändern?",
   "why": "Sie ändert sich, wenn die Berechnungsregel, das PDF-Layout oder der Mailserver sich ändert. Drei Gründe weisen auf drei Verantwortlichkeiten hin.",
   "analogy": "Ein Schweizer Taschenmesser ist praktisch beim Zelten, aber in einer Profiküche hat jedes Messer seine Aufgabe, und das Schärfen des einen ruiniert die anderen nicht."
  },
  "d2": {
   "title": "Eine 300-Zeilen-Funktion",
   "prompt": "Die Ladefunktion wiederholt denselben Validierungsblock an drei Stellen. Was ist das beste Refactoring?",
   "opts": [
    "Extrahiere den wiederholten Block in eine klar benannte Funktion",
    "Füge Kommentare hinzu, die jede Wiederholung erklären",
    "Teile die Datei in zwei, behalte die Funktion aber",
    "Lass es, wie es ist, weil es funktioniert"
   ],
   "hint": "Denke an das DRY-Prinzip: Don't repeat yourself.",
   "why": "Das Extrahieren einer Funktion entfernt Duplikation: Eine Korrektur wird nur an einer Stelle vorgenommen, und der Name dokumentiert die Absicht.",
   "analogy": "Statt die Adresse auf jeden Brief zu schreiben, machst du einen Stempel. Adresse geändert? Ersetze den Stempel, nicht alle Briefe."
  },
  "d3": {
   "title": "Kohäsion und Kopplung",
   "prompt": "Bei einem guten Moduldesign strebst du an:",
   "opts": [
    "Hohe Kohäsion und niedrige Kopplung",
    "Niedrige Kohäsion und hohe Kopplung",
    "Hohe Kohäsion und hohe Kopplung",
    "Es ist egal, solange die Tests bestehen"
   ],
   "hint": "Kohäsion ist der innere Fokus des Moduls; Kopplung ist, wie sehr es von anderen abhängt.",
   "why": "Fokussierte Module, die wenig voneinander abhängen, können isoliert verstanden, getestet und ersetzt werden.",
   "analogy": "LEGO-Steine: Jeder hat eine klar definierte Form (Kohäsion) und einen einfachen, standardisierten Verbinder (niedrige Kopplung)."
  },
  "d4": {
   "title": "Noch ein \"if\" bei Zahlungen",
   "prompt": "Jede neue Zahlungsmethode bedeutet, diese Funktion zu bearbeiten. Welche Designänderung löst das am besten?",
   "opts": [
    "Erstelle ein Payment-Interface und eine Implementierung pro Methode",
    "Füge das neue \"if\" und einen Kommentar hinzu",
    "Kopiere die ganze Funktion für jede Zahlungsmethode",
    "Ersetze die Bedingungskette durch eine while-Schleife"
   ],
   "hint": "Open/Closed-Prinzip: offen für Erweiterung, geschlossen für Modifikation.",
   "why": "Mit Polymorphie (Strategy-Muster) wird eine neue Zahlungsmethode zu einem neuen Modul, ohne bereits funktionierenden und getesteten Code anzufassen.",
   "analogy": "Es ist die Standardsteckdose: Jedes neue Gerät wird eingesteckt, ohne dass jemand die Wand aufbricht und die Verkabelung neu macht."
  },
  "d5": {
   "title": "Die Datenbank in die Klasse eingeschweißt",
   "prompt": "Die Klasse Order erstellt ihre eigene Verbindung zu einer bestimmten MySQL-Datenbank. Was erschwert das, und wie behebst du es?",
   "opts": [
    "Testen und Austauschen der Datenbank; erhalte die Abhängigkeit fertig über ein Interface",
    "Nichts; die Verbindung intern zu erstellen ist die sauberste Art",
    "Geschwindigkeit; behebe es mit einem leistungsstärkeren Server",
    "Lesbarkeit; behebe es mit mehr Kommentaren"
   ],
   "hint": "Wie würdest du Order ohne laufendes MySQL testen?",
   "why": "Das interne Erstellen der konkreten Abhängigkeit koppelt die Klasse daran. Mit Dependency Injection erhält die Klasse etwas, das ein Interface erfüllt, und in Tests erhält sie einen Stellvertreter.",
   "analogy": "Eine Lampe mit eingeschweißter Glühbirne: Wenn sie durchbrennt, wirfst du alles weg. Mit einer Standardfassung ersetzt du nur die Birne, sogar mit einer Testbirne."
  },
  "xa1": {
   "title": "Der rabattierte Gesamtbetrag",
   "prompt": "Verkäufe von 50 oder mehr erhalten 10% Rabatt (Ganzzahlanteil). Was gibt das Programm aus?",
   "why": "12 bleibt 12; 55 wird 50; 50 wird 45; 8 bleibt 8. Die Summe ist 115. Der Rabatt gilt auch für genau 50, wegen >=.",
   "analogy": "Es ist wie das Prüfen des Kassenbons Zeile für Zeile: Wer nur auf die Summe schaut, kann nicht sehen, auf welcher Position der Rabatt angewendet wurde."
  },
  "xa2": {
   "title": "Der Zähler, der null ergibt",
   "prompt": "Das Programm soll 2 rabattierte Verkäufe zählen, gibt aber 0 aus. Welche Zeile steht an der falschen Stelle?",
   "why": "Wird der Zähler innerhalb der Schleife zurückgesetzt, wird die Zählung in jeder Runde gelöscht. Die Initialisierung gehört vor die Schleife, und dort existiert sie bereits.",
   "analogy": "Es ist wie der Türsteher, der seinen Handzähler für jede Person, die hereinkommt, zurücksetzt: Am Ende des Tages zeigt das Display nur die letzte Person an."
  },
  "xa3": {
   "title": "Wechselgeld in Zehnerscheinen",
   "prompt": "Baue das Programm zusammen, das die Zahlung prüft und ausgibt, wie viele 10er-Scheine und wie viele 1-Euro-Münzen das Wechselgeld ergeben.",
   "why": "Der Preis muss vor dem bezahlten Betrag existieren, der von ihm abhängt. Die Prüfung kommt vor der Berechnung, und das Wechselgeld wird nur in dem Zweig berechnet, in dem die Zahlung ausreicht.",
   "analogy": "Der Kassierer prüft zuerst, ob das Geld die Rechnung deckt; erst dann öffnet sich die Kasse, um das Wechselgeld herauszugeben."
  },
  "xb1": {
   "title": "Eine Summe ab einer Position",
   "prompt": "Was gibt das Programm aus?",
   "why": "Der Aufruf beginnt bei Index 1, also addiert er 7 + 9 = 16. Der Wert an Index 0 bleibt außen vor. Der Basisfall tritt ein, wenn i die Größe der Liste erreicht.",
   "analogy": "Es ist, als würde man sich an der zweiten Stelle in eine Warteschlange stellen und alle bitten, ihre Nummer zu denen hinter ihnen zu addieren."
  },
  "xb2": {
   "title": "Eine Datei zu viel",
   "prompt": "Die Funktion soll 3 Dateien zählen, antwortet aber 4. Welche Zeile ist falsch?",
   "why": "Mit > stoppt die Rekursion erst, nachdem sie über das Ende hinausgegangen ist und eine Position zählt, die nicht existiert. Der korrekte Basisfall vergleicht mit der Größe auf Gleichheit.",
   "analogy": "Es ist, als würde man die Stufen einer Treppe zählen und dabei den Boden oben mitzählen: Die Bremse wurde eine Stufe zu spät betätigt."
  },
  "xb3": {
   "title": "Wie viele große Dateien",
   "prompt": "Baue die Funktion zusammen, die zählt, wie viele Werte das Limit überschreiten, und den Aufruf, der das Ergebnis ausgibt.",
   "why": "Der Zähler wird vor der Schleife erstellt, innerhalb der Schleife aktualisiert und erst nach dem Ende der Schleife zurückgegeben. Der Aufruf kommt nach der Definition.",
   "analogy": "Es ist wie bei der Straßenwaage: Der Zähler wird zu Schichtbeginn zurückgesetzt, jeder überladene LKW wird gezählt, und der Bericht kommt erst am Ende heraus."
  },
  "xc1": {
   "title": "Die Anfrage um 17 Uhr",
   "prompt": "Die Genossenschaft möchte Essensgutscheine noch heute live haben. Der Code existiert nur auf dem Rechner eines Kollegen, ohne Tests. Was ist die beste Vorgehensweise?",
   "opts": [
    "Code auf einen Branch pushen, den kritischen Pfad testen, Review und Release mit Rollback-Plan; wenn es heute nicht passt, den Termin neu verhandeln",
    "Dateien direkt auf den Server kopieren, weil der Termin Gesetz ist",
    "Jede Veröffentlichung ablehnen, bis das gesamte Zahlungsmodul neu geschrieben ist",
    "Jetzt veröffentlichen und die Tests am Montag schreiben"
   ],
   "why": "Ein knapper Termin setzt den Prozess nicht außer Kraft: Versionierung, Testen des kritischen Pfads, Review und ein Weg zurück reduzieren das Risiko. Wenn es nicht passt, verhandelt man Umfang oder Termin, niemals stillschweigend die Qualität.",
   "analogy": "Auch eine Notoperation hat eine Checkliste und sterile Technik: Dringlichkeit ändert das Tempo, nicht die Schritte, die eine Tragödie verhindern."
  },
  "xc2": {
   "title": "Pix ist ausgefallen",
   "prompt": "Zehn Minuten nach der Veröffentlichung beginnen Pix-Zahlungen zu scheitern. Was ist die erste Aktion?",
   "opts": [
    "Auf die vorherige Version zurückrollen und die Ursache bei stabilem System untersuchen",
    "Direkt in Produktion debuggen, bis der Fehler gefunden ist",
    "Auf weitere Meldungen warten, um sicher zu sein",
    "Den Server herunterfahren und sich am Montag darum kümmern"
   ],
   "why": "Zuerst stellt man den Dienst wieder her; dann untersucht man. Der Git-Verlauf macht ein schnelles und sicheres Zurückgehen möglich.",
   "analogy": "Bei einem Rohrbruch dreht man zuerst das Wasser ab. Die Ursache für den Bruch findet man später, wenn der Boden trocken ist."
  },
  "xc3": {
   "title": "Das Meeting am Montag",
   "prompt": "In der Retrospektive stellt sich heraus, dass die Änderung einen Fall gebrochen hat, den niemand getestet hat. Welche Folgemaßnahme ist am besten?",
   "opts": [
    "Ein Review ohne Schuldzuweisungen: Regressionstest hinzufügen und den Prozess so anpassen, dass Code-Reviews Tests erfordern",
    "Den Schuldigen identifizieren und eine Abmahnung aussprechen",
    "Freitags-Releases verbieten und die Angelegenheit schließen",
    "Jede Projektfrist um 50 % verlängern"
   ],
   "why": "Fehler gehören zum Arbeitssystem, nicht zu einer einzelnen Person. Der Regressionstest verhindert, dass der Defekt zurückkehrt, und die Prozessänderung verhindert, dass die Situation zurückkehrt.",
   "analogy": "In der Luftfahrt wird jeder Vorfall zur Untersuchung und zu einem besseren Verfahren, nicht zur Hexenjagd. Deshalb ist das Fliegen so sicher geworden."
  },
  "q6": {
   "title": "Anforderungen sortieren",
   "prompt": "Ordne jede Anforderung des Systems der Gesundheitsklinik zu.",
   "bins": [
    "Funktional",
    "Nicht-funktional"
   ],
   "cards": [
    "Der Patient erhält am Tag vor dem Termin eine Erinnerung",
    "Das System ist zu 99 % der Zeit verfügbar",
    "Die Empfangskraft verschiebt Termine",
    "Patientendaten werden verschlüsselt gespeichert"
   ],
   "hint": "Frage bei jeder Karte: Ist das etwas, das das System TUT, oder eine Eigenschaft, mit der es das tut?",
   "why": "Erinnern und Verschieben sind Verhalten (funktional). Verfügbarkeit und Verschlüsselung sind Eigenschaften des Dienstes (nicht-funktional), und sie werden oft erst bemerkt, wenn sie zum Problem werden.",
   "analogy": "Auf einer Speisekarte sind die Gerichte der funktionale Teil. Heiß ankommen, innerhalb von zwanzig Minuten und aus einer sauberen Küche ist der nicht-funktionale Teil: Niemand bestellt ihn, jeder erwartet ihn."
  },
  "a6": {
   "title": "Der Rhythmus eines Sprints",
   "prompt": "Bringe die Scrum-Sprint-Ereignisse in die richtige Reihenfolge.",
   "lines": [
    "Planung: Das Team wählt aus, was in den Sprint passt",
    "Tägliche Meetings verfolgen den Fortschritt",
    "Review: Das Inkrement wird den Nutzern gezeigt",
    "Retrospektive: Das Team verbessert seinen eigenen Prozess"
   ],
   "hint": "Zuerst entscheidest du, was zu tun ist; am Ende schaust du dir das Produkt an und dann den Prozess.",
   "why": "Der Sprint beginnt mit der Planung, läuft mit den Dailies weiter, zeigt beim Review das Ergebnis und schließt mit der Retrospektive ab, die den nächsten Zyklus speist.",
   "analogy": "Es ist wie eine Reise: Route planen, jeden Tag die Karte prüfen, bei der Ankunft die Fotos zeigen und vereinbaren, was beim nächsten Mal anders gemacht wird."
  },
  "g6": {
   "title": "Einen Konflikt entwirren",
   "prompt": "Bringe die Schritte zum sicheren Auflösen eines Merge-Konflikts in die richtige Reihenfolge.",
   "lines": [
    "Hole den aktualisierten main in deinen Branch",
    "Öffne die als konfliktbehaftet markierten Dateien",
    "Entscheide abschnittsweise, welche Version bleibt",
    "Führe die Tests aus, um zu prüfen, ob etwas kaputtgegangen ist",
    "Erfasse den Commit, der den Merge abschließt"
   ],
   "hint": "Der Konflikt zeigt sich erst, wenn die beiden Versionen aufeinandertreffen; der Commit kommt erst nach der Prüfung.",
   "why": "Der Merge deckt die Konflikte auf, die Entscheidung trifft ein Mensch abschnittsweise, und die Tests bestätigen, dass die Kombination funktioniert, bevor der endgültige Commit gemacht wird.",
   "analogy": "Zwei Lektoren haben denselben Absatz geändert: Die Versionen werden zusammengeführt, ruhig gelesen, eine Formulierung gewählt, der ganze Text Korrektur gelesen, und erst dann geht er in den Druck."
  },
  "t6": {
   "title": "Der TDD-Zyklus",
   "prompt": "Bringe den testgetriebenen Entwicklungszyklus in die richtige Reihenfolge.",
   "lines": [
    "Schreibe einen Test, der fehlschlägt",
    "Schreibe den minimalen Code, um den Test bestehen zu lassen",
    "Führe alle Tests aus und sieh zu, dass alles grün ist",
    "Refaktoriere unter dem Schutz der Tests"
   ],
   "hint": "Rot, grün, refaktorieren.",
   "why": "Der Test kommt zuerst und schlägt fehl (rot), der minimale Code lässt ihn bestehen (grün), und erst dann wird die Struktur verbessert, mit dem Sicherheitsnetz der Tests darunter.",
   "analogy": "Ein Schneider nimmt zuerst das Maß, schneidet dann den Stoff, bis er passt, und macht erst am Ende die Feinarbeit, wobei er nach jeder Anpassung das Maß prüft."
  },
  "d6": {
   "title": "Anzeichen von Kopplung",
   "prompt": "Ordne jede im System der Genossenschaft beobachtete Situation zu.",
   "bins": [
    "Niedrige Kopplung",
    "Hohe Kopplung"
   ],
   "cards": [
    "Die Versandberechnung erhält die Preistabelle als Parameter",
    "Die Oberfläche greift direkt auf die Datenbank zu",
    "Die Abrechnung kommuniziert mit dem Zahlungsverkehr über eine Schnittstelle",
    "Eine Änderung am Anmeldeformular erzwingt Änderungen in sechs anderen Dateien"
   ],
   "hint": "Frage: Wenn sich dieser Teil ändert, wie viele andere müssen sich dann mitändern?",
   "why": "Abhängigkeiten von außen zu erhalten und über Schnittstellen zu kommunizieren isoliert die Teile. Eine Oberfläche, die direkt mit der Datenbank spricht, und kaskadierende Änderungen zeigen Teile, die aneinandergebunden sind.",
   "analogy": "Geräte, die an Steckdosen angeschlossen sind, werden einzeln ersetzt. Geräte, deren Kabel zusammengelötet sind, zwingen dich, das Zimmer auseinanderzunehmen, um den Fernseher zu wechseln."
  },
  "m1": {
   "title": "Wer nutzt es und wozu",
   "prompt": "Welches Diagramm zeigt, wer das System nutzt und was jede Person damit tun kann?",
   "opts": [
    "Use-Case-Diagramm",
    "Klassendiagramm",
    "Sequenzdiagramm",
    "Verteilungsdiagramm"
   ],
   "hint": "Suche die Sicht, die auf Personen (Akteure) und Ziele ausgerichtet ist.",
   "why": "Use Cases verbinden Akteure mit Zielen: Der Leser leiht aus, der Freiwillige registriert. Klassen zeigen Konzepte; Sequenzen zeigen die Reihenfolge der Nachrichten.",
   "analogy": "Es ist die Speisekarte aus Sicht des Gastraums: Wer kann was bestellen, ohne die Küche zu zeigen."
  },
  "m2": {
   "title": "Buch und Exemplar",
   "prompt": "Wie sollte die Beziehung zwischen Buch und Exemplar modelliert werden?",
   "opts": [
    "Ein Buch hat viele Exemplare; jedes Exemplar gehört zu genau einem Buch",
    "Ein Buch hat genau ein Exemplar",
    "Viele Bücher zu vielen Exemplaren",
    "Keine Beziehung: Sie sind dasselbe"
   ],
   "hint": "Die Bibliothek hat drei Exemplare von Dom Casmurro. Wie viele Titel und wie viele physische Objekte?",
   "why": "Es gibt einen Titel; die Objekte im Regal sind mehrere. Es ist das Exemplar, das ausgeliehen wird, nicht das Buch. Diese Multiplizität falsch zu machen, verunreinigt die ganze Datenbank.",
   "analogy": "Das Rezept ist eines; die daraus gebackenen Kuchen sind viele. Du isst einen Kuchen, nicht das Rezept."
  },
  "m3": {
   "title": "Struktur oder Verhalten",
   "prompt": "Ordne jeden Satz zu: Zu welcher Sicht des Modells gehört er?",
   "bins": [
    "Statische Sicht (Klassen)",
    "Dynamische Sicht (Sequenz)"
   ],
   "cards": [
    "Ein Leser hat einen Namen und eine Telefonnummer",
    "Das System prüft, ob ein Exemplar verfügbar ist, und erfasst dann die Ausleihe",
    "Eine Ausleihe verweist auf ein Exemplar",
    "Eine Rückgabe löst eine Benachrichtigung an die nächste Person auf der Warteliste aus"
   ],
   "hint": "Statisch beschreibt, was existiert; dynamisch beschreibt, was passiert und in welcher Reihenfolge.",
   "why": "Attribute und Beziehungen sind Struktur und gelten immer. Prüfen, Erfassen und Benachrichtigen sind Ereignisse, die zeitlich verkettet sind.",
   "analogy": "Der Grundriss zeigt die Räume (statisch); das Drehbuch eines Besuchs zeigt, wo die Person entlanggeht und in welcher Reihenfolge (dynamisch)."
  },
  "m4": {
   "title": "Die Ausleih-Sequenz",
   "prompt": "Bringe die Nachrichten des Sequenzdiagramms „Buch ausleihen“ in die richtige Reihenfolge.",
   "lines": [
    "Der Leser fragt am Schalter nach dem Buch",
    "Der Freiwillige schlägt den Titel im System nach",
    "Das System prüft, ob ein Exemplar verfügbar ist",
    "Das System erfasst die Ausleihe und das Rückgabedatum",
    "Der Freiwillige händigt dem Leser das Exemplar aus"
   ],
   "hint": "Jede Nachricht ergibt erst Sinn, nachdem die vorherige beantwortet wurde.",
   "why": "Die Sequenz beginnt mit dem Akteur, geht über die Suche und die Prüfung und erfasst erst nach bestätigter Verfügbarkeit. Die physische Übergabe schließt den Ablauf ab.",
   "analogy": "Es ist eine Choreografie: Jeder Schritt antwortet auf den vorherigen, und wer die Reihenfolge vertauscht, lässt die Tänzer zusammenstoßen."
  },
  "m5": {
   "title": "Wie viel modellieren?",
   "prompt": "Das Team möchte alle 40 Klassen im Detail zeichnen, bevor die erste Codezeile geschrieben wird. Was ist die beste Empfehlung?",
   "opts": [
    "Modelliere, was nötig ist, um das Team auszurichten und den riskantesten Teil zu klären, und entwickle das Modell zusammen mit dem Code weiter",
    "Modelliere zuerst alles im Detail, damit es keine Nacharbeit gibt",
    "Modelliere nichts: Der Code ist die Dokumentation",
    "Jeder zeichnet sein eigenes Modell, und dann wird alles zusammengeführt"
   ],
   "hint": "Ein Modell ist so viel wert, wie es Missverständnisse verhindert, nicht die Anzahl der Kästchen.",
   "why": "Zu viel Modellierung veraltet, bevor sie genutzt wird; zu wenig lässt Missverständnisse bis in den Code gelangen. Das richtige Maß reicht, um den nächsten Schritt sicher zu entscheiden.",
   "analogy": "Für eine Reise planst du die Route und buchst das erste Hotel; du legst nicht fest, an welchem Tisch du am zehnten Tag zu Mittag isst."
  },
  "u1": {
   "title": "Zwei Tage für eine Zeile",
   "prompt": "Bia brauchte zwei Tage, um eine Zeile in Caios Code zu korrigieren. Welches Qualitätsmerkmal fehlt?",
   "opts": [
    "Wartbarkeit",
    "Leistung",
    "Benutzerfreundlichkeit",
    "Portabilität"
   ],
   "hint": "Das Programm funktionierte für den Benutzer. Für wen funktionierte es nicht?",
   "why": "Wartbarkeit beschreibt, wie leicht sich Software verstehen, beheben und weiterentwickeln lässt. Sie ist für den Benutzer unsichtbar und entscheidend für die Kosten.",
   "analogy": "Ein Auto kann gut fahren und dennoch erfordern, den Motor auseinanderzunehmen, um eine Glühbirne zu wechseln. Der Mechaniker leidet, und der Besitzer zahlt die Rechnung."
  },
  "u2": {
   "title": "Wie man in einem Review kommentiert",
   "prompt": "Welcher Code-Review-Kommentar ist am nützlichsten?",
   "opts": [
    "Diese Schleife geht die Liste zweimal durch; könnte man sie zu einer zusammenführen? Ich helfe gern, falls du möchtest",
    "Schrecklicher Code, mach es neu",
    "Genehmigt (ohne zu lesen)",
    "Ich hätte es anders gemacht"
   ],
   "hint": "Ein guter Kommentar zeigt auf eine Stelle, erklärt warum und eröffnet ein Gespräch.",
   "why": "Ein effektives Review ist konkret, spricht über den Code statt über die Person und schlägt einen Weg vor. Ohne Lesen zu genehmigen ist schlimmer als kein Review: Es erzeugt falsche Sicherheit.",
   "analogy": "Ein guter Lektor kreist den Satz ein und schlägt einen anderen vor; er gibt das Manuskript nicht mit „das ist schlecht“ auf dem Deckblatt zurück."
  },
  "u3": {
   "title": "Schulden zahlen oder neue machen",
   "prompt": "Ordne jede Aktion in Bezug auf technische Schulden ein.",
   "bins": [
    "Zahlt die Schulden",
    "Macht neue Schulden"
   ],
   "cards": [
    "x1 in total_sales umbenennen",
    "Eine Funktion kopieren und einfügen, um Zeit zu sparen",
    "Tests schreiben, bevor alter Code angefasst wird",
    "Die Warnung des statischen Analysators ausschalten, damit der Build durchläuft"
   ],
   "hint": "Frage: Macht das die nächste Änderung einfacher oder schwerer?",
   "why": "Klare Namen und Tests senken die Kosten zukünftiger Änderungen. Duplikate und unterdrückte Warnungen verstecken Probleme, die größer zurückkommen.",
   "analogy": "Es ist eine Kreditkarte: In Raten zu zahlen löst diesen Monat, aber jede aufgeschobene Rate bringt Zinsen. Umbenennen und Testen heißt die Rechnung bezahlen."
  },
  "u4": {
   "title": "Der Pull-Request mit 2.000 Zeilen",
   "prompt": "Eine Änderung mit 2.000 geänderten Zeilen kommt zum Review. Was ist die beste Vorgehensweise?",
   "opts": [
    "Bitten, sie in kleinere, unabhängige Änderungen aufzuteilen",
    "Alles in einem Durchgang schnell durchsehen",
    "Sie genehmigen, dem Autor vertrauend",
    "Sie ablehnen, ohne zu erklären warum"
   ],
   "hint": "Die Aufmerksamkeit eines Reviewers sinkt nach einigen hundert Zeilen stark.",
   "why": "Kleine Änderungen erhalten echte Aufmerksamkeit im Review, werden schneller gemergt und sind leicht rückgängig zu machen. Eine riesige Änderung geht ungelesen durch.",
   "analogy": "Niemand prüft einen ganzen Umzug, indem er auf den geschlossenen Lastwagen schaut. Karton für Karton sieht man, was kaputt gegangen ist."
  },
  "u5": {
   "title": "Wo zuerst ansetzen",
   "prompt": "Eine Funktion hat zyklomatische Komplexität 35, keine Testabdeckung und wird jede Woche geändert. Was ist die Priorität?",
   "opts": [
    "Hoch: Mit Tests absichern, dann in kleinere Teile aufteilen",
    "Niedrig: Wenn es funktioniert, nicht anfassen",
    "Das ganze System von Grund auf neu schreiben",
    "Keine: Metriken bedeuten nichts"
   ],
   "hint": "Kombiniere drei Signale: viele Pfade, keine Tests, häufige Änderung.",
   "why": "Risiko ist Komplexität multipliziert mit der Änderungshäufigkeit. Zuerst das Sicherheitsnetz aus Tests, dann Refactoring in kleinen Schritten; alles neu zu schreiben tauscht ein bekanntes Risiko gegen mehrere unbekannte.",
   "analogy": "Es ist die Kreuzung ohne Ampel, die jeder zur Hauptverkehrszeit überquert: Die Gefahr liegt nicht darin, dass es sie gibt, sondern wie oft am Tag jemand hindurchgeht."
  },
  "o1": {
   "title": "Was CI tut",
   "prompt": "Was macht Continuous Integration bei jedem Push?",
   "opts": [
    "Baut das Projekt und führt die Tests automatisch aus, mit Warnung, wenn etwas kaputt ist",
    "Veröffentlicht ohne Tests in Produktion",
    "Macht nur eine Sicherungskopie des Codes",
    "Löscht alte Branches"
   ],
   "hint": "Denk an einen Wächter, der jede Änderung prüft, sobald sie ankommt.",
   "why": "CI baut das Projekt von Grund auf und führt die Tests bei jeder Änderung aus. Der Wert liegt in der Geschwindigkeit der Warnung: Minuten, nicht Wochen.",
   "analogy": "Es ist der Metalldetektor an der Tür: Er prüft jede Person beim Eintreten, statt am Monatsende das ganze Gebäude zu durchsuchen."
  },
  "o2": {
   "title": "Der Weg zur Produktion",
   "prompt": "Bringe die Phasen einer kontinuierlichen Bereitstellungs-Pipeline in die richtige Reihenfolge.",
   "lines": [
    "Der Entwickler pusht den Code",
    "Der CI-Server holt den Code und installiert die Abhängigkeiten",
    "Die automatisierten Tests laufen",
    "Das Release-Paket wird gebaut",
    "Die Version wird in Produktion freigegeben"
   ],
   "hint": "Nichts wird paketiert, bevor es die Tests bestanden hat, und nichts wird freigegeben, bevor es paketiert wurde.",
   "why": "Jede Phase ist ein Tor: Nur was die Tests bestanden hat, wird paketiert, und nur was reproduzierbar paketiert wurde, wird freigegeben.",
   "analogy": "Ein Fließband: Das Teil kommt an, wird zusammengebaut, durchläuft die Qualitätskontrolle, wird verpackt und verlässt erst dann die Werkstatt."
  },
  "o3": {
   "title": "„Bei mir funktioniert es“",
   "prompt": "Die App läuft auf Bias Laptop und stürzt auf dem Server ab. Was ist die wahrscheinlichste Ursache und die richtige Lösung?",
   "opts": [
    "Unterschiedliche Umgebungen; Abhängigkeiten und Versionen in einer Datei deklarieren und überall dieselbe Umgebung verwenden",
    "Ein defekter Server; einen neuen kaufen",
    "Pech; morgen nochmal versuchen",
    "Eine schlechte Sprache; in einer anderen neu schreiben"
   ],
   "hint": "Der Code ist an beiden Orten derselbe. Was ändert sich um ihn herum?",
   "why": "Derselbe Code verhält sich anders, wenn sich Versionen und Einstellungen ändern. Deklarierte Abhängigkeiten und standardisierte Umgebungen machen die Ausführung reproduzierbar.",
   "analogy": "Das Rezept funktioniert in deiner Küche und scheitert beim Nachbarn, weil dessen Ofen eine andere Temperatur anzeigt. Standardisiere den Ofen; gib nicht dem Kuchen die Schuld."
  },
  "o4": {
   "title": "Risiko bei Releases",
   "prompt": "Ordne jede Praxis nach ihrer Auswirkung auf das Release-Risiko ein.",
   "bins": [
    "Senkt das Risiko",
    "Erhöht das Risiko"
   ],
   "cards": [
    "Kleine Änderungen mehrmals pro Woche veröffentlichen",
    "Drei Monate Änderungen in einem einzigen Release anhäufen",
    "Einen getesteten Rollback-Befehl haben",
    "Dateien direkt auf dem Produktionsserver bearbeiten"
   ],
   "hint": "Frage: Wenn es schiefgeht, ist es leicht, die Ursache zu finden und zurückzugehen?",
   "why": "Eine kleine Änderung hat eine leicht zu findende Ursache, und ein getesteter Rollback bietet einen schnellen Weg zurück. Ein riesiges Release und manuelle Änderungen in Produktion machen den Fehler schwer zu lokalisieren und rückgängig zu machen.",
   "analogy": "Den Fluss Stein für Stein zu überqueren erlaubt dir, einen Schritt zurückzutreten. Von einem Ufer zum anderen zu springen ist alles oder nichts."
  },
  "o5": {
   "title": "CI ist seit drei Tagen rot",
   "prompt": "Ein Test schlägt seit drei Tagen in der CI fehl und das Team pusht weiterhin Code. Was ist das richtige Vorgehen?",
   "opts": [
    "Anhalten und zuerst den Build reparieren: Ein ignorierter Alarm schützt nicht mehr",
    "Den fehlschlagenden Test deaktivieren",
    "Weitermachen und am Monatsende alles reparieren",
    "CI entfernen, das stört nur"
   ],
   "hint": "Was ist ein Alarm wert, wenn alle gelernt haben, ihn zu ignorieren?",
   "why": "Bei einem roten Build schleichen sich neue Fehler hinter dem ersten versteckt ein. Die Reparatur des Builds wird zur Priorität des ganzen Teams; den Test zu deaktivieren schaltet nur das Lämpchen am Armaturenbrett aus.",
   "analogy": "Das ist die Öllampe am Armaturenbrett: Sie abzukleben repariert nicht den Motor."
  },
  "v6": {
   "title": "Die Mathe am Tresen",
   "prompt": "Zwei Brote zu 4 Reais und eine Rechnung im Kopf. Was gibt das Programm aus?",
   "hint": "In der Programmierung wie in der Mathematik wird die Multiplikation vor der Addition ausgeführt.",
   "why": "Zuerst 3 × 4 = 12, dann 2 + 12 = 14. Um zuerst zu addieren, müsste man (2 + 3) * 4 schreiben.",
   "analogy": "Das ist die Prioritätsspur an der Kasse: Wer Priorität hat, kommt zuerst dran, auch wenn er später ankam. Klammern sind der Ausweis, der die Reihenfolge ändert."
  },
  "v7": {
   "title": "Die verschwundenen Cent",
   "prompt": "Dona Lúcia addiert zwei Beträge und vergleicht sie mit dem, was sie erwartet hat. Was gibt das Programm aus?",
   "hint": "Dezimalzahlen werden binär gespeichert, und nicht jede Dezimalzahl passt exakt in diese Form.",
   "why": "In binärer Darstellung sind 0,1 und 0,2 periodische Brüche: Die Summe ergibt 0,30000000000000004 und der exakte Vergleich schlägt fehl. Für Geld vergleicht man mit einer Toleranz oder arbeitet mit ganzen Zahlen in Cent.",
   "analogy": "Das ist, als würdest du einen Zentimeter mit einem Zoll-Lineal messen: Jede Umrechnung hinterlässt einen unsichtbaren Rest, und das Addieren von Resten verfälscht die Summe."
  },
  "v8": {
   "title": "Gramm, die zu Tonnen werden",
   "prompt": "Das Rezept verwendet 500 Gramm Mehl, aber das Programm gibt 500000 aus. Welche Zeile ist falsch?",
   "hint": "Ein Kilo hat tausend Gramm. Um von Gramm auf Kilo zu kommen: multiplizierst du oder dividierst du?",
   "why": "Die Umrechnung ist umgekehrt: Von Gramm zu Kilo dividiert man durch 1000. Multiplizieren geht in die entgegengesetzte Richtung.",
   "analogy": "Das ist wie Währungsumrechnung in die falsche Richtung: Die Zahl wird riesig und die Rechnung sieht richtig aus, bis jemand den Endbetrag prüft."
  },
  "v9": {
   "title": "Gläser tauschen ohne Verschütten",
   "prompt": "Baue das Programm, das die Werte von a und b mithilfe einer temporären Variablen tauscht und das Ergebnis ausgibt.",
   "hint": "Speichere einen der Werte, bevor er überschrieben wird.",
   "why": "Die temporäre Variable hält den ersten Wert, während er ersetzt wird. Ohne sie geht einer der beiden verloren, wie im Kassenbeleg, bei dem der Tausch schiefging.",
   "analogy": "Um den Inhalt von zwei vollen Gläsern zu tauschen, benutzt du ein drittes, leeres. Derselbe Zug, im Code."
  },
  "v10": {
   "title": "Ganz oder dezimal",
   "prompt": "Ordne jede Angabe aus der Bäckerei dem passenden numerischen Typ zu.",
   "bins": [
    "Ganzzahl",
    "Dezimalzahl"
   ],
   "cards": [
    "Anzahl der heute verkauften Brote",
    "Preis pro Kilo Mehl",
    "Anzahl der Kunden in der Warteschlange",
    "Gewicht des Teigs in Kilo"
   ],
   "hint": "Frag dich, ob die Hälfte davon Sinn ergibt.",
   "why": "Was du Stück für Stück zählst, verlangt eine Ganzzahl; was du in Teilen misst, verlangt eine Dezimalzahl. Ein halber Kunde existiert nicht; ein halbes Kilo schon.",
   "analogy": "Es ist der Unterschied zwischen Eier zählen und Mehl wiegen: Das eine passt in eine Schachtel, das andere braucht eine Waage."
  },
  "c6": {
   "title": "Eine Frage in einer anderen",
   "prompt": "Was gibt das Programm aus?",
   "hint": "Der zweite Test findet nur statt, wenn der erste wahr ist.",
   "why": "5 > 3 ist wahr, also geht es in den inneren Block. Dort ist 5 > 10 falsch und das Programm fällt in den inneren else-Zweig. Der äußere else-Zweig wird nie erreicht.",
   "analogy": "Es ist wie eine Triage hinter zwei Türen: Wer die erste passiert, trifft dahinter auf eine weitere Entscheidung, und wer nicht, sieht sie nie."
  },
  "c7": {
   "title": "Ein älterer Patient ohne Priorität",
   "prompt": "Patienten ab 65 Jahren und außerdem Kinder bis 12 Jahre sollen Priorität bekommen. Das Programm markiert niemanden. Welche Zeile muss geändert werden?",
   "hint": "Gibt es ein Alter, das gleichzeitig über 65 und unter 12 ist?",
   "why": "Mit UND müssen beide Bedingungen zusammen gelten, was unmöglich ist. Die Regel verbindet zwei getrennte Gruppen, also braucht es ODER.",
   "analogy": "Es ist das Schild „Eingang für Senioren und Kinder“: Niemand ist beides zugleich. Wenn man „und“ durch „oder“ ersetzt, öffnet sich die Tür für beide Gruppen."
  },
  "c8": {
   "title": "Zählt der Grenzwert oder nicht",
   "prompt": "Ordne jede Triage-Bedingung danach, was sie mit dem exakten Grenzwert macht.",
   "bins": [
    "Schließt den Grenzwert ein",
    "Schließt den Grenzwert aus"
   ],
   "cards": [
    "Temperatur >= 39",
    "Temperatur > 39",
    "Alter <= 12",
    "Alter < 12"
   ],
   "hint": "Der Strich unter dem Zeichen ist das, was das „oder gleich“ trägt.",
   "why": "Die Zeichen >= und <= schließen den Grenzwert ein; > und < lassen genau diesen Wert außen vor. Hier entstehen Grenzfehler.",
   "analogy": "Es ist der Unterschied zwischen „ab 65“ und „über 65“: Wer genau 65 ist, ist bei der einen Regel dabei und bei der anderen nicht."
  },
  "c9": {
   "title": "Rosas Triage, in drei Stufen",
   "prompt": "Setze die Triage zusammen: Fieber ab 39 ist rot; sonst ist Alter ab 65 gelb; alle anderen sind grün.",
   "hint": "Die schwerwiegendste Regel kommt zuerst, und jeder Patient geht mit einer einzigen Stufe hinaus.",
   "why": "Die Kette aus if, elif und else garantiert, dass nur eine Stufe zugewiesen wird und die schwerwiegendste Regel zuerst geprüft wird. Die Daten müssen vor dem Test existieren, und das Ausgeben kommt nach der Entscheidung.",
   "analogy": "Es ist das Protokoll an der Wand der Klinik: Man liest es von oben nach unten und hört bei der ersten Zeile auf, die zutrifft."
  },
  "c10": {
   "title": "Die Division, die nie passiert",
   "prompt": "Wenn x gleich null ist, würde die Division durch x fehlschlagen. Was gibt das Programm aus?",
   "hint": "Wenn der erste Test eines UND bereits falsch ist, wird der zweite überhaupt ausgewertet?",
   "why": "Der UND-Operator schließt kurz: Da x != 0 falsch ist, wird die Division nie ausgeführt und das Programm geht in den else-Zweig, ohne Fehler. Dieses Muster schützt riskante Operationen.",
   "analogy": "Es ist wie der Blick auf die Tankanzeige, bevor man den Schlüssel dreht: Ist nichts da, versucht niemand, den Motor zu starten. Die Reihenfolge der Tests ist der Schutz."
  },
  "q7": {
   "title": "Herausfinden oder Überprüfen",
   "prompt": "Ordne jede Aktivität der Anforderungsermittlung zu.",
   "bins": [
    "Ermittlung (Herausfinden)",
    "Validierung (Überprüfen)"
   ],
   "cards": [
    "Die Rezeptionistin über ihren Tagesablauf befragen",
    "Die Anforderungsliste vor dem Programmieren mit der Leitung durchsehen",
    "Patienten bei der Nutzung des Ticket-Automaten beobachten",
    "Einen Prototyp zeigen und prüfen, ob das wirklich das Erwartete ist"
   ],
   "hint": "Frag dich, ob die Aktivität neue Informationen sucht oder bestätigt, was bereits aufgeschrieben ist.",
   "why": "Befragen und Beobachten bringen Anforderungen ans Licht, die noch nicht auf dem Papier standen. Durchsehen und Prototypen prüfen, ob das Geschriebene dem echten Bedarf entspricht.",
   "analogy": "Es ist der Unterschied zwischen dem Maßnehmen beim Kunden und dem Anprobieren des Kleidungsstücks. Das Erste entdeckt; das Zweite bestätigt."
  },
  "q8": {
   "title": "Der Weg einer Anforderung",
   "prompt": "Bringe die Phasen der Anforderungsermittlung in die richtige Reihenfolge.",
   "lines": [
    "Ermittlung: herausfinden, was die Leute brauchen",
    "Analyse: Konflikte lösen und Prioritäten setzen",
    "Spezifikation: die Anforderungen überprüfbar aufschreiben",
    "Validierung: mit den Auftraggebern prüfen, ob das richtig ist",
    "Management: Änderungen während des gesamten Projekts steuern"
   ],
   "hint": "Zuerst herausfinden, dann ordnen, aufschreiben und prüfen; das Steuern von Änderungen läuft parallel zu allem anderen.",
   "why": "Jede Phase speist die nächste: Man priorisiert nicht, was nie angesprochen wurde, und validiert nicht, was nie aufgeschrieben wurde. Das Management beginnt, wenn sich Anforderungen ändern, und das tun sie immer.",
   "analogy": "Es ist wie beim Hausbau: mit der Familie sprechen, entscheiden, was ins Budget passt, den Plan zeichnen, die Zeichnung zeigen und dann jede Meinungsänderung festhalten."
  },
  "q9": {
   "title": "»Das System benachrichtigt den Patienten«",
   "prompt": "Die Anforderung sagt nur: »Das System benachrichtigt den Patienten.« Warum ist das ein Problem?",
   "opts": [
    "Sie sagt nicht, wann, über welchen Kanal oder was bei einem Fehlschlag zu tun ist.",
    "Sie ist zu lang und sollte aufgeteilt werden.",
    "Sie verwendet das Wort System, das vermieden werden sollte.",
    "Das ist kein Problem: Sie ist klar genug."
   ],
   "hint": "Stell dir zwei Personen vor, die diesen Satz umsetzen, ohne miteinander zu sprechen. Würden sie dasselbe bauen?",
   "why": "Eine mehrdeutige Anforderung ist eine, die mehr als eine vernünftige Lesart zulässt. Am Vortag per SMS zu benachrichtigen ist anders, als sofort per E-Mail zu benachrichtigen, und beides passt zu diesem Satz.",
   "analogy": "Es ist, als würdest du einem Freund sagen: »Sag mir Bescheid.« Er könnte morgens um sechs anrufen oder eine Nachricht bei einem Nachbarn hinterlassen. Ohne eine Absprache macht es jeder auf seine Weise."
  },
  "q10": {
   "title": "Abnahmekriterien",
   "prompt": "Was macht aus einer User Story etwas, von dem das Team weiß, dass es fertig ist?",
   "opts": [
    "Abnahmekriterien: überprüfbare Bedingungen, die sagen, wann es fertig ist.",
    "Die Schätzung des Entwicklers in Stunden.",
    "Der Name der Person, die die Funktion angefordert hat.",
    "Der vom Designer gezeichnete Bildschirm."
   ],
   "hint": "Überlege, womit du mit Ja oder Nein antworten kannst auf: Ist es fertig?",
   "why": "Abnahmekriterien beschreiben das erwartete Verhalten in überprüfbaren Bedingungen. Ohne sie wird »fertig« zu einer Meinungssache.",
   "analogy": "Es ist die Mängelliste bei der Wohnungsübergabe: Ohne sie wird die Schlüsselübergabe zum Streit darüber, was vereinbart war."
  },
  "q11": {
   "title": "Zwei Anforderungen, die sich widersprechen",
   "prompt": "Die Direktorin möchte eine vollständige Patientenakte; die Rezeption möchte die Terminvergabe in unter einer Minute. Was ist die beste Vorgehensweise?",
   "opts": [
    "Den Konflikt beiden Parteien vortragen und eine explizite Lösung aushandeln, zum Beispiel jetzt eine minimale Akte und später die vollständige.",
    "Sich auf die Seite der Direktorin stellen, weil sie mehr Autorität hat.",
    "Sich auf die Seite der Rezeption stellen, weil sie näher am Problem sind.",
    "Beides umsetzen und sie es in der Praxis klären lassen."
   ],
   "hint": "Ein Konflikt zwischen Anforderungen ist ein Problem, das in der Analyse geklärt werden muss, nicht im Code.",
   "why": "Widersprüchliche Anforderungen müssen mit den Stakeholdern geklärt werden, bevor sie zu Code werden. Eine Entscheidung im Stillen verlagert den Konflikt in das Produkt, wo er viel mehr kostet.",
   "analogy": "Zwei Zimmer streiten sich auf dem Plan um dieselbe Wand. Die Architektin setzt sich mit der Familie zusammen und entscheidet im Voraus; ist die Wand erst gebaut, kostet sie eine Renovierung."
  },
  "g7": {
   "title": "Rückgängig machen, ohne die Historie zu löschen",
   "prompt": "Eine bereits veröffentlichte Änderung hat das Bäckereisystem kaputtgemacht. Bringe die Schritte, um sie sicher rückgängig zu machen, in die richtige Reihenfolge.",
   "lines": [
    "Den Commit identifizieren, der den Fehler verursacht hat, in der Historie.",
    "Einen Revert-Commit erstellen, der diese Änderungen rückgängig macht.",
    "Die Tests ausführen, um zu bestätigen, dass das System wieder normal läuft.",
    "Den Revert in das entfernte Repository pushen.",
    "Die Ursache in Ruhe untersuchen und den endgültigen Fix vorbereiten."
   ],
   "hint": "Stelle zuerst den Dienst wieder her; das Verstehen kommt danach, wenn das System stabil ist.",
   "why": "Ein Revert erstellt einen neuen Commit, der den vorherigen rückgängig macht, ohne die Historie zu löschen, die andere bereits gepullt haben. Danach zu untersuchen ist sicher, weil das System bereits wieder funktioniert.",
   "analogy": "In der Buchhaltung streicht man einen falschen Eintrag nicht durch: Man bucht eine Stornobuchung. Der Fehler bleibt in den Aufzeichnungen, und der Saldo stimmt wieder."
  },
  "g8": {
   "title": "Nur abholen oder gleich zusammenführen",
   "prompt": "Was ist der Unterschied zwischen fetch und pull in Git?",
   "opts": [
    "Fetch holt nur die Änderungen vom Remote; pull holt sie und führt sie in deinen Branch zusammen.",
    "Sie sind zwei Namen für dieselbe Operation.",
    "Fetch sendet Änderungen; pull empfängt sie.",
    "Fetch funktioniert nur auf main; pull auf jedem Branch."
   ],
   "hint": "Eine der beiden Operationen verändert deine Dateien sofort. Welche?",
   "why": "Fetch aktualisiert deine Sicht auf das Remote-Repository, ohne deine Arbeit anzufassen, sodass du siehst, was sich geändert hat, bevor du es integrierst. Pull macht beides auf einmal und kann sofort einen Konflikt auslösen.",
   "analogy": "Es ist der Unterschied zwischen dem Abholen der Post und dem Öffnen der Umschläge am Schreibtisch, an dem du arbeitest. Fetch lässt sie im Briefkasten; pull breitet sie jetzt aus."
  },
  "g9": {
   "title": "Was ins Repository gehört",
   "prompt": "Ordne jede Datei des Bäckereiprojekts ein.",
   "bins": [
    "Versionieren",
    "Ausschließen (.gitignore)"
   ],
   "cards": [
    "Der Quellcode der Wechselgeldberechnung",
    "Die Datei mit dem Datenbankpasswort",
    "Die README mit Installationsanweisungen",
    "Der Ordner mit automatisch heruntergeladenen Bibliotheken"
   ],
   "hint": "Frage, ob das Team die Datei geschrieben hat und ob jeder mit Zugriff auf das Repository sie sehen darf.",
   "why": "Du versionierst, was das Team schreibt und teilen muss. Geheimnisse kommen nie hinein, weil die Git-Historie dauerhaft ist; heruntergeladene Abhängigkeiten auch nicht, weil sie aus der Abhängigkeitsdatei neu erstellt werden können.",
   "analogy": "Es ist wie Kofferpacken: Deine Kleidung kommt hinein, das Hotel-Shampoo bleibt draußen. Und dein Hausschlüssel reist sicher nicht in einem offenen Koffer."
  },
  "g10": {
   "title": "Der Force Push",
   "prompt": "Ein Kollege schlägt vor, einen Force Push auf den main-Branch zu machen, um die Historie »aufzuräumen«. Warum ist das gefährlich?",
   "opts": [
    "Er schreibt die Historie um, die andere bereits gepullt haben, und kann ihre Arbeit löschen.",
    "Er macht das Repository langsamer.",
    "Er funktioniert nur mit Admin-Rechten.",
    "Es ist nicht gefährlich: Es ist die empfohlene Art, Commits zu organisieren."
   ],
   "hint": "Was passiert mit jemandem, der die alte Version bereits gepullt hat und darauf weitergearbeitet hat?",
   "why": "Ein Force Push ersetzt die Remote-Historie. Commits, die andere bereits gepullt haben, verschwinden aus der Zeitachse, und die darauf aufbauende Arbeit wird verwaist. Auf einem gemeinsamen Branch solltest du stattdessen reverten.",
   "analogy": "Es ist, als würdest du das Protokoll einer Sitzung neu drucken, das alle bereits mit nach Hause genommen haben. Wer die alte Version mit Anmerkungen versehen hat, hält ein Dokument in der Hand, das es nicht mehr gibt."
  },
  "g11": {
   "title": "Der Commit, der alles macht",
   "prompt": "Ein Commit ändert die Wechselgeldberechnung, benennt zwanzig Variablen um und fügt einen neuen Bildschirm hinzu. Was ist das Problem?",
   "opts": [
    "Er kann nicht isoliert überprüft, rückgängig gemacht oder auf die Fehlerquelle zurückverfolgt werden.",
    "Keins: Große Commits sparen Zeit.",
    "Git hat ein Limit für Dateien pro Commit.",
    "Die Nachricht wird viel zu lang."
   ],
   "hint": "Denke an den Tag, an dem nur eine dieser drei Änderungen rückgängig gemacht werden muss.",
   "why": "Jeder Commit sollte eine zusammenhängende Änderung enthalten. Wenn man drei mischt, zieht ein Revert auch das mit, was richtig war, und die Überprüfung verliert sich zwischen Umbenennungen und neuer Logik.",
   "analogy": "Es ist, als würdest du Küche, Bad und Büro in denselben Karton packen. Um eine Tasse zu finden, musst du alles umdrehen, und du kannst nicht nur das zurückschicken, was falsch ankam."
  },
  "w1": {
   "title": "Die Versandgebühr der Kooperative",
   "prompt": "Schreibe die Versandfunktion: 5 Reais fest plus 2 Reais pro Kilometer.",
   "hint": "Eine Zeile genügt: Gib das Ergebnis der Berechnung zurück, gib es nicht aus.",
   "why": "Die Regel wird zu einer benannten Funktion, die von der Website, der App und der Tabelle aufgerufen werden kann, ohne dass Kopien voneinander abweichen.",
   "analogy": "Das ist die Preisliste an der Wand: nur eine, und alle lesen dieselbe."
  },
  "w2": {
   "title": "Die Verkaufsliste zusammenzählen",
   "prompt": "Schreibe die Funktion, die alle Werte einer Liste addiert und die Summe zurückgibt. Bei einer leeren Liste ist die Summe null.",
   "hint": "Beginne mit einem Sammler bei null und gehe die Liste durch und addiere.",
   "why": "Das ist das Sammler-Muster: ein neutraler Wert am Anfang, eine Addition pro Runde, das Ergebnis wird nach der Schleife zurückgegeben.",
   "analogy": "Das ist das Sparschwein: Es beginnt leer, nimmt eine Münze nach der anderen, und erst am Ende zählst du, was drin ist."
  },
  "w3": {
   "title": "Die Triage der Klinik",
   "prompt": "Schreibe die Triage-Funktion: 39 oder mehr gibt \"rot\" zurück; von 37,5 bis 38,9 gibt \"gelb\" zurück; unter 37,5 gibt \"grün\" zurück.",
   "hint": "Die ernsteste Regel kommt zuerst, und jeder Patient geht mit einem einzigen Level.",
   "why": "Die Kette von Bedingungen garantiert ein Ergebnis pro Patient. Die Grenzwerte 39 und 37,5 sind genau die Stellen, an denen Fehler auftauchen.",
   "analogy": "Das ist das Protokoll an der Klinikwand: Lies von oben nach unten und stoppe bei der ersten Zeile, die zutrifft."
  },
  "w4": {
   "title": "Wie viele über dem Limit liegen",
   "prompt": "Schreibe die Funktion, die zählt, wie viele Werte in der Liste größer als das gegebene Limit sind.",
   "hint": "Ein Zähler vor der Schleife, eine Bedingung darin, das Ergebnis danach.",
   "why": "Zählen unterscheidet sich vom Addieren: Der Zähler bewegt sich um eins, egal wie groß der Wert ist. Größer als das Limit schließt den Wert aus, der gleich dem Limit ist.",
   "analogy": "Das ist der Türsteher mit einem Handzähler: ein Klick pro Person, die die Regel erfüllt."
  },
  "w5": {
   "title": "Fakultät, ohne Schleife",
   "prompt": "Schreibe die Fakultätsfunktion mit Rekursion. Die Fakultät von 0 ist 1.",
   "hint": "Behandle zuerst den Basisfall; gib dann n mal die Fakultät von n minus 1 zurück.",
   "why": "Ohne Basisfall ruft sich die Funktion endlos selbst auf. Mit ihm bewegt sich jeder Aufruf gegen null, und die Antworten kommen multiplizierend zurück.",
   "analogy": "Das sind die russischen Puppen: Du hörst bei der massiven auf und kommst zurück und schließt sie eine nach der anderen."
  },
  "w6": {
   "title": "Das Wechselgeld der Bäckerei",
   "prompt": "Schreibe die Funktion, die das Wechselgeld zurückgibt: wie viel vom gezahlten Betrag übrig bleibt, nachdem der Preis abgezogen wurde.",
   "hint": "Eine Subtraktion und eine Rückgabe. Preis und gezahlt kommen als Parameter an.",
   "why": "Beide Werte kommen von außen, die Funktion gibt das Ergebnis zurück und gibt nichts aus: So dient sie der Kasse, dem Beleg und dem Bericht.",
   "analogy": "Das ist der Taschenrechner auf dem Tresen: Er nimmt die zwei Zahlen, zeigt die Differenz und behält nichts für sich."
  },
  "x1": {
   "title": "Multiplizieren ohne zu multiplizieren",
   "prompt": "Schreibe mult(a, b), die a mal b zurückgibt, indem sie in einer for-Schleife nur Addition verwendet. Der Operator * ist nicht erlaubt. Nimm an, b ist null oder mehr.",
   "hint": "3 mal 4 multiplizieren heißt, 3 viermal zu addieren.",
   "why": "Multiplikation ist wiederholte Addition. Die Schleife zu schreiben zeigt, dass du verstehst, was der Operator darunter tut, und der Fall, dass b null ist, testet, ob der Sammler an der richtigen Stelle beginnt.",
   "analogy": "Das ist das Zählen eines Stapels von vier Münzen im Wert von je drei: Du addierst in Dreierschritten."
  },
  "x2": {
   "title": "Potenz Schritt für Schritt",
   "prompt": "Schreibe power(base, exp), die base hoch exp zurückgibt, wobei exp null oder mehr ist. Verwende nicht ** oder eingebaute Potenzfunktionen.",
   "hint": "Beginne bei 1 und multipliziere mit der Basis, exp-mal.",
   "why": "Potenz ist wiederholte Multiplikation, genauso wie Multiplikation wiederholte Addition ist. Der Sammler beginnt bei 1, dem neutralen Element der Multiplikation, und das bewirkt, dass exp gleich null 1 zurückgibt.",
   "analogy": "Das ist das Falten eines Blattes Papier: Jede Faltung verdoppelt die Lagen, und ohne Faltungen hast du eine Lage."
  },
  "x11": {
   "title": "Quersumme, ohne Schleife",
   "prompt": "Schreibe digit_sum(n), das die Quersumme von n (null oder mehr) mithilfe von Rekursion zurückgibt. for und while sind nicht erlaubt.",
   "hint": "Die letzte Ziffer ist n % 10; der Rest der Zahl ist n geteilt durch 10, ohne den Dezimalteil.",
   "why": "Ohne Schleife kommt die Wiederholung von der Funktion selbst. Der Basisfall (eine einstellige Zahl) sorgt dafür, dass die Aufrufe aufhören.",
   "analogy": "Das ist wie das Schälen einer Zwiebel: Du entfernst eine Schicht, schaust, was übrig ist, und wiederholst das, bis du zum Kern kommst."
  },
  "x12": {
   "title": "Sekunden auf der Uhr",
   "prompt": "Schreibe hms(seconds), das eine Anzahl Sekunden in das Format \"hh:mm:ss\" umwandelt, immer mit zwei Ziffern pro Teil.",
   "hint": "Stunden sind Sekunden geteilt durch 3600; Minuten ergeben sich aus dem Rest nach den Stunden, geteilt durch 60.",
   "why": "Jeder Teil ergibt sich aus dem Rest des vorherigen: dieselbe Überlegung wie beim Herausgeben von Wechselgeld mit den größten Scheinen zuerst. Die führenden Nullen sind Formatierung, keine Berechnung.",
   "analogy": "Das ist wie Wechselgeld mit den wenigsten Scheinen: zuerst die Hunderter, dann die Zehner, und was übrig bleibt in Münzen."
  },
  "x3": {
   "title": "Das Größte in der Liste",
   "prompt": "Schreibe largest(values), das den größten Wert einer nicht leeren Liste zurückgibt. Verwende nicht max und sortiere die Liste nicht.",
   "hint": "Behalte das erste Element als bislang größtes und vergleiche es mit jedem der anderen.",
   "why": "Das ist das Muster des vorläufigen Champions. Vom ersten Element auszugehen, nicht von null, ist das, was eine Liste negativer Zahlen funktionieren lässt.",
   "analogy": "Es ist ein Armdrück-Wettbewerb: Wer gewinnt, bleibt am Tisch und tritt gegen den Nächsten an."
  },
  "x4": {
   "title": "Durchschnitt ohne Abkürzungen",
   "prompt": "Schreibe average(values), das den Durchschnitt einer nicht leeren Liste zurückgibt. Verwende keine eingebauten Summen- oder Durchschnittsfunktionen.",
   "hint": "Addiere alles in einer Schleife und teile durch die Anzahl der Elemente.",
   "why": "Der Durchschnitt ist die Summe geteilt durch die Anzahl. In Java und C fällt beim Teilen zweier Ganzzahlen der Dezimalteil weg, daher muss die Summe als Dezimalzahl gehalten werden.",
   "analogy": "Es ist das Aufteilen der Restaurantrechnung: zuerst alles zusammenzählen, dann durch die Anzahl der Personen teilen."
  },
  "x5": {
   "title": "Gerade oder ungerade, ohne Rest",
   "prompt": "Schreibe parity(n), das \"even\" für gerade Zahlen und \"odd\" für ungerade Zahlen zurückgibt, ohne den %-Operator zu verwenden.",
   "hint": "Teile durch 2 und lass den Dezimalteil weg, multipliziere zurück mit 2 und vergleiche mit der ursprünglichen Zahl.",
   "why": "Der Restoperator ist eine Abkürzung. Die Zahl aus der Ganzzahldivision wieder aufzubauen zeigt, was der Rest bedeutet: das, was übrig bleibt, wenn die Division nicht aufgeht.",
   "analogy": "Es ist das Teilen von Süßigkeiten zwischen zwei Kindern: Wenn eine in deiner Hand übrig bleibt, war die Gesamtzahl ungerade."
  },
  "x6": {
   "title": "Von hinten nach vorn",
   "prompt": "Schreibe reverse(text), das den Text umgekehrt zurückgibt. Verwende keine eingebauten Umkehrfunktionen und kein Slicing mit negativem Schritt.",
   "hint": "Gehe den Text durch und setze jeden Buchstaben vor das Ergebnis.",
   "why": "Das manuelle Umkehren erfordert, über die Position jedes Zeichens nachzudenken. Der leere Text und der Ein-Buchstaben-Text testen, ob die Schleife die Ränder behandelt.",
   "analogy": "Es ist das Abtragen eines Tellerstapels: Der letzte, der hineinkommt, ist der erste, der herauskommt."
  },
  "x7": {
   "title": "Der Taschenrechner",
   "prompt": "Schreibe calc(a, op, b), das das Ergebnis von a op b zurückgibt, wobei op \"+\", \"-\", \"*\" oder \"/\" ist. Verwende nicht eval.",
   "hint": "Eine Bedingung pro Operation. In Java vergleichst du Text mit equals, nicht mit ==.",
   "why": "Das Symbol in eine Aktion zu verwandeln ist das Wesen eines Interpreters. Das Verbot von eval zwingt dich, jeden Fall zu behandeln, und es ist sicherer: eval würde alles ausführen, was der Benutzer eingibt.",
   "analogy": "Es ist der Kellner, der die geschriebene Bestellung entgegennimmt und entscheidet, in welche Küche er sie bringt: Jedes Symbol hat sein Ziel."
  },
  "x8": {
   "title": "BMI mit Klassifizierung",
   "prompt": "Schreibe bmi_class(weight, height), das den BMI berechnet (Gewicht geteilt durch Größe im Quadrat) und \"under\" unter 18,5 zurückgibt; \"normal\" von 18,5 bis unter 25; \"over\" von 25 bis unter 30; \"obese\" ab 30.",
   "hint": "Berechne den BMI einmal und teste dann die Bereiche vom niedrigsten zum höchsten.",
   "why": "Die Berechnung und die Klassifizierung sind zwei Schritte, und die exakten Grenzen (18,5; 25; 30) zeigen, ob die Bedingungen die Grenze einschließen oder ausschließen. Der BMI ist ein Screening-Indikator für Populationen, keine individuelle Diagnose.",
   "analogy": "Es ist die Größenmesslatte im Vergnügungspark: Zuerst wird gemessen, und erst dann wird entschieden, welche Fahrt die Person benutzen darf."
  },
  "x9": {
   "title": "Vokale zählen",
   "prompt": "Schreibe count_vowels(text), das zurückgibt, wie viele Vokale (a, e, i, o, u) der Text hat, wobei Groß- und Kleinschreibung ignoriert wird.",
   "hint": "Gehe den Text durch und prüfe für jeden Buchstaben in Kleinbuchstaben, ob er ein Vokal ist.",
   "why": "Das ist Zählen mit einem Filter: ein Zähler, eine Schleife und eine Bedingung. Vor dem Vergleichen in Kleinbuchstaben umzuwandeln vermeidet es, die Regel für Großbuchstaben zu wiederholen.",
   "analogy": "Es ist der Marktaufseher, der nur die Obststände zählt: Er geht an allen vorbei, markiert aber nur die, die die Regel erfüllen."
  },
  "x10": {
   "title": "FizzBuzz",
   "prompt": "Schreibe fizzbuzz(n): Gib \"FizzBuzz\" zurück, wenn n ein Vielfaches von 3 und 5 ist, \"Fizz\", wenn nur von 3, \"Buzz\", wenn nur von 5, und sonst die Zahl selbst als Text.",
   "hint": "Teste zuerst den spezifischsten Fall, das Vielfache von 15.",
   "why": "Die Reihenfolge der Bedingungen ist wichtig: Wenn der Test für 3 vor dem für 15 kommt, erreicht 15 nie FizzBuzz. Das ist der häufigste Fehler in dieser klassischen Übung.",
   "analogy": "Es ist eine Triage, die zuerst den Patienten mit beiden Symptomen ansieht: Behandelt man nur das erste Symptom, bleibt der volle Fall unbemerkt."
  }
 },
 "game": {
  "shop": {
   "shield": [
    "Schutzschild",
    "Absorbiert die XP-Strafe deines nächsten Fehlers. Wird automatisch eingesetzt."
   ],
   "fifty": [
    "Zwei entfernen",
    "Entfernt zwei falsche Optionen aus einer Multiple-Choice-Aufgabe. Eine richtige Antwort zählt dann als schwächerer Beleg für die Beherrschung."
   ],
   "time": [
    "Zusätzliche Zeit",
    "Fügt im {h}-Modus 30 Sekunden zur Uhr hinzu."
   ],
   "boost": [
    "Doppelte XP",
    "Verdoppelt die XP deiner nächsten 3 Aufgaben. Wird aktiviert, sobald du sie einlöst."
   ],
   "tBug": [
    "Bugjäger",
    "Ein Titel, der neben deiner Rolle angezeigt wird."
   ],
   "tArch": [
    "Architektengeist",
    "Ein Titel, der neben deiner Rolle angezeigt wird."
   ],
   "tLegend": [
    "Deployment-Legende",
    "Ein Titel, der neben deiner Rolle angezeigt wird."
   ]
  },
  "bounties": {
   "b1": "Löse 3 Aufgaben in Folge richtig ohne Hinweise",
   "b2": "Löse eine Aufgabe im {d}- oder {h}-Modus",
   "b3": "Sauberer Sprint: 5 von 5"
  },
  "bosses": {
   "bossA": {
    "name": "Der Inspektor",
    "client": "Dona Lúcias Bäckerei",
    "trophy": "Inspektorensiegel",
    "story": "Ein Stadtinspektor betritt die Bäckerei und möchte innerhalb einer Stunde den gesamten rabattierten Umsatz, die Anzahl der Kunden mit Rabatt und die Wechselgeldberechnung sehen. Das Kassenprogramm mischt Variablen, Bedingungen und Schleifen, und jeder Fehler bedeutet ein Bußgeld. Dona Lúcia schaut dich an."
   },
   "bossB": {
    "name": "Die große Migration",
    "client": "Notariat des 2. Bezirks",
    "trophy": "Archivschlüssel",
    "story": "Das Notariat zieht dieses Wochenende 40 Jahre Akten auf einen neuen Server um. Das Skript verwendet rekursive Funktionen über Listen, und ein Bericht mit falscher Anzahl macht den ganzen Prozess ungültig. Helena braucht jede Funktion bis Samstag geprüft."
   },
   "bossC": {
    "name": "Freitag, 17 Uhr",
    "client": "Lieferkooperative Roda Viva",
    "trophy": "Freitagsmedaille",
    "story": "Freitag, 17 Uhr. Die Kooperative verlangt, dass die Essensgutscheine heute live gehen, weil die Kampagne morgen startet. Der Code steht fertig auf dem Rechner von jemandem, ohne Tests und ohne Review. Alles, was du über Anforderungen, Prozess, Versionierung, Testen und Design gelernt hast, wird in den nächsten Stunden auf die Probe gestellt."
   }
  }
 }
};
