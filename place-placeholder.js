import { placesBySlug, routes, whatsappPhone } from "./route-data.js?v=20260728-pwa-77";
import { bindLanguageMenu, getLanguage, setupBackButton } from "./journey-language.js?v=20260727-pwa-60";

const pathSlug = location.pathname.split("/").filter(Boolean).at(-1);
const querySlug = new URLSearchParams(location.search).get("slug");
const slug = placesBySlug[pathSlug] ? pathSlug : querySlug;
const place = placesBySlug[slug] || placesBySlug["lower-duden"];
let currentLanguage = getLanguage();
const interfaceCopy = {
  ru: { back:"← Вернуться к маршруту", add:"Добавить остановку", others:"Другие остановки", interesting:"ЧТО ЗДЕСЬ ИНТЕРЕСНО", see:"Что посмотреть и чем заняться", planning:"ПЛАНИРОВАНИЕ ОСТАНОВКИ", time:"Сколько времени оставить?", want:"Хотите включить это место в поездку?", help:"Оператор поможет рассчитать время и подобрать удобный формат остановки.", discuss:"Обсудить с оператором", choose:"Вернуться к выбору мест", home:"Главная", journey:"Выбрать путешествие", routes:"Направления", mobileBack:"Назад" },
  en: { back:"← Back to route", add:"Add this stop", others:"Other stops", interesting:"WHAT IS INTERESTING HERE", see:"What to see and do", planning:"PLANNING YOUR STOP", time:"How much time should you allow?", want:"Would you like to include this place?", help:"Our operator will help calculate the time and choose a convenient stop format.", discuss:"Discuss with the operator", choose:"Back to places", home:"Home", journey:"Choose a journey", routes:"Destinations", mobileBack:"Back" },
  tr: { back:"← Rotaya dön", add:"Bu durağı ekle", others:"Diğer duraklar", interesting:"BURADA NELER İLGİNÇ", see:"Görülecek ve yapılacaklar", planning:"DURAĞI PLANLAYIN", time:"Ne kadar zaman ayırmalı?", want:"Bu yeri yolculuğa eklemek ister misiniz?", help:"Operatörümüz süreyi hesaplamanıza ve uygun durak biçimini seçmenize yardımcı olur.", discuss:"Operatörle görüş", choose:"Yer seçimine dön", home:"Ana sayfa", journey:"Yolculuk seç", routes:"Rotalar", mobileBack:"Geri" },
};
const localizedNames = {
  en: {"lower-duden":"Lower Düden Waterfall","duden-park":"Düden Park","kaleici":"Kaleiçi Old Town","perge":"Ancient City of Perge","kursunlu-waterfall":"Kurşunlu Waterfall","upper-duden":"Upper Düden Waterfall","antalya-museum":"Antalya Archaeological Museum","land-of-legends":"The Land of Legends","belek-beach":"Belek Beach","aspendos":"Ancient Theatre of Aspendos","zeytintasi-cave":"Zeytintaşı Cave","side-ancient-city":"Ancient Side and the Temple of Apollo","side-museum":"Side Archaeological Museum","manavgat-waterfall":"Manavgat Waterfall","koprulu-canyon":"Köprülü Canyon","konyaalti-beach":"Konyaaltı Beach and Promenade","antalya-aquarium":"Antalya Aquarium","termessos":"Ancient City of Termessos","karain-cave":"Karain Cave","beldibi-cave":"Beldibi Cave","beldibi-beach":"Beldibi Coast","goynuk-canyon":"Göynük Canyon","phaselis":"Ancient City of Phaselis"},
  tr: {"lower-duden":"Aşağı Düden Şelalesi","duden-park":"Düden Parkı","kaleici":"Kaleiçi","perge":"Perge Antik Kenti","kursunlu-waterfall":"Kurşunlu Şelalesi","upper-duden":"Yukarı Düden Şelalesi","antalya-museum":"Antalya Arkeoloji Müzesi","land-of-legends":"The Land of Legends","belek-beach":"Belek Plajı","aspendos":"Aspendos Antik Tiyatrosu","zeytintasi-cave":"Zeytintaşı Mağarası","side-ancient-city":"Side Antik Kenti ve Apollon Tapınağı","side-museum":"Side Arkeoloji Müzesi","manavgat-waterfall":"Manavgat Şelalesi","koprulu-canyon":"Köprülü Kanyon","konyaalti-beach":"Konyaaltı Plajı ve Sahili","antalya-aquarium":"Antalya Akvaryum","termessos":"Termessos Antik Kenti","karain-cave":"Karain Mağarası","beldibi-cave":"Beldibi Mağarası","beldibi-beach":"Beldibi Sahili","goynuk-canyon":"Göynük Kanyonu","phaselis":"Phaselis Antik Kenti"},
};
Object.assign(localizedNames.en, {
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
});
Object.assign(localizedNames.tr, {
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
});

function whatsappUrl() {
  const destination = place.routeDestinationAccusative || "Лару";
  const message =
    `Здравствуйте! Меня интересует остановка «${place.title}» ` +
    `во время VIP-трансфера из аэропорта Антальи в ${destination}. ` +
    "Подскажите, пожалуйста, сколько времени она займёт.";

  return `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(message)}`;
}

function renderHighlights() {
  const container = document.querySelector("#placeHighlights");

  const generic = currentLanguage === "en"
    ? [{title:"Main experience",text:"See the character and atmosphere of this place at a comfortable pace."},{title:"Time for photos",text:"Your driver can help choose a convenient meeting point after the visit."},{title:"Flexible planning",text:"The duration can be adapted to your transfer and arrival time."}]
    : [{title:"Başlıca deneyim",text:"Bu yerin karakterini ve atmosferini rahat bir tempoda keşfedin."},{title:"Fotoğraf zamanı",text:"Ziyaret sonrası uygun buluşma noktasını şoförünüzle belirleyebilirsiniz."},{title:"Esnek planlama",text:"Süre, transferinize ve varış saatinize göre ayarlanabilir."}];
  const highlights = currentLanguage === "ru" ? place.highlights : generic;
  highlights.forEach((highlight, index) => {
    const article = document.createElement("article");
    article.className = "place-highlight";
    article.innerHTML = `
      <span>0${index + 1}</span>
      <h3>${highlight.title}</h3>
      <p>${highlight.text}</p>
    `;
    container.append(article);
  });
}

function renderGallery() {
  const section = document.querySelector("#placeGallerySection");
  const container = document.querySelector("#placeGallery");
  container.replaceChildren();

  if (!place.gallery?.length) {
    section.hidden = true;
    return;
  }

  section.hidden = false;
  const heading = section.querySelector(".place-gallery__heading");
  heading.querySelector("p").textContent =
    currentLanguage === "en" ? "PHOTOS OF THE PLACE" : currentLanguage === "tr" ? "MEKÂN FOTOĞRAFLARI" : "ФОТОГРАФИИ МЕСТА";
  heading.querySelector("h2").textContent =
    currentLanguage === "en" ? "See what awaits you" : currentLanguage === "tr" ? "Sizi nelerin beklediğini görün" : "Посмотрите, что вас ждёт";

  place.gallery.forEach((item, index) => {
    const localizedCaptions = {
      "land-of-legends": {
        en: [
          "The fairytale castle and Nickelodeon Land entrance",
          "The castle with evening illumination",
          "The canal promenade and fairytale architecture",
          "The theme park and major attractions",
        ],
        tr: [
          "Masalsı şato ve Nickelodeon Land girişi",
          "Akşam ışıklarıyla şato",
          "Kanal gezinti yolu ve masalsı mimari",
          "Tema parkı ve büyük eğlence üniteleri",
        ],
      },
      "antalya-museum": {
        en: [
          "The celebrated Dancing Woman in white and dark marble",
          "The Weary Heracles, one of the museum's greatest treasures",
          "The Roman Three Graces sculptural group from Perge",
        ],
        tr: [
          "Beyaz ve koyu mermerden ünlü Dansöz Heykeli",
          "Müzenin en önemli eserlerinden Yorgun Herakles",
          "Perge'den Roma Dönemi Üç Güzeller heykel grubu",
        ],
      },
      "alanya-red-tower": {
        en: [
          "The Red Tower, symbol of Alanya's old harbour",
          "The 13th-century Seljuk shipyard beside the castle walls",
        ],
        tr: [
          "Alanya'nın eski limanının simgesi Kızılkule",
          "Kale surlarının yanındaki 13. yüzyıl Selçuklu Tersanesi",
        ],
      },
      "alanya-dim": {
        en: [
          "The cool Dim River among green mountain slopes",
          "The stalactites and stone chambers of Dim Cave",
        ],
        tr: [
          "Yeşil yamaçlar arasındaki serin Dim Çayı",
          "Dim Mağarası'nın sarkıtları ve taş salonları",
        ],
      },
    };
    const caption =
      currentLanguage === "ru"
        ? item.caption
        : localizedCaptions[place.slug]?.[currentLanguage]?.[index] || item.caption;
    const figure = document.createElement("figure");
    figure.innerHTML = `
      <img src="${item.image}" alt="${place.title}: ${caption}" loading="${index ? "lazy" : "eager"}" decoding="async">
      <figcaption>${caption}</figcaption>
    `;
    container.append(figure);
  });
}

function renderPlace() {
  const copy = interfaceCopy[currentLanguage];
  document.documentElement.lang = currentLanguage;
  document.title = `${place.title}: что посмотреть — GoTransfer`;
  document.querySelector('meta[name="description"]').content = place.seoDescription;
  document.querySelector("#placeCanonical").href = `https://gotransfer.my/places/${place.slug}`;
  const requestedRoute = new URLSearchParams(location.search).get("route");
  const selectedRoute = routes[requestedRoute] || routes[place.routeSlug] || routes.lara;
  const routeHref = `/routes/${selectedRoute.slug}`;
  const selectedDestination =
    selectedRoute.slug === "cirali"
      ? "Çıralı"
      : selectedRoute.slug === "olympos"
        ? "Olympos"
        : selectedRoute.slug === "adrasan"
          ? "Adrasan"
          : selectedRoute.slug === "kumluca"
            ? "Kumluca"
            : selectedRoute.destination;
  document.querySelector(".place-detail-route-link").href = routeHref;
  document.querySelector(".place-hero__content > a").href = routeHref;
  document.querySelector(".place-secondary-action").href = routeHref;
  document.querySelector(".place-detail-cta a[href^='/routes']").href = routeHref;
  document.querySelector(".place-hero__content > a").textContent =
    currentLanguage === "ru"
      ? `Маршрут: аэропорт Анталии → ${selectedRoute.destination}`
      : currentLanguage === "en"
        ? `Route: Antalya Airport → ${selectedDestination}`
        : `Rota: Antalya Havalimanı → ${selectedDestination}`;

  const image = document.querySelector("#placeImage");
  image.src = place.image;
  image.alt = place.title;

  const displayTitle = currentLanguage === "ru" ? place.title : localizedNames[currentLanguage]?.[place.slug] || place.title;
  if (currentLanguage !== "ru") {
    document.title = currentLanguage === "en" ? `${displayTitle}: travel stop — GoTransfer` : `${displayTitle}: rota durağı — GoTransfer`;
    document.querySelector('meta[name="description"]').content = currentLanguage === "en" ? `Discover ${displayTitle} during a private transfer from Antalya Airport.` : `${displayTitle} yerini Antalya Havalimanı özel transferinize ekleyin.`;
  }
  document.querySelector("#placeEyebrow").textContent = currentLanguage === "ru" ? place.eyebrow : (currentLanguage === "en" ? "A stop worth discovering" : "Keşfedilmeye değer bir durak");
  document.querySelector("#placeTitle").textContent = displayTitle;
  document.querySelector("#placeIntro").textContent = currentLanguage === "ru" ? place.intro : (currentLanguage === "en" ? `${displayTitle} can become a memorable part of your private transfer from Antalya Airport. Explore it without rushing and continue the journey when you are ready.` : `${displayTitle}, Antalya Havalimanı'ndan özel transferinizin unutulmaz bir parçası olabilir. Acele etmeden keşfedin ve hazır olduğunuzda yolculuğa devam edin.`);
  document.querySelector("#placeVisitNote").textContent = currentLanguage === "ru" ? place.visitNote : (currentLanguage === "en" ? "Ask the operator to allow enough time for the visit and the additional drive." : "Ziyaret ve ek yol için yeterli süreyi operatörle önceden planlayın.");
  document.querySelector(".place-detail-route-link").textContent = copy.back;
  document.querySelector("#placeOperatorLink").textContent = copy.add;
  document.querySelector(".place-secondary-action").textContent = copy.others;
  document.querySelector(".place-story__heading p").textContent = copy.interesting;
  document.querySelector("#placeStoryTitle").textContent = copy.see;
  document.querySelector(".place-visit-note p").textContent = copy.planning;
  document.querySelector(".place-visit-note h2").textContent = copy.time;
  document.querySelector(".place-detail-cta > p").textContent = copy.want;
  document.querySelector(".place-detail-cta > h2").textContent = copy.help;
  document.querySelector("#placeBottomOperatorLink").textContent = copy.discuss;
  document.querySelector(".place-detail-cta a[href^='/routes']").textContent = copy.choose;
  const footerLinks = document.querySelectorAll(".place-detail-footer a");
  footerLinks[0].textContent = copy.home; footerLinks[1].textContent = copy.journey; footerLinks[2].textContent = copy.routes;
  document.querySelector("#mobileBackButton span").textContent = copy.mobileBack;

  const operatorUrl = whatsappUrl();
  document.querySelector("#placeOperatorLink").href = operatorUrl;
  document.querySelector("#placeBottomOperatorLink").href = operatorUrl;

  renderHighlights();
  renderGallery();
}

renderPlace();
const updateLanguageMenu = bindLanguageMenu(document.querySelector(".language-menu"), (language) => {
  currentLanguage = language;
  document.querySelector("#placeHighlights").replaceChildren();
  renderPlace();
  updateLanguageMenu(language);
});
updateLanguageMenu(currentLanguage);
setupBackButton(document.querySelector("#mobileBackButton"), "/routes");
