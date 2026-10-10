import { useEffect, useRef, useState, type ReactNode } from "react";
import { Tools } from "./tools";
import { StudyBanner, StudyDisclosure } from "./study";
import { Credits, EmailSignup } from "./modules";
import { Icon } from "../icons";
import { DEPARTMENTS, FOOTER, HALLOWEEN, HEADER, PAGES, POPULAR, POWER, PROMO_BAR, usd } from "../content";
import { clearCart, count, setQty, subtotal, useCart } from "./cart";
import { useFontsReady } from "./fonts";

/**
 * The shell, after the reference's: a promotion bar, then the header (the
 * mark, the store and the delivery zip, a search field with its orange
 * button, and Shop All, Services, DIY, Log In and Cart as icons over their
 * names), a footer of lists, and the email offer. The items are the
 * reference's, for show; the study's pages are the links, and the cart and
 * the search work on the study's own products. Nothing in the shell leaves
 * for the reference: its pages are linked only from the notice and the
 * disclosure.
 */
function Search() {
  const [q, setQ] = useState("");
  const [msg, setMsg] = useState("");
  const go = () => {
    const needle = q.trim().toLowerCase(); if (!needle) return;
    const power = POWER.find((t) => t.name.toLowerCase().includes(needle) || needle.includes(t.name.toLowerCase().replace(/s$/, "")));
    if (power) { location.href = `${PAGES.outdoor}?type=${power.id}`; return; }
    if (/halloween|skelet|animat|pumpkin|tomb|ghost|witch|decor|giant/.test(needle) || HALLOWEEN.some((p) => p.name.toLowerCase().includes(needle))) { location.href = `${PAGES.halloween}?q=${encodeURIComponent(needle)}`; return; }
    setMsg(`Nothing for "${q.trim()}": the study holds outdoor power equipment and Halloween decorations.`);
  };
  return (
    <form className="search" role="search" onSubmit={(e) => { e.preventDefault(); go(); }}>
      <label className="visually-hidden" htmlFor="q">What can we help you find today?</label>
      <input id="q" type="search" placeholder="What can we help you find today?" value={q} onChange={(e) => { setQ(e.target.value); setMsg(""); }} />
      <button type="submit" aria-label="Search"><Icon name="search" size={20} /></button>
      <span className="search__msg" role="status">{msg}</span>
    </form>
  );
}

function CartButton() {
  const lines = useCart();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);
  useEffect(() => { if (!open) return; const k = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(false); ref.current?.focus(); } }; window.addEventListener("keydown", k); return () => window.removeEventListener("keydown", k); }, [open]);
  const n = count(lines);
  return (
    <>
      <button type="button" ref={ref} className="hnav__item hnav__cart" aria-expanded={open} aria-controls="cart-panel" onClick={() => setOpen(!open)}>
        <span className="hnav__icon"><Icon name="cart" size={26} /><span className="hnav__count" aria-hidden="true">{n}</span></span>
        <span>Cart<span className="visually-hidden">, {n} {n === 1 ? "item" : "items"}</span></span>
      </button>
      {open && (
        <section className="cartpanel" id="cart-panel" aria-label="Your cart">
          <div className="wrap cartpanel__in">
            <header className="cartpanel__head"><h2>Your cart ({n})</h2><button type="button" className="btn btn--quiet" onClick={() => { setOpen(false); ref.current?.focus(); }}>Close</button></header>
            {lines.length === 0 ? <p>Your cart is empty. Add a product and it shows here.</p> : (
              <>
                <ul className="cartpanel__lines">
                  {lines.map((l) => (
                    <li key={`${l.id}|${l.plan ?? ""}`}>
                      <span className="cartpanel__name">{l.name}{l.plan && <small> · {l.plan} protection plan</small>}</span>
                      <span className="stepper" role="group" aria-label={`Quantity of ${l.name}`}>
                        <button type="button" aria-label="One fewer" onClick={() => setQty(l.id, l.plan, l.qty - 1)}>−</button>
                        <output>{l.qty}</output>
                        <button type="button" aria-label="One more" disabled={l.qty >= 50} onClick={() => setQty(l.id, l.plan, l.qty + 1)}>+</button>
                      </span>
                      <span className="cartpanel__price">{usd(l.price * l.qty)}</span>
                    </li>
                  ))}
                </ul>
                <p className="cartpanel__total"><span>Subtotal</span><strong>{usd(subtotal(lines))}</strong></p>
                <p className="cartpanel__actions"><button type="button" className="btn btn--orange" onClick={() => clearCart()}>Check out</button><span className="note">Nothing is bought: checking out empties the cart.</span></p>
              </>
            )}
          </div>
        </section>
      )}
    </>
  );
}

export function Page({ current, source, crumbs, children }: { current: string; source: { label: string; url: string }; crumbs?: string[]; children: ReactNode }) {
  useFontsReady(["400 1em Inter", "700 1em Inter", "800 1em Inter"]);
  return (
    <>
      <a className="skip" href="#content">Skip to content</a>
      <StudyBanner />
      <Tools />
      <section className="promobar" aria-label="Offer"><span>{PROMO_BAR}</span> - <span className="promobar__link">Shop Now</span></section>
      <header className="top">
        <div className="wrap top__row">
          <a className="mark" href={PAGES.home} aria-label="GIFdepot home"><span className="mark__box">GIF<br />depot</span></a>
          <p className="top__store"><span><Icon name="store" size={18} />Hazlet <strong>6AM</strong></span><span><Icon name="truck" size={18} />07730</span></p>
          <Search />
          <nav className="hnav" aria-label="Account and shopping">
            <ul>
              {HEADER.map((h) => (
                <li key={h.label}>{h.href ? <a className="hnav__item" href={h.href} aria-current={h.href === current ? "page" : undefined}><span className="hnav__icon"><Icon name={h.icon} size={26} /></span><span>{h.label}</span></a> : <span className="hnav__item hnav__item--show"><span className="hnav__icon"><Icon name={h.icon} size={26} /></span><span>{h.label}</span></span>}</li>
              ))}
              <li><CartButton /></li>
            </ul>
          </nav>
        </div>
      </header>
      {crumbs && <nav className="wrap crumbs" aria-label="Breadcrumb"><ol>{crumbs.map((c, i) => <li key={c}>{i === crumbs.length - 1 ? <span aria-current="page">{c}</span> : c === "Home" ? <a href={PAGES.home}>{c}</a> : c === "Halloween Decorations" ? <a href={PAGES.halloween}>{c}</a> : c === "Outdoor Power Equipment" ? <a href={PAGES.outdoor}>{c}</a> : <span>{c}</span>}</li>)}</ol></nav>}
      <main id="content">{children}</main>
      <EmailSignup />
      <footer className="foot">
        <div className="wrap foot__top">
          <h2 className="foot__cats">Shop By Category</h2>
          <ul className="foot__depts">{DEPARTMENTS.map((d) => <li key={d.label}>{d.href ? <a href={d.href}>{d.label}</a> : <span>{d.label}</span>}</li>)}</ul>
          <h2 className="foot__cats">Popular Categories</h2>
          <ul className="foot__depts">{POPULAR.map((d) => <li key={d}>{d === "Halloween Decorations" ? <a href={PAGES.halloween}>{d}</a> : <span>{d}</span>}</li>)}</ul>
        </div>
        <div className="foot__dark">
          <div className="wrap foot__cols">
            {FOOTER.map(([title, items]) => (
              <div key={title}><h2>{title}</h2><ul>{items.map((i) => <li key={i}><span>{i}</span></li>)}</ul></div>
            ))}
            <div><h2>GIFdepot</h2><ul><li><a href={PAGES.home}>Home</a></li><li><a href={PAGES.outdoor}>Outdoor Power Equipment</a></li><li><a href={PAGES.halloween}>Halloween Decorations</a></li><li><a href={PAGES.product}>A product page</a></li></ul></div>
          </div>
          <p className="wrap foot__legal">© 2026 GIFdepot. Local store prices may vary from those displayed. Products shown as available are normally stocked but inventory levels cannot be guaranteed.</p>
        </div>
      </footer>
      <StudyDisclosure>
        <p>This page follows <a href={source.url}>{source.label}</a> as it was shown on October 9, 2026.</p>
        <Credits />
      </StudyDisclosure>
    </>
  );
}
