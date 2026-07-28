import { placesBySlug, routes, whatsappPhone } from "./route-data.js?v=20260728-pwa-67";
import { bindLanguageMenu, getLanguage, setupBackButton } from "./journey-language.js?v=20260727-pwa-60";

const routeSlug =
  new URLSearchParams(location.search).get("route") ||
  location.pathname.split("/").filter(Boolean).at(-1);
const route = routes[routeSlug] || routes.lara;
const localizedDestination =
  route.slug === "belek" ? "Belek" : route.slug === "lara" ? "Lara" : route.slug === "alanya" ? "Alanya" : route.slug === "side" ? "Side" : route.destination;
const selectedStops = new Set();
let currentLanguage = getLanguage();
const interfaceCopy = {
  ru: { back:"Назад к направлениям", breadcrumb:"← Выбор направления", contact:"Связаться с оператором", choose:"Выбрать остановки", details:"Подробнее", add:"Добавить к маршруту", added:"Добавлено", discuss:"Обсудить маршрут с оператором", mobileBack:"Назад" },
  en: { back:"Back to destinations", breadcrumb:"← Choose destination", contact:"Contact the operator", choose:"Choose stops", details:"Learn more", add:"Add to route", added:"Added", discuss:"Discuss route with the operator", mobileBack:"Back", airport:"Antalya Airport", title:`Private transfer from Antalya Airport to ${route.destination} with stops`, description:"Turn your private transfer into a small journey by adding places that interest you.", introKicker:"Your route, your experience", introTitle:"Add what interests you to your transfer", introText:"Choose one or more stops and our operator will calculate the duration and cost.", bullets:["The standard transfer has no stops","Stops are selected separately","Duration and price depend on the route","The operator confirms the final plan"], directKicker:"Close to the direct route", directTitle:"Convenient places to visit on the way", directText:`These places are convenient to include on the way to ${route.destination}.`, extraKicker:"Extended route", extraTitle:"Add a mini-journey", extraText:"These places require a detour and may increase the duration and price.", important:"Important", notice:"The operator will agree the order, duration and final price with you in advance.", helpKicker:"Personal recommendation", helpTitle:"Not sure what to choose?", helpText:"Tell the operator how much time you have and whether you prefer nature, history, a walk or photo locations.", helpAction:"Plan a mini-journey" },
  tr: { back:"Rotalara dön", breadcrumb:"← Rota seçimi", contact:"Operatöre ulaşın", choose:"Durakları seçin", details:"Daha fazla", add:"Rotaya ekle", added:"Eklendi", discuss:"Rotayı operatörle görüş", mobileBack:"Geri", airport:"Antalya Havalimanı", title:`Antalya Havalimanı'ndan ${route.destination} yönüne duraklı özel transfer`, description:"İlginizi çeken yerleri ekleyerek özel transferinizi küçük bir yolculuğa dönüştürün.", introKicker:"Rotanız, deneyiminiz", introTitle:"Transferinize ilginizi çeken durakları ekleyin", introText:"Bir veya birkaç durak seçin; operatörümüz süreyi ve ücreti hesaplasın.", bullets:["Standart transfer duraksızdır","Duraklar ayrıca seçilir","Süre ve ücret rotaya bağlıdır","Son planı operatör onaylar"], directKicker:"Doğrudan rotaya yakın", directTitle:"Yol üzerinde kolayca ziyaret edin", directText:`Bu yerleri ${route.destination} yolculuğuna eklemek kolaydır.`, extraKicker:"Genişletilmiş rota", extraTitle:"Mini bir yolculuk ekleyin", extraText:"Bu yerler sapma gerektirir; süreyi ve ücreti artırabilir.", important:"Önemli", notice:"Durak sırası, süre ve son ücret önceden sizinle kararlaştırılır.", helpKicker:"Kişisel öneri", helpTitle:"Ne seçeceğinizden emin değil misiniz?", helpText:"Ne kadar zamanınız olduğunu ve doğa, tarih, yürüyüş ya da fotoğraf noktalarından hangisini sevdiğinizi söyleyin.", helpAction:"Mini yolculuk planla" },
};
const placeNames = {
  en: {"lower-duden":"Lower Düden Waterfall","duden-park":"Düden Park","kaleici":"Kaleiçi Old Town","perge":"Ancient City of Perge","kursunlu-waterfall":"Kurşunlu Waterfall","upper-duden":"Upper Düden Waterfall","antalya-museum":"Antalya Archaeological Museum","land-of-legends":"The Land of Legends","belek-beach":"Belek Beach","aspendos":"Ancient Theatre of Aspendos","zeytintasi-cave":"Zeytintaşı Cave","alanya-castle":"Alanya Castle","alanya-cable-car":"Alanya Cable Car","alanya-aya-yorgi":"Church of Saint George","alanya-red-tower":"Red Tower and Seljuk Shipyard","alanya-damlatas":"Damlataş Cave and Cleopatra Beach","alanya-museum":"Alanya Archaeological Museum","alanya-dim":"Dim River and Dim Cave","alanya-syedra":"Ancient City of Syedra"},
  tr: {"lower-duden":"Aşağı Düden Şelalesi","duden-park":"Düden Parkı","kaleici":"Kaleiçi","perge":"Perge Antik Kenti","kursunlu-waterfall":"Kurşunlu Şelalesi","upper-duden":"Yukarı Düden Şelalesi","antalya-museum":"Antalya Arkeoloji Müzesi","land-of-legends":"The Land of Legends","belek-beach":"Belek Plajı","aspendos":"Aspendos Antik Tiyatrosu","zeytintasi-cave":"Zeytintaşı Mağarası","alanya-castle":"Alanya Kalesi","alanya-cable-car":"Alanya Teleferiği","alanya-aya-yorgi":"Aya Yorgi Kilisesi","alanya-red-tower":"Kızılkule ve Selçuklu Tersanesi","alanya-damlatas":"Damlataş Mağarası ve Kleopatra Plajı","alanya-museum":"Alanya Arkeoloji Müzesi","alanya-dim":"Dim Çayı ve Dim Mağarası","alanya-syedra":"Syedra Antik Kenti"},
};

function displayPlace(place) {
  if (currentLanguage === "ru") return place;
  const name = placeNames[currentLanguage]?.[place.slug] || place.title;
  return {...place, title:name, category:currentLanguage === "en" ? "Suggested stop" : "Önerilen durak", description:currentLanguage === "en" ? `Discover ${name} as a carefully planned stop during your private transfer.` : `${name} özel transferiniz sırasında planlı bir durak olarak keşfedilebilir.`};
}

const directStops = document.querySelector("#directStops");
const extraTrips = document.querySelector("#extraTrips");
const selectionBar = document.querySelector("#selectionBar");
const selectionCount = document.querySelector("#selectionCount");
const selectionNames = document.querySelector("#selectionNames");
const selectionOperatorLink = document.querySelector("#selectionOperatorLink");

function pluralStops(count) {
  if (count % 10 === 1 && count % 100 !== 11) return `${count} остановка`;
  if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100)) return `${count} остановки`;
  return `${count} остановок`;
}

function messageForSelection() {
  const selectedNames = [...selectedStops].map((slug) => placesBySlug[slug].title);

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
        <small>Фотография скоро появится</small>
      </div>
      <span class="stop-card__number">0${index + 1}</span>
    </div>
    <div class="stop-card__body">
      <span class="stop-card__category">${place.category}</span>
      <h3>${place.title}</h3>
      <p>${place.description}</p>
      <div class="stop-card__actions">
        <a href="/places/${place.slug}">${interfaceCopy[currentLanguage].details}</a>
        <button type="button" data-add-stop="${place.slug}" aria-pressed="false">Добавить к маршруту</button>
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
  document.querySelector(".route-detail-back").textContent = copy.back;
  document.querySelector(".route-breadcrumb").textContent = copy.breadcrumb;
  document.querySelector("#heroOperatorLink").textContent = copy.contact;
  document.querySelector('a[href="#routeStops"]').textContent = copy.choose;
  document.querySelector("#selectionOperatorLink").textContent = copy.discuss;
  document.querySelector("#mobileBackButton span").textContent = copy.mobileBack;
  if (currentLanguage !== "ru") {
    document.querySelector("#routeTitle").textContent = copy.title;
    document.querySelector("#routeDescription").textContent = copy.description;
    document.querySelector("#routeLine").textContent = `${copy.airport} → ${route.destination}`;
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
    document.querySelector("#routeLine").textContent = `${copy.airport} → ${route.destination}`;
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
