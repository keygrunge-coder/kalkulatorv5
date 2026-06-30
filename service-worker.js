self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // Mengembalikan cache jika ada, jika tidak maka ambil dari network
      return response || fetch(event.request);
    })
  );
});

// Membersihkan cache lama jika ada versi baru
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(key => key !== CACHE_NAME && caches.delete(key))
    ))
  );
});
