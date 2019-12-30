importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

const staticAssets = [
    './',
    './styles.css',
    './app.js',
    { url: './index.html'},
];

if (workbox) {
    console.log(`Yay! Workbox is loaded 🎉`);
  } else {
    console.log(`Boo! Workbox didn't load 😬`);
  }


workbox.precaching.precacheAndRoute(staticAssets);

workbox.routing.registerRoute(
    new RegExp('https://newsapi.org/(.*)'),
    new workbox.strategies.NetworkFirst()
  );

workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg)$/,
  new workbox.strategies.CacheFirst({
    cacheName: 'news-images',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 30,
        maxAgeSeconds: 12 * 60 * 60, // 12 horas
      }),
    ],
  }),
); 