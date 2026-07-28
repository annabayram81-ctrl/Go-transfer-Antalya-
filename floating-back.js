import { getLanguage, setupBackButton } from "./journey-language.js?v=20260727-pwa-60";

const labels = {
  ru: "Назад",
  en: "Back",
  tr: "Geri",
};

document.querySelectorAll("[data-floating-back]").forEach((button) => {
  const language = getLanguage();
  const label = button.querySelector("span");
  if (label) label.textContent = labels[language] || labels.ru;
  setupBackButton(button, button.dataset.backFallback || "/");
});
