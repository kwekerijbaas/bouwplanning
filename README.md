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
