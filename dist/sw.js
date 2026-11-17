'use strict';
// Change RELEASE whenever ANY cached app file changes. No live feeds or auth routes are cached.
const RELEASE='7b6be914024166cf';
const CACHE='flightdesk-shell-'+RELEASE;
const CORE=['vendor/leaflet/images/layers-2x.png','vendor/leaflet/images/layers.png','vendor/leaflet/images/marker-icon-2x.png','vendor/leaflet/images/marker-icon.png','vendor/leaflet/images/marker-shadow.png','vendor/leaflet/leaflet.css','vendor/leaflet/leaflet.js','./','index.html','style.css','app.js','aircraft.js','rules.js','decision.js','equipment.js','operations.js','weather-chart.js','weather-map.js','weather-geo.js','field-workflow.js','completion-core.js','form-completion.js','pwa.js','backup.js','airspace-core.js','airspace-ui.js','manifest.webmanifest','icons/icon-180.png','icons/icon-192.png','icons/icon-512.png'];
const base=new URL('./',self.location.href);
const allowed=new Set(CORE.map(path=>new URL(path,base).href));
self.addEventListener('install',event=>event.waitUntil((async()=>{
 const cache=await caches.open(CACHE);
 try{for(const path of CORE){const url=new URL(path,base),response=await fetch(new Request(url,{cache:'reload',credentials:'same-origin',redirect:'error'}));if(!response.ok||response.type==='opaque')throw Error('Cannot cache '+path);
 if(path==='./'||path==='index.html'){const text=await response.clone().text();if(!text.includes('id="decisioncard"')||!text.includes('manifest.webmanifest'))throw Error('App document unavailable; sign in online first.');}
 await cache.put(url,response);}}
 catch(error){await caches.delete(CACHE);throw error;}
})()));
self.addEventListener('activate',event=>event.waitUntil((async()=>{for(const name of await caches.keys())if(name.startsWith('flightdesk-shell-')&&name!==CACHE)await caches.delete(name);await self.clients.claim();})()));
self.addEventListener('message',event=>{if(event.data?.type==='APPLY_UPDATE')self.skipWaiting();if(event.data?.type==='CACHE_STATUS')event.waitUntil((async()=>{const cache=await caches.open(CACHE);const ready=(await Promise.all(CORE.map(path=>cache.match(new URL(path,base))))).every(Boolean);event.source?.postMessage({type:'CACHE_STATUS',ready,release:RELEASE});})());});
self.addEventListener('fetch',event=>{const url=new URL(event.request.url);if(event.request.method!=='GET'||url.origin!==base.origin)return;
 // An exact allowlist avoids intercepting sign-in, account routes, APIs and other pages.
 if(!allowed.has(url.href))return;
 event.respondWith((async()=>{const cache=await caches.open(CACHE),cached=await cache.match(url);return cached||fetch(event.request);})());
});
