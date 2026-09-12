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
