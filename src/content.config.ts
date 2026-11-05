import { defineCollection, reference } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';
import { COMPETENCE_IDS } from './data/competences';

// Une réalisation = un fichier Markdown dans src/content/realisations/.
// Les fichiers dont le nom commence par « _ » (modèles) sont ignorés.
const realisations = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/realisations' }),
  schema: ({ image }) =>
    z
      .object({
        titre: z.string(),
        resume: z.string().max(170),
        // Dates au format AAAA-MM-JJ ; laisser vide tant qu'elles ne sont pas connues.
        debut: z.date().nullish(),
        fin: z.date().nullish(),
        // Période en clair quand les dates exactes ne sont pas connues (« janvier 2026 ») ; remplace l'affichage des dates.
        periode: z.string().optional(),
        cadre: z.enum(['formation', 'stage', 'alternance']),
        annee: z.union([z.literal(1), z.literal(2)]),
        organisation: reference('contextes').optional(),
        modalite: z.enum(['individuel', 'equipe']),
        tailleEquipe: z.number().int().min(2).optional(),
        competences: z.array(z.enum(COMPETENCE_IDS)).min(1),
        technologies: z.array(z.string()).default([]),
        productions: z
          .array(
            z.object({
              titre: z.string(),
              fichier: z.string(),
              type: z.enum(['procedure', 'compte-rendu', 'schema', 'rapport', 'autre']),
            }),
          )
          .default([]),
        couverture: image().optional(),
        couvertureAlt: z.string().optional(),
        ordre: z.number().default(0),
        brouillon: z.boolean().default(false),
      })
      .refine((r) => r.cadre === 'formation' || r.organisation, {
        message: 'Une réalisation de stage ou d’alternance doit indiquer son organisation.',
        path: ['organisation'],
      })
      .refine((r) => !r.couverture || r.couvertureAlt, {
        message: 'Une image de couverture doit avoir un texte alternatif (couvertureAlt).',
        path: ['couvertureAlt'],
      }),
});

const contextes = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/contextes' }),
  schema: z.object({
    organisation: z.string(),
    nomCourt: z.string(),
    cadre: z.enum(['stage', 'alternance']),
    annee: z.union([z.literal(1), z.literal(2)]),
    service: z.string(),
    periode: z.string(),
    resume: z.string().max(170),
    environnement: z.array(z.string()).default([]),
    ordre: z.number().default(0),
  }),
});

// Un article de veille = un fichier Markdown. Copier _modele.md pour en ajouter un.
const veille = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/veille' }),
  schema: z.object({
    titre: z.string(),
    date: z.date(),
    resume: z.string().max(170),
    sources: z
      .array(z.object({ titre: z.string(), url: z.url(), editeur: z.string(), date: z.date().optional() }))
      .min(1),
    motsCles: z.array(z.string()).default([]),
    brouillon: z.boolean().default(false),
  }),
});

const certifications = defineCollection({
  loader: file('./src/data/certifications.yaml'),
  schema: z.object({
    nom: z.string(),
    organisme: z.string(),
    statut: z.enum(['obtenue', 'en-cours', 'a-completer']),
    date: z.date().nullish(),
    preuve: z.string().optional(),
    note: z.string().optional(),
  }),
});

export const collections = { realisations, contextes, veille, certifications };
