// Service Worker Toolbox
importScripts('/sw-toolbox/sw-toolbox.js');

(global => {
  'use strict';

  // Turn on debug logging, visible in the Developer Tools' console.
  global.toolbox.options.debug = true;

  // The route for the images
  toolbox.router.get('/images/(.*)', global.toolbox.networkFirst, {
    cache: {
          name: 'jpeg',
          maxEntries: 100,
          maxAgeSeconds: 86400 // cache for a day
        }
  });

  // By default, all requests that don't match our custom handler will use the toolbox.networkFirst
  // cache strategy, and their responses will be stored in the default cache.
  global.toolbox.router.default = global.toolbox.networkFirst;

  // Boilerplate to ensure our service worker takes control of the page as soon as possible.
  global.addEventListener('install', event => event.waitUntil(global.skipWaiting()));
  global.addEventListener('activate', event => event.waitUntil(global.clients.claim()));
})(self);
