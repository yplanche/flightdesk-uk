const assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs');
(async()=>{
const elements=new Map(),events={},intervals=[];let requests=0,fail=false,age=0;
function element(id=''){return{id,hidden:false,textContent:'',value:'0',checked:false,open:false,childNodes:[],style:{},dataset:{},selectedOptions:[{text:'Wind · 10 m'}],setAttribute(n,v){this[n]=v},append(...nodes){this.childNodes.push(...nodes)},replaceChildren(...nodes){this.childNodes=[...nodes]},addEventListener(){},remove(){this.removed=true},closest(){return null}};}
for(const id of ['radareligible','radarhide','radarmap','radarstatus','radarframe','weathercard','wxpositions','wxmapstatus','wxlayer','wxlegend','weather-map-panel','wxload','radarload','date','hour'])elements.set(id,element(id));
elements.get('wxlayer').value='wind';const radarDetails=element();radarDetails.childNodes=[{nodeType:1,tagName:'SUMMARY'},element('existingradarcontrols')];elements.get('radareligible').closest=()=>radarDetails;
function map(){return{setView(){return this},invalidateSize(){},removeLayer(){}};}
function layer(url){return{events:{},on(name,fn){this.events[name]=fn;return this},addTo(){if(url.includes('/v2/radar/'))this.events.tileload?.();return this}};}
const ctx={console,URLSearchParams,AbortController,AbortSignal,navigator:{onLine:true},site:null,FLIGHT_WEATHER_GEO:{},document:{getElementById:id=>elements.get(id),createElement:()=>element()},L:{CRS:{EPSG3857:{}},map,tileLayer:layer,control:{scale:()=>({addTo(){}})},marker:()=>({addTo(){return this},bindPopup(){return this}})},setInterval:fn=>intervals.push(fn),fetch:async()=>{requests++;if(fail)throw Error('test network failure');return{ok:true,json:async()=>({host:'https://tilecache.rainviewer.com',radar:{past:[{time:Math.floor(Date.now()/1000)-age,path:'/v2/radar/abcdef'}]}})}}};ctx.window=ctx;ctx.addEventListener=(name,fn)=>events[name]=fn;ctx.select=(lat,lon)=>{ctx.site={lat,lon}};
vm.createContext(ctx);vm.runInContext(fs.readFileSync('dist/weather-map.js','utf8'),ctx);const flush=()=>new Promise(resolve=>setImmediate(resolve));
assert.equal(requests,0);assert.equal(elements.get('radarmap').hidden,false);assert.equal(radarDetails.removed,true);assert.equal(elements.get('radarhide').textContent,'Clear radar imagery');
elements.get('radareligible').checked=true;elements.get('radareligible').onchange();await flush();assert.equal(requests,0);assert.equal(ctx.flightRadarStatus().status,'no-site');
ctx.select(51.5,-0.1);await flush();assert.equal(requests,1);assert.equal(ctx.flightRadarStatus().status,'loaded');assert.equal(elements.get('radarmap').hidden,false);
ctx.select(51.5,-0.1);await flush();assert.equal(requests,1,'Same site and unrelated forecast actions do not refetch radar');
fail=true;await elements.get('radarload').onclick();assert.equal(ctx.flightRadarStatus().status,'failed');assert.match(elements.get('radarstatus').textContent,/HISTORICAL \/ UNVERIFIED/);assert.equal(elements.get('radarmap').hidden,false);
ctx.navigator.onLine=false;events.offline();assert.equal(ctx.flightRadarStatus().status,'offline');assert.equal(elements.get('radarmap').hidden,false);assert.match(elements.get('radarstatus').textContent,/Do not infer dry/);
elements.get('radarhide').onclick();assert.equal(elements.get('radarmap').hidden,false);assert.match(elements.get('radarstatus').textContent,/panel remains visible/);
ctx.navigator.onLine=true;fail=false;events.online();await flush();assert.equal(ctx.flightRadarStatus().status,'loaded');
ctx.select(52,-.2);await flush();assert.equal(requests,4);assert.equal(ctx.flightRadarStatus().site,'52.000000,-0.200000');
age=2400;await elements.get('radarload').onclick();assert.equal(ctx.flightRadarStatus().status,'stale');assert.match(elements.get('radarstatus').textContent,/STALE/);assert.equal(elements.get('radarmap').hidden,false);
console.log('Radar: always-visible no-site/eligibility/offline/failure states, latest auto-load, same-site request deduplication, retained-image failure warning and clear-without-hiding passed');
})().catch(e=>{console.error(e);process.exitCode=1});
