import { placesBySlug, whatsappPhone } from "./route-data.js?v=20260727-pwa-55";

const pathSlug = location.pathname.split("/").filter(Boolean).at(-1);
const querySlug = new URLSearchParams(location.search).get("slug");
const slug = placesBySlug[pathSlug] ? pathSlug : querySlug;
const place = placesBySlug[slug] || {
  title: "Достопримечательность",
  description: "Скоро здесь появится подробная информация.",
};

document.title = `${place.title} — подробная страница готовится`;
document.querySelector("#placeTitle").textContent = place.title;
document.querySelector("#placeDescription").textContent = place.description;
document.querySelector("#placeOperatorLink").href =
  `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(`Здравствуйте! Меня интересует остановка «${place.title}» во время VIP-трансфера из аэропорта Антальи в Лару.`)}`;

