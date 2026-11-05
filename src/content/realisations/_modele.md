---
# Copier ce fichier, le renommer (ex. : sauvegarde-veeam.md : ce nom devient l'URL), puis remplir.
titre: "Intitulé court de la réalisation"
resume: "Une ou deux phrases (170 caractères max), reprises dans l'index et dans la description pour les moteurs de recherche."
debut: 2026-09-01        # AAAA-MM-JJ, ou laisser vide
fin: 2026-10-15          # laisser vide si la réalisation est en cours
cadre: alternance        # formation | stage | alternance
annee: 2                 # 1 ou 2
organisation: dsn-ille-et-vilaine   # obligatoire pour stage et alternance (nom du fichier dans src/content/contextes)
modalite: individuel     # individuel | equipe
# tailleEquipe: 3        # si modalite: equipe
competences:             # patrimoine | incidents | presence-en-ligne | projet | mise-a-disposition | developpement-pro
  - patrimoine
technologies:
  - Outil 1
productions:             # PDF déposés dans public/documents/
  - titre: Procédure de …
    fichier: /documents/exemple.pdf
    type: procedure      # procedure | compte-rendu | schema | rapport | autre
ordre: 0                 # pour départager deux réalisations de même date
brouillon: false         # true = la fiche n'est pas publiée
---

## Contexte et besoin

## Objectifs

## Démarche

1. Première étape.
2. Deuxième étape.

## Difficultés et solutions

## Résultats et validation

## Mon rôle

<!-- Obligatoire si modalite: equipe (le build échoue sinon). À supprimer pour un travail individuel. -->

## Bilan

### Ce que j'ai appris

### Ce que je ferais autrement
