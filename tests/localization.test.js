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

test("all 21 VIP day journeys have localized Arabic titles", () => {
  const source = read("journey-locales.js");
  const match = source.match(/\bar\s*:\s*\[([\s\S]*?)\]\s*,?\s*\};/);
  assert.ok(match, "Arabic journey title list was not found");
  const titles = [...match[1].matchAll(/"[^"]+"/g)];
  assert.equal(titles.length, 21);
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
