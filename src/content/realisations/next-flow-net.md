---
titre: "Next Flow-NET, infrastructure réseau d'une entreprise fictive"
resume: "Projet de groupe : l'infrastructure d'une entreprise fictive, dont le pare-feu FortiGate qui sépare les services et filtre les flux : je l'ai configuré et documenté."
debut: 2026-10-01
fin:
periode: octobre 2026 – mars 2027 (fin prévue)
cadre: formation
annee: 2
modalite: equipe
tailleEquipe: 3
competences:
  - patrimoine
  - projet
  - mise-a-disposition
technologies:
  - FortiGate 200D (FortiOS 6.0)
  - VLAN et trunk 802.1Q
  - Politiques de filtrage, NAT, IP virtuelle
  - DHCP
  - Active Directory
productions:
  - titre: Documentation technique, pare-feu FW-NEXTFLOW
    fichier: /documents/doc-pare-feu-fw-nextflow.pdf
    type: procedure
ordre: 1
---

## Contexte et besoin

Projet de groupe de 2e année à l'AFTEC, à trois. Next Flow-NET est une entreprise fictive dont il faut concevoir et déployer l'infrastructure : réseau segmenté par service, serveurs, DMZ, Wi-Fi invités, sauvegarde et accès distant. Le pare-feu en est la pièce centrale : il sépare les réseaux et décide quels flux sont autorisés. Le projet a commencé début octobre 2026 et doit se terminer en mars 2027. Il en est aujourd'hui à l'étape du matériel physique (pare-feu, switch, borne Wi-Fi) ; les serveurs et la virtualisation viendront ensuite.

## Objectifs

Les principes de filtrage fixés au départ :

- isoler les services entre eux : direction, commerce, RH et comptabilité, conseil, support, Wi-Fi professionnel ;
- n'ouvrir aux postes que les ports utiles des serveurs ;
- ne jamais donner aux postes l'accès aux réseaux de gestion et de sauvegarde ;
- limiter les invités à Internet ;
- tout refuser par défaut et journaliser ;
- n'autoriser l'administration que depuis le réseau de gestion.

## Démarche

1. Remettre le FortiGate en configuration d'usine. Le mot de passe d'origine étant inconnu, la réinitialisation passe par le compte de maintenance, en console série.
2. Créer un trunk vers le switch et onze sous-interfaces VLAN : serveurs, six services, invités, sauvegarde. Toutes les passerelles sont en `.254`.
3. Regrouper les six VLAN des postes dans une zone où le trafic entre services est bloqué.
4. Définir les objets (réseaux, serveurs) et des groupes de services sur mesure. Le groupe d'usine « Windows AD » oubliait NTP et les ports RPC dynamiques, et ouvrait NetBIOS.
5. Écrire dix politiques de filtrage dans l'ordre d'évaluation, plus le refus implicite journalisé.
6. Configurer la traduction d'adresses en sortie, une IP virtuelle pour publier le reverse proxy de la DMZ en HTTPS, et des serveurs DHCP provisoires par VLAN.
7. Sécuriser l'administration : HTTPS et SSH uniquement, sur l'interface de gestion seulement, HTTP désactivé, déconnexion après 10 minutes d'inactivité.
8. Comparer la configuration réelle aux principes attendus, puis écrire le plan de tests.

## Difficultés et solutions

- **Mot de passe administrateur inconnu** : réinitialisation par le compte de maintenance en console série. Ce compte devra être désactivé en fin de projet.
- **Signatures de sécurité datant de 2015 à 2018**, faute d'abonnement FortiGuard : aucun profil antivirus, IPS ni filtrage web n'est appliqué. La limite est documentée.
- **Le VLAN de gestion n'existe pas encore sur le switch** : l'administration passe provisoirement par le port de gestion physique, jusqu'à la bascule.
- **La maquette pouvait atteindre le réseau de la salle de cours** : une règle de refus placée en tête de liste l'en empêche.

## Résultats et validation

L'analyse d'écarts, réalisée le 16/10/2026 :

- six principes respectés ;
- un respecté partiellement : l'administration ne se fait pas encore depuis le VLAN de gestion ;
- deux écarts temporaires : le DNS et le DHCP des postes, en attente du serveur Windows ;
- plusieurs flux à créer à l'arrivée des autres équipements : VPN nomade, supervision, sauvegarde.

Le plan de validation compte 18 tests, chacun prouvé par le résultat côté client et par la ligne de journal du FortiGate : isolement entre services, refus vers la sauvegarde, administration impossible depuis un poste ou depuis le WAN, blocage après trois échecs de connexion, etc. Ces tests n'ont pas encore été passés : ils le seront une fois les autres équipements en place.

Le planning et le suivi des tâches sont tenus dans un tableau partagé par l'équipe, publié sous forme d'artefact Claude. À ce jour, aucun retard sur le planning.

## Mon rôle

J'ai pris en charge le pare-feu FortiGate : je l'ai configuré moi-même, de la remise en configuration d'usine à la sécurisation de l'administration, puis j'ai rédigé sa documentation technique, l'analyse d'écarts et le plan de tests.

Les deux autres membres se sont occupés du switch, de la borne Wi-Fi, de l'organisation et de la documentation générale du projet ; j'ai aussi participé à ces tâches. Nous nous coordonnons avec le tableau de suivi partagé.

## Bilan

### Ce que je ferais autrement

En production, je remplacerais le compte administrateur partagé par des comptes nominatifs, pour savoir qui a fait quoi. Je désactiverais aussi le compte de maintenance, et je limiterais l'administration à un poste déclaré comme hôte de confiance.
