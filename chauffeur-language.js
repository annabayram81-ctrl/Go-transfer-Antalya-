import { bindLanguageMenu, getLanguage } from "./journey-language.js?v=20260727-pwa-60";

const copy = {
  ru: {
    title: "Персональный водитель в Анталии — GoTransfer",
    description: "Персональный водитель в Анталии на несколько часов или весь день: поездки по городу, ожидание и индивидуальный маршрут.",
    services: "← Услуги", heroKicker: "GO TRANSFER · АНТАЛИЯ", heroTitle: "Персональный водитель на несколько часов или весь день",
    heroText: "Водитель будет сопровождать вас по Анталии, ожидать возле каждого места и следовать по составленному вами маршруту.", heroButton: "Составить маршрут",
    scenarioKicker: "ВАШ ДЕНЬ · ВАШ МАРШРУТ", scenarioTitle: "Выберите подходящий сценарий",
    orderKicker: "ПЕРСОНАЛЬНЫЙ РАСЧЁТ", orderTitle: "Составьте свой маршрут",
    orderText: "Укажите маршрут туда и обратно, дату, часы ожидания и количество пассажиров. Стоимость поездки рассчитывается по общему расстоянию, ожидание — 20 € в час.",
    labels: ["Откуда","Куда","Куда вернуться","Дата","Время начала","Часы ожидания","Количество пассажиров","Дополнительные места маршрута"],
    placeholders: ["Например: аэропорт Анталии","Например: Кемер","Например: аэропорт Анталии","Например: пляж → торговый центр → ресторан"],
    help: "Если хотите посетить несколько мест, перечислите их здесь. Для более точного расчёта оператор свяжется с вами и уточнит маршрут.",
    quote: ["Общее расстояние","Поездка по маршруту","Ожидание (20 € / час)","Итого"], calculate: "Рассчитать стоимость", whatsapp: "Написать в WhatsApp",
    footer: ["Главная","Выбрать путешествие"], back: "Назад"
  },
  en: {
    title: "Personal Chauffeur in Antalya — GoTransfer",
    description: "A personal chauffeur in Antalya for several hours or a full day, with waiting time and a route tailored to you.",
    services: "← Services", heroKicker: "GO TRANSFER · ANTALYA", heroTitle: "Personal chauffeur for several hours or the whole day",
    heroText: "Your chauffeur will accompany you around Antalya, wait at every stop and follow the route you have planned.", heroButton: "Plan your route",
    scenarioKicker: "YOUR DAY · YOUR ROUTE", scenarioTitle: "Choose a suitable scenario",
    orderKicker: "PERSONAL QUOTE", orderTitle: "Plan your route",
    orderText: "Enter your outward and return route, date, waiting time and passenger count. Travel is calculated from the total distance; waiting costs €20 per hour.",
    labels: ["From","To","Return to","Date","Start time","Waiting hours","Passengers","Additional places on the route"],
    placeholders: ["For example: Antalya Airport","For example: Kemer","For example: Antalya Airport","For example: beach → shopping centre → restaurant"],
    help: "If you would like to visit several places, list them here. The operator will contact you to clarify the route and provide a more accurate quote.",
    quote: ["Total distance","Route price","Waiting (€20 / hour)","Total"], calculate: "Calculate price", whatsapp: "Message on WhatsApp",
    footer: ["Home","Choose a journey"], back: "Back"
  },
  tr: {
    title: "Antalya'da Özel Şoför — GoTransfer",
    description: "Antalya'da birkaç saat veya tüm gün özel şoför: şehir içi yolculuk, bekleme ve size özel rota.",
    services: "← Hizmetler", heroKicker: "GO TRANSFER · ANTALYA", heroTitle: "Birkaç saat veya tüm gün özel şoför",
    heroText: "Şoförünüz Antalya boyunca size eşlik eder, her durakta bekler ve hazırladığınız rotayı takip eder.", heroButton: "Rotanızı oluşturun",
    scenarioKicker: "SİZİN GÜNÜNÜZ · SİZİN ROTANIZ", scenarioTitle: "Size uygun seçeneği belirleyin",
    orderKicker: "KİŞİSEL FİYAT HESABI", orderTitle: "Rotanızı oluşturun",
    orderText: "Gidiş-dönüş rotasını, tarihi, bekleme süresini ve yolcu sayısını girin. Yolculuk toplam mesafeye göre, bekleme ise saat başına 20 € olarak hesaplanır.",
    labels: ["Nereden","Nereye","Dönüş noktası","Tarih","Başlangıç saati","Bekleme saati","Yolcu sayısı","Rotadaki ek yerler"],
    placeholders: ["Örneğin: Antalya Havalimanı","Örneğin: Kemer","Örneğin: Antalya Havalimanı","Örneğin: plaj → alışveriş merkezi → restoran"],
    help: "Birden fazla yere gitmek istiyorsanız burada listeleyin. Daha kesin hesaplama için operatör sizinle iletişime geçerek rotayı netleştirecektir.",
    quote: ["Toplam mesafe","Rota ücreti","Bekleme (20 € / saat)","Toplam"], calculate: "Fiyatı hesapla", whatsapp: "WhatsApp'tan yazın",
    footer: ["Ana sayfa","Yolculuk seçin"], back: "Geri"
  }
};

const scenarios = {
  ru: [["Шопинг по Анталии","Поездки по торговым центрам, бутикам и аутлетам с ожиданием возле каждого магазина."],["Рестораны и вечерний отдых","Персональный водитель отвезет вас в ресторан, кафе, клуб или другое заведение и будет ждать до завершения вечера."],["Пляжи и прогулки","Комфортные поездки по пляжам, набережным, паркам и красивым местам Анталии."],["Клиники и медицинские центры","Поездки в больницы, частные клиники, стоматологии и медицинские центры с ожиданием."],["Дела по городу","Банки, нотариусы, консульства, государственные учреждения и другие необходимые адреса."],["Семейные поездки","Удобный автомобиль с водителем для поездок с детьми, пожилыми родственниками или всей семьей."],["Индивидуальный маршрут","Вы сами выбираете места и порядок поездок. Водитель следует вашему плану и остается с вами все заказанное время."]],
  en: [["Shopping in Antalya","Trips to shopping centres, boutiques and outlets, with waiting at every store."],["Restaurants and evenings out","Your chauffeur will take you to a restaurant, café, club or another venue and wait until your evening is over."],["Beaches and walks","Comfortable trips to beaches, promenades, parks and Antalya's most beautiful places."],["Clinics and medical centres","Trips to hospitals, private clinics, dental practices and medical centres, with waiting."],["City errands","Banks, notaries, consulates, public offices and any other addresses you need."],["Family trips","A comfortable chauffeur-driven vehicle for travelling with children, older relatives or the whole family."],["Your own itinerary","You choose the places and their order. The chauffeur follows your plan and stays with you for the entire booked time."]],
  tr: [["Antalya'da alışveriş","Alışveriş merkezleri, butikler ve outletler arasında, her mağazada beklemeli yolculuklar."],["Restoranlar ve gece hayatı","Şoförünüz sizi restorana, kafeye, kulübe veya başka bir mekâna götürür ve geceniz bitene kadar bekler."],["Plajlar ve geziler","Plajlara, sahil yollarına, parklara ve Antalya'nın güzel yerlerine konforlu yolculuklar."],["Klinikler ve sağlık merkezleri","Hastanelere, özel kliniklere, diş kliniklerine ve sağlık merkezlerine beklemeli yolculuklar."],["Şehirde işler","Banka, noter, konsolosluk, resmi kurum ve ihtiyaç duyduğunuz diğer adresler."],["Aile yolculukları","Çocuklar, yaşlı yakınlar veya tüm aile için şoförlü, konforlu araç."],["Kişisel rota","Yerleri ve sıralamasını siz seçersiniz. Şoför planınızı takip eder ve rezervasyon süresince yanınızda kalır."]]
};

const menu = document.querySelector("#chauffeurLanguageMenu");
const updateMenu = bindLanguageMenu(menu, applyLanguage);

function applyLanguage(language) {
  const text = copy[language] || copy.ru;
  document.documentElement.lang = language;
  document.title = text.title;
  document.querySelector('meta[name="description"]').content = text.description;
  document.querySelector('[data-chauffeur-copy="services"]').textContent = text.services;
  const hero = document.querySelector(".hero-copy");
  [hero.querySelector("p").textContent, hero.querySelector("h1").textContent, hero.querySelector("span").textContent, hero.querySelector("a").textContent] = [text.heroKicker,text.heroTitle,text.heroText,text.heroButton];
  const scenarioHeader = document.querySelector(".chauffeur-scenarios header");
  scenarioHeader.querySelector("p").textContent = text.scenarioKicker;
  scenarioHeader.querySelector("h2").textContent = text.scenarioTitle;
  document.querySelectorAll(".chauffeur-grid article").forEach((card,index) => {
    card.querySelector("h3").textContent = scenarios[language][index][0];
    card.querySelector("p").textContent = scenarios[language][index][1];
  });
  const intro = document.querySelector(".order-intro");
  intro.querySelector("p").textContent = text.orderKicker; intro.querySelector("h2").textContent = text.orderTitle; intro.querySelector("span").textContent = text.orderText;
  document.querySelectorAll("#chauffeurForm label").forEach((label,index) => label.childNodes[0].textContent = text.labels[index]);
  const inputs = [document.querySelector("#chauffeurFrom"),document.querySelector("#chauffeurTo"),document.querySelector("#chauffeurReturn"),document.querySelector('textarea[name="route"]')];
  inputs.forEach((input,index) => input.placeholder = text.placeholders[index]);
  document.querySelector(".route-help").textContent = text.help;
  document.querySelectorAll(".chauffeur-quote p span").forEach((item,index) => item.textContent = text.quote[index]);
  document.querySelector('#chauffeurForm button[type="submit"]').textContent = text.calculate;
  document.querySelector("#chauffeurWhatsApp").textContent = text.whatsapp;
  document.querySelectorAll("footer a").forEach((link,index) => link.textContent = text.footer[index]);
  document.querySelector("[data-floating-back] span").textContent = text.back;
  menu.querySelector(".language-menu__button").setAttribute("aria-label", language === "ru" ? "Язык" : language === "tr" ? "Dil" : "Language");
  updateMenu(language);
  window.dispatchEvent(new CustomEvent("chauffeur-language-change",{detail:{language}}));
}

applyLanguage(getLanguage());
