import { getLanguage, setupBackButton } from "./journey-language.js?v=20260729-i18n-1";

const labels = {
  ru: "Назад",
  en: "Back",
  tr: "Geri",
  de: "Zurück",
  ar: "رجوع",
};

document.querySelectorAll("[data-floating-back]").forEach((button) => {
  const language = getLanguage();
  const label = button.querySelector("span");
  if (label) label.textContent = labels[language] || labels.ru;
  setupBackButton(button, button.dataset.backFallback || "/");
});

window.addEventListener("gotransfer:languagechange", (event) => {
  document.querySelectorAll("[data-floating-back] span").forEach((label) => {
    label.textContent = labels[event.detail.language] || labels.ru;
  });
});
