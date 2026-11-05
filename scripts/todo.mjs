// Recense toutes les informations manquantes du site dans TODO-CONTENU.md.
// Usage : npm run todo
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const RACINE = fileURLToPath(new URL('..', import.meta.url));
const SRC = join(RACINE, 'src');
const EXTENSIONS = ['.md', '.astro', '.yaml', '.ts'];
const MARQUEUR = /\[À COMPLÉTER(?:\s*:\s*([^\]]*))?\]/g;
const COMPOSANT = /<ACompleter>([\s\S]*?)<\/ACompleter>/g;

async function* fichiers(dossier) {
  for (const e of await readdir(dossier, { withFileTypes: true })) {
    const chemin = join(dossier, e.name);
    if (e.isDirectory()) yield* fichiers(chemin);
    else if (EXTENSIONS.some((x) => e.name.endsWith(x)) && !e.name.startsWith('_')) yield chemin;
  }
}

const ligneDe = (texte, index) => texte.slice(0, index).split('\n').length;
const nettoyer = (s) => s.replace(/\{[^}]*\}/g, '…').replace(/\s+/g, ' ').trim();

const parFichier = new Map();
const ajouter = (fichier, ligne, texte) => {
  const cle = relative(RACINE, fichier).split(sep).join('/');
  if (!parFichier.has(cle)) parFichier.set(cle, []);
  parFichier.get(cle).push({ ligne, texte });
};

// Gabarits : leurs marqueurs dépendent des données et sont vérifiés plus bas, fiche par fiche.
const GABARITS = [join('src', 'components'), join('src', 'pages', 'realisations', '[id].astro')];
// Documents attendus par les pages, proposés au téléchargement dès qu'ils sont déposés
const DOCUMENTS = {
  '/documents/tableau-de-synthese-e5.xlsx': 'tableau de synthèse officiel rempli (.xlsx)',
  '/documents/cv-nino-lariviere-gillet.pdf': 'CV en PDF',
};

for await (const f of fichiers(SRC)) {
  if (GABARITS.some((g) => relative(RACINE, f).startsWith(g))) continue;
  const texte = await readFile(f, 'utf8');
  for (const m of texte.matchAll(MARQUEUR)) {
    // Marqueur sans précision : on indique la section Markdown où il se trouve
    const section = [...texte.slice(0, m.index).matchAll(/^#{2,3} (.+)$/gm)].pop()?.[1];
    ajouter(f, ligneDe(texte, m.index), m[1] ? nettoyer(m[1]) : `rédiger la section « ${section ?? '?'} »`);
  }
  for (const m of texte.matchAll(COMPOSANT)) {
    if (m[1].includes('public{')) continue; // document conditionnel, vérifié avec DOCUMENTS
    ajouter(f, ligneDe(texte, m.index), nettoyer(m[1]));
  }

  if (f.includes(`${sep}realisations${sep}`) && f.endsWith('.md')) {
    const fm = texte.split('---')[1] ?? '';
    const debut = fm.match(/^debut:\s*(.*)$/m);
    if (!debut || !debut[1].trim()) ajouter(f, ligneDe(texte, texte.indexOf('debut:')), 'date de début (frontmatter « debut: AAAA-MM-JJ »)');
    for (const m of fm.matchAll(/fichier:\s*(\S+)/g)) {
      if (!existsSync(join(RACINE, 'public', m[1]))) ajouter(f, ligneDe(texte, texte.indexOf(m[0])), `fichier manquant : public${m[1]}`);
    }
  }
}

for (const [chemin, libelle] of Object.entries(DOCUMENTS)) {
  if (!existsSync(join(RACINE, 'public', chemin))) ajouter(join(RACINE, 'public', 'documents'), 0, `${libelle} : déposer public${chemin}`);
}

const total = [...parFichier.values()].reduce((n, l) => n + l.length, 0);
const date = new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
let sortie = `# Contenus à compléter\n\nFichier généré par \`npm run todo\` le ${date} : ne pas modifier à la main.\n\n**${total} information(s) manquante(s)** dans ${parFichier.size} fichier(s). Objectif avant l'oral : zéro.\n`;
for (const [fichier, items] of [...parFichier].sort()) {
  sortie += `\n## ${fichier}\n\n`;
  for (const { ligne, texte } of items.sort((a, b) => a.ligne - b.ligne)) sortie += ligne ? `- [ ] ligne ${ligne} : ${texte}\n` : `- [ ] ${texte}\n`;
}
await writeFile(join(RACINE, 'TODO-CONTENU.md'), sortie);
console.log(`TODO-CONTENU.md : ${total} information(s) manquante(s).`);
