export const LANGUAGE_KEY = "gotransfer-language";
export const supportedLanguages = ["ru", "tr", "en"];

export function getLanguage() {
  const saved = localStorage.getItem(LANGUAGE_KEY);
  return supportedLanguages.includes(saved) ? saved : "ru";
}

export function bindLanguageMenu(menu, onChange) {
  const button = menu.querySelector(".language-menu__button");
  const options = [...menu.querySelectorAll(".language-menu__option")];

  options.forEach((option) => {
    const language = (option.dataset.language || option.textContent).trim().toLowerCase();
    option.dataset.language = language;
    option.disabled = false;
    option.removeAttribute("aria-disabled");
    option.addEventListener("click", () => {
      localStorage.setItem(LANGUAGE_KEY, language);
      menu.classList.remove("is-open");
      button.setAttribute("aria-expanded", "false");
      onChange(language);
    });
  });

  button.addEventListener("click", () => {
    const open = menu.classList.toggle("is-open");
    button.setAttribute("aria-expanded", String(open));
  });

  document.addEventListener("click", (event) => {
    if (!menu.contains(event.target)) {
      menu.classList.remove("is-open");
      button.setAttribute("aria-expanded", "false");
    }
  });

  return (language) => {
    button.querySelector("span").textContent = language.toUpperCase();
    options.forEach((option) => {
      const active = option.dataset.language === language;
      option.classList.toggle("is-active", active);
      option.setAttribute("aria-selected", String(active));
    });
  };
}

export function setupBackButton(button, fallback) {
  button?.addEventListener("click", () => {
    if (history.length > 1) history.back();
    else location.href = fallback;
  });
}

