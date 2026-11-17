(function(root){'use strict';
const R=6371008.8,rad=d=>d*Math.PI/180,deg=r=>r*180/Math.PI;
function valid(p){return !!p&&typeof p.lat==='number'&&typeof p.lon==='number'&&Number.isFinite(p.lat)&&Number.isFinite(p.lon)&&p.lat>=-85.05112878&&p.lat<=85.05112878&&p.lon>=-180&&p.lon<=180;}
function distance(a,b){const dp=rad(b.lat-a.lat),dl=rad(b.lon-a.lon),h=Math.sin(dp/2)**2+Math.cos(rad(a.lat))*Math.cos(rad(b.lat))*Math.sin(dl/2)**2;return 2*R*Math.asin(Math.sqrt(Math.min(1,h)));}
function offset(p,east,north){if(!valid(p))throw Error('Invalid WGS84 launch coordinate');const d=Math.hypot(east,north)/R,b=Math.atan2(east,north),lat=rad(p.lat),lon=rad(p.lon),p2=Math.asin(Math.sin(lat)*Math.cos(d)+Math.cos(lat)*Math.sin(d)*Math.cos(b)),l2=lon+Math.atan2(Math.sin(b)*Math.sin(d)*Math.cos(lat),Math.cos(d)-Math.sin(lat)*Math.sin(p2));return{lat:deg(p2),lon:(deg(l2)+540)%360-180};}
function samples(site){const out=[];for(let y=-2;y<=2;y++)for(let x=-2;x<=2;x++)out.push(offset(site,x*5000,y*5000));return out;}
function attach(responses,requests){if(!Array.isArray(responses)||responses.length!==requests.length)throw Error('Weather location count mismatch');return responses.map((g,i)=>{const point={lat:g.latitude,lon:g.longitude};if(!valid(point)||!valid(requests[i]))throw Error('Invalid WGS84 weather coordinate');const displacement=distance(point,requests[i]);if(displacement>30000)throw Error('Weather grid coordinate unexpectedly far from requested location');return{...g,requested:requests[i],displacement};});}
function groups(grid){const out=new Map();for(const g of grid){const key=JSON.stringify([g.latitude,g.longitude]);if(!out.has(key))out.set(key,{lat:g.latitude,lon:g.longitude,samples:[]});out.get(key).samples.push(g);}return [...out.values()];}
function leaflet(p){if(!valid(p))throw Error('Invalid map coordinate');return[p.lat,p.lon];}
const api={valid,distance,offset,samples,attach,groups,leaflet};root.FLIGHT_WEATHER_GEO=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
