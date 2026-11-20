import http from 'node:http';
import {readFile} from 'node:fs/promises';
const archiveAssets={async fetch(request){const path=new URL(request.url).pathname;if(!/^\/flightdesk-uk-[0-9A-Za-z.-]+\.zip$/.test(path))return new Response('Not found',{status:404});try{return new Response(await readFile(new URL('../dist/releases'+path,import.meta.url)),{headers:{'Content-Type':'application/zip','Cache-Control':'no-cache'}});}catch{return new Response('Not found',{status:404});}}};
import worker from '../dist/server/index.js';
const port=Number(process.env.PORT)||4173;
const host=process.env.HOST||'127.0.0.1';
http.createServer(async(req,res)=>{try{const request=new Request('http://127.0.0.1:'+port+req.url,{method:req.method});const response=await worker.fetch(request,{RELEASE_ARCHIVES:archiveAssets});res.writeHead(response.status,Object.fromEntries(response.headers));res.end(Buffer.from(await response.arrayBuffer()));}catch(error){res.writeHead(500,{'Content-Type':'text/plain'});res.end(error.message);}}).listen(port,host,()=>console.log('Flightdesk ready at http://'+host+':'+port));
