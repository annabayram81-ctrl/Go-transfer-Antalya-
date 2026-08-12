import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { defaultLanguage, homeTranslations, supportedLanguages } from "../i18n-content.js";
import { localizedPath, sendHtml, validLanguage } from "./localized-html.js";

const origin = "https://gotransfer.my";
const templatePath = join(process.cwd(), "index.html");

function first(value) { return Array.isArray(value) ? value[0] : value; }
function preferredLanguage(req) {
  const cookieLanguage = String(req.headers?.cookie || "").match(/(?:^|;\s*)gotransfer-language=(ru|en|tr|de|ar)(?:;|$)/i)?.[1]?.toLowerCase();
  if (cookieLanguage) return cookieLanguage;

  const accepted = String(req.headers?.["accept-language"] || "")
    .split(",")
    .map((item) => item.split(";")[0].trim().split("-")[0].toLowerCase());
  const browserLanguage = accepted[0];
  if (supportedLanguages.includes(browserLanguage)) return browserLanguage;

  const country = String(req.headers?.["x-vercel-ip-country"] || "").toUpperCase();
  if (["TR"].includes(country)) return "tr";
  if (["DE", "AT", "CH", "LI", "LU"].includes(country)) return "de";
  if (["RU", "BY", "KZ", "KG"].includes(country)) return "ru";
  if (["AE", "BH", "DZ", "EG", "IQ", "JO", "KW", "LB", "LY", "MA", "OM", "PS", "QA", "SA", "SD", "SY", "TN", "YE"].includes(country)) return "ar";
  return "en";
}
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
  html = html.replace("</body>", '    <script src="/return-transfer-ui.js?v=20260812-restore-8"></script>\n  </body>');
  return html;
}

export default async function handler(req, res) {
  const isLocalized = first(req.query?.localized) === "1";
  const requestedLanguage = validLanguage(first(req.query?.lang));
  if (!isLocalized) {
    res.setHeader("Location", localizedPath(requestedLanguage || preferredLanguage(req), "/"));
    res.setHeader("Cache-Control", "private, no-store");
    res.setHeader("Vary", "Cookie, Accept-Language, X-Vercel-IP-Country");
    res.status(302).send("");
    return;
  }

  const language = requestedLanguage || defaultLanguage;
  const template = await readFile(templatePath, "utf8");
  sendHtml(res, 200, renderHome(template, language), req.method);
}
