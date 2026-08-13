import { STANDARD_TARIFF_TIER } from "./pricing.js";

const config = {
  whatsappPhone: "905346801828",
  telegramUsername: "AnnaBayram07",
  locations: [
    {
      id: "ayt",
      name: "Antalya Airport",
      names: { ru: "Аэропорт Антальи", en: "Antalya Airport", tr: "Antalya Havalimanı" },
      airport: true,
    },
    { id: "lara", name: "Lara", prices: [35, 40, 45] },
    { id: "kundu", name: "Kundu", prices: [35, 40, 45] },
    { id: "belek", name: "Belek", prices: [40, 45, 50] },
    { id: "bogazkent", name: "Boğazkent", prices: [45, 50, 55] },
    { id: "colakli", name: "Çolaklı", prices: [50, 55, 60] },
    { id: "side", name: "Side", prices: [55, 60, 65] },
    { id: "sorgun", name: "Sorgun", prices: [55, 60, 65] },
    { id: "kizilot", name: "Kızılot", prices: [65, 70, 75] },
    { id: "okurcalar", name: "Okurcalar", prices: [70, 75, 80] },
    { id: "incikum", name: "İncekum", prices: [70, 75, 80] },
    { id: "avsallar", name: "Avsallar", prices: [70, 75, 80] },
    { id: "turkler", name: "Türkler", prices: [75, 80, 85] },
    { id: "konakli", name: "Konaklı", prices: [75, 80, 85] },
    { id: "alanya", name: "Alanya", prices: [80, 85, 90] },
    { id: "mahmutlar", name: "Mahmutlar", prices: [95, 100, 105] },
    { id: "gazipasa", name: "Gazipaşa", prices: [120, 130, 140] },
    { id: "konyaalti", name: "Konyaaltı", prices: [35, 40, 45] },
    { id: "beldibi", name: "Beldibi", prices: [50, 55, 60] },
    { id: "goynuk", name: "Göynük", prices: [50, 55, 60] },
    { id: "kemer", name: "Kemer", prices: [55, 60, 65] },
    { id: "kiris", name: "Kiriş", prices: [60, 65, 70] },
    { id: "camyuva", name: "Çamyuva", prices: [60, 65, 70] },
    { id: "tekirova", name: "Tekirova", prices: [65, 70, 75] },
    { id: "adrasan", name: "Adrasan", prices: [80, 85, 90] },
  ],
  tariffTiers: [
    STANDARD_TARIFF_TIER,
    { label: "4-6 пассажиров", min: 4, max: 6, priceIndex: 1, base: 28.35, perKm: 0.503 },
    { label: "7-9 пассажиров", min: 7, max: 9, priceIndex: 2, base: 32.57, perKm: 0.515 },
    { label: "10-20 пассажиров", min: 10, max: 20, priceIndex: 2, base: 32.57, perKm: 0.515, extraPassengerRate: 0.2 },
  ],
};

const quickPlaces = {
  ayt: {
    id: "quick-antalya-airport",
    googlePlaceId: "quick-antalya-airport",
    displayName: "Antalya Airport",
    names: { ru: "Аэропорт Антальи", en: "Antalya Airport", tr: "Antalya Havalimanı" },
    formattedAddress: "Antalya Havalimanı, Antalya, Türkiye",
    location: { latitude: 36.8987, longitude: 30.8005 },
    types: ["airport"],
  },
  gzp: {
    id: "quick-gazipasa-airport",
    googlePlaceId: "quick-gazipasa-airport",
    displayName: "Gazipaşa Airport",
    names: { ru: "Аэропорт Газипаша", en: "Gazipaşa Airport", tr: "Gazipaşa Havalimanı" },
    formattedAddress: "Gazipaşa-Alanya Havalimanı, Antalya, Türkiye",
    location: { latitude: 36.2993, longitude: 32.3006 },
    types: ["airport"],
  },
};

const routeMatrixIds = [
  "ayt",
  "lara",
  "kundu",
  "belek",
  "bogazkent",
  "colakli",
  "side",
  "sorgun",
  "kizilot",
  "okurcalar",
  "incikum",
  "avsallar",
  "turkler",
  "konakli",
  "alanya",
  "mahmutlar",
  "gazipasa",
  "konyaalti",
  "beldibi",
  "goynuk",
  "kemer",
  "kiris",
  "camyuva",
  "tekirova",
  "adrasan",
];

// Driving distances from OSRM table service, rounded to 0.1 km.
const routeDistancesKm = [
  [0,15.3,17.1,33,41,57.1,66.9,71.2,88.4,97.4,103.4,105.2,111,116.2,126.6,138.1,170.4,23.3,46.8,52.9,60.6,67.7,66.7,75.2,108],
  [16.2,0,4,20.6,32.7,55.4,65.1,69.5,86.6,95.6,101.6,103.5,109.3,114.4,124.8,136.3,168.7,25,51.2,57.3,64.9,72,71.1,79.5,112.3],
  [18.1,5.5,0,17.6,29.7,52.3,62.1,66.4,83.5,92.6,98.5,100.4,106.2,111.3,121.8,133.3,165.6,26.9,53,59.1,66.8,73.9,73,81.4,114.2],
  [33.8,22.2,17.7,0,12.1,34.5,44.2,48.6,65.7,74.7,80.7,82.6,88.4,93.5,103.9,115.4,147.8,49,71.8,77.9,85.6,92.7,91.7,100.2,132.9],
  [41.8,34.3,29.7,12.1,0,31.8,41.5,45.9,63,72,78,79.9,85.7,90.8,101.2,112.7,145.1,57,79.8,85.9,93.6,100.7,99.7,108.2,140.9],
  [58,55.9,51.4,34.8,32.1,0,12.7,19.6,36.7,45.8,51.7,53.6,59.4,64.5,75,86.5,118.8,73.3,96,102.1,109.8,116.9,116,124.4,157.2],
  [67.8,65.7,61.2,44.6,41.9,12.8,0,9.1,27.3,36.3,42.3,44.2,50,55.1,65.5,77,109.4,83.1,105.8,111.9,119.6,126.7,125.8,134.2,167],
  [72.2,70.1,65.6,49,46.3,19.8,9.3,0,25.4,34.5,40.4,42.3,48.1,53.2,63.7,75.2,107.5,87.5,110.2,116.3,124,131.1,130.2,138.6,171.4],
  [89,86.9,82.4,65.8,63.1,36.6,27.7,23.9,0,16.9,22.8,24.7,30.5,35.6,46.1,57.6,89.9,104.3,127,133.1,140.8,147.9,147,155.4,188.2],
  [98.1,96,91.5,74.8,72.2,45.7,36.7,33,16.8,0,7.8,9.7,15.5,20.6,31.1,42.6,74.9,113.4,136.1,142.2,149.9,157,156,164.5,197.2],
  [103.7,101.6,97.1,80.4,77.8,51.3,42.3,38.6,22.4,7.4,0,1.6,8.7,13.8,24.3,35.7,68.1,119,141.7,147.8,155.5,162.6,161.6,170.1,202.8],
  [105.2,103.1,98.6,82,79.3,52.9,43.9,40.1,23.9,8.9,2,0,8.3,13.4,23.9,35.3,67.7,120.5,143.2,149.4,157,164.1,163.2,171.6,204.4],
  [111.8,109.7,105.1,88.5,85.8,59.4,50.4,46.6,30.4,15.5,8.5,8.6,0,7.3,17.7,29.2,61.6,127,149.8,155.9,163.5,170.6,169.7,178.1,210.9],
  [116.2,114.1,109.6,92.9,90.2,63.8,54.8,51.1,34.8,19.9,13,13,6.6,0,12.7,24.2,56.6,131.4,154.2,160.3,168,175.1,174.1,182.6,215.3],
  [126.9,124.8,120.3,103.7,101,74.5,65.6,61.8,45.6,30.6,23.7,23.8,17.3,11.9,0,12.5,44.8,142.2,164.9,171,178.7,185.8,184.9,193.3,226.1],
  [138.5,136.4,131.8,115.2,112.5,86.1,77.1,73.4,57.1,42.2,35.2,35.3,28.9,23.4,12.1,0,33.7,153.7,176.5,182.6,190.3,197.3,196.4,204.8,237.6],
  [170.9,168.8,164.3,147.6,144.9,118.5,109.5,105.8,89.5,74.6,67.7,67.7,61.3,55.8,44.5,32.9,0,186.1,208.9,215,222.7,229.8,228.8,237.3,270],
  [24.3,25.6,27.4,49.5,57.6,73.7,83.4,87.8,104.9,113.9,119.9,121.8,127.6,132.7,143.1,154.6,187,0,23.7,29.8,37.5,44.6,43.6,52.1,84.8],
  [50.3,54.6,56.5,75.5,83.6,99.7,109.4,113.7,130.9,139.9,145.9,147.8,153.6,158.7,169.1,180.6,213,26.7,0,6.1,13.8,20.9,19.9,28.4,61.1],
  [52.7,57.1,58.9,77.9,86,102.1,111.9,116.2,133.3,142.3,148.3,150.2,156,161.1,171.5,183,215.4,29.1,10.3,0,8.7,15.8,14.9,23.3,56.1],
  [60.7,65.1,66.9,85.9,94,110.1,119.9,124.2,141.3,150.3,156.3,158.2,164,169.1,179.5,191,223.4,37.1,18.3,9.9,0,6.7,7.4,15.9,48.6],
  [67.4,71.7,73.5,92.6,100.6,116.7,126.5,130.8,147.9,157,162.9,164.8,170.6,175.7,186.2,197.7,230,43.8,25,16.6,8.5,0,5.8,14.3,47],
  [66.4,70.8,72.6,91.6,99.7,115.8,125.6,129.9,147,156,162,163.9,169.7,174.8,185.2,196.7,229.1,42.8,24,15.6,7.5,5.6,0,9.9,42.6],
  [75,79.3,81.1,100.1,108.2,124.3,134.1,138.4,155.5,164.6,170.5,172.4,178.2,183.3,193.8,205.3,237.6,51.4,32.5,24.2,16.1,14.2,9.7,0,35.6],
  [107.8,112.1,113.9,133,141,157.1,166.9,171.2,188.3,197.4,203.3,205.2,211,216.1,226.6,238.1,270.4,84.2,65.3,57,48.9,47,42.5,35.5,0],
];

globalThis.GoTransferRouteCatalog = Object.freeze({
  locations: config.locations,
  tariffTiers: config.tariffTiers,
  routeMatrixIds,
  routeDistancesKm,
  supplementalDistancesKm: Object.freeze({ kas: 203.5 }),
  getDistanceFromAirport(destinationId) {
    const destinationIndex = routeMatrixIds.indexOf(destinationId);
    return destinationIndex >= 0 ? routeDistancesKm[0]?.[destinationIndex] ?? null : this.supplementalDistancesKm[destinationId] ?? null;
  },
});

const translations = {
  ru: {
    pageTitle: "GoTransfer — частный трансфер по Анталийскому побережью",
    metaDescription: "Заказ трансфера по Анталье и курортным локациям региона.",
    menuLabel: "Открыть меню",
    languageLabel: "Язык",
    languageMenuLabel: "Выбрать язык",
    brandTagline: "Трансфер по Анталийскому побережью",
    serviceCta: "Выбрать путешествие",
    eyebrow: "Трансфер по Анталийскому побережью",
    heroLead: "Частный трансфер по Анталийскому побережью.",
    routeKicker: "Маршрут",
    bookingTitle: "Рассчитать стоимость",
    payOnArrivalBadge: "Оплата по факту",
    swapRoute: "Поменять откуда и куда",
    fromLabel: "Откуда",
    toLabel: "Куда",
    quickHotel: "Отель",
    quickClinic: "Клиника",
    quickAttraction: "Достопримечательность",
    dateLabel: "Дата",
    timeLabel: "Время",
    hoursLabel: "Часы",
    minutesLabel: "Минуты",
    openTimePicker: "Выбрать время",
    passengersLabel: "Пассажиры",
    adultLabel: "Взрослые",
    childrenLabel: "Дети",
    changeChildren: "Изменить",
    childrenSheetNote: "Дети входят в общее количество пассажиров. Кресла и бустеры добавляются в заявку для менеджера.",
    infantSeatTitle: "Автолюлька",
    infantSeatText: "До 10 кг, до 6 месяцев",
    childSeatTitle: "Автокресло",
    childSeatText: "9–25 кг, 0–7 лет",
    boosterSeatTitle: "Бустер",
    boosterSeatText: "22–36 кг, 6–12 лет",
    childAgeLabel: "Возраст ребенка",
    childAgePrefix: "Ребенок",
    noChildren: "без детей",
    childOne: "ребенок",
    childFew: "ребенка",
    childMany: "детей",
    childAgeYears: "лет",
    childAgeUnderOne: "до 1 года",
    childAgeTeen: "13+ лет",
    childSeats: "Детские кресла",
    childSeat: "детское кресло",
    boosterSeat: "бустер",
    noChildSeat: "без кресла",
    priceLabel: "Стоимость",
    chooseRoute: "Выберите маршрут",
    chooseDifferent: "Выберите разные локации",
    selectGooglePlace: "Выберите маршрут",
    routeCalculating: "Считаем расстояние по дороге...",
    routeUnavailable: "Не удалось построить маршрут. Попробуйте другое место или напишите нам.",
    clearFrom: "Очистить откуда",
    clearTo: "Очистить куда",
    searchPlaceholder: "Начните вводить отель, клинику или место",
    searchNoResults: "Ничего не найдено",
    searchError: "Поиск сейчас недоступен. Проверьте интернет или напишите нам.",
    whatsappAction: "Связаться с оператором в WhatsApp",
    telegramAction: "Связаться с оператором в Telegram",
    detailPriceTitle: "Понятная цена",
    detailPriceText: "Расчет виден до перехода в WhatsApp и остается основой для договоренности.",
    detailCurrencyTitle: "Любая валюта",
    detailCurrencyText: "Оплату можно согласовать в удобной валюте после общения с русскоязычным менеджером.",
    detailFlightTitle: "Встретим вовремя",
    detailFlightText: "Даже если самолет опоздает, мы дождемся вас и встретим после прилета.",
    detailExperienceTitle: "5 лет на рынке",
    detailExperienceText: "Опытная команда организует трансферы по Анталье и курортам региона каждый день.",
    installTitle: "Установить GoTransfer",
    installText: "Добавьте сайт на экран телефона и открывайте как приложение.",
    installIosText: "На iPhone нажмите «Поделиться», затем выберите «На экран Домой».",
    installAndroidText: "На Android нажмите меню Chrome ⋮ и выберите «Установить приложение» или «Добавить на главный экран».",
    installAction: "Установить",
    installHowTo: "Как установить",
    installDone: "Понятно",
    dismissInstall: "Закрыть",
    privacyPolicy: "Политика конфиденциальности",
    passengerOne: "1 пассажир",
    passengerFew: "пассажира",
    passengerMany: "пассажиров",
    totalPassengers: "Всего",
    payOnArrivalShort: "оплата по факту",
    tariffPrefix: "тариф",
    quickWhatsappMessage: "Здравствуйте! Хочу уточнить трансфер GoTransfer.",
    whatsappGreeting: "Здравствуйте! Хочу заказать трансфер.",
    whatsappRoute: "Маршрут",
    whatsappDistance: "Расстояние по маршруту",
    whatsappDateTime: "Дата и время",
    whatsappPassengers: "Пассажиры",
    whatsappAdults: "Взрослые",
    whatsappChildren: "Дети",
    whatsappChildSeats: "Детские кресла/бустеры",
    whatsappPrice: "Стоимость",
    whatsappFrom: "Откуда",
    whatsappTo: "Куда",
    whatsappAddress: "Адрес",
    whatsappPlaceId: "Google Place ID",
    notSpecified: "не указана",
    dateLocale: "ru-RU",
    dateFormatOptions: {
      day: "numeric",
      month: "long",
      year: "numeric",
    },
    distanceUnit: "км",
  },
  en: {
    pageTitle: "GoTransfer — Private transfers along the Antalya coast",
    metaDescription: "Book a private transfer in Antalya and popular resort locations.",
    menuLabel: "Open menu",
    languageLabel: "Language",
    languageMenuLabel: "Choose language",
    brandTagline: "Transfers along the Antalya coast",
    serviceCta: "Choose your journey",
    eyebrow: "Transfers along the Antalya coast",
    heroLead: "Private transfers along the Antalya coast.",
    routeKicker: "Route",
    bookingTitle: "Calculate the price",
    payOnArrivalBadge: "Pay on arrival",
    swapRoute: "Swap pickup and destination",
    fromLabel: "From",
    toLabel: "To",
    quickHotel: "Hotel",
    quickClinic: "Clinic",
    quickAttraction: "Attraction",
    dateLabel: "Date",
    timeLabel: "Time",
    hoursLabel: "Hours",
    minutesLabel: "Minutes",
    openTimePicker: "Choose time",
    passengersLabel: "Passengers",
    adultLabel: "Adults",
    childrenLabel: "Children",
    changeChildren: "Change",
    childrenSheetNote: "Children are included in the total passenger count. Seats and boosters are added to the request for the manager.",
    infantSeatTitle: "Infant carrier",
    infantSeatText: "Up to 10 kg, up to 6 months",
    childSeatTitle: "Child seat",
    childSeatText: "9–25 kg, 0–7 years",
    boosterSeatTitle: "Booster",
    boosterSeatText: "22–36 kg, 6–12 years",
    childAgeLabel: "Child age",
    childAgePrefix: "Child",
    noChildren: "no children",
    childOne: "child",
    childFew: "children",
    childMany: "children",
    childAgeYears: "years",
    childAgeUnderOne: "under 1 year",
    childAgeTeen: "13+ years",
    childSeats: "Child seats",
    childSeat: "child seat",
    boosterSeat: "booster",
    noChildSeat: "no seat",
    priceLabel: "Price",
    chooseRoute: "Choose a route",
    chooseDifferent: "Choose two different locations",
    selectGooglePlace: "Choose a route",
    routeCalculating: "Calculating road distance...",
    routeUnavailable: "We could not build this route. Try another place or contact us.",
    clearFrom: "Clear pickup",
    clearTo: "Clear destination",
    searchPlaceholder: "Start typing a hotel, clinic, or place",
    searchNoResults: "No places found",
    searchError: "Search is temporarily unavailable. Check your connection or message us.",
    whatsappAction: "Contact an operator in WhatsApp",
    telegramAction: "Contact an operator in Telegram",
    detailPriceTitle: "Clear price",
    detailPriceText: "You see the estimate before opening WhatsApp, and it stays as the basis for confirmation.",
    detailCurrencyTitle: "Any currency",
    detailCurrencyText: "Payment can be agreed in a convenient currency after speaking with a Russian-speaking manager.",
    detailFlightTitle: "We will wait",
    detailFlightText: "Even if your flight is delayed, we will wait and meet you after arrival.",
    detailExperienceTitle: "5 years on the market",
    detailExperienceText: "An experienced team arranges transfers across Antalya and nearby resorts every day.",
    installTitle: "Install GoTransfer",
    installText: "Add the site to your phone screen and open it like an app.",
    installIosText: "On iPhone, tap Share, then choose Add to Home Screen.",
    installAndroidText: "On Android, open the Chrome menu ⋮ and choose Install app or Add to Home screen.",
    installAction: "Install",
    installHowTo: "How to install",
    installDone: "Got it",
    dismissInstall: "Close",
    privacyPolicy: "Privacy Policy",
    passengerOne: "1 passenger",
    passengerFew: "passengers",
    passengerMany: "passengers",
    totalPassengers: "Total",
    payOnArrivalShort: "pay on arrival",
    tariffPrefix: "tier",
    quickWhatsappMessage: "Hello! I would like to ask about a GoTransfer transfer.",
    whatsappGreeting: "Hello! I would like to book a transfer.",
    whatsappRoute: "Route",
    whatsappDistance: "Route distance",
    whatsappDateTime: "Date and time",
    whatsappPassengers: "Passengers",
    whatsappAdults: "Adults",
    whatsappChildren: "Children",
    whatsappChildSeats: "Child seats/boosters",
    whatsappPrice: "Price",
    whatsappFrom: "From",
    whatsappTo: "To",
    whatsappAddress: "Address",
    whatsappPlaceId: "Google Place ID",
    notSpecified: "not specified",
    dateLocale: "en-US",
    dateFormatOptions: {
      month: "long",
      day: "numeric",
      year: "numeric",
    },
    distanceUnit: "km",
  },
  de: {
    pageTitle:"GoTransfer — Private Transfers an der Küste von Antalya",
    metaDescription:"Privaten Transfer in Antalya und zu beliebten Urlaubsorten buchen.",menuLabel:"Menü öffnen",languageLabel:"Sprache",languageMenuLabel:"Sprache auswählen",brandTagline:"Transfers an der Küste von Antalya",serviceCta:"Reise auswählen",eyebrow:"Transfers an der Küste von Antalya",heroLead:"Private Transfers an der Küste von Antalya.",routeKicker:"Route",bookingTitle:"Preis berechnen",payOnArrivalBadge:"Zahlung bei Ankunft",swapRoute:"Abholort und Ziel tauschen",fromLabel:"Von",toLabel:"Nach",quickHotel:"Hotel",quickClinic:"Klinik",quickAttraction:"Sehenswürdigkeit",dateLabel:"Datum",timeLabel:"Uhrzeit",hoursLabel:"Stunden",minutesLabel:"Minuten",openTimePicker:"Uhrzeit auswählen",passengersLabel:"Fahrgäste",adultLabel:"Erwachsene",childrenLabel:"Kinder",changeChildren:"Ändern",
    childrenSheetNote:"Kinder zählen zur Gesamtzahl der Fahrgäste. Kindersitze und Sitzerhöhungen werden der Anfrage hinzugefügt.",infantSeatTitle:"Babyschale",infantSeatText:"Bis 10 kg, bis 6 Monate",childSeatTitle:"Kindersitz",childSeatText:"9–25 kg, 0–7 Jahre",boosterSeatTitle:"Sitzerhöhung",boosterSeatText:"22–36 kg, 6–12 Jahre",childAgeLabel:"Alter des Kindes",childAgePrefix:"Kind",noChildren:"keine Kinder",childOne:"Kind",childFew:"Kinder",childMany:"Kinder",childAgeYears:"Jahre",childAgeUnderOne:"unter 1 Jahr",childAgeTeen:"13+ Jahre",childSeats:"Kindersitze",childSeat:"Kindersitz",boosterSeat:"Sitzerhöhung",noChildSeat:"kein Sitz",
    priceLabel:"Preis",chooseRoute:"Route auswählen",chooseDifferent:"Wählen Sie zwei verschiedene Orte",selectGooglePlace:"Route auswählen",routeCalculating:"Straßenentfernung wird berechnet …",routeUnavailable:"Diese Route konnte nicht erstellt werden. Wählen Sie einen anderen Ort oder kontaktieren Sie uns.",clearFrom:"Abholort löschen",clearTo:"Ziel löschen",searchPlaceholder:"Hotel, Klinik oder Ort eingeben",searchNoResults:"Keine Orte gefunden",searchError:"Die Suche ist vorübergehend nicht verfügbar. Prüfen Sie Ihre Verbindung oder schreiben Sie uns.",whatsappAction:"Operator über WhatsApp kontaktieren",telegramAction:"Operator über Telegram kontaktieren",
    detailPriceTitle:"Transparenter Preis",detailPriceText:"Sie sehen die Schätzung vor dem Wechsel zu WhatsApp; sie dient als Grundlage für die Bestätigung.",detailCurrencyTitle:"Flexible Währung",detailCurrencyText:"Die Zahlung kann nach Rücksprache mit dem Operator in einer passenden Währung vereinbart werden.",detailFlightTitle:"Wir warten auf Sie",detailFlightText:"Auch bei Flugverspätung warten wir und begrüßen Sie nach der Ankunft.",detailExperienceTitle:"5 Jahre Erfahrung",detailExperienceText:"Unser erfahrenes Team organisiert täglich Transfers in Antalya und den Ferienorten der Region.",installTitle:"GoTransfer installieren",installText:"Fügen Sie die Website zum Startbildschirm hinzu und öffnen Sie sie wie eine App.",installIosText:"Tippen Sie auf dem iPhone auf Teilen und dann auf Zum Home-Bildschirm.",installAndroidText:"Öffnen Sie auf Android das Chrome-Menü ⋮ und wählen Sie App installieren oder Zum Startbildschirm hinzufügen.",installAction:"Installieren",installHowTo:"Installationshilfe",installDone:"Verstanden",dismissInstall:"Schließen",privacyPolicy:"Datenschutzerklärung",
    passengerOne:"1 Fahrgast",passengerFew:"Fahrgäste",passengerMany:"Fahrgäste",totalPassengers:"Gesamt",payOnArrivalShort:"Zahlung bei Ankunft",tariffPrefix:"Tarif",quickWhatsappMessage:"Guten Tag! Ich möchte mich nach einem GoTransfer-Transfer erkundigen.",whatsappGreeting:"Guten Tag! Ich möchte einen Transfer buchen.",whatsappRoute:"Route",whatsappDistance:"Streckenlänge",whatsappDateTime:"Datum und Uhrzeit",whatsappPassengers:"Fahrgäste",whatsappAdults:"Erwachsene",whatsappChildren:"Kinder",whatsappChildSeats:"Kindersitze/Sitzerhöhungen",whatsappPrice:"Preis",whatsappFrom:"Von",whatsappTo:"Nach",whatsappAddress:"Adresse",whatsappPlaceId:"Google Place ID",notSpecified:"nicht angegeben",dateLocale:"de-DE",dateFormatOptions:{day:"numeric",month:"long",year:"numeric"},distanceUnit:"km"
  },
  ar: {
    pageTitle:"GoTransfer — خدمة نقل خاصة على ساحل أنطاليا",
    metaDescription:"احجز خدمة نقل خاصة في أنطاليا وإلى أشهر المنتجعات.",menuLabel:"فتح القائمة",languageLabel:"اللغة",languageMenuLabel:"اختيار اللغة",brandTagline:"خدمة نقل على طول ساحل أنطاليا",serviceCta:"اختر الرحلة",eyebrow:"خدمة نقل على طول ساحل أنطاليا",heroLead:"خدمة نقل خاصة على طول ساحل أنطاليا.",routeKicker:"المسار",bookingTitle:"احسب التكلفة",payOnArrivalBadge:"الدفع عند الوصول",swapRoute:"تبديل نقطة الانطلاق والوجهة",fromLabel:"من",toLabel:"إلى",quickHotel:"فندق",quickClinic:"عيادة",quickAttraction:"معلم سياحي",dateLabel:"التاريخ",timeLabel:"الوقت",hoursLabel:"الساعات",minutesLabel:"الدقائق",openTimePicker:"اختيار الوقت",passengersLabel:"الركاب",adultLabel:"البالغون",childrenLabel:"الأطفال",changeChildren:"تعديل",
    childrenSheetNote:"يُحتسب الأطفال ضمن العدد الإجمالي للركاب، وتُضاف مقاعد الأطفال إلى طلب الحجز.",infantSeatTitle:"مقعد للرضيع",infantSeatText:"حتى 10 كغ، وحتى 6 أشهر",childSeatTitle:"مقعد طفل",childSeatText:"9–25 كغ، من 0 إلى 7 سنوات",boosterSeatTitle:"مقعد رافع",boosterSeatText:"22–36 كغ، من 6 إلى 12 سنة",childAgeLabel:"عمر الطفل",childAgePrefix:"الطفل",noChildren:"من دون أطفال",childOne:"طفل",childFew:"أطفال",childMany:"أطفال",childAgeYears:"سنوات",childAgeUnderOne:"أقل من سنة",childAgeTeen:"13 سنة فأكثر",childSeats:"مقاعد الأطفال",childSeat:"مقعد طفل",boosterSeat:"مقعد رافع",noChildSeat:"من دون مقعد",
    priceLabel:"التكلفة",chooseRoute:"اختر المسار",chooseDifferent:"يرجى اختيار موقعين مختلفين",selectGooglePlace:"اختر المسار",routeCalculating:"جارٍ حساب المسافة على الطريق…",routeUnavailable:"تعذر إنشاء هذا المسار. جرّبوا مكاناً آخر أو تواصلوا معنا.",clearFrom:"مسح نقطة الانطلاق",clearTo:"مسح الوجهة",searchPlaceholder:"ابدؤوا بكتابة اسم الفندق أو العيادة أو المكان",searchNoResults:"لم يتم العثور على أماكن",searchError:"البحث غير متاح مؤقتاً. تحققوا من الاتصال أو راسلونا.",whatsappAction:"تواصل مع مسؤول الحجز عبر WhatsApp",telegramAction:"تواصل مع مسؤول الحجز عبر Telegram",
    detailPriceTitle:"سعر واضح",detailPriceText:"يظهر التقدير قبل الانتقال إلى WhatsApp ويُعتمد أساساً لتأكيد الحجز.",detailCurrencyTitle:"عملة مناسبة",detailCurrencyText:"يمكن الاتفاق مع مسؤول الحجز على الدفع بالعملة المناسبة.",detailFlightTitle:"سننتظركم",detailFlightText:"حتى عند تأخر الرحلة الجوية، سننتظركم ونستقبلكم بعد الوصول.",detailExperienceTitle:"خبرة خمس سنوات",detailExperienceText:"ينظم فريقنا يومياً خدمات النقل في أنطاليا ومنتجعات المنطقة.",installTitle:"تثبيت GoTransfer",installText:"أضيفوا الموقع إلى شاشة الهاتف وافتحوه مثل التطبيق.",installIosText:"على iPhone اضغطوا مشاركة ثم اختاروا إضافة إلى الشاشة الرئيسية.",installAndroidText:"على Android افتحوا قائمة Chrome ⋮ ثم اختاروا تثبيت التطبيق أو الإضافة إلى الشاشة الرئيسية.",installAction:"تثبيت",installHowTo:"طريقة التثبيت",installDone:"حسناً",dismissInstall:"إغلاق",privacyPolicy:"سياسة الخصوصية",
    passengerOne:"راكب واحد",passengerFew:"ركاب",passengerMany:"ركاب",totalPassengers:"الإجمالي",payOnArrivalShort:"الدفع عند الوصول",tariffPrefix:"الفئة",quickWhatsappMessage:"مرحباً، أود الاستفسار عن خدمة النقل من GoTransfer.",whatsappGreeting:"مرحباً، أود حجز خدمة نقل.",whatsappRoute:"المسار",whatsappDistance:"مسافة المسار",whatsappDateTime:"التاريخ والوقت",whatsappPassengers:"الركاب",whatsappAdults:"البالغون",whatsappChildren:"الأطفال",whatsappChildSeats:"مقاعد الأطفال",whatsappPrice:"التكلفة",whatsappFrom:"من",whatsappTo:"إلى",whatsappAddress:"العنوان",whatsappPlaceId:"معرّف المكان في Google",notSpecified:"غير محدد",dateLocale:"ar",dateFormatOptions:{day:"numeric",month:"long",year:"numeric"},distanceUnit:"كم"
  },
  tr: {
    pageTitle:"GoTransfer — Antalya kıyısında özel transfer",
    metaDescription: "Antalya ve popüler tatil bölgeleri için özel transfer rezervasyonu.",
    menuLabel: "Menüyü aç",
    languageLabel: "Dil",
    languageMenuLabel: "Dil seç",
    brandTagline: "Antalya sahili boyunca transfer",
    serviceCta: "Yolculuğunu seç",
    eyebrow: "Antalya sahili boyunca transfer",
    heroLead: "Antalya sahili boyunca özel transfer.",
    routeKicker: "Rota",
    bookingTitle: "Fiyat hesapla",
    payOnArrivalBadge: "Ödeme transferden sonra",
    swapRoute: "Nereden ve nereye alanlarını değiştir",
    fromLabel: "Nereden",
    toLabel: "Nereye",
    quickHotel: "Otel",
    quickClinic: "Klinik",
    quickAttraction: "Gezilecek yer",
    dateLabel: "Tarih",
    timeLabel: "Saat",
    hoursLabel: "Saat",
    minutesLabel: "Dakika",
    openTimePicker: "Saat seç",
    passengersLabel: "Yolcu",
    adultLabel: "Yetişkin",
    childrenLabel: "Çocuk",
    changeChildren: "Değiştir",
    childrenSheetNote: "Çocuklar toplam yolcu sayısına dahildir. Koltuklar ve yükselticiler yöneticiye gönderilen talebe eklenir.",
    infantSeatTitle: "Ana kucağı",
    infantSeatText: "10 kg'a kadar, 6 aya kadar",
    childSeatTitle: "Çocuk koltuğu",
    childSeatText: "9–25 kg, 0–7 yaş",
    boosterSeatTitle: "Yükseltici",
    boosterSeatText: "22–36 kg, 6–12 yaş",
    childAgeLabel: "Çocuk yaşı",
    childAgePrefix: "Çocuk",
    noChildren: "çocuk yok",
    childOne: "çocuk",
    childFew: "çocuk",
    childMany: "çocuk",
    childAgeYears: "yaş",
    childAgeUnderOne: "1 yaş altı",
    childAgeTeen: "13+ yaş",
    childSeats: "Çocuk koltukları",
    childSeat: "çocuk koltuğu",
    boosterSeat: "yükseltici",
    noChildSeat: "koltuk gerekmez",
    priceLabel: "Fiyat",
    chooseRoute: "Rota seçin",
    chooseDifferent: "İki farklı konum seçin",
    selectGooglePlace: "Rota seçin",
    routeCalculating: "Yol mesafesi hesaplanıyor...",
    routeUnavailable: "Bu rota oluşturulamadı. Başka bir yer deneyin veya bize yazın.",
    clearFrom: "Kalkış noktasını temizle",
    clearTo: "Varış noktasını temizle",
    searchPlaceholder: "Otel, klinik veya yer yazmaya başlayın",
    searchNoResults: "Yer bulunamadı",
    searchError: "Arama geçici olarak kullanılamıyor. İnternet bağlantınızı kontrol edin veya bize yazın.",
    whatsappAction: "WhatsApp'ta operatörle iletişime geç",
    telegramAction: "Telegram'da operatörle iletişime geç",
    detailPriceTitle: "Net fiyat",
    detailPriceText: "Hesaplama WhatsApp'a geçmeden önce görünür ve anlaşma için temel olur.",
    detailCurrencyTitle: "Her para birimi",
    detailCurrencyText: "Ödeme, Rusça konuşan bir yetkiliyle görüştükten sonra uygun para biriminde kararlaştırılabilir.",
    detailFlightTitle: "Sizi bekleriz",
    detailFlightText: "Uçağınız gecikse bile sizi bekler ve varıştan sonra karşılarız.",
    detailExperienceTitle: "Piyasada 5 yıl",
    detailExperienceText: "Deneyimli ekip Antalya ve çevresindeki tatil bölgelerinde her gün transfer düzenler.",
    installTitle: "GoTransfer'i yükleyin",
    installText: "Siteyi telefon ekranınıza ekleyin ve uygulama gibi açın.",
    installIosText: "iPhone'da Paylaş'a dokunun, ardından Ana Ekrana Ekle'yi seçin.",
    installAndroidText: "Android'de Chrome menüsünü ⋮ açın ve Uygulamayı yükle ya da Ana ekrana ekle seçeneğini seçin.",
    installAction: "Yükle",
    installHowTo: "Nasıl yüklenir",
    installDone: "Tamam",
    dismissInstall: "Kapat",
    privacyPolicy: "Gizlilik Politikası",
    passengerOne: "1 yolcu",
    passengerFew: "yolcu",
    passengerMany: "yolcu",
    totalPassengers: "Toplam",
    payOnArrivalShort: "ödeme transferden sonra",
    tariffPrefix: "tarife",
    quickWhatsappMessage: "Merhaba! GoTransfer transferi hakkında bilgi almak istiyorum.",
    whatsappGreeting: "Merhaba! Transfer rezervasyonu yapmak istiyorum.",
    whatsappRoute: "Rota",
    whatsappDistance: "Rota mesafesi",
    whatsappDateTime: "Tarih ve saat",
    whatsappPassengers: "Yolcu",
    whatsappAdults: "Yetişkin",
    whatsappChildren: "Çocuk",
    whatsappChildSeats: "Çocuk koltuğu/yükseltici",
    whatsappPrice: "Fiyat",
    whatsappFrom: "Nereden",
    whatsappTo: "Nereye",
    whatsappAddress: "Adres",
    whatsappPlaceId: "Google Place ID",
    notSpecified: "belirtilmedi",
    dateLocale: "tr-TR",
    dateFormatOptions: {
      day: "numeric",
      month: "long",
      year: "numeric",
    },
    distanceUnit: "km",
  },
};

let currentLanguage = getInitialLanguage();

const elements = {
  fromSearch: document.querySelector("#fromSearch"),
  toSearch: document.querySelector("#toSearch"),
  clearPlaceButtons: document.querySelectorAll("[data-clear-place]"),
  fromPlaceId: document.querySelector("#fromPlaceId"),
  toPlaceId: document.querySelector("#toPlaceId"),
  fromResults: document.querySelector("#fromResults"),
  toResults: document.querySelector("#toResults"),
  quickPlaces: document.querySelectorAll("[data-quick-place]"),
  placeTypes: document.querySelectorAll("[data-place-type]"),
  date: document.querySelector("#rideDate"),
  dateDisplay: document.querySelector("#rideDateDisplay"),
  time: document.querySelector("#rideTime"),
  timeHour: document.querySelector("#rideTimeHour"),
  timeMinute: document.querySelector("#rideTimeMinute"),
  passengers: document.querySelector("#passengers"),
  adultsCount: document.querySelector("#adultsCount"),
  adultMinus: document.querySelector("#adultMinus"),
  adultPlus: document.querySelector("#adultPlus"),
  openChildrenSheet: document.querySelector("#openChildrenSheet"),
  childrenSummary: document.querySelector("#childrenSummary"),
  childSheet: document.querySelector("#childSheet"),
  closeChildrenSheet: document.querySelector("#closeChildrenSheet"),
  doneChildrenSheet: document.querySelector("#doneChildrenSheet"),
  childSeatControls: document.querySelectorAll("[data-child-seat][data-step]"),
  childSeatValues: document.querySelectorAll("[data-child-seat-value]"),
  swap: document.querySelector("#swapRoute"),
  price: document.querySelector("#price"),
  meta: document.querySelector("#routeMeta"),
  whatsapp: document.querySelector("#whatsappLink"),
  telegram: document.querySelector("#telegramLink"),
  quickWhatsapp: document.querySelector("#quickWhatsapp"),
  quickTelegram: document.querySelector("#quickTelegram"),
  languageMenu: document.querySelector("#languageMenu"),
  languageMenuButton: document.querySelector("#languageMenuButton"),
  currentLanguageCode: document.querySelector("#currentLanguageCode"),
  languageOptions: document.querySelectorAll("[data-language-option]"),
  installBanner: document.querySelector("#installBanner"),
  installText: document.querySelector("#installText"),
  installButton: document.querySelector("#installButton"),
  dismissInstall: document.querySelector("#dismissInstall"),
  hero: document.querySelector(".hero"),
  heroVideo: document.querySelector("#heroVideo"),
  translatable: document.querySelectorAll("[data-i18n]"),
  ariaTranslatable: document.querySelectorAll("[data-i18n-aria]"),
  metaDescription: document.querySelector("#metaDescription"),
};

const selectedPlaces = {
  from: null,
  to: null,
};

const searchState = {
  from: { timer: null, controller: null },
  to: { timer: null, controller: null },
};

let activePlaceField = "to";
let activePlaceType = "";
let adultsCount = 2;
const childSeatCounts = {
  infant: 0,
  child: 0,
  booster: 0,
};
let routeState = {
  key: "",
  status: "idle",
  distanceKm: null,
  duration: null,
  polyline: null,
};

const euroFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

function init() {
  setDefaultDateTime();
  setSelectedPlace("from", quickPlaces.ayt);
  clearSelectedPlace("to");
  updatePassengerControls();
  elements.quickTelegram.href = buildTelegramLink();
  elements.telegram.href = buildTelegramLink();
  bindEvents();
  bindHeroVideo();
  registerServiceWorker();
  setupInstallPrompt();
  applyTranslations();
  updateQuote();
}

function setDefaultDateTime() {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);
  tomorrow.setMinutes(0, 0, 0);

  elements.date.min = formatDate(now);
  elements.date.value = formatDate(tomorrow);
  elements.time.value = "10:00";
  updateDateDisplay();
  updateTimeSegments();
}

function bindEvents() {
  elements.date.addEventListener("click", () => {
    if (typeof elements.date.showPicker === "function") {
      elements.date.showPicker();
    }
  });
  elements.date.addEventListener("change", updateQuote);
  elements.time.addEventListener("click", () => {
    if (typeof elements.time.showPicker === "function") {
      elements.time.showPicker();
    }
  });
  elements.time.addEventListener("change", () => {
    updateTimeSegments();
    updateQuote();
  });
  elements.timeHour.addEventListener("input", () => handleTimeSegmentInput(elements.timeHour, 23, elements.timeMinute));
  elements.timeMinute.addEventListener("input", () => handleTimeSegmentInput(elements.timeMinute, 59));
  elements.timeHour.addEventListener("blur", commitTimeSegments);
  elements.timeMinute.addEventListener("blur", commitTimeSegments);
  elements.adultMinus.addEventListener("click", () => changeAdults(-1));
  elements.adultPlus.addEventListener("click", () => changeAdults(1));
  elements.openChildrenSheet.addEventListener("click", openChildrenSheet);
  elements.closeChildrenSheet.addEventListener("click", closeChildrenSheet);
  elements.doneChildrenSheet.addEventListener("click", closeChildrenSheet);
  elements.childSheet.addEventListener("click", (event) => {
    if (event.target.matches("[data-close-child-sheet]")) {
      closeChildrenSheet();
    }
  });
  elements.childSeatControls.forEach((button) => {
    button.addEventListener("click", () => changeChildSeat(button.dataset.childSeat, Number(button.dataset.step)));
  });
  elements.fromSearch.addEventListener("focus", () => setActivePlaceField("from"));
  elements.toSearch.addEventListener("focus", () => setActivePlaceField("to"));
  elements.fromSearch.addEventListener("input", () => handlePlaceInput("from"));
  elements.toSearch.addEventListener("input", () => handlePlaceInput("to"));
  elements.clearPlaceButtons.forEach((button) => {
    button.addEventListener("click", () => clearPlaceField(button.dataset.clearPlace));
  });

  elements.languageMenuButton.addEventListener("click", toggleLanguageMenu);

  elements.languageOptions.forEach((button) => {
    button.addEventListener("click", () => {
      window.GoTransferLocale?.set(button.dataset.languageOption,{notify:false});
      setLanguage(button.dataset.languageOption);
      closeLanguageMenu();
    });
  });

  document.addEventListener("click", (event) => {
    if (!elements.languageMenu.contains(event.target)) {
      closeLanguageMenu();
    }

    if (!event.target.closest(".place-field")) {
      closePlaceResults("from");
      closePlaceResults("to");
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeLanguageMenu();
    }
  });

  elements.swap.addEventListener("click", () => {
    const from = selectedPlaces.from;
    selectedPlaces.from = selectedPlaces.to;
    selectedPlaces.to = from;
    updatePlaceInput("from");
    updatePlaceInput("to");
    resetRouteState();
    updateQuote();
  });

  elements.quickPlaces.forEach((button) => {
    button.addEventListener("click", () => {
      const quickPlace = quickPlaces[button.dataset.quickPlace];

      if (!quickPlace) {
        return;
      }

      setSelectedPlace(activePlaceField, quickPlace);
      updateQuote();
    });
  });

  elements.placeTypes.forEach((button) => {
    button.addEventListener("click", () => {
      activePlaceType = button.dataset.placeType === activePlaceType ? "" : button.dataset.placeType;
      updatePlaceTypeButtons();
      getSearchInput(activePlaceField).focus();
      handlePlaceInput(activePlaceField);
    });
  });
}

function setActivePlaceField(field) {
  activePlaceField = field;
}

function getSearchInput(field) {
  return field === "from" ? elements.fromSearch : elements.toSearch;
}

function getPlaceIdInput(field) {
  return field === "from" ? elements.fromPlaceId : elements.toPlaceId;
}

function getResultsBox(field) {
  return field === "from" ? elements.fromResults : elements.toResults;
}

function handlePlaceInput(field) {
  setActivePlaceField(field);
  selectedPlaces[field] = null;
  getPlaceIdInput(field).value = "";
  getSearchInput(field).closest(".place-field")?.classList.toggle("has-value", Boolean(getSearchInput(field).value.trim()));
  resetRouteState();
  updateQuote();

  window.clearTimeout(searchState[field].timer);
  searchState[field].timer = window.setTimeout(() => searchPlaces(field), 280);
}

async function searchPlaces(field) {
  const input = getSearchInput(field).value.trim();
  const resultsBox = getResultsBox(field);

  if (input.length < 2) {
    closePlaceResults(field);
    return;
  }

  if (searchState[field].controller) {
    searchState[field].controller.abort();
  }

  const controller = new AbortController();
  searchState[field].controller = controller;

  try {
    const response = await fetch("/api/place-autocomplete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input, language: currentLanguage, placeType: activePlaceType }),
      signal: controller.signal,
    });
    const payload = await response.json();

    if (!response.ok) {
      throw new Error(payload.message || payload.error || "search_failed");
    }

    renderPlaceResults(field, payload.suggestions || []);
  } catch (error) {
    if (error.name === "AbortError") {
      return;
    }

    resultsBox.hidden = false;
    resultsBox.innerHTML = `<div class="place-results__empty">${t("searchError")}</div>`;
  }
}

function renderPlaceResults(field, suggestions) {
  const resultsBox = getResultsBox(field);

  resultsBox.hidden = false;

  if (!suggestions.length) {
    resultsBox.innerHTML = `<div class="place-results__empty">${t("searchNoResults")}</div>`;
    return;
  }

  resultsBox.innerHTML = suggestions
    .map(
      (suggestion, index) => `
        <button class="place-result" type="button" role="option" data-place-index="${index}">
          <strong>${escapeHtml(suggestion.mainText || suggestion.text)}</strong>
          <span>${escapeHtml(suggestion.secondaryText || suggestion.text)}</span>
        </button>
      `,
    )
    .join("");

  resultsBox.querySelectorAll("[data-place-index]").forEach((button) => {
    button.addEventListener("click", () => selectPlaceSuggestion(field, suggestions[Number(button.dataset.placeIndex)]));
  });
}

async function selectPlaceSuggestion(field, suggestion) {
  closePlaceResults(field);
  getSearchInput(field).value = suggestion.mainText || suggestion.text;

  try {
    const response = await fetch("/api/place-details", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ placeId: suggestion.placeId, language: currentLanguage }),
    });
    const payload = await response.json();

    if (!response.ok) {
      throw new Error(payload.message || payload.error || "details_failed");
    }

    setSelectedPlace(field, normalizePlace(payload.place));
    updateQuote();
  } catch (error) {
    selectedPlaces[field] = null;
    getPlaceIdInput(field).value = "";
    elements.meta.textContent = t("searchError");
    updateQuote();
  }
}

function normalizePlace(place) {
  return {
    id: place.id,
    googlePlaceId: place.id,
    displayName: place.displayName,
    formattedAddress: place.formattedAddress,
    location: place.location,
    types: place.types || [],
  };
}

function setSelectedPlace(field, place) {
  selectedPlaces[field] = place;
  updatePlaceInput(field);
  closePlaceResults(field);
  resetRouteState();
}

function clearSelectedPlace(field) {
  selectedPlaces[field] = null;
  updatePlaceInput(field);
}

function clearPlaceField(field) {
  selectedPlaces[field] = null;
  getSearchInput(field).value = "";
  getPlaceIdInput(field).value = "";
  closePlaceResults(field);
  resetRouteState();
  updatePlaceInput(field);
  updateQuote();
  getSearchInput(field).focus();
}

function updatePlaceInput(field) {
  const input = getSearchInput(field);
  const placeIdInput = getPlaceIdInput(field);
  const place = selectedPlaces[field];

  input.value = place ? getPlaceDisplayName(place) : "";
  input.placeholder = t("searchPlaceholder");
  placeIdInput.value = place?.googlePlaceId || "";
  input.closest(".place-field")?.classList.toggle("has-value", Boolean(input.value.trim()));
}

function closePlaceResults(field) {
  const resultsBox = getResultsBox(field);
  resultsBox.hidden = true;
  resultsBox.innerHTML = "";
}

function updatePlaceTypeButtons() {
  elements.placeTypes.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.placeType === activePlaceType);
  });
}

function resetRouteState() {
  routeState = {
    key: "",
    status: "idle",
    distanceKm: null,
    duration: null,
    polyline: null,
  };
}

function enforcePassengerLimit() {
  adultsCount = clamp(adultsCount, 1, 20);
  trimChildrenToLimit();
  updatePassengerControls();
}

function changeAdults(delta) {
  adultsCount = clamp(adultsCount + delta, 1, 20 - getChildrenTotal());
  updatePassengerControls();
  updateQuote();
}

function changeChildSeat(type, delta) {
  const current = childSeatCounts[type] || 0;
  const nextTotal = getPassengerTotal() + delta;

  if (delta > 0 && nextTotal > 20) {
    return;
  }

  childSeatCounts[type] = clamp(current + delta, 0, 20);
  updatePassengerControls();
  updateQuote();
}

function trimChildrenToLimit() {
  let overflow = getPassengerTotal() - 20;
  const order = ["booster", "child", "infant"];

  order.forEach((type) => {
    if (overflow <= 0) {
      return;
    }

    const reduction = Math.min(childSeatCounts[type], overflow);
    childSeatCounts[type] -= reduction;
    overflow -= reduction;
  });
}

function openChildrenSheet() {
  elements.childSheet.hidden = false;
  document.body.classList.add("has-child-sheet");
}

function closeChildrenSheet() {
  elements.childSheet.hidden = true;
  document.body.classList.remove("has-child-sheet");
}

function updatePassengerControls() {
  const total = getPassengerTotal();
  elements.passengers.value = String(total);
  elements.adultsCount.textContent = String(adultsCount);
  elements.adultMinus.disabled = adultsCount <= 1;
  elements.adultPlus.disabled = total >= 20;
  elements.childrenSummary.textContent = formatChildrenSummary(getChildrenDetails());
  elements.childSeatValues.forEach((value) => {
    value.textContent = String(childSeatCounts[value.dataset.childSeatValue] || 0);
  });

  elements.childSeatControls.forEach((button) => {
    const type = button.dataset.childSeat;
    const step = Number(button.dataset.step);
    button.disabled = step < 0 ? (childSeatCounts[type] || 0) <= 0 : getPassengerTotal() >= 20;
  });
}

function toggleLanguageMenu() {
  const isOpen = elements.languageMenu.classList.toggle("is-open");
  elements.languageMenuButton.setAttribute("aria-expanded", String(isOpen));
}

function closeLanguageMenu() {
  elements.languageMenu.classList.remove("is-open");
  elements.languageMenuButton.setAttribute("aria-expanded", "false");
}

function bindHeroVideo() {
  const video = elements.heroVideo;

  if (!video) {
    return;
  }

  let targetTime = 0;
  let rafId = 0;

  video.addEventListener("loadedmetadata", () => {
    elements.hero.classList.add("is-video-ready");
    video.pause();
    video.currentTime = 0;
    targetTime = 0;
  });

  const playVideo = () => {
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = 0;
    }

    video.play().catch(() => {});
  };

  const pauseVideo = () => {
    video.pause();
  };

  elements.hero.addEventListener("pointerdown", (event) => {
    if (!window.matchMedia("(pointer: coarse)").matches || event.target.closest("a, button, input, select, textarea")) {
      return;
    }

    playVideo();
  });

  ["pointerup", "pointercancel", "pointerleave"].forEach((eventName) => {
    elements.hero.addEventListener(eventName, pauseVideo);
  });

  elements.hero.addEventListener(
    "wheel",
    (event) => {
      if (!window.matchMedia("(pointer: fine)").matches || !Number.isFinite(video.duration) || !video.duration) {
        return;
      }

      event.preventDefault();
      video.pause();
      const direction = Math.abs(event.deltaY) >= Math.abs(event.deltaX) ? event.deltaY : event.deltaX;
      targetTime = clamp(targetTime + direction * 0.0032, 0, Math.max(0, video.duration - 0.04));

      if (!rafId) {
        rafId = requestAnimationFrame(scrubVideo);
      }
    },
    { passive: false },
  );

  function scrubVideo() {
    const diff = targetTime - video.currentTime;

    if (Math.abs(diff) < 0.018) {
      video.currentTime = targetTime;
      rafId = 0;
      return;
    }

    video.currentTime = clamp(video.currentTime + diff * 0.22, 0, Math.max(0, video.duration - 0.04));
    rafId = requestAnimationFrame(scrubVideo);
  }
}

function updateQuote() {
  updateDateDisplay();
  const routeReady = ensureRouteState();
  const quote = routeReady ? calculateQuote() : null;
  const valid = Boolean(quote);

  elements.whatsapp.classList.toggle("is-disabled", !valid);
  elements.whatsapp.setAttribute("aria-disabled", String(!valid));

  if (!valid) {
    elements.price.textContent = "€0";
    elements.meta.textContent = getQuoteStatusText();
    elements.whatsapp.href = "#";
    return;
  }

  elements.price.textContent = euroFormatter.format(quote.price);
  elements.meta.textContent = `${getPlaceDisplayName(quote.from)} → ${getPlaceDisplayName(quote.to)}, ${formatPassengerSummary(quote.passengers)}, ${formatDistance(quote.distanceKm)}`;
  elements.whatsapp.href = buildWhatsappLink(quote);
}

function getQuoteStatusText() {
  if (!selectedPlaces.from || !selectedPlaces.to) {
    return "";
  }

  if (getPlaceKey(selectedPlaces.from) === getPlaceKey(selectedPlaces.to)) {
    return t("chooseDifferent");
  }

  if (routeState.status === "loading") {
    return t("routeCalculating");
  }

  if (routeState.status === "error") {
    return t("routeUnavailable");
  }

  return "";
}

function ensureRouteState() {
  const from = selectedPlaces.from;
  const to = selectedPlaces.to;

  if (!from || !to || getPlaceKey(from) === getPlaceKey(to)) {
    return false;
  }

  const key = `${getPlaceKey(from)}:${getPlaceKey(to)}`;

  if (routeState.key === key && routeState.status === "ready") {
    return true;
  }

  if (routeState.key === key && routeState.status === "loading") {
    return false;
  }

  routeState = {
    key,
    status: "loading",
    distanceKm: null,
    duration: null,
    polyline: null,
  };
  fetchRoute(key, from, to);
  return false;
}

async function fetchRoute(key, from, to) {
  try {
    const response = await fetch("/api/route", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ origin: from, destination: to, language: currentLanguage }),
    });
    const payload = await response.json();

    if (!response.ok) {
      throw new Error(payload.message || payload.error || "route_failed");
    }

    if (routeState.key !== key) {
      return;
    }

    routeState = {
      key,
      status: "ready",
      distanceKm: payload.distanceKm,
      duration: payload.duration,
      polyline: payload.polyline,
    };
  } catch (error) {
    if (routeState.key === key) {
      routeState = {
        key,
        status: "error",
        distanceKm: null,
        duration: null,
        polyline: null,
      };
    }
  }

  updateQuote();
}

function calculateQuote() {
  const from = selectedPlaces.from;
  const to = selectedPlaces.to;
  const passengers = getPassengerTotal();
  const children = getChildrenDetails();
  const tariffTier = getTariffTier(passengers);
  const distanceKm = routeState.distanceKm;

  if (!from || !to || getPlaceKey(from) === getPlaceKey(to) || !tariffTier || !distanceKm) {
    return null;
  }

  const price = calculatePrice(tariffTier, distanceKm, passengers);

  return {
    from,
    to,
    adults: adultsCount,
    passengers,
    children,
    tariffTier,
    distanceKm,
    date: elements.date.value,
    time: elements.time.value,
    price,
  };
}

function buildWhatsappLink(quote) {
  const message = [
    t("whatsappGreeting"),
    `${t("whatsappRoute")}: ${getPlaceDisplayName(quote.from)} → ${getPlaceDisplayName(quote.to)}`,
    `${t("whatsappFrom")}: ${getPlaceDisplayName(quote.from)}`,
    `${t("whatsappAddress")}: ${quote.from.formattedAddress || t("notSpecified")}`,
    `${t("whatsappPlaceId")}: ${quote.from.googlePlaceId || quote.from.id || t("notSpecified")}`,
    `${t("whatsappTo")}: ${getPlaceDisplayName(quote.to)}`,
    `${t("whatsappAddress")}: ${quote.to.formattedAddress || t("notSpecified")}`,
    `${t("whatsappPlaceId")}: ${quote.to.googlePlaceId || quote.to.id || t("notSpecified")}`,
    `${t("whatsappDistance")}: ${formatDistance(quote.distanceKm)}`,
    `${t("whatsappDateTime")}: ${formatHumanDate(quote.date)} ${quote.time}`,
    `${t("whatsappPassengers")}: ${quote.passengers}`,
    `${t("whatsappAdults")}: ${quote.adults}`,
    `${t("whatsappChildren")}: ${formatChildren(quote.children)}`,
    `${t("whatsappChildSeats")}: ${formatChildSeats(quote.children)}`,
    `${t("whatsappPrice")}: ${euroFormatter.format(quote.price)}`,
  ].join("\n");

  return `https://wa.me/${config.whatsappPhone}?text=${encodeURIComponent(message)}`;
}

function buildQuickWhatsappLink() {
  const message = t("quickWhatsappMessage");
  return `https://wa.me/${config.whatsappPhone}?text=${encodeURIComponent(message)}`;
}

function buildTelegramLink() {
  return `https://t.me/${config.telegramUsername}`;
}

function getPlaceDisplayName(place) {
  return place?.names?.[currentLanguage] || place?.displayName || "";
}

function getPlaceKey(place) {
  return place?.googlePlaceId || place?.id || `${place?.location?.latitude},${place?.location?.longitude}`;
}

function getTariffTier(passengers) {
  return config.tariffTiers.find((tier) => passengers >= tier.min && passengers <= tier.max);
}

function calculatePrice(tariffTier, distanceKm, passengers) {
  return globalThis.GoTransferPricing.calculateTransferPrice(tariffTier, distanceKm, passengers);
}

function getRouteDistanceKm(fromId, toId) {
  const fromIndex = routeMatrixIds.indexOf(fromId);
  const toIndex = routeMatrixIds.indexOf(toId);

  if (fromIndex < 0 || toIndex < 0) {
    return null;
  }

  return routeDistancesKm[fromIndex]?.[toIndex] ?? null;
}

function formatPassengers(count) {
  const labels = translations[currentLanguage];

  if (count === 1) {
    return labels.passengerOne;
  }

  if (currentLanguage === "ru" && count >= 2 && count <= 4) {
    return `${count} ${labels.passengerFew}`;
  }

  return `${count} ${labels.passengerMany}`;
}

function formatPassengerSummary(count) {
  const tariffTier = getTariffTier(count);
  const tariffLabel = tariffTier ? `${t("tariffPrefix")} ${tariffTier.min}-${tariffTier.max}` : "";

  return [`${t("totalPassengers")}: ${formatPassengers(count)}`, tariffLabel].filter(Boolean).join(" · ");
}

function getChildrenDetails() {
  return [
    { type: "infant", count: childSeatCounts.infant, titleKey: "infantSeatTitle" },
    { type: "child", count: childSeatCounts.child, titleKey: "childSeatTitle" },
    { type: "booster", count: childSeatCounts.booster, titleKey: "boosterSeatTitle" },
  ].filter((item) => item.count > 0);
}

function formatChildren(children) {
  if (!children.length) {
    return t("noChildren");
  }

  return children.map((item) => `${t(item.titleKey)}: ${item.count}`).join(", ");
}

function formatChildrenSummary(children) {
  const count = children.reduce((sum, item) => sum + item.count, 0);

  if (!count) {
    return currentLanguage === "ru" ? "0 детей" : `0 ${translations[currentLanguage].childMany}`;
  }

  if (currentLanguage === "ru") {
    if (count === 1) {
      return "1 ребенок";
    }

    if (count >= 2 && count <= 4) {
      return `${count} ребенка`;
    }

    return `${count} детей`;
  }

  return `${count} ${count === 1 ? translations[currentLanguage].childOne : translations[currentLanguage].childMany}`;
}

function formatChildSeats(children) {
  if (!children.length) {
    return t("noChildren");
  }

  return formatChildren(children);
}

function getChildrenTotal() {
  return childSeatCounts.infant + childSeatCounts.child + childSeatCounts.booster;
}

function getPassengerTotal() {
  return adultsCount + getChildrenTotal();
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function roundToFive(value) {
  return Math.ceil(value / 5) * 5;
}

function escapeHtml(value) {
  return String(value || "").replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };

    return entities[character];
  });
}

function formatDistance(distanceKm) {
  return `${distanceKm.toFixed(1)} ${t("distanceUnit")}`;
}

function formatDate(date) {
  return date.toISOString().slice(0, 10);
}

function formatHumanDate(value) {
  if (!value) {
    return t("notSpecified");
  }

  return new Intl.DateTimeFormat(t("dateLocale"), t("dateFormatOptions")).format(new Date(`${value}T12:00:00`));
}

function handleTimeSegmentInput(input, max, nextInput) {
  input.value = input.value.replace(/\D/g, "").slice(0, 2);

  if (input.value.length === 2) {
    input.value = String(Math.min(max, Number(input.value))).padStart(2, "0");

    if (nextInput) {
      nextInput.focus();
      nextInput.select();
    }
  }

  syncTimeFromSegments();
}

function commitTimeSegments() {
  const [fallbackHour = "10", fallbackMinute = "00"] = elements.time.value.split(":");
  const hour = Math.min(23, Math.max(0, Number(elements.timeHour.value || fallbackHour)));
  const minute = Math.min(59, Math.max(0, Number(elements.timeMinute.value || fallbackMinute)));

  elements.timeHour.value = String(hour).padStart(2, "0");
  elements.timeMinute.value = String(minute).padStart(2, "0");
  elements.time.value = `${elements.timeHour.value}:${elements.timeMinute.value}`;
  updateQuote();
}

function syncTimeFromSegments() {
  const hour = Number(elements.timeHour.value);
  const minute = Number(elements.timeMinute.value);

  if (
    elements.timeHour.value.length === 2 &&
    elements.timeMinute.value.length === 2 &&
    hour >= 0 &&
    hour <= 23 &&
    minute >= 0 &&
    minute <= 59
  ) {
    elements.time.value = `${elements.timeHour.value}:${elements.timeMinute.value}`;
    updateQuote();
  }
}

function updateTimeSegments() {
  const [hour = "10", minute = "00"] = elements.time.value.split(":");
  elements.timeHour.value = hour;
  elements.timeMinute.value = minute;
}

function updateDateDisplay() {
  elements.dateDisplay.textContent = formatHumanDate(elements.date.value);
  elements.date.lang = currentLanguage;
}

function setLanguage(language) {
  if (!translations[language]) {
    return;
  }

  currentLanguage = language;
  localStorage.setItem("gotransfer-language", language);
  document.cookie = `gotransfer-language=${language}; Max-Age=31536000; Path=/; SameSite=Lax`;
  applyTranslations();
  updateDateDisplay();
  updateQuote();
}

function applyTranslations() {
  document.documentElement.lang = currentLanguage;
  document.documentElement.dir = currentLanguage === "ar" ? "rtl" : "ltr";
  document.title = t("pageTitle");
  elements.metaDescription.content = t("metaDescription");
  ["og:title","og:description"].forEach((property)=>{
    let meta=document.head.querySelector(`meta[property="${property}"]`);
    if(!meta){meta=document.createElement("meta");meta.setAttribute("property",property);document.head.appendChild(meta)}
    meta.content=property==="og:title"?t("pageTitle"):t("metaDescription");
  });
  elements.languageMenuButton.setAttribute("aria-label", t("languageMenuLabel"));

  elements.translatable.forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });

  elements.ariaTranslatable.forEach((element) => {
    element.setAttribute("aria-label", t(element.dataset.i18nAria));
  });

  elements.languageOptions.forEach((button) => {
    const isActive = button.dataset.languageOption === currentLanguage;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });

  elements.currentLanguageCode.textContent = currentLanguage.toUpperCase();
  updatePlaceInput("from");
  updatePlaceInput("to");
  updatePlaceTypeButtons();
  updatePassengerControls();
  updateDateDisplay();
  elements.quickWhatsapp.href = buildQuickWhatsappLink();
  elements.quickTelegram.href = buildTelegramLink();
  elements.telegram.href = buildTelegramLink();
  updateInstallBannerCopy();
}

function t(key) {
  return translations[currentLanguage]?.[key] || translations.ru[key] || key;
}

function getInitialLanguage() {
  const requestedLanguage = new URLSearchParams(location.search).get("lang");
  if (translations[requestedLanguage]) {
    return requestedLanguage;
  }
  const savedLanguage = localStorage.getItem("gotransfer-language");

  if (translations[savedLanguage]) {
    return savedLanguage;
  }

  const browserLanguages = navigator.languages || [navigator.language];
  for (const locale of browserLanguages) {
    const language = String(locale || "").toLowerCase().split("-")[0];
    if (translations[language]) return language;
  }

  return isLikelyRussianRegion() ? "ru" : "en";
}

function isLikelyRussianRegion() {
  const russianTimeZones = new Set([
    "Europe/Kaliningrad",
    "Europe/Moscow",
    "Europe/Kirov",
    "Europe/Volgograd",
    "Europe/Astrakhan",
    "Europe/Saratov",
    "Europe/Ulyanovsk",
    "Asia/Yekaterinburg",
    "Asia/Omsk",
    "Asia/Novosibirsk",
    "Asia/Barnaul",
    "Asia/Tomsk",
    "Asia/Novokuznetsk",
    "Asia/Krasnoyarsk",
    "Asia/Irkutsk",
    "Asia/Chita",
    "Asia/Yakutsk",
    "Asia/Khandyga",
    "Asia/Vladivostok",
    "Asia/Ust-Nera",
    "Asia/Magadan",
    "Asia/Sakhalin",
    "Asia/Srednekolymsk",
    "Asia/Kamchatka",
    "Asia/Anadyr",
  ]);
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  if (russianTimeZones.has(timeZone)) {
    return true;
  }

  if (timeZone) {
    return false;
  }

  return (navigator.languages || [navigator.language]).some((locale) => /-(RU)\b/i.test(locale));
}

let deferredInstallPrompt = null;
let installInstructionsVisible = false;
const INSTALL_DISMISS_KEY = "gotransfer-install-dismissed-v2";

function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) {
    return;
  }

  window.addEventListener("load", () => {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      registrations.forEach((registration) => registration.unregister());
    }).catch(() => {});

    if ("caches" in window) {
      caches.keys().then((keys) => {
        keys.filter((key) => key.startsWith("gotransfer-")).forEach((key) => caches.delete(key));
      }).catch(() => {});
    }
  });
}

function setupInstallPrompt() {
  if (
    !isMobileDevice() ||
    isNativeAndroidApp() ||
    isStandaloneApp() ||
    localStorage.getItem(INSTALL_DISMISS_KEY) === "true"
  ) {
    return;
  }

  elements.dismissInstall.addEventListener("click", () => {
    elements.installBanner.hidden = true;
    localStorage.setItem(INSTALL_DISMISS_KEY, "true");
  });

  elements.installButton.addEventListener("click", async () => {
    if (deferredInstallPrompt) {
      deferredInstallPrompt.prompt();
      await deferredInstallPrompt.userChoice;
      deferredInstallPrompt = null;
      elements.installBanner.hidden = true;
      return;
    }

    if ((isIosDevice() || isAndroidDevice()) && !deferredInstallPrompt && installInstructionsVisible) {
      elements.installBanner.hidden = true;
      return;
    }

    installInstructionsVisible = true;
    updateInstallBannerCopy();
  });

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredInstallPrompt = event;
    showInstallBanner();
  });

  window.addEventListener("appinstalled", () => {
    elements.installBanner.hidden = true;
    localStorage.setItem(INSTALL_DISMISS_KEY, "true");
  });

  if (isIosDevice() || isAndroidDevice()) {
    window.setTimeout(showInstallBanner, 1200);
  }
}

function showInstallBanner() {
  if (!isMobileDevice() || isNativeAndroidApp() || isStandaloneApp() || localStorage.getItem(INSTALL_DISMISS_KEY) === "true") {
    return;
  }

  elements.installBanner.hidden = false;
  updateInstallBannerCopy();
}

function updateInstallBannerCopy() {
  if (!elements.installBanner || elements.installBanner.hidden) {
    return;
  }

  const shouldShowManualInstructions = (isIosDevice() || isAndroidDevice()) && !deferredInstallPrompt;
  const installInstructionsKey = isAndroidDevice() ? "installAndroidText" : "installIosText";
  elements.installText.textContent =
    shouldShowManualInstructions && installInstructionsVisible ? t(installInstructionsKey) : t("installText");
  elements.installButton.textContent = shouldShowManualInstructions
    ? installInstructionsVisible
      ? t("installDone")
      : t("installHowTo")
    : t("installAction");
}

function isIosDevice() {
  return /iphone|ipad|ipod/i.test(navigator.userAgent);
}

function isAndroidDevice() {
  return /android/i.test(navigator.userAgent);
}

function isMobileDevice() {
  return isIosDevice() || isAndroidDevice();
}

function isNativeAndroidApp() {
  return /gotransferandroid/i.test(navigator.userAgent) || new URLSearchParams(window.location.search).get("source") === "android-app";
}

function isStandaloneApp() {
  return window.matchMedia("(display-mode: standalone)").matches || navigator.standalone === true;
}

window.addEventListener("gotransfer:languagechange",event=>setLanguage(event.detail.language));
init();

