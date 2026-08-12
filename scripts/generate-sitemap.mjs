import { writeFile } from "node:fs/promises";
import { routes, places } from "../route-data.js";
import { homeTranslations, placeTranslations, routeTranslations, supportedLanguages } from "../i18n-content.js";

const origin = "https://gotransfer.my";
const urls = [];
for (const language of supportedLanguages) {
  if (homeTranslations[language]) urls.push(`${origin}/${language}`);
}
for (const slug of Object.keys(routes)) {
  urls.push(`${origin}/ru/routes/${slug}`);
  for (const language of supportedLanguages.filter((item) => item !== "ru")) {
    if (routeTranslations[slug]?.[language]) urls.push(`${origin}/${language}/routes/${slug}`);
  }
}
for (const place of places) {
  urls.push(`${origin}/ru/places/${place.slug}`);
  for (const language of supportedLanguages.filter((item) => item !== "ru")) {
    if (placeTranslations[place.slug]?.[language]) urls.push(`${origin}/${language}/places/${place.slug}`);
  }
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((url) => `  <url><loc>${url}</loc></url>`).join("\n")}\n</urlset>\n`;
await writeFile(new URL("../sitemap.xml", import.meta.url), xml, "utf8");
console.log(`Generated sitemap.xml with ${urls.length} canonical URLs.`);
