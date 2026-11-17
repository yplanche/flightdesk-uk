import http from 'node:http';
import worker from '../dist/server/index.js';
const port=Number(process.env.PORT)||4173;
const host=process.env.HOST||'127.0.0.1';
http.createServer(async(req,res)=>{try{const request=new Request('http://127.0.0.1:'+port+req.url,{method:req.method});const response=await worker.fetch(request);res.writeHead(response.status,Object.fromEntries(response.headers));res.end(Buffer.from(await response.arrayBuffer()));}catch(error){res.writeHead(500,{'Content-Type':'text/plain'});res.end(error.message);}}).listen(port,host,()=>console.log('Flightdesk ready at http://'+host+':'+port));
