/*
* Service worker code is all in this page.
* Partial credit to https://developers.google.com/web/fundamentals/primers/service-workers/
*/

const cacheName = 'restaurant-reviews-v2';
const URLsToCache = [
	'/',
	'/css/styles.css',
	'/data/restaurants.json',
	'/img/1.jpg',
    '/img/2.jpg',
    '/img/3.jpg',
    '/img/4.jpg',
    '/img/5.jpg',
    '/img/6.jpg',
    '/img/7.jpg',
    '/img/8.jpg',
    '/img/9.jpg',
	'/img/10.jpg',
	'/img/favi.ico',
	'/js/dbhelper.js',
	'/js/main.js',
	'/js/restaurant_info.js',
	'/index.html',
	'/restaurant.html',
	'/serviceWorker.js'
];

self.addEventListener('install', function(event){
	event.waitUntil(caches.open(cacheName).then(function(cache){
		return cache.addAll(URLsToCache);
	}));
});

self.addEventListener('fetch', function(event){
	event.respondWith(caches.match(event.request).then(function(response){
		if(response){
			return response;
		}

		return fetch(event.request).then(function(response){
			if(!response){
				return response;
			}
			var cacheResponse = response.clone();
			caches.open(cacheName).then(function(cache){
				cache.put(event.request, cacheResponse);
			});
			return response;
		});
	}));
});