---
titre: "Mini-SI d'une PME : annuaire, helpdesk, supervision et sauvegarde"
resume: "Déployer le SI d'une PME fictive de 50 postes (AD, GLPI, Zabbix, journaux, sauvegarde), traiter trois incidents et démontrer la reprise de GLPI."
debut:
fin:
cadre: formation
annee: 2
modalite: individuel
competences:
  - patrimoine
  - incidents
  - projet
  - mise-a-disposition
technologies:
  - Windows Server (AD DS, DNS, DHCP, AD CS)
  - GPO
  - Debian
  - Docker Compose
  - Squid
  - GLPI et MariaDB
  - Zabbix
  - Loki, Promtail, Grafana
  - restic et MinIO
  - VMware Workstation
productions:
  - titre: Dossier projet, SI Albatros
    fichier: /documents/dossier-projet-si-albatros.pdf
    type: rapport
ordre: 3
---

## Contexte et besoin

TD transversal de 2e année à l'AFTEC, sur le bloc 1. Le service informatique interne d'ALBATROS, une PME fictive de 50 postes, doit livrer à sa direction un système d'information centralisé, supervisé, sauvegardé et reproductible par scripts, avec une faible consommation de ressources. Mon dossier projet est daté du 08/10/2026. [À COMPLÉTER : dates de début et de fin du TD, et préciser si le travail était individuel ou en équipe]

## Objectifs

Chaque objectif avait un indicateur fixé à l'avance :

| Objectif | Indicateur attendu |
|---|---|
| Identité et conformité | jonction au domaine, GPO proxy appliquée et vérifiée par `gpresult` |
| Mise à disposition des services | conteneurs actifs, ports accessibles, mémoire limitée |
| Intégrations | connexion à GLPI avec un compte AD, hôtes supervisés, tableaux de bord |
| Incidents et support | 3 tickets complets et une base de connaissances |
| Sauvegarde et reprise | perte de données maximale (RPO) de 24 h, durée de reprise (RTO) de 30 min au plus |
| Observabilité | tableau de bord « Santé SI » |

## Démarche

1. Monter trois machines virtuelles sur un réseau NAT VMware : un contrôleur de domaine Windows Server, un hôte Docker sous Debian et un poste client membre du domaine.
2. Configurer le domaine, les unités d'organisation, les groupes et un compte de service pour la lecture LDAP ; DNS avec redirecteurs, DHCP avec ses options de routeur et de DNS.
3. Déployer chaque service dans sa propre pile Docker Compose, avec une limite de mémoire : proxy Squid, GLPI et sa base MariaDB, Zabbix, Loki et Grafana, stockage MinIO.
4. Imposer le proxy aux postes par une GPO.
5. Brancher GLPI sur l'annuaire en LDAPS, attribuer le profil technicien aux membres du groupe informatique, définir les catégories ITIL et les délais de prise en charge et de résolution.
6. Superviser les deux serveurs avec Zabbix : alerte si la mémoire dépasse 85 %, si un hôte ne répond plus, si GLPI est injoignable.
7. Centraliser les journaux (conteneurs, système, proxy) dans Loki, et les croiser avec Zabbix dans un tableau de bord Grafana.
8. Sauvegarder chaque nuit GLPI et Zabbix vers MinIO avec restic, à partir d'un export SQL, avec une rétention de 7 sauvegardes quotidiennes et 4 hebdomadaires.
9. Simuler et traiter trois incidents, chacun tracé dans un ticket GLPI.

## Difficultés et solutions

| Problème | Cause | Correction |
|---|---|---|
| GLPI refuse la connexion à l'annuaire | Windows Server 2025 exige la signature LDAP sur le port 389 | passage en LDAPS (port 636), avec une autorité de certification AD CS |
| Le poste client n'a pas accès à Internet | étendue DHCP sans option « routeur » | ajout de l'option 003 en PowerShell |
| L'hôte Linux apparaît en rouge dans Zabbix | l'agent n'acceptait que les requêtes locales, le serveur arrivait du réseau Docker | autorisation de la plage du réseau Docker en contrôles passifs |
| Aucun accès au proxy dans Loki | le journal restait enfermé dans le conteneur | journal exposé sur l'hôte et collecté par Promtail |
| L'image officielle MinIO a disparu pendant le TP | image non figée à une version | image de remplacement, et leçon retenue : figer les versions |

J'ai aussi choisi d'exporter les bases en SQL avant chaque sauvegarde, au lieu de copier les fichiers d'une base en cours d'exécution, qui donne une copie potentiellement incohérente.

## Résultats et validation

- **Services** : proxy, GLPI, Zabbix, Loki et Grafana, MinIO en service ; connexion à GLPI avec un compte de l'annuaire ; deux hôtes supervisés au vert.
- **Sauvegarde** : premier jeu validé le 06/10/2026 ; restauration de GLPI réussie après suppression volontaire de tables (incident 2, plan de reprise). [À COMPLÉTER : durée de reprise mesurée]
- **Incident 1, GLPI injoignable** : diagnostic couche par couche, réseau et DNS, alerte Zabbix, test à travers le proxy, journaux, puis conteneur. La cause était un service arrêté. Ticket et article de base de connaissances rédigés.
- **Incident 3, GPO proxy désactivée** : à rejouer, car l'application nominale de la GPO doit d'abord être validée.

## Bilan

### Ce que j'ai appris

[À COMPLÉTER : ce que je retiens, par exemple le diagnostic couche par couche ou le croisement des alertes et des journaux]

### Ce que je ferais autrement

Ma rétrospective liste les dettes techniques. La principale : tous les services et leurs sauvegardes reposent sur une seule machine virtuelle, alors que la règle 3-2-1 impose une copie hors de la machine et hors site. Viennent ensuite les secrets en clair dans les fichiers de configuration, et les interfaces web en HTTP au lieu de HTTPS.
