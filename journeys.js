document.documentElement.classList.toggle(
  "gotransfer-android-app",
  /GoTransferAndroid/i.test(navigator.userAgent) ||
    new URLSearchParams(location.search).has("androidPreview"),
);
const grid=document.querySelector("#journeyGrid");
const bookingUrl=(title,language)=>`https://wa.me/905346801828?text=${encodeURIComponent(language==="ar"?`مرحباً، أود حجز رحلة كبار الشخصيات «${title}».`:language==="de"?`Guten Tag! Ich möchte die VIP-Reise „${title}“ buchen.`:language==="tr"?`Merhaba! “${title}” VIP yolculuğunu rezerve etmek istiyorum.`:language==="en"?`Hello! I would like to book the VIP journey “${title}”.`:`Здравствуйте! Хочу забронировать однодневное VIP-путешествие «${title}».`)}`;
function ensureMeta(property){let meta=document.head.querySelector(`meta[property="${property}"]`);if(!meta){meta=document.createElement("meta");meta.setAttribute("property",property);document.head.appendChild(meta)}return meta}
function renderJourneys(language=window.GoTransferLocale?.get()||"ru"){
  const copy=window.JourneyLocales.getPage(language),items=window.JourneyLocales.items(language);
  window.GoTransferLocale?.applyDocument(language);document.title=copy.title;document.querySelector('meta[name="description"]').content=copy.meta;ensureMeta("og:title").content=copy.title;ensureMeta("og:description").content=copy.meta;
  const back=document.querySelector(".journeys-topbar nav>a:first-child");if(back)back.textContent=copy.back;
  const hero=document.querySelector(".journeys-hero>div:last-child");hero.querySelector("p").textContent=copy.kicker;hero.querySelector("h1").textContent=copy.hero;hero.querySelector("span").textContent=copy.lead;hero.querySelector("a").textContent=copy.choose;
  const intro=document.querySelector(".journey-list>header");intro.querySelector("p").textContent=copy.listKicker;intro.querySelector("h2").textContent=copy.listTitle;intro.querySelector("span").textContent=copy.listText;
  const cta=document.querySelector(".journey-cta");cta.querySelector("p").textContent=copy.ctaKicker;cta.querySelector("h2").textContent=copy.ctaTitle;cta.querySelector("span").textContent=copy.ctaText;cta.querySelector("a").textContent=copy.ctaButton;
  const footer=document.querySelectorAll("footer a");footer[0].textContent=copy.home;footer[1].textContent=copy.services;document.querySelector(".mobile-back-button span").textContent=copy.backMobile;
  grid.innerHTML=items.map(item=>{const detailsUrl=`/journeys/${item.slug}?lang=${language}`;return`<article class="journey-card" role="link" tabindex="0" data-details-url="${detailsUrl}" aria-label="${item.title}"><a class="journey-card__image-link" href="${detailsUrl}" aria-label="${item.title}"><img src="${item.image}" alt="${item.title}" loading="lazy"><span class="journey-card__shade"></span></a><div><small>${copy.duration} · ${item.duration}</small><h3>${item.title}</h3><p>${item.description}</p><nav><a href="${detailsUrl}">${copy.details}</a><a class="book" href="${bookingUrl(item.title,language)}" target="_blank" rel="noreferrer">${copy.book}</a></nav></div></article>`}).join("");
  grid.querySelectorAll(".journey-card").forEach(card=>{
    const open=event=>{if(event.target.closest("a,button"))return;if(event.type==="keydown"&&!['Enter',' '].includes(event.key))return;event.preventDefault();location.href=card.dataset.detailsUrl};
    card.addEventListener("click",open);card.addEventListener("keydown",open);
  });
}
renderJourneys();window.addEventListener("gotransfer:languagechange",event=>renderJourneys(event.detail.language));
