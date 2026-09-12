// Lokale testserver: mock-API + de app zelf. Start:  node tools/werkbonnen-mock.js [--seed]
// Open daarna: http://localhost:8787/werkbonnen.html?api=http://localhost:8787/api   (codes: bon2026 / admin2026)
// Andere poort: WB_PORT=8790 (PowerShell: $env:WB_PORT=8790). De tests starten zelf een eigen mock op een vrije poort.
const http=require('http'), fs=require('fs'), path=require('path');
const {T,handle,seedWeek35}=require('./werkbonnen-mock-core.js');
const PUB=process.env.PUB||path.join(__dirname,'..','public');
const PORT=Number(process.env.WB_PORT||8787);
if(process.argv.includes('--seed')) seedWeek35();
http.createServer((req,res)=>{
  const cors={'Access-Control-Allow-Origin':'*','Access-Control-Allow-Headers':'content-type, x-code','Access-Control-Allow-Methods':'POST, OPTIONS'};
  if(req.method==='OPTIONS'){ res.writeHead(204,cors); return res.end(); }
  if(req.url.startsWith('/api')){ let b=''; req.on('data',c=>b+=c); req.on('end',()=>{ let j={}; try{ j=JSON.parse(b||'{}'); }catch(e){} const [st,out]=handle(j, req.headers['x-code']||j.code||''); res.writeHead(st,{'Content-Type':'application/json',...cors}); res.end(JSON.stringify(out)); }); return; }
  if(req.url==='/__dump'){ res.writeHead(200,{'Content-Type':'application/json'}); return res.end(JSON.stringify(T)); }
  let p=path.join(PUB, decodeURIComponent(req.url.split('?')[0].replace(/^\/app/,''))); if(p.endsWith('/')) p+='index.html';
  fs.readFile(p,(e,d)=>{ if(e){ res.writeHead(404); return res.end('nope'); } res.writeHead(200,{'Content-Type':p.endsWith('.html')?'text/html; charset=utf-8':'application/octet-stream'}); res.end(d); });
}).on('error',e=>{ if(e.code==='EADDRINUSE'){ console.error('Poort '+PORT+' is al in gebruik (draait er al een werkbonnen-mock?). Stop die eerst of kies een andere poort via WB_PORT.'); process.exit(1); } throw e; })
.listen(PORT,()=>console.log('Werkbonnen mock draait: http://localhost:'+PORT+'/werkbonnen.html?api='+encodeURIComponent('http://localhost:'+PORT+'/api')+'  (codes bon2026 / admin2026'+(process.argv.includes('--seed')?', voorbeelddata week 35 geladen':'')+')'));
