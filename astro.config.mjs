import { defineConfig } from 'astro/config';

// Statische site: de app staat als kant-en-klaar bestand in public/index.html.
// base moet gelijk zijn aan het Webflow Cloud mount path.
export default defineConfig({
  base: '/app',
  trailingSlash: 'ignore',
});
