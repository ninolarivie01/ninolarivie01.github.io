---
titre: "Gestion du parc informatique sous GLPI"
resume: "Tenir à jour l'inventaire du parc du Pôle Saint-Hélier dans GLPI en enregistrant les entrées et les sorties de postes."
debut: 2026-06-22
fin: 2026-07-24
cadre: stage
annee: 1
organisation: pole-saint-helier
modalite: individuel
competences:
  - patrimoine
technologies:
  - GLPI
productions: []
ordre: 2
---

## Contexte et besoin

Un inventaire à jour permet de savoir quel matériel est en service, où, et pour qui. Pendant mon stage, des postes ont été remplacés dans plusieurs salles : j'ai enregistré dans GLPI les postes qui entraient dans le parc et retiré ceux qui en sortaient.

## Objectifs

Que l'inventaire GLPI suive les remplacements de postes : chaque nouveau poste ajouté, chaque poste retiré supprimé.

## Démarche

1. **Entrée d'un poste** : création de la fiche dans GLPI avec les informations de base du poste.
2. **Affectation** : rattachement du poste à son utilisateur, et par lui au service de cet utilisateur.
3. **Sortie d'un poste** : suppression de la fiche dans GLPI. La mémoire vive était récupérée, le disque retiré et formaté, puis le poste mis au rebut.
