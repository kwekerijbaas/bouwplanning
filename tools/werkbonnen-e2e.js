// End-to-end test (Playwright) van de werkbonnen-app tegen de mock-API. Start: node tools/werkbonnen-e2e.js
const { chromium } = require('playwright');
const { spawn } = require('child_process');
const PORT=18000+Math.floor(Math.random()*2000);
const srv=spawn(process.execPath,[require('path').join(__dirname,'werkbonnen-mock.js')],{stdio:'ignore',env:{...process.env,WB_PORT:String(PORT)}}); process.on('exit',()=>{ try{ srv.kill(); }catch(e){} });
const API='http://localhost:'+PORT+'/api', BASE='http://localhost:'+PORT+'/werkbonnen.html?api='+encodeURIComponent(API);
async function wachtOpMock(){ for(let i=0;i<50;i++){ try{ const r=await fetch(API,{method:'POST',headers:{'Content-Type':'application/json','x-code':'admin2026'},body:'{"action":"state"}'}); const j=await r.json(); if(j.bonnen&&j.bonnen.length===0&&j.facturen.length===0) return; throw new Error('mock op poort '+PORT+' heeft al data - test gestopt'); }catch(e){ if(/al data/.test(e.message)) { console.log('FOUT: '+e.message); process.exit(1); } await new Promise(r=>setTimeout(r,200)); } } console.log('FOUT: mock-API start niet (poort '+PORT+')'); process.exit(1); }


// Week 35 Drietorensweg (factuur 2026265) volgens KZ-overzicht: per dag arbeid/km/nachten; materieel/diversen los.
const DAGEN=[
 {datum:'2026-08-27', arbeid:[[3,12.5],[4,9]], km:[[2,54]], voertuigen:['Bus 1','Bus 2'], namen:['Nick Mesken','Mario Grundza','Robert Botos'], nachten:7, materieel:[['Gebruik bandenhoogwerker',1],['Gebruik platformtrekker incl. brandstof',2],['Gebruik teleshovel incl. brandstof',1],['Gebruik shovel met toebehoren incl. brandstof',2]]},
 {datum:'2026-08-28', arbeid:[[7,12.5]], km:[[2,54]], nachten:7, materieel:[['Gebruik bandenhoogwerker',4],['Gebruik platformtrekker incl. brandstof',4],['Gebruik shovel met toebehoren incl. brandstof',3]]},
 {datum:'2026-08-29', arbeid:[[12,12.5]], km:[[1,30],[3,54]], nachten:12, materieel:[]},
 {datum:'2026-08-30', arbeid:[[1,10],[14,9.5]], km:[[1,30],[6,54]], nachten:15, materieel:[]},
];
const VERWACHT=43856.65;
(async()=>{
   await wachtOpMock();
  setTimeout(()=>{console.log('GLOBAL TIMEOUT');process.exit(2)},150000); const br=await chromium.launch(process.env.CHROME?{executablePath:process.env.CHROME}:{}); const ctx=await br.newContext({viewport:{width:1100,height:1400}}); const pg=await ctx.newPage();
  pg.on('pageerror',e=>console.log('PAGEERROR',e.message)); pg.on('dialog',d=>d.accept());
  const fouten=[];
  try{
    // --- teamleider ---
    await pg.goto(BASE); await pg.fill('#lg-wie','Bas (KZ)'); await pg.fill('#lg-code','bon2026'); await pg.click('#lg-ok'); await pg.waitForSelector('#tabs button.actief');
    // Ploegen: start 06:00, eind = 06:00 + uren + pauze (auto: 0,5 uur vanaf 6 uur bruto). Namen op de eerste ploeg van dag 1, rest als "extra man".
    const tijd=m=>String(Math.floor(m/60)).padStart(2,'0')+':'+String(m%60).padStart(2,'0'); const eindVoor=u=>tijd(6*60+Math.round((u+(u+0.5>=6?0.5:0))*60));
    for(const d of DAGEN){
      await pg.click('#b-nieuw'); await pg.selectOption('#b-project', await pg.$eval('#b-project', s=>[...s.options].find(o=>/Drietorensweg/.test(o.textContent)).value)); await pg.fill('#b-datum',d.datum); await pg.dispatchEvent('#b-datum','change');
      if(await pg.$('#b-wis')) await pg.click('#b-wis');   // voorinvulling van de vorige dag wissen: elke dag anders
      for(let i=0;i<d.arbeid.length;i++){ if(i>0) await pg.click('#b-shift'); const [n,u]=d.arbeid[i]; const sh='[data-sh="'+i+'"]';
        await pg.selectOption(sh+'[data-sf="start"]','06:00'); await pg.selectOption(sh+'[data-sf="eind"]',eindVoor(u));
        if(i===0&&d.namen){ for(const nm of d.namen){ await pg.click('[data-shift="'+i+'"] button[data-lid]:has-text("'+nm+'")'); } }
        await pg.fill(sh+'[data-sf="aantal_man"]',String(n)); await pg.dispatchEvent(sh+'[data-sf="aantal_man"]','change');
        await pg.check(sh+'[data-sf="overnachting"]'); await pg.waitForSelector(sh+'[data-sf="nachten"]');
        const uren=await pg.textContent('[data-uren="'+i+'"]'); if(Number(uren.replace(',','.'))!==u) fouten.push(d.datum+' ploeg '+(i+1)+' uren '+uren+' != '+u);
      }
      // km: dag 1 via voertuigen (Bus 1 + Bus 2 gebracht, 54 km uit het project), andere dagen als extra regels
      if(d.voertuigen){ for(const nm of d.voertuigen) await pg.click('button[data-vt]:has-text("'+nm+'")'); }
      else for(const [n,km] of d.km){ await pg.click('[data-add="km"]'); const rows=await pg.$$('.bonregel:not(.vast)'); const row=rows[rows.length-1]; await (await row.$('input[data-f="aantal"]')).fill(String(n)); await (await row.$('input[data-f="per"]')).fill(String(km)); }
      for(const [naam,dagen] of d.materieel){ await pg.click('[data-add="materieel"]'); const rows=await pg.$$('.bonregel:not(.vast)'); const row=rows[rows.length-1]; await (await row.$('select[data-f="tarief"]')).selectOption(await (await row.$('select[data-f="tarief"]')).evaluate((s,naam)=>[...s.options].find(o=>o.textContent.split(' — ')[0]===naam).value, naam)); const rows2=await pg.$$('.bonregel:not(.vast)'); const r2=rows2[rows2.length-1]; await (await r2.$('input[data-f="aantal"]')).fill(String(dagen)); }
      await pg.fill('#b-aft','Jarno Baas');
      // handtekening tekenen
      const c=await pg.$('#b-sig'); const bb=await c.boundingBox(); await pg.mouse.move(bb.x+20,bb.y+60); await pg.mouse.down(); await pg.mouse.move(bb.x+150,bb.y+90); await pg.mouse.move(bb.x+250,bb.y+40); await pg.mouse.up();
      const tot=await pg.textContent('#b-totaal'); console.log(d.datum,'dagtotaal',tot);
      await pg.click('#b-indienen'); await pg.waitForSelector('.chip.st-ingediend',{timeout:5000});
      if(d.voertuigen){ await pg.click('#b-print'); await pg.waitForSelector('#pb-print'); const pb=await pg.textContent('.doc'); if(!/Aantalvoertuigen:2/.test(pb.replace(/\s+/g,''))||!/Nick Mesken/.test(pb)) fouten.push('projectbon onvolledig'); await pg.screenshot({path:'/tmp/wb-test-00-projectbon.png',fullPage:true}); await pg.click('#pb-terug'); await pg.waitForSelector('#b-nieuw'); }
    }
    await pg.screenshot({path:'/tmp/wb-test-01-bon-team.png',fullPage:true});
    await pg.click('[data-tab="bonnen"]'); await pg.waitForSelector('#l-status'); await pg.screenshot({path:'/tmp/wb-test-02-bonnen-team.png',fullPage:true});
    // teamleider mag ingediende bon niet wijzigen
    await pg.click('tr[data-bon]'); const disabled=await pg.$('#b-datum[disabled]'); if(!disabled) fouten.push('teamleider kan ingediende bon nog bewerken');
    // --- administratie ---
    await pg.click('#tb-wie'); await pg.fill('#lg-wie','Tessa'); await pg.fill('#lg-code','admin2026'); await pg.click('#lg-ok'); await pg.waitForSelector('[data-tab="facturen"]');
    await pg.click('[data-tab="bonnen"]'); await pg.waitForSelector('#l-status'); const bol=await pg.textContent('#tabs .bol').catch(()=>''); if(bol!=='4') fouten.push('badge te beoordelen != 4: '+bol);
    // eerste afkeuren en weer laten indienen, rest goedkeuren
    const eerste=await pg.getAttribute('tr[data-bon]','data-bon');
    await pg.click('[data-af="'+eerste+'"]'); await pg.fill('#sh-txt','Km klopt niet'); await pg.click('#sh-ok'); await pg.waitForSelector('.chip.st-afgekeurd');
    await pg.click('tr[data-bon="'+eerste+'"]'); const w=await pg.textContent('.waarsch'); if(!/Km klopt niet/.test(w)) fouten.push('afkeurreden niet zichtbaar');
    await pg.screenshot({path:'/tmp/wb-test-03-bon-afgekeurd.png',fullPage:true});
    await pg.click('#b-indienen'); await pg.waitForSelector('.chip.st-ingediend');
    await pg.click('[data-tab="bonnen"]'); await pg.waitForSelector('#l-status'); while(await pg.$('[data-goed]')){ await pg.click('[data-goed]'); await pg.waitForTimeout(250); }
    await pg.waitForFunction(()=>document.querySelectorAll('.chip.st-goedgekeurd').length===4);
    await pg.screenshot({path:'/tmp/wb-test-04-bonnen-goedgekeurd.png',fullPage:true});
    // weekoverzicht
    await pg.click('[data-tab="overzicht"]'); await pg.waitForSelector('#o-project'); await pg.selectOption('#o-project', await pg.$eval('#o-project', s=>[...s.options].find(o=>/Drietorensweg/.test(o.textContent)).value)); await pg.selectOption('#o-week', await pg.$eval('#o-week', s=>[...s.options].find(o=>/week 35/.test(o.textContent)).value));
    const totTxt=await pg.textContent('.doc tr.tot td.r'); console.log('overzicht totaal',totTxt);
    const tot=Number(totTxt.replace(/\./g,'').replace(',','.').replace(' €',''));
    if(Math.abs(tot-VERWACHT)>0.005) fouten.push('overzicht totaal '+tot+' != '+VERWACHT);
    await pg.screenshot({path:'/tmp/wb-test-05-weekoverzicht.png',fullPage:true});
    // factuur
    await pg.click('#o-factuur'); await pg.waitForSelector('#f-maak'); const nr=await pg.inputValue('#f-nummer'); console.log('voorgesteld nummer',nr); if(nr!=='2026266') fouten.push('volgnummer '+nr);
    await pg.fill('#f-nummer','2026265'); await pg.fill('#f-datum','2026-09-05'); await pg.click('#f-maak'); await pg.waitForSelector('#fv-ubl');
    const incl=await pg.textContent('.doc tr.tot td.r'); console.log('factuur incl',incl); if(incl!=='53.066,55 €') fouten.push('incl '+incl);
    const verval=await pg.textContent('.doc .fmeta'); if(!/19-09-2026/.test(verval)) fouten.push('vervaldatum: '+verval);
    await pg.screenshot({path:'/tmp/wb-test-06-factuur.png',fullPage:true});
    await pg.click('#fv-ubl'); const xml=await pg.textContent('#fv-xml'); require('fs').writeFileSync('/tmp/wb-test-factuur-2026265.xml',xml);
    if(!/<cbc:PayableAmount currencyID="EUR">53066.55</.test(xml)) fouten.push('UBL payable'); if(!/<cbc:TaxAmount currencyID="EUR">9209.90</.test(xml)) fouten.push('UBL btw');
    await pg.click('#fv-csv'); require('fs').writeFileSync('/tmp/wb-test-factuur-2026265.csv',await pg.textContent('#fv-xml'));
    await pg.click('#fv-json'); require('fs').writeFileSync('/tmp/wb-test-factuur-2026265.json',await pg.textContent('#fv-xml'));
    await pg.click('#fv-def'); await pg.waitForSelector('.chip.st-definitief');
    // Lijsten
    await pg.click('[data-tab="lijsten"]'); await pg.waitForSelector('[data-lt]'); await pg.screenshot({path:'/tmp/wb-test-07-lijsten.png',fullPage:true});
    await pg.click('#t-nieuw'); await pg.fill('[data-k="omschrijving"]','Gebruik kraan'); await pg.fill('[data-k="prijs"]','400'); await pg.click('#fs-ok'); await pg.waitForFunction(()=>document.body.textContent.includes('Gebruik kraan'));
    // mobiel
    const m=await br.newContext({viewport:{width:400,height:850},isMobile:true,hasTouch:true}); const mp=await m.newPage(); await mp.goto(BASE+'#bon2026/Piet'); await mp.waitForSelector('#b-project'); await mp.screenshot({path:'/tmp/wb-test-08-mobiel-bon.png',fullPage:true});
    const overflow=await mp.evaluate(()=>document.documentElement.scrollWidth>document.documentElement.clientWidth+1); if(overflow) fouten.push('horizontale scroll op mobiel');
  }catch(e){ fouten.push('EXCEPTIE '+e.message); await pg.screenshot({path:'/tmp/wb-test-err.png',fullPage:true}).catch(()=>{}); }
  console.log(fouten.length?('FOUTEN:\n'+fouten.join('\n')):'ALLES OK');
  await br.close().catch(()=>{}); srv.kill(); process.exit(fouten.length?1:0);
})();
