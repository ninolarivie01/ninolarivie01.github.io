import { getCollection, type CollectionEntry } from 'astro:content';

export type Realisation = CollectionEntry<'realisations'>;

// Groupes du tableau de synthèse, dans l'ordre d'affichage
export const GROUPES = [
  { id: 'formation', titre: 'En formation', court: 'Formation' },
  { id: 'stage', titre: 'Stage de 1re année, Pôle Saint-Hélier', court: 'Stage, 1re année' },
  { id: 'alternance', titre: "Alternance de 2e année, DSN d'Ille-et-Vilaine", court: 'Alternance, 2e année' },
] as const;

export const CADRES: Record<Realisation['data']['cadre'], string> = {
  formation: 'Formation',
  stage: 'Stage',
  alternance: 'Alternance',
};

const tri = (a: Realisation, b: Realisation) =>
  a.data.annee - b.data.annee ||
  (a.data.debut?.getTime() ?? 0) - (b.data.debut?.getTime() ?? 0) ||
  a.data.ordre - b.data.ordre;

/** Réalisations publiées (hors brouillons), dans l'ordre chronologique. */
export async function realisationsPubliees() {
  const toutes = await getCollection('realisations', ({ data }) => !data.brouillon);
  return toutes.sort(tri);
}

/** Réalisations regroupées comme dans le tableau de synthèse officiel. */
export async function realisationsParGroupe() {
  const toutes = await realisationsPubliees();
  return GROUPES.map((g) => ({ ...g, realisations: toutes.filter((r) => r.data.cadre === g.id) }));
}

const jjmmaa = new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: '2-digit', year: '2-digit', timeZone: 'UTC' });

/** Période au format JJ/MM/AA – JJ/MM/AA, ou null si les dates ne sont pas encore renseignées. */
export function periode(debut?: Date | null, fin?: Date | null) {
  if (!debut) return null;
  if (!fin) return `depuis le ${jjmmaa.format(debut)}`;
  return `${jjmmaa.format(debut)} – ${jjmmaa.format(fin)}`;
}

export const dateLongue = new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
