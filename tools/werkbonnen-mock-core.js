// Mock van de edge function "werkbonnen" (zelfde regels/validatie), in-memory. Werkt in Node en in de browser (demo).
const CODE_TEAM='bon2026', CODE_ADMIN='admin2026';
const CATS=['arbeid','km','overnachting','materieel','transport','materiaal'];
let seq={bedrijf:0,project:0,tarief:0,bon:0,regel:0,factuur:0,log:0};
const T={bedrijven:[],projecten:[],tarieven:[],bonnen:[],regels:[],facturen:[],instellingen:{factuur_prefix:'2026',factuur_volgnummer:'266',betaaltermijn_dagen:'14',btw_pct:'21'},logboek:[]};
function add(tab,key,row){ row.id=++seq[key]; T[tab].push(row); return row; }
const kz=add('bedrijven','bedrijf',{soort:'aannemer',naam:'KZ Kasherstel B.V.',adres:'Maasdijk 86',postcode_plaats:"2691 NV 's-Gravenzande",land:'NL',kvk:'',btw_nummer:'',iban:'',email:'basdebrabander@kzkasherstel.nl',telefoon:'0174 516022',debiteur_code:'',actief:true});
const baas=add('bedrijven','bedrijf',{soort:'opdrachtgever',naam:'Baas Groep B.V.',adres:'Enserweg 4',postcode_plaats:'8307 PL Ens',land:'NL',kvk:'',btw_nummer:'',iban:'',email:'hagelschade@kwekerijbaas.nl',telefoon:'',debiteur_code:'',actief:true});
add('projecten','project',{code:'26691',naam:'Enserweg',adres:'Enserweg 5',postcode_plaats:'8307 PJ Ens',aannemer_id:kz.id,opdrachtgever_id:baas.id,claimnummer:'QS10243133',factuur_omschrijving:'Uitgevoerde werkzaamheden t.a.v. glas schade Enserweg',actief:true,sort:1});
add('projecten','project',{code:'26692',naam:'Drietorensweg',adres:'Drietorensweg 36',postcode_plaats:'8307 PL Ens',aannemer_id:kz.id,opdrachtgever_id:baas.id,claimnummer:'QS10243133',factuur_omschrijving:'Uitgevoerde werkzaamheden t.a.v. glas schade Drietorensweg',actief:true,sort:2});
[['arbeid','Arbeid','man','uur','per uur',61.50,'ma-vr',1],['arbeid','Arbeid zaterdag','man','uur','per uur',77.00,'za',2],['arbeid','Arbeid zondag / feestdag','man','uur','per uur',92.25,'zo',3],
 ['km','Kilometervergoeding',"auto's",'km.','per km.',0.70,'alle',10],['overnachting','Overnachtingsvergoeding','','','per nacht',130,'alle',20],
 ['materieel','Gebruik hoogwerker incl. brandstof','','','per dag',300,'alle',30],['materieel','Gebruik bandenhoogwerker incl. brandstof','','','per dag',175,'alle',31],['materieel','Gebruik bandenhoogwerker','','','per dag',100,'alle',32],
 ['materieel','Gebruik platformtrekker incl. brandstof','','','per dag',250,'alle',33],['materieel','Gebruik teleshovel incl. brandstof','','','per dag',225,'alle',34],['materieel','Gebruik shovel met toebehoren incl. brandstof','','','per dag',225,'alle',35],
 ['materieel','Gebruik gootkarren enkel','stuks','dag','per dag',40,'alle',36],['materieel','Gebruik zuiginstallatie incl. brandstof','stuks','dag','per dag',105,'alle',37],
 ['transport','Transport container','','','per uur',95,'alle',40],['transport','Transport materiaal','','','per uur',95,'alle',41],['transport','Ophalen materiaal','','','per uur',130,'alle',42],
 ['materiaal','Afdekstrip gootrand','','','per stuk',11,'alle',50],['materiaal','Gootrand profiel','','','per stuk',7.45,'alle',51],['materiaal','Luchtraamkalf 593mm','','','per stuk',4.29,'alle',52],['materiaal','Luchtraamkalf 1118mm','','','per stuk',14.25,'alle',53],['materiaal','Opdrukkers','','','per stuk',2.67,'alle',54],['materiaal','Siliconen kit','','','per stuk',3.40,'alle',55],['materiaal','Steunrubber','','','per rol',23.15,'alle',56]
].forEach(r=>add('tarieven','tarief',{categorie:r[0],omschrijving:r[1],eenheid_n:r[2],eenheid_per:r[3],eenheid_totaal:r[4],prijs:r[5],dagtype:r[6],sort:r[7],actief:true}));
const r2=n=>Math.round((n+Number.EPSILON)*100)/100;
function num(v,veld){ const n=Number(String(v??'').replace(',','.')); if(!Number.isFinite(n)||n<0) throw new Error(veld+' is geen geldig getal'); return n; }
function isoWeek(d){ const [y,m,dd]=d.split('-').map(Number); const dt=new Date(Date.UTC(y,m-1,dd)); const dag=dt.getUTCDay()||7; dt.setUTCDate(dt.getUTCDate()+4-dag); const js=new Date(Date.UTC(dt.getUTCFullYear(),0,1)); return {jaar:dt.getUTCFullYear(),week:Math.ceil((((dt-js)/86400000)+1)/7)}; }
function normRegels(regels){ if(!Array.isArray(regels)) throw new Error('regels ontbreken'); return regels.map((x,i)=>{ if(!CATS.includes(x.categorie)) throw new Error('onbekende categorie op regel '+(i+1)); const oms=String(x.omschrijving||'').trim(); if(!oms) throw new Error('omschrijving leeg op regel '+(i+1)); const aantal=num(x.aantal,'aantal'); const per=x.per==null||x.per===''?null:num(x.per,'per'); const prijs=num(x.prijs,'prijs'); const totaal=r2(per==null?aantal:aantal*per); return {sort:i+1,categorie:x.categorie,omschrijving:oms,tarief_id:x.tarief_id==null||x.tarief_id===''?null:Number(x.tarief_id),aantal,per,totaal,prijs,bedrag:r2(totaal*prijs),eenheid_n:String(x.eenheid_n||''),eenheid_per:String(x.eenheid_per||''),eenheid_totaal:String(x.eenheid_totaal||''),namen:String(x.namen||'')}; }); }
function handle(body, code){
  const rol=code===CODE_ADMIN?'admin':code===CODE_TEAM?'team':''; if(!rol) return [401,{fout:'onjuiste code'}];
  const admin=rol==='admin', wie=String(body.wie||''), fields=body.fields||{}, id=body.id==null?undefined:Number(body.id);
  const log=()=>{ if(body.log) T.logboek.unshift({id:++seq.log,ts:new Date().toISOString(),wie,actie:body.log}); };
  try{
    switch(body.action){
      case 'state': return [200,{rol,bedrijven:T.bedrijven,projecten:T.projecten,tarieven:T.tarieven,bonnen:T.bonnen.slice().sort((a,b)=>a.datum<b.datum?1:a.datum>b.datum?-1:b.id-a.id),regels:T.regels,facturen:T.facturen.slice().reverse(),instellingen:T.instellingen,logboek:admin?T.logboek.slice(0,60):[],storage_url:(typeof window!=='undefined')?'':'http://localhost:8787/storage/'}];
      case 'bon_save': {
        const project_id=Number(fields.project_id); if(!Number.isInteger(project_id)) throw new Error('kies een project');
        if(!/^\d{4}-\d{2}-\d{2}$/.test(fields.datum||'')) throw new Error('datum is geen geldige datum');
        const regels=normRegels(body.regels);
        const basis={project_id,datum:fields.datum,ingevuld_door:String(fields.ingevuld_door||wie),opmerking:String(fields.opmerking||''),afgetekend_door:String(fields.afgetekend_door||''),updated_at:new Date().toISOString()};
        if(fields.handtekening_b64) basis.handtekening_pad=(typeof window!=='undefined')?fields.handtekening_b64:'sig-'+Date.now()+'.png';
        if((fields.fotos_b64||[]).length>10) throw new Error("maximaal 10 foto's per bon");
        const nieuwe=(fields.fotos_b64||[]).map((f,i)=>(typeof window!=='undefined')?f:'foto-'+Date.now()+'-'+i+'.jpg');
        let bon;
        if(id){ bon=T.bonnen.find(b=>b.id===id); if(!bon) throw new Error('bon niet gevonden');
          if(!admin&&!['concept','afgekeurd'].includes(bon.status)) throw new Error('Deze bon is al ingediend en kan alleen door de administratie gewijzigd worden');
          if(admin&&bon.status==='gefactureerd') throw new Error('Deze bon zit al op een factuur');
          Object.assign(bon,basis); bon.foto_paden=[...(Array.isArray(fields.foto_paden)?fields.foto_paden:bon.foto_paden),...nieuwe]; if(bon.status==='afgekeurd') bon.status='concept';
          T.regels=T.regels.filter(r=>r.bon_id!==id);
        } else { bon=add('bonnen','bon',{...basis,status:'concept',foto_paden:nieuwe,handtekening_pad:basis.handtekening_pad||'',ingediend_ts:null,beoordeeld_door:'',beoordeeld_ts:null,beoordeling:'',factuur_id:null,created_at:new Date().toISOString()}); }
        for(const r of regels) add('regels','regel',{...r,bon_id:bon.id});
        if(body.indienen){ if(!regels.length) throw new Error('bon heeft nog geen regels'); Object.assign(bon,{status:'ingediend',ingediend_ts:new Date().toISOString(),beoordeling:'',beoordeeld_door:'',beoordeeld_ts:null}); }
        log(); return [200,{ok:true,id:bon.id}];
      }
      case 'bon_indienen': { const bon=T.bonnen.find(b=>b.id===id); if(!['concept','afgekeurd'].includes(bon.status)) throw new Error('bon is al ingediend'); if(!T.regels.some(r=>r.bon_id===id)) throw new Error('bon heeft nog geen regels'); Object.assign(bon,{status:'ingediend',ingediend_ts:new Date().toISOString()}); break; }
      case 'bon_delete': { const bon=T.bonnen.find(b=>b.id===id); if(!admin&&!['concept','afgekeurd'].includes(bon.status)) throw new Error('alleen concepten kunnen verwijderd worden'); if(bon.status==='gefactureerd') throw new Error('bon zit op een factuur'); T.bonnen=T.bonnen.filter(b=>b.id!==id); T.regels=T.regels.filter(r=>r.bon_id!==id); break; }
      case 'bon_beoordeel': { if(!admin) throw new Error('alleen administratie'); const bon=T.bonnen.find(b=>b.id===id); if(bon.status==='gefactureerd') throw new Error('bon zit al op een factuur'); const b=body.besluit; if(!['goedgekeurd','afgekeurd','ingediend'].includes(b)) throw new Error('onbekend besluit'); Object.assign(bon,{status:b,beoordeeld_door:b==='ingediend'?'':wie,beoordeeld_ts:b==='ingediend'?null:new Date().toISOString(),beoordeling:String(body.beoordeling||'')}); break; }
      case 'bedrijf_save': { if(!admin) throw new Error('alleen administratie'); if('soort' in fields&&!['aannemer','opdrachtgever'].includes(fields.soort)) throw new Error('onbekend soort'); if('naam' in fields&&!String(fields.naam).trim()) throw new Error('naam leeg'); if(id) Object.assign(T.bedrijven.find(b=>b.id===id),fields); else add('bedrijven','bedrijf',{...fields}); break; }
      case 'project_save': { if(!admin) throw new Error('alleen administratie'); if('code' in fields&&!String(fields.code).trim()) throw new Error('projectcode leeg'); if(!id&&T.projecten.some(p=>p.code===fields.code)) throw new Error('projectcode bestaat al'); if(id) Object.assign(T.projecten.find(b=>b.id===id),fields); else add('projecten','project',{...fields}); break; }
      case 'tarief_save': { if(!admin) throw new Error('alleen administratie'); if('categorie' in fields&&!CATS.includes(fields.categorie)) throw new Error('onbekende categorie'); if('dagtype' in fields&&!['alle','ma-vr','za','zo'].includes(fields.dagtype)) throw new Error('onbekend dagtype'); if('prijs' in fields) fields.prijs=num(fields.prijs,'prijs'); if(id) Object.assign(T.tarieven.find(b=>b.id===id),fields); else add('tarieven','tarief',{actief:true,...fields}); break; }
      case 'tarief_delete': { if(!admin) throw new Error('alleen administratie'); T.tarieven.find(b=>b.id===id).actief=false; break; }
      case 'instelling_save': { if(!admin) throw new Error('alleen administratie'); Object.assign(T.instellingen,body.instellingen||{}); break; }
      case 'factuur_maak': {
        if(!admin) throw new Error('alleen administratie'); const project_id=Number(body.project_id), jaar=Number(body.jaar), week=Number(body.week); const ids=body.bon_ids||[]; if(!ids.length) throw new Error('geen goedgekeurde bonnen geselecteerd');
        const bonnen=T.bonnen.filter(b=>ids.includes(b.id)); for(const b of bonnen){ if(b.project_id!==project_id) throw new Error('bon '+b.id+' hoort bij een ander project'); if(b.status!=='goedgekeurd') throw new Error('bon van '+b.datum+' is nog niet goedgekeurd'); const w=isoWeek(b.datum); if(w.jaar!==jaar||w.week!==week) throw new Error('bon van '+b.datum+' valt niet in week '+week); }
        const excl=r2(T.regels.filter(r=>ids.includes(r.bon_id)).reduce((s,r)=>s+r.bedrag,0)); const pct=Number(T.instellingen.btw_pct||21); const btw=r2(excl*pct/100);
        const p=T.projecten.find(p=>p.id===project_id); const nummer=String(body.nummer||'').trim()||(T.instellingen.factuur_prefix+String(T.instellingen.factuur_volgnummer).padStart(3,'0'));
        if(T.facturen.some(f=>f.nummer===nummer)) throw new Error('factuurnummer '+nummer+' bestaat al');
        const datum=body.datum||new Date().toISOString().slice(0,10); const v=new Date(datum+'T00:00:00Z'); v.setUTCDate(v.getUTCDate()+Number(T.instellingen.betaaltermijn_dagen||14));
        const f=add('facturen','factuur',{nummer,project_id,jaar,week,datum,vervaldatum:v.toISOString().slice(0,10),omschrijving:p.factuur_omschrijving,regel_omschrijving:'Uitgevoerde werkzaamheden volgens overzicht',bedrag_excl:excl,btw_pct:pct,btw_bedrag:btw,bedrag_incl:r2(excl+btw),status:'concept',aangemaakt_door:wie,created_at:new Date().toISOString()});
        for(const b of bonnen){ b.status='gefactureerd'; b.factuur_id=f.id; }
        const pre=T.instellingen.factuur_prefix; if(nummer.startsWith(pre)){ const n=Number(nummer.slice(pre.length)); if(Number.isInteger(n)&&n>=Number(T.instellingen.factuur_volgnummer)) T.instellingen.factuur_volgnummer=String(n+1); }
        log(); return [200,{ok:true,id:f.id,nummer}];
      }
      case 'factuur_update': { if(!admin) throw new Error('alleen administratie'); const f=T.facturen.find(f=>f.id===id); const upd={...fields}; if('status' in upd&&!['concept','definitief','geexporteerd'].includes(upd.status)) throw new Error('onbekende status'); for(const k of ['datum','vervaldatum']) if(k in upd&&!/^\d{4}-\d{2}-\d{2}$/.test(upd[k]||'')) throw new Error(k+' is geen geldige datum'); if('btw_pct' in upd){ const pct=num(upd.btw_pct,'btw'); upd.btw_pct=pct; upd.btw_bedrag=r2(f.bedrag_excl*pct/100); upd.bedrag_incl=r2(f.bedrag_excl+upd.btw_bedrag); } Object.assign(f,upd); break; }
      case 'factuur_delete': { if(!admin) throw new Error('alleen administratie'); const f=T.facturen.find(f=>f.id===id); if(f.status!=='concept') throw new Error('alleen conceptfacturen kunnen vervallen'); for(const b of T.bonnen) if(b.factuur_id===id){ b.status='goedgekeurd'; b.factuur_id=null; } T.facturen=T.facturen.filter(x=>x.id!==id); break; }
      case 'testdata_wissen': { if(!admin) throw new Error('alleen administratie'); if(String(body.bevestiging||'')!=='WISSEN') throw new Error('bevestiging ontbreekt'); T.facturen=[]; T.bonnen=[]; T.regels=[]; break; }
      default: return [400,{fout:'onbekende actie'}];
    }
    log(); return [200,{ok:true}];
  }catch(e){ return [500,{fout:String(e.message||e)}]; }
}

// Voorbeelddata: week 35 Drietorensweg (KZ-factuur 2026265, 43.856,65 excl.) als afgetekende bonnen.
function seedWeek35(){
  const p=T.projecten.find(p=>p.code==='26692'); const t=n=>T.tarieven.find(t=>t.omschrijving===n);
  const DAGEN=[
   {datum:'2026-08-27', arbeid:[[3,12.5],[4,9]], km:[[2,54]], nachten:7, mat:[['Gebruik bandenhoogwerker',1],['Gebruik platformtrekker incl. brandstof',2],['Gebruik teleshovel incl. brandstof',1],['Gebruik shovel met toebehoren incl. brandstof',2]]},
   {datum:'2026-08-28', arbeid:[[7,12.5]], km:[[2,54]], nachten:7, mat:[['Gebruik bandenhoogwerker',4],['Gebruik platformtrekker incl. brandstof',4],['Gebruik shovel met toebehoren incl. brandstof',3]]},
   {datum:'2026-08-29', arbeid:[[12,12.5]], km:[[1,30],[3,54]], nachten:12, mat:[]},
   {datum:'2026-08-30', arbeid:[[1,10],[14,9.5]], km:[[1,30],[6,54]], nachten:15, mat:[]}];
  const dt=d=>{ const w=new Date(d+'T00:00:00Z').getUTCDay(); return w===0?'Arbeid zondag / feestdag':w===6?'Arbeid zaterdag':'Arbeid'; };
  DAGEN.forEach((d,i)=>{
    const regels=[]; const mk=(tar,aantal,per)=>{ const x=t(tar); regels.push({categorie:x.categorie,omschrijving:x.omschrijving,tarief_id:x.id,aantal,per,prijs:x.prijs,eenheid_n:x.eenheid_n,eenheid_per:x.eenheid_per,eenheid_totaal:x.eenheid_totaal}); };
    for(const [n,u] of d.arbeid) mk(dt(d.datum),n,u); for(const [n,k] of d.km) mk('Kilometervergoeding',n,k); mk('Overnachtingsvergoeding',d.nachten,null); for(const [n,dg] of d.mat) mk(n,dg,null);
    const r=handle({action:'bon_save',wie:'Bas (KZ)',fields:{project_id:p.id,datum:d.datum,ingevuld_door:'Bas (KZ)',afgetekend_door:'Jarno Baas',opmerking:i===0?'Glas veiliggesteld afd. 3 t/m 5':''},regels,indienen:true,log:'Dagbon ingediend (demo)'},CODE_TEAM);
    if(i<2) handle({action:'bon_beoordeel',id:r[1].id,besluit:'goedgekeurd',wie:'Tessa',log:'Dagbon goedgekeurd (demo)'},CODE_ADMIN);
  });
}
if(typeof module!=='undefined') module.exports={T,handle,seedWeek35,CODE_TEAM,CODE_ADMIN};
