import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import routeHandler from "../api/route-page.js";
import placeHandler from "../api/place-page.js";
import homeHandler from "../api/home-page.js";
import { routes, places } from "../route-data.js";
import { homeTranslations, placeTranslations, routeTranslations, supportedLanguages } from "../i18n-content.js";

function render(handler, query, method = "GET", headers = {}) {
  return new Promise((resolve) => {
    const result = { statusCode: 200, headers: {} };
    const res = {
      setHeader(name, value) { result.headers[name] = value; },
      status(code) { result.statusCode = code; return this; },
      send(body) { result.body = body; resolve(result); },
    };
    handler({ query, method, headers }, res);
  });
}

function metadata(html) {
  return {
    lang: html.match(/<html lang="([^"]+)"/)?.[1],
    title: html.match(/<title>(.*?)<\/title>/s)?.[1],
    description: html.match(/<meta[^>]*name="description"[^>]*content="([^"]*)"/s)?.[1],
    canonical: html.match(/<link rel="canonical" href="([^"]*)"/s)?.[1],
    h1: html.match(/<h1>(.*?)<\/h1>/s)?.[1],
    hreflang: [...html.matchAll(/hreflang="([^"]+)"/g)].map((match) => match[1]),
  };
}

for (const language of ["ru", "en", "tr", "de", "ar"]) {
  test(`Alanya route is server-rendered in ${language}`, async () => {
    const result = await render(routeHandler, { slug: "alanya", lang: language, localized: "1" });
    const seo = metadata(result.body);
    assert.equal(result.statusCode, 200);
    assert.equal(seo.lang, language);
    assert.equal(seo.canonical, `https://gotransfer.my/${language}/routes/alanya`);
    assert.deepEqual(seo.hreflang, ["ru", "en", "tr", "de", "ar", "x-default"]);
    assert.ok(seo.title && seo.description && seo.h1);
    assert.doesNotMatch(seo.h1, /Лару/);
  });

  test(`Kaleici place is server-rendered in ${language}`, async () => {
    const result = await render(placeHandler, { slug: "kaleici", lang: language, localized: "1" });
    const seo = metadata(result.body);
    assert.equal(result.statusCode, 200);
    assert.equal(seo.lang, language);
    assert.equal(seo.canonical, `https://gotransfer.my/${language}/places/kaleici`);
    assert.deepEqual(seo.hreflang, ["ru", "en", "tr", "de", "ar", "x-default"]);
    assert.ok(seo.title && seo.description && seo.h1);
  });
}

test("legacy query language redirects directly to localized canonical", async () => {
  const route = await render(routeHandler, { slug: "alanya", lang: "de" });
  const place = await render(placeHandler, { slug: "kaleici", lang: "ar" });
  assert.equal(route.statusCode, 301);
  assert.equal(route.headers.Location, "/de/routes/alanya");
  assert.equal(place.statusCode, 301);
  assert.equal(place.headers.Location, "/ar/places/kaleici");
});

test("clean legacy route and place URLs redirect once to Russian default", async () => {
  const route = await render(routeHandler, { slug: "alanya" });
  const place = await render(placeHandler, { slug: "kaleici" });
  assert.equal(route.headers.Location, "/ru/routes/alanya");
  assert.equal(place.headers.Location, "/ru/places/kaleici");
});

test("homepage selects a supported browser language and falls back to English", async () => {
  const turkish = await render(homeHandler, {}, "GET", { "accept-language": "tr-TR,tr;q=0.9,en;q=0.8" });
  const german = await render(homeHandler, {}, "GET", { "accept-language": "de-DE,de;q=0.9" });
  const unsupported = await render(homeHandler, {}, "GET", { "accept-language": "fr-FR,fr;q=0.9" });
  assert.equal(turkish.headers.Location, "/tr");
  assert.equal(german.headers.Location, "/de");
  assert.equal(unsupported.headers.Location, "/en");
  assert.equal(turkish.statusCode, 302);
  assert.equal(turkish.headers.Vary, "Cookie, Accept-Language, X-Vercel-IP-Country");
});

test("saved language wins and country is used only as a fallback", async () => {
  const saved = await render(homeHandler, {}, "GET", { cookie: "gotransfer-language=ar", "accept-language": "tr-TR" });
  const country = await render(homeHandler, {}, "GET", { "accept-language": "fr-FR", "x-vercel-ip-country": "TR" });
  assert.equal(saved.headers.Location, "/ar");
  assert.equal(country.headers.Location, "/tr");
});

test("unapproved translations are noindex 404 and cannot leak Russian content", async () => {
  const result = await render(placeHandler, { slug: "perge", lang: "de", localized: "1" });
  assert.equal(result.statusCode, 404);
  assert.match(result.body, /noindex, follow/);
  assert.equal(metadata(result.body).lang, "de");
});

test("Russian-only pages do not advertise hreflang URLs that return 404", async () => {
  const result = await render(placeHandler, { slug: "perge", lang: "ru", localized: "1" });
  assert.equal(result.statusCode, 200);
  assert.deepEqual(metadata(result.body).hreflang, ["ru", "x-default"]);
  const legacy = await render(placeHandler, { slug: "perge", lang: "de" });
  assert.equal(legacy.headers.Location, "/ru/places/perge");
});

test("localized homepage is self-canonical", async () => {
  const result = await render(homeHandler, { lang: "ar", localized: "1" });
  assert.equal(result.statusCode, 200);
  assert.equal(metadata(result.body).canonical, "https://gotransfer.my/ar");
  assert.equal(metadata(result.body).lang, "ar");
  assert.match(result.body, /<html lang="ar" dir="rtl">/);
  assert.match(result.body, /id="bookingForm"/);
  assert.match(result.body, /data-language-option="de"/);
  assert.match(result.body, /data-language-option="ar"/);
});

test("every Russian route and place is indexable", async () => {
  for (const slug of Object.keys(routes)) {
    assert.equal((await render(routeHandler, { slug, lang: "ru", localized: "1" })).statusCode, 200, `route ${slug}`);
  }
  for (const { slug } of places) {
    assert.equal((await render(placeHandler, { slug, lang: "ru", localized: "1" })).statusCode, 200, `place ${slug}`);
  }
});

test("sitemap contains exactly the available canonical pages", () => {
  const expected = new Set();
  for (const language of supportedLanguages) {
    if (homeTranslations[language]) expected.add(`https://gotransfer.my/${language}`);
  }
  for (const slug of Object.keys(routes)) {
    expected.add(`https://gotransfer.my/ru/routes/${slug}`);
    for (const language of supportedLanguages) {
      if (language !== "ru" && routeTranslations[slug]?.[language]) expected.add(`https://gotransfer.my/${language}/routes/${slug}`);
    }
  }
  for (const { slug } of places) {
    expected.add(`https://gotransfer.my/ru/places/${slug}`);
    for (const language of supportedLanguages) {
      if (language !== "ru" && placeTranslations[slug]?.[language]) expected.add(`https://gotransfer.my/${language}/places/${slug}`);
    }
  }
  const actual = new Set([...readFileSync("sitemap.xml", "utf8").matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]));
  assert.deepEqual(actual, expected);
});
