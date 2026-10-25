/* BLEDOO service worker : pages et scripts toujours frais (réseau d'abord), images en cache */
var VERSION = 'bledoo-v2-1';
var SHELL = ['/', '/plats.html', '/panier.html', '/site.css', '/app.js', '/bledoo-logo.webp', '/manifest.json'];

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(VERSION).then(function (c) { return c.addAll(SHELL); }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) { return k !== VERSION; }).map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;
  var url = new URL(req.url);
  if (url.origin !== location.origin) return;
  var isImage = /\.(webp|png|jpg|jpeg|ico|svg)$/i.test(url.pathname);
  if (isImage) {
    e.respondWith(caches.match(req).then(function (hit) {
      return hit || fetch(req).then(function (res) {
        var copy = res.clone(); caches.open(VERSION).then(function (c) { c.put(req, copy); }); return res;
      });
    }));
    return;
  }
  e.respondWith(
    fetch(req).then(function (res) {
      var copy = res.clone(); caches.open(VERSION).then(function (c) { c.put(req, copy); }); return res;
    }).catch(function () {
      return caches.match(req).then(function (hit) { return hit || (req.mode === 'navigate' ? caches.match('/') : Response.error()); });
    })
  );
});
