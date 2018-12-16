"use strict";var precacheConfig=[["cost/index.html","8aa75455f8d8c3361ff7034fc8d42459"],["dst/cost-db8e601b7756e2ca3016-bundle.js","b0ebf97db65a5f3681c365bb681d0c1f"],["dst/geo-db8e601b7756e2ca3016-bundle.js","cdfba18234d3ba6f33b8c90a127c729d"],["dst/index-db8e601b7756e2ca3016-bundle.js","c9a2f3989f059d3840610b43eaef5543"],["geo/index.html","dd8b4c26255174af8ab3f5599ae78faa"],["images/android-icon-144x144.png","d6d699af448af21de97943651beeb1fe"],["images/android-icon-192x192.png","477d3e99b03a4a843cb7dd4bf938fbd6"],["images/android-icon-36x36.png","f794c44b34b1584b35b3521f1ba55a0c"],["images/android-icon-48x48.png","8af594c6c0ba8842d166b37e844f2dc1"],["images/android-icon-72x72.png","f1f339f2e1f2bbc9d8902cf90eb8c764"],["images/android-icon-96x96.png","e2b149c674b24fd658e0decae1d39183"],["images/apple-icon-114x114.png","47edbb9e9c8aae6af9fcb4152937dd04"],["images/apple-icon-120x120.png","a69e40b418af3c5133af3f2497807437"],["images/apple-icon-144x144.png","d6d699af448af21de97943651beeb1fe"],["images/apple-icon-152x152.png","6727dfbc22375fcd6ad3d60f375b7b4a"],["images/apple-icon-180x180.png","a6e1ef842fce94529e9ef1312527c0a3"],["images/apple-icon-57x57.png","e3495688d2164d64439c74350a935bd4"],["images/apple-icon-60x60.png","9f30359f2ff9ef41561673b186e441dd"],["images/apple-icon-72x72.png","f1f339f2e1f2bbc9d8902cf90eb8c764"],["images/apple-icon-76x76.png","88555928ef56e1fc141810b6e0e68336"],["images/apple-icon-precomposed.png","2273711a9d64cbe4432020ad204e4da4"],["images/apple-icon.png","2273711a9d64cbe4432020ad204e4da4"],["images/browserconfig.xml","653d077300a12f09a69caeea7a8947f8"],["images/favicon-16x16.png","950b942f4b62c623ea0931e38cc044b0"],["images/favicon-32x32.png","74ffbd9cb0d294a95d43f9c627275cab"],["images/favicon-96x96.png","e2b149c674b24fd658e0decae1d39183"],["images/favicon.ico","af51fb705671b8d4b832f925af3a3e5f"],["images/icon-bot.png","861ab02a8ec4dc83380c15745044be1a"],["images/icon-cost.png","fce1eda6bbee99eb04d44b24f46e56fa"],["images/icon-geo.png","372218726475cbaafc36564fff37cad4"],["images/ms-icon-144x144.png","d6d699af448af21de97943651beeb1fe"],["images/ms-icon-150x150.png","a34c8c653a8007cdd8e7cbac57baab78"],["images/ms-icon-310x310.png","4c7d86bef4ecba43389106e6a93c6d58"],["images/ms-icon-70x70.png","c2f2d47cc0433b54c609daa8ee98d691"],["images/og.jpg","bb8806895ed04c4f879ca137238d2d35"],["index.html","db573c6131b8ac41aef37a1d13a52714"]],cacheName="sw-precache-v3-jojo.jy.is-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,a){var n=new URL(e);return"/"===n.pathname.slice(-1)&&(n.pathname+=a),n.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(a){return new Response(a,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,a,n,c){var t=new URL(e);return c&&t.pathname.match(c)||(t.search+=(t.search?"&":"")+encodeURIComponent(a)+"="+encodeURIComponent(n)),t.toString()},isPathWhitelisted=function(e,a){if(0===e.length)return!0;var n=new URL(a).pathname;return e.some(function(e){return n.match(e)})},stripIgnoredUrlParameters=function(e,a){var n=new URL(e);return n.hash="",n.search=n.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return a.every(function(a){return!a.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),n.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var a=e[0],n=e[1],c=new URL(a,self.location),t=createCacheKey(c,hashParamName,n,!1);return[c.toString(),t]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(a){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(n){if(!a.has(n)){var c=new Request(n,{credentials:"same-origin"});return fetch(c).then(function(a){if(!a.ok)throw new Error("Request for "+n+" returned a response with status "+a.status);return cleanResponse(a).then(function(a){return e.put(n,a)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var a=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(n){return Promise.all(n.map(function(n){if(!a.has(n.url))return e.delete(n)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var a,n=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching);(a=urlsToCacheKeys.has(n))||(n=addDirectoryIndex(n,"index.html"),a=urlsToCacheKeys.has(n));0,a&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(n)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(a){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,a),fetch(e.request)}))}});