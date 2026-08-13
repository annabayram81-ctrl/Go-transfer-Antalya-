export const supportedLanguages = ["ru", "en", "tr", "de", "ar"];
export const defaultLanguage = "ru";

export const languageNames = {
  ru: "Русский",
  en: "English",
  tr: "Türkçe",
  de: "Deutsch",
  ar: "العربية",
};

export const ui = {
  ru: { home: "Главная", routes: "Маршруты", places: "Места", contact: "Связаться в WhatsApp", routeKicker: "Индивидуальный трансфер", routeIntro: "Что можно увидеть по пути", placeKicker: "Место для остановки", highlights: "Что посмотреть", planning: "Планирование остановки", language: "Язык", notFound: "Страница не найдена" },
  en: { home: "Home", routes: "Routes", places: "Places", contact: "Contact us on WhatsApp", routeKicker: "Private transfer", routeIntro: "What you can see along the way", placeKicker: "Suggested stop", highlights: "What to see", planning: "Planning your stop", language: "Language", notFound: "Page not found" },
  tr: { home: "Ana sayfa", routes: "Rotalar", places: "Yerler", contact: "WhatsApp ile iletişim", routeKicker: "Özel transfer", routeIntro: "Yol boyunca görebilecekleriniz", placeKicker: "Önerilen durak", highlights: "Görülecek yerler", planning: "Durağınızı planlayın", language: "Dil", notFound: "Sayfa bulunamadı" },
  de: { home: "Startseite", routes: "Routen", places: "Ausflugsziele", contact: "Kontakt über WhatsApp", routeKicker: "Privater Transfer", routeIntro: "Sehenswürdigkeiten entlang der Strecke", placeKicker: "Empfohlener Zwischenstopp", highlights: "Sehenswertes", planning: "Aufenthalt planen", language: "Sprache", notFound: "Seite nicht gefunden" },
  ar: { home: "الرئيسية", routes: "المسارات", places: "الأماكن", contact: "تواصل عبر واتساب", routeKicker: "نقل خاص", routeIntro: "أماكن يمكن زيارتها في الطريق", placeKicker: "محطة مقترحة", highlights: "ماذا تشاهد", planning: "التخطيط للتوقف", language: "اللغة", notFound: "الصفحة غير موجودة" },
};

export const homeTranslations = {
  ru: { title: "Трансфер из аэропорта Антальи — GoTransfer", description: "Индивидуальные трансферы из аэропорта Антальи в Белек, Аланию, Сиде, Кемер и другие курорты.", h1: "Индивидуальный трансфер из аэропорта Антальи", lead: "Встречаем в аэропорту и организуем комфортную поездку до отеля или выбранного курорта." },
  en: { title: "Antalya Airport Transfer — GoTransfer", description: "Private transfers from Antalya Airport to Belek, Alanya, Side, Kemer and other resorts.", h1: "Private transfer from Antalya Airport", lead: "We meet you at the airport and arrange a comfortable journey to your hotel or chosen resort." },
  tr: { title: "Antalya Havalimanı Transferi — GoTransfer", description: "Antalya Havalimanı'ndan Belek, Alanya, Side, Kemer ve diğer tatil beldelerine özel transfer.", h1: "Antalya Havalimanı'ndan özel transfer", lead: "Sizi havalimanında karşılıyor, otelinize veya seçtiğiniz tatil beldesine konforlu ulaşım sağlıyoruz." },
  de: { title: "Flughafentransfer Antalya — GoTransfer", description: "Private Transfers vom Flughafen Antalya nach Belek, Alanya, Side, Kemer und zu weiteren Urlaubsorten.", h1: "Privater Transfer vom Flughafen Antalya", lead: "Wir empfangen Sie am Flughafen und bringen Sie komfortabel zu Ihrem Hotel oder Urlaubsort." },
  ar: { title: "خدمة نقل من مطار أنطاليا — GoTransfer", description: "خدمة نقل خاصة من مطار أنطاليا إلى بيليك وألانيا وسيده وكيمر وغيرها من المنتجعات.", h1: "نقل خاص من مطار أنطاليا", lead: "نستقبلك في المطار وننظم لك رحلة مريحة إلى فندقك أو المنتجع الذي اخترته." },
};

// Only editorially approved translations belong here. Missing translations are
// deliberately not published or included in the sitemap.
export const routeTranslations = {
  kundu: {
    ru: {
      title: "Трансфер из аэропорта Анталии в Kundu — цена и время | GoTransfer",
      description: "Частный трансфер Antalya Airport — Kundu: около 17 км, ориентировочно 20–30 минут и минимальная цена по единому тарифу GoTransfer.",
      h1: "Трансфер из аэропорта Анталии в Kundu",
      lead: "Встречаем в аэропорту Анталии и отвозим прямо к вашему отелю в Kundu. Это один из ближайших к аэропорту гостиничных районов побережья.",
      sections: [
        { title: "Гостиничный район у моря", text: "Kundu известен крупными курортными комплексами с выразительной архитектурой, просторными территориями и удобным доступом к пляжам. Конкретный адрес отеля лучше указать при бронировании." },
        { title: "Отдых и покупки рядом", text: "Вдоль района расположены пляжные зоны, торговые галереи, магазины и места для прогулок. Состав заведений и часы работы могут меняться, поэтому актуальную информацию стоит уточнять перед посещением." },
        { title: "Кому подходит Kundu", text: "Район удобен семьям и туристам с детьми благодаря короткой дороге из аэропорта, парам, а также гостям, которые планируют большую часть отдыха провести на территории отеля и у моря." }
      ]
    },
    en: {
      title: "Antalya Airport to Kundu Transfer — Price and Time | GoTransfer",
      description: "Private Antalya Airport to Kundu transfer: about 17 km, approximately 20–30 minutes, with the minimum fare calculated from GoTransfer's shared tariff.",
      h1: "Private transfer from Antalya Airport to Kundu",
      lead: "Meet your driver at Antalya Airport and travel directly to your hotel in Kundu, one of the closest coastal hotel districts to the airport.",
      sections: [
        { title: "A coastal hotel district", text: "Kundu is known for large resort properties with distinctive architecture, spacious grounds and convenient beach access. Add your exact hotel address when booking." },
        { title: "Beaches and shopping", text: "The district includes beach areas, shopping galleries, stores and places for an evening walk. Businesses and opening hours may change, so check current details before visiting." },
        { title: "Who Kundu suits", text: "The short airport journey makes Kundu practical for families and guests travelling with children. It also suits couples and hotel guests planning a relaxed seaside stay." }
      ]
    },
    tr: {
      title: "Antalya Havalimanı Kundu Transferi — Fiyat ve Süre | GoTransfer",
      description: "Antalya Havalimanı'ndan Kundu'ya özel transfer: yaklaşık 17 km, tahmini 20–30 dakika ve GoTransfer ortak tarifesinden hesaplanan başlangıç fiyatı.",
      h1: "Antalya Havalimanı'ndan Kundu'ya özel transfer",
      lead: "Sizi Antalya Havalimanı'nda karşılıyor ve doğrudan Kundu'daki otelinize götürüyoruz. Kundu, havalimanına en yakın sahil otel bölgelerinden biridir.",
      sections: [
        { title: "Deniz kıyısında otel bölgesi", text: "Kundu; dikkat çekici mimariye, geniş alanlara ve plaja kolay erişime sahip büyük tatil tesisleriyle bilinir. Rezervasyonda otelinizin tam adresini belirtmeniz yeterlidir." },
        { title: "Plajlar ve alışveriş", text: "Bölgede plaj alanları, alışveriş galerileri, mağazalar ve yürüyüş yerleri bulunur. İşletmeler ve çalışma saatleri değişebileceği için ziyaret öncesinde güncel bilgileri kontrol edin." },
        { title: "Kundu kimler için uygun", text: "Kısa havalimanı yolculuğu nedeniyle aileler ve çocuklu misafirler için pratiktir. Çiftlere ve tatilinin çoğunu otelde ve deniz kenarında geçirmek isteyenlere de uygundur." }
      ]
    },
    de: {
      title: "Transfer vom Flughafen Antalya nach Kundu — Preis und Dauer | GoTransfer",
      description: "Privater Transfer vom Flughafen Antalya nach Kundu: etwa 17 km, ungefähr 20–30 Minuten und Mindestpreis nach dem gemeinsamen GoTransfer-Tarif.",
      h1: "Privater Transfer vom Flughafen Antalya nach Kundu",
      lead: "Wir empfangen Sie am Flughafen Antalya und bringen Sie direkt zu Ihrem Hotel in Kundu, einem der flughafennahen Hotelgebiete an der Küste.",
      sections: [
        { title: "Hotelgebiet am Meer", text: "Kundu ist für große Ferienanlagen mit markanter Architektur, weitläufigen Bereichen und bequemem Strandzugang bekannt. Geben Sie bei der Buchung die genaue Hoteladresse an." },
        { title: "Strände und Einkaufsmöglichkeiten", text: "Im Gebiet gibt es Strandbereiche, Einkaufsgalerien, Geschäfte und Wege für einen Spaziergang. Angebote und Öffnungszeiten können sich ändern; prüfen Sie aktuelle Angaben vor dem Besuch." },
        { title: "Für wen Kundu geeignet ist", text: "Die kurze Anfahrt ist praktisch für Familien und Reisende mit Kindern. Auch Paare und Hotelgäste, die einen ruhigen Aufenthalt am Meer planen, fühlen sich hier wohl." }
      ]
    },
    ar: {
      title: "نقل من مطار أنطاليا إلى Kundu — السعر والمدة | GoTransfer",
      description: "نقل خاص من مطار أنطاليا إلى Kundu: نحو 17 كم، ومدة تقريبية 20–30 دقيقة، وسعر يبدأ وفق تعرفة GoTransfer الموحدة.",
      h1: "نقل خاص من مطار أنطاليا إلى Kundu",
      lead: "نستقبلكم في مطار أنطاليا ونوصلكم مباشرة إلى فندقكم في Kundu، وهي من أقرب المناطق الفندقية الساحلية إلى المطار.",
      sections: [
        { title: "منطقة فندقية على البحر", text: "تشتهر Kundu بالمنتجعات الكبيرة ذات العمارة المميزة والمساحات الواسعة والوصول المريح إلى الشاطئ. يُفضّل إدخال عنوان الفندق الكامل عند الحجز." },
        { title: "الشواطئ والتسوق", text: "تضم المنطقة شواطئ وأروقة للتسوق ومتاجر وأماكن للتنزه. قد تتغير الأنشطة وساعات العمل، لذلك يُنصح بالتحقق من المعلومات الحالية قبل الزيارة." },
        { title: "لمن تناسب Kundu", text: "قصر الرحلة من المطار يجعل المنطقة مناسبة للعائلات والمسافرين مع الأطفال، كما تناسب الأزواج ونزلاء الفنادق الراغبين في عطلة هادئة قرب البحر." }
      ]
    }
  },
  alanya: {
    ru: { title: "Трансфер из аэропорта Антальи в Аланию с интересными остановками", description: "Индивидуальный трансфер из аэропорта Антальи в Аланию: крепость, канатная дорога, Красная башня, Димчай и другие остановки.", h1: "Трансфер из аэропорта Антальи в Аланию", lead: "Долгую поездку в Аланию можно превратить в индивидуальное путешествие и заранее выбрать интересные остановки.", sections: [{ title: "Алания по вашему маршруту", text: "Крепость, Красная башня, пещера Дамлаташ и набережная находятся рядом с основным направлением поездки." }, { title: "Остановки согласуются заранее", text: "Продолжительность и стоимость зависят от выбранных мест. Оператор подтвердит порядок остановок до поездки." }] },
    en: { title: "Antalya Airport to Alanya Transfer with Sightseeing Stops", description: "Private transfer from Antalya Airport to Alanya with optional stops at Alanya Castle, the Red Tower, Damlataş Cave and Dim River.", h1: "Private transfer from Antalya Airport to Alanya", lead: "Turn the longer journey to Alanya into a private trip with sightseeing stops selected in advance.", sections: [{ title: "Discover Alanya on your route", text: "Alanya Castle, the Red Tower, Damlataş Cave and the harbour can be included near the main transfer route." }, { title: "Stops arranged in advance", text: "Journey time and price depend on your selected places. The operator confirms the order of stops before departure." }] },
    tr: { title: "Antalya Havalimanı'ndan Alanya'ya Duraklı Özel Transfer", description: "Antalya Havalimanı'ndan Alanya'ya; Alanya Kalesi, Kızıl Kule, Damlataş Mağarası ve Dim Çayı duraklı özel transfer.", h1: "Antalya Havalimanı'ndan Alanya'ya özel transfer", lead: "Alanya'ya uzanan yolculuğu, önceden seçtiğiniz gezi duraklarıyla size özel bir rotaya dönüştürün.", sections: [{ title: "Rotanız üzerinde Alanya'yı keşfedin", text: "Alanya Kalesi, Kızıl Kule, Damlataş Mağarası ve liman ana transfer rotasına eklenebilir." }, { title: "Duraklar önceden planlanır", text: "Süre ve ücret seçilen yerlere bağlıdır. Operatör, durakların sırasını yolculuktan önce onaylar." }] },
    de: { title: "Transfer vom Flughafen Antalya nach Alanya mit Zwischenstopps", description: "Privater Transfer vom Flughafen Antalya nach Alanya mit möglichen Stopps an der Burg von Alanya, am Roten Turm, an der Damlataş-Höhle und am Dim-Fluss.", h1: "Privater Transfer vom Flughafen Antalya nach Alanya", lead: "Machen Sie aus der längeren Fahrt nach Alanya eine individuelle Reise mit vorab ausgewählten Besichtigungsstopps.", sections: [{ title: "Alanya entlang Ihrer Route entdecken", text: "Die Burg von Alanya, der Rote Turm, die Damlataş-Höhle und der Hafen lassen sich in die Transferroute einplanen." }, { title: "Zwischenstopps werden vorab vereinbart", text: "Fahrtdauer und Preis richten sich nach den gewählten Orten. Die Reihenfolge bestätigt der Kundenservice vor der Fahrt." }] },
    ar: { title: "نقل من مطار أنطاليا إلى ألانيا مع محطات سياحية", description: "نقل خاص من مطار أنطاليا إلى ألانيا مع إمكانية التوقف عند قلعة ألانيا والبرج الأحمر وكهف داملاتاش ونهر ديم.", h1: "نقل خاص من مطار أنطاليا إلى ألانيا", lead: "حوّل الرحلة الطويلة إلى ألانيا إلى جولة خاصة تتضمن محطات سياحية تختارها مسبقاً.", sections: [{ title: "اكتشف ألانيا على امتداد مسارك", text: "يمكن إضافة قلعة ألانيا والبرج الأحمر وكهف داملاتاش والميناء إلى مسار النقل الأساسي." }, { title: "يتم الاتفاق على المحطات مسبقاً", text: "تعتمد مدة الرحلة والتكلفة على الأماكن المختارة، ويؤكد فريق الخدمة ترتيب المحطات قبل الانطلاق." }] },
  },
};

export const placeTranslations = {
  kaleici: {
    ru: { title: "Калеичи: что посмотреть в старом городе Антальи", description: "Калеичи в Анталье: старая гавань, ворота Адриана, башня Хыдырлык, музеи и прогулка по историческим улицам.", h1: "Калеичи — старый город Антальи", lead: "Калеичи — исторический центр Антальи с узкими улицами, старой гаванью, османскими домами и живой вечерней атмосферой.", highlights: [{ title: "Старая гавань", text: "У причалов можно прогуляться среди яхт или выбрать короткую морскую прогулку." }, { title: "История и архитектура", text: "Главные ориентиры — ворота Адриана, башня Хыдырлык, минарет Йивли и старинные городские дома." }, { title: "Время на посещение", text: "Для спокойной прогулки стоит оставить не менее полутора часов." }] },
    en: { title: "Kaleiçi Old Town: What to See in Antalya", description: "Explore Kaleiçi in Antalya: the old harbour, Hadrian's Gate, Hıdırlık Tower, museums and historic streets.", h1: "Kaleiçi — Antalya's old town", lead: "Kaleiçi is Antalya's historic centre, known for narrow lanes, its old harbour, Ottoman houses and a lively evening atmosphere.", highlights: [{ title: "The old harbour", text: "Walk among the yachts at the marina or choose a short boat trip along the coast." }, { title: "History and architecture", text: "Key landmarks include Hadrian's Gate, Hıdırlık Tower, the Yivli Minaret and restored historic houses." }, { title: "Time for your visit", text: "Allow at least ninety minutes for an unhurried walk through the old town." }] },
    tr: { title: "Antalya Kaleiçi: Gezilecek Yerler", description: "Antalya Kaleiçi'nde eski limanı, Hadrian Kapısı'nı, Hıdırlık Kulesi'ni, müzeleri ve tarihi sokakları keşfedin.", h1: "Kaleiçi — Antalya'nın tarihi merkezi", lead: "Kaleiçi; dar sokakları, eski limanı, Osmanlı evleri ve canlı akşam atmosferiyle Antalya'nın tarihi merkezidir.", highlights: [{ title: "Eski liman", text: "Marinada yatların arasında yürüyebilir veya kıyı boyunca kısa bir tekne turuna çıkabilirsiniz." }, { title: "Tarih ve mimari", text: "Hadrian Kapısı, Hıdırlık Kulesi, Yivli Minare ve restore edilmiş tarihi evler öne çıkar." }, { title: "Ziyaret süresi", text: "Kaleiçi'ni acele etmeden gezmek için en az bir buçuk saat ayırın." }] },
    de: { title: "Kaleiçi in Antalya: Sehenswürdigkeiten der Altstadt", description: "Entdecken Sie Kaleiçi in Antalya mit dem alten Hafen, dem Hadrianstor, dem Hıdırlık-Turm, Museen und historischen Gassen.", h1: "Kaleiçi — die Altstadt von Antalya", lead: "Kaleiçi ist das historische Zentrum Antalyas mit engen Gassen, einem alten Hafen, osmanischen Häusern und lebendiger Abendatmosphäre.", highlights: [{ title: "Der alte Hafen", text: "Spazieren Sie zwischen den Jachten oder unternehmen Sie eine kurze Bootsfahrt entlang der Küste." }, { title: "Geschichte und Architektur", text: "Zu den wichtigsten Bauwerken gehören das Hadrianstor, der Hıdırlık-Turm, das Yivli-Minarett und restaurierte Altstadthäuser." }, { title: "Zeit für den Besuch", text: "Für einen entspannten Rundgang sollten Sie mindestens neunzig Minuten einplanen." }] },
    ar: { title: "كاليتشي في أنطاليا: دليل زيارة المدينة القديمة", description: "اكتشف كاليتشي في أنطاليا: الميناء القديم وبوابة هادريان وبرج هيديرليك والمتاحف والأزقة التاريخية.", h1: "كاليتشي — المدينة القديمة في أنطاليا", lead: "كاليتشي هي القلب التاريخي لأنطاليا، وتتميز بأزقتها الضيقة ومينائها القديم وبيوتها العثمانية وأجوائها المسائية النابضة بالحياة.", highlights: [{ title: "الميناء القديم", text: "يمكنك التنزه بين اليخوت أو القيام بجولة بحرية قصيرة على طول الساحل." }, { title: "التاريخ والعمارة", text: "من أبرز المعالم بوابة هادريان وبرج هيديرليك ومئذنة يفلي والبيوت التاريخية المرممة." }, { title: "مدة الزيارة", text: "خصص ساعة ونصف على الأقل للتجول بهدوء في المدينة القديمة." }] },
  },
};
