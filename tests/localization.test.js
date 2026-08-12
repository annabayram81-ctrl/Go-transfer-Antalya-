import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const read = (file) => readFileSync(resolve(file), "utf8");

test("the shared locale layer supports all five languages and Arabic RTL", () => {
  const source = read("site-locale.js");
  assert.match(source, /supported=\["ru","tr","en","de","ar"\]/);
  assert.match(source, /language==="ar"\?"rtl":"ltr"/);
  assert.match(source, /hreflang/);
});

test("language choice is remembered for future visits", () => {
  const source = readFileSync("site-locale.js", "utf8");
  assert.match(source, /document\.cookie=`\$\{key\}=\$\{language\}; Max-Age=31536000; Path=\/; SameSite=Lax`/);
});

test("root entry asks the server to select the visitor language before rendering", () => {
  const html = readFileSync("index.html", "utf8");
  assert.match(html, /location\.pathname === "\/"/);
  assert.match(html, /location\.replace\(`\/api\/home-page\$\{location\.search\}`\)/);
});

test("all public HTML pages load the shared locale layer", () => {
  [
    "index.html",
    "services.html",
    "routes.html",
    "route-detail.html",
    "route-placeholder.html",
    "place-placeholder.html",
    "journeys.html",
    "journey-detail.html",
    "chauffeur.html",
    "vip-events.html",
    "privacy.html",
  ].forEach((file) => assert.match(read(file), /site-locale\.js/, file));
});

test("homepage, services, routes, chauffeur and journeys include German and Arabic copy", () => {
  ["booking.js","services.js","routes-language.js","chauffeur-language.js","journey-locales.js"].forEach((file) => {
    const source = read(file);
    assert.match(source, /(?:\bde\s*:|\.de\s*=)/, `${file} is missing German`);
    assert.match(source, /(?:\bar\s*:|\.ar\s*=)/, `${file} is missing Arabic`);
    assert.match(source, /[\u0600-\u06ff]/, `${file} is missing Arabic text`);
  });
});

test("all 39 VIP day journeys have localized Arabic titles", () => {
  const source = read("journey-locales.js");
  const match = source.match(/\bar\s*:\s*\[([\s\S]*?)\]\s*,?\s*\};/);
  assert.ok(match, "Arabic journey title list was not found");
  const titles = [...match[1].matchAll(/"[^"]+"/g)];
  assert.equal(titles.length, 39);
});

test("RTL stylesheet protects LTR contact, price and URL content", () => {
  const css = read("rtl.css");
  assert.match(css, /\[dir="ltr"\]/);
  assert.match(css, /wa\.me|tel:|mailto:|booking-price/);
});

test("route placeholder exposes all five language options", () => {
  const html = read("route-placeholder.html");
  ["ru", "tr", "en", "de", "ar"].forEach((language) => {
    assert.match(html, new RegExp(`data-language="${language}"`));
  });
  assert.match(html, /gotransfer:languagechange/);
});

test("shared locale handler does not double-toggle page-owned language menus", () => {
  const source = read("site-locale.js");
  assert.match(source, /if\(!globallyManaged\)return/);
  assert.match(source, /localeGenerated/);
  assert.match(read("route-placeholder.html"), /data-global-locale-menu/);
});

test("every VIP journey has a reusable photographic stop showcase", () => {
  const source = read("journey-showcases.js");
  const slugs = [...read("journey-data.js").matchAll(/slug:"([^"]+)"/g)].map((match) => match[1]);
  assert.equal(slugs.length, 39);
  slugs.forEach((slug) => assert.match(source, new RegExp(`"${slug}"\\s*:`), slug));
  assert.match(read("journey-detail.html"), /id="detailPlaceCards"/);
  assert.match(read("journey-detail.js"), /JourneyShowcases\.details/);
});

test("journey card photos open the same detail page as the details button", () => {
  const source = read("journeys.js");
  const styles = read("journeys.css");
  assert.match(source, /const detailsUrl=`\/journeys\/\$\{item\.slug\}\?lang=\$\{language\}`/);
  assert.match(source, /class="journey-card__image-link" href="\$\{detailsUrl\}"/);
  assert.match(source, /<nav><a href="\$\{detailsUrl\}">/);
  assert.match(styles, /\.journey-card__image-link\{[^}]*position:absolute[^}]*inset:0[^}]*display:block/);
  assert.match(styles, /\.journey-card__image-link>img\{[^}]*position:absolute[^}]*width:100%[^}]*height:100%/);
  assert.match(styles, /\.journey-card__shade\{pointer-events:none/);
});

test("homepage links to the official Android app in Google Play", () => {
  const html = read("index.html");
  assert.match(html, /https:\/\/play\.google\.com\/store\/apps\/details\?id=com\.gotransfer\.antalya/);
  assert.match(html, /topbar__icon-link--google-play/);
  assert.match(read("app-store-button.css"), /\.topbar__icon-link--google-play/);
});

test("mobile service cards grow with their content instead of clipping it", () => {
  const source = read("app-mobile-cards.css");
  assert.match(source, /\.destination-card\s*\{[\s\S]*?height:\s*auto[\s\S]*?min-height:\s*0/);
  assert.match(source, /\.journey-card\s*\{[\s\S]*?height:\s*auto[\s\S]*?min-height:\s*clamp/);
  assert.match(source, /\.journey-card\s*>\s*div\s*\{[\s\S]*?position:\s*absolute[\s\S]*?inset:\s*auto 0 0/);
  assert.match(source, /\.journey-card nav\s*\{[\s\S]*?grid-template-columns:\s*1fr/);
  assert.match(source, /\.vip-card summary,[\s\S]*?\.vip-card-link\s*\{[\s\S]*?min-height:\s*clamp/);
  assert.match(source, /\.vip-card \.card-copy,[\s\S]*?\.vip-card-link \.card-copy\s*\{[\s\S]*?position:\s*absolute/);
  assert.match(source, /\.vip-card \.card-buttons\s*\{[\s\S]*?grid-template-columns:\s*repeat\(2/);
});

test("mobile layouts prevent horizontal page drift", () => {
  const sharedCss = read("styles.css");
  const routesCss = read("routes.css");
  const journeysCss = read("journeys-mobile.css");
  const journeyHeaderCss = read("journey-header-fix.css");
  const vipEventsCss = read("vip-events-mobile.css");
  assert.match(sharedCss, /html\s*\{[\s\S]*?overflow-x:\s*clip/);
  assert.match(sharedCss, /body\s*\{[\s\S]*?overflow-x:\s*clip/);
  assert.match(routesCss, /\.routes-intro h1\s*\{[\s\S]*?overflow-wrap:\s*anywhere/);
  assert.match(journeysCss, /\.journeys-root\s*\{[\s\S]*?overflow-x:\s*clip/);
  assert.match(journeysCss, /\.journeys-page\s*\{[\s\S]*?overscroll-behavior:\s*none/);
  assert.match(journeysCss, /\.journeys-page\s*\{[\s\S]*?touch-action:\s*pan-y/);
  assert.match(journeyHeaderCss, /\.journey-detail-root,[\s\S]*?overflow-x:\s*clip/);
  assert.match(journeyHeaderCss, /\.journey-detail-page\s*\{[\s\S]*?touch-action:\s*pan-y/);
  assert.match(journeyHeaderCss, /@media \(max-width:\s*620px\)[\s\S]*?\.detail-contact[\s\S]*?width:\s*42px/);
  assert.match(vipEventsCss, /\.vip-events-root\s*\{[\s\S]*?overflow-x:\s*clip/);
  assert.match(vipEventsCss, /\.vip-events-page\s*\{[\s\S]*?overscroll-behavior:\s*none/);
  assert.match(vipEventsCss, /\.vip-events-page\s*\{[\s\S]*?touch-action:\s*pan-y/);
});

test("privacy page keeps all languages and a floating mobile back button", () => {
  const html = read("privacy.html");
  ["ru", "tr", "en", "de", "ar"].forEach((language) => {
    assert.match(html, new RegExp(`data-language="${language}"`));
  });
  assert.match(html, /class="mobile-back-button"/);
  assert.match(html, /floating-back\.js/);
});

test("floating mobile back button is localized in German and Arabic", () => {
  const source = read("floating-back.js");
  assert.match(source, /de:\s*"Zurück"/);
  assert.match(source, /ar:\s*"رجوع"/);
});
