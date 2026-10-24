const CACHE_NAME = 'bledoo-static-v1';
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.svg',
  '/icons/bledoo-192.svg',
  '/icons/bledoo-512.svg',
  '/assets/css/site.css',
  '/assets/css/install.css',
  '/dish-page.css',
  '/assets/js/core.js',
  '/assets/js/catalog.js',
  '/assets/js/app.js',
  '/assets/js/pwa.js',
  '/assets/img/bledoo-logo.webp',
  '/assets/img/ndole.webp',
  '/assets/img/eru.webp',
  '/assets/img/okok.webp',
  '/assets/img/pile.webp',
  '/assets/img/pile-pdt.webp',
  '/assets/img/kondre.webp',
  '/assets/img/kwem.webp',
  '/assets/img/legumes-sautes.webp',
  '/assets/img/sanga.webp',
  '/assets/img/poulet-dg.webp',
  '/assets/img/poisson-braise.webp',
  '/assets/img/bouillon-boeuf.webp',
  '/assets/img/mbongo-tchobi.webp',
  '/assets/img/sauce-jaune.webp',
  '/assets/img/sauce-gombo.webp',
  '/assets/img/chou-arachides.webp',
  '/assets/img/banane-malaxee.webp',
  '/robots.txt',
  '/sitemap.xml',
  '/plats/ndole.html',
  '/plats/eru.html',
  '/plats/okok.html',
  '/plats/pile.html',
  '/plats/kondre.html',
  '/plats/kwem.html',
  '/plats/legumes-sautes.html',
  '/plats/sanga.html',
  '/plats/poulet-dg.html',
  '/plats/poisson-braise.html',
  '/plats/bouillon-boeuf.html',
  '/plats/mbongo-tchobi.html',
  '/plats/sauce-jaune.html',
  '/plats/sauce-gombo.html',
  '/plats/chou-arachides.html',
  '/plats/banane-malaxee.html'
];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(PRECACHE_URLS);
    }).then(function () {
      return self.skipWaiting();
    })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (key) {
        return key.startsWith('bledoo-static-') && key !== CACHE_NAME;
      }).map(function (key) {
        return caches.delete(key);
      }));
    }).then(function () {
      return self.clients.claim();
    })
  );
});

self.addEventListener('fetch', function (event) {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(request).then(function (cachedResponse) {
      if (cachedResponse) return cachedResponse;
      return fetch(request).then(function (response) {
        if (response.ok) {
          const copy = response.clone();
          event.waitUntil(caches.open(CACHE_NAME).then(function (cache) {
            return cache.put(request, copy);
          }));
        }
        return response;
      });
    })
  );
});
