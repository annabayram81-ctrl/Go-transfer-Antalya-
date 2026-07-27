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
        title: "Автомобиль с личным водителем",
        description:
          "Автомобиль бизнес-класса с персональным водителем на несколько часов или на целый день.",
        button: "Подробнее",
        ariaLabel: "Подробнее об автомобиле с личным водителем",
        imageAlt: "Автомобиль бизнес-класса с личным водителем",
      },
      {
        title: "VIP-трансфер для бизнеса и особых случаев",
        description:
          "Деловые встречи, свадьбы, мероприятия, конференции, рестораны, яхты и индивидуальные поездки.",
        button: "Подробнее",
        ariaLabel: "Подробнее о VIP-трансфере для бизнеса и особых случаев",
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
        title: "Car with a private chauffeur",
        description:
          "A business-class car with a personal chauffeur for several hours or for the entire day.",
        button: "Learn more",
        ariaLabel: "Learn more about a car with a private chauffeur",
        imageAlt: "Business-class car with a private chauffeur",
      },
      {
        title: "VIP transport for business and special occasions",
        description:
          "Business meetings, weddings, events, conferences, restaurants, yachts, and private journeys.",
        button: "Learn more",
        ariaLabel: "Learn more about VIP transport for business and special occasions",
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
        title: "Özel şoförlü araç",
        description:
          "Birkaç saatliğine veya tüm gün boyunca kişisel şoförlü business sınıfı araç.",
        button: "Daha fazla bilgi",
        ariaLabel: "Özel şoförlü araç hakkında daha fazla bilgi",
        imageAlt: "Özel şoförlü business sınıfı araç",
      },
      {
        title: "İş ve özel günler için VIP transfer",
        description:
          "İş toplantıları, düğünler, etkinlikler, konferanslar, restoranlar, yatlar ve kişiye özel yolculuklar.",
        button: "Daha fazla bilgi",
        ariaLabel: "İş ve özel günler için VIP transfer hakkında daha fazla bilgi",
        imageAlt: "İş ve özel günler için VIP transfer",
      },
    ],
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
  languageButtonLabel.textContent = selectedLanguage.toUpperCase();
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

applyLanguage(localStorage.getItem("gotransfer-language") || "ru");

