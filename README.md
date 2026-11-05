# Portfolio BTS SIO SISR, Nino Larivière-Gillet

Support de l'épreuve E5 (session 2027). Site statique construit avec [Astro](https://astro.build), publié sur GitHub Pages : <https://ninolarivie01.github.io/>.

Aucun cookie, aucun traceur, aucune ressource externe. Le seul JavaScript sert au filtre des réalisations, à l'affichage de l'adresse électronique et au bouton d'impression ; le site reste utilisable sans.

## Travailler en local

```sh
npm install        # une seule fois
npm run dev        # aperçu sur http://localhost:4321, rechargé à chaque modification
npm run build      # construit le site final dans dist/
npm run preview    # sert dist/ pour vérifier le build
npm run todo       # met à jour TODO-CONTENU.md (informations manquantes)
```

## Ajouter une réalisation

1. Copier `src/content/realisations/_modele.md` et le renommer, par exemple `sauvegarde-veeam.md`. Le nom du fichier devient l'adresse de la fiche : `/realisations/sauvegarde-veeam/`.
2. Remplir l'en-tête (entre les deux `---`). Les champs sont commentés dans le modèle. Les plus importants :
   - `cadre` (`formation`, `stage` ou `alternance`) et `annee` (`1` ou `2`) : placent la réalisation dans le bon groupe du tableau de synthèse ;
   - `competences` : la liste des compétences du bloc 1 mobilisées (`patrimoine`, `incidents`, `presence-en-ligne`, `projet`, `mise-a-disposition`, `developpement-pro`) ;
   - `organisation` : obligatoire pour un stage ou une alternance (`pole-saint-helier` ou `dsn-ille-et-vilaine`).
3. Rédiger le corps en gardant les titres du modèle. Pour un travail d'équipe (`modalite: equipe`), la section `## Mon rôle` est obligatoire : le build échoue sans elle.
4. Déposer les PDF dans `public/documents/` et les déclarer dans `productions`. Un fichier déclaré mais absent s'affiche comme « à compléter ». Vérifier avant qu'aucun mot de passe, nom de personne ou mention « confidentiel » n'y figure.
   Générer ensuite la miniature de première page : `python scripts/miniatures.py` (prérequis, une fois : `python -m pip install pymupdf`). Sans miniature, le document s'affiche avec une vignette « PDF ».
5. `npm run dev` pour vérifier, puis commit et push : le site se met à jour tout seul en 1 à 2 minutes.

Le tableau de synthèse, la matrice de l'accueil, la page Compétences et le plan du site se mettent à jour automatiquement : il n'y a rien d'autre à modifier.

Une information pas encore connue s'écrit `[À COMPLÉTER : ce qui manque]`. Elle apparaît surlignée sur le site et dans `TODO-CONTENU.md` après `npm run todo`. Objectif avant l'oral : zéro.

## Ajouter un article de veille

Copier `src/content/veille/_modele.md`, le renommer (par exemple `2026-12-nis2-calendrier.md`), remplir le titre, la date, le résumé et au moins une source, écrire la synthèse, passer `brouillon: false`, puis commit et push.

## Autres contenus

| Contenu | Fichier |
|---|---|
| Pages des organisations | `src/content/contextes/*.md` |
| Certifications | `src/data/certifications.yaml` |
| Identité, e-mail, LinkedIn | `src/data/profil.ts` |
| Intitulés des 6 compétences | `src/data/competences.ts` |
| Tableau officiel (.xlsx) | `public/documents/tableau-de-synthese-e5.xlsx` |
| CV en PDF | `public/documents/cv-nino-lariviere-gillet.pdf` |
| Couleurs et typographie | `src/styles/global.css` (variables en haut du fichier) |

## Comment c'est construit

- `src/content.config.ts` décrit le format de chaque contenu avec Zod : un champ manquant ou mal orthographié fait échouer le build avec un message clair, au lieu de produire une page fausse.
- `src/components/Matrice.astro` lit toutes les réalisations et construit le tableau réalisations × compétences. C'est pour cela que le tableau de synthèse ne peut pas être désynchronisé des fiches.
- `src/pages/realisations/[id].astro` génère une page par fichier Markdown et vérifie la présence de « Mon rôle » pour les travaux d'équipe.
- `src/lib/surligner-a-completer.mjs` surligne les marqueurs `[À COMPLÉTER]` dans le HTML final ; `scripts/todo.mjs` les recense.
- `.github/workflows/deploy.yml` construit et publie le site à chaque push sur `main`.

## Nom de domaine personnel (facultatif)

1. Acheter le domaine, puis créer chez le registraire un enregistrement `CNAME` de `www` vers `ninolarivie01.github.io` (et les enregistrements `A` indiqués dans la documentation GitHub Pages pour le domaine nu).
2. Créer `public/CNAME` contenant uniquement le domaine, par exemple `www.exemple.fr`.
3. Remplacer `site` dans `astro.config.mjs` et l'URL du sitemap dans `public/robots.txt`.
4. Dans les réglages du dépôt, Pages, renseigner le domaine et cocher « Enforce HTTPS ».

Attention : une fois le domaine configuré, `ninolarivie01.github.io` redirige vers lui. Si le domaine expire ou si sa configuration DNS casse, le site devient inaccessible. Pour revenir à l'adresse GitHub, supprimer `public/CNAME`, remettre l'ancienne valeur de `site`, retirer le domaine dans les réglages Pages et pousser.
