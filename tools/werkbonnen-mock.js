// Lokale testserver: mock-API + de app zelf. Start:  node tools/werkbonnen-mock.js
// Open daarna: http://localhost:8787/werkbonnen.html?api=http://localhost:8787/api   (codes: bon2026 / admin2026)
const http=require('http'), fs=require('fs'), path=require('path');
const {T,handle,seedWeek35}=require('./werkbonnen-mock-core.js');
const PUB=process.env.PUB||path.join(__dirname,'..','public');
if(process.argv.includes('--seed')) seedWeek35();
http.createServer((req,res)=>{
  const cors={'Access-Control-Allow-Origin':'*','Access-Control-Allow-Headers':'content-type, x-code','Access-Control-Allow-Methods':'POST, OPTIONS'};
  if(req.method==='OPTIONS'){ res.writeHead(204,cors); return res.end(); }
  if(req.url.startsWith('/api')){ let b=''; req.on('data',c=>b+=c); req.on('end',()=>{ let j={}; try{ j=JSON.parse(b||'{}'); }catch(e){} const [st,out]=handle(j, req.headers['x-code']||j.code||''); res.writeHead(st,{'Content-Type':'application/json',...cors}); res.end(JSON.stringify(out)); }); return; }
  if(req.url==='/__dump'){ res.writeHead(200,{'Content-Type':'application/json'}); return res.end(JSON.stringify(T)); }
  let p=path.join(PUB, decodeURIComponent(req.url.split('?')[0].replace(/^\/app/,''))); if(p.endsWith('/')) p+='index.html';
  fs.readFile(p,(e,d)=>{ if(e){ res.writeHead(404); return res.end('nope'); } res.writeHead(200,{'Content-Type':p.endsWith('.html')?'text/html; charset=utf-8':'application/octet-stream'}); res.end(d); });
}).listen(8787,()=>console.log('Werkbonnen mock draait: http://localhost:8787/werkbonnen.html?api='+encodeURIComponent('http://localhost:8787/api')+'  (codes bon2026 / admin2026'+(process.argv.includes('--seed')?', voorbeelddata week 35 geladen':'')+')'));
