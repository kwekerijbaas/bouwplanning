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
- End-to-end test (Playwright): `node tools/werkbonnen-e2e.js` (vereist `npm i playwright`).
