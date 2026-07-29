const CACHE_NAME = "gotransfer-v20260729-webview-overscroll-9";
const CORE_ASSETS = [
  "/",
  "/index.html",
  "/services.html",
  "/chauffeur.html",
  "/vip-events.html",
  "/journeys.html",
  "/journey-detail.html",
  "/routes.html",
  "/route-detail.html",
  "/route-placeholder.html",
  "/place-placeholder.html",
  "/privacy.html",
  "/styles.css?v=20260729-mobile-59",
  "/pricing.js?v=20260727-long-distance-1",
  "/booking.js?v=20260729-i18n-1",
  "/site-locale.js?v=20260729-i18n-3",
  "/rtl.css?v=20260729-i18n-1",
  "/services.css?v=20260729-android-51",
  "/services.js?v=20260729-i18n-1",
  "/chauffeur.css?v=20260728-pwa-1",
  "/chauffeur-form.css?v=20260728-pwa-1",
  "/chauffeur.js?v=20260728-pwa-3",
  "/chauffeur-language.js?v=20260729-i18n-1",
  "/vip-events.css?v=20260729-pwa-2",
  "/vip-events-mobile.css?v=20260729-mobile-1",
  "/vip-events.js?v=20260729-i18n-1",
  "/vip-events-language.js?v=20260729-i18n-1",
  "/journeys.css?v=20260729-mobile-3",
  "/journeys-mobile.css?v=20260729-mobile-3",
  "/journey-data.js?v=20260729-pwa-3",
  "/journey-locales.js?v=20260729-i18n-1",
  "/journeys.js?v=20260729-i18n-1",
  "/journey-detail.css?v=20260729-pwa-1",
  "/journey-showcases.css?v=20260729-detail-1",
  "/journey-showcases.js?v=20260729-detail-3",
  "/journey-detail.js?v=20260729-detail-1",
  "/routes.css?v=20260729-mobile-3",
  "/route-detail.css?v=20260728-pwa-73",
  "/place-detail.css?v=20260728-pwa-59",
  "/route-data.js?v=20260728-pwa-78",
  "/route-detail.js?v=20260729-i18n-3",
  "/place-placeholder.js?v=20260729-i18n-2",
  "/journey-language.js?v=20260729-i18n-1",
  "/floating-back.js?v=20260729-i18n-2",
  "/routes-language.js?v=20260729-i18n-1",
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
