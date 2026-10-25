"use strict";

const CACHE_NAME = "bledoo-static-v3";
const PRECACHE_URLS = [
  "/",
  "/index.html",
  "/offline.html",
  "/manifest.json",
  "/styles.css",
  "/pwa.js",
  "/plats/static-dish.js",
  "/plats/static-dishes.json",
  "/sitemap.xml",
  "/robots.txt",
  "/icons/bledoo-192.svg",
  "/icons/bledoo-512.svg",
  "/plats/banane-malaxee.html",
  "/plats/bouillon-boeuf.html",
  "/plats/chou-arachides.html",
  "/plats/eru.html",
  "/plats/kondre.html",
  "/plats/kwem.html",
  "/plats/legumes-sautes.html",
  "/plats/mbongo-tchobi.html",
  "/plats/ndole.html",
  "/plats/okok.html",
  "/plats/pile.html",
  "/plats/poisson-braise.html",
  "/plats/poulet-dg.html",
  "/plats/sanga.html",
  "/plats/sauce-gombo.html",
  "/plats/sauce-jaune.html",
  "/images/banane-malaxee.webp",
  "/images/bledoo-logo.webp",
  "/images/bouillon-boeuf.webp",
  "/images/chou-arachides.webp",
  "/images/eru.webp",
  "/images/kondre.webp",
  "/images/kwem.webp",
  "/images/legumes-sautes.webp",
  "/images/mbongo-tchobi.webp",
  "/images/ndole.webp",
  "/images/okok.webp",
  "/images/pile-pdt.webp",
  "/images/pile.webp",
  "/images/poisson-braise.webp",
  "/images/poulet-dg.webp",
  "/images/sanga.webp",
  "/images/sauce-gombo.webp",
  "/images/sauce-jaune.webp",
  "/images/ingredients/ail.webp",
  "/images/ingredients/arachide.webp",
  "/images/ingredients/aubergine.webp",
  "/images/ingredients/basilic.webp",
  "/images/ingredients/bobolo.webp",
  "/images/ingredients/carotte.webp",
  "/images/ingredients/celeri.webp",
  "/images/ingredients/chou.webp",
  "/images/ingredients/condiments.webp",
  "/images/ingredients/couscous_gari.webp",
  "/images/ingredients/couscous_manioc.webp",
  "/images/ingredients/djansang.webp",
  "/images/ingredients/ecrevisses.webp",
  "/images/ingredients/feuille_manioc.webp",
  "/images/ingredients/feuille_okok.webp",
  "/images/ingredients/folon.webp",
  "/images/ingredients/garri.webp",
  "/images/ingredients/gingembre.webp",
  "/images/ingredients/girofle.webp",
  "/images/ingredients/gombo.webp",
  "/images/ingredients/haricot_noir.webp",
  "/images/ingredients/haricot_vert.webp",
  "/images/ingredients/huile_palme.webp",
  "/images/ingredients/kanwa.webp",
  "/images/ingredients/laurier.webp",
  "/images/ingredients/legumes.webp",
  "/images/ingredients/lojam.webp",
  "/images/ingredients/macabo.webp",
  "/images/ingredients/mais.webp",
  "/images/ingredients/manioc.webp",
  "/images/ingredients/messep.webp",
  "/images/ingredients/miondo.webp",
  "/images/ingredients/ndole.webp",
  "/images/ingredients/noix_palme.webp",
  "/images/ingredients/oignons.webp",
  "/images/ingredients/pattes_boeuf.webp",
  "/images/ingredients/peau_boeuf.webp",
  "/images/ingredients/pebe.webp",
  "/images/ingredients/persil.webp",
  "/images/ingredients/piment.webp",
  "/images/ingredients/plantain.webp",
  "/images/ingredients/poireau.webp",
  "/images/ingredients/poisson_chat.webp",
  "/images/ingredients/poisson_frais.webp",
  "/images/ingredients/poisson_fume.webp",
  "/images/ingredients/poivre_blanc.webp",
  "/images/ingredients/poivron.webp",
  "/images/ingredients/pomme_de_terre.webp",
  "/images/ingredients/porc.webp",
  "/images/ingredients/poudre_hiomi.webp",
  "/images/ingredients/poudre_mbongo.webp",
  "/images/ingredients/poulet.webp",
  "/images/ingredients/quatre_cotes.webp",
  "/images/ingredients/romarin.webp",
  "/images/ingredients/rondelles.webp",
  "/images/ingredients/sucre.webp",
  "/images/ingredients/taro.webp",
  "/images/ingredients/thym.webp",
  "/images/ingredients/tomates.webp",
  "/images/ingredients/viande_avec_os.webp",
  "/images/ingredients/viande_sans_os.webp",
  "/images/ingredients/water_fufu.webp"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => Promise.all(
        cacheNames
          .filter((cacheName) => cacheName.startsWith("bledoo-static-") && cacheName !== CACHE_NAME)
          .map((cacheName) => caches.delete(cacheName))
      ))
      .then(() => self.clients.claim())
  );
});

function offlinePageFor(request, cache) {
  const url = new URL(request.url);
  const rootDishMatch = url.pathname.match(/^\/([a-z0-9-]+)\.html$/i);
  if (rootDishMatch) {
    return cache.match(`/plats/${rootDishMatch[1]}.html`, { ignoreSearch: true })
      .then((response) => response
        ? normalizeRecipeResponse(request, response)
        : cache.match("/offline.html"));
  }

  const candidates = [url.pathname, "/offline.html"];
  return candidates.reduce(
    (result, candidate) => result.then((response) =>
      response || cache.match(candidate, { ignoreSearch: true })
    ),
    Promise.resolve(null)
  );
}

function normalizeRecipeResponse(request, response) {
  const url = new URL(request.url);
  if (!/^\/[a-z0-9-]+\.html$/i.test(url.pathname)) {
    return Promise.resolve(response);
  }

  return response.clone().text().then((html) => {
    const headers = new Headers(response.headers);
    headers.delete("content-length");
    headers.delete("content-encoding");
    return new Response(
      html.replace(/(\bsrc=["'])(?:\/)?static-dish\.js(["'])/g, "$1/plats/static-dish.js$2"),
      { status: response.status, statusText: response.statusText, headers }
    );
  });
}

self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);

  if (request.method !== "GET" || url.origin !== self.location.origin) {
    return;
  }

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.status === 404 && /^\/[a-z0-9-]+\.html$/i.test(url.pathname)) {
              return caches.open(CACHE_NAME).then((cache) =>
                offlinePageFor(request, cache).then((cached) => cached || response)
              );
          }
          if (!response.ok) {
              return response;
          }
          return normalizeRecipeResponse(request, response).then((normalized) => {
              return caches.open(CACHE_NAME)
                .then((cache) => cache.put(request, normalized.clone()))
                .catch((error) => console.error("Impossible de mettre la page BLEDOO en cache.", error))
                .then(() => normalized);
          });
        })
        .catch(() => caches.open(CACHE_NAME).then((cache) =>
          offlinePageFor(request, cache)
            .then((response) => response || new Response(
              "BLEDOO est indisponible hors ligne. Reconnectez-vous et réessayez.",
              { status: 503, headers: { "Content-Type": "text/plain; charset=utf-8" } }
            ))
        ))
    );
    return;
  }

  event.respondWith(
    caches.open(CACHE_NAME).then((cache) =>
      cache.match(request, { ignoreSearch: true }).then((cached) => {
        if (cached) {
          return cached;
        }
        return fetch(request).then((response) => {
          if (response.ok) {
            return cache.put(request, response.clone())
              .catch((error) => console.error("Impossible de mettre la ressource BLEDOO en cache.", error))
              .then(() => response);
          }
          return response;
        });
      })
    )
  );
});
