/**
 * The study's own line icons on a 24-unit grid with a round 1.7-unit stroke.
 * None is copied from the reference. `Icon` is inline and takes the text
 * colour; `Imprint` is the same drawing set large and faint behind a
 * square's text.
 */
const PATHS = {
  search: "M10.5 17a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13zM15.5 15.5 21 21",
  cart: "M3 4h2.5l2 11h10.500l2-8H7M10 20h.01M17 20h.01",
  store: "M4 10v10h16V10M3 10l1.500-5h15L21 10M3 10h18M9 20v-6h6v6",
  truck: "M2.500 6h11v10h-11zM13.500 9h4l3 3v4h-7M7 18.500a1.500 1.500 0 1 0 0-3 1.500 1.500 0 0 0 0 3zM17 18.500a1.500 1.500 0 1 0 0-3 1.500 1.500 0 0 0 0 3z",
  user: "M12 11a3.500 3.500 0 1 0 0-7 3.500 3.500 0 0 0 0 7zM5 20a7 7 0 0 1 14 0",
  grid: "M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z",
  wrench: "M14.500 6.500a4 4 0 0 0 4.800 5l-2 2 4 4-2 2-4-4-2 2a4 4 0 0 0-5-4.800L3 7.500 6 4.500l8.500 2zM4 20l6-6",
  hammer: "M4 20 13 11M10 5l3-2 7 5-1 3-3-1-3.500 3.500-4-4zM13 11",
  star: "m12 3 2.800 5.800 6.200.9-4.500 4.400 1 6.300L12 17.400 6.500 20.400l1-6.300L3 9.700l6.200-.9L12 3z",
  check: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM8 12.200l2.700 2.800L16 9.500",
  leaf: "M5 19c0-8 5-13 14-14 0 9-5 14-14 14zM5 19l8-8",
  bolt: "M13 3 5 14h6l-1 7 8-11h-6l1-7z",
  tag: "M3.500 12.500V4h8.500l8.500 8.500-8 8-9-8zM8 8.500h.01",
  wind: "M3 9h10a3 3 0 1 0-3-3M3 15h14a3 3 0 1 1-3 3M3 12h7",
  saw: "M3 15 14 4l6 6L9 21M6 12l2 2M9 9l2 2M12 6l2 2",
  axe: "M5 20 15 10M12 4c4-1 7 2 8 6l-4 1-4-3zM10 6l2 2",
  snow: "M12 3v18M4 7.500l16 9M4 16.500l16-9M9 4l3 2 3-2M9 20l3-2 3 2",
  box: "M3.500 8.500 12 4l8.500 4.500v8L12 21l-8.500-4.500v-8zM3.500 8.500 12 13l8.500-4.500M12 13v8",
  gear: "M12 15.500a3.500 3.500 0 1 0 0-7 3.500 3.500 0 0 0 0 7zM12 3v3M12 18v3M3 12h3M18 12h3M5.600 5.600l2.100 2.100M16.300 16.300l2.100 2.100M5.600 18.400l2.100-2.100M16.300 7.700l2.100-2.100",
  trim: "M3 17h18M5 17V9M9 17V6M13 17v-8M17 17V8M21 17V10",
  mower: "M4 18h14M6 18V9h10l2 4v5M2 6h5l1 3M9 21a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM17 21a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
  tractor: "M3 17V9h8v8M11 12h5l3 5M6 20a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM18 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM8 5h3v4",
  drop: "M12 3s6 6 6 11a6 6 0 0 1-12 0c0-5 6-11 6-11z",
  rug: "M3 7h18v10H3zM6 10h12M6 14h12",
  bath: "M4 12h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-3zM6 12V6a2 2 0 0 1 4 0M7 19l-1 2M17 19l1 2",
  tile: "M4 4h8v8H4zM12 12h8v8h-8zM12 4h8v8M4 12h8v8",
  fridge: "M6 3h12v18H6zM6 10h12M9 6v1M9 13v3",
  door: "M7 3h10v18H7zM14.500 12h.01",
  sofa: "M4 11V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3M3 11h18v6H3zM5 17v2M19 17v2",
  washer: "M5 3.500h14v17H5zM5 7.500h14M12 18a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  range: "M5 4h14v16H5zM5 9h14M8 6.500h.01M12 6.500h.01M16 6.500h.01M8 12h8v5H8z",
  dish: "M5 4h14v16H5zM5 8h14M12 18a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  fan: "M12 12c0-4 2-6 5-6 0 3-2 6-5 6zM12 12c4 0 6 2 6 5-3 0-6-2-6-5zM12 12c0 4-2 6-5 6 0-3 2-6 5-6zM12 12c-4 0-6-2-6-5 3 0 6 2 6 5z",
  ghost: "M6 20V10a6 6 0 0 1 12 0v10l-2-2-2 2-2-2-2 2-2-2zM10 10h.01M14 10h.01",
  drill: "M3 8h13l3 2v3h-3v6h-4v-6H3zM19 10h2",
  pin: "M12 21s-6.500-6-6.500-11a6.500 6.500 0 0 1 13 0c0 5-6.500 11-6.500 11zM12 12.200a2.200 2.200 0 1 0 0-4.400 2.200 2.200 0 0 0 0 4.400z",
  phone: "M7 3h10v18H7zM11 18h2",
  minus: "M5 12h14",
  plus: "M12 5v14M5 12h14",
} as const;
export type IconName = keyof typeof PATHS;

export function Icon({ name, size = 24, className }: { name: IconName; size?: number; className?: string }) {
  return (
    <svg className={`icon${className ? ` ${className}` : ""}`} viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d={PATHS[name]} />
    </svg>
  );
}

export function Imprint({ name }: { name: IconName }) {
  return (
    <svg className="box__imprint" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d={PATHS[name]} />
    </svg>
  );
}

/** A filled star, for a rating. */
export function Star({ on = true }: { on?: boolean }) {
  return <svg className="star" viewBox="0 0 24 24" width="12" height="12" aria-hidden="true" focusable="false"><path fill={on ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5" d="m12 2.500 2.900 6.300 6.800.700-5.100 4.600 1.500 6.700L12 17.300l-6.100 3.500 1.500-6.700L2.300 9.500l6.800-.700L12 2.500z" /></svg>;
}
