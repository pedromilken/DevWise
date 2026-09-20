/* Traduções feitas fora do gerador (revisão humana ou outro modelo). Carregado DEPOIS de lang-fr.js,
   então sobrescreve as chaves abaixo e não é apagado por uma nova geração do pacote. */
Object.assign(LANG.fr.ui, {
 "modelH": "Modèle de suivi des connaissances",
 "pilot": "Modèle qui pilote le jeu",
 "pilotNote": "Un seul modèle pilote le jeu : il calcule la maîtrise, débloque les étapes et ajuste la difficulté. Les autres tournent en arrière-plan et ne font qu'enregistrer ce qu'ils avaient prévu avant chaque réponse, pour une comparaison ultérieure. Le pourcentage à côté de chaque nom est le seuil de maîtrise de ce modèle.",
 "models": {
  "elo": "Elo/Rasch",
  "irt": "3PL IRT with EAP",
  "bkt": "BKT",
  "pfa": "PFA",
  "afm": "AFM"
 },
 "rolePilot": "pilote",
 "roleShadow": "observe",
 "cmpH": "Comparaison des modèles sur cet historique",
 "cmpP": "Avant chaque réponse, les cinq modèles enregistrent la probabilité de bonne réponse qu'ils ont prédite. Brier mesure l'erreur de prédiction (plus bas, mieux c'est) ; AUC mesure si le modèle sépare les bonnes réponses des erreurs (0,5 pour le hasard, 1 pour la perfection).",
 "cmpNote": "Avec peu de réponses d'un seul élève, ces chiffres varient beaucoup. Une comparaison valide utilise les journaux exportés de nombreux élèves, découpés par élève.",
 "colModel": "Modèle",
 "colRole": "Rôle",
 "colAcc": "Précision",
 "confirmRule": "Exiger que la maîtrise soit confirmée par une bonne réponse un autre jour",
 "confirmNote": "Maîtrise atteinte aujourd'hui. Pour la confirmer, réussissez un ticket de cette compétence un autre jour : une seule séance mélange savoir et élan.",
 "stC": "À confirmer un autre jour",
 "confirmTag": "Confirmation",
 "printBtn": "Imprimer ou enregistrer en PDF",
 "studentName": "Nom de l'élève (facultatif, affiché sur le rapport imprimé)",
 "printedOn": "Généré le {d}",
 "repFor": "Élève : {n}",
 "navHome": "Accueil",
 "homeMissions": "missions avec histoire et théorie",
 "homeTickets": "tickets en banque",
 "homeLangs": "langues",
 "homePls": "langages de programmation",
 "homeSciH": "Comment l'outil a été construit",
 "homeSbc": "Les 14 missions couvrent la programmation et le génie logiciel, et chacune indique les compétences du référentiel SBC (2017) qu'elle travaille. Le même concept apparaît dans quatre langages de programmation, avec le même corrigé.",
 "homeI18n": "Le jeu existe en 20 langues, les mêmes que celles de l'analyse de traduction et de tokenisation qui guide le projet. Les écritures de droite à gauche sont prises en charge, et les langues ayant leur propre écriture offrent une version romanisée."
});
Object.assign(LANG.fr.items, {
 "v6": {
  "title": "Les maths du comptoir",
  "prompt": "Deux pains à 4 reais et une somme faite de tête. Qu'est-ce que le programme affiche ?",
  "hint": "En programmation comme en maths, la multiplication se fait avant l'addition.",
  "why": "D'abord 3 × 4 = 12, puis 2 + 12 = 14. Pour additionner d'abord, il faudrait écrire (2 + 3) * 4.",
  "analogy": "C'est la file prioritaire à la caisse : celui qui a la priorité passe en premier, même s'il est arrivé après. Les parenthèses sont le laissez-passer qui change l'ordre."
 },
 "v7": {
  "title": "Les centimes qui disparaissent",
  "prompt": "Dona Lúcia additionne deux montants et les compare à ce qu'elle attendait. Qu'est-ce que le programme affiche ?",
  "hint": "Les nombres décimaux sont stockés en binaire, et tous les décimaux ne tiennent pas exactement dans ce format.",
  "why": "En binaire, 0,1 et 0,2 sont des fractions périodiques : la somme donne 0,30000000000000004 et la comparaison exacte échoue. Pour l'argent, comparez avec une tolérance ou travaillez en centimes, avec des entiers.",
  "analogy": "C'est comme mesurer une coupe en centimètres avec une règle en pouces : chaque conversion laisse un reste invisible, et accumuler les restes fausse le total."
 },
 "v8": {
  "title": "Des grammes devenus tonnes",
  "prompt": "La recette utilise 500 grammes de farine, mais le programme affiche 500000. Quelle ligne est fausse ?",
  "hint": "Un kilo contient mille grammes. Pour passer des grammes aux kilos, on multiplie ou on divise ?",
  "why": "La conversion est inversée : des grammes aux kilos on divise par 1000. Multiplier va dans l'autre sens.",
  "analogy": "C'est comme changer de devise dans le mauvais sens : le nombre devient énorme et le calcul a l'air juste jusqu'à ce que quelqu'un vérifie le montant final."
 },
 "v9": {
  "title": "Échanger des pots sans renverser",
  "prompt": "Assemblez le programme qui échange les valeurs de a et b avec une variable temporaire et affiche le résultat.",
  "hint": "Stockez l'une des valeurs avant qu'elle ne soit écrasée.",
  "why": "La variable temporaire garde la première valeur pendant qu'elle est remplacée. Sans elle, l'une des deux est perdue, comme dans le ticket de caisse où l'échange a mal tourné.",
  "analogy": "Pour échanger le contenu de deux verres pleins, vous utilisez un troisième verre vide. C'est exactement la même manœuvre en code."
 },
 "v10": {
  "title": "Entier ou décimal",
  "prompt": "Classez chaque donnée de la boulangerie selon le type numérique qui convient le mieux.",
  "bins": [
   "Nombre entier",
   "Nombre décimal"
  ],
  "cards": [
   "Nombre de pains vendus aujourd'hui",
   "Prix du kilo de farine",
   "Nombre de clients dans la file",
   "Poids de la pâte en kilos"
  ],
  "hint": "Demandez-vous si la moitié de cette chose a un sens.",
  "why": "Ce qu'on compte un par un appelle un entier ; ce qu'on mesure en portions appelle un décimal. Un demi-client n'existe pas ; un demi-kilo, oui.",
  "analogy": "C'est la différence entre compter des œufs et peser de la farine : l'un tient dans une boîte, l'autre a besoin d'une balance."
 },
 "c6": {
  "title": "Une question dans une autre",
  "prompt": "Qu'est-ce que le programme affiche ?",
  "hint": "Le deuxième test n'a lieu que si le premier est vrai.",
  "why": "5 > 3 est vrai, donc on entre dans le bloc intérieur. Là, 5 > 10 est faux et le programme tombe dans le else intérieur. Le else extérieur n'est jamais atteint.",
  "analogy": "C'est le triage derrière deux portes : celui qui passe la première rencontre encore une autre décision plus loin, et celui qui ne passe pas ne la voit jamais."
 },
 "c7": {
  "title": "Un patient âgé sans priorité",
  "prompt": "Les patients de 65 ans ou plus, et aussi les enfants jusqu'à 12 ans, doivent avoir la priorité. Le programme ne signale personne. Quelle ligne doit être corrigée ?",
  "hint": "Existe-t-il un âge qui soit à la fois supérieur à 65 et inférieur à 12 ?",
  "why": "Avec AND, les deux conditions doivent être vraies en même temps, ce qui est impossible. La règle relie deux groupes distincts, il faut donc OR.",
  "analogy": "C'est le panneau « entrée pour les personnes âgées et les enfants » : personne n'est les deux à la fois. Remplacer « et » par « ou » ouvre la porte aux deux groupes."
 },
 "c8": {
  "title": "La limite compte-t-elle ou non",
  "prompt": "Classez chaque condition de triage selon ce qu'elle fait de la valeur limite exacte.",
  "bins": [
   "Inclut la limite",
   "Exclut la limite"
  ],
  "cards": [
   "temperature >= 39",
   "temperature > 39",
   "age <= 12",
   "age < 12"
  ],
  "hint": "Le trait sous le signe est ce qui porte le « ou égal ».",
  "why": "Les signes >= et <= incluent la valeur limite ; > et < excluent exactement cette valeur. C'est là que naissent les erreurs de frontière.",
  "analogy": "C'est la différence entre « à partir de 65 ans » et « plus de 65 ans » : quelqu'un qui a exactement 65 ans est inclus dans une règle et exclu dans l'autre."
 },
 "c9": {
  "title": "Le triage de Rosa, en trois niveaux",
  "prompt": "Assemblez le triage : une fièvre de 39 ou plus est rouge ; sinon, 65 ans ou plus est jaune ; tous les autres sont verts.",
  "hint": "La règle la plus grave vient en premier, et chaque patient repart avec un seul niveau.",
  "why": "La chaîne if, elif et else garantit qu'un seul niveau est attribué et que la règle la plus grave est testée en premier. Les données doivent exister avant le test, et l'affichage vient après la décision.",
  "analogy": "C'est le protocole affiché au mur de la clinique : vous le lisez de haut en bas et vous vous arrêtez à la première ligne qui s'applique."
 },
 "c10": {
  "title": "La division qui n'arrive jamais",
  "prompt": "Avec x égal à zéro, diviser par x échouerait. Qu'est-ce que le programme affiche ?",
  "hint": "Quand le premier test d'un AND est déjà faux, le deuxième est-il quand même évalué ?",
  "why": "L'opérateur AND court-circuite : puisque x != 0 est faux, la division n'est jamais exécutée et le programme va au else, sans erreur. Ce schéma protège les opérations risquées.",
  "analogy": "C'est vérifier le carburant avant de tourner la clé : s'il n'y en a pas, personne n'essaie de démarrer. L'ordre des tests est la protection."
 },
 "q7": {
  "title": "Découvrir ou vérifier",
  "prompt": "Classez chaque activité d'ingénierie des exigences.",
  "bins": [
   "Élicitation (découvrir)",
   "Validation (vérifier)"
  ],
  "cards": [
   "Interroger la réceptionniste sur la routine quotidienne",
   "Revoir la liste des exigences avec la directrice avant de coder",
   "Observer les patients utiliser la borne de tickets",
   "Montrer un prototype et vérifier si c'est bien ce qui est attendu"
  ],
  "hint": "Demandez-vous si l'activité cherche de nouvelles informations ou confirme ce qui a déjà été écrit.",
  "why": "Interroger et observer font émerger des exigences qui n'étaient pas encore sur le papier. Revoir et vérifier les prototypes valident si ce qui est écrit correspond au vrai besoin.",
  "analogy": "C'est la différence entre prendre les mesures du client et lui faire essayer le vêtement. La première découvre ; la seconde confirme."
 },
 "q8": {
  "title": "Le parcours d'une exigence",
  "prompt": "Mettez les étapes de l'ingénierie des exigences dans l'ordre.",
  "lines": [
   "Élicitation : découvrir ce dont les gens ont besoin",
   "Analyse : résoudre les conflits et fixer les priorités",
   "Spécification : écrire les exigences de manière vérifiable",
   "Validation : vérifier avec les demandeurs si c'est correct",
   "Gestion : maîtriser les changements tout au long du projet"
  ],
  "hint": "D'abord vous découvrez, puis vous organisez, écrivez et vérifiez ; la maîtrise des changements accompagne tout le reste.",
  "why": "Chaque étape nourrit la suivante : on ne priorise pas ce qui n'a jamais été soulevé, ni ne valide ce qui n'a jamais été écrit. La gestion commence quand les exigences commencent à changer, et elles changent toujours.",
  "analogy": "C'est construire une maison : parler à la famille, décider ce qui rentre dans le budget, dessiner le plan, montrer le dessin, puis noter chaque changement d'avis."
 },
 "q9": {
  "title": "« Le système notifie le patient »",
  "prompt": "L'exigence dit seulement : « le système notifie le patient ». Pourquoi est-ce un problème ?",
  "opts": [
   "Elle ne dit pas quand, par quel canal, ni quoi faire si la notification échoue",
   "Elle est trop longue et devrait être découpée",
   "Elle utilise le mot système, qu'il faudrait éviter",
   "Ce n'est pas un problème : c'est assez clair"
  ],
  "hint": "Imaginez deux personnes qui implémentent cette phrase sans se parler. Construiront-elles la même chose ?",
  "why": "Une exigence ambiguë est celle qui permet plus d'une lecture raisonnable. Notifier la veille par SMS est différent de notifier au moment par e-mail, et les deux correspondent à cette phrase.",
  "analogy": "C'est dire à un ami « tiens-moi au courant » : il peut appeler à six heures du matin ou laisser un message au voisin. Sans accord, chacun fait à sa manière."
 },
 "q10": {
  "title": "Critères d'acceptation",
  "prompt": "Qu'est-ce qui transforme une user story en quelque chose que l'équipe sait terminé ?",
  "opts": [
   "Les critères d'acceptation : des conditions vérifiables qui disent quand c'est fini",
   "L'estimation du développeur en heures",
   "Le nom de celui qui a demandé la fonctionnalité",
   "L'écran dessiné par le designer"
  ],
  "hint": "Pensez à ce qui vous permet de répondre oui ou non à : c'est terminé ?",
  "why": "Les critères d'acceptation décrivent le comportement attendu en conditions vérifiables. Sans eux, « terminé » devient une question d'opinion.",
  "analogy": "C'est la liste des réserves lors de la remise d'un bien : sans elle, remettre les clés se transforme en dispute sur ce qui avait été convenu."
 },
 "q11": {
  "title": "Deux demandes contradictoires",
  "prompt": "La directrice veut un dossier patient complet ; la réception veut une planification en moins d'une minute. Quelle est la meilleure marche à suivre ?",
  "opts": [
   "Porter le conflit devant les deux parties et négocier une solution explicite, comme un dossier minimal maintenant et le complet plus tard",
   "Soutenir la directrice, car elle a plus d'autorité",
   "Soutenir la réception, car elle est plus proche du problème",
   "Implémenter les deux et les laisser régler ça en pratique"
  ],
  "hint": "Un conflit entre exigences est un problème à régler dans l'analyse, pas dans le code.",
  "why": "Les exigences contradictoires doivent être réconciliées avec les parties prenantes avant de devenir du code. Choisir en silence déplace le conflit dans le produit, où il coûte beaucoup plus cher.",
  "analogy": "Deux pièces se disputent le même mur sur le plan. L'architecte s'assoit avec la famille et décide à l'avance ; une fois construit, le mur coûte une rénovation."
 },
 "g7": {
  "title": "Annuler sans effacer l'historique",
  "prompt": "Une modification déjà déployée a cassé le système de la boulangerie. Mettez les étapes d'annulation sûre dans l'ordre.",
  "lines": [
   "Identifier le commit qui a causé la panne dans l'historique",
   "Créer un commit revert qui annule ces modifications",
   "Exécuter les tests pour confirmer que le système est revenu à la normale",
   "Pousser le revert vers le dépôt distant",
   "Enquêter calmement sur la cause et préparer le correctif définitif"
  ],
  "hint": "Rétablissez le service d'abord ; comprendre pourquoi vient après, quand le système est stable.",
  "why": "Un revert crée un nouveau commit qui annule le précédent, sans effacer l'historique que d'autres ont déjà récupéré. Enquêter après est sûr car le système fonctionne à nouveau.",
  "analogy": "En comptabilité, on ne rature pas une écriture erronée : on passe une écriture inverse. L'erreur reste dans les registres, et le solde se rétablit."
 },
 "g8": {
  "title": "Fetch ou déjà merge",
  "prompt": "Quelle est la différence entre fetch et pull dans Git ?",
  "opts": [
   "Fetch ne fait qu'apporter les modifications du distant ; pull les apporte et les fusionne dans votre branche",
   "Ce sont deux noms pour la même opération",
   "Fetch envoie les modifications ; pull les reçoit",
   "Fetch ne marche que sur main ; pull sur n'importe quelle branche"
  ],
  "hint": "L'un des deux modifie vos fichiers immédiatement. Lequel ?",
  "why": "Fetch met à jour votre vue du dépôt distant sans toucher à votre travail, vous laissant voir ce qui a changé avant d'intégrer. Pull fait les deux d'un coup et peut lever un conflit immédiatement.",
  "analogy": "C'est la différence entre relever le courrier et ouvrir les enveloppes sur le bureau où vous travaillez. Fetch le laisse dans la boîte ; pull l'étale maintenant."
 },
 "g9": {
  "title": "Ce qui appartient au dépôt",
  "prompt": "Classez chaque fichier du projet de la boulangerie.",
  "bins": [
   "Versionner",
   "Garder hors du dépôt (.gitignore)"
  ],
  "cards": [
   "Le code source du calcul de la monnaie rendue",
   "Le fichier contenant le mot de passe de la base de données",
   "Le README avec les instructions d'installation",
   "Le dossier des bibliothèques téléchargées automatiquement"
  ],
  "hint": "Demandez-vous si l'équipe a écrit le fichier et si quiconque ayant accès au dépôt peut le voir.",
  "why": "On versionne ce que l'équipe écrit et doit partager. Les secrets ne rentrent jamais, car l'historique Git est permanent ; les dépendances téléchargées non plus, car elles peuvent être reconstruites depuis le fichier de dépendances.",
  "analogy": "C'est comme préparer une valise : vos vêtements dedans, le shampoing de l'hôtel reste. Et votre clé de maison ne voyage certainement pas dans une valise ouverte."
 },
 "g10": {
  "title": "Le force push",
  "prompt": "Un collègue suggère de faire un force push sur la branche main pour « ranger » l'historique. Pourquoi est-ce dangereux ?",
  "opts": [
   "Ça réécrit l'historique que d'autres ont déjà récupéré et peut effacer leur travail",
   "Ça ralentit le dépôt",
   "Ça ne marche qu'avec les droits d'admin",
   "Ce n'est pas dangereux : c'est la façon recommandée d'organiser les commits"
  ],
  "hint": "Qu'arrive-t-il à quelqu'un qui a déjà récupéré l'ancienne version et a continué à travailler dessus ?",
  "why": "Un force push remplace l'historique distant. Les commits que d'autres ont déjà récupérés disparaissent de la chronologie, et le travail construit dessus se retrouve orphelin. Sur une branche partagée, utilisez revert à la place.",
  "analogy": "C'est comme réimprimer le procès-verbal d'une réunion que tout le monde a déjà ramené chez soi. Celui qui avait annoté l'ancienne version se retrouve avec un document qui n'existe plus."
 },
 "g11": {
  "title": "Le commit qui fait tout",
  "prompt": "Un commit change le calcul de la monnaie rendue, renomme vingt variables et ajoute un nouvel écran. Quel est le problème ?",
  "opts": [
   "On ne peut pas le revoir, l'annuler ni le retracer jusqu'à la source d'un défaut de manière isolée",
   "Aucun : les gros commits font gagner du temps",
   "Git a une limite de fichiers par commit",
   "Le message sera beaucoup trop long"
  ],
  "hint": "Pensez au jour où un seul de ces trois changements doit être annulé.",
  "why": "Chaque commit doit contenir un changement cohérent. En mélangeant trois, un revert entraîne ce qui était correct, et la revue se perd entre les renommages et la nouvelle logique.",
  "analogy": "C'est emballer la cuisine, la salle de bain et le bureau dans le même carton. Pour trouver une tasse, vous retournez tout, et vous ne pouvez pas renvoyer seulement ce qui est arrivé cassé."
 }
});
