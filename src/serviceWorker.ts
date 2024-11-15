/// <reference lib="webworker" />
declare const self: ServiceWorkerGlobalScope;

const CACHE_NAME = 'ecommerce-cache-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/static/css/main.css',
  '/static/js/main.js',
  '/fallback-image.jpg',
] as const;

// Define API routes to cache
const API_ROUTES = ['/api/products', '/api/cart'] as const;

type ApiRoute = typeof API_ROUTES[number];
type StaticAsset = typeof STATIC_ASSETS[number];

// Define cache strategies
const CACHE_STRATEGIES = {
  STATIC: STATIC_ASSETS,
  API: API_ROUTES,
} as const;

// Helper function to check if pathname matches API route
const isMatchingApiRoute = (pathname: string): pathname is ApiRoute => {
  return API_ROUTES.includes(pathname as ApiRoute);
};

// Helper function to check if pathname matches static asset
const isMatchingStaticAsset = (pathname: string): pathname is StaticAsset => {
  return STATIC_ASSETS.includes(pathname as StaticAsset);
};

// Install event handler
self.addEventListener('install', (event: ExtendableEvent) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(CACHE_STRATEGIES.STATIC);
    })
  );
});

// Fetch event handler
self.addEventListener('fetch', (event: FetchEvent) => {
  const { request } = event;
  const url = new URL(request.url);

  // Handle API requests
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Only cache successful responses
          if (!response.ok) {
            return response;
          }
          
          const clonedResponse = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            if (isMatchingApiRoute(url.pathname)) {
              cache.put(request, clonedResponse);
            }
          });
          return response;
        })
        .catch(async () => {
          const cachedResponse = await caches.match(request);
          if (cachedResponse) {
            return cachedResponse;
          }
          throw new Error('No cached response available');
        })
    );
    return;
  }

  // Handle static assets with Cache First strategy
  event.respondWith(
    caches.match(request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(request).then(response => {
          // Cache new static assets
          if (isMatchingStaticAsset(url.pathname)) {
            const clonedResponse = response.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(request, clonedResponse);
            });
          }
          return response;
        });
      })
  );
});

// Activate event handler - Clean up old caches
self.addEventListener('activate', (event: ExtendableEvent) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
});

// Handle messages from the client
self.addEventListener('message', (event: ExtendableMessageEvent) => {
  if (event.data === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});