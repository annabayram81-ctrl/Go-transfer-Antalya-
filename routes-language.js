import { bindLanguageMenu, getLanguage } from "./journey-language.js?v=20260727-pwa-60";

const pageCopy = {
  ru: {
    title: "Куда вы отправляетесь? — маршруты GoTransfer",
    meta: "Выберите курортное направление для VIP-трансфера с остановками из аэропорта Анталии.",
    back: "Все услуги",
    language: "Язык",
    eyebrow: "VIP-трансфер с остановками",
    heading: "Куда вы отправляетесь?",
    subtitle: "Выберите направление, и мы покажем интересные места, которые можно посетить по пути из аэропорта.",
    airport: "Аэропорт Анталии",
    action: "Смотреть маршрут",
  },
  en: {
    title: "Where are you going? — GoTransfer routes",
    meta: "Choose a resort destination for a private transfer with stops from Antalya Airport.",
    back: "All services",
    language: "Language",
    eyebrow: "VIP transfer with stops",
    heading: "Where are you going?",
    subtitle: "Choose a destination and we will show you interesting places to visit on the way from the airport.",
    airport: "Antalya Airport",
    action: "View route",
  },
  tr: {
    title: "Nereye gidiyorsunuz? — GoTransfer rotaları",
    meta: "Antalya Havalimanı'ndan duraklı özel transfer için tatil beldenizi seçin.",
    back: "Tüm hizmetler",
    language: "Dil",
    eyebrow: "Duraklı VIP transfer",
    heading: "Nereye gidiyorsunuz?",
    subtitle: "Varış noktanızı seçin; havalimanından giderken görebileceğiniz ilginç yerleri gösterelim.",
    airport: "Antalya Havalimanı",
    action: "Rotayı görüntüle",
  },
};

const names = {
  en: ["Lara","Belek","Side","Alanya","Konyaaltı","Beldibi","Göynük","Kemer","Kiriş","Çamyuva","Tekirova","Olympos","Çıralı","Adrasan","Kumluca","Finike","Demre","Kaş"],
  tr: ["Lara","Belek","Side","Alanya","Konyaaltı","Beldibi","Göynük","Kemer","Kiriş","Çamyuva","Tekirova","Olimpos","Çıralı","Adrasan","Kumluca","Finike","Demre","Kaş"],
};

const descriptions = {
  en: [
    "A short ride to the sea, palm-lined avenues and a lively resort atmosphere.",
    "A calm road through pine trees to hotels, golf courses and wide beaches.",
    "A journey to ancient silhouettes, the old town and the warm Mediterranean shore.",
    "A scenic coastal drive to the castle and colourful promenade.",
    "A city route to a long beach framed by the Mediterranean and Taurus Mountains.",
    "A road between sea and mountains where resort bustle gives way to pine forests.",
    "A refreshing route to pine slopes, a canyon and clear bays.",
    "A spectacular drive to the marina, mountain views and turquoise coast.",
    "A peaceful continuation beyond Kemer toward quiet bays and green slopes.",
    "A relaxed resort route to orange groves and bright pebble beaches.",
    "A road to turquoise bays beneath Mount Tahtalı and ancient Lycian sites.",
    "A mountain road to an ancient city hidden beside the sea.",
    "A quiet journey to a long beach, orange gardens and the flames of Chimaera.",
    "A secluded route through mountains and forests to a broad, peaceful bay.",
    "A scenic continuation through mountain valleys, gardens and quiet villages.",
    "A coastal road to orange groves, a friendly marina and spacious promenade.",
    "A route to Lycian history, ancient Myra and Mediterranean landscapes.",
    "A breathtaking coastal road to turquoise bays and an intimate old town.",
  ],
  tr: [
    "Denize, palmiyeli caddelere ve canlı tatil atmosferine kısa bir yolculuk.",
    "Çam ağaçları arasından otellere, golf sahalarına ve geniş plajlara sakin bir rota.",
    "Antik silüetlere, eski şehre ve sıcak Akdeniz kıyısına uzanan yolculuk.",
    "Sahil boyunca kaleye ve renkli kordon boyuna uzanan manzaralı bir yol.",
    "Akdeniz ve Toros manzaralı uzun plaja giden şehir rotası.",
    "Deniz ile dağlar arasında, tatil hareketliliğinin çam sessizliğine dönüştüğü yol.",
    "Çam yamaçlarına, kanyona ve berrak koylara uzanan ferah bir rota.",
    "Marinaya, dağ manzaralarına ve turkuaz kıyılara etkileyici bir yolculuk.",
    "Kemer'in ardından sakin koylara ve yeşil yamaçlara huzurlu bir devam.",
    "Portakal bahçelerine ve açık renkli çakıl plajlara rahat bir tatil rotası.",
    "Tahtalı eteklerindeki turkuaz koylara ve Likya'nın antik yerlerine giden yol.",
    "Çam dağlarından deniz kıyısında saklı antik kente uzanan rota.",
    "Uzun plaja, portakal bahçelerine ve Yanartaş'a sakin bir yolculuk.",
    "Dağlar ve ormanlar arasından geniş, sessiz bir koya uzanan tenha rota.",
    "Dağ vadileri, bahçeler ve sakin yerleşimler arasından manzaralı bir devam.",
    "Portakal bahçelerine, marinaya ve geniş sahil yoluna uzanan kıyı rotası.",
    "Likya tarihine, antik Myra'ya ve Akdeniz manzaralarına uzanan rota.",
    "Turkuaz koyların üzerinden samimi eski şehre uzanan nefes kesici sahil yolu.",
  ],
};

const cards = [...document.querySelectorAll(".destination-card")];
const menu = document.querySelector("#routesLanguageMenu");
const updateMenu = bindLanguageMenu(menu, applyLanguage);

function applyLanguage(language) {
  const copy = pageCopy[language] || pageCopy.ru;
  document.documentElement.lang = language;
  document.title = copy.title;
  document.querySelector('meta[name="description"]').content = copy.meta;
  document.querySelector(".routes-back-link").textContent = copy.back;
  document.querySelector(".routes-intro__eyebrow").textContent = copy.eyebrow;
  document.querySelector(".routes-intro h1").textContent = copy.heading;
  document.querySelector(".routes-intro > p:last-child").textContent = copy.subtitle;
  menu.querySelector(".language-menu__button").setAttribute("aria-label", copy.language);
  menu.querySelector(".language-menu__list").setAttribute("aria-label", copy.language);
  cards.forEach((card, index) => {
    const destination = language === "ru" ? card.querySelector("strong").dataset.ru || card.querySelector("strong").textContent : names[language][index];
    const strong = card.querySelector("strong");
    if (!strong.dataset.ru) strong.dataset.ru = strong.textContent;
    const description = card.querySelector(".destination-card__content > span");
    if (!description.dataset.ru) description.dataset.ru = description.textContent;
    strong.textContent = destination;
    card.querySelector("small").textContent = `${copy.airport} → ${destination}`;
    description.textContent = language === "ru" ? description.dataset.ru : descriptions[language][index];
    card.querySelector("b").childNodes[0].textContent = `${copy.action} `;
  });
  updateMenu(language);
}

applyLanguage(getLanguage());
