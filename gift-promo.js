(function () {
  "use strict";

  if (window.__goTransferGiftPromoLoaded) return;
  window.__goTransferGiftPromoLoaded = true;

  const STORAGE_KEY = "gotransfer_return_discount_v1";
  const WHATSAPP_PHONE = "905346801828";
  const sectors = [5, 10, 5, 15, 10, 5, 20, 10, 15, 5];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function track(eventName, parameters = {}) {
    if (typeof window.gtag === "function") {
      window.gtag("event", eventName, parameters);
      return;
    }
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
    try {
      window.localStorage.setItem(STORAGE_KEY, String(value));
    } catch {}
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
  style.href = "/gift-promo.css?v=20260809-1";
  document.head.append(style);

  const root = document.createElement("div");
  root.className = "gift-promo";
  root.innerHTML = `
    <button class="gift-promo__teaser" type="button" aria-haspopup="dialog" aria-controls="giftPromoDialog">
      <span class="gift-promo__box" aria-hidden="true"><span></span></span>
      <span class="gift-promo__teaser-text">🎁 Выиграйте до 20% скидки на обратный трансфер!</span>
    </button>
    <div class="gift-promo__backdrop" hidden></div>
    <section class="gift-promo__dialog" id="giftPromoDialog" role="dialog" aria-modal="true" aria-labelledby="giftPromoTitle" hidden>
      <button class="gift-promo__close" type="button" aria-label="Закрыть">×</button>
      <p class="gift-promo__eyebrow">ПОДАРОК ОТ GO TRANSFER</p>
      <h2 id="giftPromoTitle">Колесо удачи</h2>
      <p class="gift-promo__intro">Выиграйте скидку на обратную поездку</p>
      <div class="gift-promo__wheel-wrap">
        <span class="gift-promo__pointer" aria-hidden="true"></span>
        <div class="gift-promo__wheel" role="img" aria-label="Колесо скидок с десятью секторами">
          ${sectors.map((value, index) => `<span style="--sector:${index}">${value}%</span>`).join("")}
        </div>
        <button class="gift-promo__spin" type="button">Крутить</button>
      </div>
      <div class="gift-promo__result" aria-live="polite" hidden>
        <h3></h3>
        <p>Скидка действует на обратную поездку при бронировании трансфера туда и обратно.</p>
        <a class="gift-promo__whatsapp" target="_blank" rel="noreferrer">Получить купон в WhatsApp</a>
      </div>
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
  let coupon = readCoupon();
  let spinning = false;

  function sectorIndexFor(value) {
    const index = sectors.indexOf(value);
    return index < 0 ? 0 : index;
  }

  function rotationFor(index, animated) {
    return `${(animated ? 6 * 360 : 0) - index * 36}deg`;
  }

  function showCoupon(value, announce) {
    const index = sectorIndexFor(value);
    coupon = value;
    wheel.style.transform = `rotate(${rotationFor(index, false)})`;
    spinButton.hidden = true;
    result.hidden = false;
    resultTitle.textContent = `🎉 Поздравляем! Вы выиграли ${value}% скидки на обратный трансфер!`;
    const message = `Здравствуйте! 🎁 Я выиграл(а) ${value}% скидки на обратный трансфер на сайте Go Transfer Antalya. Хочу воспользоваться моим купоном.`;
    whatsapp.href = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
    if (announce) track("coupon_won", { discount_percent: value });
  }

  function openDialog() {
    backdrop.hidden = false;
    dialog.hidden = false;
    document.body.classList.add("gift-promo-open");
    track("gift_open");
    if (coupon) showCoupon(coupon, false);
    window.setTimeout(() => (coupon ? whatsapp : spinButton).focus(), 0);
  }

  function closeDialog() {
    if (spinning) return;
    backdrop.hidden = true;
    dialog.hidden = true;
    document.body.classList.remove("gift-promo-open");
    teaser.focus();
  }

  teaser.addEventListener("click", openDialog);
  closeButton.addEventListener("click", closeDialog);
  backdrop.addEventListener("click", closeDialog);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !dialog.hidden) closeDialog();
  });

  spinButton.addEventListener("click", () => {
    if (spinning || coupon) return;
    const lockedCoupon = readCoupon();
    if (lockedCoupon) {
      showCoupon(lockedCoupon, false);
      return;
    }
    spinning = true;
    spinButton.disabled = true;
    const index = randomSectorIndex();
    const value = sectors[index];
    saveCoupon(value);
    coupon = value;
    spinButton.hidden = true;
    track("wheel_spin");
    wheel.style.setProperty("--spin-duration", reduceMotion ? "0.25s" : "4.8s");
    requestAnimationFrame(() => {
      wheel.style.transform = `rotate(${rotationFor(index, true)})`;
    });
    window.setTimeout(() => {
      spinning = false;
      wheel.style.transition = "none";
      showCoupon(value, true);
      void wheel.offsetWidth;
      wheel.style.transition = "";
      whatsapp.focus();
    }, reduceMotion ? 300 : 4900);
  });

  whatsapp.addEventListener("click", () => {
    track("coupon_whatsapp_click", { discount_percent: coupon });
  });

  window.addEventListener("storage", (event) => {
    if (event.key !== STORAGE_KEY) return;
    const lockedCoupon = readCoupon();
    if (!lockedCoupon) return;
    coupon = lockedCoupon;
    spinButton.disabled = true;
    spinButton.hidden = true;
    if (!spinning) showCoupon(lockedCoupon, false);
  });
})();
