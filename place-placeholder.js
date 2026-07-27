import { places, whatsappPhone } from "./route-data.js?v=20260727-pwa-54";

const pathSlug = location.pathname.split("/").filter(Boolean).at(-1);
const querySlug = new URLSearchParams(location.search).get("slug");
const slug = places[pathSlug] ? pathSlug : querySlug;
const place = places[slug] || { name: "Достопримечательность", description: "Скоро здесь появится подробная информация." };

document.title = `${place.name} — подробная страница готовится`;
document.querySelector("#placeTitle").textContent = place.name;
document.querySelector("#placeDescription").textContent = place.description;
document.querySelector("#placeOperatorLink").href =
  `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(`Здравствуйте! Меня интересует остановка «${place.name}» во время VIP-трансфера из аэропорта Антальи в Лару.`)}`;

