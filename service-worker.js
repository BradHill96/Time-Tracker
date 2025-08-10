
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open('timesheet-store').then(function(cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/script.js',
        '/manifest.json',
        '/logo.jpg'
      ]);
    })
  );
});

self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
