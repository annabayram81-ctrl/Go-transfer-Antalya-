(function () {
  "use strict";

  if (window.__goTransferGiftPromoLoaded) return;
  window.__goTransferGiftPromoLoaded = true;

  const STORAGE_KEY = "gotransfer_return_discount_v1";
  const LANGUAGE_KEY = "gotransfer-language";
  const WHATSAPP_PHONE = "905346801828";
  const sectors = [5, 10, 5, 15, 10, 5, 20, 10, 15, 5];
  const supportedLanguages = ["ru", "tr", "en", "de", "ar"];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const copy = {
    ru: {
      gift: "Ваш подарок", title: "Выиграйте скидку на обратный трансфер",
      intro: "Прокрутите колесо один раз и сохраните персональную скидку для обратной поездки.",
      terms: "Скидка действует на обратный трансфер при бронировании поездки туда и обратно.",
      spin: "Крутить колесо", used: "Колесо уже использовано", close: "Закрыть",
      wheel: "Колесо скидок с десятью секторами", won: (v) => `Поздравляем! Ваша скидка — ${v}%`,
      whatsapp: "Получить скидку в WhatsApp", icon: "Открыть подарок",
      message: (v) => `Здравствуйте! Я выиграл(а) скидку ${v}% на обратный трансфер GoTransfer Antalya.`,
    },
    tr: {
      gift: "Hediyeniz", title: "Dönüş transferinizde indirim kazanın",
      intro: "Çarkı bir kez çevirin ve dönüş yolculuğunuz için kişisel indiriminizi alın.",
      terms: "İndirim, gidiş-dönüş rezervasyonundaki dönüş transferi için geçerlidir.",
      spin: "Çarkı çevir", used: "Çark daha önce kullanıldı", close: "Kapat",
      wheel: "On bölümlü indirim çarkı", won: (v) => `Tebrikler! İndiriminiz %${v}`,
      whatsapp: "İndirimi WhatsApp'ta al", icon: "Hediyeyi aç",
      message: (v) => `Merhaba! GoTransfer Antalya ile dönüş transferimde %${v} indirim kazandım.`,
    },
    en: {
      gift: "Your gift", title: "Win a discount on your return transfer",
      intro: "Spin once and unlock a personal discount for your return journey.",
      terms: "The discount applies to the return transfer when booking a round trip.",
      spin: "Spin the wheel", used: "The wheel has already been used", close: "Close",
      wheel: "Discount wheel with ten sectors", won: (v) => `Congratulations! Your discount is ${v}%`,
      whatsapp: "Claim discount on WhatsApp", icon: "Open your gift",
      message: (v) => `Hello! I won a ${v}% discount on my return transfer with GoTransfer Antalya.`,
    },
    de: {
      gift: "Ihr Geschenk", title: "Gewinnen Sie Rabatt auf Ihren Rücktransfer",
      intro: "Drehen Sie das Rad einmal und sichern Sie sich Ihren persönlichen Rabatt für die Rückfahrt.",
      terms: "Der Rabatt gilt für den Rücktransfer bei Buchung einer Hin- und Rückfahrt.",
      spin: "Rad drehen", used: "Das Rad wurde bereits verwendet", close: "Schließen",
      wheel: "Rabattrad mit zehn Feldern", won: (v) => `Glückwunsch! Ihr Rabatt beträgt ${v} %`,
      whatsapp: "Rabatt über WhatsApp einlösen", icon: "Geschenk öffnen",
      message: (v) => `Hallo! Ich habe ${v} % Rabatt auf meinen Rücktransfer mit GoTransfer Antalya gewonnen.`,
    },
    ar: {
      gift: "هديتك", title: "اربح خصماً على رحلة العودة",
      intro: "أدر العجلة مرة واحدة واحصل على خصمك الشخصي لرحلة العودة.",
      terms: "يسري الخصم على رحلة العودة عند حجز الذهاب والعودة.",
      spin: "أدر العجلة", used: "تم استخدام العجلة بالفعل", close: "إغلاق",
      wheel: "عجلة خصومات من عشرة أقسام", won: (v) => `تهانينا! خصمك ${v}%`,
      whatsapp: "استخدم الخصم عبر واتساب", icon: "افتح هديتك",
      message: (v) => `مرحباً! ربحت خصماً بنسبة ${v}% على رحلة العودة مع GoTransfer Antalya.`,
    },
  };

  function currentLanguage() {
    const saved = window.localStorage.getItem(LANGUAGE_KEY);
    const documentLanguage = document.documentElement.lang?.toLowerCase();
    return supportedLanguages.includes(documentLanguage) ? documentLanguage : supportedLanguages.includes(saved) ? saved : "ru";
  }

  function track(eventName, parameters = {}) {
    if (typeof window.gtag === "function") return window.gtag("event", eventName, parameters);
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: eventName, ...parameters });
  }

  function readCoupon() {
    try {
      const value = Number(window.localStorage.getItem(STORAGE_KEY));
      if ([5, 10, 15, 20].includes(value)) return value;
    } catch {}
    const match = document.cookie.match(new RegExp(`(?:^|; )${STORAGE_KEY}=([^;]*)`));
    const value = match ? Number(decodeURIComponent(match[1])) : 0;
    return [5, 10, 15, 20].includes(value) ? value : null;
  }

  function saveCoupon(value) {
    try { window.localStorage.setItem(STORAGE_KEY, String(value)); } catch {}
    document.cookie = `${STORAGE_KEY}=${encodeURIComponent(value)}; Max-Age=31536000; Path=/; SameSite=Lax`;
  }

  function randomSectorIndex() {
    if (window.crypto && typeof window.crypto.getRandomValues === "function") {
      const limit = Math.floor(0x100000000 / sectors.length) * sectors.length;
      const values = new Uint32Array(1);
      do window.crypto.getRandomValues(values); while (values[0] >= limit);
      return values[0] % sectors.length;
    }
    return Math.floor(Math.random() * sectors.length);
  }

  const style = document.createElement("link");
  style.rel = "stylesheet";
  style.href = "/return-transfer-ui.css?v=20260812-restore-1";
  document.head.append(style);

  const root = document.createElement("div");
  root.className = "gift-promo";
  root.innerHTML = `
    <button class="gift-promo__teaser" type="button" aria-haspopup="dialog" aria-controls="giftPromoDialog">
      <span class="gift-promo__box" aria-hidden="true"><span></span></span>
    </button>
    <div class="gift-promo__backdrop" hidden></div>
    <section class="gift-promo__dialog" id="giftPromoDialog" role="dialog" aria-modal="true" aria-labelledby="giftPromoTitle" hidden>
      <button class="gift-promo__close" type="button">×</button>
      <div class="gift-promo__header">
        <p class="gift-promo__eyebrow"></p><h2 id="giftPromoTitle"></h2><p class="gift-promo__intro"></p>
      </div>
      <div class="gift-promo__wheel-wrap">
        <span class="gift-promo__pointer" aria-hidden="true"></span>
        <div class="gift-promo__wheel" role="img">
          ${sectors.map((value, index) => `<span style="--sector:${index}">${value}%</span>`).join("")}
        </div>
        <button class="gift-promo__spin" type="button"></button>
      </div>
      <p class="gift-promo__terms"></p>
      <div class="gift-promo__result" aria-live="polite" hidden><h3></h3><a class="gift-promo__whatsapp" target="_blank" rel="noreferrer"></a></div>
    </section>`;

  document.body.append(root);
  const teaser = root.querySelector(".gift-promo__teaser");
  const backdrop = root.querySelector(".gift-promo__backdrop");
  const dialog = root.querySelector(".gift-promo__dialog");
  const closeButton = root.querySelector(".gift-promo__close");
  const wheel = root.querySelector(".gift-promo__wheel");
  const spinButton = root.querySelector(".gift-promo__spin");
  const result = root.querySelector(".gift-promo__result");
  const resultTitle = result.querySelector("h3");
  const whatsapp = result.querySelector(".gift-promo__whatsapp");
  function mountTeaser() {
    const target = document.querySelector(".site-quick-actions") || document.querySelector(".quick-links") || document.querySelector(".topbar__actions") || document.querySelector("header nav");
    if (target && teaser.parentElement !== target) target.append(teaser);
  }
  mountTeaser();
  const mountObserver = new MutationObserver(mountTeaser);
  mountObserver.observe(document.body, { childList: true, subtree: true });
  let coupon = readCoupon();
  let spinning = false;
  let language = currentLanguage();

  function rotationFor(index, animated) { return `${(animated ? 6 * 360 : 0) - index * 36}deg`; }
  function sectorIndexFor(value) { const index = sectors.indexOf(value); return index < 0 ? 0 : index; }

  function applyLanguage() {
    language = currentLanguage();
    const text = copy[language];
    document.documentElement.dir = language === "ar" ? "rtl" : document.documentElement.dir || "ltr";
    teaser.setAttribute("aria-label", text.icon);
    closeButton.setAttribute("aria-label", text.close);
    root.querySelector(".gift-promo__eyebrow").textContent = text.gift;
    root.querySelector("#giftPromoTitle").textContent = text.title;
    root.querySelector(".gift-promo__intro").textContent = text.intro;
    root.querySelector(".gift-promo__terms").textContent = coupon ? text.used : text.terms;
    wheel.setAttribute("aria-label", text.wheel);
    spinButton.textContent = text.spin;
    whatsapp.textContent = text.whatsapp;
    if (coupon) showCoupon(coupon, false);
  }

  function showCoupon(value, announce) {
    coupon = value;
    const text = copy[language];
    wheel.style.transform = `rotate(${rotationFor(sectorIndexFor(value), false)})`;
    spinButton.hidden = true;
    result.hidden = false;
    resultTitle.textContent = text.won(value);
    root.querySelector(".gift-promo__terms").textContent = text.used;
    whatsapp.href = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text.message(value))}`;
    if (announce) track("coupon_won", { discount_percent: value });
  }

  function openDialog() {
    applyLanguage();
    backdrop.hidden = false; dialog.hidden = false;
    document.body.classList.add("gift-promo-open");
    track("gift_open");
  }
  function closeDialog() {
    if (spinning) return;
    backdrop.hidden = true; dialog.hidden = true;
    document.body.classList.remove("gift-promo-open"); teaser.focus();
  }

  teaser.addEventListener("click", openDialog);
  closeButton.addEventListener("click", closeDialog);
  backdrop.addEventListener("click", closeDialog);
  document.addEventListener("keydown", (event) => { if (event.key === "Escape" && !dialog.hidden) closeDialog(); });
  document.addEventListener("click", (event) => {
    if (event.target.closest(".language-menu__option")) window.setTimeout(applyLanguage, 0);
  });

  spinButton.addEventListener("click", () => {
    if (spinning || coupon) return;
    const lockedCoupon = readCoupon();
    if (lockedCoupon) return showCoupon(lockedCoupon, false);
    spinning = true; spinButton.disabled = true;
    const index = randomSectorIndex();
    const value = sectors[index];
    saveCoupon(value); coupon = value; spinButton.hidden = true;
    track("wheel_spin");
    wheel.style.setProperty("--spin-duration", reduceMotion ? "0.25s" : "4.8s");
    requestAnimationFrame(() => { wheel.style.transform = `rotate(${rotationFor(index, true)})`; });
    window.setTimeout(() => {
      spinning = false; wheel.style.transition = "none"; showCoupon(value, true);
      void wheel.offsetWidth; wheel.style.transition = ""; whatsapp.focus({ preventScroll: true });
    }, reduceMotion ? 300 : 4900);
  });

  whatsapp.addEventListener("click", () => track("coupon_whatsapp_click", { discount_percent: coupon }));
  window.addEventListener("storage", (event) => {
    if (event.key === LANGUAGE_KEY) applyLanguage();
    if (event.key !== STORAGE_KEY) return;
    const lockedCoupon = readCoupon();
    if (!lockedCoupon) return;
    coupon = lockedCoupon; spinButton.disabled = true; spinButton.hidden = true;
    if (!spinning) showCoupon(lockedCoupon, false);
  });
  applyLanguage();
})();
