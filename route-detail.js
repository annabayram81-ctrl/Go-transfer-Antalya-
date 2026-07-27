import { placesBySlug, routes, whatsappPhone } from "./route-data.js?v=20260727-pwa-55";

const routeSlug = location.pathname.split("/").filter(Boolean).at(-1);
const route = routes[routeSlug] || routes.lara;
const selectedStops = new Set();

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
    button.textContent = isSelected ? "Добавлено" : "Добавить к маршруту";
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
  const place = placesBySlug[slug];
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
        <a href="/places/${place.slug}">Подробнее</a>
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
  document.title = route.seoTitle;
  document.querySelector('meta[name="description"]').content = route.seoDescription;
  document.querySelector("#routeTitle").textContent = route.title;
  document.querySelector("#routeDescription").textContent = route.description;
  document.querySelector("#routeLine").textContent = `${route.origin} → ${route.destination}`;
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
const languageButton = languageMenu.querySelector(".language-menu__button");
languageButton.addEventListener("click", () => {
  const isOpen = languageMenu.classList.toggle("is-open");
  languageButton.setAttribute("aria-expanded", String(isOpen));
});
document.addEventListener("click", (event) => {
  if (!languageMenu.contains(event.target)) {
    languageMenu.classList.remove("is-open");
    languageButton.setAttribute("aria-expanded", "false");
  }
});

renderRoute();

