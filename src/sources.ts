/** Where the facts come from. A square names its source by key; the credits list every source the page drew on. */
export const SOURCES = {
  hd: { ref: true, short: "homedepot.com", full: "The Home Depot, homedepot.com: the home page, Outdoor Power Equipment, Halloween Decorations and a product page, as shown on October 9, 2026", url: "https://www.homedepot.com/" },
} as const;
export type SourceKey = keyof typeof SOURCES;
export const cited = new Set<SourceKey>();
