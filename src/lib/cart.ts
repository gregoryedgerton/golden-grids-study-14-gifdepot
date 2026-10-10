import { useSyncExternalStore } from "react";

/**
 * The cart. The reference keeps one on an account; the study has none, so
 * lines live in this tab's session storage and go with the tab. Nothing is
 * sent and nothing can be bought.
 */
export interface Line { id: string; name: string; price: number; qty: number; plan?: string }
const KEY = "gg14-cart";
let lines: Line[] = [];
try { lines = JSON.parse(sessionStorage.getItem(KEY) ?? "[]"); } catch { lines = []; }
const listeners = new Set<() => void>();
const emit = () => { try { sessionStorage.setItem(KEY, JSON.stringify(lines)); } catch { /* keep it in memory */ } listeners.forEach((l) => l()); };

export function addToCart(item: Omit<Line, "qty">, qty = 1) {
  const key = (l: Line) => `${l.id}|${l.plan ?? ""}`;
  const same = lines.find((l) => key(l) === key({ ...item, qty }));
  lines = same ? lines.map((l) => (l === same ? { ...l, qty: Math.min(50, l.qty + qty) } : l)) : [...lines, { ...item, qty }];
  emit();
}
export function setQty(id: string, plan: string | undefined, qty: number) { lines = lines.map((l) => (l.id === id && l.plan === plan ? { ...l, qty } : l)).filter((l) => l.qty > 0); emit(); }
export function clearCart() { lines = []; emit(); }
export function useCart(): Line[] { return useSyncExternalStore((l) => { listeners.add(l); return () => listeners.delete(l); }, () => lines, () => lines); }
export const count = (ls: Line[]) => ls.reduce((n, l) => n + l.qty, 0);
export const subtotal = (ls: Line[]) => ls.reduce((n, l) => n + l.price * l.qty, 0);
