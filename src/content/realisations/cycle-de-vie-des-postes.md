---
titre: "Cycle de vie des postes de travail"
resume: "Remasteriser des postes d'occasion sous Windows 11 par PXE, les chiffrer avec BitLocker, puis tenir leur suivi à jour dans Active Directory, MECM et EasyVista."
debut: 2026-09-01
fin:
periode: depuis septembre 2026
cadre: alternance
annee: 2
organisation: dsn-ille-et-vilaine
modalite: individuel
competences:
  - patrimoine
  - mise-a-disposition
technologies:
  - Windows 11
  - PXE
  - BitLocker
  - MECM
  - Active Directory
  - EasyVista
productions: []
ordre: 1
---

## Contexte et besoin

Au centre de service de la DSN, je remasterise des postes d'occasion avant leur remise en service, depuis le début de mon alternance en septembre 2026. Le Département réemploie ses postes d'abord par économie, et aussi parce que les agents changent de poste en interne, avec d'autres besoins.

## Objectifs

Remettre en service un poste propre, au standard du Département, et garder des outils de suivi exacts.

## Démarche

1. **Retrait des anciennes traces** : je supprime à la main l'objet ordinateur dans Active Directory et dans MECM.
2. **Masterisation** : démarrage du poste en PXE et application du master Windows 11. À cette étape, le poste se réinscrit automatiquement dans Active Directory et dans MECM.
3. **Chiffrement** : activation de BitLocker.
4. **Suivi** : dans EasyVista, je mets à jour l'état du poste et son attribution.
5. **Remise** : le poste est remis à son utilisateur, soit par l'équipe, soit par un prestataire qui travaille avec nous.

## Résultats et validation

Chaque poste remis est chiffré, et son attribution est à jour dans EasyVista.

## Bilan

### Ce que j'ai appris

Suivre une procédure à la lettre : c'est ce qui garantit que tous les postes sortent identiques, quel que soit le technicien qui les prépare.
