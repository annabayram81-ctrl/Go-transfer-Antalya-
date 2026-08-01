const languageMenu = document.querySelector("#servicesLanguageMenu");
const languageButton = document.querySelector("#servicesLanguageButton");
const languageButtonLabel = languageButton.querySelector("span");
const languageOptions = document.querySelectorAll("[data-services-language]");
const descriptionMeta = document.querySelector('meta[name="description"]');
const serviceCards = [...document.querySelectorAll(".service-card")];

const translations = {
  ru: {
    pageTitle: "VIP-услуги GoTransfer — выберите формат поездки",
    metaDescription:
      "Выберите формат индивидуальной VIP-поездки GoTransfer: трансфер, поездка с остановками, автомобиль с водителем или обслуживание особого события.",
    brandSubtitle: "VIP-поездки по Анталийскому побережью",
    homeLink: "Бронирование",
    languageLabel: "Язык",
    eyebrow: "VIP-услуги GoTransfer",
    title: "Выберите формат вашей поездки",
    subtitle:
      "Мы предлагаем несколько вариантов индивидуальных VIP-поездок. Выберите подходящий формат, чтобы узнать подробнее.",
    gridLabel: "Варианты VIP-поездок",
    cards: [
      {
        title: "Индивидуальный VIP-трансфер",
        description: "Комфортная поездка из аэропорта прямо до вашего отеля без остановок.",
        button: "Заказать трансфер",
        ariaLabel: "Заказать индивидуальный VIP-трансфер",
        imageAlt: "Индивидуальный VIP-трансфер на автомобиле бизнес-класса",
      },
      {
        title: "VIP-трансфер с остановками",
        description:
          "По дороге к месту назначения посетите интересные места, магазины, водопады, рестораны и другие достопримечательности.",
        button: "Выбрать направление",
        ariaLabel: "Выбрать направление VIP-трансфера с остановками",
        imageAlt: "VIP-трансфер с остановками по пути",
      },
      {
        title: "Однодневные VIP-путешествия по Анталийскому побережью",
        description:
          "Однодневные индивидуальные маршруты с персональным водителем: море, античные города, каньоны и святыни древней Ликии.",
        button: "Выбрать путешествие",
        ariaLabel: "Открыть однодневные VIP-путешествия по Анталийскому побережью",
        imageAlt: "Бирюзовое побережье — однодневные VIP-путешествия",
      },
      {
        title: "VIP-трансфер для бизнеса и особых случаев",
        description:
          "Представительский транспорт для свадеб, деловых мероприятий, VIP-гостей, яхт, ресторанов и индивидуальных путешествий.",
        button: "Выбрать услугу",
        ariaLabel: "Выбрать VIP-трансфер для бизнеса и особых случаев",
        imageAlt: "VIP-трансфер для бизнеса и особых случаев",
      },
    ],
  },
  en: {
    pageTitle: "GoTransfer VIP Services — Choose Your Journey",
    metaDescription:
      "Choose your GoTransfer VIP journey: a private transfer, a trip with stops, a chauffeur-driven car, or transport for a special occasion.",
    brandSubtitle: "VIP travel along the Antalya coast",
    homeLink: "Booking",
    languageLabel: "Language",
    eyebrow: "GoTransfer VIP Services",
    title: "Choose the format of your journey",
    subtitle:
      "We offer several types of private VIP journeys. Choose the option that suits you to learn more.",
    gridLabel: "VIP journey options",
    cards: [
      {
        title: "Private VIP transfer",
        description: "A comfortable non-stop journey from the airport directly to your hotel.",
        button: "Book a transfer",
        ariaLabel: "Book a private VIP transfer",
        imageAlt: "Private VIP transfer in a business-class car",
      },
      {
        title: "VIP transfer with stops",
        description:
          "Visit interesting places, shops, waterfalls, restaurants, and other attractions on the way to your destination.",
        button: "Choose a route",
        ariaLabel: "Choose a VIP transfer route with stops",
        imageAlt: "VIP transfer with stops along the way",
      },
      {
        title: "One-day VIP journeys along the Antalya coast",
        description:
          "Private day itineraries with a personal chauffeur: the sea, ancient cities, canyons, and the sacred heritage of Lycia.",
        button: "Choose a journey",
        ariaLabel: "Choose a private journey across Turkey",
        imageAlt: "Private VIP day journey along the Antalya coast",
      },
      {
        title: "VIP transport for business and special occasions",
        description:
          "Executive transport for weddings, business events, VIP guests, yachts, restaurants, and private journeys.",
        button: "Choose a service",
        ariaLabel: "Choose VIP transport for business and special occasions",
        imageAlt: "VIP transport for business and special occasions",
      },
    ],
  },
  tr: {
    pageTitle: "GoTransfer VIP Hizmetleri — Yolculuğunuzu Seçin",
    metaDescription:
      "GoTransfer VIP yolculuk seçeneklerinden birini seçin: özel transfer, duraklı yolculuk, şoförlü araç veya özel gün ulaşımı.",
    brandSubtitle: "Antalya sahilinde VIP yolculuklar",
    homeLink: "Rezervasyon",
    languageLabel: "Dil",
    eyebrow: "GoTransfer VIP Hizmetleri",
    title: "Yolculuk türünüzü seçin",
    subtitle:
      "Birkaç farklı kişiye özel VIP yolculuk seçeneği sunuyoruz. Ayrıntıları görmek için size uygun olanı seçin.",
    gridLabel: "VIP yolculuk seçenekleri",
    cards: [
      {
        title: "Özel VIP transfer",
        description: "Havalimanından otelinize duraksız ve konforlu bir yolculuk.",
        button: "Transfer rezervasyonu",
        ariaLabel: "Özel VIP transfer rezervasyonu yap",
        imageAlt: "Business sınıfı araçla özel VIP transfer",
      },
      {
        title: "Duraklı VIP transfer",
        description:
          "Varış noktanıza giderken ilgi çekici yerleri, mağazaları, şelaleleri, restoranları ve diğer turistik noktaları ziyaret edin.",
        button: "Rota seç",
        ariaLabel: "Duraklı VIP transfer rotası seç",
        imageAlt: "Yol üzerinde durakları olan VIP transfer",
      },
      {
        title: "Antalya kıyısında VIP yolculuklar",
        description:
          "Kişisel şoförle deniz, antik kentler, kanyonlar ve Likya'nın kutsal mirasına uzanan özel günübirlik rotalar.",
        button: "Yolculuk seç",
        ariaLabel: "Türkiye'de kişiye özel yolculuk seç",
        imageAlt: "Antalya sahilinde kişiye özel VIP günlük yolculuk",
      },
      {
        title: "İş ve özel günler için VIP transfer",
        description:
          "Düğünler, iş etkinlikleri, VIP misafirler, yatlar, restoranlar ve özel yolculuklar için prestijli ulaşım.",
        button: "Hizmet seç",
        ariaLabel: "İş ve özel günler için VIP transfer hizmeti seç",
        imageAlt: "İş ve özel günler için VIP transfer",
      },
    ],
  },
  de: {
    pageTitle:"GoTransfer VIP-Services — Reiseformat auswählen",metaDescription:"Wählen Sie Ihren privaten VIP-Service an der Küste von Antalya: Direkttransfer, Transfer mit Stopps, Tagesreise oder besonderer Fahrservice.",brandSubtitle:"VIP-Reisen an der Küste von Antalya",homeLink:"Buchung",languageLabel:"Sprache",eyebrow:"GoTransfer VIP-Services",title:"Wählen Sie das Format Ihrer Reise",subtitle:"Entdecken Sie private VIP-Fahrten mit persönlichem Service und einem Programm, das zu Ihren Wünschen passt.",gridLabel:"VIP-Reiseoptionen",
    cards:[
      {title:"Privater VIP-Transfer",description:"Komfortable Fahrt ohne Zwischenstopp vom Flughafen direkt zu Ihrem Hotel.",button:"Transfer buchen",ariaLabel:"Privaten VIP-Transfer buchen",imageAlt:"Privater VIP-Transfer mit Business-Class-Fahrzeug"},
      {title:"VIP-Transfer mit Stopps",description:"Besuchen Sie unterwegs Sehenswürdigkeiten, Geschäfte, Wasserfälle und ausgewählte Restaurants.",button:"Route auswählen",ariaLabel:"Route für VIP-Transfer mit Stopps auswählen",imageAlt:"VIP-Transfer mit individuellen Stopps"},
      {title:"VIP-Reisen an der Küste von Antalya",description:"Private Tagesrouten mit persönlichem Fahrer zu Meer, antiken Städten, Canyons und den Heiligtümern Lykiens.",button:"Reise auswählen",ariaLabel:"Private VIP-Tagesreise an der Küste von Antalya auswählen",imageAlt:"Private VIP-Tagesreise an der Küste von Antalya"},
      {title:"VIP-Fahrservice für Business und besondere Anlässe",description:"Repräsentativer Fahrservice für Hochzeiten, Geschäftstermine, VIP-Gäste, Yachten und besondere Abende.",button:"Service auswählen",ariaLabel:"VIP-Fahrservice für Business und besondere Anlässe auswählen",imageAlt:"VIP-Fahrservice für Business und besondere Anlässe"}
    ]
  },
  ar: {
    pageTitle:"خدمات GoTransfer لكبار الشخصيات — اختر نوع الرحلة",metaDescription:"اختر خدمة GoTransfer الخاصة على ساحل أنطاليا: نقل مباشر، رحلة مع محطات، رحلة يومية أو سيارة للمناسبات.",brandSubtitle:"رحلات كبار الشخصيات على ساحل أنطاليا",homeLink:"الحجز",languageLabel:"اللغة",eyebrow:"خدمات GoTransfer لكبار الشخصيات",title:"اختروا الشكل المناسب لرحلتكم",subtitle:"نقدّم خيارات خاصة مع خدمة شخصية وبرنامج مرن يناسب اهتماماتكم.",gridLabel:"خيارات رحلات كبار الشخصيات",
    cards:[
      {title:"نقل خاص لكبار الشخصيات",description:"رحلة مريحة ومباشرة من المطار إلى الفندق من دون توقف.",button:"احجز خدمة النقل",ariaLabel:"احجز خدمة نقل خاصة لكبار الشخصيات",imageAlt:"خدمة نقل خاصة بسيارة من فئة رجال الأعمال"},
      {title:"نقل خاص مع محطات",description:"زوروا المعالم والمتاجر والشلالات والمطاعم المختارة في طريقكم إلى الوجهة.",button:"اختر المسار",ariaLabel:"اختر مسار النقل الخاص مع محطات",imageAlt:"خدمة نقل خاصة مع محطات حسب الطلب"},
      {title:"رحلات كبار الشخصيات على ساحل أنطاليا",description:"رحلات يومية خاصة مع سائق شخصي إلى البحر والمدن الأثرية والأودية والمواقع المقدسة في ليكيا.",button:"اختر الرحلة",ariaLabel:"اختر رحلة يومية خاصة على ساحل أنطاليا",imageAlt:"رحلة يومية خاصة على ساحل أنطاليا"},
      {title:"نقل خاص للأعمال والمناسبات",description:"خدمة راقية لحفلات الزفاف والاجتماعات وضيوف كبار الشخصيات واليخوت والأمسيات الخاصة.",button:"اختر الخدمة",ariaLabel:"اختر خدمة النقل للأعمال والمناسبات",imageAlt:"خدمة نقل خاصة للأعمال والمناسبات"}
    ]
  },
};

function closeLanguageMenu() {
  languageMenu.classList.remove("is-open");
  languageButton.setAttribute("aria-expanded", "false");
}

function applyLanguage(language) {
  const selectedLanguage = translations[language] ? language : "ru";
  const copy = translations[selectedLanguage];

  document.documentElement.lang = selectedLanguage;
  document.documentElement.dir = selectedLanguage === "ar" ? "rtl" : "ltr";
  document.title = copy.pageTitle;
  descriptionMeta.setAttribute("content", copy.metaDescription);
  document.querySelector(".brand").setAttribute(
    "aria-label",
    selectedLanguage === "ru"
      ? "GoTransfer — главная"
      : selectedLanguage === "tr"
        ? "GoTransfer — ana sayfa"
        : "GoTransfer — home",
  );
  document.querySelector(".services-home-link").textContent = copy.homeLink;
  languageButton.setAttribute("aria-label", copy.languageLabel);
  languageButtonLabel.textContent = selectedLanguage === "ar" ? "AR" : selectedLanguage.toUpperCase();
  document.querySelector(".language-menu__list").setAttribute("aria-label", copy.languageLabel);
  document.querySelector(".services-intro__eyebrow").textContent = copy.eyebrow;
  document.querySelector("#servicesTitle").textContent = copy.title;
  document.querySelector(".services-intro__subtitle").textContent = copy.subtitle;
  document.querySelector(".services-grid").setAttribute("aria-label", copy.gridLabel);

  serviceCards.forEach((card, index) => {
    const cardCopy = copy.cards[index];
    card.setAttribute("aria-label", cardCopy.ariaLabel);
    card.querySelector("img").setAttribute("alt", cardCopy.imageAlt);
    card.querySelector("strong").textContent = cardCopy.title;
    card.querySelector(".service-card__description").textContent = cardCopy.description;
    card.querySelector(".service-card__button").textContent = cardCopy.button;
  });

  languageOptions.forEach((option) => {
    const isActive = option.dataset.servicesLanguage === selectedLanguage;
    option.classList.toggle("is-active", isActive);
    option.setAttribute("aria-selected", String(isActive));
  });

  localStorage.setItem("gotransfer-language", selectedLanguage);
  closeLanguageMenu();
}

languageButton.addEventListener("click", () => {
  const isOpen = languageMenu.classList.toggle("is-open");
  languageButton.setAttribute("aria-expanded", String(isOpen));
});

languageOptions.forEach((button) => {
  button.addEventListener("click", () => {
    applyLanguage(button.dataset.servicesLanguage);
  });
});

document.addEventListener("click", (event) => {
  if (!languageMenu.contains(event.target)) {
    closeLanguageMenu();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeLanguageMenu();
    languageButton.focus();
  }
});

window.addEventListener("gotransfer:languagechange",event=>applyLanguage(event.detail.language));
applyLanguage(window.GoTransferLocale?.get() || localStorage.getItem("gotransfer-language") || "ru");
