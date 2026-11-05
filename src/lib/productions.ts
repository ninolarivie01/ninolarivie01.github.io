import { existsSync, statSync } from 'node:fs';
import { join } from 'node:path';
import type { Realisation } from './realisations';

export const TYPES_PRODUCTION = {
  procedure: 'Procédure',
  'compte-rendu': 'Compte rendu',
  schema: 'Schéma',
  rapport: 'Dossier',
  autre: 'Document',
} as const;

/** Productions d'une réalisation, avec leur présence réelle dans public/ et leur poids. */
export function productionsDe(r: Realisation) {
  return r.data.productions.map((p) => {
    const chemin = join(process.cwd(), 'public', p.fichier);
    const present = existsSync(chemin);
    const ko = present ? statSync(chemin).size / 1024 : 0;
    const taille = !present ? null : ko >= 1024 ? `${(ko / 1024).toFixed(1).replace('.', ',')} Mo` : `${Math.max(1, Math.round(ko))} ko`;
    return {
      ...p,
      present,
      taille,
      libelleType: TYPES_PRODUCTION[p.type],
      format: p.fichier.split('.').pop()?.toUpperCase() ?? '',
    };
  });
}

export type Production = ReturnType<typeof productionsDe>[number];
