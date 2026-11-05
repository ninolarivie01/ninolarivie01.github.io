# Génère la miniature de la première page de chaque PDF de public/documents/
# dans src/assets/miniatures/ (le site les convertit ensuite en AVIF/WebP).
# À relancer après l'ajout d'un PDF :  python scripts/miniatures.py
# Prérequis, une seule fois :          python -m pip install pymupdf
from pathlib import Path
import pymupdf

RACINE = Path(__file__).resolve().parent.parent
SOURCE = RACINE / 'public' / 'documents'
CIBLE = RACINE / 'src' / 'assets' / 'miniatures'
LARGEUR = 360  # pixels : trois fois la largeur affichée, pour les écrans haute densité

CIBLE.mkdir(parents=True, exist_ok=True)
for pdf in sorted(SOURCE.glob('*.pdf')):
    page = pymupdf.open(pdf)[0]
    zoom = LARGEUR / page.rect.width
    page.get_pixmap(matrix=pymupdf.Matrix(zoom, zoom)).save(CIBLE / f'{pdf.stem}.png')
    print(f'{pdf.name} -> src/assets/miniatures/{pdf.stem}.png')
