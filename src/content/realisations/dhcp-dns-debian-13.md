---
titre: "Services DHCP et DNS sous Debian 13"
resume: "Mettre en place isc-dhcp-server et BIND9 sur un serveur Debian 13 à deux cartes réseau, puis valider l'attribution d'adresses et la résolution de noms."
debut: 2026-02-02
fin:
periode: février 2026
cadre: formation
annee: 1
modalite: individuel
competences:
  - patrimoine
  - mise-a-disposition
technologies:
  - Debian 13
  - isc-dhcp-server
  - BIND9
  - sudo
  - VMware Workstation
productions:
  - titre: Documentation technique, DHCP et DNS sous Debian 13
    fichier: /documents/doc-debian13-dhcp-dns.pdf
    type: procedure
ordre: 3
---

## Contexte et besoin

Travaux pratiques de 1re année à l'AFTEC, menés après la même installation sous Windows Server. Sous Linux, ces services se configurent uniquement par fichiers texte et en ligne de commande.

## Objectifs

- Distribuer des adresses IP sur un réseau isolé, avec un bail de 6 jours et de 7 jours au maximum.
- Faire résoudre une zone DNS interne et ses alias par BIND9.
- Garder un accès Internet au serveur pour les mises à jour, sans distribuer d'adresses sur ce réseau-là.

## Démarche

1. Passer en root, mettre à jour les paquets, installer `sudo` et donner les droits à l'utilisateur avec `visudo`.
2. Configurer une IP statique sur la carte du réseau isolé dans `/etc/network/interfaces`.
3. Ajouter une seconde carte en NAT pour l'accès aux dépôts.
4. Installer `isc-dhcp-server`, limiter l'écoute à la carte du réseau isolé et définir l'étendue dans `dhcpd.conf`.
5. Installer BIND9, déclarer la zone dans `named.conf.local` et écrire le fichier de zone (SOA, NS, A).
6. Contrôler la syntaxe avec `named-checkconf` et `named-checkzone`, puis redémarrer les services.
7. Ajouter le nom de domaine aux options envoyées par le DHCP.

## Difficultés et solutions

- Au passage en IP statique, le serveur a perdu son accès Internet, car la carte servait aussi au NAT. J'ai ajouté une deuxième carte réseau dédiée au NAT.
- Le service DHCP échoue au premier démarrage tant que `dhcpd.conf` n'est pas rempli : c'est attendu, et j'ai vérifié son état avec `systemctl status` une fois configuré.

## Résultats et validation

| Test | Commande | Résultat |
|---|---|---|
| Attribution DHCP | `ip a` sur le client | adresse reçue dans la plage prévue |
| Résolution DNS | `nslookup` côté serveur et client | nom résolu vers le serveur |
| Connectivité | `ping` du nom depuis le client | réponse |
| Syntaxe | `named-checkconf`, `named-checkzone` | aucune erreur, zone chargée |

## Bilan

### Ce que j'ai appris

Les mêmes services que sous Windows Server, mais sans interface graphique : toute la configuration tient dans quelques fichiers texte. C'est plus exigeant, car une faute de syntaxe empêche le service de démarrer ; d'où l'intérêt des commandes de contrôle comme `named-checkconf` et `named-checkzone` avant chaque redémarrage. En contrepartie, la configuration se relit, se copie et se sauvegarde facilement.
