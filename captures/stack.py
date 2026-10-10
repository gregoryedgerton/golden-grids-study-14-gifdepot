#!/usr/bin/env python3
"""Stack the thumbnails of several candidate lists on one sheet: python3 captures/stack.py out.jpg key1 key2 ...
Each cell is labelled key:index; the lists are find/<key>.json from find.py."""
import sys, json, io, urllib.request, concurrent.futures as cf
from pathlib import Path
from PIL import Image, ImageDraw
HERE = Path(__file__).parent / "find"; UA = {"User-Agent": "golden-grids-study/1.0 (https://github.com/gregoryedgerton)"}
out, keys = sys.argv[1], sys.argv[2:]
cells = []
for k in keys:
    p = HERE / f"{k}.json"
    if p.exists(): cells += [(k, i, it) for i, it in enumerate(json.loads(p.read_text())[:12])]
def load(c):
    for _ in range(2):
        try: return Image.open(io.BytesIO(urllib.request.urlopen(urllib.request.Request(c[2]["thumb"], headers=UA), timeout=30).read())).convert("RGB")
        except Exception: pass
with cf.ThreadPoolExecutor(3) as ex: imgs = list(ex.map(load, cells))
cols, cw, ch = 6, 200, 150; rows = (len(cells) + cols - 1) // cols
S = Image.new("RGB", (cols * cw, rows * (ch + 14)), "white"); d = ImageDraw.Draw(S)
for n, ((k, i, it), im) in enumerate(zip(cells, imgs)):
    x, y = (n % cols) * cw, (n // cols) * (ch + 14)
    if im: im.thumbnail((cw - 2, ch)); S.paste(im, (x, y))
    d.text((x + 2, y + ch + 1), f"{k}:{i} {it['licence'][:9]} {it['w']}", fill="black")
S.save(out, quality=72); print(out, len(cells))
