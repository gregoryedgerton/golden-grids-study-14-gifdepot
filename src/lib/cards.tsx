import { useState, type ReactNode } from "react";
import { ExpandedCell, type ExpandGroup } from "./expand";
import { Fact as FactBox } from "./boxes";
import { Fit } from "./fit";
import { Icon, Imprint, Star, type IconName } from "../icons";
export { Icon };
import { photo, seen } from "../photos";
import { addToCart } from "./cart";
import { usd, type PowerType, type Product } from "../content";

/**
 * What goes in a square. The reference's product card is a photograph over a
 * badge, a rating, a model number, a name of up to three lines, a price with
 * its cents raised, the amount saved, and an orange Add to Cart. Here the
 * same card takes whatever square the grid gives it and its type scales with
 * that square (`--u`, set in styles.css from the square's side): what a square
 * cannot hold it leaves out whole, in steps. The photograph is the control
 * that opens the square to the rest.
 */

export function Pic({ k, sizes = "(min-width: 1100px) 50vw, 100vw", eager, pos }: { k: string; sizes?: string; eager?: boolean; pos?: string }) {
  const p = photo(k);
  seen.add(k);
  return <img src={p.src} srcSet={p.srcSet} sizes={sizes} alt={p.alt} loading={eager ? "eager" : "lazy"} decoding="async" style={pos ? { objectPosition: pos } : undefined} />;
}

export function Credit({ k, standIn = true }: { k: string; standIn?: boolean }) {
  const p = photo(k);
  return <figcaption className="credit">Photograph: <a href={p.page}>{p.credit}</a>, {p.source}, {p.licence}.{standIn ? " It stands in for the product and does not show it." : ""}</figcaption>;
}

/** Price as the reference sets it: a small $, the dollars large, the cents raised. */
export function Price({ n, big }: { n: number; big?: boolean }) {
  const [d, c] = n.toFixed(2).split(".");
  return <span className={`price${big ? " price--big" : ""}`}><span className="price__sign">$</span><span className="price__d">{Number(d).toLocaleString("en-US")}</span><span className="price__c">{c}</span><span className="visually-hidden">{usd(n)}</span></span>;
}

export function Stars({ r, count, label }: { r: number; count: number; label?: string }) {
  return (
    <span className="stars" role="img" aria-label={`${r} out of 5 stars from ${count.toLocaleString("en-US")} reviews${label ? `, ${label}` : ""}`}>
      {[1, 2, 3, 4, 5].map((i) => <Star key={i} on={r >= i - 0.25} />)}
      <span className="stars__n" aria-hidden="true">({r} / {count.toLocaleString("en-US")})</span>
    </span>
  );
}

/** An orange Add to Cart, which says so when it has. */
export function AddButton({ id, name, price, plan, qty = 1, wide }: { id: string; name: string; price: number; plan?: string; qty?: number; wide?: boolean }) {
  const [done, setDone] = useState(false);
  return (
    <button type="button" className={`btn btn--orange${wide ? " btn--wide" : ""}`} aria-label={`Add to cart: ${name}`} onClick={() => { addToCart({ id, name, price, plan }, qty); setDone(true); setTimeout(() => setDone(false), 1800); }}>
      {done ? "Added" : "Add to Cart"}<span className="visually-hidden" role="status">{done ? " to your cart" : ""}</span>
    </button>
  );
}

export function ProductCard({ p, x, slotKey, href }: { p: Product; x: ExpandGroup; slotKey: string; href?: string }) {
  const save = p.was ? p.was - p.price : 0;
  return (
    <>
      <article className="card card--product">
        <div className="card__media">
          <Pic k={p.photo} pos={p.pos} />
          <button className="media__open" {...x.triggerProps(slotKey)}><span className="visually-hidden">More: {p.name}</span></button>
          {p.badge && <span className={`card__badge card__badge--${p.badge === "Exclusive" ? "ex" : "top"}`}>{p.badge}</span>}
          <span className="card__pill" aria-hidden="true">{usd(p.price)}</span>
        </div>
        <div className="card__text">
          {p.options && <p className="card__opts card__line--more">+more options</p>}
          <p className="card__rate card__line--more"><Stars r={p.rating} count={p.count} /></p>
          <p className="card__model card__line--more">Model# {p.model}</p>
          <p className="card__title">{p.name}</p>
          {p.limit && <p className="card__limit card__line--more">Limit 50 per order</p>}
          <p className="card__price"><Price n={p.price} />{p.was && <s className="card__was">{usd(p.was)}</s>}</p>
          {save > 0 && <p className="card__save card__line--more">Save {usd(save)} ({Math.round((save / p.was!) * 100)}%)</p>}
          <p className="card__add"><AddButton id={p.id} name={p.name} price={p.price} /></p>
        </div>
      </article>
      {x.isOpen(slotKey) && (
        <ExpandedCell id={x.panelId(slotKey)} title={p.name} onClose={x.close} closeRef={x.closeRef}>
          <div className="cell__split">
            <figure className="cell__photo"><Pic k={p.photo} sizes="(min-width: 1100px) 60vw, 100vw" pos={p.pos} /><Credit k={p.photo} /></figure>
            <div className="detail">
              <p className="detail__kicker">{p.badge ? `${p.badge} · ` : ""}Model# {p.model}</p>
              <p className="detail__lead">{p.name}</p>
              <p className="detail__rate"><Stars r={p.rating} count={p.count} /></p>
              <p className="detail__price"><Price n={p.price} big />{p.was && <> <s>{usd(p.was)}</s> <span className="card__save">Save {usd(save)} ({Math.round((save / p.was) * 100)}%)</span></>}</p>
              {p.limit && <p className="note">Limit 50 per order.</p>}
              <p className="detail__actions"><AddButton id={p.id} name={p.name} price={p.price} wide />{href && <a className="btn btn--quiet" href={href}>See the product page</a>}</p>
              <p className="note">The product, its model number, rating and price are invented for this study. Nothing can be bought.</p>
            </div>
          </div>
        </ExpandedCell>
      )}
    </>
  );
}

/** A department tile: a photograph or a drawing over the name, outlined as the reference outlines them. */
export function CategoryTile({ c }: { c: { name: string; photo?: string; icon: IconName; href?: string } }) {
  const inner = (
    <>
      <span className="tile__art">{c.photo ? <Pic k={c.photo} sizes="(min-width: 1100px) 20vw, 40vw" /> : <Icon name={c.icon} size={56} />}</span>
      <span className="tile__name">{c.name}</span>
    </>
  );
  return c.href ? <a className="tile" href={c.href}>{inner}</a> : <div className="tile tile--show">{inner}</div>;
}

/** An outdoor power type: its photograph or drawing and name; it opens in place to a note and three picks. */
export function PowerTile({ t, x, slotKey }: { t: PowerType; x: ExpandGroup; slotKey: string }) {
  return (
    <>
      <div className="tile tile--open" id={`pw-${t.id}`}>
        <span className="tile__art">{t.photo ? <Pic k={t.photo} sizes="(min-width: 1100px) 20vw, 40vw" /> : <Icon name={t.icon} size={56} />}</span>
        <span className="tile__name">{t.name}</span>
        <button className="media__open" {...x.triggerProps(slotKey)}><span className="visually-hidden">More: {t.name}</span></button>
      </div>
      {x.isOpen(slotKey) && (
        <ExpandedCell id={x.panelId(slotKey)} title={t.name} onClose={x.close} closeRef={x.closeRef}>
          <div className="detail detail--wide">
            <p className="detail__lead">{t.blurb}</p>
            <ul className="picks">
              {t.picks.map((p, i) => (
                <li key={p.name}>
                  <span className="picks__name">{p.name}</span>
                  <Stars r={p.rating} count={p.count} />
                  <span className="picks__price"><Price n={p.price} />{p.was && <s>{usd(p.was)}</s>}</span>
                  <AddButton id={`${t.id}-${i}`} name={p.name} price={p.price} />
                </li>
              ))}
            </ul>
            {t.photo && <figure className="cell__photo"><Pic k={t.photo} sizes="(min-width: 1100px) 60vw, 100vw" /><Credit k={t.photo} /></figure>}
            <p className="note">The products and their prices are invented for this study. Nothing can be bought.</p>
          </div>
        </ExpandedCell>
      )}
    </>
  );
}

/** A promotion: a headline and a call to action on a flat orange or dark block, with a photograph. */
export function PromoCard({ title, body, cta, href, tone = "orange", photoKey, pos, onClick }: { title: string; body?: string; cta: string; href?: string; tone?: "orange" | "dark" | "ink"; photoKey?: string; pos?: string; onClick?: () => void }) {
  const action = href ? <a className="btn btn--white" href={href}>{cta}</a> : onClick ? <button type="button" className="btn btn--white" onClick={onClick} aria-label={`${cta}: ${title}`}>{cta}</button> : <span className="btn btn--white">{cta}</span>;
  return (
    <div className={`box promo promo--${tone}`}>
      {photoKey && <div className="promo__photo"><Pic k={photoKey} sizes="(min-width: 1100px) 50vw, 100vw" pos={pos} /></div>}
      <div className="promo__text">
        <div className="box__fit"><Fit as="p" className="fit--title" min={10} max={64}>{title}</Fit></div>
        {body && <div className="box__body"><Fit as="div" className="fit--body" min={12} max={22}><p>{body}</p></Fit></div>}
        <div className="box__foot">{action}</div>
      </div>
    </div>
  );
}

/** A photograph on its own, opening to itself. */
export function PhotoCard({ k, title, x, slotKey, children }: { k: string; title: string; x: ExpandGroup; slotKey: string; children?: ReactNode }) {
  return (
    <>
      <figure className="card card--photo">
        <div className="card__media">
          <Pic k={k} eager />
          <button className="media__open" {...x.triggerProps(slotKey)}><span className="visually-hidden">Open the photograph: {title}</span></button>
          {children}
        </div>
      </figure>
      {x.isOpen(slotKey) && (
        <ExpandedCell id={x.panelId(slotKey)} title={title} onClose={x.close} closeRef={x.closeRef}>
          <figure className="cell__photo cell__photo--full"><Pic k={k} sizes="100vw" /><Credit k={k} /></figure>
        </ExpandedCell>
      )}
    </>
  );
}

export interface Fact { line: string; label?: string; body?: string; tone?: "tile" | "orange" | "dark"; icon?: IconName; short?: string }

/** A figure as large type on a flat rounded tile. */
export function FactTile({ f }: { f: Fact }) {
  return (
    <FactBox imprint={f.icon ? <Imprint name={f.icon} /> : undefined} label={f.label} fitClass="fit--display fit--num" max={150} tone={`${f.tone ?? "tile"}${(f.body?.length ?? 0) > 110 ? " box--wordy" : ""}`} body={f.body ? <p>{f.body}</p> : undefined}>
      {f.line}
    </FactBox>
  );
}

/** The collapsed strip of a skipped range: a figure and its label. */
export function FactStrip({ f }: { f: Fact }) {
  return (
    <div className={`box box--strip box--${f.tone ?? "tile"}`} role="group" aria-label={`${f.line}: ${f.label}`}>
      {f.label && <p className="box__label">{f.short ?? f.label}</p>}
      <div className="box__fit"><Fit as="span" className="fit--display fit--num" min={8} max={150}>{f.line}</Fit></div>
    </div>
  );
}
