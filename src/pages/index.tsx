import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Page } from "../lib/Page";
import { GridBand, type Cell } from "../bands/bands";
import { CategoryTile, FactStrip, FactTile, PromoCard, ProductCard, Pic, type Fact } from "../lib/cards";
import { Icon } from "../icons";
import { APPLIANCE_SAVINGS, ESSENTIALS, FACTS, HOME_DEALS, PAGES, REFERENCE, TOP_CATEGORIES, WORKSHOP, YARD_CLEANUP, usd, type Product } from "../content";
import "../styles.css";

const product = (p: Product): Cell => (x, key) => <ProductCard p={p} x={x} slotKey={key} href={p.id === "sapling" || p.group === "halloween" ? PAGES.halloween : undefined} />;
const fact = (f: Fact): Cell => (_x, _k, flat) => flat ? <FactStrip f={f} /> : <FactTile f={f} />;
const tile = (i: number): Cell => () => <CategoryTile c={TOP_CATEGORIES[i]} />;
const range = (a: number, b: number) => TOP_CATEGORIES.slice(a, b).map((_, i) => tile(a + i));

function App() {
  return (
    <Page current={PAGES.home} source={REFERENCE.home}>
      <h1 className="visually-hidden">GIFdepot: tools, outdoor power equipment, appliances and Halloween decorations</h1>
      <GridBand id="promos" title="Offers" quiet lead variant={0} from={3}
        cells={[
          () => <PromoCard tone="orange" title="UP TO $500 OFF Select Appliances + Free Delivery" body="On purchases of $396 or more. Plus 12 months financing on appliance purchases of $299 or more." cta="Shop Now" photoKey="kitchen" />,
          () => <PromoCard tone="dark" title="Tool Savings: Nail Your Next Project" cta="Shop Now" photoKey="tool-wall" />,
          () => <PromoCard tone="orange" title="Last Call for Halloween" body="Final days to haunt your home." cta="Shop Now" href={PAGES.halloween} photoKey="haunted-yard" />,
        ]}
        strip={fact(FACTS.sixty)} />
      <GridBand id="top-categories" title="Top Categories" sub="What customers are shopping in your neighbourhood" variant={1} cells={range(0, 6)} />
      <GridBand id="more-categories" title="More categories" variant={4} from={2} cells={range(6, 11)} strip={tile(11)} />
      <GridBand id="categories-3" title="Still more categories" quiet variant={2} cells={range(12, 18)} />
      <GridBand id="outdoor-sale" title="Up to 35% off Select Power Tools, Outdoor Power Equipment & Accessories" sub="Today only. Fast free delivery. Ends in 4 hrs 6 mins." variant={3} aside={{ href: PAGES.outdoor, label: "Outdoor Power Equipment" }}
        cells={[product(HOME_DEALS[0]), product(HOME_DEALS[4]), product(HOME_DEALS[5]), product(HOME_DEALS[1])]} strip={product(HOME_DEALS[2])} from={3} />
      <GridBand id="savings" title="Top Savings For You" variant={5} cells={[product(HOME_DEALS[3]), product(HOME_DEALS[6]), product(HOME_DEALS[7]), fact(FACTS.limit)]} />
      <GridBand id="appliances" title="Appliance Savings" sub="Shop all savings" variant={2} from={2}
        cells={APPLIANCE_SAVINGS.map((a): Cell => () => (
          <FactTile f={{ line: usd(a.now, false), label: a.name, body: `Was ${usd(a.was, false)}. You save ${usd(a.was - a.now, false)}.`, icon: a.icon, tone: "tile" }} />
        ))}
        strip={fact({ line: "$500", label: "Off select appliances", tone: "orange" })} />
      <GridBand id="essentials" title="Home Essentials" variant={0}
        cells={ESSENTIALS.map((e): Cell => () => (
          <div className="box box--tile essential">
            {e.photo && <div className="essential__photo"><Pic k={e.photo} /></div>}
            {!e.photo && e.icon && <div className="essential__photo essential__photo--icon"><Icon name={e.icon} size={64} /></div>}
            <div className="essential__text"><h3>{e.name}</h3><p>{e.body}</p></div>
          </div>
        ))}
        strip={fact(FACTS.workshop)} from={3} />
      <GridBand id="fall-yard" title="FALL YARD CLEANUP" variant={1} aside={{ href: PAGES.outdoor, label: "Shop outdoor power" }}
        cells={YARD_CLEANUP.slice(0, 5).map(product)} />
      <GridBand id="fall-yard-2" title="More for the yard" quiet variant={3} cells={YARD_CLEANUP.slice(5).map(product)} />
      <GridBand id="workshops" title={WORKSHOP.title} variant={2} from={2}
        cells={[() => <PromoCard tone="orange" title={WORKSHOP.title} body={WORKSHOP.body} cta={WORKSHOP.cta} photoKey="drill" />, fact(FACTS.sixty), fact(FACTS.types), fact(FACTS.mowers)]} strip={fact(FACTS.limit)} />
    </Page>
  );
}
createRoot(document.getElementById("root")!).render(<StrictMode><App /></StrictMode>);
