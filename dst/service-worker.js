"use strict";var precacheConfig=[["/cost/index.html","0f294072f6d777a88bc740177b8e4faf"],["/geo/index.html","d4fe3ccd61360e59ad3caa6cbcab3029"],["/googleb21529c66c27d41d.html","5ba152f6b0c0f77cc3dc5bdea5046d29"],["/images/2273711a9d64cbe4432020ad204e4da4.png","2273711a9d64cbe4432020ad204e4da4"],["/images/372218726475cbaafc36564fff37cad4.png","372218726475cbaafc36564fff37cad4"],["/images/477d3e99b03a4a843cb7dd4bf938fbd6.png","477d3e99b03a4a843cb7dd4bf938fbd6"],["/images/47edbb9e9c8aae6af9fcb4152937dd04.png","47edbb9e9c8aae6af9fcb4152937dd04"],["/images/6727dfbc22375fcd6ad3d60f375b7b4a.png","6727dfbc22375fcd6ad3d60f375b7b4a"],["/images/74ffbd9cb0d294a95d43f9c627275cab.png","74ffbd9cb0d294a95d43f9c627275cab"],["/images/861ab02a8ec4dc83380c15745044be1a.png","861ab02a8ec4dc83380c15745044be1a"],["/images/88555928ef56e1fc141810b6e0e68336.png","88555928ef56e1fc141810b6e0e68336"],["/images/950b942f4b62c623ea0931e38cc044b0.png","950b942f4b62c623ea0931e38cc044b0"],["/images/9f30359f2ff9ef41561673b186e441dd.png","9f30359f2ff9ef41561673b186e441dd"],["/images/a69e40b418af3c5133af3f2497807437.png","a69e40b418af3c5133af3f2497807437"],["/images/a6e1ef842fce94529e9ef1312527c0a3.png","a6e1ef842fce94529e9ef1312527c0a3"],["/images/bb8806895ed04c4f879ca137238d2d35.jpg","bb8806895ed04c4f879ca137238d2d35"],["/images/d6d699af448af21de97943651beeb1fe.png","d6d699af448af21de97943651beeb1fe"],["/images/e2b149c674b24fd658e0decae1d39183.png","e2b149c674b24fd658e0decae1d39183"],["/images/e3495688d2164d64439c74350a935bd4.png","e3495688d2164d64439c74350a935bd4"],["/images/f1f339f2e1f2bbc9d8902cf90eb8c764.png","f1f339f2e1f2bbc9d8902cf90eb8c764"],["/images/fce1eda6bbee99eb04d44b24f46e56fa.png","fce1eda6bbee99eb04d44b24f46e56fa"],["/index.html","56c7900efb5222385a934fe56e387c7e"],["/js/5168a0233fe3f7d25db7.js","552bc077bd77ab277c1c6f5fca27912b"],["/js/88d5cd54e84d51440e99.js","e178f3c7cc5d344f4cc541f52a938e7d"],["/js/af9778e466dd17a5d580.js","36c8af74eb0f9681b165dce74398134c"],["/manifest.json","8874511ab613d084b89904a39a4f94b4"],["/naver08911917528f10c04e4bb1571a9cb849.html","26f6a8541c45e85de48f94499c58784a"]],cacheName="sw-precache-v3-jojo.jy.is-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,a){var n=new URL(e);return"/"===n.pathname.slice(-1)&&(n.pathname+=a),n.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(a){return new Response(a,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,a,n,c){var t=new URL(e);return c&&t.pathname.match(c)||(t.search+=(t.search?"&":"")+encodeURIComponent(a)+"="+encodeURIComponent(n)),t.toString()},isPathWhitelisted=function(e,a){if(0===e.length)return!0;var n=new URL(a).pathname;return e.some(function(e){return n.match(e)})},stripIgnoredUrlParameters=function(e,a){var n=new URL(e);return n.hash="",n.search=n.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return a.every(function(a){return!a.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),n.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var a=e[0],n=e[1],c=new URL(a,self.location),t=createCacheKey(c,hashParamName,n,!1);return[c.toString(),t]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(a){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(n){if(!a.has(n)){var c=new Request(n,{credentials:"same-origin"});return fetch(c).then(function(a){if(!a.ok)throw new Error("Request for "+n+" returned a response with status "+a.status);return cleanResponse(a).then(function(a){return e.put(n,a)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var a=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(n){return Promise.all(n.map(function(n){if(!a.has(n.url))return e.delete(n)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var a,n=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching);(a=urlsToCacheKeys.has(n))||(n=addDirectoryIndex(n,"index.html"),a=urlsToCacheKeys.has(n));0,a&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(n)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(a){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,a),fetch(e.request)}))}});