const languageMenu = document.querySelector("#servicesLanguageMenu");
const languageButton = document.querySelector("#servicesLanguageButton");
const languageOptions = document.querySelectorAll("[data-services-language]");

languageButton.addEventListener("click", () => {
  const isOpen = languageMenu.classList.toggle("is-open");
  languageButton.setAttribute("aria-expanded", String(isOpen));
});

languageOptions.forEach((button) => {
  button.addEventListener("click", () => {
    const language = button.dataset.servicesLanguage;

    if (language === "ru") {
      languageMenu.classList.remove("is-open");
      languageButton.setAttribute("aria-expanded", "false");
      return;
    }

    localStorage.setItem("gotransfer-language", language);
    window.location.href = "./";
  });
});

document.addEventListener("click", (event) => {
  if (!languageMenu.contains(event.target)) {
    languageMenu.classList.remove("is-open");
    languageButton.setAttribute("aria-expanded", "false");
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    languageMenu.classList.remove("is-open");
    languageButton.setAttribute("aria-expanded", "false");
    languageButton.focus();
  }
});

