'use strict';
(()=>{
 const status=document.getElementById('pwa-status'),install=document.getElementById('pwa-install'),update=document.getElementById('pwa-update');let installPrompt=null,registration=null,offlineReady=false;
 const standalone=()=>matchMedia('(display-mode: standalone)').matches||navigator.standalone===true;
 function show(){status.textContent=(!navigator.onLine?'Offline · NO-GO. ':'Online · ')+(offlineReady?'Offline app ready. ':'Offline copy not confirmed yet. ')+(standalone()?'Running as an installed app.':'Install using your browser or the instructions below.');document.querySelector('.appaccess').classList.toggle('offline',!navigator.onLine);}
 window.addEventListener('beforeinstallprompt',event=>{event.preventDefault();installPrompt=event;install.hidden=standalone();});
 install.onclick=async()=>{if(!installPrompt)return;await installPrompt.prompt();await installPrompt.userChoice;installPrompt=null;install.hidden=true;};window.addEventListener('appinstalled',()=>{install.hidden=true;show();});
 function connection(){if(!navigator.onLine&&typeof clearWeather==='function'){++request;if(weatherController)weatherController.abort();window.flightAirspaceInvalidate?.();clearWeather('Offline: fresh forecast unavailable. Reconnect and refresh before flight.');reset(7);}window.updateFlightdeskDecision?.();show();}
 window.addEventListener('online',connection);window.addEventListener('offline',connection);
 function probe(){navigator.serviceWorker.controller?.postMessage({type:'CACHE_STATUS'});}
 if('serviceWorker'in navigator&&window.isSecureContext){navigator.serviceWorker.addEventListener('message',event=>{if(event.data?.type==='CACHE_STATUS'){offlineReady=event.data.ready===true;show();}});navigator.serviceWorker.addEventListener('controllerchange',()=>{probe();show();});
 navigator.serviceWorker.register('./sw.js',{updateViaCache:'none'}).then(reg=>{registration=reg;function waiting(){if(reg.waiting)update.hidden=false;}waiting();reg.addEventListener('updatefound',()=>{const worker=reg.installing;worker?.addEventListener('statechange',()=>{if(worker.state==='installed'){waiting();probe();}});});navigator.serviceWorker.ready.then(()=>{probe();});reg.update().catch(()=>{});}).catch(()=>{status.textContent='Offline setup unavailable on this address/browser. You can still use the online planner. See installation help.';});
 update.onclick=()=>{if(!registration?.waiting)return;if(!confirm('Save your current mission and download a backup first. Apply the update and reload now? Unsaved form edits will be lost.'))return;navigator.serviceWorker.addEventListener('controllerchange',()=>location.reload(),{once:true});registration.waiting.postMessage({type:'APPLY_UPDATE'});};
 }else status.textContent='Installation/offline support requires HTTPS or localhost and a supporting browser. You can still use the planner online.';
 connection();
})();
