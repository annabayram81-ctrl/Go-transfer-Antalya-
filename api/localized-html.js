import { defaultLanguage, languageNames, supportedLanguages, ui } from "../i18n-content.js";
import { calculateTransferPrice, STANDARD_TARIFF_TIER } from "../pricing.js";

const origin = "https://gotransfer.my";
const escapeHtml = (value) => String(value ?? "").replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

export function validLanguage(value) {
  return supportedLanguages.includes(value) ? value : null;
}

export function localizedPath(language, path = "/") {
  return path === "/" ? `/${language}` : `/${language}${path}`;
}

function seoLinks(path, availableLanguages) {
  return `${availableLanguages.map((language) => `    <link rel="alternate" hreflang="${language}" href="${origin}${localizedPath(language, path)}" />`).join("\n")}
    <link rel="alternate" hreflang="x-default" href="${origin}${localizedPath(defaultLanguage, path)}" />`;
}

function languageNav(path, currentLanguage, availableLanguages) {
  return `<nav class="language-links" aria-label="${escapeHtml(ui[currentLanguage].language)}">${availableLanguages.map((language) => `<a href="${localizedPath(language, path)}" lang="${language}"${language === currentLanguage ? ' aria-current="page"' : ""}>${escapeHtml(languageNames[language])}</a>`).join(" ")}</nav>`;
}

function menu(path, language, availableLanguages) {
  return `<div class="language-menu"><button class="language-menu__button" type="button" aria-label="${escapeHtml(ui[language].language)}" aria-expanded="false"><span>${language.toUpperCase()}</span><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4.1 6.2 8 10.1l3.9-3.9" /></svg></button><div class="language-menu__list" role="listbox">${availableLanguages.map((item) => `<a class="language-menu__option${item === language ? " is-active" : ""}" href="${localizedPath(item, path)}" lang="${item}"${item === language ? ' aria-current="page"' : ""}>${item.toUpperCase()}</a>`).join("")}</div></div>`;
}

function commonScript() {
  return `<script>document.querySelectorAll('.language-menu__button').forEach(function(b){b.addEventListener('click',function(){var x=b.getAttribute('aria-expanded')==='true';b.setAttribute('aria-expanded',String(!x));b.closest('.language-menu').classList.toggle('is-open',!x)})});document.querySelectorAll('[data-add-stop]').forEach(function(b){b.addEventListener('click',function(){var on=b.getAttribute('aria-pressed')==='true';b.setAttribute('aria-pressed',String(!on));b.closest('.stop-card').classList.toggle('is-selected',!on)})});document.querySelectorAll('.mobile-back-button').forEach(function(b){b.addEventListener('click',function(){history.length>1?history.back():location.assign(b.dataset.fallback||'/')})});</script><script src="/return-transfer-ui.js?v=20260812-restore-8"></script>`;
}

function kunduRouteBody({ language, path, h1, lead, image, sections, availableLanguages, entity }) {
  const copy = ui[language];
  const price = calculateTransferPrice(STANDARD_TARIFF_TIER, entity.distanceKm, 2);
  const labels = {
    ru:{back:"Все направления",distance:"Расстояние",time:"Время в пути",duration:"20–30 минут",price:"Цена",from:"от",book:"Забронировать трансфер",about:"О районе Kundu",related:"Смотрите также",lara:"Lara",belek:"Belek",antalya:"Antalya",routes:"Все направления"},
    en:{back:"All destinations",distance:"Distance",time:"Travel time",duration:"20–30 minutes",price:"Price",from:"from",book:"Book a transfer",about:"About Kundu",related:"Related routes",lara:"Lara",belek:"Belek",antalya:"Antalya",routes:"All destinations"},
    tr:{back:"Tüm rotalar",distance:"Mesafe",time:"Yolculuk süresi",duration:"20–30 dakika",price:"Fiyat",from:"başlangıç",book:"Transfer rezervasyonu",about:"Kundu hakkında",related:"İlgili rotalar",lara:"Lara",belek:"Belek",antalya:"Antalya",routes:"Tüm rotalar"},
    de:{back:"Alle Ziele",distance:"Entfernung",time:"Fahrzeit",duration:"20–30 Minuten",price:"Preis",from:"ab",book:"Transfer buchen",about:"Über Kundu",related:"Weitere Routen",lara:"Lara",belek:"Belek",antalya:"Antalya",routes:"Alle Ziele"},
    ar:{back:"كل الوجهات",distance:"المسافة",time:"مدة الرحلة",duration:"20–30 دقيقة",price:"السعر",from:"ابتداءً من",book:"احجز خدمة النقل",about:"عن Kundu",related:"مسارات ذات صلة",lara:"Lara",belek:"Belek",antalya:"Antalya",routes:"كل الوجهات"}
  }[language];
  const whatsapp = `https://wa.me/905346801828?text=${encodeURIComponent(`${h1} — ${labels.from} €${price}`)}`;
  const links = [
    [labels.lara, `/routes/lara?lang=${language}`],
    [labels.belek, `/routes/belek?lang=${language}`],
    [labels.antalya, localizedPath(language,"/")],
    [labels.routes, "/routes"],
  ];
  return `<header class="route-detail-topbar"><a class="brand" href="${localizedPath(language,"/")}"><span class="brand__text"><span>GoTransfer</span></span></a><div class="topbar__actions"><a class="route-detail-back" href="${localizedPath(language,"/routes")}">${escapeHtml(labels.back)}</a><div class="quick-links"><a class="topbar__icon-link topbar__icon-link--whatsapp topbar__icon-link--compact" href="${whatsapp}" target="_blank" rel="noreferrer">WhatsApp</a></div>${menu(path,language,availableLanguages)}</div></header><main><section class="route-hero kundu-hero"><img src="${escapeHtml(image)}" alt="${escapeHtml(h1)}"><span class="route-hero__overlay"></span><div class="route-hero__content"><a class="route-breadcrumb" href="${localizedPath(language,"/routes")}">← ${escapeHtml(labels.back)}</a><p class="route-hero__eyebrow">${escapeHtml(copy.routeKicker)}</p><h1>${escapeHtml(h1)}</h1><p>${escapeHtml(lead)}</p><dl class="route-facts"><div><dt>${escapeHtml(labels.distance)}</dt><dd>≈ ${escapeHtml(entity.distanceKm)} km</dd></div><div><dt>${escapeHtml(labels.time)}</dt><dd>≈ ${escapeHtml(labels.duration)}</dd></div><div><dt>${escapeHtml(labels.price)}</dt><dd>${escapeHtml(labels.from)} €${price}</dd></div></dl><div class="route-hero__actions"><a class="route-action route-action--primary" href="${localizedPath(language,"/")}#booking">${escapeHtml(labels.book)}</a><a class="route-action route-action--secondary" href="${whatsapp}" target="_blank" rel="noreferrer">WhatsApp</a></div></div></section><section class="kundu-story route-container" aria-labelledby="kunduAbout"><header><p class="section-kicker">Kundu</p><h2 id="kunduAbout">${escapeHtml(labels.about)}</h2></header><div class="kundu-story__grid">${sections.map((section,index)=>`<article><span>${String(index+1).padStart(2,"0")}</span><h3>${escapeHtml(section.title)}</h3><p>${escapeHtml(section.text)}</p></article>`).join("")}</div></section><section class="kundu-links route-container" aria-labelledby="kunduLinks"><h2 id="kunduLinks">${escapeHtml(labels.related)}</h2><nav>${links.map(([label,href])=>`<a href="${href}">${escapeHtml(label)} <span aria-hidden="true">→</span></a>`).join("")}</nav></section></main><footer class="route-footer"><span>GoTransfer</span><a href="${localizedPath(language,"/routes")}">${escapeHtml(labels.routes)}</a></footer><button class="mobile-back-button" data-fallback="${localizedPath(language,"/routes")}" type="button">← <span>${escapeHtml(labels.back)}</span></button>${commonScript()}`;
}

function routeBody({ language, path, h1, lead, image, sections, availableLanguages, entity }) {
  const copy = ui[language];
  const labels = {
    ru:{back:"Назад к направлениям",choose:"Выбрать остановки",direct:"Удобно посетить по пути",extra:"Можно добавить как мини-путешествие",details:"Подробнее",add:"Добавить к маршруту",help:"Не знаете, что выбрать?",privacy:"Политика конфиденциальности"},
    en:{back:"Back to destinations",choose:"Choose stops",direct:"Convenient places to visit on the way",extra:"Add a mini-journey",details:"Learn more",add:"Add to route",help:"Not sure what to choose?",privacy:"Privacy policy"},
    tr:{back:"Rotalara dön",choose:"Durakları seçin",direct:"Yol üzerinde kolayca ziyaret edin",extra:"Mini bir yolculuk ekleyin",details:"Daha fazla",add:"Rotaya ekle",help:"Ne seçeceğinizden emin değil misiniz?",privacy:"Gizlilik politikası"},
    de:{back:"Zurück zu den Zielen",choose:"Zwischenstopps wählen",direct:"Bequem unterwegs besuchen",extra:"Als Mini-Ausflug ergänzen",details:"Mehr erfahren",add:"Zur Route hinzufügen",help:"Sie sind noch unsicher?",privacy:"Datenschutz"},
    ar:{back:"العودة إلى الوجهات",choose:"اختر المحطات",direct:"أماكن يسهل زيارتها في الطريق",extra:"أضف جولة قصيرة",details:"التفاصيل",add:"أضف إلى المسار",help:"لست متأكداً ماذا تختار؟",privacy:"سياسة الخصوصية"}
  }[language];
  const allStops = [...(entity?.directStops || []), ...(entity?.extraTrips || [])];
  const cards = allStops.map((slug,index)=>`<article class="stop-card"><div class="stop-card__visual"><img src="/images/places/${slug}.jpg" alt="${escapeHtml(slug.replaceAll('-', ' '))}" loading="lazy" decoding="async"><span class="stop-card__number">${String(index+1).padStart(2,'0')}</span></div><div class="stop-card__body"><span class="stop-card__category">${escapeHtml(copy.placeKicker)}</span><h3>${escapeHtml(slug.replaceAll('-', ' '))}</h3><p>${escapeHtml(sections[index % Math.max(sections.length,1)]?.text || lead)}</p><div class="stop-card__actions"><a href="${localizedPath(language, `/places/${slug}`)}">${escapeHtml(labels.details)}</a><button type="button" data-add-stop="${slug}" aria-pressed="false">${escapeHtml(labels.add)}</button></div></div></article>`).join("");
  return `<header class="route-detail-topbar"><a class="brand" href="${localizedPath(language,'/')}"><span class="brand__text"><span>GoTransfer</span></span></a><div class="topbar__actions"><a class="route-detail-back" href="${localizedPath(language,'/routes')}">${escapeHtml(labels.back)}</a><div class="quick-links"><a class="topbar__icon-link topbar__icon-link--whatsapp topbar__icon-link--compact" href="https://wa.me/905346801828" target="_blank" rel="noreferrer">WhatsApp</a><a class="topbar__icon-link topbar__icon-link--telegram topbar__icon-link--compact" href="https://t.me/AnnaBayram07" target="_blank" rel="noreferrer">Telegram</a></div>${menu(path,language,availableLanguages)}</div></header><main><section class="route-hero"><img id="routeHeroImage" src="${escapeHtml(image)}" alt="${escapeHtml(h1)}"><span class="route-hero__overlay"></span><div class="route-hero__content"><a class="route-breadcrumb" href="${localizedPath(language,'/routes')}">← ${escapeHtml(labels.back)}</a><p class="route-hero__eyebrow">${escapeHtml(copy.routeKicker)}</p><h1>${escapeHtml(h1)}</h1><p>${escapeHtml(lead)}</p><div class="route-hero__actions"><a class="route-action route-action--primary" href="https://wa.me/905346801828" target="_blank" rel="noreferrer">${escapeHtml(copy.contact)}</a><a class="route-action route-action--secondary" href="#routeStops">${escapeHtml(labels.choose)}</a></div></div></section><section class="route-section route-container" id="routeStops"><header class="route-section__head"><div><p class="section-kicker">${escapeHtml(copy.routeIntro)}</p><h2>${escapeHtml(labels.direct)}</h2></div><p>${escapeHtml(sections[0]?.text || lead)}</p></header><div class="stop-grid">${cards}</div></section><section class="route-intro route-container"><div><p class="section-kicker">${escapeHtml(copy.routeKicker)}</p><h2>${escapeHtml(sections[0]?.title || labels.extra)}</h2><p>${escapeHtml(sections[0]?.text || lead)}</p></div><ul>${sections.map(s=>`<li>${escapeHtml(s.title)}</li>`).join('')}</ul></section><section class="route-help route-container"><p class="section-kicker">${escapeHtml(copy.planning)}</p><h2>${escapeHtml(labels.help)}</h2><p>${escapeHtml(sections[1]?.text || lead)}</p><a class="route-action route-action--primary" href="https://wa.me/905346801828">${escapeHtml(copy.contact)}</a></section></main><footer class="route-footer"><span>GoTransfer</span><a href="/privacy">${escapeHtml(labels.privacy)}</a></footer><button class="mobile-back-button" data-fallback="${localizedPath(language,'/routes')}" type="button">← <span>${escapeHtml(labels.back)}</span></button>${commonScript()}`;
}

function placeBody({ language, path, h1, lead, image, sections, availableLanguages, entity }) {
  const copy=ui[language]; const labels={ru:["Вернуться к маршруту","Что посмотреть и чем заняться","Фотографии места","Сколько времени оставить?","Обсудить с оператором"],en:["Back to route","What to see and do","Photos of the place","How much time to allow?","Discuss with the operator"],tr:["Rotaya dön","Görülecek ve yapılacaklar","Mekân fotoğrafları","Ne kadar zaman ayırmalı?","Operatörle görüş"],de:["Zurück zur Route","Sehen und erleben","Fotos des Ortes","Wie viel Zeit einplanen?","Mit dem Kundenservice sprechen"],ar:["العودة إلى المسار","ماذا تشاهد وماذا تفعل","صور المكان","كم من الوقت تحتاج؟","تحدث مع فريق الخدمة"]}[language];
  const gallery=(entity?.gallery||[]).map((item,index)=>`<figure><img src="${escapeHtml(item.image)}" alt="${escapeHtml(h1)}" loading="${index?'lazy':'eager'}" decoding="async"><figcaption>${escapeHtml(language==='ru'?item.caption:h1)}</figcaption></figure>`).join('');
  return `<header class="place-detail-topbar"><a class="brand" href="${localizedPath(language,'/')}"><span class="brand__text"><span>GoTransfer</span></span></a><div class="topbar__actions"><a class="place-detail-route-link" href="${localizedPath(language,`/routes/${entity?.routeSlug||'alanya'}`)}">← ${escapeHtml(labels[0])}</a><div class="quick-links"><a class="topbar__icon-link topbar__icon-link--whatsapp topbar__icon-link--compact" href="https://wa.me/905346801828">WhatsApp</a><a class="topbar__icon-link topbar__icon-link--telegram topbar__icon-link--compact" href="https://t.me/AnnaBayram07">Telegram</a></div>${menu(path,language,availableLanguages)}</div></header><main><section class="place-hero"><img id="placeImage" src="${escapeHtml(image)}" alt="${escapeHtml(h1)}"><div class="place-hero__overlay"></div><div class="place-hero__content"><a href="${localizedPath(language,`/routes/${entity?.routeSlug||'alanya'}`)}">${escapeHtml(labels[0])}</a><p>${escapeHtml(copy.placeKicker)}</p><h1>${escapeHtml(h1)}</h1><span>${escapeHtml(lead)}</span><div class="place-hero__actions"><a class="place-primary-action" href="https://wa.me/905346801828">${escapeHtml(copy.contact)}</a><a class="place-secondary-action" href="${localizedPath(language,`/routes/${entity?.routeSlug||'alanya'}`)}">${escapeHtml(labels[0])}</a></div></div></section><section class="place-story"><div class="place-story__heading"><p>${escapeHtml(copy.highlights)}</p><h2>${escapeHtml(labels[1])}</h2></div><div class="place-highlights">${sections.map((s,i)=>`<article class="place-highlight"><span>${String(i+1).padStart(2,'0')}</span><h3>${escapeHtml(s.title)}</h3><p>${escapeHtml(s.text)}</p></article>`).join('')}</div></section>${gallery?`<section class="place-gallery"><div class="place-gallery__heading"><p>${escapeHtml(labels[2])}</p><h2>${escapeHtml(labels[2])}</h2></div><div class="place-gallery__grid">${gallery}</div></section>`:''}<section class="place-visit-note"><div><p>${escapeHtml(copy.planning)}</p><h2>${escapeHtml(labels[3])}</h2></div><span>${escapeHtml(sections.at(-1)?.text||lead)}</span></section><section class="place-detail-cta"><p>${escapeHtml(copy.contact)}</p><h2>${escapeHtml(lead)}</h2><div><a href="https://wa.me/905346801828">${escapeHtml(labels[4])}</a><a href="${localizedPath(language,`/routes/${entity?.routeSlug||'alanya'}`)}">${escapeHtml(labels[0])}</a></div></section></main><footer class="place-detail-footer"><span>GoTransfer</span><a href="${localizedPath(language,'/')}">${escapeHtml(copy.home)}</a><a href="${localizedPath(language,'/routes')}">${escapeHtml(copy.routes)}</a></footer><button class="mobile-back-button" data-fallback="${localizedPath(language,'/routes')}" type="button">← <span>${escapeHtml(labels[0])}</span></button>${commonScript()}`;
}

export function renderPage({ language, path, title, description, h1, lead, image, sections = [], availableLanguages = supportedLanguages, entity, pageType }) {
  const rtl = language === "ar" ? ' dir="rtl"' : "";
  const canonical = `${origin}${localizedPath(language, path)}`;
  const copy = ui[language];
  const breadcrumbSchema = {"@context":"https://schema.org","@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:copy.home,item:`${origin}${localizedPath(language,"/")}`},{"@type":"ListItem",position:2,name:copy.routes,item:`${origin}${localizedPath(language,"/routes")}`},{"@type":"ListItem",position:3,name:h1,item:canonical}]};
  return `<!doctype html>
<html lang="${language}"${rtl}>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="index, follow" />
    <meta name="description" content="${escapeHtml(description)}" />
    <title>${escapeHtml(title)}</title>
    <link rel="canonical" href="${canonical}" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:image" content="${origin}${escapeHtml(image)}" />
${seoLinks(path, availableLanguages)}
    <script type="application/ld+json">${JSON.stringify(breadcrumbSchema).replaceAll("<","\\u003c")}</script>
    <link rel="icon" href="/assets/app-icon.svg" type="image/svg+xml" />
    <link rel="stylesheet" href="/styles.css?v=20260728-pwa-58" />
    <link rel="stylesheet" href="/${pageType === "place" ? "place-detail" : "route-detail"}.css?v=20260811-ssr-parity" />
  </head>
  <body class="${pageType === "place" ? "place-detail-page" : "route-detail-page"}">
    ${pageType === "place" ? placeBody({language,path,h1,lead,image,sections,availableLanguages,entity}) : entity?.isKunduRoute ? kunduRouteBody({language,path,h1,lead,image,sections,availableLanguages,entity}) : routeBody({language,path,h1,lead,image,sections,availableLanguages,entity})}
  </body>
</html>`;
}

export function renderNotFound(language = defaultLanguage) {
  const copy = ui[language] || ui[defaultLanguage];
  return `<!doctype html><html lang="${language}"><head><meta charset="utf-8"><meta name="robots" content="noindex, follow"><title>${escapeHtml(copy.notFound)} — GoTransfer</title></head><body><h1>${escapeHtml(copy.notFound)}</h1></body></html>`;
}

export function sendHtml(res, status, html, method = "GET") {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=0, must-revalidate");
  res.status(status).send(method === "HEAD" ? "" : html);
}

export function permanentRedirect(res, location) {
  res.setHeader("Location", location);
  res.setHeader("Cache-Control", "public, max-age=0, must-revalidate");
  res.status(301).send("");
}
