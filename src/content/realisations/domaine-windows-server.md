---
titre: "Domaine Windows Server et poste client Windows 11"
resume: "Monter un domaine Active Directory avec DNS, DHCP, partage de fichiers et GPO, puis y intégrer un poste Windows 11, en environnement virtualisé."
debut: 2026-01-01
fin:
periode: janvier 2026
cadre: formation
annee: 1
modalite: individuel
competences:
  - patrimoine
  - mise-a-disposition
technologies:
  - Windows Server
  - Active Directory (AD DS)
  - DNS
  - DHCP
  - Stratégies de groupe (GPO)
  - Droits NTFS
  - Windows 11
  - VMware Workstation Pro
productions:
  - titre: Documentation, mise en place d'un serveur Windows Server
    fichier: /documents/doc-windows-server-ad.pdf
    type: procedure
  - titre: Guide d'installation de Windows 11
    fichier: /documents/doc-windows-11.pdf
    type: procedure
ordre: 1
---

## Contexte et besoin

Travaux pratiques de 1re année à l'AFTEC. Le besoin simulé : une petite structure veut centraliser l'authentification de ses utilisateurs, attribuer automatiquement les paramètres réseau à ses postes et appliquer les mêmes réglages à tout le monde.

## Objectifs

- Installer un serveur Windows Server portant les rôles AD DS, DNS et DHCP.
- Intégrer un poste client Windows 11 au domaine.
- Organiser les comptes en unités d'organisation et en groupes de sécurité.
- Mettre à disposition un dossier partagé, mappé automatiquement par GPO.

## Démarche

1. Créer deux machines virtuelles sous VMware Workstation Pro, un serveur et un client, sur un réseau LAN isolé.
2. Installer Windows 11 sur le client, en suivant une procédure que j'ai documentée séparément.
3. Donner au serveur une adresse IP statique et le renommer.
4. Ajouter le rôle AD DS, créer une nouvelle forêt et le domaine `bts-sio.local`.
5. Construire l'arborescence d'unités d'organisation, puis créer deux comptes de test : un salarié et un technicien support.
6. Installer le rôle DHCP et configurer une étendue ; vérifier le DNS.
7. Joindre le poste client au domaine, puis déplacer l'objet ordinateur dans la bonne unité d'organisation.
8. Créer des groupes globaux de sécurité, un dossier partagé et ses droits NTFS.
9. Créer une GPO qui mappe le partage en lecteur réseau `S:`, ciblée sur le groupe des utilisateurs.

## Difficultés et solutions

- Windows 11 impose un compte Microsoft à l'installation. J'ai ouvert l'invite de commandes pendant l'installation pour contourner l'obligation de connexion réseau et créer un compte local.

## Résultats et validation

- `ipconfig /all` sur le client : l'adresse IP, la passerelle et le DNS sont bien reçus du serveur DHCP.
- Le poste rejoint le domaine et l'utilisateur de test s'y connecte.
- Le partage est accessible depuis le poste du salarié par son chemin UNC.
- Après `gpupdate /force`, le lecteur `S:` apparaît automatiquement dans l'explorateur.

## Bilan

### Ce que je ferais autrement

Pour ce lab, j'ai assoupli la stratégie de mots de passe du domaine afin d'aller plus vite. En entreprise, je garderais une vraie politique de mots de passe.
