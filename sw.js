// ======================================================
// Service Worker for Audio Caching (Extension‑based only)
// Place this file at the root of your site
// ======================================================

const CACHE_NAME = 'audio-cache-v1';
const AUDIO_EXTENSIONS = ['.wav', '.png'];

// Helper: fetch and store in cache
function fetchAndCache(request) {
    return fetch(request).then(response => {
        if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
        }
        return caches.open(CACHE_NAME).then(cache => {
            cache.put(request, response.clone());
            return response;
        });
    });
}

// Install – nothing to pre‑cache, just activate immediately
self.addEventListener('install', () => {
    self.skipWaiting();
});

// Activate – clean up old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => Promise.all(
            keys.filter(key => key !== CACHE_NAME)
                .map(key => caches.delete(key))
        ))
    );
    return self.clients.claim();
});

// Fetch – cache any matching audio request
self.addEventListener('fetch', event => {
    const url = new URL(event.request.url);
    const isAudio = AUDIO_EXTENSIONS.some(ext => url.pathname.endsWith(ext));

    if (isAudio) {
        event.respondWith(
            caches.match(event.request)
                .then(cached => cached || fetchAndCache(event.request))
        );
    }
});