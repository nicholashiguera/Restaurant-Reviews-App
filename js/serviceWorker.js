/***
 * 
 * All service worker caching code goes here!!
 */

const cacheNameStatic = 'Restaurant_Reviews';
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
	'/js/dbhelper.js',
	'/js/main.js',
	'/js/restaurant_info.js',
	'/index.html',
	'/restaurants.html'
];

self.addEventListener('install', function(event) {
	event.waitUntil(
		caches.open(cacheNameStatic).then(function(cache) {
			return cache.addAll(URLsToCache);
		})
	);
});

self.addEventListener('activate', function(event) {
	event.waitUntil(
		caches.keys().then(function(cacheNameParameters) {
			return Promise.all(
				cacheNameParameters
					.filter(function(cacheNames) {
						return cacheNames.startsWith('Restaurant') && cacheNames != cacheNameStatic;
					})
					.map(function(cacheNames) {
						return caches.delete(cacheNames);
					})
			);
		})
	);
});

self.addEventListener('fetch', function(event) {
	event.respondWith(
		caches.match(event.request).then(function(response) {
			return response || fetch(event.request);
		})
	);
});
