#!/usr/bin/env python3
"""Stack Unsplash candidate lists (find/unsplash.json, from search results read in a browser): python3 captures/stack_u.py out.jpg key1 key2 ..."""
import sys, json, io, urllib.request, concurrent.futures as cf
from pathlib import Path
from PIL import Image, ImageDraw
HERE = Path(__file__).parent / "find"; data = json.loads((HERE / "unsplash.json").read_text())
out, keys = sys.argv[1], sys.argv[2:]
cells = [(k, i, it) for k in keys for i, it in enumerate(data.get(k, [])[:6])]
def load(c):
    for _ in range(2):
        try: return Image.open(io.BytesIO(urllib.request.urlopen(urllib.request.Request(c[2]["raw"] + "?w=240&h=180&fit=crop&q=55", headers={"User-Agent": "Mozilla/5.0"}), timeout=30).read())).convert("RGB")
        except Exception: pass
with cf.ThreadPoolExecutor(6) as ex: imgs = list(ex.map(load, cells))
cols, cw, ch = 6, 200, 150; rows = (len(cells) + cols - 1) // cols
S = Image.new("RGB", (cols * cw, rows * (ch + 14)), "white"); d = ImageDraw.Draw(S)
for n, ((k, i, it), im) in enumerate(zip(cells, imgs)):
    x, y = (n % cols) * cw, (n // cols) * (ch + 14)
    if im: im.thumbnail((cw - 2, ch)); S.paste(im, (x, y))
    d.text((x + 2, y + ch + 1), f"{k}:{i} {(it['user'] or '')[:12]}".encode("ascii", "ignore").decode(), fill="black")
S.save(out, quality=70); print(out, len(cells))
