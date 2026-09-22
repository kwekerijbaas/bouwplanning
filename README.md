# Bouwplanning - reparatieplanning Kwekerij Baas

De hele app is een bestand: `public/planning.html` (en identiek `public/index.html`).
Alle data loopt live via de beveiligde Supabase-API; dit repo bevat geen geheimen en
geen data - alleen de pagina. Deploy: Webflow Cloud, site "bouwplanning", mount path /app.

## Links
- Nu (tijdelijke Webflow-URL):
  - Jarno: https://bouwplanning.webflow.io/app/planning.html#kas2026
  - Testen als Dieter: https://bouwplanning.webflow.io/app/planning.html#kas2026/Dieter
- Na koppeling domein baaskwekerij.nl:
  - Jarno: https://baaskwekerij.nl/app/planning.html#kas2026
  - Testen: https://baaskwekerij.nl/app/planning.html#kas2026/Dieter
- Zonder sleutel achter de link verschijnt het gewone inlogscherm.
- Let op: gebruik het bestandspad /app/planning.html (kaal /app blijft hangen in een
  slash-redirect-lus tussen Webflow-edge en app-runtime).

## Nieuwe versie van de app publiceren
1. Vervang `public/planning.html` en `public/index.html` door de nieuwste
   `Reparatieplanning - Jarno.html` (OneDrive: Hagelschade 2026/bouwplanning).
2. Commit + push naar main -> Webflow Cloud deployt automatisch (ca. 2-3 min).

### Als de pagina blanco blijft
`astro.config.mjs` mag géén `base` of `build.assetsPrefix` zetten: Webflow Cloud vult die
zelf in vanuit het mount path van de environment
([docs](https://developers.webflow.com/webflow-cloud/bring-your-own-app)). Stond hier eerder
`base: '/app'` - dat is eruit. Controleer verder in Webflow > Apps > Webflow Cloud:
- staat de environment op branch `main` en op mount path `/app`?
- staat er onder Deployments een geslaagde deploy ná de laatste push? Zo niet: opnieuw
  deployen (en anders de GitHub-koppeling opnieuw autoriseren).
- de bouw meldt "0 page(s) built" omdat er geen `src/pages` is; dat klopt - de pagina's in
  `public/` worden ongewijzigd naar `dist/` gekopieerd en als statische bestanden geserveerd.

## Werkbonnen (hagelschade-facturatie) - `public/werkbonnen.html`
Eén bestand, zelfde opzet als de planning: alle data via de edge function `werkbonnen`
(Supabase-project hlgvtxcwbhrbbcozvsen). Proces: teamleider vult dagbon in en dient in
-> administratie beoordeelt -> weekoverzicht (opmaak KZ Kasherstel) -> factuur + export
UBL 2.1 XML / CSV / JSON voor Exact Online.

- URL na deploy: https://bouwplanning.webflow.io/app/werkbonnen.html
  - Werkvloer direct ingelogd: `.../werkbonnen.html#bon2026/Naam`
  - Administratie: `.../werkbonnen.html#admin2026/Naam`
- Toegangscodes staan in de edge function (`supabase/functions/werkbonnen/index.ts`),
  overschrijfbaar via secrets `WB_CODE_TEAM` en `WB_CODE_ADMIN`.
- Tabellen: `supabase/migrations/20260911_werkbonnen_basis.sql` (wb_*), stamgegevens
  (tarieven KZ, projecten 26691/26692) via Lijsten in de app aan te passen.
- Lokaal testen zonder Supabase (mock-API met dezelfde regels):
  ```
  cd bouwplanning
  node tools/werkbonnen-mock.js --seed
  ```
  daarna http://localhost:8787/werkbonnen.html?api=http%3A%2F%2Flocalhost%3A8787%2Fapi
  (codes bon2026 / admin2026, `--seed` laadt week 35 Drietorensweg = factuur 2026265).
  Op Windows kan het in een keer: dubbelklik `tools\start-werkbonnen.cmd` in de verkenner -
  die start de mock en opent de browser vanzelf. Vanuit PowerShell moet er `.\` voor, anders
  zoekt PowerShell een module in plaats van het bestand:
  ```
  cd C:\Users\<jij>\Documents\bouwplanning
  .\tools\start-werkbonnen.cmd
  ```
- Tests (drie methodes, vanuit de repo-map):
  ```
  cd bouwplanning
  node tools/werkbonnen-unit.js        # 1. rekenlogica, weekoverzicht, UBL/CSV/JSON (geen browser)
  node tools/werkbonnen-api.js         # 2. API-regels en rechten via HTTP tegen de mock
  node tools/werkbonnen-e2e.js         # 3. browser: werkvloer -> beoordeling -> factuur (vereist npm i playwright)
  node tools/werkbonnen-e2e-extra.js   # 3. browser: mobiel, foto/handtekening, afkeuren, Lijsten, printweergave
  ```
  Bij een afwijkende Chromium: `CHROME=/pad/naar/chrome node tools/werkbonnen-e2e.js`.

### Pilot met KZ Kasherstel en overdracht
Het proces (dagbon -> beoordeling -> weekoverzicht -> factuur) is het proces van de
aannemer. Rollen in de pilot: KZ-teamleiders = werkvloer (code `bon2026`), KZ-kantoor =
administratie (code `admin2026`), Baas tekent de dagbon af op het scherm van de teamleider.
De pilot draait op de Supabase-omgeving van Baas (eigen `wb_`-tabellen, los van de planning).

Overdracht naar een eigen omgeving van KZ (ca. 1 uur):
1. Supabase-project aanmaken (gratis tier volstaat) en `supabase/migrations/20260911_werkbonnen_basis.sql`
   uitvoeren in de SQL-editor; stamgegevens (bedrijven, projecten, tarieven) invoeren via
   Lijsten of overnemen uit de JSON-export (Lijsten > Instellingen > Alles exporteren).
2. Edge function deployen: `supabase functions deploy werkbonnen --no-verify-jwt` vanuit deze
   map; secrets `WB_CODE_TEAM` en `WB_CODE_ADMIN` zetten op eigen codes.
3. `public/werkbonnen.html` hosten waar men wil (elke statische host, ook de eigen website) en
   bovenin de constante `API` aanpassen naar `https://<project>.supabase.co/functions/v1/werkbonnen/api`
   (of tijdelijk `?api=...` achter de URL gebruiken).
4. Testdata uit de pilot wissen via Lijsten > Instellingen > Testdata wissen; de
   JSON-export dient als archief van de pilotperiode.
Er zijn geen licenties of abonnementen nodig; de code is één HTML-bestand plus één function.

### Dagbon: ploegen, namenwolk, voertuigen, projectbon
De teamleider tikt de dag aan op zijn telefoon; de regels van de bon worden daaruit afgeleid.
- **Ploegen (shifts)**: eerst het aantal man, dan start- en eindtijd (kwartieren), pauze automatisch
  (½ uur vanaf 6 uur bruto, anders 0; handmatig te overschrijven), namen kiezen via "+ namen"
  (namenwolk in een schuifpaneel met zoekveld, op alfabet, `wb_medewerker`, voorgevuld met de 77
  namen van de urenbriefjes van week 29, 31 en 34; vier voornamen zonder achternaam staan als
  "te controleren") of een nieuwe naam aanmaken, overnachting ja/nee + aantal man. Op de kaart
  staan alleen de gekozen namen (tik = verwijderen), zodat de dagbon op de telefoon kort blijft. Meer namen aantikken dan het aantal man
  verhoogt het aantal; minder namen = "zonder naam". Meerdere ploegen per dag als niet iedereen
  dezelfde tijden heeft. -> arbeid per ploeg (dagtarief ma-vr / za / zo), overnachting samengeteld.
  Ploegen bewaren medewerker-ids (`leden`), zodat een naamcorrectie overal doorwerkt.
- **Nieuwe namen controleren**: een naam die op de werkvloer wordt aangemaakt krijgt
  `gecontroleerd=false` (bron `werkvloer`, wie) en staat oranje met "?" in de wolk. Dagbon en
  Lijsten › Medewerkers tonen "n nieuwe namen te controleren"; de projectleider (werkvloer of
  kantoor) corrigeert de naam en bevestigt, of voegt hem samen met de juiste bestaande naam
  (actie `medewerker_merge`: ploegen op alle bonnen en de namen op arbeidregels worden omgezet,
  de foute naam vervalt).
- **Voertuigen en materieel** (`wb_voertuig`, Lijsten › Voertuigen): auto's tellen voor de
  km-vergoeding (km per auto, standaard de projectafstand); materieel hangt aan een dagtarief.
  Per voertuig: "al op locatie" of "gebracht" (km), hele dag of dagdeel (¾, ½, ¼). Gebracht
  materieel rekent daarnaast transport per km via het tarief "Transport materieel (gebracht)"
  (standaard 1,50/km, aanname; aanpassen in Lijsten › Tarieven of per project).
- **Extra regels** (transport, materiaal, alles wat niet uit ploegen/voertuigen komt) via de
  bekende regel-editor; tarieven zijn te importeren uit het boekhoudpakket (Lijsten › Tarieven ›
  CSV: `omschrijving;prijs;eenheid[;categorie]`).
- **Onthouden**: een nieuwe bon wordt voorgevuld met de ploegen en voertuigen van de vorige bon
  van hetzelfde project (bij voorkeur van dezelfde teamleider); "alles wissen" maakt hem leeg.
- **Projectbon per dag** (knop 🖨️ Projectbon) in de KZ-opmaak: aantal personen / start / tot /
  eind / namen per ploeg, aantal voertuigen, overige regels, handtekening opdrachtgever.
- **Projectwizard** (Lijsten › Projecten › + Project, of vanaf de dagbon via "projectafspraken";
  ook voor de werkvloer): projectnummer toegewezen (hoogste + 1), gegevens, daarna alle
  tarieven als projectafspraken voorgevuld en aan te passen met − / + in stappen van 0,25
  (`wb_projecttarief`; de bon gebruikt de projectprijs als die er is), afstand naar de locatie.
  Voor de werkvloer telt de wizard 2 stappen (gegevens + controle); de prijsstap is er alleen
  voor de administratie.
- **Afrondingsregels** (app, mock en edge function): mensen, auto's, nachten en stuks hele
  getallen (mensen naar boven); uren en km per 0,5; dagdeel per 0,25; prijzen per 0,25.
- De aangetikte invoer staat als JSON in `wb_bon.invoer`; afgeleide regels hebben `bron`
  `shift` / `voertuig`, handmatige regels `extra`.

### Geen bedragen op de werkvloer
De werkvloer vult alleen in wat er gewerkt, gebruikt en verbleven is; tarieven en bedragen
zijn van de administratie. Dat zit op twee plekken dicht:
- **Server** (`supabase/functions/werkbonnen/index.ts`, en gelijk in de mock): `state` levert
  aan een team-sessie tarieven zonder `prijs`, bonregels zonder `prijs`/`bedrag`, en geen
  facturen en projectafspraken. `bon_save` negeert prijzen die de client meestuurt en leidt ze
  af uit `wb_tarief` / `wb_projecttarief`; `projecttarief_save` is alleen voor de administratie.
  Het uitlezen van een foto geeft de werkvloer eveneens regels zonder prijs terug.
- **App**: alles wat geld toont zit achter `magGeld()` — geen prijsveld of bedrag per regel
  (wel het aantal met eenheid), geen dagtotaal, geen kolommen Prijs/Kosten in het
  weekoverzicht, geen bedragkolom in de bonnenlijst, geen totaal op de projectbon.
De bedragen op het weekoverzicht en de factuur blijven ongewijzigd: de server rekent met
dezelfde prijzen als voorheen.

### Papieren bon fotograferen en uitlezen
Op de dagbon staat "Papieren bon fotograferen en uitlezen": de foto gaat naar de edge function,
die hem met Claude (vision, model `claude-opus-5`) uitleest tegen de tarievenlijst en de regels
alvast klaarzet (gemarkeerd, met zekerheid). De teamleider controleert en dient in; de foto
wordt als bijlage bewaard. Vereist de secret `ANTHROPIC_API_KEY` op de function (Supabase
dashboard > Edge Functions > werkbonnen > Secrets); zonder key geeft de knop een duidelijke
melding. Kosten: enkele centen per foto.

### Huisstijl
Lijsten > Bedrijven: bij de aannemer een logo uploaden (knop "logo…") en de hoofdkleur en
tweede kleur zetten. De app (balk, tabs, knoppen, achtergrond), het weekoverzicht en de factuur
volgen die kleuren en tonen het logo. Standaard voor KZ: groen #3aa35b en magenta #e6007e
(naar kzkasherstel.nl).

Het KZ-woordmerk zit als klein PNG'je (360x126, transparant) in `werkbonnen.html` zelf, dus het
staat er ook zonder upload en zonder internet: op het inlogscherm, in de balk, op de projectbon,
het weekoverzicht en de factuur. Een logo dat je bij een aannemer uploadt gaat er altijd overheen.
Staat het woordmerk er, dan zakt de bedrijfsnaam naar de kleine regel boven het adres — anders
staat de naam er twee keer.

### Leesbaar in een kas
Een kas is licht, de telefoon zit in een handschoen en de teamleider leest niet stil aan een bureau.
Daarom: basisletter 19px (kleine labels minimaal 15px), knoppen 18px, tabelrijen 17px en de tekstkleur
`--grijs` op #40514a (8,4:1 op wit in plaats van 4,7:1). Vulkleuren met witte letters (status-chips,
balk) halen allemaal minstens 4,5:1.

Geen uitlegregels op de dagbon: de koppen en knoppen zeggen zelf wat ze doen ("Wie heeft er
gewerkt?", "Wat is er gebruikt? - tik aan", "+ Ploeg met andere tijden", "+ namen erbij"), in het
handtekeningvak staat "teken hier met je vinger" tot er getekend wordt, en de waarschuwing bij het
uitlezen van een foto verschijnt pas als er iets uitgelezen is. `tools/werkbonnen-e2e-extra.js`
bewaakt dat: een test meet de lettergroottes en het contrast in de browser, een tweede controleert
dat de oude uitlegzinnen niet terugkruipen, en een derde dat er op 360-400px geen horizontale
scroll ontstaat.

Een gekozen huisstijlkleur wordt daar automatisch op bijgesteld: `leesbaar()` verdonkert de kleur
stapje voor stapje tot witte letters erop minstens 4,6:1 halen (KZ-groen #3aa35b wordt zo #2e7f47).
De kleur blijft herkenbaar, maar niemand houdt een onleesbare balk over door een te lichte keuze.
