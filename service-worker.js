const CACHE_NAME = "gotransfer-v20260727-pwa-46";
const CORE_ASSETS = [
  "/",
  "/index.html",
  "/services.html",
  "/privacy.html",
  "/styles.css?v=20260727-pwa-45",
  "/booking.js?v=20260727-pwa-45",
  "/services.css?v=20260727-pwa-46",
  "/services.js?v=20260727-pwa-46",
  "/manifest.webmanifest",
  "/assets/app-icon-512.png",
  "/assets/app-icon.svg",
  "/assets/antalya-transfer-hero.png",
];

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
      fetch(event.request)
        .then((response) => {
          const responseCopy = response.clone();

          caches.open(CACHE_NAME).then((cache) => {
            cache.put("/index.html", responseCopy);
          });

          return response;
        })
        .catch(() => caches.match("/index.html").then((cachedResponse) => cachedResponse || caches.match("/"))),
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(event.request).then((response) => {
        const responseCopy = response.clone();

        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseCopy);
        });

        return response;
      });
    }),
  );
});

