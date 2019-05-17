/***
 * 
 * All service worker caching code goes here!!
 */

const cacheNameStatic = 'Restaurant-Reviews';
const URLsToCache = [
	'/',
	'index.html',
	'restaurant.html',
	'css/styles.css',
	'data/restaurants.json',
	'js/dbhelper.js',
	'js/main.js',
	'js/register_sw.js',
	'js/restaurant_info.js',
	'img/1.jpg',
	'img/2.jpg',
	'img/3.jpg',
	'img/4.jpg',
	'img/5.jpg',
	'img/6.jpg',
	'img/7.jpg',
	'img/8.jpg',
	'img/9.jpg',
    'img/10.jpg', 
    'img/favi.ico'
];

self.addEventListener('install', function(event) {
	console.log('installed');

	event.waitUntil(
		caches.open(cacheNameStatic).then(function(cache) {
			console.log('cachinf all');

			return cache.addAll(URLsToCache);
		})
	);
});

self.addEventListener('activate', function(event) {
	console.log('activated');

	event.waitUntil(
		caches.keys().then(function(cacheNameParameters) {
			return Promise.all(
				cacheNameParameters
					.filter(function(cacheNames) {
						return cacheNames.startsWith('Restaurant-') && cacheNames != cacheNameStatic;
					})
					.map(function(cacheNames) {
						console.log('deleting');

						return caches.delete(cacheNames);
					})
			);
		})
	);
});

self.addEventListener('fetch', function(event) {
	console.log('fetchion');

	event.respondWith(
		caches.match(event.request).then(function(response) {
			return response || fetch(event.request);
		})
	);
});
