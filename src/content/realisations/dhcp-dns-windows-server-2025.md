---
titre: "Services DHCP et DNS sous Windows Server 2025"
resume: "Installer et configurer les rôles DHCP et DNS sur un serveur Windows Server 2025 cloné depuis une template Sysprep, puis valider depuis un poste client."
debut: 2026-02-01
fin:
periode: février 2026
cadre: formation
annee: 1
modalite: individuel
competences:
  - patrimoine
  - mise-a-disposition
technologies:
  - Windows Server 2025
  - DHCP
  - DNS
  - Sysprep
  - VMware Workstation 17
productions:
  - titre: Documentation technique, DHCP et DNS sous Windows Server 2025
    fichier: /documents/doc-ws2025-dhcp-dns.pdf
    type: procedure
ordre: 2
---

## Contexte et besoin

Travaux pratiques de 1re année à l'AFTEC. Dans un réseau local, deux services sont indispensables aux postes de travail : le DHCP, qui attribue automatiquement les adresses IP, et le DNS, qui traduit les noms en adresses.

## Objectifs

- Distribuer automatiquement des adresses IP aux postes d'un réseau isolé, avec un bail de 6 jours.
- Résoudre un nom de domaine interne vers l'adresse du serveur.
- Rédiger une procédure reproductible.

## Démarche

1. Cloner le serveur depuis une template Sysprep, puis le renommer.
2. Lui donner une adresse IP statique et le faire pointer sur lui-même pour le DNS.
3. Ajouter les rôles DHCP et DNS depuis le Gestionnaire de serveur.
4. Créer l'étendue DHCP de 151 adresses et régler la durée de bail.
5. Créer la zone de recherche directe et un enregistrement hôte (A) pour le serveur.
6. Placer serveur et client sur un même segment réseau VMware isolé pour les tests.

## Résultats et validation

- Le client reçoit une adresse dans la plage prévue, sans adresse automatique de secours (APIPA).
- Le nom interne du serveur répond au `ping` depuis le client : la résolution DNS fonctionne.

## Bilan

### Ce que j'ai appris

- Le rôle de chacun des deux services : le DHCP donne au poste son adresse, sa passerelle et l'adresse du serveur DNS ; le DNS lui permet ensuite de joindre les machines par leur nom.
- Un serveur qui porte ces services doit avoir une adresse IP fixe : c'est lui que les postes doivent toujours retrouver.
- Une template généralisée par Sysprep permet de créer rapidement un nouveau serveur, à condition de le renommer ensuite.
