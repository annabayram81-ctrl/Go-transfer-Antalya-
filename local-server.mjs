import { createReadStream, existsSync, statSync } from "node:fs";
import { extname, join, normalize } from "node:path";
import { createServer } from "node:http";
import routeHandler from "./api/route-page.js";
import placeHandler from "./api/place-page.js";
import homeHandler from "./api/home-page.js";

const root = process.cwd();
const port = Number(process.env.PORT || 4173);
const host = process.env.HOST || "127.0.0.1";

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
};

function apiResponse(response) {
  return {
    setHeader(name, value) { response.setHeader(name, value); },
    status(code) { response.statusCode = code; return this; },
    send(body) { response.end(body); },
  };
}

createServer(async (request, response) => {
  const url = new URL(request.url || "/", `http://localhost:${port}`);
  const localized = url.pathname.match(/^\/(ru|en|tr|de|ar)(?:\/(routes|places)\/([a-z0-9-]+))?\/?$/);
  const legacy = url.pathname.match(/^\/(routes|places)\/([a-z0-9-]+)\/?$/);

  if (localized) {
    const [, lang, type, slug] = localized;
    const query = { lang, localized: "1", ...(slug ? { slug } : {}) };
    const handler = type === "routes" ? routeHandler : type === "places" ? placeHandler : homeHandler;
    await handler({ query, method: request.method }, apiResponse(response));
    return;
  }

  if (legacy || url.pathname === "/") {
    const query = { lang: url.searchParams.get("lang") || undefined, ...(legacy ? { slug: legacy[2] } : {}) };
    const handler = legacy?.[1] === "routes" ? routeHandler : legacy?.[1] === "places" ? placeHandler : homeHandler;
    await handler({ query, method: request.method }, apiResponse(response));
    return;
  }

  const requestedPath =
    url.pathname.startsWith("/images/")
        ? `/public${url.pathname}`
        : url.pathname;
  const filePath = normalize(join(root, requestedPath));

  if (!filePath.startsWith(root) || !existsSync(filePath) || !statSync(filePath).isFile()) {
    response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    response.end("Not found");
    return;
  }

  response.writeHead(200, {
    "content-type": contentTypes[extname(filePath)] || "application/octet-stream",
  });
  createReadStream(filePath).pipe(response);
}).listen(port, host, () => {
  console.log(`GoTransfer is running at http://${host}:${port}`);
});
