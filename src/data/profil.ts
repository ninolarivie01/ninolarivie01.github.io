// Informations d'identité réutilisées partout (en-tête, pied de page, données structurées, mentions légales).
export const PROFIL = {
  nom: 'Nino Larivière-Gillet',
  fonction: 'Technicien support et infrastructure en alternance',
  formation: 'BTS SIO option SISR, AFTEC Rennes',
  // L'adresse est découpée pour ne jamais apparaître en clair dans le HTML (protection contre la collecte automatique).
  email: { utilisateur: 'nlarivie35', domaine: 'gmail.com' },
  linkedin: 'https://www.linkedin.com/in/nino-larivi%C3%A8re-gillet-503276248/',
  ville: 'Rennes',
} as const;

export const SITE = {
  titre: 'Nino Larivière-Gillet, portfolio BTS SIO SISR',
  description:
    "Portfolio professionnel de Nino Larivière-Gillet, apprenti en BTS SIO option SISR : réalisations, compétences du bloc 1 et tableau de synthèse de l'épreuve E5.",
  session: '2027',
} as const;
