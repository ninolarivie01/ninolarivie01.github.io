// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { surlignerACompleter } from './src/lib/surligner-a-completer.mjs';

// Le site est servi à la racine de ninolarivie01.github.io.
// Pour un nom de domaine personnel : changer `site` et ajouter public/CNAME (voir README).
export default defineConfig({
  site: 'https://ninolarivie01.github.io',
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [sitemap({ filter: (page) => !page.includes('/404') }), surlignerACompleter()],
});
