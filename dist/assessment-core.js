/* SPDX-License-Identifier: AGPL-3.0-only */
/* Structured review completion is separate from operational suitability. */
(function(root){'use strict';
const finite=v=>typeof v==='number'&&Number.isFinite(v),positive=v=>finite(v)&&v>0;
const labels={go:'Recommendation is “go”',warning:'Recommendation is “fly with caution”','no-go':'Recommendation is “conditions unsuitable”'};
function label(status){return labels[status]||labels['no-go'];}
function forecastKey(data,start,duration){const hour=String(start||'').slice(0,13)+':00',first=data?.hourly?.time?.indexOf(hour)??-1,count=Math.ceil(((Number(duration)||0)+Number(String(start||'').slice(14,16)||0))/60)+1,day=data?.daily?.time?.indexOf(String(start||'').slice(0,10))??-1;return JSON.stringify(first<0?null:{hourly:Object.fromEntries(Object.entries(data.hourly).map(([k,v])=>[k,Array.isArray(v)?v.slice(first,first+count):v])),daily:Object.fromEntries(Object.entries(data.daily||{}).map(([k,v])=>[k,Array.isArray(v)?v[day]:v]))});}
function weather(s){const pending=[],riskReasons=[];const missing=(ok,id,field,message)=>{if(!ok)pending.push({id,field,message});};
missing(positive(s.duration)&&s.duration<=180,'duration','reserve','Complete the battery-based flight allowance to review the full weather interval.');
missing(s.online!==false,'online','refresh','Reconnect and retrieve current weather before completing the review.');
missing(finite(s.weatherAge)&&s.weatherAge>=0&&s.weatherAge<20,'freshness','refresh','Retrieve a forecast less than 20 minutes old.');
const rows=Array.isArray(s.weather)?s.weather:[],variables=rows.length>0&&rows.every(h=>['wind','gust','wind80','rain','prob','visibility','temperature'].every(k=>finite(h[k])));
missing(rows.length>0&&s.coverage===true,'coverage','refresh','Forecast coverage must include the entire calculated flight interval.');
missing(variables,'variables','refresh','Required forecast variables must be available throughout the flight interval.');
for(const [id,ok,text]of [['maxwind',positive(s.maxwind),'Enter the manufacturer wind limit.'],['opwind',positive(s.opwind),'Enter the operator wind limit.'],['mintemp',finite(s.mintemp)&&finite(s.maxtemp)&&s.mintemp<s.maxtemp,'Enter a valid aircraft temperature range.'],['minvis',positive(s.minvis),'Enter the operational visibility threshold.'],['maxrain',finite(s.maxrain)&&s.maxrain>=0,'Enter a non-negative precipitation threshold.'],['maxprob',finite(s.maxprob)&&s.maxprob>=0&&s.maxprob<=100,'Enter a precipitation probability threshold between 0 and 100%.']])missing(ok,id,id,text);
const warnings=[];
if(variables){const max=k=>Math.max(...rows.map(h=>h[k])),min=k=>Math.min(...rows.map(h=>h[k])),ceiling=Math.min(...[s.maxwind,s.opwind].filter(positive)),wind=Math.max(max('wind'),max('gust'),max('wind80'));
if(finite(ceiling)&&wind>=ceiling)warnings.push('Forecast wind/gust screening reaches or exceeds the configured wind ceiling.');
if(finite(s.mintemp)&&finite(s.maxtemp)&&(min('temperature')<s.mintemp||max('temperature')>s.maxtemp))warnings.push('Forecast temperature is outside the configured aircraft range.');
if(positive(s.minvis)&&min('visibility')<s.minvis)warnings.push('Forecast visibility is below the operator threshold.');
if(finite(s.maxrain)&&max('rain')>s.maxrain)warnings.push('Forecast precipitation exceeds the configured threshold.');
if(finite(s.maxprob)&&max('prob')>s.maxprob)warnings.push('Forecast precipitation probability exceeds the operator threshold.');}
missing(s.weatherAcknowledged===true,'forecast-review','weatherack','Record your review of the forecast for the complete flight interval.');
if(warnings.length)missing(s.weatherRiskAcknowledged===true,'forecast-concerns','weatherriskack','Acknowledge the forecast concerns and assess actual conditions before flight.');
missing(s.ambiguousTime!==true,'clock','takeofftime','Resolve the ambiguous London take-off time.');
const o=s.onsite,reviewed=!!o&&['acceptable','uncertain','unacceptable'].includes(o.status)&&!!o.reviewedAt&&Number.isFinite(Date.parse(o.reviewedAt));
missing(reviewed,'onsite-review','onsiteconditions','Record the on-site conditions assessment, including when conditions are unsuitable.');
for(const k of ['wind','gust','rain','temperature','visibility']){const value=o?.conditions?.[k];missing(value===null||value===undefined||finite(value)&&(k==='temperature'||value>=0),'observation-'+k,'onsite'+k,'Correct the optional '+k+' observation, or clear it if unknown.');}
if(reviewed&&!o.valid)riskReasons.push(...(o.reasons?.length?o.reasons:['On-site conditions remain uncertain or unacceptable.']));
if(s.coverage&&positive(s.duration)&&s.night==='no'&&s.daylight===false)riskReasons.push('The flight interval extends outside the reviewed daylight period. Review night operation requirements.');
return{complete:pending.length===0,pending,warnings,risk:riskReasons.length?'unsuitable':warnings.length?'caution':'clear',riskReasons};}
function section({rows=[],additional=[],risk='clear',riskReasons=[]}={}){const pending=[...rows.filter(r=>r.required&&r.state!=='complete').map(r=>({id:r.id,field:r.id,message:r.label||r.text||'Complete this required input.'})),...additional];return{complete:pending.length===0,pending,risk,riskReasons};}
const api={label,weather,section,forecastKey};root.FLIGHT_ASSESSMENT=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
