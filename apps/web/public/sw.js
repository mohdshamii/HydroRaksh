const CACHE_NAME = "jalsuraksha-v1.0.0";
const STATIC_ASSETS = [
  "/",
  "/manifest.json",
  "/globals.css"
];

// 1. Install & Cache Shell
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

// 2. Activate & Purge Old Caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

// 3. Fetch Strategy: Stale-While-Revalidate for APIs, Cache-First for Shell
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // For API endpoints, try network first, fallback to cached data
  if (url.pathname.startsWith("/api/")) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const cloned = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, cloned));
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // For static app shell
  event.respondWith(
    caches.match(event.request).then((cached) => {
      return cached || fetch(event.request);
    })
  );
});

// 4. Background Sync for Offline Field Officer Readings
self.addEventListener("sync", (event) => {
  if (event.tag === "sync-field-readings") {
    event.waitUntil(
      // In production, flushes IndexedDB offline queue to /api/v1/field/reading
      console.log("[ServiceWorker] Flushing offline field officer queue...")
    );
  }
});
