/* Pacote gerado por tools/gerar-idioma.js a partir de "en". REVISAR com um falante nativo antes de publicar. */
LANG.tr = {
 "name": "Türkçe",
 "llmName": "Turkish",
 "ui": {
  "setH": "Ayarlar",
  "uiLang": "Oyun dili",
  "codeLang": "Biletlerin programlama dili",
  "aiH": "AI eğitmen",
  "aiP": "AI eğitmen, cevabı vermeden oyun dilinde kişiye özel Sokratik ipuçları ve yeni analojiler yazar. Kapalıysa oyun, yazarların hazırladığı ipuçlarını kullanır.",
  "aiClaude": "Claude üzerinden bağlı: bu sayfada anahtar gerekmez.",
  "aiKeyOn": "Kendi anahtarınızla yapılandırıldı ({m}).",
  "aiOff": "Kapalı. Açmak için aşağıdan bir sağlayıcı girin.",
  "provider": "Sağlayıcı",
  "provAnthropic": "Anthropic (Claude)",
  "provOpenAI": "OpenAI uyumlu (OpenAI, Ollama, LM Studio, vb.)",
  "key": "API anahtarı",
  "model": "Model",
  "base": "Temel URL",
  "save": "Eğitmen ayarlarını kaydet",
  "clear": "Anahtarı kaldır",
  "saved": "Ayarlar kaydedildi.",
  "keyNote": "Anahtar yalnızca bu tarayıcıda (localStorage) saklanır ve doğrudan sağlayıcıya gönderilir. Paylaşılan bir bilgisayarda kullanmayın. Sınıf ortamı için anahtar gerektirmeyen yerel bir sunucu tercih edin (örneğin, Ollama http://localhost:11434/v1).",
  "err": "Hata",
  "none": "Hiçbir şey",
  "navShop": "Mağaza",
  "balance": "Bakiye",
  "total": "Yaşam boyu XP",
  "titleLbl": "Unvan",
  "modeH": "Zorluk",
  "modes": {
   "normal": "Normal",
   "medio": "Orta",
   "dificil": "Zor",
   "hardcore": "Ekstra hardcore"
  },
  "modeDesc": {
   "normal": "XP ×1. Ücretsiz ipuçları (ipucuyla doğru cevap yarı puan kazandırır). Her hata bilet seviyesi başına 2 XP kaybettirir.",
   "medio": "XP ×1.5. Her ipucu 5 XP tutar. Her hata bilet seviyesi başına 4 XP kaybettirir.",
   "dificil": "XP ×2. Çıktı biletlerinde ipucu ve seçenek yok: programın çıktısını kendiniz yazarsınız. Her hata seviye başına 6 XP kaybettirir.",
   "hardcore": "XP ×3. İpucu yok, cevapları yazarak verirsiniz ve 60 saniye süreniz vardır. Her hata seviye başına 10 XP kaybettirir."
  },
  "typedLbl": "Programın çıktısını tam olarak yazın",
  "typedPh": "program çıktısı",
  "yourAnswer": "Cevabınız: {a}",
  "expected": "Doğru çıktı: {a}",
  "timeLeft": "Süre: {s} sn",
  "timeout": "Süre doldu.",
  "lost": "Ceza: bakiyenizden -{x} XP.",
  "shieldUsed": "Kalkanınız cezayı emdi.",
  "boostOn": "Çifte XP: {n} bilet kaldı",
  "hintPaid": "İpucu iste (maliyet: {c} XP)",
  "noHints": "Bu modda ipucu yok.",
  "useFifty": "İki seçeneği kaldır ({n})",
  "useTime": "+30 sn kullan ({n})",
  "lockedXp": "Kilitli: {p} bölümünde %60 ve {x} yaşam boyu XP gerekli (sizde {y} var).",
  "lockedXpOnly": "Kilitli: {x} yaşam boyu XP gerekli (sizde {y} var).",
  "bountiesH": "Sprint görevleri",
  "bountyDone": "Görev tamamlandı: {s} (+{x} XP)",
  "dailyH": "Günlük görev",
  "dailyTag": "Çifte XP",
  "dailyDone": "Günlük görev tamamlandı. Yenisi yarın gelir.",
  "bossesH": "Bosslar",
  "bossLocked": "{p} bölümünde %60 ve {x} yaşam boyu XP gerekli.",
  "bossDefeated": "Yenildi",
  "bossFight": "Boss ile yüzleş",
  "bossStage": "Aşama {n}/{m}",
  "bossLives": "Kalan hata hakkı: {n}",
  "bossNext": "Sonraki aşama",
  "bossResult": "Sonucu gör",
  "bossWin": "Boss yenildi",
  "bossWinP": "{x} XP ve \"{t}\" kupasını kazandınız.",
  "bossLose": "Bu sefer boss kazandı",
  "bossLoseP": "Bakiyenizden {x} XP kaybettiniz. İlgili görevleri gözden geçirip rövanş için geri dönün.",
  "bossRules": "Zincirleme üç aşama, ipucu ve güçlendirme yok. Tek bir hata yapabilirsiniz. Panoda seçilen zorluk burada da geçerlidir.",
  "options": "Seçenekler",
  "codeLines": "Kod satırları",
  "solved": "Bilet çözüldü",
  "notYet": "Bu sefer değil",
  "why": "Neden: ",
  "analogy": "Benzetme: ",
  "delta": "{s} ustalığı: {a} → {b}   (+{x} XP)",
  "roseNote": "Hataya rağmen hafifçe yükseldi çünkü model, açıklamayı okumanın da öğrettiğini varsayar.",
  "masteredNow": "Beceri ustalaşıldı: {s}.",
  "unlockedNow": "Yeni görev açıldı: {s}.",
  "promo": "Terfi: rolünüz artık {r}.",
  "aiExplain": "Yapay zeka öğretmenden başka bir benzetme iste",
  "toRetro": "Sprint retrospektifini gör",
  "retroH": "Sprint {n} retrospektifi",
  "retroSum": "{n} biletten {c} tanesi çözüldü. ",
  "retroA": "Temiz sprint.",
  "retroB": "İyi tempo; geride kalanları gözden geçir.",
  "retroC": "Zorlu sprint. İncelenecek biletler daha sonra panoya geri dönecek.",
  "changed": "Ustalığınızda ne değişti",
  "colSkill": "Beceri",
  "colStart": "Sprint başı",
  "colNow": "Şimdi",
  "suggestion": "Öğretmenin sonraki sprint için önerisi: şu anda {p} seviyesinde olan {s} üzerine odaklan.",
  "allDone": "Tüm becerilerde ustalaşıldı. Sonraki sprintler serbest pratik.",
  "nextSprint": "Sprint {n} başlat",
  "repH": "Öğrenme raporu",
  "repSub": "Öğrenci ve onu destekleyenler için bir görünüm: nelerde ustalaşıldı, hatalar nerede ve sonraki adımda ne çalışılmalı.",
  "k1": "cevaplanan bilet",
  "k2": "doğruluk",
  "k3": "ustalaşılan beceri",
  "k4": "en uzun doğru serisi",
  "of": "{b} taneden {a}",
  "bySkill": "Beceriye göre ustalık",
  "colMastery": "Ustalık",
  "colHits": "Doğru",
  "colStatus": "Durum",
  "colSbc": "SBC",
  "stM": "Ustalaşıldı",
  "stP": "Devam ediyor",
  "stL": "Kilitli",
  "stB": "Açılacak görev",
  "recs": "Öğretmenin önerileri",
  "recNone": "Henüz cevap yok. Öğretmenin kanıt elde etmesi için birkaç bilet çözün.",
  "recPriority": "Öncelik: {s} ({p} ustalık, {n} biletten {c} doğru).",
  "recBloom": "En çok hata yapılan bilişsel düzey: {b} ({n} biletten {c}). Bu tür biletleri sakin bir şekilde, ipucu kullanmadan çalışın.",
  "recHints": "Biletlerin %{p} kadarında ipucu kullanıldı. Sormadan önce bir hipotez oluşturmayı deneyin.",
  "recLocked": "Hâlâ kilitli: {s}. Ön koşullar %60'ı geçince açılır.",
  "bloomAcc": "Bloom düzeyine göre doğruluk",
  "noData": "veri yok",
  "how": "Ustalık nasıl hesaplanır",
  "howP": "Öğretmen Bayesian Bilgi İzleme kullanır. Her beceri için ustalaşma olasılığınızı tutar ve her cevaptan sonra şanslı tahmin ve dikkatsiz hata olasılığını düşerek günceller.",
  "howA": "Bir öğretmenin öğrenci hakkında yavaş yavaş fikir oluşturması gibidir. Çoktan seçmeli doğru bir cevap, tüm programı doğru sırayla oluşturmaktan daha az ikna edicidir çünkü ilk durumda tahmin şansı %25'tir.",
  "howParams": "Parametreler: başlangıç ustalığı %15, bilet başına öğrenme %20, hata %10, bilet türüne göre tahmin (seçeneklerde 4'te 1, hatalarda satır başına 1, sıralamada %5; ipucu kullanıldığında %50). Kilit açma %60, ustalaşma %95.",
  "data": "Verileriniz",
  "dataP": "İlerleme yalnızca bu tarayıcıda saklanır. Kayıt, bilgi izleme veri setlerinin uzun formatını takip eder (öğe, beceri, doğruluk, dil, programlama dili, zaman damgası).",
  "showJson": "JSON kaydını göster",
  "hideJson": "JSON kaydını gizle",
  "download": "JSON'u indir",
  "reset": "İlerlemeyi sil",
  "resetConfirm": "Onaylayın: tüm ilerlemeyi sil",
  "role": "Rol",
  "xp": "XP",
  "streak": "Seri",
  "navBoard": "Pano",
  "navReport": "Rapor",
  "navSettings": "Ayarlar",
  "roles": [
   "Stajyer",
   "Yazılımcı",
   "Orta Düzey",
   "Kıdemli",
   "Uzman"
  ],
  "homeH": "Gerçek insanların sorunlarını çözerek programlama ve yazılım mühendisliği öğren",
  "homeLead": "Ponte'ye yeni katıldınız. Burası mahallenin fırınına, sağlık ocağına, okuluna ve dağıtım kooperatifine hizmet veren küçük bir yazılım atölyesi. Her müşteri gerçek bir sorun getirir: önce hikayeyi dinler, teori araç setini çalışır ve ancak ondan sonra iş emirlerini elinize alırsınız.",
  "start": "İlk sprinti başlat",
  "cont": "Kaldığım yerden devam et",
  "steps": [
   [
    "Müşteriyi dinle",
    "Her görev, o sorunu yaşayan insanların anlattığı gerçek bir sorunun hikayesiyle başlar."
   ],
   [
    "Teori araç setini oluştur",
    "Anahtar kavramlar, seçtiğin dilde bir kod örneği ve eğitilen SBC müfredat yeterliliği."
   ],
   [
    "İş emirlerini çöz",
    "Çıktıyı tahmin et, kodu sırala, hataları avla ve mühendislik kararları ver. Her cevap pratik bir benzetme ile gelir ve eğitmen ustalığını takip eder."
   ]
  ],
  "sprint": "Sprint {n}",
  "ticketOf": "İş emri {n} / {m}",
  "freePlay": "Her şeyi öğrendin. Pano artık serbest çalışma modunda.",
  "missions": "Yeni görevler",
  "todo": "Yapılacaklar",
  "todoEmpty": "İş emirlerini almak için yukarıdan bir görev aç.",
  "openBrief": "Hikayeyi dinle ve teoriyi çalış",
  "doneSprint": "Bu sprintte tamamlandı",
  "nothingDone": "Henüz bir şey yok. Sprinti başlatmak için bir iş emri seç.",
  "resolved": "çözüldü",
  "toReview": "incelenecek",
  "map": "Ustalık haritası",
  "areaProg": "Programlama",
  "areaSE": "Yazılım mühendisliği",
  "mapHint": "Detayları görmek için bir beceriye dokun. Sayı, o beceriyi zaten öğrenmiş olma olasılığının tahminidir.",
  "locked": "Kilitli: Kilit açmak için {p}'de %60'a ulaş.",
  "and": " ve ",
  "masteredTxt": "Öğrenildi. ",
  "estTxt": "{p} için tahmini ustalık. ",
  "hits": "{n} iş emrinden {c} doğru. ",
  "reread": "Hikayeyi ve teoriyi tekrar oku",
  "lockedAria": "kilitli",
  "masteryAria": "ustalık",
  "client": "Müşteri",
  "story": "Hikaye",
  "arsenal": "Teori araç seti",
  "example": "Kod örneği",
  "snippetNote": "Java ve C kod örnekleri, odaklanmayı kavram üzerinde tutmak için sınıf ve main fonksiyonunu atlar.",
  "sbcH": "Burada eğitilen SBC Müfredat Yönergeleri (2017) yeterlilikleri",
  "startTickets": "Hazırım: bu görevin iş emirlerini aç",
  "backBoard": "Panoya geri dön",
  "types": {
   "mc": "Analiz et ve cevapla",
   "parsons": "Kodu sırala",
   "bug": "Hatayı avla",
   "sort": "Sınıflandır"
  },
  "bloom": [
   "Hatırla",
   "Anla",
   "Uygula",
   "Analiz et",
   "Değerlendir"
  ],
  "diff": "Zorluk {d} / 3",
  "check": "Cevabı kontrol et",
  "hint": "İpucu iste",
  "aiHint": "Yapay zeka eğitmeninden ipucu iste",
  "tutorHint": "Eğitmenin ipucu: ",
  "aiLabel": "Yapay zeka eğitmeni: ",
  "aiThinking": "Eğitmen düşünüyor...",
  "aiFail": "Yapay zeka eğitmeni yanıt vermedi. Ayarları kontrol et veya normal ipucunu kullan.",
  "hintNote": "İpucu ile verilen doğru cevap XP'nin yarısını kazandırır ve ustalık kanıtı olarak daha zayıf sayılır.",
  "bank": "Kullanılabilir satırlar (kullanmak için dokun)",
  "sol": "Programın (geri almak için bir satıra dokun)",
  "allUsed": "Tüm satırlar kullanıldı.",
  "correctOrder": "Doğru sıra:",
  "up": "Yukarı taşı",
  "down": "Aşağı taşı",
  "bossStart": "Dövüşü başlat",
  "reward": "Ödül: {x} XP",
  "trophies": "Kupalar",
  "noTrophies": "Henüz yok. Yeterli ustalık ve XP'ye sahip olduğunuzda patronlar panoda belirir.",
  "review": "Gözden geçir",
  "shopH": "Mağaza",
  "shopP": "XP bakiyenizi güçlendirmeler ve unvanlar için kullanın. Bakiyeyi harcamak, aşamaları ve patronları açan toplam XP'yi azaltmaz.",
  "shopA": "Bunlar bir sadakat programının milleridir. Bakiyeyi biletler için harcarsınız; kart seviyeniz toplam uçulan mile bağlıdır ve ödül kullandığınızda düşmez.",
  "powers": "Güçlendirmeler",
  "titlesH": "Unvanlar",
  "owned": "Sizde: {n}",
  "buy": "{c} XP karşılığında al",
  "equip": "Bu unvanı kullan",
  "equipped": "Kullanımda",
  "unequip": "Kullanmayı bırak",
  "kTotal": "toplam XP",
  "kBosses": "yenilen patronlar",
  "cheers": [
   "Aferin!",
   "Harika kod okuma!",
   "Tam isabet, keskin akıl yürütme!",
   "Görev tarzında kapatıldı!"
  ],
  "oops": [
   "Az kaldı. Her geliştirici düzeltmeden önce derlemeyi bozar.",
   "Hatalar yolun bir parçası: artık tuzağın nerede olduğunu biliyorsun.",
   "Akıl yürütmende bir hata buldun; hata ayıklama böyle öğrenilir.",
   "Bu sefer olmadı, sorun değil. Açıklamayla acele etme."
  ],
  "keepGoing": "Bu görev daha sonra rövanş için panoya geri dönecek.",
  "streakMsg": "Üst üste {n}! Seri bonusu: +5 XP.",
  "comeback": "Geri dönüş: Bir hatanın hemen ardından doğru cevap için +{x} XP.",
  "need": "{n} XP kaldı (maliyet: {c})",
  "evoH": "Bilgi gelişimi",
  "evoP": "Her çizgi, cevapladığınız görevlerdeki bir becerinin tahmini ustalığıdır. Vurgulamak için bir beceriye dokunun: yeşil noktalar doğru cevaplar, kehribar noktalar hatalardır. Kesikli çizgiler açılış (%60) ve ustalığı (%95) işaretler.",
  "evoEmpty": "Öğrenme eğrinizi görmek için bu dilde birkaç görev cevaplayın.",
  "evoAll": "Tümü",
  "evoX": "cevaplanan görevler",
  "colFirst": "İlk tahmin",
  "colGain": "Kazanç",
  "colTries": "Görevler",
  "plH": "Programlama diline göre ustalık",
  "plP": "Her dilin kendi ustalık takipçisi vardır; kullanılan ● ile işaretlenir. Bir dili ilk denediğinizde, aktarım tahminiyle başlarsınız: en iyi dilinizde kat edilen yolun yarısı. Kalın değerler pratik edilmiştir.",
  "plA": "Düz vites araba kullanan biri otomatikte başa dönmez, ancak uyum sağladığını kanıtlamak için mahallede birkaç tur atması gerekir.",
  "plAcc": "Doğru",
  "langH": "Oyun diline göre doğru cevaplar",
  "studyH": "Çok dilli çalışmanın dilleri",
  "studyP": "Çeviri ve simgeleştirme analizinin 20 dili. 1000 karakter başına simge maliyeti çalışmada ölçülmüştür ve yapay zeka öğretmeninin her dilde ne kadar harcadığını gösterir. Bekleyen paketler tools/gerar-idioma.js ile üretilir ve oyuna girmeden önce incelenir.",
  "available": "mevcut",
  "pending": "üretilecek paket",
  "colLang": "Dil",
  "colScript": "Alfabe",
  "colTok": "1000 karakter başına simge",
  "sortHint": "Her kart için iki kategoriden birini seçin."
 },
 "sbc": {
  "CC-C.1.3": "RF-CC C.1.3: Programlama ortamlarını kullanarak problemleri çözme (Algoritmalar, Programlama Teknikleri, Veri Yapıları).",
  "ES-C.1.1": "RF-ES C.1.1: Algoritmik çözümü olan problemleri çözme (Algoritmalar, Programlama, Veri Yapıları).",
  "ES-C.6.4": "RF-ES C.6.4: Yazılım ürününde kullanılacak teknolojileri uygulama (programlama teknikleri ve paradigmalar).",
  "ES-C.5.3": "RF-ES C.5.3: Gereksinim belirleme tekniklerini ve prosedürlerini uygulama (toplama, belirleme, doğrulama ve yönetim).",
  "ES-C.4.2": "RF-ES C.4.2: Yazılım geliştirme süreçlerini uygulama (yazılım süreç kavramı ve modelleri).",
  "ES-C.4.4": "RF-ES C.4.4: Yazılım projelerini yönetme (kapsam, zaman, kalite, iletişim, riskler, paydaşlar).",
  "ES-C.6.3": "RF-ES C.6.3: Yazılım geliştirme ortamını tanımlama (konfigürasyon yönetim araçları).",
  "ES-C.6.2": "RF-ES C.6.2: Statik ve dinamik doğrulama ve geçerleme tekniklerini ve prosedürlerini uygulama.",
  "ES-C.7.3": "RF-ES C.7.3: Yazılım Kalitesi ekseni kapsamında doğrulama ve geçerleme tekniklerini ve prosedürlerini uygulama.",
  "ES-C.6.1": "RF-ES C.6.1: Yazılım geliştirme tekniklerini ve prosedürlerini uygulama (tasarım ilkeleri, desenler, yeniden kullanım).",
  "ES-C.6.7": "RF-ES C.6.7: Yazılım geliştirme ilkelerini, desenlerini ve iyi uygulamaları uygulama.",
  "ES-C.4.3": "RF-ES C.4.3: Yazılım bakım ve evrim tekniklerini ve prosedürlerini uygulama (yeniden düzenleme).",
  "ES-C.5.4": "RF-ES C.5.4: Yazılım modelleme tekniklerini uygulama (statik, fonksiyonel ve dinamik modeller).",
  "ES-C.7.1": "RF-ES C.7.1: Bir yazılım ürününün kalite özelliklerini ve ne işe yaradıklarını anlama.",
  "ES-C.7.2": "RF-ES C.7.2: Yazılım ürün kalitesini ölçme mekanizmalarını uygulama (metrikler ve değerlendirme teknikleri).",
  "ES-C.6.5": "RF-ES C.6.5: Bir sistemin parçalarını entegre etme tekniklerini uygulama (entegrasyon ortamları, derleme araçları)."
 },
 "skills": {
  "var": {
   "name": "Değişkenler",
   "about": "Değerleri saklama, türler ve temel operatörler.",
   "client": "Dona Lúcia'nın fırını",
   "title": "Hiç denkleşmeyen kasa",
   "story": "Dona Lúcia her gece fırının kasasını bir defterde kapatıyor ve rakamlar hiçbir zaman tutmuyor. Yeğeni bir elektronik tablo yaptı, ama ekmek fiyatı metin olarak yazılmıştı ve iki somun eklendiğinde \"4.504.50\" sonucu çıkıyordu. Basit bir şey istiyor: fiyat, adet ve para üstünü hatasız kaydetmek. Güzel bir ekrandan önce, sistemin her veriyi doğru türle saklaması gerekiyor.",
   "theory": [
    [
     "Değişken, bir değerin adıdır",
     "Bir veriyi daha sonra kullanmak üzere bellekte tutar. Atama, o anki değeri kopyalar; iki değişken arasında kalıcı bir bağ oluşturmaz."
    ],
    [
     "Her değerin bir türü vardır",
     "Tam sayılar, ondalıklı sayılar, metin ve boolean değerler farklı davranır. Metinle + birleştirir; sayılarla toplar. Para ondalıklı sayı ister; adet tam sayı ister."
    ],
    [
     "Tam sayı bölme ve kalan",
     "Tam sayı bölme ondalık kısmı atar, % operatörü ise kalanı döndürür. Para üstü, çift/tek kontrolü ve gruplara ayırmanın temelidir."
    ]
   ]
  },
  "cond": {
   "name": "Koşullar",
   "about": "Programın yolunu if, else if ve else ile seçmek.",
   "client": "Mahalle sağlık ocağı",
   "title": "İlk gelen ilk hizmet alamayan kuyruk",
   "story": "Sağlık ocağında hemşire Rosa triyajı kafasında yapar: yüksek ateş önce gelir, yaşlılar önceliklidir, diğer herkes bekler. Rosa yokken kuyruk ilk gelen ilk hizmet alır şekline döner ve ciddi bir vaka iki saat bekler. Klinik, sistemin Rosa'nın kurallarını her seferinde uygulamasını ister; tam 39 derece ateş gibi sınır durumlar dahil.",
   "theory": [
    [
     "Koşul, evet ya da hayır sorusudur",
     "Program bir boolean ifadeyi değerlendirir ve tek bir yolu izler. >, >= ve == gibi operatörler sınırın tam olarak nerede olduğunu belirler."
    ],
    [
     "Testlerin sırası önemlidir",
     "Bir if / else if zincirinde ilk doğru test kazanır ve geri kalanlar değerlendirilmez bile. En katı kural önce gelmelidir."
    ],
    [
     "Koşulları birleştirme",
     "AND (ve, &&) ikisinin de doğru olmasını gerektirir; OR (veya, ||) en az birinin doğru olmasını gerektirir. AND, OR'dan önce değerlendirilir; şüphedeyseniz parantez kullanın."
    ]
   ]
  },
  "loop": {
   "name": "Döngüler",
   "about": "for ve while ile talimatları tekrarlamak.",
   "client": "Paulo Freire Belediye Okulu",
   "title": "Elle dört yüz karne",
   "story": "Okul sekreteri Marta, her dönem 400 öğrencinin ortalamasını hesap makinesiyle tek tek hesaplıyor. Üç gün sürüyor ve her seferinde bir hata mutlaka gözden kaçıyor. Hesaplama herkes için aynı; sadece notlar değişiyor. Otomatik tekrar gerektiren bir işin resmidir bu: kuralı bir kez yaz ve bilgisayarın tüm listeyi dolaşmasına izin ver.",
   "theory": [
    [
     "for: her eleman için tekrarla",
     "Tekrar sayısı bilindiğinde kullan: listedeki her öğrenci, 0'dan n-1'e kadar her sayı. Sayma genellikle 0'dan başlar ve sınırdan önce durur."
    ],
    [
     "while: bir şey doğru olduğu sürece tekrarla",
     "Kaç tur olacağını bilmediğinde kullan. Döngünün içindeki bir şey çıkışa doğru ilerlemeli, yoksa döngü asla bitmez."
    ],
    [
     "Biriktirici deseni",
     "Bir değişken nötr bir değerle başlar (0, boş, ilk eleman) ve her turda güncellenir: toplam, sayı, en büyük değer."
    ]
   ]
  },
  "func": {
   "name": "Fonksiyonlar",
   "about": "Mantığı paketleme: parametreler, dönüş ve kapsam.",
   "client": "Roda Viva teslimat kooperatifi",
   "title": "Kargo ücreti üç yerde hesaplanıyor",
   "story": "Kurye kooperatifi kargo ücretini web sitesinde, uygulamada ve finans elektronik tablosunda hesaplıyor. Kilometre başına fiyat arttığında, biri üçünün sadece ikisini güncelledi ve bir hafta boyunca kuryelere hak ettiklerinden daha az ödeme yapıldı. Tek bir kural var; tek bir yerde yaşamalı ve herkes tarafından çağrılmalı.",
   "theory": [
    [
     "Fonksiyon, isimlendirilmiş bir kuraldır",
     "Parametreler alır, adımları çalıştırır ve return ile bir sonuç geri verir. Bir kez tanımlayıp her yerden çağırmak, farklılaşmış kopyaları ortadan kaldırır."
    ],
    [
     "Return etmek, yazdırmak değildir",
     "Yazdırmak değeri ekranda gösterir; return etmek değeri çağırana verir, o da bunu başka hesaplamalarda kullanabilir."
    ],
    [
     "Kapsam ve değerle geçiş",
     "Bir fonksiyonun içinde oluşturulan değişkenler yereldir ve sonunda yok olur. Argüman olarak geçirilen sayılar kopya olarak gelir: içeride değiştirmek orijinali değiştirmez."
    ]
   ]
  },
  "col": {
   "name": "Koleksiyonlar",
   "about": "Listeler ve sözlükler, indeksler ve referanslar.",
   "client": "Casa das Letras mahalle kütüphanesi",
   "title": "Ödünç defteri kayboldu",
   "story": "Mahalle kütüphanesi ödünç kayıtlarını bir defterde tutuyordu; defter son fırtınada ıslandı. Bay Antônio hangi kitapların olduğunu, her birinden kaçar kopya bulunduğunu ve kimde ne olduğunu bilmek istiyor. Bu, aynı türden çok fazla veri: bağımsız değişkenler bunu taşıyamaz. Verileri koleksiyonlar halinde düzenleme zamanı geldi.",
   "theory": [
    [
     "Liste: sıralı bir dizi",
     "Pozisyona göre erişilen birden çok değer tutar. İndeks 0'dan başlar, bu yüzden 3 öğeli bir liste 0'dan 2'ye kadar indekslenir."
    ],
    [
     "Sözlük veya harita: anahtarla arama",
     "Bir anahtarı bir değere bağlar, örneğin başlığı kopya sayısına. Konuma göre değil ada göre arama yaparken doğru seçimdir."
    ],
    [
     "Koleksiyonlar referansla paylaşılır",
     "Bir listeyi başka bir değişkene atamak veriyi kopyalamaz: her iki ad da aynı koleksiyonu gösterir. Çoğaltmak için açıkça kopyalamanız gerekir."
    ]
   ]
  },
  "rec": {
   "name": "Özyineleme",
   "about": "Kendini çağıran fonksiyonlar ve temel durum.",
   "client": "2. Bölge Noterliği",
   "title": "Klasörler içinde klasörler içinde klasörler",
   "story": "Noterlik, 40 yıllık belgeleri standart derinliği olmayan iç içe klasörlere taradı. Katip Helena'nın toplam kaç dosya olduğunu sayması gerekiyor. Basit bir döngü işe yaramaz çünkü her klasör başka klasörler içerebilir. Doğal çözüm şudur: bu klasördeki dosyaları say ve aynı işlemi her alt klasörde tekrarla.",
   "theory": [
    [
     "Kendi terimleriyle tanımlanan bir problem",
     "Fonksiyon küçük bir parçayı çözer ve geri kalanını daha küçük bir problem üzerinde kendine yapılan bir çağrıya devreder."
    ],
    [
     "Temel durum: fren",
     "Yeni bir çağrı olmadan cevaplanan basit durumdur (boş klasör, n 0'a eşit). Her özyinelemeli çağrı ona doğru ilerlemelidir."
    ],
    [
     "Çağrı yığını",
     "Her çağrı bir sonrakinin bitmesini bekler. Özyinelemeli çağrıdan sonra gelen her şey yalnızca dönüş yolunda, en içten en dışa doğru çalışır."
    ]
   ]
  },
  "req": {
   "name": "Gereksinimler",
   "about": "Yazılımın ne yapması gerektiğini keşfetmek ve yazmak.",
   "client": "Mahalle sağlık ocağı",
   "title": "\"Bir uygulama istiyorum\"",
   "story": "Klinik müdürü toplantıya kararlı gelir: \"Bankanınki gibi bir uygulama istiyorum\". Yarım saatlik konuşmanın ardından gerçek sorun ortaya çıkar: hastalar randevu tarihini unuttukları için randevularına gelmiyor ve slotların %30'u boşa gidiyor. Belki de çözüm basit bir kısa mesaj hatırlatmasıdır. İstenileni, neye ihtiyaç duyulduğunu anlamadan inşa eden, yanlış yazılımı tam zamanında teslim eder.",
   "theory": [
    [
     "İhtiyaçlar çözümlerden önce gelir",
     "Müşteriler çözümleri tarif eder; mühendis, görüşmeler, gözlem ve prototiplerle (gereksinim toplama) arkasındaki sorunu araştırır."
    ],
    [
     "İşlevsel ve işlevsel olmayan",
     "İşlevsel, sistemin ne yaptığıdır (planlama, hatırlatma). İşlevsel olmayan, ne kadar iyi yaptığıdır (yanıt süresi, güvenlik, kullanılabilirlik)."
    ],
    [
     "İyi bir gereksinim doğrulanabilir olandır",
     "\"Hızlı\" ve \"kullanıcı dostu\" test edilemez. \"Sorguların %95'inde 2 sn içinde yanıt verir\" test edilebilir. Kullanıcı hikayeleri şu şekilde ilerler: Bir [rol] olarak, [eylem] istiyorum, böylece [fayda]."
    ]
   ]
  },
  "agil": {
   "name": "Agile",
   "about": "Sprintler, MVP ve artımlı teslimat.",
   "client": "Paulo Freire Belediye Okulu",
   "title": "Kayıtlar altı hafta içinde açılıyor",
   "story": "Okul; karneler, yemekler ve ulaşım dahil eksiksiz bir kayıt sistemi istiyor. Kayıtlar altı hafta içinde açılıyor ve istek listesinin tamamlanması altı ay sürer. Ekip ortadan kaybolup ancak her şey hazır olduğunda geri dönerse çok geç olacak. Çıkış yolu, temel kısmı önce çalışır hâlde teslim etmek, yani kayıt işlemini, ve gerçek kullanımdan gelişerek büyümek.",
   "theory": [
    [
     "Kısa döngülerde teslim et",
     "Bir sprintin süresi sabittir ve kullanılabilir bir artışla sona erer. Gerçek kullanıcılardan gelen geri bildirim bir sonraki döngüyü yönlendirir."
    ],
    [
     "MVP: erken öğren",
     "Minimum uygulanabilir ürün, çekirdek sorunu uçtan uca, küçük ölçekte çözer; böylece daha fazla yatırım yapmadan önce hipotezleri doğrular."
    ],
    [
     "Kapsam ayar değişkenidir",
     "Son tarih ve kalite sabit kalır; neyin dahil edileceği müzakere edilir. Devam eden işi sınırlamak, ekibin yeni bir şeye başlamadan önce bitirmesine yardımcı olur."
    ]
   ]
  },
  "git": {
   "name": "Git",
   "about": "Kod sürümleme: commit'ler, dallar ve birleştirmeler.",
   "client": "Ponte ekibi",
   "title": "Kodun kaybolduğu Cuma",
   "story": "Cuma öğleden sonra, Caio ve Bia fırın sistemindeki aynı dosyayı düzenledi. Her biri kendi sürümünü paylaşılan klasöre \"gercekten_bu_sefer_son.zip\" olarak kaydetti. Son kayıt diğerinin çalışmasını sildi ve kimse hangi sürümün canlıda olduğunu söyleyemedi. Ponte karar verdi: Pazartesiden itibaren tüm kod bir Git deposunda yaşayacak.",
   "theory": [
    [
     "Commit: açıklamalı bir anlık görüntü",
     "Projenin durumunu yazar, tarih ve mesaj ile kaydeder. Açık mesajlar neyin değiştiğini ve neden değiştiğini anlatır."
    ],
    [
     "Branch: paralel çalışma",
     "Her özellik izole bir dalda doğar ve ana hat, gözden geçirilip entegre edilene (merge) kadar stabil kalır."
    ],
    [
     "Çakışma bir karar talebidir",
     "İki dal aynı satırları değiştirirse, Git tek başına seçim yapmaz: her iki sürümü de gösterir ve birinin karar vermesini ister."
    ]
   ]
  },
  "test": {
   "name": "Test Etme",
   "about": "Kodun otomatik testlerle kontrol edilmesi.",
   "client": "Dona Lúcia'nın fırını",
   "title": "Fazla ücret alan indirim",
   "story": "Fırın, 50 reali üzeri alışverişler için %10 indirim başlattı. Bir müşteri tam 50 harcadı ve indirim alamadı; bir diğeri iki kez aldı. Dona Lúcia bütün hafta para iadesi yaptı. Hata, kimsenin test etmediği bir sınır karşılaştırmasındaydı. Üç satırlık otomatik bir test, müşteriden önce alarmı çalardı.",
   "theory": [
    [
     "Birim testi",
     "Bir fonksiyon gibi küçük ve izole bir birimi hızlı ve tekrarlanabilir şekilde kontrol eder. Kalıp şudur: Düzenle, Uygula, Doğrula."
    ],
    [
     "Sınır değerleri",
     "Hatalar, kuralların sınırlarında kümelenir. Sınırın hemen altında, tam üstünde ve hemen üstünde test edin."
    ],
    [
     "Regresyon testleri ve test etmenin sınırları",
     "Düzeltilen her hata, onu yeniden üreten bir test alır, böylece asla geri dönmez. Testler hataların varlığını ortaya çıkarır, ancak yokluğunu kanıtlamaz."
    ]
   ]
  },
  "design": {
   "name": "Tasarım",
   "about": "Uyum, bağlaşım, SOLID ve yeniden düzenleme.",
   "client": "Roda Viva dağıtım kooperatifi",
   "title": "Bir ödeme yöntemi daha, bir yama daha",
   "story": "Kooperatif önce nakit aldı; sonra kartlar geldi, ardından Pix anında ödemeler, şimdi de yemek kartları. Her yenilikte biri, kimsenin dokunmaya korktuğu 300 satırlık fonksiyona bir \"if\" daha ekliyor. Son değişiklikten sonra Pix iki gün boyunca çalışmadı. Yazılım çalışıyor ama değiştirmek pahalı hale geldi. Bu bir tasarım sorunudur.",
   "theory": [
    [
     "Yüksek uyum, düşük bağlaşım",
     "Her modül tek bir konuyla ilgilenir ve diğerlerine az bağımlıdır. Böylece tek başına anlaşılabilir, test edilebilir ve değiştirilebilir."
    ],
    [
     "SOLID ilkeleri",
     "Tek sorumluluk: değişmek için tek neden. Açık/kapalı: çalışanı düzenlemeden genişlet. Bağımlılığı tersine çevirme: somut uygulamalara değil arayüzlere bağımlı ol."
    ],
    [
     "Yeniden düzenleme",
     "Davranışı değiştirmeden yapıyı iyileştirmek, testlerle korunan küçük adımlarla: fonksiyon çıkar, tekrarı kaldır, anlaşılır isimler ver."
    ]
   ]
  },
  "qual": {
   "name": "Kalite",
   "about": "Kalite nitelikleri, kod incelemesi, metrikler ve teknik borç.",
   "client": "Ponte ekibi",
   "title": "Sadece Caio'nun anladığı kod",
   "story": "Caio tatile çıktı ve fırın sistemi çöktü. Bia kodu açtı: x1 ve x2 adında değişkenler, 400 satırlık bir fonksiyon, kararların neden alındığına dair hiçbir ipucu yok. Tek bir satırı düzeltmesi iki gününü aldı. Kod çalışıyordu ama sadece onu yazan kişi için. Ponte karar verdi: başka biri okumadan hiçbir değişiklik ana hatta ulaşmayacak.",
   "theory": [
    [
     "Kalitenin birçok niteliği vardır",
     "Yazılım çalışmanın ötesinde okunabilir, test edilebilir, güvenli, verimli ve değiştirilmesi kolay olmalıdır. ISO/IEC 25010 bu nitelikleri düzenler; yıllar içinde maliyete en çok etki eden bakım yapılabilirliktir."
    ],
    [
     "Kod incelemesi",
     "Değişiklik birleştirilmeden önce başka biri kodu okur (pull request). Küçük ve sık incelemeler hataları erken yakalar, bilgiyi yayar ve sistemin tek bir kişiye bağımlı kalmasını önler. Hedef koddur, asla yazar değil."
    ],
    [
     "Teknik borç ve ölçüm",
     "Bugünün kestirmeleri yarın faiz öder: her değişiklik yavaşlar. Statik analizle toplanan döngüsel karmaşıklık, tekrarlama ve kapsama gibi metrikler borcun nerede biriktiğini gösterir."
    ]
   ]
  },
  "model": {
   "name": "Modelleme",
   "about": "Kod yazılmadan önce ekibi aynı çizgide buluşturan diyagramlar: kullanım senaryoları, sınıflar ve sıralamalar.",
   "client": "Casa das Letras mahalle kütüphanesi",
   "title": "Üç kişi, kafalarında üç farklı sistem",
   "story": "Ödünç alma özelliğini kodlamaya başlamadan önce ekip, Bay Antônio, bir gönüllü ve bir okuyucuyla bir araya geldi. Her biri \"sistemi\" anlattı ve anlatılanlar üç ayrı ürün gibiydi: biri için bir kitabın birden çok kopyası vardı; diğeri için her kopya bir kitaptı. Kimse haksız değildi; eksik olan ortak bir resimdi. Duvara çizilen basit bir diyagram, üç toplantının çözemediğini yirmi dakikada çözdü.",
   "theory": [
    [
     "Model, bir amacı olan basitleştirmedir",
     "Diyagram yalnızca tek bir soruyu yanıtlamak için gerekeni gösterir: kim neyi kullanıyor, hangi veriler var, olaylar hangi sırayla gerçekleşiyor. Henüz kod yokken insanları aynı noktada buluşturur."
    ],
    [
     "Birbirini tamamlayan üç bakış açısı",
     "Kullanım senaryoları kimin ne yaptığını gösterir (işlevsel görünüm). Sınıf diyagramı kavramları ve ilişkilerini gösterir (statik görünüm). Sıralama diyagramı zaman içinde alınıp verilen mesajları gösterir (dinamik görünüm)."
    ],
    [
     "İlişkiler ve çokluk",
     "Bir Kitap'ın birden çok Kopyası vardır; bir Kopya tek bir Kitap'a aittir. Çizginin uçlarına 1 ve * yazmak, bir sistemdeki en pahalı yanlış anlaşılmayı önler: veri modelindeki yanlış anlaşılmayı."
    ]
   ]
  },
  "devops": {
   "name": "Sürekli teslimat",
   "about": "Sürekli entegrasyon ve teslimat, tekrarlanabilir ortamlar ve geri alma.",
   "client": "Roda Viva teslimat kooperatifi",
   "title": "\"Benim makinemde çalışıyor\"",
   "story": "Uygulamanın yeni sürümü Bia'nın dizüstü bilgisayarında kusursuz çalıştı. Sunucuda ise çöktü: farklı bir dil sürümü, eksik bir kütüphane, unutulmuş bir ayar. Yayınlama, bir deftere yazılmış 23 adımlık manuel bir ritüeldi; ayda bir kez, gece yarısı, hep korkuyla yapılırdı. Ekip, yayınlamanın sıradan bir olay haline gelmesini istiyor: otomatik, tekrarlanabilir ve geri alınabilir.",
   "theory": [
    [
     "Sürekli entegrasyon (CI)",
     "Her push'ta, bir sunucu projeyi sıfırdan derler ve tüm testleri çalıştırır. Bir şey bozulursa, ekip dakikalar içinde haberdar olur; düzeltme hâlâ ucuzken."
    ],
    [
     "Sürekli teslimat (CD)",
     "Aynı otomatik süreç yazılımı üretime kadar taşır: derleme, testler, paketleme ve yayınlama. Manuel adımlar scriptlere dönüşür ve tekrarlanabilir olan şey korkutucu olmaktan çıkar."
    ],
    [
     "Özdeş ortamlar ve hızlı bir geri dönüş yolu",
     "Bir dosyada bildirilen bağımlılıklar ve standartlaştırılmış ortamlar, \"benim makinemde çalışıyor\" sorununa son verir. Küçük, sık yayınlar ve el altında bir geri alma ile her hatanın hasarı küçülür."
    ]
   ]
  }
 },
 "items": {
  "v1": {
   "title": "Yer değiştiren etiket",
   "prompt": "Dona Lúcia zam yapmadan önce eski fiyatı kopyaladı. Program ne yazdırır?",
   "hint": "Satır satır git: y aldığı anda x'in değeri neydi?",
   "why": "y, x'in o andaki değerinin (5) bir kopyasını alır. Daha sonra x'i değiştirmek y'yi etkilemez.",
   "analogy": "Değişken, bir değerin üzerindeki etikettir. y, 5'in üzerine kendi etiketini aldı; x etiketini 8'e taşımak y'ninkine dokunmaz."
  },
  "v2": {
   "title": "Toplanmayan toplam",
   "prompt": "Bu, yeğenin elektronik tablo hatasıydı. Program ne yazdırır?",
   "hint": "Tırnak işaretlerine bak: bu değerler sayı mı yoksa metin mi?",
   "why": "Tırnak içinde 3 ve 4 metindir. Metinle işlem toplamak yerine birleştirir.",
   "analogy": "Dizeler boncuk kolyelerdir: iki kolyeyi birleştirmek toplam değil, daha uzun bir kolye verir. Toplamak için önce sayıya dönüştürün."
  },
  "v3": {
   "title": "Değer kaybettiren takas",
   "prompt": "Kod a ile b'yi takas etmeli, ancak 2 2 yazdırıyor. a'nın orijinal değeri hangi satırda kayboluyor?",
   "hint": "Hangi satırdan sonra 1 sayısı hiçbir değişkende artık yok?",
   "why": "a, b'yi aldığında 1 kaydedilmeden üzerine yazılır. Doğru bir takas geçici bir değişken kullanır.",
   "analogy": "İki bardağın içeriğini takas etmek için üçüncü bir bardak gerekir. Birini doğrudan diğerine boşaltmak içeceklerden birini kaybettirir."
  },
  "v4": {
   "title": "Parayı bölüştürmek",
   "prompt": "Yedi madeni para iki kasa arasında bölüştürülüyor. Program ne yazdırır?",
   "hint": "Tam sayı bölmesi ondalık kısmı atar; % kalanı döndürür.",
   "why": "7'nin 2'ye tam sayı bölümü 3'tür ve kalan 1'dir.",
   "analogy": "7 şekeri 2 çocuk arasında paylaştırmak: her biri 3 alır ve 1 masada kalır."
  },
  "v5": {
   "title": "Bir fiyat için doğru tür",
   "prompt": "Bir ekmeğin 4.50 fiyatını saklamak için en uygun veri türü hangisidir?",
   "opts": [
    "Ondalık sayı (kayan nokta)",
    "Tam sayı",
    "Metin",
    "Mantıksal"
   ],
   "hint": "Değerin kuruşları var ve hesaplamalarda kullanılacak.",
   "why": "Fiyat ondalık içerir ve aritmetik işlemlere girer, bu yüzden ondalık sayısal bir tür gerektirir. Metin olarak toplanamazdı; tam sayı olarak kuruşları kaybederdi.",
   "analogy": "Doğru kabı seçmek gibidir: su şişeye girer, süzgece değil. Her veri türü bir tür içerik için yapılmıştır."
  },
  "c1": {
   "title": "Tam 39 derece ateş",
   "prompt": "Bir triyaj sınır kuralı. Program ne yazdırır?",
   "hint": ">= büyüktür VEYA eşittir anlamına gelir.",
   "why": "7 >= 7 doğrudur, bu yüzden yalnızca ilk blok çalışır ve else atlanır.",
   "analogy": "if/else yolda bir çataldır: araba yalnızca bir tarafı seçer, asla ikisini birden değil."
  },
  "c2": {
   "title": "Rosa'nın kurallarının sırası",
   "prompt": "Kurallar bu sırayla yazılmıştı. Program ne yazdırır?",
   "hint": "Zincirdeki bir test doğru olduğunda, sonrakiler değerlendirilmez bile.",
   "why": "30 > 20 zaten doğrudur, bu yüzden yalnızca A yazdırılır. Daha katı koşul (t > 28) önce gelmeliydi.",
   "analogy": "Bu bir sıra turnike gibidir: İlkinden geçen, diğerlerini denemez. En zorlu turnike önde durmalıdır."
  },
  "c3": {
   "title": "Çift veya tek bilet numarası",
   "prompt": "Klinik çift numaraları 1. masaya, tek numaraları 2. masaya çağırıyor. Sayıyı sınıflandıran programı kurun.",
   "hint": "Önce veri var olur; sonra 2'ye bölümden kalan üzerinde test gelir.",
   "why": "Veri, testten önce var olmalıdır. 2'ye bölündüğünde kalan sıfırsa çifttir; else diğer her şeyi kapsar.",
   "analogy": "Tıpkı triyaj gibi: önce hasta gelir, sonra soru gelir ve her cevap bir odaya yönlendirir."
  },
  "c4": {
   "title": "Önce kim gelir: AND mi OR mu",
   "prompt": "İfadenin sonucu doğru mu yanlış mı?",
   "opts": [
    "Doğru",
    "Yanlış",
    "Hata",
    "Dile bağlı"
   ],
   "hint": "Çarpmanın toplamadan önce gelmesi gibi, bir mantıksal operatör önce değerlendirilir.",
   "why": "AND, OR'dan önce gelir. Önce false AND false false verir; sonra true OR false true verir. Bu, oyundaki dört dilin hepsinde geçerlidir.",
   "analogy": "Tıpkı 2 + 3 × 0: önce çarpmayı yaparsınız. AND mantığın çarpmasıdır; şüphede kalınca parantez kullanın."
  },
  "c5": {
   "title": "Altmış ve indirim yok",
   "prompt": "Tam 60 yaşındakiler yarı fiyat ödemeli ama tam ödüyor. Hangi satırın düzeltilmesi gerekiyor?",
   "hint": "60 ile kafanızda test edin: koşul doğru mu?",
   "why": "60 > 60 yanlıştır. \"60'tan itibaren\" kuralı >= gerektirir. Sınır hataları koşullarda en yaygın olanlardandır.",
   "analogy": "Bu, \"minimum boy 1,40 m\" tabelasıyla tam 1,40 olanları durduran bir görevli gibidir. Kural doğru; karşılaştırma yanlış."
  },
  "l1": {
   "title": "Saymanın başladığı yer",
   "prompt": "Döngü hangi değerleri yazdırır?",
   "hint": "Sayma 0'dan başlar ve 3'ten önce durur.",
   "why": "0, 1 ve 2 üretir: üç değer, sıfırdan başlayıp 3'ü içermez.",
   "analogy": "Zemin kattan (0) başlayan bir binadaki katlar gibi: üç kat 0'dan 2'ye kadar gider."
  },
  "l2": {
   "title": "Notları toplama",
   "prompt": "Program ne yazdırır?",
   "hint": "Döngü 1'i içerir ve 5'i dışlar.",
   "why": "Döngü 1, 2, 3 ve 4'ten geçer ve toplam 10 olur. Üst sınır dışarıda bırakılır.",
   "analogy": "total bir kumbaradır: her turda i değerinde bir bozuk para atılır. Sonunda içindekini sayarsınız."
  },
  "l3": {
   "title": "Sonsuz geri sayım",
   "prompt": "Kod 3, 2, 1 ve sonra \"end\" yazdırmalı, ama asla durmuyor. Hangi satırın düzeltilmesi gerekiyor?",
   "hint": "Döngünün durması için n > 0 bir noktada false olmalı.",
   "why": "1 eklemek n'yi sıfırdan uzaklaştırır, bu yüzden koşul her zaman doğrudur. Düzeltme 1 çıkarmaktır.",
   "analogy": "Her seferinde bir basamak çıkarak merdivenden inmeye çalışmak gibidir: asla zemine ulaşmazsınız. Her while çıkışa doğru ilerlemelidir."
  },
  "l4": {
   "title": "Sınıftaki en yüksek not",
   "prompt": "Marta listedeki en yüksek notu istiyor. Programı birleştirin.",
   "hint": "İlkini en yüksek varsayarak başlayın; sonra her biriyle karşılaştırın.",
   "why": "Desen şudur: ilk tahmin (ilk eleman), hepsini gez, daha yüksek biri çıkınca şampiyonu değiştir ve yalnızca döngüden sonra yazdır.",
   "analogy": "Bu \"tepenin kralı\" oyunudur: ilk çıkan tepeye çıkar ve her rakip yalnızca daha yüksekse yerini alır. Sonda orada olan maksimumdur."
  },
  "l5": {
   "title": "Kaç kez yarıya bölebilirsin",
   "prompt": "Program ne yazdırır?",
   "hint": "Her turda n'yi izleyin: 16, 8, ...",
   "why": "n 8, 4, 2 ve 1'den geçer: n > 1 false olana kadar dört bölme.",
   "analogy": "Bir kağıdı tekrar tekrar ikiye katlamak: while önceden kaç katlama olacağını bilmez; sadece daha fazla mümkün olmayınca durur."
  },
  "f1": {
   "title": "Döndürülen değeri kullanma",
   "prompt": "Program ne yazdırır?",
   "hint": "return sonucu fonksiyonu çağırana verir.",
   "why": "Fonksiyon 8 döndürür, r'de saklanır. Sonra 8 + 1 = 9.",
   "analogy": "Fonksiyon bir meyve sıkacağıdır: meyve girer (argüman) ve bir bardak çıkar (dönüş değeri), onu istediğiniz gibi kullanırsınız."
  },
  "f2": {
   "title": "Yazdırmak geri döndürmek değildir",
   "prompt": "Bir fonksiyon kargo ücretini hesaplayıp sadece ekrana yazdırıyor, değeri geri döndürmüyor. Bunun sonucu nedir?",
   "opts": [
    "Çağıran kod bu değeri başka hesaplamalarda kullanamaz",
    "Hiçbir şey: yazdırmak ve geri döndürmek eşdeğerdir",
    "Fonksiyon daha hızlı çalışır",
    "Değer otomatik olarak global olur"
   ],
   "hint": "Yazdırılan değer nereye gider? Peki geri döndürülen?",
   "why": "Yazdırma, değeri ekrana gönderir, hepsi bu. Geri döndürme ise değeri çağıran koda verir; bu kod onu toplayabilir, saklayabilir veya başka yere aktarabilir.",
   "analogy": "Yazdırmak, yemeği vitrinde göstermektir; geri döndürmek ise müşteriye teslim etmektir. Sadece vitrini gören kişi eli boş ayrılır."
  },
  "f3": {
   "title": "İçerideki x ve dışarıdaki x",
   "prompt": "Program ne yazdırır?",
   "hint": "Fonksiyon içinde oluşturulan değişken, dışarıdakiyle aynı mı?",
   "why": "x = 99, yalnızca çağrı sırasında var olan yerel bir değişkendir. Dışarıdaki x hala 10'dur.",
   "analogy": "Fonksiyon, kendi beyaz tahtası olan bir odadır. İçeriye yazılanlar çıkarken silinir ve koridordaki tahtayı değiştirmez."
  },
  "f4": {
   "title": "Ortalama için bir fonksiyon",
   "prompt": "Bir listenin ortalamasını hesaplayan fonksiyonu ve sonucu yazdıran çağrıyı oluşturun.",
   "hint": "Fonksiyon içinde: toplamı sıfırla, döngüde biriktir ve ancak ondan sonra bölmeyi döndür.",
   "why": "return, döngüden sonra gelir; aksi halde fonksiyon ilk turda çıkardı. Çağrı, tanımdan sonra gelir.",
   "analogy": "Bir pasta tarifi: önce tarifin adı, sonra sırayla adımlar ve en sonunda servis edersin. Karıştırmanın ortasında servis edemezsin."
  },
  "f5": {
   "title": "Argüman bir kopyadır",
   "prompt": "Program ne yazdırır?",
   "hint": "Fonksiyon, x değişkeninin kendisini mi yoksa değerinin bir kopyasını mı alır?",
   "why": "Sayılar değer ile aktarılır: n, x'in bir kopyasıdır. Fonksiyon içinde n'yi değiştirmek x'i değiştirmez; x hala 5'tir.",
   "analogy": "Belgenin fotokopisini veriyorsun. Kopyanın üzerine istedikleri gibi karalayabilirler: çekmecedeki orijinal bozulmadan kalır."
  },
  "k1": {
   "title": "İndeksler sıfırdan başlar",
   "prompt": "Program ne yazdırır?",
   "hint": "İlk eleman 0 indeksindedir.",
   "why": "İndeksler 0 (10), 1 (20) ve 2 (30).",
   "analogy": "İndeks, kuyruğun önüne olan mesafedir: ilk kişi 0 adım ötede, ikinci kişi 1 adım ötededir."
  },
  "k2": {
   "title": "İki değişken, tek bir liste",
   "prompt": "Program ne yazdırır?",
   "hint": "İkinci değişken yeni bir koleksiyon mu yoksa aynısının başka bir adı mı?",
   "why": "Atama, koleksiyonu kopyalamaz: her iki ad da aynı veriye işaret eder. b üzerinden yapılan bir değişiklik a'da görünür.",
   "analogy": "a ve b aynı çekmecenin iki anahtarıdır. Biri b anahtarını kullanarak bir şey koyarsa, a anahtarının bulacağı şeyi değiştirir."
  },
  "k3": {
   "title": "Liste mi sözlük mü",
   "prompt": "Bay Antônio, başlığını yazarak bir kitaptan kaç kopya olduğunu sorgulamak istiyor. Hangi yapı en uygun?",
   "opts": [
    "Başlıktan miktara bir sözlük (map)",
    "Geliş sırasına göre miktarların bir listesi",
    "Her kitap için ayrı bir değişken",
    "Her şeyi virgülle ayıran tek bir metin"
   ],
   "hint": "Sorgulama konuma göre mi yoksa isme göre mi yapılacak?",
   "why": "Sözlük, anahtarı değere bağlar ve doğrudan anahtarla arama yapar. Listede konumu bilmeniz veya her şeyi taramanız gerekirdi.",
   "analogy": "Sözlük bir telefon rehberidir: isimle arama yapar ve tüm listeyi okumadan telefon numarasını bulursunuz."
  },
  "k4": {
   "title": "Sonun bir adım ötesi",
   "prompt": "Döngü, var olmayan bir konuma erişmeye çalışıyor. Soruna hangi satır neden oluyor?",
   "hint": "3 elemanla, en büyük geçerli indeks nedir?",
   "why": "Döngü 0, 1, 2 ve 3 indekslerini üretir, ancak 3 mevcut değildir. Doğru sınır, koleksiyonun boyutudur, bu dahil değildir.",
   "analogy": "Bu bir çit direği hatasıdır: 3 tahtalı bir çitte 4'e kadar sayan kişi, orada olmayan bir tahtayı çakmaya çalışır."
  },
  "k5": {
   "title": "Dört kopyadan fazla olan kaç kitap var",
   "prompt": "Program ne yazdırır?",
   "hint": "c eleman sayar; değerleri toplamaz.",
   "why": "Sadece 5 ve 8, 4'ten büyüktür; bu yüzden sayaç 2'de kalır.",
   "analogy": "El sayacı olan bir kapı görevlisi gibidir: kurala uyan her kişi için bir tık, boyları ne olursa olsun."
  },
  "r1": {
   "title": "Özyinelemenin freni",
   "prompt": "Her özyinelemeli fonksiyonun kendini sonsuza kadar çağırmaması için ne olması gerekir?",
   "opts": [
    "Yeni bir çağrı yapmadan cevap veren temel durum",
    "İç içe bir while döngüsü",
    "Global bir kontrol değişkeni",
    "En az iki parametre"
   ],
   "hint": "Çağrıların durmasını sağlayan şeyi düşün.",
   "why": "Temel durum, doğrudan çözülen basit durumdur. Her özyinelemeli çağrı ona doğru ilerlemelidir.",
   "analogy": "Matruşka bebekleri: birini açarsın, daha küçüğünü bulursun ve dolu bebekte durursun. O olmadan sonsuza kadar bebek açarsın."
  },
  "r2": {
   "title": "Faktöriyel adım adım",
   "prompt": "Program ne yazdırır?",
   "hint": "Aç: fact(4) = 4 × fact(3) = ...",
   "why": "4 × 3 × 2 × 1 = 24. Her çağrı, daha küçük çağrının cevabını bekler ve sonra çarpar.",
   "analogy": "Kuyruktaki insanların önlerindekine \"senin numaran ne?\" diye sorması. İlk kişi 1 der ve cevap, kuyruk boyunca çarpılarak geri döner."
  },
  "r3": {
   "title": "İlerlemeyen özyineleme",
   "prompt": "Fonksiyon n, n-1, ..., 1 yazdırmalı, ancak çağrı yığınını taşırıyor. Hangi satır hatalı?",
   "hint": "Özyinelemeli çağrı temel duruma doğru ilerliyor mu?",
   "why": "count(n) çağırmak aynı problemi sonsuza kadar tekrarlar. Doğrusu count(n - 1) çağırmaktır, böylece sıfıra doğru iner.",
   "analogy": "Birine merdivenlerden inmesini söylerken onun hep aynı basamakta kalması gibidir. Temel durum vardır; ancak hiç ulaşılmaz."
  },
  "r4": {
   "title": "Dönüş yolunda yazdırma",
   "prompt": "Program ne yazdırır?",
   "hint": "Yazdırma özyinelemeli çağrıdan sonra geliyor. Sonunda ne zaman çalışır?",
   "why": "Her çağrı önce temel duruma iner; yazdırma yalnızca geri dönüşte, en içteki (1) en dıştakine (3) kadar olur.",
   "analogy": "Bir tabak yığını: 3, 2, 1 diye üst üste koyarsın ve ancak yığını boşaltırken yıkarsın. Son giren ilk yıkanır."
  },
  "r5": {
   "title": "Aynı anda iki çağrı",
   "prompt": "Program ne yazdırır?",
   "hint": "Aşağıdan yukarı çalış: f(0), f(1), f(2)...",
   "why": "Bu Fibonacci dizisidir: 0, 1, 1, 2, 3, 5. Yani f(5) = 5.",
   "analogy": "Tersine bir aile ağacı: her cevap, kendinden önceki iki cevaba bağlıdır, ta ki bilinen atalara (temel durumlar) ulaşana kadar."
  },
  "q1": {
   "title": "İşlevsel mi değil mi",
   "prompt": "Bunlardan hangisi klinik sistemi için işlevsel OLMAYAN bir gereksinimdir?",
   "opts": [
    "Sistem 2 saniye içinde yanıt vermeli",
    "Hasta randevusunu yeniden planlayabilir",
    "Sistem kısa mesaj hatırlatıcısı gönderir",
    "Resepsiyonist hastaları kaydeder"
   ],
   "hint": "İşlevsel olmayan kaliteyi (ne kadar iyi), davranışı değil (ne yaptığını) tanımlar.",
   "why": "Yanıt süresi bir kalite özelliğidir. Diğer üçü sistemin gerçekleştirdiği işlevleri tanımlar.",
   "analogy": "Bir arabada işlevsel olan sürmek, fren yapmak ve farları yakmaktır. İşlevsel olmayan ise yakıt ekonomisi, konfor ve güvenliktir."
  },
  "q2": {
   "title": "Test edilebilir bir gereksinim",
   "prompt": "Hangi gereksinim doğrulanabilir şekilde yazılmıştır?",
   "opts": [
    "Arama, sorguların %95'inde 1 saniyeden kısa sürede sonuç döndürür",
    "Sistem hızlı olmalı",
    "Arayüz kullanıcı dostu olmalı",
    "Sistem modern ve sağlam olmalı"
   ],
   "hint": "Kendine sor: Bunun karşılandığını nasıl kanıtlarım?",
   "why": "Yalnızca ilk seçenek ölçülebilir bir kritere sahiptir. \"Hızlı\", \"dostu\" ve \"modern\" teslimat zamanında tartışmaya dönüşür.",
   "analogy": "Duvarcıya \"uzun bir duvar\" demekle \"2,80 m'lik bir duvar\" demek arasındaki fark gibidir. Sadece ikincisi mezura ile kontrol edilebilir."
  },
  "g1": {
   "title": "Commit nedir",
   "prompt": "Bir Git commit'i:",
   "opts": [
    "Projenin o andaki durumunun, bir mesajla birlikte kaydıdır",
    "Dosyaları sunucuya yüklemektir",
    "Başka bir klasöre yedek kopyadır",
    "Eski sürümleri silmektir"
   ],
   "hint": "Sunucuya göndermek farklı bir komuttur (push).",
   "why": "Commit, değişikliklerin yerel bir anlık görüntüsünü kaydeder; yazar, tarih ve mesajla birlikte. Remote'a gönderme daha sonra push ile yapılır.",
   "analogy": "Oyunlardaki kayıt noktası gibidir: boss sizi yense bile tam o ana geri dönebilirsiniz."
  },
  "g2": {
   "title": "Bir düzeltmeyi yayınlamak",
   "prompt": "Bir dal oluşturmak, değişikliği kaydetmek ve uzak depoya göndermek için komutları sıralayın.",
   "hint": "Önce çalışma alanı, sonra stage (add), kayıt (commit) ve gönderme (push).",
   "why": "Değişiklik yapmadan önce dalı oluşturursunuz; add neyin dahil edileceğini seçer; commit kaydeder; push yayınlar.",
   "analogy": "Paket göndermek gibidir: kutuyu al (branch), eşyaları içine koy (add), kapat ve etiketle (commit), ve ancak o zaman postaneye götür (push)."
  },
  "g3": {
   "title": "Branch ne işe yarar",
   "prompt": "Bia neden yeni indirim ekranı için bir branch oluşturmalı?",
   "opts": [
    "Ana hattı etkilemeden izole çalışmak için",
    "Depoyu hızlandırmak için",
    "Çünkü Git ana dala commit atmayı yasaklar",
    "Eski geçmişi silmek için"
   ],
   "hint": "Bitmemiş kod doğrudan ana dala giderse ne olacağını düşünün.",
   "why": "Branch, devam eden işi izole eder. Ana dal, değişiklik incelenip entegre edilene kadar kararlı kalır.",
   "analogy": "Bir belgenin taslağı gibidir: özgürce denersiniz ve yalnızca metin iyi olduğunda orijinaline kopyalarsınız."
  },
  "g4": {
   "title": "Merge neden çakıştı",
   "prompt": "Merge conflict ne zaman olur?",
   "opts": [
    "İki branch aynı satırları farklı şekilde değiştirdiğinde",
    "Aynı depoda iki kişi çalıştığında her zaman",
    "Branch ondan fazla commit içerdiğinde",
    "Branch'lerden birinde yeni bir dosya oluşturulduğunda"
   ],
   "hint": "Git farklı yerlerdeki değişiklikleri kendisi birleştirir. Karar veremeyeceği şey nedir?",
   "why": "Her iki sürüm de aynı yere dokunduysa Git hangisini seçeceğini bilemez ve insan kararı ister.",
   "analogy": "İki kişi bir sözleşmenin aynı cümlesini yeniden yazdı. Noter tek başına seçmez: son ifadeyi belirlemek için her ikisi de çağrılır."
  },
  "g5": {
   "title": "İyi bir commit mesajı",
   "prompt": "Bir yıl sonra geçmişi okuyan biri için en yararlı commit mesajı hangisidir?",
   "opts": [
    "Tam olarak R$ 50 tutarındaki alışverişlerde indirim hesaplamasını düzelt",
    "ince ayarlar",
    "bu sefer gerçekten son sürüm",
    "Caio tarafından Cuma günü yapılan değişiklikler"
   ],
   "hint": "Mesaj, kodu açmaya gerek kalmadan neyin değiştiğini ve nedenini söylemelidir.",
   "why": "İyi bir mesaj değişikliği ve nedenini açıklar. \"ince ayarlar\" bir davranışın ne zaman değiştiğini bulmaya yardımcı olmaz.",
   "analogy": "Taşınma kutularındaki etiket gibidir: \"mutfak, kırılacak bardaklar\" sizi \"eşya\" yazan yirmi kutuyu açmaktan kurtarır."
  },
  "t1": {
   "title": "Birim testi nedir",
   "prompt": "Birim testi şunları kontrol eder:",
   "opts": [
    "Fonksiyon gibi küçük, izole bir kod birimini",
    "Kullanıcı arayüzü üzerinden tüm sistemi",
    "Sunucunun yoğun trafiği kaldırıp kaldıramayacağını",
    "Müşterinin teslimattan memnun olup olmadığını"
   ],
   "hint": "İsmi ipucu veriyor: \"birim\" nedir?",
   "why": "Birim testleri küçük, hızlı ve izoledir. Tüm sistem uçtan uca testtir; yoğun trafik yük testidir.",
   "analogy": "Işık dizisini monte etmeden önce her ampulü test etmek gibidir. Daha sonra set arızalanırsa, ampullerin sorun olmadığını zaten bilirsiniz."
  },
  "t2": {
   "title": "Test değerlerini seçmek",
   "prompt": "Kural \"18'den itibaren\" geçerlidir. Fonksiyonu en iyi hangi girdi kümesi test eder?",
   "hint": "Karşılaştırma hataları (> yerine >=) nerede saklanma eğilimindedir?",
   "why": "Hatalar sınırlarda kümelenir. Sınırın hemen altını, tam sınırı ve hemen üstünü test etmek >= yerine > takasını ortaya çıkarır.",
   "analogy": "Bir kapının iyi kapanıp kapanmadığını kontrol etmek için çerçeveye bakarsınız, duvarın ortasına değil."
  },
  "t3": {
   "title": "Arrange, act, assert",
   "prompt": "Fırın indirim testini arrange, act, assert'e göre kurun.",
   "hint": "Önce veri, sonra test edilen fonksiyonun çağrısı ve en son kontrol.",
   "why": "Test senaryoyu kurar, eylemi gerçekleştirir ve sonucu beklenenle karşılaştırır.",
   "analogy": "Bir tarifi denemek gibidir: malzemeleri yerleştirin, pişirin ve ancak o zaman doğru olup olmadığını görmek için tadın."
  },
  "q3": {
   "title": "İyi biçimlendirilmiş bir kullanıcı hikayesi",
   "prompt": "Hangi seçenek kullanıcı hikayesi formatına uyar?",
   "opts": [
    "Bir hasta olarak, randevumu kaçırmamak için bir gün önce hatırlatma istiyorum",
    "Hasta tablosunu hasta için yabancı anahtarla oluştur",
    "Sistem ön uçta React kullanmalı",
    "Randevu ekranı, sürüm 2"
   ],
   "hint": "Format şudur: Bir [rol] olarak, [eylem] istiyorum, böylece [fayda].",
   "why": "Hikaye, teknik çözümü dikte etmeden kimin ihtiyaç duyduğunu, neye ihtiyaç duyduğunu ve nedenini söyler.",
   "analogy": "Bir restoranda sipariş gibidir: müşteri, şefin hangi marka tavayı kullanması gerektiğini değil, doyurulacak yemeği ve açlığı belirtir."
  },
  "q4": {
   "title": "\"Tıpkı bankanınki gibi\"",
   "prompt": "Yönetici \"tıpkı bankanınki gibi bir uygulama\" istiyor. İlk adım ne olmalı?",
   "opts": [
    "Hangi günlük sorunu çözmek istediğini sormak",
    "Hemen uygulamayı geliştirmeye başlamak",
    "Reddetmek, çünkü uygulamalar pahalıdır",
    "Teslim tarihini tahmin edip sonra konuşmak"
   ],
   "hint": "Bir çözüm tanımladı. Arkasındaki ihtiyaç ne?",
   "why": "İstekler genellikle çözüm olarak gelir. Gerçek ihtiyacı (kaçırılan randevular) anlamak daha basit ve daha kullanışlı bir şeyi ortaya çıkarabilir.",
   "analogy": "Hasta antibiyotik isteyerek gelir; iyi bir doktor önce ne hissettiğini sorar."
  },
  "q5": {
   "title": "Kodlamadan önce doğrula",
   "prompt": "Hangi teknik, kodlama yapılmadan önce klinik ön bürosuyla gereksinimleri doğrular?",
   "opts": [
    "Ekranların kağıt prototipini gösterip onları kullanırken izlemek",
    "Bitmiş sistemi teslim edip şikayetleri toplamak",
    "Gereksinim belgesini e-postayla gönderip beklemek",
    "Sadece müdüre her şeyin yolunda olup olmadığını sormak"
   ],
   "hint": "Gerçek kullanıcıyı fikrin önüne koyan en ucuz seçeneği arayın.",
   "why": "Düşük kaliteli prototipler dakikalar alır ve yanlış anlaşılmaları erken ortaya çıkarır, düzeltmek hala ucuzken.",
   "analogy": "Bir terzi, dikişten önce iğnelerle prova yapar. Bir iğneyi oynatmak saniyeler alır; bir dikişi sökmek takım elbiseye mal olur."
  },
  "a1": {
   "title": "Sprint nedir",
   "prompt": "Scrum'da sprint:",
   "opts": [
    "Kullanılabilir bir artış sağlayan kısa, sabit uzunluklu döngü",
    "Lansmandan önceki son test aşaması",
    "15 dakikalık günlük toplantı",
    "Tüm proje gereksinimlerini içeren belge"
   ],
   "hint": "Ritmi düşünün: sonunda teslimat olan tekrarlanan döngüler.",
   "why": "Sprintler sabit bir uzunluğa sahiptir (genellikle 1 ila 4 hafta) ve çalışan ve değerlendirilebilen bir şeyle sona erer.",
   "analogy": "Tıpkı bu oyun gibi: her 5 bilette bir durup teslim ettiğinize bakar ve rotayı ayarlarsınız, her şeyi sadece sonunda yargılamak yerine."
  },
  "a2": {
   "title": "Daily ne içindir",
   "prompt": "Günlük toplantının amacı nedir?",
   "opts": [
    "Ekibi senkronize etmek ve engelleri ortaya çıkarmak",
    "Yönetime bireysel rapor vermek",
    "Her görevin teknik çözümünü detaylandırmak",
    "Tüm ürün iş listesini yeniden planlamak"
   ],
   "hint": "Yaklaşık 15 dakika sürer. Bu süreye ne sığar?",
   "why": "Daily, ekibi sprint hedefine doğru hizalar ve engelleri erken ortaya çıkarır. Uzun tartışmalar daha sonra, sadece ilgililerle devam eder.",
   "analogy": "Takımın devre arasında hızlı toplanmasıdır: kim kimi marke ediyor ve sorun nerede. Tüm takım konuşması başka bir an içindir."
  },
  "a3": {
   "title": "Kayıt MVP'si",
   "prompt": "Okul için iyi bir MVP ne olurdu?",
   "opts": [
    "Uçtan uca çalışan çevrimiçi kayıt, karne ve yemek olmadan",
    "Tüm ekranlar tasarlandı ancak hiçbiri çalışmıyor",
    "Altı ayda teslim edilen eksiksiz sistem",
    "Sadece veritabanı, hiç ekran yok"
   ],
   "hint": "MVP, gerçek kullanıcılar için temel sorunu zaten çözen en küçük sürümdür.",
   "why": "MVP, küçük ölçekte uçtan uca değer sağlar ve geri kalanına yatırım yapmadan önce gerçek kullanımdan öğrenmenizi sağlar.",
   "analogy": "A'dan B'ye gitmek isteyen biri önce bir tekerlek sonra bir şasi almaz. Önce kaykay, sonra bisiklet, sonra araba alır: her aşama onları zaten hareket ettirir."
  },
  "a4": {
   "title": "Sprint'e sığmayacak",
   "prompt": "Sprint bitimine iki gün kala ekip her şeyi teslim edemeyeceğini fark eder. En iyi hamle nedir?",
   "opts": [
    "Kaliteyi koruyarak kapsamı Ürün Sahibi ile yeniden müzakere etmek",
    "Her şeyi teslim etmek için testleri atlamak",
    "Kimseye söylemeden sprint'i uzatmak",
    "Sığana kadar sessizce fazla mesai yapmak"
   ],
   "hint": "Çevikte son tarih ve kalite sabittir. Esnek olan nedir?",
   "why": "Kapsam ayar değişkenidir. Kaliteyi düşürmek teknik borç yaratır ve sorunu gizlemek şeffaflığı bozar.",
   "analogy": "Dolu bir restoran: her masaya çiğ tavuk servis etmektense bu akşam menüden bir yemeği çıkarmak daha iyidir."
  },
  "a5": {
   "title": "Her şey başladı, hiçbir şey bitmedi",
   "prompt": "Ekip panosunda 3 kişi için 12 görev \"devam ediyor\" durumda ve hiçbir şey bitmiyor. Hangi Kanban uygulaması bunu ele alır?",
   "opts": [
    "Devam eden işi sınırlamak (WIP)",
    "Panoya daha fazla sütun eklemek",
    "Daha uzun toplantılar yapmak",
    "Sprint'i daha uzun yapmak"
   ],
   "hint": "Darboğaz başlamak değil; bitirmektir.",
   "why": "WIP'i sınırlamak, bitirmeden başlamayı zorlar, bağlam değiştirmeyi azaltır ve darboğazları görünür kılar.",
   "analogy": "Dört gözlü ocakta 12 tencere: hiçbir şey düzgün pişmez. Dört yemeği bitirip sonra sonrakileri koymak daha iyidir."
  },
  "xa2": {
   "title": "Sonucu sıfır çıkan sayım",
   "prompt": "Program 2 indirimli satışı saymalı ama 0 yazdırıyor. Hangi satır yanlış yerde?",
   "why": "Sayacı döngünün içinde sıfırlamak her turda sayımı siler. Başlangıç değeri döngüden önce verilmelidir ve zaten orada mevcuttur.",
   "analogy": "Kapıdaki görevli, içeri giren her kişi için elindeki sayacı sıfırlayan kişidir: günün sonunda ekran yalnızca son kişiyi bilir."
  },
  "xa3": {
   "title": "Onluk banknotlarla para üstü",
   "prompt": "Ödemeyi doğrulayan ve para üstünün kaç tane 10'luk banknot ve kaç tane 1'lik madeni paradan oluştuğunu yazdıran programı kurun.",
   "why": "Fiyat, ödenen tutardan önce var olmalıdır; ödenen tutar fiyata bağlıdır. Doğrulama hesaplamadan önce gelir ve para üstü yalnızca ödemenin yeterli olduğu dalda hesaplanır.",
   "analogy": "Kasiyer önce paranın hesabı karşıladığını kontrol eder; ancak ondan sonra para üstünü hazırlamak için kasa açılır."
  },
  "xb1": {
   "title": "Bir konumdan başlayan toplam",
   "prompt": "Program ne yazdırır?",
   "why": "Çağrı 1. dizinden başlar, bu yüzden 7 + 9 = 16 toplar. 0. dizindeki değer dışarıda kalır. Temel durum, i listenin boyutuna ulaştığında gerçekleşir.",
   "analogy": "Kuyruğa ikinci sıradan katılmak ve herkesten numarasını arkadakilerinkine eklemesini istemek gibidir."
  },
  "xb2": {
   "title": "Bir dosya fazla",
   "prompt": "Fonksiyon 3 dosyayı saymalı ama 4 cevabını veriyor. Hangi satır hatalı?",
   "why": "> kullanıldığında özyineleme ancak sonu geçtikten sonra durur ve var olmayan bir konumu sayar. Doğru temel durum, boyutla eşitlik karşılaştırması yapar.",
   "analogy": "Bir merdivenin basamaklarını sayıp üst kattaki zemini de dahil etmektir: fren bir basamak geç uygulanmıştır."
  },
  "xb3": {
   "title": "Kaç tane büyük dosya",
   "prompt": "Limiti aşan kaç değer olduğunu sayan fonksiyonu ve sonucu yazdıran çağrıyı kurun.",
   "why": "Sayaç döngüden önce oluşturulur, döngü içinde güncellenir ve yalnızca döngü bittikten sonra döndürülür. Çağrı tanımdan sonra gelir.",
   "analogy": "Yol kenarındaki kantar istasyonu gibidir: sayaç vardiyanın başında sıfırlanır, aşırı yüklü her kamyon sayılır ve rapor yalnızca sonunda çıkar."
  },
  "xc1": {
   "title": "Saat 17:00 talebi",
   "prompt": "Kooperatif yemek kuponlarını bugün canlıya almak istiyor. Kod yalnızca bir meslektaşın makinesinde var ve test yok. En iyi eylem planı nedir?",
   "opts": [
    "Kodu bir dala gönder, kritik yolu test et, gözden geçir ve geri alma planıyla yayınla; bugüne yetişmezse son teslim tarihini müzakere et",
    "Dosyaları doğrudan sunucuya kopyala, çünkü son tarih belirleyicidir",
    "Tüm ödeme modülü yeniden yazılana kadar hiçbir yayını reddet",
    "Şimdi yayınla ve testleri pazartesi günü yaz"
   ],
   "why": "Sıkı bir son tarih süreci askıya almaz: sürümleme, kritik yolu test etme, gözden geçirme ve geri dönüş yolu riski azaltır. Yetişmezse kapsamı veya son tarihi müzakere edersin, asla kaliteyi sessizce feda etmezsin.",
   "analogy": "Acil cerrahide yine kontrol listesi ve steril teknik vardır: aciliyet tempoyu değiştirir, trajediyi önleyen adımları değil."
  },
  "xc2": {
   "title": "Pix çöktü",
   "prompt": "Yayından on dakika sonra Pix ödemeleri hata vermeye başlıyor. İlk eylem nedir?",
   "opts": [
    "Önceki sürüme geri dön ve sistem kararlıyken nedeni araştır",
    "Hata bulunana kadar doğrudan canlıda hata ayıkla",
    "Daha fazla rapor gelmesini bekle",
    "Sunucuyu kapat ve pazartesi günü ilgilen"
   ],
   "why": "Önce hizmeti geri yüklersin; sonra araştırırsın. Git geçmişi geri dönüşü hızlı ve güvenli kılar.",
   "analogy": "Patlamış bir boruda önce suyu kapatırsın. Neden patladığını bulmak daha sonra, zemin kuruyken gelir."
  },
  "xc3": {
   "title": "Pazartesi toplantısı",
   "prompt": "Retrospektifte, değişikliğin kimsenin test etmediği bir durumu bozduğu ortaya çıkıyor. En iyi takip hangisidir?",
   "opts": [
    "Suçlamasız inceleme: regresyon testini ekle ve kod incelemesinin testleri zorunlu kılması için süreci ayarla",
    "Sorumluyu belirle ve yazılı uyarı ver",
    "Cuma yayınlarını yasakla ve konuyu kapat",
    "Tüm proje son tarihlerini %50 uzat"
   ],
   "why": "Başarısızlıklar çalışma sistemine aittir, tek bir kişiye değil. Regresyon testi hatanın geri dönmesini engeller ve süreç değişikliği durumun tekrarlanmasını engeller.",
   "analogy": "Havacılıkta her olay bir soruşturmaya ve daha iyi bir prosedüre dönüşür, cadı avına değil. Bu yüzden uçmak bu kadar güvenli hale geldi."
  },
  "t4": {
   "title": "Her şey yeşil, sıfır hata mı?",
   "prompt": "200 testin tamamı geçti ve kapsama %100. Yazılımın hatasız olduğunu iddia edebilir misiniz?",
   "opts": [
    "Hayır: testler hataların varlığını ortaya çıkarır, yokluğunu kanıtlamaz",
    "Evet: %100 kapsama bunu garanti eder",
    "Evet, testler birim testi olduğu sürece",
    "Hayır, çünkü 200 test çok az; 1000 test yeterli olurdu"
   ],
   "hint": "Kapsama, çalıştırılan satırları ölçer, doğrulanan durumları değil.",
   "why": "Kapsama satırların çalıştığını söyler, her girdi kombinasyonunun ve gereksinimin kontrol edildiğini değil. Dijkstra'nın klasik sözüdür.",
   "analogy": "Sessiz bir duman alarmı şu anda duman olmadığı anlamına gelir, tüm evin kablolamasının sağlam olduğu anlamına değil."
  },
  "t5": {
   "title": "İndirim hatası geri dönmemeli",
   "prompt": "R$ 50 hatasının nedenini buldunuz. En iyi sıralama nedir?",
   "opts": [
    "Hatası yeniden üreten bir test yaz, düzelt ve testi sakla",
    "Doğrudan üretimde düzelt ve Dona Lúcia'ya söyle",
    "Düzelt ve bir kez elle test et",
    "Sonra hatırlamak için hatayı bir belgeye yaz"
   ],
   "hint": "Altı ay sonra kimsenin aynı hatayı yeniden eklemeyeceğinden nasıl emin olursunuz?",
   "why": "Bir regresyon testi düzeltmeden önce başarısız olur, sonra geçer ve sonsuza dek nöbet tutar.",
   "analogy": "Bir aşı gibidir: sistem istilacıyla bir kez karşılaşır ve geri gelmeye çalıştığı her seferde onu tanır."
  },
  "d1": {
   "title": "Her şeyi yapan sınıf",
   "prompt": "Report sınıfı toplamları hesaplıyor, PDF'i oluşturuyor ve e-postayı gönderiyor. Hangi prensibi ihlal ediyor?",
   "opts": [
    "Tek sorumluluk (SRP)",
    "Liskov yerine geçme (LSP)",
    "Bağımlılık tersine çevirme (DIP)",
    "Hiçbiri: her şeyi bir arada tutmak bakımı kolaylaştırır"
   ],
   "hint": "Bu sınıfı değiştirmek için kaç farklı neden var?",
   "why": "Hesaplama kuralı, PDF düzeni veya posta sunucusu değişirse sınıf değişir. Üç neden üç sorumluluğa işaret eder.",
   "analogy": "İsviçre çakısı kamp yaparken kullanışlıdır, ancak profesyonel bir mutfakta her bıçağın bir işi vardır ve birini bilemek diğerlerini bozmaz."
  },
  "d2": {
   "title": "300 satırlık bir fonksiyon",
   "prompt": "Ücretlendirme fonksiyonu aynı doğrulama bloğunu üç yerde tekrarlıyor. En iyi yeniden düzenleme nedir?",
   "opts": [
    "Tekrarlanan bloğu açıkça adlandırılmış bir fonksiyona çıkar",
    "Her tekrarlamayı açıklayan yorumlar ekle",
    "Dosyayı ikiye böl, fonksiyonu koru",
    "Olduğu gibi bırak, çünkü çalışıyor"
   ],
   "hint": "DRY prensibini düşünün: kendini tekrarlama.",
   "why": "Bir fonksiyon çıkarmak tekrarı ortadan kaldırır: düzeltme yalnızca bir yerde yapılır ve ad niyeti belgeler.",
   "analogy": "Her mektuba adresi yeniden yazmak yerine bir kaşe yaparsınız. Adres değişti mi? Tüm mektupları değil, kaşeyi değiştirin."
  },
  "d3": {
   "title": "Uyum ve bağlaşım",
   "prompt": "İyi bir modül tasarımında hedefiniz:",
   "opts": [
    "Yüksek uyum ve düşük bağlaşım",
    "Düşük uyum ve yüksek bağlaşım",
    "Yüksek uyum ve yüksek bağlaşım",
    "Testler geçtiği sürece fark etmez"
   ],
   "hint": "Uyum modülün iç odağıdır; bağlaşım başkalarına ne kadar bağımlı olduğudur.",
   "why": "Birbirine az bağımlı odaklanmış modüller tek başına anlaşılabilir, test edilebilir ve değiştirilebilir.",
   "analogy": "LEGO tuğlaları: her birinin iyi tanımlanmış bir şekli (uyum) ve basit, standart bir bağlantı noktası vardır (düşük bağlaşım)."
  },
  "d4": {
   "title": "Ödemelerde bir \"if\" daha",
   "prompt": "Her yeni ödeme yöntemi bu fonksiyonu düzenlemek anlamına geliyor. Hangi tasarım değişikliği bunu en iyi çözer?",
   "opts": [
    "Bir Payment arayüzü ve her yöntem için bir uygulama oluştur",
    "Yeni \"if\"i ve bir yorum ekle",
    "Her ödeme yöntemi için fonksiyonun tamamını kopyala",
    "Koşullar zincirini bir while döngüsüyle değiştir"
   ],
   "hint": "Açık/kapalı prensibi: genişletmeye açık, değişikliğe kapalı.",
   "why": "Çok biçimlilikle (Strateji deseni), yeni bir ödeme yöntemi yeni bir modül olur, zaten çalışan ve test edilmiş koda dokunmadan.",
   "analogy": "Standart priz gibidir: her yeni cihaz duvarı kırıp kablolamayı yeniden yapmadan takılır."
  },
  "d5": {
   "title": "Sınıfa kaynaklanmış veritabanı",
   "prompt": "Order sınıfı belirli bir MySQL veritabanına kendi bağlantısını oluşturuyor. Bu neyi zorlaştırır ve nasıl düzeltirsiniz?",
   "opts": [
    "Test etmeyi ve veritabanını değiştirmeyi; bağımlılığı hazır olarak, bir arayüz aracılığıyla al",
    "Hiçbir şey; bağlantıyı içeride oluşturmak en derli toplu yoldur",
    "Hızı; daha güçlü bir sunucuyla düzelt",
    "Okunabilirliği; daha fazla yorumla düzelt"
   ],
   "hint": "Order'ı çalışan bir MySQL olmadan nasıl test edersiniz?",
   "why": "Somut bağımlılığı içeride oluşturmak sınıfı ona bağlar. Bağımlılık enjeksiyonuyla sınıf bir arayüzü karşılayan bir şey alır ve testlerde bir vekil alır.",
   "analogy": "Ampulü kaynaklanmış bir lamba: yandığında her şeyi atarsınız. Standart bir duy ile yalnızca ampulü değiştirirsiniz, hatta bir test ampulüyle bile."
  },
  "xa1": {
   "title": "İndirimli toplam",
   "prompt": "50 veya daha fazla satışa %10 indirim uygulanıyor (tam sayı kısmı). Program ne yazdırır?",
   "why": "12, 12 kalır; 55, 50 olur; 50, 45 olur; 8, 8 kalır. Toplam 115'tir. İndirim >= nedeniyle tam olarak 50'ye de uygulanır.",
   "analogy": "Fişi satır satır kontrol etmek gibidir: yalnızca toplama bakan, indirimin hangi satırda geldiğini göremez."
  },
  "o2": {
   "title": "Üretime giden yol",
   "prompt": "Sürekli teslimat hattının aşamalarını sıraya koyun.",
   "lines": [
    "Geliştirici kodu push eder",
    "CI sunucusu kodu çeker ve bağımlılıkları kurar",
    "Otomatik testler çalışır",
    "Sürüm paketi oluşturulur",
    "Sürüm üretime alınır"
   ],
   "hint": "Testleri geçmeden hiçbir şey paketlenmez ve paketlenmeden hiçbir şey yayınlanmaz.",
   "why": "Her aşama bir kapıdır: yalnızca testleri geçen paketlenir ve yalnızca tekrarlanabilir şekilde paketlenen yayınlanır.",
   "analogy": "Bir montaj hattı: parça gelir, monte edilir, kalite kontrolünden geçer, kutulanır ve ancak ondan sonra dükkâna gönderilir."
  },
  "o3": {
   "title": "\"Benim makinemde çalışıyor\"",
   "prompt": "Uygulama Bia'nın dizüstü bilgisayarında çalışıyor ama sunucuda hata veriyor. En olası neden ve doğru çözüm nedir?",
   "opts": [
    "Farklı ortamlar; bağımlılıkları ve sürümleri bir dosyada bildirin ve her yerde aynı ortamı kullanın",
    "Arızalı sunucu; yenisini alın",
    "Kötü şans; yarın tekrar deneyin",
    "Kötü dil; başka bir dilde yeniden yazın"
   ],
   "hint": "Kod her iki yerde de aynı. Çevresinde ne değişiyor?",
   "why": "Aynı kod, sürümler ve ayarlar değiştiğinde farklı davranır. Bildirilen bağımlılıklar ve standartlaştırılmış ortamlar yürütmeyi tekrarlanabilir kılar.",
   "analogy": "Tarif senin mutfağında çalışıyor, komşununkinde başarısız oluyor çünkü onların fırını farklı sıcaklık gösteriyor. Fırını standartlaştır; keki suçlama."
  },
  "o4": {
   "title": "Sürüm riski",
   "prompt": "Her uygulamayı sürüm riski üzerindeki etkisine göre sınıflandırın.",
   "bins": [
    "Riski azaltır",
    "Riski artırır"
   ],
   "cards": [
    "Haftada birkaç kez küçük değişiklikler yayınlamak",
    "Üç aylık değişiklikleri tek bir sürümde biriktirmek",
    "Test edilmiş bir geri alma komutuna sahip olmak",
    "Üretim sunucusunda dosyaları doğrudan düzenlemek"
   ],
   "hint": "Kendinize sorun: Bir şeyler ters giderse nedeni bulmak ve geri dönmek kolay olur mu?",
   "why": "Küçük bir değişikliğin nedeni kolay bulunur ve test edilmiş bir geri alma hızlı bir yol sağlar. Dev bir sürüm ve üretimde elle yapılan düzenlemeler hatayı bulmayı ve geri almayı zorlaştırır.",
   "analogy": "Nehri taş taş geçmek geri adım atmanı sağlar. Bir kıyıdan diğerine atlamak ya hep ya hiçtir."
  },
  "o5": {
   "title": "CI üç gündür kırmızı",
   "prompt": "CI'da bir test üç gündür başarısız oluyor ve ekip kod push etmeye devam ediyor. Doğru hareket tarzı nedir?",
   "opts": [
    "Önce durun ve derlemeyi düzeltin: yok sayılan bir alarm korumayı bırakır",
    "Başarısız testi devre dışı bırakın",
    "Devam edin ve ay sonunda her şeyi düzeltin",
    "Yalnızca engel olan CI'ı kaldırın"
   ],
   "hint": "Herkes yok saymayı öğrendikten sonra bir alarmın değeri nedir?",
   "why": "Kırmızı bir derlemede yeni kusurlar ilk hatanın arkasına gizlenerek sızar. Derlemeyi düzeltmek tüm ekibin önceliği haline gelir; testi devre dışı bırakmak yalnızca gösterge panelindeki ışığı kapatır.",
   "analogy": "Gösterge panelindeki yağ lambasıdır: üzerini bantlamak motoru tamir etmez."
  },
  "q6": {
   "title": "Gereksinim triyajı",
   "prompt": "Sağlık ocağı sisteminin her gereksinimini sınıflandırın.",
   "bins": [
    "Fonksiyonel",
    "Fonksiyonel olmayan"
   ],
   "cards": [
    "Randevudan bir gün önce hastaya hatırlatma gider",
    "Sistem zamanın %99'unda kullanılabilir",
    "Resepsiyonist randevuları yeniden planlar",
    "Hasta verileri şifreli saklanır"
   ],
   "hint": "Her karta sorun: Bu, sistemin YAPTIĞI bir şey mi, yoksa bunu yaparken sahip olduğu bir nitelik mi?",
   "why": "Hatırlatma ve yeniden planlama davranıştır (fonksiyonel). Kullanılabilirlik ve şifreleme hizmetin niteliğidir (fonksiyonel olmayan) ve sorun olana kadar unutulma eğilimindedir.",
   "analogy": "Menüde yemekler fonksiyonel kısımdır. Sıcak gelmesi, yirmi dakika içinde gelmesi ve temiz mutfaktan gelmesi fonksiyonel olmayan kısımdır: kimse sipariş etmez, herkes bekler."
  },
  "a6": {
   "title": "Sprint ritmi",
   "prompt": "Scrum sprint etkinliklerini sıraya koyun.",
   "lines": [
    "Planlama: Ekip sprinte sığacak işleri seçer",
    "Günlük toplantılar ilerlemeyi izler",
    "İnceleme: Artım kullanan kişilere gösterilir",
    "Retrospektif: Ekip kendi sürecini iyileştirir"
   ],
   "hint": "Önce ne yapacağınıza karar verirsiniz; sonunda ürüne, sonra sürece bakarsınız.",
   "why": "Sprint planlamayla açılır, günlüklerle devam eder, sonucu incelemede gösterir ve bir sonraki döngüyü besleyen retrospektifle kapanır.",
   "analogy": "Bir yolculuk gibidir: rotayı planla, her gün haritayı kontrol et, varınca fotoğrafları göster ve bir dahaki sefere farklı yapacaklarınız konusunda anlaşın."
  },
  "g6": {
   "title": "Çakışmayı çözmek",
   "prompt": "Birleştirme çakışmasını güvenle çözme adımlarını sıraya koyun.",
   "lines": [
    "Güncellenmiş main'i dalınıza getirin",
    "Çakışma olarak işaretlenen dosyaları açın",
    "Bölüm bölüm hangi sürümün kalacağına karar verin",
    "Bir şey bozulmadı mı diye testleri çalıştırın",
    "Birleştirmeyi tamamlayan commit'i kaydedin"
   ],
   "hint": "Çakışma ancak iki sürüm karşılaşınca ortaya çıkar; commit ancak kontrol ettikten sonra gelir.",
   "why": "Birleştirme çakışmaları ortaya çıkarır, karar insanidir ve bölüm bölüm verilir, testler son commit'ten önce kombinasyonun çalıştığını doğrular.",
   "analogy": "İki editör aynı paragrafı değiştirdi: sürümler bir araya getirilir, sakin sakin okunur, bir ifade seçilir, tüm metin baştan sona okunur ve ancak ondan sonra baskıya gider."
  },
  "t6": {
   "title": "TDD döngüsü",
   "prompt": "Test güdümlü geliştirme döngüsünü sıraya koyun.",
   "lines": [
    "Başarısız olan bir test yazın",
    "Testi geçiren minimum kodu yazın",
    "Tüm testleri çalıştırıp her şeyin yeşil olduğunu görün",
    "Testlerin koruması altında yeniden düzenleyin"
   ],
   "hint": "Kırmızı, yeşil, yeniden düzenle.",
   "why": "Önce test gelir ve başarısız olur (kırmızı), minimum kod onu geçirir (yeşil), ancak ondan sonra yapı iyileştirilir, altta testlerin güvenlik ağı vardır.",
   "analogy": "Terzi önce ölçüyü işaretler, sonra kumaşı ölçüye uyana kadar keser ve en son bitirme işini yapar, her ayarlamadan sonra ölçüyü kontrol eder."
  },
  "d6": {
   "title": "Bağımlılık belirtileri",
   "prompt": "Kooperatifin sisteminde gözlemlenen her durumu sınıflandırın.",
   "bins": [
    "Düşük bağımlılık",
    "Yüksek bağımlılık"
   ],
   "cards": [
    "Kargo hesaplaması fiyat tablosunu parametre olarak alır",
    "Ekran doğrudan veritabanına erişir",
    "Faturalama ödemelerle bir arayüz üzerinden konuşur",
    "Kayıt formunu değiştirmek altı başka dosyada değişiklik gerektirir"
   ],
   "hint": "Sorun: Bu kısım değişirse, onunla birlikte kaç kısım daha değişmek zorunda kalır?",
   "why": "Bağımlılıkları dışarıdan almak ve arayüzler üzerinden konuşmak parçaları izole eder. Doğrudan veritabanına konuşan ekran ve basamaklı değişiklikler parçaların birbirine bağlı olduğunu gösterir.",
   "analogy": "Prizlere takılan cihazlar tek tek değiştirilir. Kabloları birbirine lehimlenmiş cihazlar, televizyonu değiştirmek için odayı sökmeye zorlar."
  },
  "m1": {
   "title": "Kim, ne için kullanıyor",
   "prompt": "Hangi diyagram sistemi kimin kullandığını ve her kişinin onunla ne yapabileceğini gösterir?",
   "opts": [
    "Kullanım senaryosu diyagramı",
    "Sınıf diyagramı",
    "Dizi diyagramı",
    "Dağıtım diyagramı"
   ],
   "hint": "İnsanlara (aktörler) ve hedeflere odaklanan görünümü arayın.",
   "why": "Kullanım senaryoları aktörleri hedeflere bağlar: okur ödünç alır, gönüllü kaydeder. Sınıflar kavramları gösterir; diziler mesajların sırasını gösterir.",
   "analogy": "Restoran menüsünün yemek salonundan görünüşüdür: mutfağı göstermeden, kimin ne sipariş edebileceğini gösterir."
  },
  "m2": {
   "title": "Kitap ve kopya",
   "prompt": "Kitap ile Kopya arasındaki ilişki nasıl modellenmelidir?",
   "opts": [
    "Bir Kitabın birden çok Kopyası vardır; her Kopya tek bir Kitaba aittir",
    "Bir Kitabın tam olarak bir Kopyası vardır",
    "Çok sayıda Kitap, çok sayıda Kopyaya",
    "İlişki yok: aynı şeydirler"
   ],
   "hint": "Kütüphanede Dom Casmurro'dan üç kopya var. Kaç başlık, kaç fiziksel nesne?",
   "why": "Tek bir başlık vardır; raftaki nesneler birden fazladır. Ödünç alınan kitap değil, kopyadır. Bu çokluğu yanlış anlamak tüm veritabanını kirletir.",
   "analogy": "Tarif tektir; ondan yapılan kekler çoktur. Tarifi değil, keki yersiniz."
  },
  "m3": {
   "title": "Yapı mı, davranış mı",
   "prompt": "Her cümleyi sınıflandırın: modelin hangi görünümüne aittir?",
   "bins": [
    "Statik görünüm (sınıflar)",
    "Dinamik görünüm (dizi)"
   ],
   "cards": [
    "Okuyucunun adı ve telefon numarası vardır",
    "Sistem bir kopyanın müsait olup olmadığını kontrol eder ve ardından ödüncü kaydeder",
    "Bir Ödünç bir Kopyaya başvurur",
    "Bir iade, bekleme listesindeki bir sonraki kişiye bildirim tetikler"
   ],
   "hint": "Statik ne var olduğunu tanımlar; dinamik ne olduğunu ve hangi sırada olduğunu tanımlar.",
   "why": "Nitelikler ve ilişkiler yapıdır ve her zaman geçerlidir. Kontrol etme, kaydetme ve bildirme zaman içinde zincirlenmiş olaylardır.",
   "analogy": "Kat planı odaları gösterir (statik); ziyaret senaryosu kişinin nerede ve hangi sırada yürüdüğünü gösterir (dinamik)."
  },
  "m4": {
   "title": "Ödünç alma sırası",
   "prompt": "\"Kitap ödünç alma\" sıra diyagramındaki mesajları sıraya koyun.",
   "lines": [
    "Okuyucu kitabı masada ister",
    "Gönüllü başlığı sistemde arar",
    "Sistem bir kopyanın müsait olup olmadığını kontrol eder",
    "Sistem ödünç almayı ve iade tarihini kaydeder",
    "Gönüllü kopyayı okuyucuya verir"
   ],
   "hint": "Her mesaj, bir önceki cevaplanmadan anlam kazanmaz.",
   "why": "Sıra aktörle başlar, arama ve kontrolden geçer ve ancak müsaitlik doğrulandıktan sonra kayıt yapar. Fiziksel teslim akışı kapatır.",
   "analogy": "Bu bir koreografidir: her adım bir öncekine cevap verir ve sıra değişirse dansçılar çarpışır."
  },
  "m5": {
   "title": "Ne kadar modellemeli",
   "prompt": "Ekip ilk satır kodu yazmadan önce 40 sınıfın tamamını ayrıntılı çizmek istiyor. En iyi yönlendirme nedir?",
   "opts": [
    "Ekibi hizalamak ve en riskli kısmı netleştirmek için gerekeni modelleyin; modeli kodla birlikte geliştirin",
    "Her şeyi önce ayrıntılı modelleyin ki yeniden iş çıkmasın",
    "Hiçbir şey modellemeyin: kod belgelemenin ta kendisidir",
    "Herkes kendi modelini çizsin, sonra hepsi birleştirilir"
   ],
   "hint": "Bir model, önlediği yanlış anlaşılma kadar değerlidir; kutu sayısı kadar değil.",
   "why": "Fazla modelleme kullanılmadan bayatlar; az modelleme ise yanlış anlaşılmanın koda ulaşmasına izin verir. Doğru miktar, bir sonraki adımı güvenle kararlaştıracak kadardır.",
   "analogy": "Bir yolculuk için rotayı planlar ve ilk oteli ayırtırsınız; onuncu gün öğle yemeğinde hangi masada oturacağınıza karar vermezsiniz."
  },
  "u1": {
   "title": "Bir satır değiştirmek için iki gün",
   "prompt": "Bia'nın, Caio'nun kodundaki bir satırı düzeltmesi iki gün sürdü. Hangi kalite özelliği eksiktir?",
   "opts": [
    "Sürdürülebilirlik",
    "Performans",
    "Kullanılabilirlik",
    "Taşınabilirlik"
   ],
   "hint": "Program kullanıcı için çalışıyordu. Kimin için çalışmıyordu?",
   "why": "Sürdürülebilirlik, yazılımı anlamanın, düzeltmenin ve geliştirmenin ne kadar kolay olduğudur. Kullanıcı için görünmezdir ve maliyet açısından belirleyicidir.",
   "analogy": "Bir araba iyi çalışabilir ama yine de ampul değiştirmek için motoru sökmek gerekebilir. Tamirci çeker, fatura sahibine kalır."
  },
  "u2": {
   "title": "İncelemede nasıl yorum yapılır",
   "prompt": "Hangi kod inceleme yorumu en faydalıdır?",
   "opts": [
    "Bu döngü listede iki kez geçiyor; tek döngüde birleştirilebilir mi? Yardımcı olmaktan memnuniyet duyarım",
    "Berbat kod, baştan yaz",
    "Onaylandı (okumadan)",
    "Ben farklı yapardım"
   ],
   "hint": "İyi bir yorum bir noktaya işaret eder, nedenini açıklar ve bir konuşma başlatır.",
   "why": "Etkili bir inceleme spesifiktir, kişi yerine koddan bahseder ve ileriye dönük bir yol önerir. Okumadan onaylamak hiç incelememekten kötüdür: sahte güven yaratır.",
   "analogy": "İyi bir editör cümleyi daire içine alır ve alternatif önerir; el yazmasını kapağına \"bu kötü\" yazarak geri vermez."
  },
  "u3": {
   "title": "Borcu ödemek mi, artırmak mı",
   "prompt": "Her eylemi teknik borç açısından sınıflandırın.",
   "bins": [
    "Borcu öder",
    "Borcu artırır"
   ],
   "cards": [
    "x1'i toplam_satis olarak yeniden adlandırmak",
    "Zaman kazanmak için bir fonksiyonu kopyalayıp yapıştırmak",
    "Eski koda dokunmadan önce test yazmak",
    "Derleme geçsin diye statik analizör uyarısını kapatmak"
   ],
   "hint": "Şunu sorun: Bu, bir sonraki değişikliği kolaylaştırır mı yoksa zorlaştırır mı?",
   "why": "Açık isimler ve testler gelecekteki değişikliklerin maliyetini düşürür. Tekrarlama ve susturulmuş uyarılar, daha büyük geri dönecek sorunları gizler.",
   "analogy": "Bu bir kredi kartıdır: taksit ödemek bu ayı çözer, ancak ileri atılan her taksit faiz ekler. Yeniden adlandırmak ve test etmek faturayı ödemektir."
  },
  "u4": {
   "title": "2.000 satırlık pull request",
   "prompt": "İncelenmek üzere 2.000 değiştirilmiş satır içeren bir değişiklik geliyor. En iyi hareket tarzı nedir?",
   "opts": [
    "Daha küçük, bağımsız değişikliklere ayrılmasını istemek",
    "Hepsini tek seferde, aceleyle incelemek",
    "Yazara güvenerek onaylamak",
    "Nedenini açıklamadan reddetmek"
   ],
   "hint": "İnceleyicinin dikkati birkaç yüz satırdan sonra keskin biçimde düşer.",
   "why": "Küçük değişiklikler incelemede gerçek ilgi görür, daha erken birleştirilir ve geri almak kolaydır. Dev bir değişiklik okunmadan geçer.",
   "analogy": "Kimse kapalı kamyona bakarak koca bir ev taşınmasını kontrol etmez. Kutu kutu bakarsanız neyin kırıldığını görürsünüz."
  },
  "u5": {
   "title": "İlk nereye müdahale etmeli",
   "prompt": "Bir fonksiyonun döngüsel karmaşıklığı 35, test kapsamı yok ve her hafta değiştiriliyor. Öncelik nedir?",
   "opts": [
    "Yüksek: önce testlerle kapsayın, sonra küçük parçalara bölün",
    "Düşük: çalışıyorsa dokunmayın",
    "Tüm sistemi sıfırdan yeniden yazın",
    "Hiçbiri: metrikler bir anlam ifade etmez"
   ],
   "hint": "Üç sinyali birleştirin: çok yol, hiç test, sık değişiklik.",
   "why": "Risk, karmaşıklık çarpı kodun ne sıklıkta değiştiğidir. Önce test güvenlik ağı, sonra küçük adımlarla yeniden düzenleme; her şeyi yeniden yazmak bilinen bir riski birkaç bilinmeyen riskle takas eder.",
   "analogy": "Tehlike, trafik ışığı olmayan kavşağın var olması değil, günde kaç kez birinin oradan geçtiğidir: herkesin yoğun saatte geçtiği o kavşaktır."
  },
  "o1": {
   "title": "CI ne yapar",
   "prompt": "Sürekli entegrasyon her push'ta ne yapar?",
   "opts": [
    "Projeyi derler ve testleri otomatik çalıştırır; bir şey bozulursa uyarır",
    "Test etmeden üretime dağıtır",
    "Sadece kodun yedek kopyasını alır",
    "Eski dalları siler"
   ],
   "hint": "Her değişikliği gelir gelmez kontrol eden bir bekçi düşünün.",
   "why": "CI projeyi sıfırdan derler ve her değişiklikte testleri çalıştırır. Değer, uyarının ne kadar hızlı geldiğindedir: haftalar değil dakikalar.",
   "analogy": "Kapıdaki metal dedektörüdür: ay sonunda tüm binayı aramak yerine, içeri girerken herkesi kontrol eder."
  }
 },
 "game": {
  "shop": {
   "shield": [
    "Kalkan",
    "Bir sonraki hatanın XP cezasını emer. Otomatik kullanılır."
   ],
   "fifty": [
    "İki seçeneği kaldır",
    "Çoktan seçmeli bir sorudan iki yanlış seçeneği kaldırır. Doğru cevap daha sonra ustalığın daha zayıf kanıtı sayılır."
   ],
   "time": [
    "Ek süre",
    "Ekstra zorlu modda saate 30 saniye ekler."
   ],
   "boost": [
    "Çifte XP",
    "Sonraki 3 sorunun XP'sini ikiye katlar. Kullanır kullanmaz etkinleşir."
   ],
   "tBug": [
    "Böcek avcısı",
    "Rolünün yanında gösterilen bir unvan."
   ],
   "tArch": [
    "Mimarın zihni",
    "Rolünün yanında gösterilen bir unvan."
   ],
   "tLegend": [
    "Dağıtım efsanesi",
    "Rolünün yanında gösterilen bir unvan."
   ]
  },
  "bounties": {
   "b1": "İpucu kullanmadan art arda 3 soruyu doğru cevapla",
   "b2": "Zor veya Ekstra zorlu modda bir soruyu çöz",
   "b3": "Temiz sprint: 5 üzerinden 5"
  },
  "bosses": {
   "bossA": {
    "name": "Müfettiş",
    "client": "Dona Lúcia'nın fırını",
    "trophy": "Müfettiş Mührü",
    "story": "Bir şehir müfettişi fırına girer ve bir saat içinde toplam indirimli satışları, indirim alan müşteri sayısını ve para üstü hesaplamasını görmek ister. Kasa programı değişkenleri, koşulları ve döngüleri karıştırıyor ve herhangi bir hata para cezası anlamına geliyor. Dona Lúcia sana bakıyor."
   },
   "bossB": {
    "name": "Büyük Göç",
    "client": "2. Bölge Noter Ofisi",
    "trophy": "Arşiv Anahtarı",
    "story": "Noter ofisi bu hafta sonu 40 yıllık dosyaları yeni bir sunucuya taşıyor. Betik listeler üzerinde özyinelemeli fonksiyonlar kullanıyor ve yanlış sayım içeren bir rapor tüm süreci geçersiz kılıyor. Helena'nın Cumartesi'den önce her fonksiyonun kontrol edilmesi gerekiyor."
   },
   "bossC": {
    "name": "Cuma, 17:00",
    "client": "Roda Viva teslimat kooperatifi",
    "trophy": "Cuma Madalyası",
    "story": "Cuma, 17:00. Kooperatif yemek kuponlarının bugün yayında olmasını talep ediyor, çünkü kampanya yarın başlıyor. Kod birinin makinesinde bitmiş durumda, testler ve inceleme olmadan. Gereksinimler, süreç, sürümleme, test ve tasarım hakkında öğrendiğin her şey önümüzdeki birkaç saat içinde sınanacak."
   }
  }
 }
};
