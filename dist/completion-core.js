/* SPDX-License-Identifier: AGPL-3.0-only
 * Flightdesk UK project origin: Yves Plancherel / ENDIAN-LAB.
 * Copyright ownership and third-party material: see COPYRIGHT.md and THIRD-PARTY-NOTICES.md.
 * Modified for release 1.0.0 on 18 November 2026.
 */
(function(root){'use strict';
function status({required=false,type='text',value='',checked=false,valid=true,semantic=null}){const blank=String(value).trim()==='';if(type==='checkbox'){if(!checked)return required?{state:'attention',text:'Needs attention'}:{state:'neutral',text:'Optional'};}else if(blank)return required?{state:'attention',text:'Needs attention'}:{state:'neutral',text:'Optional'};
if(!valid)return{state:'attention',text:'Check value'};if(semantic&&semantic.pass===false)return{state:'attention',text:semantic.text||'Needs attention'};return{state:'complete',text:'Complete'};}
function crew(record,required,date){return !!record?.name&&(!required||!!record.registration&&/^\d{4}-\d{2}-\d{2}$/.test(record.expiry||'')&&record.expiry>=date);}
const api={status,crew};root.FLIGHT_COMPLETION=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
