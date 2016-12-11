// Service Worker Toolbox
importScripts('/sw-toolbox/sw-toolbox.js');

// Files to precache
const precacheFiles = [
    './',
    './data/global-top-10-tracks.json',
    './js/app.js',
    './styles/app.css',
    './index.html',

    './images/6fujklziTHa8uoM5OQSfIo.jpeg',
    './images/7MXVkk9YMctZqd1Srtv4MB.jpeg',

    './fonts/PTS55F-webfont.woff',
    './fonts/PTS75F-webfont.woff'
];
toolbox.precache(precacheFiles);

// Install and Activate events
self.addEventListener('install', (event) => event.waitUntil(self.skipWaiting()));
self.addEventListener('activate', (event) => event.waitUntil(self.clients.claim()));

// Fetch events
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => response || fetch(event.request))
    );
});
