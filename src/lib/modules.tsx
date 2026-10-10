import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { Icon } from "../icons";
import { seen, photo } from "../photos";
import { SOURCES, cited, type SourceKey } from "../sources";
import { COLLECTIONS, PDP, SEO, usd } from "../content";
import { AddButton, Price, Stars } from "./cards";

/** Flat modules: bars, lists and forms. They are not grids because their content has no hierarchy to descend. */

/** The email offer that ends every page. It sends nothing and says so. */
export function EmailSignup() {
  const [sent, setSent] = useState(false);
  return (
    <section className="signup" aria-labelledby="signup-title">
      <form className="wrap signup__row" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
        <h2 id="signup-title">Get $5 off when you sign up for emails with savings and tips.</h2>
        <label className="visually-hidden" htmlFor="signup-email">Email address</label>
        <input id="signup-email" type="email" required placeholder="Email address" autoComplete="email" />
        <button type="submit" className="btn btn--orange">GO</button>
        <p className="note" role="status">{sent ? "Nothing was sent: this is a layout study, and there is no list." : "A form that sends nothing."}</p>
      </form>
    </section>
  );
}

/** A bar that sticks under the notice tells the page its height, so an opened square's head and in-page links clear it. */
export function useBarHeight<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useLayoutEffect(() => {
    const el = ref.current; if (!el) return;
    const set = () => document.documentElement.style.setProperty("--bar-h", `${Math.round(el.getBoundingClientRect().height)}px`);
    set();
    const ro = new ResizeObserver(set); ro.observe(el);
    return () => { ro.disconnect(); document.documentElement.style.removeProperty("--bar-h"); };
  }, []);
  return ref;
}

export type Sort = "featured" | "low" | "high" | "rated";
export function FilterBar({ q, setQ, collections, toggle, sort, setSort, count, total, clear, maxPrice, setMaxPrice }: {
  q: string; setQ: (s: string) => void; collections: string[]; toggle: (c: string) => void; sort: Sort; setSort: (s: Sort) => void; count: number; total: number; clear: () => void; maxPrice: number; setMaxPrice: (n: number) => void;
}) {
  const ref = useBarHeight<HTMLDivElement>();
  const any = q || collections.length || maxPrice < 300;
  return (
    <div className="filterbar" ref={ref}>
      <div className="wrap filterbar__row">
        <div className="chips" role="group" aria-label="Collection">
          {COLLECTIONS.map((c) => <button key={c} type="button" className="chip" aria-pressed={collections.includes(c)} onClick={() => toggle(c)}>{c}</button>)}
        </div>
        <label className="filterbar__field"><span>Search these</span><input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Name or model" /></label>
        <label className="filterbar__field"><span>Up to {maxPrice >= 300 ? "any price" : usd(maxPrice)}</span><input type="range" min={100} max={300} step={50} value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} /></label>
        <label className="filterbar__field"><span>Sort by</span>
          <select value={sort} onChange={(e) => setSort(e.target.value as Sort)}><option value="featured">Best match</option><option value="low">Price low to high</option><option value="high">Price high to low</option><option value="rated">Top rated</option></select>
        </label>
        <p className="filterbar__count" role="status" aria-live="polite">{count} of {total} results</p>
        {any && <button type="button" className="textbtn" onClick={clear}>Clear all</button>}
      </div>
    </div>
  );
}

/** The product page's buy box: quantity, how to get it, a protection plan, and the total. The study's own sums. */
export function BuyBox() {
  const [qty, setQty] = useState(1);
  const [how, setHow] = useState<"pickup" | "delivery">("pickup");
  const [plan, setPlan] = useState("none");
  const p = PDP.plans.find((x) => x.id === plan)!;
  const price = 129, was = 179;
  const total = (price + p.price) * qty;
  const id = useId();
  return (
    <section className="buy" aria-labelledby="buy-title">
      <h2 id="buy-title" className="visually-hidden">Buy this product</h2>
      <p className="buy__price"><span className="buy__special">Special Buy</span><Price n={price} big /><s>{usd(was)}</s><span className="card__save">Save {usd(was - price)} (28%)</span></p>
      <p className="buy__fin">{PDP.financing} <span className="showonly">Apply for a GIFdepot Consumer Card</span></p>
      <fieldset className="buy__how">
        <legend>How would you like it?</legend>
        <label className={how === "pickup" ? "is-on" : undefined}><input type="radio" name={`${id}-how`} checked={how === "pickup"} onChange={() => setHow("pickup")} /><span><strong>Pickup at {PDP.stock.store}</strong>Tomorrow<em>{PDP.stock.inStock} in stock · {PDP.stock.aisle}</em></span><b>FREE</b></label>
        <label className={how === "delivery" ? "is-on" : undefined}><input type="radio" name={`${id}-how`} checked={how === "delivery"} onChange={() => setHow("delivery")} /><span><strong>Delivery to {PDP.stock.zip}</strong>Tomorrow<em>{PDP.stock.delivery} available</em></span><b>FREE</b></label>
      </fieldset>
      <fieldset className="buy__plans">
        <legend>Protect this item: a protection plan</legend>
        {PDP.plans.map((pl) => <label key={pl.id} className={plan === pl.id ? "is-on" : undefined}><input type="radio" name={`${id}-plan`} checked={plan === pl.id} onChange={() => setPlan(pl.id)} /><span>{pl.label}{pl.price ? ` / ${usd(pl.price)}` : ""}</span></label>)}
      </fieldset>
      <div className="buy__row">
        <label className="buy__qty"><span>Qty</span>
          <span className="stepper"><button type="button" aria-label="One fewer" disabled={qty <= 1} onClick={() => setQty(qty - 1)}>−</button><output aria-live="polite">{qty}</output><button type="button" aria-label="One more" disabled={qty >= 50} onClick={() => setQty(qty + 1)}>+</button></span>
        </label>
        <AddButton id={PDP.id} name={`6 FT Boneyard Animated LED Barnaby the Last Call Barkeep, ${how}`} price={price + p.price} plan={p.price ? p.label : undefined} qty={qty} wide />
      </div>
      <p className="buy__total" role="status">{qty} × {usd(price + p.price)} = <strong>{usd(total)}</strong>{how === "delivery" ? ", delivered free" : ", picked up free"}</p>
      <p className="note">Free and easy returns in a store or online within 30 days of purchase. The study's own sums; nothing is bought.</p>
    </section>
  );
}

export function Specs() {
  return (
    <section className="flat" id="specs" aria-labelledby="specs-title">
      <div className="wrap flat__cols">
        <div className="prose">
          <h2 id="specs-title" className="flat__title">Product details</h2>
          <p>{PDP.more}</p>
          <ul className="bullets">{PDP.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
        </div>
        <div>
          <h2 className="flat__title">Specifications</h2>
          <table className="specs"><tbody>{PDP.specs.map(([k, v]) => <tr key={k}><th scope="row">{k}</th><td>{v}</td></tr>)}</tbody></table>
        </div>
      </div>
    </section>
  );
}

export function Ratings() {
  const total = PDP.stars.reduce((n, [, c]) => n + c, 0);
  return (
    <section className="flat" id="reviews" aria-labelledby="reviews-title">
      <div className="wrap">
        <h2 id="reviews-title" className="flat__title">Customer reviews and questions</h2>
        <div className="ratings">
          <p className="ratings__big"><strong>{PDP.rating}</strong><Stars r={PDP.rating} count={PDP.count} /><span>{PDP.count} reviews</span></p>
          <ul className="ratings__bars" aria-label="Reviews by stars">
            {PDP.stars.map(([s, c]) => <li key={s}><span>{s} stars</span><span className="bar" role="img" aria-label={`${c} of ${total}`}><i style={{ width: `${(c / total) * 100}%` }} /></span><span>{c}</span></li>)}
          </ul>
          <p className="ratings__qa"><strong>{PDP.qa}</strong> questions and answers</p>
        </div>
        <p className="note">The study shows the rating and how it divides, not the reviews. The counts are invented.</p>
      </div>
    </section>
  );
}

export function SeoText() {
  return (
    <section className="flat" aria-label="About Halloween decorations">
      <div className="wrap seo">{SEO.map(([h, t]) => <div key={h}><h2 className="flat__title">{h}</h2><p>{t}</p></div>)}</div>
    </section>
  );
}

/** Every photograph and every source on the page, for the disclosure. Rendered after the page has drawn. */
export function Credits() {
  const [keys, setKeys] = useState<string[]>([]);
  const [src, setSrc] = useState<SourceKey[]>([]);
  useEffect(() => {
    const read = () => {
      const k = [...seen], s = [...cited];
      setKeys((old) => (old.join() === k.join() ? old : k));
      setSrc((old) => (old.join() === s.join() ? old : s));
    };
    read();
    const t = setInterval(read, 1500);
    return () => clearInterval(t);
  }, []);
  return (
    <>
      {keys.length > 0 && (
        <details>
          <summary>Photographs on this page ({keys.length})</summary>
          <ul>{keys.map((k) => { const p = photo(k); return <li key={k}>{p.alt}. <a href={p.page}>{p.credit}</a>, {p.source}, {p.licence}.</li>; })}</ul>
        </details>
      )}
      {src.length > 0 && (
        <details>
          <summary>Sources for the page ({src.length})</summary>
          <ul>{src.map((k) => <li key={k}>{SOURCES[k].full}</li>)}</ul>
        </details>
      )}
    </>
  );
}

export { Icon };
