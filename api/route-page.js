import { routes } from "../route-data.js";
import { defaultLanguage, routeTranslations } from "../i18n-content.js";
import { localizedPath, permanentRedirect, renderNotFound, renderPage, sendHtml, validLanguage } from "./localized-html.js";

function first(value) { return Array.isArray(value) ? value[0] : value; }

function russianContent(route) {
  return {
    title: route.seoTitle || `${route.title} — GoTransfer`,
    description: route.seoDescription,
    h1: route.title,
    lead: route.description,
    sections: [
      { title: "Остановки по маршруту", text: "Выберите интересные места заранее, чтобы оператор рассчитал продолжительность и стоимость поездки." },
      { title: "Индивидуальный план поездки", text: "Порядок остановок, время ожидания и окончательная стоимость подтверждаются до начала трансфера." },
    ],
  };
}

export default async function handler(req, res) {
  const slug = /^[a-z0-9-]+$/.test(first(req.query?.slug) || "") ? first(req.query.slug) : "";
  const route = routes[slug];
  const isLocalized = first(req.query?.localized) === "1";
  const requestedLanguage = validLanguage(first(req.query?.lang));

  if (!isLocalized && route) {
    const redirectLanguage = requestedLanguage && (requestedLanguage === defaultLanguage || routeTranslations[slug]?.[requestedLanguage]) ? requestedLanguage : defaultLanguage;
    permanentRedirect(res, localizedPath(redirectLanguage, `/routes/${slug}`));
    return;
  }

  const language = requestedLanguage || defaultLanguage;
  const content = language === defaultLanguage ? (routeTranslations[slug]?.ru || (route && russianContent(route))) : routeTranslations[slug]?.[language];
  if (!route || !content) {
    sendHtml(res, 404, renderNotFound(language), req.method);
    return;
  }

  const availableLanguages = [defaultLanguage, ...Object.keys(routeTranslations[slug] || {}).filter((item) => item !== defaultLanguage)];
  sendHtml(res, 200, renderPage({ language, path: `/routes/${slug}`, image: route.image, availableLanguages, entity: route, pageType: "route", ...content }), req.method);
}
