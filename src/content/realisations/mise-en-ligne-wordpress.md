---
titre: "Mise en ligne d'un site WordPress"
resume: "Passer un site WordPress développé en local sur un hébergement en ligne : transfert des fichiers, migration de la base de données et configuration."
debut: 2025-12-01
fin:
periode: décembre 2025
cadre: formation
annee: 1
modalite: individuel
competences:
  - presence-en-ligne
  - mise-a-disposition
technologies:
  - WordPress
  - MAMP
  - phpMyAdmin
  - MySQL
  - InfinityFree (hébergement)
productions:
  - titre: Procédure de mise en ligne d'un site WordPress
    fichier: /documents/procedure-wordpress.pdf
    type: procedure
ordre: 4
---

## Contexte et besoin

Travaux pratiques de 1re année à l'AFTEC. Un site WordPress fonctionnait en local sous MAMP ; il fallait le rendre accessible publiquement. Le site lui-même était une maquette : l'objet du TP était sa mise en ligne, pas son contenu.

## Objectifs

- Héberger le site chez un hébergeur gratuit, avec un sous-domaine.
- Migrer les fichiers et la base de données sans perdre de contenu.

## Démarche

1. Créer un compte chez l'hébergeur InfinityFree et choisir un nom de sous-domaine.
2. Téléverser les fichiers WordPress avec le gestionnaire de fichiers de l'hébergeur.
3. Créer la base de données en ligne.
4. Exporter la base locale depuis phpMyAdmin, puis l'importer dans la base en ligne.
5. Modifier `wp-config.php` avec les paramètres de la nouvelle base : nom, utilisateur, mot de passe, hôte.
6. Ouvrir l'adresse publique du site pour vérifier.

## Difficultés et solutions

Ce TP relève plutôt de l'option SLAM, tournée vers le développement : un site, sa base de données et sa configuration PHP, ce n'est pas mon terrain habituel. Je m'en suis sorti en suivant chaque étape pas à pas et en la documentant, ce qui a donné la procédure jointe.

## Résultats et validation

Une fois en ligne, j'ai vérifié que le site s'affichait à son adresse publique et qu'il fonctionnait. Il n'est plus accessible aujourd'hui : l'hébergement gratuit a expiré depuis.

## Bilan

### Ce que j'ai appris

Un aperçu concret du travail de l'option SLAM, et de ce qu'un administrateur doit savoir pour mettre en ligne et maintenir un site : fichiers, base de données et paramètres de connexion entre les deux.
