// Les 6 compétences du bloc 1 « Support et mise à disposition de services informatiques »
// (référentiel du BTS SIO). L'ordre est celui du tableau de synthèse officiel.
export const COMPETENCES = [
  {
    id: 'patrimoine',
    court: 'Patrimoine',
    titre: 'Gérer le patrimoine informatique',
    details: [
      'Recenser et identifier les ressources numériques',
      'Exploiter des référentiels, normes et standards adoptés par le prestataire informatique',
      "Mettre en place et vérifier les niveaux d'habilitation associés à un service",
      "Vérifier les conditions de la continuité d'un service informatique",
      'Gérer des sauvegardes',
      "Vérifier le respect des règles d'utilisation des ressources numériques",
    ],
  },
  {
    id: 'incidents',
    court: 'Incidents',
    titre: "Répondre aux incidents et aux demandes d'assistance et d'évolution",
    details: [
      'Collecter, suivre et orienter des demandes',
      'Traiter des demandes concernant les services réseau et système, applicatifs',
      'Traiter des demandes concernant les applications',
    ],
  },
  {
    id: 'presence-en-ligne',
    court: 'Présence en ligne',
    titre: "Développer la présence en ligne de l'organisation",
    details: [
      "Participer à la valorisation de l'image de l'organisation sur les médias numériques en tenant compte du cadre juridique et des enjeux économiques",
      "Référencer les services en ligne de l'organisation et mesurer leur visibilité",
      "Participer à l'évolution d'un site Web exploitant les données de l'organisation",
    ],
  },
  {
    id: 'projet',
    court: 'Projet',
    titre: 'Travailler en mode projet',
    details: [
      "Analyser les objectifs et les modalités d'organisation d'un projet",
      'Planifier les activités',
      "Évaluer les indicateurs de suivi d'un projet et analyser les écarts",
    ],
  },
  {
    id: 'mise-a-disposition',
    court: 'Mise à disposition',
    titre: 'Mettre à disposition des utilisateurs un service informatique',
    details: [
      "Réaliser les tests d'intégration et d'acceptation d'un service",
      'Déployer un service',
      "Accompagner les utilisateurs dans la mise en place d'un service",
    ],
  },
  {
    id: 'developpement-pro',
    court: 'Développement pro.',
    titre: 'Organiser son développement professionnel',
    details: [
      "Mettre en place son environnement d'apprentissage personnel",
      'Mettre en œuvre des outils et stratégies de veille informationnelle',
      'Gérer son identité professionnelle',
      'Développer son projet professionnel',
    ],
  },
] as const;

export type CompetenceId = (typeof COMPETENCES)[number]['id'];
export const COMPETENCE_IDS = COMPETENCES.map((c) => c.id) as [CompetenceId, ...CompetenceId[]];
export const competence = (id: CompetenceId) => COMPETENCES.find((c) => c.id === id)!;
