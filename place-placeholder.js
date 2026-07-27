import { placesBySlug, whatsappPhone } from "./route-data.js?v=20260727-pwa-57";

const pathSlug = location.pathname.split("/").filter(Boolean).at(-1);
const querySlug = new URLSearchParams(location.search).get("slug");
const slug = placesBySlug[pathSlug] ? pathSlug : querySlug;
const place = placesBySlug[slug] || placesBySlug["lower-duden"];

function whatsappUrl() {
  const message =
    `Здравствуйте! Меня интересует остановка «${place.title}» ` +
    "во время VIP-трансфера из аэропорта Антальи в Лару. " +
    "Подскажите, пожалуйста, сколько времени она займёт.";

  return `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(message)}`;
}

function renderHighlights() {
  const container = document.querySelector("#placeHighlights");

  place.highlights.forEach((highlight, index) => {
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

function renderPlace() {
  document.title = `${place.title}: что посмотреть — GoTransfer`;
  document.querySelector('meta[name="description"]').content = place.seoDescription;
  document.querySelector("#placeCanonical").href = `https://gotransfer.my/places/${place.slug}`;

  const image = document.querySelector("#placeImage");
  image.src = place.image;
  image.alt = place.title;

  document.querySelector("#placeEyebrow").textContent = place.eyebrow;
  document.querySelector("#placeTitle").textContent = place.title;
  document.querySelector("#placeIntro").textContent = place.intro;
  document.querySelector("#placeVisitNote").textContent = place.visitNote;

  const operatorUrl = whatsappUrl();
  document.querySelector("#placeOperatorLink").href = operatorUrl;
  document.querySelector("#placeBottomOperatorLink").href = operatorUrl;

  renderHighlights();
}

renderPlace();
