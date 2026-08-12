import { places } from "../route-data.js";
import { defaultLanguage, placeTranslations } from "../i18n-content.js";
import { localizedPath, permanentRedirect, renderNotFound, renderPage, sendHtml, validLanguage } from "./localized-html.js";

const placesBySlug = Object.fromEntries(places.map((place) => [place.slug, place]));
function first(value) { return Array.isArray(value) ? value[0] : value; }

function russianContent(place) {
  return {
    title: `${place.title}: что посмотреть | GoTransfer`,
    description: place.seoDescription,
    h1: place.title,
    lead: place.intro || place.description,
    sections: [
      ...(place.highlights || []).map(({ title, text }) => ({ title, text })),
      { title: "Планирование остановки", text: place.visitNote },
    ],
  };
}

export default async function handler(req, res) {
  const slug = /^[a-z0-9-]+$/.test(first(req.query?.slug) || "") ? first(req.query.slug) : "";
  const place = placesBySlug[slug];
  const isLocalized = first(req.query?.localized) === "1";
  const requestedLanguage = validLanguage(first(req.query?.lang));

  if (!isLocalized && place) {
    const redirectLanguage = requestedLanguage && (requestedLanguage === defaultLanguage || placeTranslations[slug]?.[requestedLanguage]) ? requestedLanguage : defaultLanguage;
    permanentRedirect(res, localizedPath(redirectLanguage, `/places/${slug}`));
    return;
  }

  const language = requestedLanguage || defaultLanguage;
  const content = language === defaultLanguage ? (placeTranslations[slug]?.ru || (place && russianContent(place))) : placeTranslations[slug]?.[language];
  if (!place || !content) {
    sendHtml(res, 404, renderNotFound(language), req.method);
    return;
  }

  const availableLanguages = [defaultLanguage, ...Object.keys(placeTranslations[slug] || {}).filter((item) => item !== defaultLanguage)];
  sendHtml(res, 200, renderPage({ language, path: `/places/${slug}`, image: place.image, availableLanguages, entity: place, pageType: "place", ...content }), req.method);
}
