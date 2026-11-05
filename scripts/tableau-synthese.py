"""Remplit le tableau de synthèse officiel (.xlsx) à partir des fiches de réalisations.

Usage : python scripts/tableau-synthese.py <modele.xlsx>
Écrit public/documents/tableau-de-synthese-e5.xlsx. Le modèle n'est pas modifié.
Prérequis, une fois : python -m pip install openpyxl pyyaml
"""

import datetime
import sys
from copy import copy
from pathlib import Path

import openpyxl
import yaml

RACINE = Path(__file__).resolve().parent.parent
FICHES = RACINE / 'src' / 'content' / 'realisations'
SORTIE = RACINE / 'public' / 'documents' / 'tableau-de-synthese-e5.xlsx'

# Colonnes des 6 compétences dans le modèle, dans l'ordre de src/data/competences.ts
COLONNES = {
    'patrimoine': 3,
    'incidents': 4,
    'presence-en-ligne': 5,
    'projet': 6,
    'mise-a-disposition': 7,
    'developpement-pro': 8,
}
# Première et dernière ligne disponibles pour chaque groupe du modèle
GROUPES = {'formation': (9, 18), 'stage': (20, 26), 'alternance': (28, 34)}
ORDRE_CADRE = {'formation': 0, 'stage': 1, 'alternance': 2}


def lire_fiches():
    fiches = []
    for f in sorted(FICHES.glob('[!_]*.md')):
        entete = yaml.safe_load(f.read_text(encoding='utf-8').split('---')[1])
        if not entete.get('brouillon'):
            fiches.append(entete)
    debut = lambda d: d.get('debut') or datetime.date.min
    return sorted(
        fiches, key=lambda d: (d['annee'], ORDRE_CADRE[d['cadre']], debut(d), d.get('ordre', 0))
    )


def periode(d):
    if d.get('periode'):
        return str(d['periode'])
    if not d.get('debut'):
        return ''
    debut = d['debut'].strftime('%d/%m/%y')
    return f"{debut} au {d['fin'].strftime('%d/%m/%y')}" if d.get('fin') else f'depuis le {debut}'


def intitule(d):
    texte = d['titre']
    if d['modalite'] == 'equipe':
        texte += f" (en équipe de {d['tailleEquipe']})"
    docs = [p['titre'] for p in d.get('productions', []) if (RACINE / 'public' / p['fichier'].lstrip('/')).exists()]
    texte += '\n' + ('Documents : ' + ' ; '.join(docs) + ' (PDF)' if docs else 'Fiche détaillée sur le portfolio')
    return texte


def main():
    wb = openpyxl.load_workbook(sys.argv[1])
    ws = wb.active
    ws['G1'] = 'SESSION 2027'
    ws['A3'] = 'NOM et prénom : LARIVIÈRE-GILLET Nino'
    ws['A5'] = 'Adresse URL du portfolio : https://ninolarivie01.github.io/'

    fiches = lire_fiches()
    for cadre, (premiere, derniere) in GROUPES.items():
        lignes = [d for d in fiches if d['cadre'] == cadre]
        if len(lignes) > derniere - premiere + 1:
            raise SystemExit(f'Trop de réalisations « {cadre} » pour le modèle.')
        for r in range(premiere, derniere + 1):
            for c in range(1, 9):
                ws.cell(r, c).value = None
            # Les lignes vides du modèle sont plus basses et en corps 11 : on leur donne le style de la première
            ws.row_dimensions[r].height = ws.row_dimensions[premiere].height
            for c in range(1, 9):
                ws.cell(r, c).font = copy(ws.cell(premiere, c).font)
        for r, d in zip(range(premiere, derniere + 1), lignes):
            ws.cell(r, 1).value = intitule(d)
            ws.cell(r, 2).value = periode(d)
            for comp in d['competences']:
                ws.cell(r, COLONNES[comp]).value = 'X'

    SORTIE.parent.mkdir(parents=True, exist_ok=True)
    wb.save(SORTIE)
    print(f'{len(fiches)} réalisations écrites dans {SORTIE.relative_to(RACINE)}')


if __name__ == '__main__':
    main()
