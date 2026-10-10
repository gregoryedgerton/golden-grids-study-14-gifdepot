import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { Page } from "../lib/Page";
import { GridBand, type Cell } from "../bands/bands";
import { FactStrip, FactTile, PowerTile, PromoCard, ProductCard, type Fact } from "../lib/cards";
import { FACTS, PAGES, POWER, POWER_NAV, REFERENCE, YARD_CLEANUP, type PowerType } from "../content";
import "../styles.css";

const power = (t: PowerType): Cell => (x, key) => <PowerTile t={t} x={x} slotKey={key} />;
const fact = (f: Fact): Cell => (_x, _k, flat) => flat ? <FactStrip f={f} /> : <FactTile f={f} />;
const prod = (i: number): Cell => (x, key) => <ProductCard p={YARD_CLEANUP[i]} x={x} slotKey={key} />;

function App() {
  // A search for a kind of equipment arrives here with ?type=; open its tile.
  useEffect(() => {
    const id = new URLSearchParams(location.search).get("type"); if (!id) return;
    const t = setTimeout(() => { const el = document.querySelector<HTMLButtonElement>(`#pw-${id} .media__open`); el?.scrollIntoView({ block: "center" }); el?.click(); }, 600);
    return () => clearTimeout(t);
  }, []);
  return (
    <Page current={PAGES.outdoor} source={REFERENCE.outdoor} crumbs={["Home", "Outdoors", "Outdoor Power Equipment"]}>
      <div className="wrap titlerow"><h1 className="pagetitle">OUTDOOR POWER EQUIPMENT</h1></div>
      <div className="wrap withnav">
        <nav className="sidenav" aria-label="Outdoor power equipment categories">
          <ul>{POWER_NAV.map((n, i) => <li key={n}>{i === 0 ? <span aria-current="true">{n}</span> : <span>{n}</span>}</li>)}</ul>
        </nav>
        <div className="withnav__main">
          <GridBand id="promos" title="Offers" quiet lead variant={1}
            cells={[() => <PromoCard tone="orange" title="SAVE BIG ON OUTDOOR POWER" body="Shop limited-time deals on select outdoor power equipment to elevate your curb appeal." cta="Shop Now" photoKey="mower" />, () => <PromoCard tone="dark" title="GET IT FAST WITH SAME DAY DELIVERY" body="Select in-stock items ordered by 4 p.m., subject to availability." cta="Shop Now" photoKey="generator" />, fact(FACTS.sixty)]} />
          <GridBand id="by-type" title="OUTDOOR POWER EQUIPMENT BY TYPE" sub="Open a type for what to look for and three picks" variant={0} cells={POWER.slice(0, 6).map(power)} />
          <GridBand id="by-type-2" title="Lawn and yard" quiet variant={3} from={2} cells={POWER.slice(6, 10).map(power)} strip={power(POWER[10])} />
          <GridBand id="by-type-3" title="Riding, spraying and trimming" quiet variant={5} cells={POWER.slice(11, 17).map(power)} />
          <GridBand id="by-type-4" title="Parts and the rest" quiet variant={2} cells={[power(POWER[17]), fact(FACTS.types), fact(FACTS.mowers)]} />
          <GridBand id="savings" title="Outdoor Power Savings" variant={4} from={2} cells={[prod(0), prod(2), prod(5), prod(7)]} strip={prod(6)} />
        </div>
      </div>
    </Page>
  );
}
createRoot(document.getElementById("root")!).render(<StrictMode><App /></StrictMode>);
