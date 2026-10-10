import { StrictMode, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { Page } from "../lib/Page";
import { GridBand, type Cell } from "../bands/bands";
import { FactStrip, FactTile, PromoCard, ProductCard, type Fact } from "../lib/cards";
import { FilterBar, SeoText, type Sort } from "../lib/modules";
import { COLLECTIONS, FACTS, HALLOWEEN, HALLOWEEN_NAV, PAGES, REFERENCE, type Product } from "../content";
import "../styles.css";

const fact = (f: Fact): Cell => (_x, _k, flat) => flat ? <FactStrip f={f} /> : <FactTile f={f} />;
const SHAPES: { from: number; variant: number; lead?: boolean }[] = [{ from: 3, variant: 1 }, { from: 1, variant: 2 }, { from: 4, variant: 0, lead: true }, { from: 2, variant: 5 }];

function App() {
  const q0 = useMemo(() => new URLSearchParams(location.search).get("q") ?? "", []);
  const [q, setQ] = useState(/^(halloween|skelet|animat|pumpkin|tomb|ghost|witch|decor|giant)/.test(q0) ? "" : q0);
  const [cols, setCols] = useState<string[]>([]);
  const [sort, setSort] = useState<Sort>("featured");
  const [maxPrice, setMaxPrice] = useState(300);
  const list = useMemo(() => {
    let l = HALLOWEEN.filter((p) => (!cols.length || cols.includes(p.collection!)) && p.price <= (maxPrice >= 300 ? 1e9 : maxPrice) && (!q || `${p.name} ${p.model}`.toLowerCase().includes(q.toLowerCase())));
    if (sort === "low") l = [...l].sort((a, b) => a.price - b.price);
    if (sort === "high") l = [...l].sort((a, b) => b.price - a.price);
    if (sort === "rated") l = [...l].sort((a, b) => b.rating - a.rating || b.count - a.count);
    return l;
  }, [q, cols, sort, maxPrice]);
  const toggle = (c: string) => setCols((v) => (v.includes(c) ? v.filter((i) => i !== c) : [...v, c]));
  const clear = () => { setQ(""); setCols([]); setMaxPrice(300); };
  const shop = (c: string) => { setCols([c]); setTimeout(() => document.getElementById("list")?.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" }), 50); };

  const product = (p: Product): Cell => (x, key) => <ProductCard p={p} x={x} slotKey={key} href={p.id === "barnaby" ? PAGES.product : undefined} />;
  const groups: Product[][] = [];
  for (let i = 0; i < list.length; i += 5) groups.push(list.slice(i, i + 5));
  const tiles = [["Boneyard", "skeleton-porch", "The legendary 12-ft skeleton, the new giant mummy and the barkeep.", "orange"], ["Hollow Woods", "scarecrow", "Turn the yard into a haunted forest with creatures like the 9-ft Rotten Reggie.", "dark"], ["Halloween Classics", "inflatables", "Favourites and family-friendly characters, from a top-hatted hare to rag dolls.", "orange"], ["Dead Tide", "ghosts", "Dive into the darkness with a pirate ship, a rotten parrot and a drowned fisherman.", "dark"]] as const;

  return (
    <Page current={PAGES.halloween} source={REFERENCE.halloween} crumbs={["Home", "Holiday Decorations", "Halloween Decorations"]}>
      <div className="wrap titlerow"><h1 className="pagetitle">HALLOWEEN DECORATIONS</h1></div>
      <nav className="wrap subcats" aria-label="Halloween decoration types"><ul>{HALLOWEEN_NAV.map((n) => <li key={n}><span>{n}</span></li>)}</ul></nav>
      <GridBand id="promos" title="Halloween offers" quiet lead variant={2} from={3}
        cells={[() => <PromoCard tone="orange" title="YOU'VE NEVER HAD A HALLOWEEN LIKE THIS" body="Bigger, bolder and scarier, with free delivery on select items." cta="Shop Now" photoKey="haunted-yard" />, () => <PromoCard tone="dark" title="HALLOWEEN FAVORITES, DELIVERED FAST" body="Fast free delivery on select Halloween decor. Subject to availability." cta="Shop Now" photoKey="skeleton-yard" />, () => <PromoCard tone="orange" title="HALLOWEEN MUST-HAVES" body="With interactive tech and free delivery on select items." cta="Shop Now" photoKey="witch" />]}
        strip={fact(FACTS.limit)} />
      <div id="list">
        <h2 className="listtitle">FEATURED HALLOWEEN DECORATIONS</h2>
        <FilterBar q={q} setQ={setQ} collections={cols} toggle={toggle} sort={sort} setSort={setSort} count={list.length} total={HALLOWEEN.length} clear={clear} maxPrice={maxPrice} setMaxPrice={setMaxPrice} />
        {groups.length === 0 && <p className="wrap none">No decorations match. <button type="button" className="textbtn" onClick={clear}>Clear all</button></p>}
        {groups.map((g, i) => {
          const s = SHAPES[i % SHAPES.length];
          return <GridBand key={i} id={`results-${i + 1}`} title={`Results ${i * 5 + 1} to ${i * 5 + g.length}`} quiet variant={s.variant} lead={s.lead} cells={g.map(product)} />;
        })}
      </div>
      <GridBand id="collections" title="HALLOWEEN COLLECTIONS" sub="Choose a collection to see it above" variant={3}
        cells={tiles.map(([name, photo, body, tone]): Cell => () => <PromoCard tone={tone} title={name} body={body} cta="Shop Now" photoKey={photo} onClick={() => shop(name)} />)} />
      <GridBand id="more-holiday" title="MORE HOLIDAY DECORATIONS" variant={0} from={2}
        cells={[() => <PromoCard tone="orange" title="Fall Decorations" body="Home decor that gives you that fall feeling: welcome mats, wreaths, mums and live flowers." cta="Shop Now" photoKey="porch" />, () => <PromoCard tone="dark" title="Christmas Decorations" body="Trees, lights, ornaments, greenery and yard decorations for magical moments." cta="Shop Now" photoKey="christmas" />, fact(FACTS.sixty), fact({ line: String(COLLECTIONS.length), label: "Collections", body: "Boneyard, Hollow Woods, Halloween Classics and Dead Tide keep a scene to one theme.", tone: "tile" })]}
        strip={fact(FACTS.limit)} />
      <SeoText />
    </Page>
  );
}
createRoot(document.getElementById("root")!).render(<StrictMode><App /></StrictMode>);
