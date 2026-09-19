/* Pacote gerado por tools/gerar-idioma.js a partir de "en". REVISAR com um falante nativo antes de publicar. */
LANG.de = {
 "name": "Deutsch",
 "llmName": "German",
 "ui": {
  "setH": "Einstellungen",
  "uiLang": "Sprache des Spiels",
  "codeLang": "Programmiersprache der Tickets",
  "aiH": "KI-Tutor",
  "aiP": "Der KI-Tutor verfasst maßgeschneiderte sokratische Hinweise und neue Analogien in der Spielsprache, ohne die Lösung zu verraten. Ohne ihn nutzt das Spiel die von den Autoren verfassten Hinweise.",
  "aiClaude": "Über Claude verbunden: Auf dieser Seite ist kein Schlüssel erforderlich.",
  "aiKeyOn": "Mit eigenem Schlüssel konfiguriert ({m}).",
  "aiOff": "Aus. Geben Sie unten einen Anbieter ein, um ihn einzuschalten.",
  "provider": "Anbieter",
  "provAnthropic": "Anthropic (Claude)",
  "provOpenAI": "OpenAI-kompatibel (OpenAI, Ollama, LM Studio usw.)",
  "key": "API-Schlüssel",
  "model": "Modell",
  "base": "Basis-URL",
  "save": "Tutoreinstellungen speichern",
  "clear": "Schlüssel entfernen",
  "saved": "Einstellungen gespeichert.",
  "keyNote": "Der Schlüssel wird nur in diesem Browser (localStorage) gespeichert und direkt an den Anbieter gesendet. Verwenden Sie ihn nicht auf einem gemeinsam genutzten Computer. Für den Unterricht ist ein lokaler Server vorzuziehen (z. B. Ollama unter http://localhost:11434/v1), der keinen Schlüssel benötigt.",
  "err": "Fehler",
  "none": "Nichts",
  "navShop": "Shop",
  "balance": "Guthaben",
  "total": "Lebenszeit-XP",
  "titleLbl": "Titel",
  "modeH": "Schwierigkeitsgrad",
  "modes": {
   "normal": "Normal",
   "medio": "Mittel",
   "dificil": "Schwer",
   "hardcore": "Extrem schwer"
  },
  "modeDesc": {
   "normal": "XP ×1. Kostenlose Hinweise (ein genutzter Hinweis ergibt halbe Punkte für eine richtige Antwort). Jeder Fehler kostet 2 XP pro Ticket-Stufe.",
   "medio": "XP ×1,5. Jeder Hinweis kostet 5 XP. Jeder Fehler kostet 4 XP pro Ticket-Stufe.",
   "dificil": "XP ×2. Keine Hinweise und keine Auswahlmöglichkeiten bei Ausgabe-Tickets: Sie tippen, was das Programm ausgibt. Jeder Fehler kostet 6 XP pro Stufe.",
   "hardcore": "XP ×3. Keine Hinweise, getippte Antworten und 60 Sekunden auf der Uhr. Jeder Fehler kostet 10 XP pro Stufe."
  },
  "typedLbl": "Tippen Sie genau das, was das Programm ausgibt",
  "typedPh": "Programmausgabe",
  "yourAnswer": "Ihre Antwort: {a}",
  "expected": "Richtige Ausgabe: {a}",
  "timeLeft": "Zeit: {s} s",
  "timeout": "Die Zeit ist abgelaufen.",
  "lost": "Strafe: -{x} XP von Ihrem Guthaben.",
  "shieldUsed": "Ihr Schild hat die Strafe abgefangen.",
  "boostOn": "Doppelte XP: noch {n} Tickets",
  "hintPaid": "Hinweis anfordern (kostet {c} XP)",
  "noHints": "In diesem Modus gibt es keine Hinweise.",
  "useFifty": "Zwei entfernen ({n})",
  "useTime": "+30 s nutzen ({n})",
  "lockedXp": "Gesperrt: Erfordert 60 % in {p} und {x} Lebenszeit-XP (Sie haben {y}).",
  "lockedXpOnly": "Gesperrt: Erfordert {x} Lebenszeit-XP (Sie haben {y}).",
  "bountiesH": "Sprint-Herausforderungen",
  "bountyDone": "Herausforderung abgeschlossen: {s} (+{x} XP)",
  "dailyH": "Tägliche Herausforderung",
  "dailyTag": "Doppelte XP",
  "dailyDone": "Tägliche Herausforderung abgeschlossen. Morgen gibt es eine neue.",
  "bossesH": "Bosse",
  "bossLocked": "Erfordert 60 % in {p} und {x} Lebenszeit-XP.",
  "bossDefeated": "Besiegt",
  "bossFight": "Gegen den Boss antreten",
  "bossStage": "Stufe {n} von {m}",
  "bossLives": "Noch erlaubte Fehler: {n}",
  "bossNext": "Nächste Stufe",
  "bossResult": "Ergebnis ansehen",
  "bossWin": "Boss besiegt",
  "bossWinP": "Sie haben {x} XP und die Trophäe „{t}“ verdient.",
  "bossLose": "Der Boss hat diesmal gewonnen",
  "bossLoseP": "Sie haben {x} XP von Ihrem Guthaben verloren. Wiederholen Sie die beteiligten Missionen und kommen Sie für eine Revanche zurück.",
  "bossRules": "Drei verkettete Stufen, keine Hinweise und keine Power-ups. Sie dürfen sich einen einzigen Fehler erlauben. Der auf dem Brett gewählte Schwierigkeitsgrad gilt auch hier.",
  "bossStart": "Kampf starten",
  "reward": "Belohnung: {x} XP",
  "trophies": "Trophäen",
  "noTrophies": "Noch keine. Bosse erscheinen auf dem Brett, sobald du genug Meisterschaft und XP hast.",
  "review": "Wiederholen",
  "shopH": "Shop",
  "shopP": "Tausche dein XP-Guthaben gegen Power-ups und Titel. Das ausgegebene Guthaben reduziert nicht deine Lebenszeit-XP, die für das Freischalten von Etappen und Bossen zählt.",
  "shopA": "Das sind die Meilen eines Treueprogramms. Du gibst das Guthaben für Tickets aus; dein Kartenstatus hängt von den insgesamt geflogenen Meilen ab und sinkt nicht, wenn du Punkte einlöst.",
  "powers": "Power-ups",
  "titlesH": "Titel",
  "owned": "Du hast: {n}",
  "buy": "Einlösen für {c} XP",
  "equip": "Diesen Titel verwenden",
  "equipped": "In Verwendung",
  "unequip": "Nicht mehr verwenden",
  "kTotal": "Lebenszeit-XP",
  "kBosses": "besiegte Bosse",
  "cheers": [
   "Gut gemacht!",
   "Tolles Code-Lesen!",
   "Genau richtig, scharfsinnig gedacht!",
   "Ticket mit Stil geschlossen!"
  ],
  "oops": [
   "Fast geschafft. Jeder Entwickler bricht den Build, bevor er ihn repariert.",
   "Fehler gehören zum Weg: Jetzt weißt du, wo die Falle war.",
   "Du hast einen Denkfehler gefunden, und so lernt man Debuggen.",
   "Diesmal nicht, und das ist in Ordnung. Nimm dir Zeit für die Erklärung."
  ],
  "keepGoing": "Dieses Ticket kommt später für eine Revanche auf das Brett zurück.",
  "streakMsg": "{n} in Folge! Serienbonus: +5 XP.",
  "comeback": "Zurückgekämpft: +{x} XP für die richtige Antwort direkt nach einem Fehler.",
  "need": "Noch {n} XP (kostet {c})",
  "evoH": "Wissenswachstum",
  "evoP": "Jede Linie ist die geschätzte Beherrschung einer Fähigkeit über die von dir beantworteten Tickets. Tippe auf eine Fähigkeit, um sie hervorzuheben: Grüne Punkte sind richtige Antworten und gelbe Punkte sind Fehler. Gestrichelte Linien markieren das Freischalten (60 %) und die Meisterschaft (95 %).",
  "evoEmpty": "Beantworte ein paar Tickets in dieser Sprache, um deine Lernkurve zu sehen.",
  "evoAll": "Alle",
  "evoX": "beantwortete Tickets",
  "colFirst": "Erste Schätzung",
  "colGain": "Zuwachs",
  "colTries": "Tickets",
  "plH": "Meisterschaft nach Programmiersprache",
  "plP": "Jede Sprache hat ihre eigene Meisterschaftsverfolgung; die aktuell verwendete ist mit ● markiert. Wenn du eine Sprache zum ersten Mal ausprobierst, beginnst du mit einer Übertragungsschätzung: die Hälfte des bereits in deiner besten Sprache zurückgelegten Weges. Fettgedruckte Werte wurden geübt.",
  "plA": "Wer ein Auto mit Schaltgetriebe fährt, fängt bei einem Automatikauto nicht bei null an, braucht aber trotzdem ein paar Runden um den Block, um zu zeigen, dass er sich angepasst hat.",
  "plAcc": "Richtig",
  "langH": "Richtige Antworten nach Spielsprache",
  "studyH": "Sprachen der mehrsprachigen Studie",
  "studyP": "Die 20 Sprachen der Übersetzungs- und Tokenisierungsanalyse. Der Token-Verbrauch pro 1000 Zeichen wurde in der Studie gemessen und zeigt, wie viel der KI-Tutor in jeder Sprache ausgibt. Ausstehende Pakete werden mit tools/gerar-idioma.js generiert und geprüft, bevor sie ins Spiel gelangen.",
  "available": "verfügbar",
  "pending": "Paket zu generieren",
  "colLang": "Sprache",
  "colScript": "Schriftsystem",
  "colTok": "Token pro 1000 Zeichen",
  "sortHint": "Wähle für jede Karte eine der beiden Kategorien.",
  "options": "Optionen",
  "codeLines": "Codezeilen",
  "solved": "Ticket gelöst",
  "notYet": "Diesmal nicht",
  "why": "Warum: ",
  "analogy": "Analogie: ",
  "delta": "Beherrschung von {s}: {a} zu {b}   (+{x} XP)",
  "roseNote": "Es stieg trotz des Fehlers leicht an, weil das Modell annimmt, dass das Lesen der Erklärung ebenfalls lehrt.",
  "masteredNow": "Fähigkeit gemeistert: {s}.",
  "unlockedNow": "Neue Mission freigeschaltet: {s}.",
  "promo": "Beförderung: Ihre Rolle ist jetzt {r}.",
  "aiExplain": "Den KI-Tutor um eine andere Analogie bitten",
  "toRetro": "Sprint-Retrospektive ansehen",
  "retroH": "Sprint {n} Retrospektive",
  "retroSum": "{c} von {n} Tickets gelöst. ",
  "retroA": "Sauberer Sprint.",
  "retroB": "Gutes Tempo; die zurückgelassenen durchsehen.",
  "retroC": "Harter Sprint. Zu überprüfende Tickets kommen später zurück aufs Board.",
  "changed": "Was sich bei Ihrer Beherrschung geändert hat",
  "colSkill": "Fähigkeit",
  "colStart": "Sprintbeginn",
  "colNow": "Jetzt",
  "suggestion": "Vorschlag des Tutors für den nächsten Sprint: konzentrieren Sie sich auf {s}, derzeit bei {p}.",
  "allDone": "Jede Fähigkeit ist gemeistert. Die nächsten Sprints sind freies Üben.",
  "nextSprint": "Sprint {n} starten",
  "repH": "Lernbericht",
  "repSub": "Eine Ansicht für den Lernenden und alle, die ihn unterstützen: was gemeistert ist, wo die Fehler liegen und was als Nächstes zu üben ist.",
  "k1": "beantwortete Tickets",
  "k2": "Genauigkeit",
  "k3": "gemeisterte Fähigkeiten",
  "k4": "längste korrekte Serie",
  "of": "{a} von {b}",
  "bySkill": "Beherrschung nach Fähigkeit",
  "colMastery": "Beherrschung",
  "colHits": "Korrekt",
  "colStatus": "Status",
  "colSbc": "SBC",
  "stM": "Gemeistert",
  "stP": "In Bearbeitung",
  "stL": "Gesperrt",
  "stB": "Mission zu öffnen",
  "recs": "Empfehlungen des Tutors",
  "recNone": "Noch keine Antworten. Lösen Sie ein paar Tickets, damit der Tutor Belege hat.",
  "recPriority": "Priorität: {s} ({p} Beherrschung, {c} korrekt von {n}).",
  "recBloom": "Kognitive Stufe mit den meisten Fehlern: {b} ({c} von {n}). Üben Sie diese Art von Ticket ruhig, ohne Hinweise.",
  "recHints": "Hinweise verwendet in {p} der Tickets. Versuchen Sie, eine Hypothese zu bilden, bevor Sie fragen.",
  "recLocked": "Noch gesperrt: {s}. Sie werden geöffnet, wenn Voraussetzungen über 60% liegen.",
  "bloomAcc": "Genauigkeit nach Bloom-Stufe",
  "noData": "keine Daten",
  "how": "Wie die Beherrschung berechnet wird",
  "howP": "Der Tutor verwendet Bayesian Knowledge Tracing. Für jede Fähigkeit hält er die Wahrscheinlichkeit, dass Sie sie gemeistert haben, und aktualisiert sie nach jeder Antwort, wobei er die Chance eines glücklichen Ratens und eines versehentlichen Ausrutschers abzieht.",
  "howA": "Es ist ein Lehrer, der sich nach und nach eine Meinung über einen Schüler bildet. Eine korrekte Multiple-Choice-Antwort ist weniger überzeugend als das Zusammensetzen eines ganzen Programms in der richtigen Reihenfolge, denn ein Raten hat im ersten Fall eine Chance von 25%.",
  "howParams": "Parameter: anfängliche Beherrschung 15%, Lernen pro Ticket 20%, Ausrutscher 10%, Raten nach Tickettyp (1 von 4 bei Optionen, 1 pro Zeile bei Bugs, 5% bei Reihenfolge; 50%, wenn ein Hinweis verwendet wird). Freischaltung bei 60%, Beherrschung bei 95%.",
  "data": "Ihre Daten",
  "dataP": "Der Fortschritt wird nur in diesem Browser gespeichert. Das Protokoll folgt dem Langformat von Knowledge-Tracing-Datensätzen (Item, Fähigkeit, Korrektheit, Sprache, Programmiersprache, Zeitstempel).",
  "showJson": "Das JSON-Protokoll anzeigen",
  "hideJson": "Das JSON-Protokoll ausblenden",
  "download": "Das JSON herunterladen",
  "reset": "Fortschritt löschen",
  "resetConfirm": "Bestätigen: gesamten Fortschritt löschen",
  "role": "Rolle",
  "xp": "XP",
  "streak": "Serie",
  "navBoard": "Board",
  "navReport": "Bericht",
  "navSettings": "Einstellungen",
  "roles": [
   "Praktikant",
   "Junior",
   "Mid-level",
   "Senior",
   "Staff"
  ],
  "homeH": "Lerne Programmierung und Software Engineering, indem du die Probleme echter Menschen löst",
  "homeLead": "Du bist gerade bei Ponte eingestiegen, einer kleinen Softwarefirma, die die Nachbarschaftsbäckerei, das Gesundheitszentrum, die Schule und die Liefergenossenschaft betreut. Jeder Kunde bringt ein echtes Problem mit: Du hörst dir die Geschichte an, studierst das Theorie-Toolkit und erst dann nimmst du die Tickets in Angriff.",
  "start": "Starte den ersten Sprint",
  "cont": "Mach da weiter, wo ich aufgehört habe",
  "steps": [
   [
    "Hör dem Kunden zu",
    "Jede Mission beginnt mit der Geschichte eines echten Problems, erzählt von den Menschen, die es erleben."
   ],
   [
    "Baue dein Theorie-Toolkit auf",
    "Schlüsselkonzepte, ein Codebeispiel in der von dir gewählten Sprache und die SBC-Curriculum-Kompetenz, die trainiert wird."
   ],
   [
    "Löse die Tickets",
    "Sage Ausgaben voraus, bringe Code in die richtige Reihenfolge, jage Bugs und triff Engineering-Entscheidungen. Jede Antwort kommt mit einer praktischen Analogie, und der Tutor verfolgt deinen Lernfortschritt."
   ]
  ],
  "sprint": "Sprint {n}",
  "ticketOf": "Ticket {n} von {m}",
  "freePlay": "Du hast alles gemeistert. Das Board ist jetzt freies Üben.",
  "missions": "Neue Missionen",
  "todo": "Zu erledigen",
  "todoEmpty": "Öffne oben eine Mission, um ihre Tickets zu erhalten.",
  "openBrief": "Höre die Geschichte und studiere die Theorie",
  "doneSprint": "In diesem Sprint erledigt",
  "nothingDone": "Noch nichts. Wähle ein Ticket, um den Sprint zu öffnen.",
  "resolved": "gelöst",
  "toReview": "zu überprüfen",
  "map": "Kompetenzkarte",
  "areaProg": "Programmierung",
  "areaSE": "Software Engineering",
  "mapHint": "Tippe auf eine Fähigkeit, um Details zu sehen. Die Zahl ist die geschätzte Wahrscheinlichkeit, dass du sie bereits beherrschst.",
  "locked": "Gesperrt: Erreiche 60% in {p}, um sie freizuschalten.",
  "and": " und ",
  "masteredTxt": "Gemeistert. ",
  "estTxt": "Geschätzte Beherrschung von {p}. ",
  "hits": "{c} richtig von {n} Tickets.",
  "reread": "Lies die Geschichte und Theorie noch einmal",
  "lockedAria": "gesperrt",
  "masteryAria": "Beherrschung",
  "client": "Kunde",
  "story": "Die Geschichte",
  "arsenal": "Theorie-Toolkit",
  "example": "Codebeispiel",
  "snippetNote": "Java- und C-Snippets lassen die Klasse und die main-Funktion weg, um den Fokus auf das Konzept zu legen.",
  "sbcH": "Hier trainierte Kompetenzen aus den SBC Curriculum Guidelines (2017)",
  "startTickets": "Ich bin bereit: Gib die Tickets dieser Mission frei",
  "backBoard": "Zurück zum Board",
  "types": {
   "mc": "Analysiere und antworte",
   "parsons": "Bringe den Code in die richtige Reihenfolge",
   "bug": "Jage den Bug",
   "sort": "Klassifiziere"
  },
  "bloom": [
   "Erinnern",
   "Verstehen",
   "Anwenden",
   "Analysieren",
   "Bewerten"
  ],
  "diff": "Schwierigkeit {d} von 3",
  "check": "Antwort überprüfen",
  "hint": "Bitte um einen Hinweis",
  "aiHint": "Bitte den KI-Tutor um einen Hinweis",
  "tutorHint": "Hinweis des Tutors: ",
  "aiLabel": "KI-Tutor: ",
  "aiThinking": "Der Tutor denkt nach...",
  "aiFail": "Der KI-Tutor hat nicht geantwortet. Überprüfe die Einstellungen oder nutze den normalen Hinweis.",
  "hintNote": "Mit einem Hinweis bringt eine richtige Antwort die Hälfte der XP und zählt als schwächerer Beleg für die Beherrschung.",
  "bank": "Verfügbare Zeilen (zum Verwenden antippen)",
  "sol": "Dein Programm (tippe eine Zeile an, um sie zurückzulegen)",
  "allUsed": "Alle Zeilen wurden verwendet.",
  "correctOrder": "Richtige Reihenfolge:",
  "up": "Nach oben",
  "down": "Nach unten"
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
  "k5": {
   "title": "Wie viele Bücher mit mehr als vier Exemplaren",
   "prompt": "Was gibt das Programm aus?",
   "hint": "c zählt Elemente; es addiert keine Werte.",
   "why": "Nur 5 und 8 sind größer als 4, also endet der Zähler bei 2.",
   "analogy": "Es ist der Türsteher mit einem Handzähler: ein Klick pro Person, die die Regel erfüllt, unabhängig davon, wie groß jede ist."
  },
  "r1": {
   "title": "Die Bremse der Rekursion",
   "prompt": "Was muss jede rekursive Funktion haben, damit sie sich nicht unendlich selbst aufruft?",
   "opts": [
    "Einen Basisfall, der ohne neuen Aufruf antwortet",
    "Eine innere while-Schleife",
    "Eine globale Steuervariable",
    "Mindestens zwei Parameter"
   ],
   "hint": "Denken Sie daran, was die Aufrufe stoppt.",
   "why": "Der Basisfall ist die einfache Situation, die direkt gelöst wird. Jeder rekursive Aufruf muss sich darauf zubewegen.",
   "analogy": "Russische Puppen: Sie öffnen eine, finden eine kleinere und hören bei der massiven Puppe auf. Ohne sie würden Sie ewig Puppen öffnen."
  },
  "r2": {
   "title": "Fakultät Schritt für Schritt",
   "prompt": "Was gibt das Programm aus?",
   "hint": "Erweitern: fact(4) = 4 × fact(3) = ...",
   "why": "4 × 3 × 2 × 1 = 24. Jeder Aufruf wartet auf die Antwort des kleineren Aufrufs und multipliziert dann.",
   "analogy": "Eine Schlange von Leuten, die den Vordermann fragen: „Was ist deine Zahl?“. Der erste antwortet 1, und die Antwort wandert multipliziert zurück durch die Schlange."
  },
  "r3": {
   "title": "Rekursion, die sich nicht bewegt",
   "prompt": "Die Funktion sollte n, n-1, ..., 1 ausgeben, aber der Call-Stack läuft über. Welche Zeile ist falsch?",
   "hint": "Bewegt sich der rekursive Aufruf auf den Basisfall zu?",
   "why": "Der Aufruf count(n) wiederholt dasselbe Problem endlos. Die Korrektur ist count(n - 1), das bis null herunterzählt.",
   "analogy": "Es ist, als würde man jemanden bitten, die Treppe hinunterzugehen, während er immer auf derselben Stufe tritt. Der Basisfall existiert; er wird nur nie erreicht."
  },
  "r4": {
   "title": "Drucken auf dem Rückweg",
   "prompt": "Was gibt das Programm aus?",
   "hint": "Die Ausgabe kommt nach dem rekursiven Aufruf. Wann wird sie schließlich ausgeführt?",
   "why": "Jeder Aufruf geht zuerst bis zum Basisfall hinunter; die Ausgabe erfolgt erst bei der Rückkehr, vom innersten (1) zum äußersten (3).",
   "analogy": "Ein Stapel Teller: Sie stapeln 3, 2, 1 und spülen erst beim Abtragen. Der zuletzt Hinzugelegte wird zuerst gespült."
  },
  "r5": {
   "title": "Zwei Aufrufe gleichzeitig",
   "prompt": "Was gibt das Programm aus?",
   "hint": "Arbeiten Sie von unten nach oben: f(0), f(1), f(2)...",
   "why": "Es ist die Fibonacci-Folge: 0, 1, 1, 2, 3, 5. Also f(5) = 5.",
   "analogy": "Ein umgekehrter Stammbaum: Jede Antwort hängt von den beiden vorherigen ab, bis man die bekannten Vorfahren erreicht (die Basisfälle)."
  },
  "q1": {
   "title": "Funktional oder nicht-funktional",
   "prompt": "Welche dieser Anforderungen ist eine NICHT-funktionale Anforderung des Kliniksystems?",
   "opts": [
    "Das System muss innerhalb von 2 Sekunden reagieren",
    "Der Patient kann einen Termin umbuchen",
    "Das System sendet eine SMS-Erinnerung",
    "Die Rezeptionistin registriert Patienten"
   ],
   "hint": "Nicht-funktional beschreibt Qualität (wie gut), nicht Verhalten (was es tut).",
   "why": "Die Antwortzeit ist ein Qualitätsmerkmal. Die anderen drei beschreiben Funktionen, die das System ausführt.",
   "analogy": "Bei einem Auto ist funktional: Fahren, Bremsen und Licht einschalten. Nicht-funktional ist der Kraftstoffverbrauch, Komfort und die Sicherheit, mit der es das tut."
  },
  "q2": {
   "title": "Eine Anforderung, die man testen kann",
   "prompt": "Welche Anforderung ist verifizierbar formuliert?",
   "opts": [
    "Die Suche liefert Ergebnisse in unter 1 s für 95 % der Anfragen",
    "Das System muss schnell sein",
    "Die Benutzeroberfläche muss freundlich sein",
    "Das System muss modern und robust sein"
   ],
   "hint": "Fragen Sie sich: Wie würde ich nachweisen, dass dies erfüllt ist?",
   "why": "Nur die erste Option hat ein messbares Kriterium. „Schnell“, „freundlich“ und „modern“ führen bei der Abnahme zu Diskussionen.",
   "analogy": "Es ist der Unterschied, ob man den Maurer um „eine hohe Mauer“ oder um „eine 2,80 m hohe Mauer“ bittet. Nur die zweite kann mit einem Maßband überprüft werden."
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
  "o2": {
   "title": "Der Weg in die Produktion",
   "prompt": "Ordne die Phasen einer Continuous-Delivery-Pipeline in die richtige Reihenfolge.",
   "lines": [
    "Der Entwickler pusht den Code",
    "Der CI-Server holt den Code und installiert die Abhängigkeiten",
    "Die automatisierten Tests laufen",
    "Das Release-Paket wird gebaut",
    "Die Version wird in Produktion freigegeben"
   ],
   "hint": "Nichts wird paketiert, bevor die Tests bestanden sind, und nichts wird freigegeben, bevor es paketiert wurde.",
   "why": "Jede Phase ist ein Tor: Nur was die Tests bestanden hat, wird paketiert, und nur was reproduzierbar paketiert wurde, wird freigegeben.",
   "analogy": "Ein Fließband: Das Teil kommt an, wird montiert, durchläuft die Qualitätskontrolle, wird verpackt und verlässt erst dann das Werk für den Laden."
  },
  "o3": {
   "title": "\"Bei mir läuft es\"",
   "prompt": "Die App läuft auf Bias Laptop und stürzt auf dem Server ab. Was ist die wahrscheinlichste Ursache und die richtige Lösung?",
   "opts": [
    "Unterschiedliche Umgebungen; Abhängigkeiten und Versionen in einer Datei festlegen und überall dieselbe Umgebung verwenden",
    "Ein fehlerhafter Server; einen neuen kaufen",
    "Pech; morgen noch einmal versuchen",
    "Eine schlechte Sprache; in einer anderen neu schreiben"
   ],
   "hint": "Der Code ist an beiden Orten derselbe. Was ändert sich um ihn herum?",
   "why": "Derselbe Code verhält sich anders, wenn sich Versionen und Einstellungen ändern. Festgelegte Abhängigkeiten und standardisierte Umgebungen machen die Ausführung reproduzierbar.",
   "analogy": "Das Rezept funktioniert in deiner Küche und misslingt beim Nachbarn, weil dessen Ofen eine andere Temperatur anzeigt. Standardisiere den Ofen; gib nicht dem Kuchen die Schuld."
  },
  "o4": {
   "title": "Release-Risiko",
   "prompt": "Ordne jede Praxis nach ihrer Wirkung auf das Release-Risiko ein.",
   "bins": [
    "Senkt das Risiko",
    "Erhöht das Risiko"
   ],
   "cards": [
    "Kleine Änderungen mehrmals pro Woche freigeben",
    "Drei Monate Änderungen in einem einzigen Release anhäufen",
    "Einen getesteten Rollback-Befehl bereithalten",
    "Dateien direkt auf dem Produktionsserver bearbeiten"
   ],
   "hint": "Frage dich: Wenn etwas schiefgeht, lässt sich die Ursache leicht finden und zurückgehen?",
   "why": "Eine kleine Änderung hat eine leicht zu findende Ursache, und ein getesteter Rollback bietet einen schnellen Weg zurück. Ein riesiges Release und manuelle Änderungen in Produktion machen den Fehler schwer auffindbar und schwer rückgängig.",
   "analogy": "Den Fluss Stein für Stein zu überqueren erlaubt dir, einen Schritt zurückzutreten. Von einem Ufer zum anderen zu springen ist alles oder nichts."
  },
  "o5": {
   "title": "CI ist seit drei Tagen rot",
   "prompt": "Ein Test schlägt in CI seit drei Tagen fehl und das Team pusht weiter Code. Was ist das richtige Vorgehen?",
   "opts": [
    "Anhalten und zuerst den Build reparieren: Ein ignorierter Alarm schützt nicht mehr",
    "Den fehlschlagenden Test deaktivieren",
    "Weitermachen und alles am Monatsende reparieren",
    "CI entfernen, das nur stört"
   ],
   "hint": "Was ist ein Alarm wert, wenn alle gelernt haben, ihn zu ignorieren?",
   "why": "Bei einem roten Build schleichen sich neue Fehler ein, versteckt hinter dem ersten. Den Build zu reparieren wird zur Priorität des ganzen Teams; den Test zu deaktivieren schaltet nur das Kontrolllämpchen aus.",
   "analogy": "Es ist die Öllampe am Armaturenbrett: Sie zuzukleben repariert nicht den Motor."
  },
  "q6": {
   "title": "Anforderungen triagieren",
   "prompt": "Ordnen Sie jede Anforderung des Gesundheitszentrum-Systems ein.",
   "bins": [
    "Funktional",
    "Nicht-funktional"
   ],
   "cards": [
    "Der Patient erhält am Tag vor dem Termin eine Erinnerung",
    "Das System ist zu 99% der Zeit verfügbar",
    "Die Rezeptionistin verschiebt Termine",
    "Patientendaten werden verschlüsselt gespeichert"
   ],
   "hint": "Fragen Sie bei jeder Karte: Ist das etwas, was das System TUT, oder eine Qualität, mit der es das tut?",
   "why": "Erinnern und Verschieben sind Verhaltensweisen (funktional). Verfügbarkeit und Verschlüsselung sind Qualitäten des Dienstes (nicht-funktional) und werden oft vergessen, bis sie zum Problem werden.",
   "analogy": "Auf einer Speisekarte sind die Gerichte der funktionale Teil. Heiß, innerhalb von zwanzig Minuten und aus einer sauberen Küche zu kommen, ist der nicht-funktionale Teil: Niemand bestellt es, jeder erwartet es."
  },
  "a6": {
   "title": "Der Rhythmus eines Sprints",
   "prompt": "Bringen Sie die Scrum-Sprint-Ereignisse in die richtige Reihenfolge.",
   "lines": [
    "Planung: Das Team wählt aus, was in den Sprint passt",
    "Tägliche Meetings verfolgen den Fortschritt",
    "Review: Das Inkrement wird den Nutzern gezeigt",
    "Retrospektive: Das Team verbessert seinen eigenen Prozess"
   ],
   "hint": "Zuerst entscheidet man, was zu tun ist; am Ende schaut man auf das Produkt und dann auf den Prozess.",
   "why": "Der Sprint beginnt mit der Planung, geht weiter mit den Dailies, zeigt das Ergebnis im Review und schließt mit der Retrospektive, die den nächsten Zyklus speist.",
   "analogy": "Es ist wie eine Reise: die Route planen, jeden Tag die Karte prüfen, bei der Ankunft die Fotos zeigen und sich einigen, was man beim nächsten Mal anders macht."
  },
  "g6": {
   "title": "Einen Konflikt entwirren",
   "prompt": "Bringen Sie die Schritte zum sicheren Auflösen eines Merge-Konflikts in die richtige Reihenfolge.",
   "lines": [
    "Den aktualisierten Hauptbranch in Ihren Branch holen",
    "Die als konfliktbehaftet markierten Dateien öffnen",
    "Abschnitt für Abschnitt entscheiden, welche Version bleibt",
    "Die Tests ausführen, um zu prüfen, dass nichts kaputt gegangen ist",
    "Den Commit aufzeichnen, der den Merge abschließt"
   ],
   "hint": "Der Konflikt zeigt sich erst, wenn die beiden Versionen aufeinandertreffen; der Commit kommt erst nach der Prüfung.",
   "why": "Das Mergen deckt die Konflikte auf, die Entscheidung ist menschlich und erfolgt Abschnitt für Abschnitt, und die Tests bestätigen, dass die Kombination funktioniert, bevor der endgültige Commit erfolgt.",
   "analogy": "Zwei Redakteure haben denselben Absatz geändert: Die Versionen werden zusammengeführt, in Ruhe gelesen, ein Wortlaut gewählt, der gesamte Text Korrektur gelesen, und erst dann geht er in den Druck."
  },
  "t6": {
   "title": "Der TDD-Zyklus",
   "prompt": "Bringen Sie den testgetriebenen Entwicklungszyklus in die richtige Reihenfolge.",
   "lines": [
    "Einen Test schreiben, der fehlschlägt",
    "Den minimalen Code schreiben, um den Test bestehen zu lassen",
    "Alle Tests ausführen und alles grün sehen",
    "Unter dem Schutz der Tests refaktorieren"
   ],
   "hint": "Rot, grün, refaktorieren.",
   "why": "Der Test kommt zuerst und schlägt fehl (rot), der minimale Code lässt ihn bestehen (grün), und erst dann wird die Struktur verbessert, mit dem Sicherheitsnetz der Tests darunter.",
   "analogy": "Ein Schneider nimmt zuerst das Maß, schneidet dann den Stoff, bis er passt, und macht erst am Ende die Feinarbeit, wobei er nach jeder Anpassung das Maß überprüft."
  },
  "d6": {
   "title": "Anzeichen von Kopplung",
   "prompt": "Ordnen Sie jede im System der Genossenschaft beobachtete Situation ein.",
   "bins": [
    "Niedrige Kopplung",
    "Hohe Kopplung"
   ],
   "cards": [
    "Die Versandberechnung erhält die Preistabelle als Parameter",
    "Der Bildschirm greift direkt auf die Datenbank zu",
    "Die Abrechnung kommuniziert mit Zahlungen über eine Schnittstelle",
    "Die Änderung des Anmeldeformulars erzwingt Änderungen in sechs weiteren Dateien"
   ],
   "hint": "Fragen Sie: Wenn sich dieser Teil ändert, wie viele andere müssen sich mit ihm ändern?",
   "why": "Abhängigkeiten von außen zu erhalten und über Schnittstellen zu kommunizieren, isoliert die Teile. Ein Bildschirm, der direkt mit der Datenbank spricht, und kaskadierende Änderungen offenbaren Teile, die aneinander gebunden sind.",
   "analogy": "Geräte, die in Steckdosen gesteckt werden, werden einzeln ersetzt. Geräte, deren Kabel zusammengelötet sind, zwingen Sie, das Zimmer zu zerlegen, um den Fernseher zu wechseln."
  },
  "m1": {
   "title": "Wer nutzt es und wofür",
   "prompt": "Welches Diagramm zeigt, wer das System nutzt und was jede Person damit tun kann?",
   "opts": [
    "Anwendungsfalldiagramm",
    "Klassendiagramm",
    "Sequenzdiagramm",
    "Verteilungsdiagramm"
   ],
   "hint": "Suchen Sie nach der Sicht, die sich auf Personen (Akteure) und Ziele konzentriert.",
   "why": "Anwendungsfälle verbinden Akteure mit Zielen: Der Leser leiht aus, der Freiwillige registriert. Klassen zeigen Konzepte; Sequenzen zeigen die Reihenfolge der Nachrichten.",
   "analogy": "Es ist die Speisekarte aus Sicht des Speisesaals: Wer kann was bestellen, ohne die Küche zu zeigen."
  },
  "m2": {
   "title": "Buch und Exemplar",
   "prompt": "Wie sollte die Beziehung zwischen Buch und Exemplar modelliert werden?",
   "opts": [
    "Ein Buch hat viele Exemplare; jedes Exemplar gehört zu einem einzigen Buch",
    "Ein Buch hat genau ein Exemplar",
    "Viele Bücher zu vielen Exemplaren",
    "Keine Beziehung: Sie sind dasselbe"
   ],
   "hint": "Die Bibliothek hat drei Exemplare von Dom Casmurro. Wie viele Titel und wie viele physische Objekte?",
   "why": "Es gibt einen Titel; die Objekte im Regal sind mehrere. Es ist das Exemplar, das ausgeliehen wird, nicht das Buch. Wenn diese Multiplizität falsch ist, kontaminiert das die gesamte Datenbank.",
   "analogy": "Das Rezept ist eines; die daraus gebackenen Kuchen sind viele. Sie essen einen Kuchen, nicht das Rezept."
  },
  "m3": {
   "title": "Struktur oder Verhalten",
   "prompt": "Ordnen Sie jeden Satz ein: Zu welcher Sicht des Modells gehört er?",
   "bins": [
    "Statische Sicht (Klassen)",
    "Dynamische Sicht (Sequenz)"
   ],
   "cards": [
    "Ein Leser hat einen Namen und eine Telefonnummer",
    "Das System prüft, ob ein Exemplar verfügbar ist, und erfasst dann die Ausleihe",
    "Eine Ausleihe bezieht sich auf ein Exemplar",
    "Eine Rückgabe löst eine Benachrichtigung an die nächste Person auf der Warteliste aus"
   ],
   "hint": "Statisch beschreibt, was existiert; dynamisch beschreibt, was passiert und in welcher Reihenfolge.",
   "why": "Attribute und Beziehungen sind Struktur und gelten ständig. Prüfen, Erfassen und Benachrichtigen sind Ereignisse, die zeitlich verkettet sind.",
   "analogy": "Der Grundriss zeigt die Räume (statisch); das Drehbuch eines Besuchs zeigt, wohin die Person geht und in welcher Reihenfolge (dynamisch)."
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
    "Entfernt zwei falsche Antworten aus einer Multiple-Choice-Aufgabe. Eine richtige Antwort zählt dann als schwächerer Beleg für die Beherrschung des Stoffs."
   ],
   "time": [
    "Extra Zeit",
    "Fügt im Extra-Hardcore-Modus 30 Sekunden zur Uhr hinzu."
   ],
   "boost": [
    "Doppelte XP",
    "Verdoppelt die XP deiner nächsten 3 Aufgaben. Aktiviert sich, sobald du sie einlöst."
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
    "Deploy-Legende",
    "Ein Titel, der neben deiner Rolle angezeigt wird."
   ]
  },
  "bounties": {
   "b1": "Löse 3 Aufgaben hintereinander ohne Hinweise",
   "b2": "Löse eine Aufgabe auf Schwer oder Extra Hardcore",
   "b3": "Sauberer Sprint: 5 von 5"
  },
  "bosses": {
   "bossA": {
    "name": "Der Inspektor",
    "client": "Dona Lúcias Bäckerei",
    "trophy": "Siegel des Inspektors",
    "story": "Ein städtischer Inspektor betritt die Bäckerei und möchte innerhalb einer Stunde den gesamten rabattierten Umsatz, die Anzahl der Kunden, die den Rabatt erhalten haben, und die Wechselgeldberechnung sehen. Das Kassenprogramm vermischt Variablen, Bedingungen und Schleifen, und jeder Fehler bedeutet ein Bußgeld. Dona Lúcia sieht dich an."
   },
   "bossB": {
    "name": "Die große Migration",
    "client": "Notariat des 2. Bezirks",
    "trophy": "Archivschlüssel",
    "story": "Das Notariat zieht am Wochenende 40 Jahre alte Akten auf einen neuen Server um. Das Skript verwendet rekursive Funktionen über Listen, und ein Bericht mit falscher Anzahl macht den gesamten Vorgang zunichte. Helena braucht jede Funktion bis Samstag geprüft."
   },
   "bossC": {
    "name": "Freitag, 17 Uhr",
    "client": "Liefergenossenschaft Roda Viva",
    "trophy": "Freitagsmedaille",
    "story": "Freitag, 17 Uhr. Die Genossenschaft verlangt, dass die Essensgutscheine noch heute live gehen, denn die Kampagne startet morgen. Der Code steht fertig auf irgendjemandes Rechner, ohne Tests und ohne Review. Alles, was du über Anforderungen, Prozesse, Versionierung, Testen und Design gelernt hast, wird in den nächsten Stunden auf die Probe gestellt."
   }
  }
 }
};
