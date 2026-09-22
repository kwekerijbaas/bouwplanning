import { defineConfig } from 'astro/config';

// Statische site: de apps staan als kant-en-klare bestanden in public/ en worden
// ongewijzigd naar dist/ gekopieerd. Webflow Cloud zet zelf het mount path
// (base / build.assetsPrefix) bij het bouwen — die hoort hier dus niet te staan.
// https://developers.webflow.com/webflow-cloud/bring-your-own-app
export default defineConfig({
  trailingSlash: 'ignore',
});
