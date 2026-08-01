const CACHE_NAME = "gotransfer-v20260801-fast-start-16";
const CORE_ASSETS = [
  "/",
  "/index.html",
  "/styles.css?v=20260730-topbar-60",
  "/app-store-button.css?v=20260730-store-1",
  "/pricing.js?v=20260727-long-distance-1",
  "/booking.js?v=20260729-i18n-1",
  "/site-locale.js?v=20260801-nav-2",
  "/manifest.webmanifest",
  "/assets/antalya-transfer-hero.png",
];

function fetchWithTimeout(request, timeout = 8000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  return fetch(request, { cache: "no-store", signal: controller.signal }).finally(() => clearTimeout(timer));
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(CORE_ASSETS))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("message", (event) => {
  if (event.data === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") {
    return;
  }

  if (event.request.mode === "navigate") {
    event.respondWith(
      fetchWithTimeout(event.request)
        .then((response) => {
          if (response.ok) caches.open(CACHE_NAME).then((cache) => cache.put(event.request, response.clone()));
          return response;
        })
        .catch(() => caches.match(event.request).then((cachedResponse) => cachedResponse || caches.match("/index.html"))),
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(event.request).then((response) => {
        if (!response.ok) {
          return response;
        }

        const responseCopy = response.clone();

        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseCopy);
        });

        return response;
      });
    }),
  );
});
