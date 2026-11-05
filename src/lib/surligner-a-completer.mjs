// Intégration Astro : après le build, entoure chaque « [À COMPLÉTER : …] » du corps des pages
// d'un <mark class="a-completer"> pour qu'il saute aux yeux, quelle que soit son origine
// (Markdown, frontmatter, données YAML). Aucune dépendance : simple traitement du HTML généré.
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const MOTIF = /\[À COMPLÉTER\s*:[^\]<]*\]/g;
const DEJA = '<mark class="a-completer">';

async function* fichiersHtml(dossier) {
  for (const entree of await readdir(dossier, { withFileTypes: true })) {
    const chemin = join(dossier, entree.name);
    if (entree.isDirectory()) yield* fichiersHtml(chemin);
    else if (entree.name.endsWith('.html')) yield chemin;
  }
}

function surligner(html) {
  const debutCorps = html.indexOf('<body');
  if (debutCorps === -1) return html;
  const tete = html.slice(0, debutCorps);
  const corps = html.slice(debutCorps).replace(MOTIF, (m, index, texte) => {
    const avant = texte.slice(0, index);
    if (avant.endsWith(DEJA)) return m; // déjà balisé par le composant ACompleter
    if (avant.lastIndexOf('<') > avant.lastIndexOf('>')) return m; // à l'intérieur d'une balise (attribut)
    return `${DEJA}${m}</mark>`;
  });
  return tete + corps;
}

export function surlignerACompleter() {
  return {
    name: 'surligner-a-completer',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        let total = 0;
        for await (const fichier of fichiersHtml(fileURLToPath(dir))) {
          const html = await readFile(fichier, 'utf8');
          const nouveau = surligner(html);
          if (nouveau !== html) {
            await writeFile(fichier, nouveau);
            total++;
          }
        }
        logger.info(`Marqueurs « À COMPLÉTER » surlignés dans ${total} page(s).`);
      },
    },
  };
}
