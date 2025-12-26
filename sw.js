// sw.js
const CACHE_NAME = 'spectrogram-pwa-v2';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './sw.js'
  // add icons once you have them:
  // './icon-192.png',
  // './icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(k => (k === CACHE_NAME) ? null : caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request))
  );
});
