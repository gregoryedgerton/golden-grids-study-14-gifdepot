import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Page } from "../lib/Page";
import { GridBand, type Cell } from "../bands/bands";
import { FactStrip, FactTile, PhotoCard, ProductCard, Stars, Price, type Fact } from "../lib/cards";
import { BuyBox, Ratings, Specs } from "../lib/modules";
import { FACTS, HALLOWEEN, PAGES, PDP, REFERENCE, usd, type Product } from "../content";
import "../styles.css";

const fact = (f: Fact): Cell => (_x, _k, flat) => flat ? <FactStrip f={f} /> : <FactTile f={f} />;
const photo = (k: string, title: string): Cell => (x, key) => <PhotoCard k={k} title={title} x={x} slotKey={key} />;
const like = (id: string): Cell => (x, key) => <ProductCard p={HALLOWEEN.find((p) => p.id === id) as Product} x={x} slotKey={key} href={id === "barnaby" ? undefined : PAGES.halloween} />;

function App() {
  return (
    <Page current={PAGES.product} source={REFERENCE.product} crumbs={PDP.crumbs.concat(["Boneyard Animatronics"])}>
      <div className="wrap pdp__ids"><span>Internet # {PDP.internet}</span><span>Model # {PDP.model}</span><span>Store SKU # {PDP.sku}</span></div>
      <div className="wrap pdp__head">
        <p className="pdp__badge">Exclusive</p>
        <p className="pdp__brand">Shop {PDP.brand}</p>
        <h1 className="pdp__title">6 FT Boneyard Animated LED Barnaby the Last Call Barkeep</h1>
        <p className="pdp__rate"><Stars r={PDP.rating} count={PDP.count} /> <span className="pdp__qa">Questions &amp; Answers ({PDP.qa})</span></p>
        <p className="pdp__price"><Price n={129} big /><s>{usd(179)}</s><span className="card__save">Save {usd(50)} (28%)</span></p>
        <ul className="bullets pdp__bullets">{PDP.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
      </div>
      <GridBand id="gallery" title="Photographs" quiet lead variant={1} cells={[photo("skeleton-close", "The figure, close"), photo("skeleton-porch", "On a porch"), photo("reaper", "With a companion"), photo("skulls", "In a display")]} />
      <BuyBox />
      <GridBand id="theme" title="Collection theme" sub="Barkeep · Bartender · Merlot Mishap" variant={3} from={2}
        cells={PDP.themes.map((t, i): Cell => () => <FactTile f={{ line: t, label: i === 0 ? "This one" : "Same collection", body: i === 0 ? "A skeleton barkeep in a canvas apron, stirring." : i === 1 ? "The same barkeep at a longer bar." : "A 4.5 ft figure, mid-stagger, glass in hand.", tone: i === 0 ? "orange" : "tile" }} />)}
        strip={fact(FACTS.limit)} />
      <Specs />
      <Ratings />
      <GridBand id="related" title="Customers Also Viewed" variant={2} cells={["merlot", "bonesy", "twelve", "reggie", "hare"].map(like)} />
      <GridBand id="related-2" title="More from the Boneyard collection" quiet variant={5} cells={["raven", "robber", "reaper", "lilac"].map(like)} />
    </Page>
  );
}
createRoot(document.getElementById("root")!).render(<StrictMode><App /></StrictMode>);
