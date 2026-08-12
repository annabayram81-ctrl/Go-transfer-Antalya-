import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { defaultLanguage, homeTranslations, supportedLanguages } from "../i18n-content.js";
import { localizedPath, permanentRedirect, sendHtml, validLanguage } from "./localized-html.js";

const origin = "https://gotransfer.my";
const templatePath = join(process.cwd(), "index.html");

function first(value) { return Array.isArray(value) ? value[0] : value; }
function escapeHtml(value) {
  return String(value ?? "").replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function renderHome(template, language) {
  const content = homeTranslations[language];
  const canonical = `${origin}${localizedPath(language, "/")}`;
  const alternates = supportedLanguages
    .map((item) => `    <link rel="alternate" hreflang="${item}" href="${origin}${localizedPath(item, "/")}" />`)
    .concat(`    <link rel="alternate" hreflang="x-default" href="${origin}${localizedPath(defaultLanguage, "/")}" />`)
    .join("\n");
  const bootstrap = `<script>try{localStorage.setItem("gotransfer-language",${JSON.stringify(language)})}catch{}</script>`;

  let html = template
    .replace(/<html lang="[^"]+"(?: dir="[^"]+")?>/, `<html lang="${language}"${language === "ar" ? ' dir="rtl"' : ""}>`)
    .replace("<head>", `<head>\n    <base href="/" />\n${bootstrap}`)
    .replace(/<title>.*?<\/title>/s, `<title>${escapeHtml(content.title)}</title>`)
    .replace(/(<meta\s+(?:[^>]*?\s)?name="description"\s+content=")[^"]*("[^>]*>)/s, `$1${escapeHtml(content.description)}$2`);

  const seoLinks = `<link rel="canonical" href="${canonical}" />\n${alternates}`;
  html = /<link rel="canonical" href="[^"]+"\s*\/?>/.test(html)
    ? html.replace(/<link rel="canonical" href="[^"]+"\s*\/?>/, seoLinks)
    : html.replace("</head>", `    ${seoLinks}\n  </head>`);
  return html;
}

export default async function handler(req, res) {
  const isLocalized = first(req.query?.localized) === "1";
  const requestedLanguage = validLanguage(first(req.query?.lang));
  if (!isLocalized) {
    permanentRedirect(res, localizedPath(requestedLanguage || defaultLanguage, "/"));
    return;
  }

  const language = requestedLanguage || defaultLanguage;
  const template = await readFile(templatePath, "utf8");
  sendHtml(res, 200, renderHome(template, language), req.method);
}
