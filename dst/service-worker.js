"use strict";var precacheConfig=[["/cost/index.html","2de18cc3a1829528dadb7888f5a3eddd"],["/geo/index.html","d0a80641bbb5456597f032e015529149"],["/googleb21529c66c27d41d.html","5ba152f6b0c0f77cc3dc5bdea5046d29"],["/images/0179bb4880bc76a424640b0d7cf38f7e.png","0179bb4880bc76a424640b0d7cf38f7e"],["/images/0199c60f475592476d92dd62cc45da2b.png","0199c60f475592476d92dd62cc45da2b"],["/images/295924deb2903e31d473a9d6af4b9c22.png","295924deb2903e31d473a9d6af4b9c22"],["/images/3333f85baaf865b5d7dc2787069a8b90.png","3333f85baaf865b5d7dc2787069a8b90"],["/images/372218726475cbaafc36564fff37cad4.png","372218726475cbaafc36564fff37cad4"],["/images/51f48e5641ae654426014da9348a0514.png","51f48e5641ae654426014da9348a0514"],["/images/62cef3919e69b1e6a46af2ab81b96001.png","62cef3919e69b1e6a46af2ab81b96001"],["/images/861ab02a8ec4dc83380c15745044be1a.png","861ab02a8ec4dc83380c15745044be1a"],["/images/8e0273b94d8041d8daf1d7ed5134e56a.png","8e0273b94d8041d8daf1d7ed5134e56a"],["/images/935328a483fbcb79ed621ce5c6d5c0bc.png","935328a483fbcb79ed621ce5c6d5c0bc"],["/images/9b9d6fca20e8acd664c9770ff1f5fb6b.png","9b9d6fca20e8acd664c9770ff1f5fb6b"],["/images/b5bc41c7e02073a740f00461a9a7ab7e.png","b5bc41c7e02073a740f00461a9a7ab7e"],["/images/bde2385c220c5b05cd4c18b2bd69c7ad.png","bde2385c220c5b05cd4c18b2bd69c7ad"],["/images/c2c06913f7ac95b9215a5f884d2c4612.jpg","c2c06913f7ac95b9215a5f884d2c4612"],["/images/cd2aab7a5ab384bfd14a4f6972fe377e.png","cd2aab7a5ab384bfd14a4f6972fe377e"],["/images/fc977b2d2b80a556df252d774dbc1da5.png","fc977b2d2b80a556df252d774dbc1da5"],["/images/fce1eda6bbee99eb04d44b24f46e56fa.png","fce1eda6bbee99eb04d44b24f46e56fa"],["/index.html","d852bd3a960b1d3730020a523e8d5965"],["/js/bd09ed1a703f487bc859.js","759c58b47060eaa41ecd4af3ac4197e2"],["/js/c63cd203c75b0fcfe6d0.js","f272974d4760dbae2933280ec4c13a39"],["/js/d3958d480a8f13502363.js","b6b02db7ff21345071a24483814b7265"],["/js/eb780e84bcf0e903346f.js","86cecc54adc82244a983eb50df096a6a"],["/manifest.json","8874511ab613d084b89904a39a4f94b4"],["/mongme/index.html","db1c285560afa40217e250feb02d10ea"],["/naver08911917528f10c04e4bb1571a9cb849.html","26f6a8541c45e85de48f94499c58784a"]],cacheName="sw-precache-v3-jojo.jy.is-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,a){var c=new URL(e);return"/"===c.pathname.slice(-1)&&(c.pathname+=a),c.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(a){return new Response(a,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,a,c,n){var t=new URL(e);return n&&t.pathname.match(n)||(t.search+=(t.search?"&":"")+encodeURIComponent(a)+"="+encodeURIComponent(c)),t.toString()},isPathWhitelisted=function(e,a){if(0===e.length)return!0;var c=new URL(a).pathname;return e.some(function(e){return c.match(e)})},stripIgnoredUrlParameters=function(e,a){var c=new URL(e);return c.hash="",c.search=c.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return a.every(function(a){return!a.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),c.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var a=e[0],c=e[1],n=new URL(a,self.location),t=createCacheKey(n,hashParamName,c,!1);return[n.toString(),t]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(a){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(c){if(!a.has(c)){var n=new Request(c,{credentials:"same-origin"});return fetch(n).then(function(a){if(!a.ok)throw new Error("Request for "+c+" returned a response with status "+a.status);return cleanResponse(a).then(function(a){return e.put(c,a)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var a=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(c){return Promise.all(c.map(function(c){if(!a.has(c.url))return e.delete(c)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var a,c=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching);(a=urlsToCacheKeys.has(c))||(c=addDirectoryIndex(c,"index.html"),a=urlsToCacheKeys.has(c));0,a&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(c)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(a){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,a),fetch(e.request)}))}});