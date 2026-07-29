import { placesBySlug, routes, whatsappPhone } from "./route-data.js?v=20260728-pwa-78";
import { bindLanguageMenu, getLanguage, setupBackButton } from "./journey-language.js?v=20260729-i18n-1";

const routeSlug =
  new URLSearchParams(location.search).get("route") ||
  location.pathname.split("/").filter(Boolean).at(-1);
const route = routes[routeSlug] || routes.lara;
const localizedDestination =
  route.slug === "belek" ? "Belek" : route.slug === "lara" ? "Lara" : route.slug === "alanya" ? "Alanya" : route.slug === "side" ? "Side" : route.slug === "konyaalti" ? "Konyaaltı" : route.slug === "beldibi" ? "Beldibi" : route.slug === "goynuk" ? "Göynük" : route.slug === "kemer" ? "Kemer" : route.slug === "kiris" ? "Kiriş" : route.slug === "camyuva" ? "Çamyuva" : route.slug === "tekirova" ? "Tekirova" : route.slug === "olympos" ? "Olympos" : route.slug === "cirali" ? "Çıralı" : route.slug === "adrasan" ? "Adrasan" : route.slug === "kumluca" ? "Kumluca" : route.slug === "finike" ? "Finike" : route.slug === "demre" ? "Demre" : route.slug === "kas" ? "Kaş" : route.destination;
const selectedStops = new Set();
let currentLanguage = getLanguage();
const destinationNames = {
  de: {lara:"Lara",konyaalti:"Konyaaltı",belek:"Belek",side:"Side",alanya:"Alanya",beldibi:"Beldibi",goynuk:"Göynük",kemer:"Kemer",kiris:"Kiriş",camyuva:"Çamyuva",tekirova:"Tekirova",olympos:"Olympos",cirali:"Çıralı",adrasan:"Adrasan",kumluca:"Kumluca",finike:"Finike",demre:"Demre",kas:"Kaş"},
  ar: {lara:"لارا",konyaalti:"كونيالتي",belek:"بيليك",side:"سيدا",alanya:"ألانيا",beldibi:"بيلديبي",goynuk:"غوينوك",kemer:"كيمر",kiris:"كيريش",camyuva:"تشاميوفا",tekirova:"تيكيروفا",olympos:"أوليمبوس",cirali:"تشيرالي",adrasan:"أدراسان",kumluca:"كوملوجا",finike:"فينيكه",demre:"ديمره",kas:"كاش"}
};
const destinationFor = (language) => destinationNames[language]?.[route.slug] || localizedDestination;
const interfaceCopy = {
  ru: { back:"Назад к направлениям", breadcrumb:"← Выбор направления", contact:"Связаться с оператором", choose:"Выбрать остановки", details:"Подробнее", add:"Добавить к маршруту", added:"Добавлено", discuss:"Обсудить маршрут с оператором", mobileBack:"Назад" },
  en: { back:"Back to destinations", breadcrumb:"← Choose destination", contact:"Contact the operator", choose:"Choose stops", details:"Learn more", add:"Add to route", added:"Added", discuss:"Discuss route with the operator", mobileBack:"Back", airport:"Antalya Airport", title:`Private transfer from Antalya Airport to ${route.destination} with stops`, description:"Turn your private transfer into a small journey by adding places that interest you.", introKicker:"Your route, your experience", introTitle:"Add what interests you to your transfer", introText:"Choose one or more stops and our operator will calculate the duration and cost.", bullets:["The standard transfer has no stops","Stops are selected separately","Duration and price depend on the route","The operator confirms the final plan"], directKicker:"Close to the direct route", directTitle:"Convenient places to visit on the way", directText:`These places are convenient to include on the way to ${route.destination}.`, extraKicker:"Extended route", extraTitle:"Add a mini-journey", extraText:"These places require a detour and may increase the duration and price.", important:"Important", notice:"The operator will agree the order, duration and final price with you in advance.", helpKicker:"Personal recommendation", helpTitle:"Not sure what to choose?", helpText:"Tell the operator how much time you have and whether you prefer nature, history, a walk or photo locations.", helpAction:"Plan a mini-journey" },
  tr: { back:"Rotalara dön", breadcrumb:"← Rota seçimi", contact:"Operatöre ulaşın", choose:"Durakları seçin", details:"Daha fazla", add:"Rotaya ekle", added:"Eklendi", discuss:"Rotayı operatörle görüş", mobileBack:"Geri", airport:"Antalya Havalimanı", title:`Antalya Havalimanı'ndan ${route.destination} yönüne duraklı özel transfer`, description:"İlginizi çeken yerleri ekleyerek özel transferinizi küçük bir yolculuğa dönüştürün.", introKicker:"Rotanız, deneyiminiz", introTitle:"Transferinize ilginizi çeken durakları ekleyin", introText:"Bir veya birkaç durak seçin; operatörümüz süreyi ve ücreti hesaplasın.", bullets:["Standart transfer duraksızdır","Duraklar ayrıca seçilir","Süre ve ücret rotaya bağlıdır","Son planı operatör onaylar"], directKicker:"Doğrudan rotaya yakın", directTitle:"Yol üzerinde kolayca ziyaret edin", directText:`Bu yerleri ${route.destination} yolculuğuna eklemek kolaydır.`, extraKicker:"Genişletilmiş rota", extraTitle:"Mini bir yolculuk ekleyin", extraText:"Bu yerler sapma gerektirir; süreyi ve ücreti artırabilir.", important:"Önemli", notice:"Durak sırası, süre ve son ücret önceden sizinle kararlaştırılır.", helpKicker:"Kişisel öneri", helpTitle:"Ne seçeceğinizden emin değil misiniz?", helpText:"Ne kadar zamanınız olduğunu ve doğa, tarih, yürüyüş ya da fotoğraf noktalarından hangisini sevdiğinizi söyleyin.", helpAction:"Mini yolculuk planla" },
};
interfaceCopy.de = {
  back:"Zurück zu den Zielen", breadcrumb:"← Ziel auswählen", contact:"Buchungsteam kontaktieren", choose:"Stopps auswählen", details:"Mehr erfahren", add:"Zur Route hinzufügen", added:"Hinzugefügt", discuss:"Route mit dem Buchungsteam besprechen", mobileBack:"Zurück", airport:"Flughafen Antalya", privacy:"Datenschutzerklärung",
  title:`Privater Transfer vom Flughafen Antalya nach ${localizedDestination} mit Stopps`, description:"Machen Sie aus Ihrem privaten Transfer eine kleine Reise und ergänzen Sie ausgewählte Sehenswürdigkeiten.",
  introKicker:"Ihre Route, Ihr Erlebnis", introTitle:"Ergänzen Sie Ihren Transfer um passende Stopps", introText:"Wählen Sie einen oder mehrere Stopps; unser Buchungsteam berechnet Dauer und Preis.", bullets:["Der Standardtransfer erfolgt ohne Zwischenstopp","Stopps werden separat ausgewählt","Dauer und Preis hängen von der Route ab","Das Buchungsteam bestätigt den endgültigen Ablauf"],
  directKicker:"Nahe der direkten Route", directTitle:"Bequeme Stopps auf dem Weg", directText:`Diese Orte lassen sich gut in die Fahrt nach ${localizedDestination} einplanen.`, extraKicker:"Erweiterte Route", extraTitle:"Eine kleine Reise ergänzen", extraText:"Diese Ziele erfordern einen Umweg und können Dauer und Preis erhöhen.", important:"Wichtig", notice:"Reihenfolge, Dauer und endgültiger Preis werden vorab mit Ihnen abgestimmt.", helpKicker:"Persönliche Empfehlung", helpTitle:"Sie sind noch unsicher?", helpText:"Sagen Sie uns, wie viel Zeit Sie haben und ob Sie Natur, Geschichte, Spaziergänge oder Fotomotive bevorzugen.", helpAction:"Mini-Reise planen", fallback:"Foto folgt in Kürze"
};
interfaceCopy.ar = {
  back:"العودة إلى الوجهات", breadcrumb:"اختيار الوجهة →", contact:"تواصل مع مسؤول الحجز", choose:"اختر محطات التوقف", details:"عرض التفاصيل", add:"أضف إلى المسار", added:"تمت الإضافة", discuss:"ناقش المسار مع مسؤول الحجز", mobileBack:"رجوع", airport:"مطار أنطاليا", privacy:"سياسة الخصوصية",
  title:`نقل خاص من مطار أنطاليا إلى ${destinationFor("ar")} مع محطات توقف`, description:"حوّل خدمة النقل الخاصة إلى رحلة قصيرة مميزة بإضافة الأماكن التي تهمك على الطريق.",
  introKicker:"مسارك، تجربتك", introTitle:"أضف إلى رحلتك ما يثير اهتمامك", introText:"اختر محطة واحدة أو أكثر، وسيتولى مسؤول الحجز حساب المدة والتكلفة.", bullets:["خدمة النقل الأساسية من دون توقف","تُختار المحطات بصورة منفصلة","تعتمد المدة والتكلفة على المسار","يؤكد مسؤول الحجز الخطة النهائية"],
  directKicker:"قريبة من المسار المباشر", directTitle:"أماكن مناسبة للزيارة في الطريق", directText:`يمكن إضافة هذه الأماكن بسهولة إلى رحلتك نحو ${destinationFor("ar")}.`, extraKicker:"مسار موسّع", extraTitle:"أضف رحلة قصيرة إلى برنامجك", extraText:"تتطلب هذه الأماكن خروجاً عن الطريق وقد تزيد المدة والتكلفة.", important:"مهم", notice:"نتفق معك مسبقاً على ترتيب المحطات والمدة والسعر النهائي.", helpKicker:"اقتراح شخصي", helpTitle:"لست متأكداً ماذا تختار؟", helpText:"أخبر مسؤول الحجز بالوقت المتاح وما إذا كنت تفضل الطبيعة أو التاريخ أو التنزه أو مواقع التصوير.", helpAction:"خطط لرحلة قصيرة", fallback:"ستتوفر الصورة قريباً"
};
const placeNames = {
  en: {"lower-duden":"Lower Düden Waterfall","duden-park":"Düden Park","kaleici":"Kaleiçi Old Town","perge":"Ancient City of Perge","kursunlu-waterfall":"Kurşunlu Waterfall","upper-duden":"Upper Düden Waterfall","antalya-museum":"Antalya Archaeological Museum","land-of-legends":"The Land of Legends","belek-beach":"Belek Beach","aspendos":"Ancient Theatre of Aspendos","zeytintasi-cave":"Zeytintaşı Cave","alanya-castle":"Alanya Castle","alanya-cable-car":"Alanya Cable Car","alanya-aya-yorgi":"Church of Saint George","alanya-red-tower":"Red Tower and Seljuk Shipyard","alanya-damlatas":"Damlataş Cave and Cleopatra Beach","alanya-museum":"Alanya Archaeological Museum","alanya-dim":"Dim River and Dim Cave","alanya-syedra":"Ancient City of Syedra","side-ancient-city":"Ancient Side and the Temple of Apollo","side-museum":"Side Archaeological Museum","manavgat-waterfall":"Manavgat Waterfall","koprulu-canyon":"Köprülü Canyon","konyaalti-beach":"Konyaaltı Beach and Promenade","antalya-aquarium":"Antalya Aquarium","termessos":"Ancient City of Termessos","karain-cave":"Karain Cave","beldibi-cave":"Beldibi Cave","beldibi-beach":"Beldibi Coast","goynuk-canyon":"Göynük Canyon","phaselis":"Ancient City of Phaselis"},
  tr: {"lower-duden":"Aşağı Düden Şelalesi","duden-park":"Düden Parkı","kaleici":"Kaleiçi","perge":"Perge Antik Kenti","kursunlu-waterfall":"Kurşunlu Şelalesi","upper-duden":"Yukarı Düden Şelalesi","antalya-museum":"Antalya Arkeoloji Müzesi","land-of-legends":"The Land of Legends","belek-beach":"Belek Plajı","aspendos":"Aspendos Antik Tiyatrosu","zeytintasi-cave":"Zeytintaşı Mağarası","alanya-castle":"Alanya Kalesi","alanya-cable-car":"Alanya Teleferiği","alanya-aya-yorgi":"Aya Yorgi Kilisesi","alanya-red-tower":"Kızılkule ve Selçuklu Tersanesi","alanya-damlatas":"Damlataş Mağarası ve Kleopatra Plajı","alanya-museum":"Alanya Arkeoloji Müzesi","alanya-dim":"Dim Çayı ve Dim Mağarası","alanya-syedra":"Syedra Antik Kenti","side-ancient-city":"Side Antik Kenti ve Apollon Tapınağı","side-museum":"Side Arkeoloji Müzesi","manavgat-waterfall":"Manavgat Şelalesi","koprulu-canyon":"Köprülü Kanyon","konyaalti-beach":"Konyaaltı Plajı ve Sahili","antalya-aquarium":"Antalya Akvaryum","termessos":"Termessos Antik Kenti","karain-cave":"Karain Mağarası","beldibi-cave":"Beldibi Mağarası","beldibi-beach":"Beldibi Sahili","goynuk-canyon":"Göynük Kanyonu","phaselis":"Phaselis Antik Kenti"},
};
Object.assign(placeNames.en, {
  "kemer-clock-tower": "Kemer Clock Tower and Town Centre",
  "kemer-marina-moonlight": "Kemer Marina and Moonlight Bay",
  "kiris-coast": "Kiriş Coast and Bays",
  "tahtali-cable-car": "Mount Tahtalı and Cable Car",
  "camyuva-coast": "Çamyuva Coast",
  "alacasu-bay": "Alacasu Bay",
  "tekirova-coast": "Tekirova Coast",
  "three-islands": "Boat Trip to the Three Islands",
  "olympos-ancient-city": "Ancient City of Olympos",
  "cirali-beach": "Çıralı and Olympos Beach",
  "yanartas": "Yanartaş — Flames of Chimaera",
  "ulupinar": "Ulupınar Mountain River",
  "adrasan-bay": "Adrasan Bay and Beach",
  "suluada": "Suluada Boat Trip",
  "gelidonya-lighthouse": "Cape Gelidonya Lighthouse",
  "rhodiapolis": "Ancient City of Rhodiapolis",
  "finike-marina":"Finike Marina and Promenade","limyra":"Ancient City of Limyra","arykanda":"Ancient City of Arykanda","myra":"Ancient City of Myra","saint-nicholas-demre":"Church of Saint Nicholas","andriake":"Andriake and Museum of Lycian Civilisations","kekova":"Kekova and the Sunken City","kas-old-town":"Kaş Old Town and Harbour","antiphellos":"Antiphellos Ancient Theatre","kaputas":"Kaputaş Beach","patara":"Ancient Patara and Beach",
});
Object.assign(placeNames.tr, {
  "kemer-clock-tower": "Kemer Saat Kulesi ve Merkez",
  "kemer-marina-moonlight": "Kemer Marina ve Ayışığı Koyu",
  "kiris-coast": "Kiriş Sahili ve Koyları",
  "tahtali-cable-car": "Tahtalı Dağı ve Teleferik",
  "camyuva-coast": "Çamyuva Sahili",
  "alacasu-bay": "Alacasu Koyu",
  "tekirova-coast": "Tekirova Sahili",
  "three-islands": "Üç Adalar Tekne Turu",
  "olympos-ancient-city": "Olympos Antik Kenti",
  "cirali-beach": "Çıralı ve Olympos Plajı",
  "yanartas": "Yanartaş — Khimaira'nın Ateşleri",
  "ulupinar": "Ulupınar Dağ Deresi",
  "adrasan-bay": "Adrasan Koyu ve Plajı",
  "suluada": "Suluada Tekne Turu",
  "gelidonya-lighthouse": "Gelidonya Feneri",
  "rhodiapolis": "Rhodiapolis Antik Kenti",
  "finike-marina":"Finike Marina ve Sahili","limyra":"Limyra Antik Kenti","arykanda":"Arykanda Antik Kenti","myra":"Myra Antik Kenti","saint-nicholas-demre":"Aziz Nikolaos Kilisesi","andriake":"Andriake ve Likya Uygarlıkları Müzesi","kekova":"Kekova ve Batık Şehir","kas-old-town":"Kaş Eski Şehir ve Liman","antiphellos":"Antiphellos Antik Tiyatrosu","kaputas":"Kaputaş Plajı","patara":"Patara Antik Kenti ve Plajı",
});

placeNames.de = {
  "lower-duden":"Unterer Düden-Wasserfall","duden-park":"Düden-Park","kaleici":"Altstadt Kaleiçi","perge":"Antike Stadt Perge","kursunlu-waterfall":"Kurşunlu-Wasserfall","upper-duden":"Oberer Düden-Wasserfall","antalya-museum":"Archäologisches Museum Antalya","land-of-legends":"The Land of Legends","belek-beach":"Strand von Belek","aspendos":"Antikes Theater von Aspendos","zeytintasi-cave":"Zeytintaşı-Höhle","alanya-castle":"Burg von Alanya","alanya-cable-car":"Seilbahn von Alanya","alanya-aya-yorgi":"Kirche des Heiligen Georg","alanya-red-tower":"Roter Turm und seldschukische Werft","alanya-damlatas":"Damlataş-Höhle und Kleopatra-Strand","alanya-museum":"Archäologisches Museum Alanya","alanya-dim":"Dim-Fluss und Dim-Höhle","alanya-syedra":"Antike Stadt Syedra","side-ancient-city":"Antikes Side und Apollontempel","side-museum":"Archäologisches Museum Side","manavgat-waterfall":"Manavgat-Wasserfall","koprulu-canyon":"Köprülü-Canyon","konyaalti-beach":"Konyaaltı-Strand und Promenade","antalya-aquarium":"Aquarium Antalya","termessos":"Antike Stadt Termessos","karain-cave":"Karain-Höhle","beldibi-cave":"Beldibi-Höhle","beldibi-beach":"Küste von Beldibi","goynuk-canyon":"Göynük-Canyon","phaselis":"Antike Stadt Phaselis",
  "kemer-clock-tower":"Uhrturm und Zentrum von Kemer","kemer-marina-moonlight":"Marina Kemer und Moonlight-Bucht","kiris-coast":"Küste und Buchten von Kiriş","tahtali-cable-car":"Tahtalı-Berg und Seilbahn","camyuva-coast":"Küste von Çamyuva","alacasu-bay":"Alacasu-Bucht","tekirova-coast":"Küste von Tekirova","three-islands":"Bootsfahrt zu den Drei Inseln","olympos-ancient-city":"Antike Stadt Olympos","cirali-beach":"Çıralı- und Olympos-Strand","yanartas":"Yanartaş – die Flammen der Chimäre","ulupinar":"Bergfluss Ulupınar","adrasan-bay":"Bucht und Strand von Adrasan","suluada":"Bootsfahrt nach Suluada","gelidonya-lighthouse":"Leuchtturm am Kap Gelidonya","rhodiapolis":"Antike Stadt Rhodiapolis","finike-marina":"Marina und Promenade von Finike","limyra":"Antike Stadt Limyra","arykanda":"Antike Stadt Arykanda","myra":"Antike Stadt Myra","saint-nicholas-demre":"Kirche des Heiligen Nikolaus","andriake":"Andriake und Museum der lykischen Zivilisationen","kekova":"Kekova und die versunkene Stadt","kas-old-town":"Altstadt und Hafen von Kaş","antiphellos":"Antikes Theater Antiphellos","kaputas":"Kaputaş-Strand","patara":"Antikes Patara und Strand"
};
placeNames.ar = {
  "lower-duden":"شلال دودن السفلي","duden-park":"حديقة دودن","kaleici":"المدينة القديمة كاليتشي","perge":"مدينة بيرغه الأثرية","kursunlu-waterfall":"شلال كورشونلو","upper-duden":"شلال دودن العلوي","antalya-museum":"متحف أنطاليا للآثار","land-of-legends":"منتجع أرض الأساطير","belek-beach":"شاطئ بيليك","aspendos":"مسرح أسبندوس الأثري","zeytintasi-cave":"كهف زيتين تاش","alanya-castle":"قلعة ألانيا","alanya-cable-car":"تلفريك ألانيا","alanya-aya-yorgi":"كنيسة القديس جورج","alanya-red-tower":"البرج الأحمر وحوض السفن السلجوقي","alanya-damlatas":"كهف داملاتاش وشاطئ كليوباترا","alanya-museum":"متحف ألانيا للآثار","alanya-dim":"نهر ديم وكهف ديم","alanya-syedra":"مدينة سيدرا الأثرية","side-ancient-city":"مدينة سيدا الأثرية ومعبد أبولو","side-museum":"متحف سيدا للآثار","manavgat-waterfall":"شلال مانافغات","koprulu-canyon":"وادي كوبرولو","konyaalti-beach":"شاطئ وممشى كونيالتي","antalya-aquarium":"أكواريوم أنطاليا","termessos":"مدينة تيرميسوس الأثرية","karain-cave":"كهف كارين","beldibi-cave":"كهف بيلديبي","beldibi-beach":"ساحل بيلديبي","goynuk-canyon":"وادي غوينوك","phaselis":"مدينة فاسيليس الأثرية",
  "kemer-clock-tower":"برج الساعة ووسط كيمر","kemer-marina-moonlight":"مرسى كيمر وخليج مون لايت","kiris-coast":"ساحل وخلجان كيريش","tahtali-cable-car":"جبل تهتالي والتلفريك","camyuva-coast":"ساحل تشاميوفا","alacasu-bay":"خليج ألاچاسو","tekirova-coast":"ساحل تيكيروفا","three-islands":"رحلة بالقارب إلى الجزر الثلاث","olympos-ancient-city":"مدينة أوليمبوس الأثرية","cirali-beach":"شاطئ تشيرالي وأوليمبوس","yanartas":"يانارتاش — نيران خيميرا","ulupinar":"نهر أولوبينار الجبلي","adrasan-bay":"خليج وشاطئ أدراسان","suluada":"رحلة بالقارب إلى سولو أدا","gelidonya-lighthouse":"منارة رأس غيليدونيا","rhodiapolis":"مدينة روديابوليس الأثرية","finike-marina":"مرسى وممشى فينيكه","limyra":"مدينة ليميرا الأثرية","arykanda":"مدينة أريكاندا الأثرية","myra":"مدينة ميرا الأثرية","saint-nicholas-demre":"كنيسة القديس نيقولاوس","andriake":"أندرياكي ومتحف الحضارات الليسية","kekova":"كيكوفا والمدينة الغارقة","kas-old-town":"بلدة كاش القديمة والميناء","antiphellos":"مسرح أنطيفيلوس الأثري","kaputas":"شاطئ كابوتاش","patara":"مدينة باتارا الأثرية وشاطئها"
};

function displayPlace(place) {
  if (currentLanguage === "ru") return place;
  const name = placeNames[currentLanguage]?.[place.slug] || (currentLanguage === "ar" ? "محطة سياحية مختارة" : place.title);
  const category = {en:"Suggested stop",tr:"Önerilen durak",de:"Empfohlener Stopp",ar:"محطة مقترحة"}[currentLanguage];
  const description = {
    en:`Discover ${name} as a carefully planned stop during your private transfer.`,
    tr:`${name} özel transferiniz sırasında planlı bir durak olarak keşfedilebilir.`,
    de:`Entdecken Sie ${name} als sorgfältig geplanten Stopp während Ihres privaten Transfers.`,
    ar:`استمتع بزيارة ${name} كمحطة مختارة بعناية ضمن خدمة النقل الخاصة.`
  }[currentLanguage];
  return {...place, title:name, category, description};
}

const directStops = document.querySelector("#directStops");
const extraTrips = document.querySelector("#extraTrips");
const selectionBar = document.querySelector("#selectionBar");
const selectionCount = document.querySelector("#selectionCount");
const selectionNames = document.querySelector("#selectionNames");
const selectionOperatorLink = document.querySelector("#selectionOperatorLink");

function pluralStops(count) {
  if (currentLanguage === "ar") return `${count} ${count === 1 ? "محطة" : "محطات"}`;
  if (currentLanguage === "de") return `${count} ${count === 1 ? "Stopp" : "Stopps"}`;
  if (currentLanguage === "en") return `${count} ${count === 1 ? "stop" : "stops"}`;
  if (currentLanguage === "tr") return `${count} durak`;
  if (count % 10 === 1 && count % 100 !== 11) return `${count} остановка`;
  if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100)) return `${count} остановки`;
  return `${count} остановок`;
}

function messageForSelection() {
  const selectedNames = [...selectedStops].map((slug) => displayPlace(placesBySlug[slug]).title);

  if (currentLanguage === "ar") return selectedNames.length
    ? `مرحباً، أود حجز خدمة نقل خاصة من مطار أنطاليا إلى ${localizedDestination} وإضافة المحطات التالية: ${selectedNames.join("، ")}. يرجى إبلاغي بالمدة والتكلفة.`
    : `مرحباً، أود حجز خدمة نقل خاصة من مطار أنطاليا إلى ${localizedDestination}. ما المحطات التي يمكن إضافتها إلى المسار؟`;
  if (currentLanguage === "de") return selectedNames.length
    ? `Guten Tag, ich interessiere mich für einen privaten Transfer vom Flughafen Antalya nach ${localizedDestination} mit folgenden Stopps: ${selectedNames.join(", ")}. Bitte teilen Sie mir Dauer und Preis mit.`
    : `Guten Tag, ich interessiere mich für einen privaten Transfer vom Flughafen Antalya nach ${localizedDestination}. Welche Stopps können ergänzt werden?`;
  if (currentLanguage === "en") return selectedNames.length
    ? `Hello, I would like a private transfer from Antalya Airport to ${localizedDestination} with these stops: ${selectedNames.join(", ")}. Please confirm the duration and price.`
    : `Hello, I would like a private transfer from Antalya Airport to ${localizedDestination}. Which stops can be added?`;
  if (currentLanguage === "tr") return selectedNames.length
    ? `Merhaba, Antalya Havalimanı'ndan ${localizedDestination} yönüne şu duraklarla özel transfer istiyorum: ${selectedNames.join(", ")}. Süre ve fiyat bilgisini paylaşır mısınız?`
    : `Merhaba, Antalya Havalimanı'ndan ${localizedDestination} yönüne özel transfer istiyorum. Rotaya hangi duraklar eklenebilir?`;

  if (!selectedNames.length) {
    return `Здравствуйте! Меня интересует VIP-трансфер из аэропорта Антальи в ${route.destinationAccusative}. Подскажите, пожалуйста, какие остановки можно добавить к маршруту.`;
  }

  return `Здравствуйте! Меня интересует VIP-трансфер из аэропорта Антальи в ${route.destinationAccusative}. Я хочу добавить остановки: ${selectedNames.join(", ")}. Подскажите, пожалуйста, продолжительность и стоимость.`;
}

function whatsappUrl(message) {
  return `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(message)}`;
}

function updateSelection() {
  const count = selectedStops.size;
  const names = [...selectedStops].map((slug) => placesBySlug[slug].title);

  selectionBar.hidden = count === 0;
  selectionCount.textContent = pluralStops(count);
  selectionNames.textContent = names.join(", ");
  selectionOperatorLink.href = whatsappUrl(messageForSelection());

  document.querySelectorAll("[data-add-stop]").forEach((button) => {
    const isSelected = selectedStops.has(button.dataset.addStop);
    button.textContent = isSelected ? interfaceCopy[currentLanguage].added : interfaceCopy[currentLanguage].add;
    button.setAttribute("aria-pressed", String(isSelected));
    button.closest(".stop-card").classList.toggle("is-selected", isSelected);
  });
}

function toggleStop(slug) {
  if (selectedStops.has(slug)) selectedStops.delete(slug);
  else selectedStops.add(slug);
  updateSelection();
}

function stopCard(slug, index) {
  const place = displayPlace(placesBySlug[slug]);
  const article = document.createElement("article");
  article.className = "stop-card";
  article.innerHTML = `
    <div class="stop-card__visual">
      <img src="${place.image}" alt="${place.title}" loading="lazy" decoding="async">
      <div class="stop-card__image-fallback" aria-hidden="true">
        <span class="stop-card__image-icon">▧</span>
        <small>${interfaceCopy[currentLanguage].fallback || "Фотография скоро появится"}</small>
      </div>
      <span class="stop-card__number">0${index + 1}</span>
    </div>
    <div class="stop-card__body">
      <span class="stop-card__category">${place.category}</span>
      <h3>${place.title}</h3>
      <p>${place.description}</p>
      <div class="stop-card__actions">
        <a href="/places/${place.slug}?route=${route.slug}&lang=${currentLanguage}">${interfaceCopy[currentLanguage].details}</a>
        <button type="button" data-add-stop="${place.slug}" aria-pressed="false">${interfaceCopy[currentLanguage].add}</button>
      </div>
    </div>
  `;

  // Replace this image by adding a file to:
  // /public/images/places/
  const image = article.querySelector("img");
  image.addEventListener("load", () => article.querySelector(".stop-card__visual").classList.remove("is-missing"));
  image.addEventListener("error", () => article.querySelector(".stop-card__visual").classList.add("is-missing"));

  article.querySelector("[data-add-stop]").addEventListener("click", () => toggleStop(slug));
  return article;
}

function renderRoute() {
  const copy = interfaceCopy[currentLanguage];
  if (currentLanguage !== "ru") {
    copy.title = copy.title.replace(route.destination, localizedDestination);
    copy.directText = copy.directText.replace(route.destination, localizedDestination);
  }
  document.documentElement.lang = currentLanguage;
  document.documentElement.dir = currentLanguage === "ar" ? "rtl" : "ltr";
  document.querySelector(".route-detail-back").textContent = copy.back;
  document.querySelector(".route-breadcrumb").textContent = copy.breadcrumb;
  document.querySelector("#heroOperatorLink").textContent = copy.contact;
  document.querySelector('a[href="#routeStops"]').textContent = copy.choose;
  document.querySelector("#selectionOperatorLink").textContent = copy.discuss;
  document.querySelector("#mobileBackButton span").textContent = copy.mobileBack;
  const privacyLink = document.querySelector('footer a[href="/privacy"]');
  if (privacyLink && copy.privacy) privacyLink.textContent = copy.privacy;
  if (currentLanguage !== "ru") {
    document.querySelector("#routeTitle").textContent = copy.title;
    document.querySelector("#routeDescription").textContent = copy.description;
    document.querySelector("#routeLine").textContent = `${copy.airport} → ${destinationFor(currentLanguage)}`;
    const intro = document.querySelector(".route-intro");
    intro.querySelector(".section-kicker").textContent = copy.introKicker;
    intro.querySelector("h2").textContent = copy.introTitle;
    intro.querySelector("div > p:last-child").textContent = copy.introText;
    intro.querySelectorAll("li").forEach((item,index)=>item.textContent=copy.bullets[index]);
    const sections = document.querySelectorAll(".route-section__head");
    sections[0].querySelector(".section-kicker").textContent=copy.directKicker; sections[0].querySelector("h2").textContent=copy.directTitle; sections[0].querySelector(":scope > p").textContent=copy.directText;
    sections[1].querySelector(".section-kicker").textContent=copy.extraKicker; sections[1].querySelector("h2").textContent=copy.extraTitle; sections[1].querySelector(":scope > p").textContent=copy.extraText;
    document.querySelector(".route-notice strong").textContent=copy.important; document.querySelector(".route-notice span").textContent=copy.notice;
    const help=document.querySelector(".route-help"); help.querySelector(".section-kicker").textContent=copy.helpKicker; help.querySelector("h2").textContent=copy.helpTitle; help.querySelector("p:not(.section-kicker)").textContent=copy.helpText; help.querySelector("a").textContent=copy.helpAction;
  }
  document.title = route.seoTitle;
  document.querySelector('meta[name="description"]').content = route.seoDescription;
  document.querySelector("#routeTitle").textContent = route.title;
  document.querySelector("#routeDescription").textContent = route.description;
  document.querySelector("#routeLine").textContent = `${route.origin} → ${route.destination}`;
  document.querySelector("#directStopsDescription").textContent =
    `Эти места удобно включить в поездку из аэропорта в ${route.destinationAccusative}.`;
  if (currentLanguage !== "ru") {
    document.title = copy.title;
    document.querySelector('meta[name="description"]').content = copy.description;
    document.querySelector("#routeTitle").textContent = copy.title;
    document.querySelector("#routeDescription").textContent = copy.description;
    document.querySelector("#routeLine").textContent = `${copy.airport} → ${destinationFor(currentLanguage)}`;
    document.querySelector("#directStopsDescription").textContent = copy.directText;
  }
  document.querySelector("#routeHeroImage").src = route.image;
  document.querySelector("#routeHeroImage").alt = route.title;

  route.directStops.forEach((slug, index) => directStops.append(stopCard(slug, index)));
  route.extraTrips.forEach((slug, index) => extraTrips.append(stopCard(slug, index + route.directStops.length)));

  const genericMessage = messageForSelection();
  document.querySelector("#heroOperatorLink").href = whatsappUrl(genericMessage);
  document.querySelector("#heroOperatorLink").target = "_blank";
  document.querySelector("#heroOperatorLink").rel = "noreferrer";
  document.querySelector("#helpOperatorLink").href = whatsappUrl(genericMessage);
  document.querySelector("#helpOperatorLink").target = "_blank";
  document.querySelector("#helpOperatorLink").rel = "noreferrer";
  updateSelection();
}

const languageMenu = document.querySelector(".language-menu");
const updateLanguageMenu = bindLanguageMenu(languageMenu, (language) => {
  currentLanguage = language;
  directStops.replaceChildren();
  extraTrips.replaceChildren();
  renderRoute();
  updateLanguageMenu(language);
});

renderRoute();
updateLanguageMenu(currentLanguage);
setupBackButton(document.querySelector("#mobileBackButton"), "/routes");
window.addEventListener("gotransfer:languagechange", (event) => {
  currentLanguage = event.detail.language;
  directStops.replaceChildren();
  extraTrips.replaceChildren();
  renderRoute();
  updateLanguageMenu(currentLanguage);
});
