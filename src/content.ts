import type { IconName } from "./icons";
import type { SourceKey } from "./sources";

/**
 * Every word and number on the four pages.
 *
 * What is real: the categories, the kinds of product, the structure of each
 * page, and the facts that carry a `source`. What is invented: every product's
 * name and model number, its rating and review count, its stock and the
 * store. Prices follow the ones the reference showed on the day it was read,
 * so a card reads as one of its cards; the names do not. No maker's name is
 * used: a product here is described by what it is.
 */
export const PAGES = { home: "index.html", outdoor: "outdoor.html", halloween: "halloween.html", product: "product.html" } as const;

export const REFERENCE = {
  home: { label: "homedepot.com", url: "https://www.homedepot.com/" },
  outdoor: { label: "homedepot.com, Outdoor Power Equipment", url: "https://www.homedepot.com/b/Outdoors-Outdoor-Power-Equipment/N-5yc1vZbx5c" },
  halloween: { label: "homedepot.com, Halloween Decorations", url: "https://www.homedepot.com/b/Holiday-Decorations-Halloween-Decorations/N-5yc1vZc2ve" },
  product: { label: "homedepot.com, a 6 ft animated Halloween figure", url: "https://www.homedepot.com/p/Home-Accents-Holiday-6-FT-Grave-Bones-Animated-LED-John-the-Last-Call-Mixologist-26SV25320/339865644" },
} as const;

/** The header's items: the reference's own, for show, with the study's pages as links. */
export const HEADER: { label: string; icon: IconName; href?: string }[] = [
  { label: "Shop All", icon: "grid", href: PAGES.home },
  { label: "Services", icon: "wrench" },
  { label: "DIY", icon: "hammer" },
];

/** The reference's departments, for show; the three the study holds are links. */
export const DEPARTMENTS: { label: string; href?: string }[] = [
  { label: "Appliances" }, { label: "Bath & Faucets" }, { label: "Building Materials" }, { label: "Cleaning" }, { label: "Decor & Furniture" },
  { label: "Electrical" }, { label: "Flooring & Area Rugs" }, { label: "Garage" }, { label: "Hardware" },
  { label: "Halloween Decorations", href: PAGES.halloween }, { label: "Kitchen" }, { label: "Lawn & Garden" }, { label: "Lighting & Ceiling Fans" },
  { label: "Outdoor Power Equipment", href: PAGES.outdoor }, { label: "Outdoor Living" }, { label: "Paint" }, { label: "Plumbing" }, { label: "Storage & Organization" }, { label: "Tools" },
];

export const PROMO_BAR = "UP TO $500 OFF Select Appliances";

/* ---------- Products ---------- */

export interface Product {
  id: string; name: string; model: string; photo: string; rating: number; count: number; price: number; was?: number;
  badge?: "Top Rated" | "Exclusive"; limit?: boolean; options?: boolean; group: "tools" | "outdoor" | "home" | "halloween" | "yard"; collection?: string; feet?: number; pos?: string;
}

export const HALLOWEEN: Product[] = [
  { id: "bonesy", name: "6.5 FT Boneyard Animated LED App-Controlled Bonesy with LCD Eyes", model: "26SV24690", photo: "skeleton-porch", rating: 4.6, count: 3270, price: 279, badge: "Top Rated", limit: true, options: true, group: "halloween", collection: "Boneyard", feet: 6.5 },
  { id: "lilac", name: "7 FT Hollow Woods Animated LED App-Controlled Lethal Lilac", model: "26SV25589", photo: "witch", rating: 4.5, count: 60, price: 199, was: 299, badge: "Exclusive", options: true, group: "halloween", collection: "Hollow Woods", feet: 7 },
  { id: "barnaby", name: "6 FT Boneyard Animated LED Barnaby the Last Call Barkeep", model: "26SV25320", photo: "skeleton-close", rating: 4.6, count: 363, price: 129, was: 179, badge: "Exclusive", options: true, group: "halloween", collection: "Boneyard", feet: 6 },
  { id: "rat", name: "3.5 FT Hollow Woods Animated LED Plague Rat", model: "26SV25392", photo: "ghosts", rating: 3.9, count: 7, price: 89.98, was: 129, badge: "Exclusive", group: "halloween", collection: "Hollow Woods", feet: 3.5 },
  { id: "reggie", name: "9 FT Hollow Woods Giant-Sized LED Rotten Reggie", model: "26SV25324", photo: "reaper", rating: 4.1, count: 277, price: 199, was: 299, badge: "Exclusive", options: true, group: "halloween", collection: "Hollow Woods", feet: 9 },
  { id: "sprout", name: "6 FT Hollow Woods Color Changing LED Sulking Sprout", model: "25SV25036", photo: "scarecrow", rating: 4.1, count: 277, price: 129, was: 179, badge: "Exclusive", options: true, group: "halloween", collection: "Hollow Woods", feet: 6 },
  { id: "gourd", name: "8 FT Hollow Woods Giant-Sized Animated LED Grabby Gourd", model: "26SV25396", photo: "pumpkin-sign", rating: 4.3, count: 20, price: 199, was: 299, badge: "Exclusive", group: "halloween", collection: "Hollow Woods", feet: 8 },
  { id: "bramble", name: "8 FT Hollow Woods Giant-Sized Animated LED Bramble the Bog Troll", model: "25PA02392", photo: "haunted-yard", rating: 4, count: 145, price: 249, badge: "Exclusive", limit: true, options: true, group: "halloween", collection: "Hollow Woods", feet: 8 },
  { id: "merlot", name: "4.5 FT Boneyard Animated LED Merlot Mishap", model: "26SV24841", photo: "skeleton-yard", rating: 4.6, count: 366, price: 199, badge: "Exclusive", limit: true, options: true, group: "halloween", collection: "Boneyard", feet: 4.5 },
  { id: "twelve", name: "12 FT Giant-Sized Skeleton with LCD Eyes", model: "24SV24386", photo: "skulls", rating: 4.6, count: 3303, price: 299, badge: "Top Rated", options: true, group: "halloween", collection: "Boneyard", feet: 12 },
  { id: "hound", name: "3.5 FT Hollow Woods Animated LED Hell Hound", model: "26PA05422", photo: "tombstones", rating: 3.7, count: 32, price: 159, badge: "Exclusive", group: "halloween", collection: "Hollow Woods", feet: 3.5 },
  { id: "hare", name: "4.5 FT LED Halloween Hare in a Top Hat", model: "24SV24464", photo: "inflatables", rating: 4.4, count: 63, price: 129, badge: "Exclusive", limit: true, options: true, group: "halloween", collection: "Halloween Classics", feet: 4.5 },
  { id: "macabre", name: "7 FT Hollow Woods Animated LED Macabre Marm", model: "26SV25457", photo: "witch", rating: 4.4, count: 290, price: 159, badge: "Exclusive", options: true, group: "halloween", collection: "Hollow Woods", feet: 7 },
  { id: "raven", name: "6.5 FT Boneyard Animated LED Raven", model: "25PA02394", photo: "reaper", rating: 3.9, count: 91, price: 199, badge: "Exclusive", limit: true, group: "halloween", collection: "Boneyard", feet: 6.5 },
  { id: "stalker", name: "6.5 FT Hollow Woods Animated LED Stalking Scarecrow", model: "26SV25248", photo: "scarecrow", rating: 3.9, count: 40, price: 159, badge: "Exclusive", group: "halloween", collection: "Hollow Woods", feet: 6.5 },
  { id: "robber", name: "6.5 FT Boneyard Animated LED Grave Digger", model: "26PA05417", photo: "skeleton-horse", rating: 4.2, count: 31, price: 199, badge: "Exclusive", group: "halloween", collection: "Boneyard", feet: 6.5 },
  { id: "doll", name: "6 FT Deluxe Life-Size Animated Rag Doll", model: "25GM55061", photo: "web", rating: 4.4, count: 290, price: 259, badge: "Exclusive", limit: true, options: true, group: "halloween", collection: "Halloween Classics", feet: 6 },
  { id: "hickory", name: "9 FT Hollow Woods Giant-Sized Color Changing LED Horrid Hickory", model: "25SV24806", photo: "jack", rating: 4.1, count: 284, price: 279, badge: "Exclusive", limit: true, options: true, group: "halloween", collection: "Hollow Woods", feet: 9 },
  { id: "pumpkin-king", name: "6.5 FT Deluxe Life-Size Animated Pumpkin King", model: "25GM54269", photo: "porch", rating: 4.4, count: 290, price: 259, badge: "Exclusive", limit: true, options: true, group: "halloween", collection: "Halloween Classics", feet: 6.5 },
  { id: "reaper", name: "7.5 FT Boneyard Animated LED Soul-Taking Reaper", model: "26PA05416", photo: "reaper", rating: 4.5, count: 41, price: 199, badge: "Exclusive", group: "halloween", collection: "Boneyard", feet: 7.5 },
];
export const COLLECTIONS = ["Boneyard", "Hollow Woods", "Halloween Classics", "Dead Tide"] as const;

export const HOME_DEALS: Product[] = [
  { id: "combo", name: "18-Volt Lithium-Ion Cordless Combo Kit (8-Tool) with (2) Batteries and Charger", model: "KIT-8", photo: "tool-wall", rating: 4.7, count: 2701, price: 649, was: 1298, group: "tools" },
  { id: "dishwasher", name: "24 in. Front Control Smart Built-In Tall Tub 62 dBA Dishwasher in Stainless Steel", model: "DW-24", photo: "kitchen", rating: 4.5, count: 3760, price: 299, was: 419, group: "home" },
  { id: "toilet", name: "12 in. Rough-In 2-Piece 1.28 GPF Single Flush Elongated Chair-Height Toilet in White", model: "TL-12", photo: "bath", rating: 4.6, count: 3921, price: 199, was: 259, group: "home" },
  { id: "washer", name: "4.0 cu. ft. Top Load Washer in White with Cold Plus and Water Level Control", model: "WT-40", photo: "laundry", rating: 4.5, count: 3267, price: 499, was: 629, group: "home" },
  { id: "cutoff", name: "12V Lithium-Ion Brushless Cordless 3 in. Cut-Off Saw Starter Kit with Two 5.0 Ah Batteries", model: "CS-3", photo: "drill", rating: 4.8, count: 1313, price: 199, was: 439, group: "tools" },
  { id: "impact", name: "18V Brushless Cordless 4-Mode 1/2 in. High-Torque Impact Wrench Kit with Battery and Charger", model: "IW-18", photo: "hand-tools", rating: 4.7, count: 2721, price: 159, was: 269, group: "tools" },
  { id: "sapling", name: "6 FT Hollow Woods Color Changing LED Sulking Sprout", model: "25SV25036", photo: "scarecrow", rating: 4.1, count: 277, price: 129, was: 179, group: "halloween" },
  { id: "seed", name: "40 lb. 10,000 sq. ft. Tall Fescue Grass Seed Blend for Lawns", model: "GS-40", photo: "mower", rating: 4.4, count: 1138, price: 61.97, was: 91.96, group: "yard" },
];

export const YARD_CLEANUP: Product[] = [
  { id: "y-chainsaw", name: "16 in. 18V Brushless Battery Chainsaw (Tool Only)", model: "CH-16", photo: "chainsaw", rating: 4.7, count: 4533, price: 249, group: "yard" },
  { id: "y-bags", name: "30 Gal. Paper Lawn and Leaf Bags (5 Count)", model: "LB-30", photo: "leaves", rating: 4.6, count: 9538, price: 5.97, group: "yard" },
  { id: "y-blower", name: "130 MPH 510 CFM 18V Brushless Whisper Series Battery Leaf Blower with 6.0 Ah Battery and Charger", model: "LBL-130", photo: "blower", rating: 4.6, count: 8923, price: 199, group: "yard" },
  { id: "y-lopper", name: "32 in. Bypass Lopper with 2 in. Cut Capacity and Soft-Grip Handles", model: "LP-32", photo: "yard-tools", rating: 4.8, count: 1067, price: 54.97, group: "yard" },
  { id: "y-cord", name: "15 ft. 16/3 Light-Duty Indoor/Outdoor Extension Cord, Black", model: "EC-15", photo: "lighting", rating: 4.7, count: 2370, price: 12.97, group: "yard" },
  { id: "y-pole", name: "8 in. 18V Cordless Oil-Free Pole Saw (Tool Only)", model: "PS-8", photo: "hedge", rating: 4.4, count: 1954, price: 129, group: "yard" },
  { id: "y-rake", name: "53 in. Long Wood Handle 22 in. Steel Leaf Rake", model: "RK-22", photo: "rake", rating: 4.5, count: 977, price: 24.97, group: "yard" },
  { id: "y-trimmer", name: "16 in. 18V Brushless Cordless String Trimmer with Attachment Capability and 8.0 Ah Battery", model: "ST-16", photo: "zero-turn", rating: 4.6, count: 1942, price: 299, group: "yard" },
];

/** What a category tile on the outdoor power page opens to. */
export interface PowerType { id: string; name: string; photo?: string; icon: IconName; blurb: string; picks: { name: string; price: number; was?: number; rating: number; count: number }[] }
export const POWER: PowerType[] = [
  { id: "blowers", name: "Leaf Blowers", photo: "blower", icon: "wind", blurb: "Handheld, backpack and walk-behind blowers, battery or gas. Air speed is in miles an hour and air volume is in cubic feet a minute; the two together say how much leaf a blower moves.", picks: [{ name: "130 MPH 510 CFM 18V Brushless Battery Leaf Blower Kit", price: 199, rating: 4.6, count: 8923 }, { name: "120 MPH 500 CFM 18V Brushless Handheld Blower (Tool Only)", price: 149, rating: 4.5, count: 2558 }, { name: "216 MPH 517 CFM 58.2cc Gas 2-Stroke Backpack Leaf Blower", price: 349, rating: 4.7, count: 6227 }] },
  { id: "chainsaws", name: "Chain Saws", photo: "chainsaw", icon: "saw", blurb: "Bar length sets the widest log a saw can cut, about a third shorter than the bar. Battery saws start with a button; gas saws carry more power and run longer.", picks: [{ name: "16 in. 18V Brushless Battery Chainsaw (Tool Only)", price: 249, rating: 4.7, count: 4533 }, { name: "18 in. 40V Brushless Battery Chainsaw Kit", price: 329, rating: 4.6, count: 1210 }, { name: "20 in. 50cc Gas 2-Cycle Chainsaw", price: 289, rating: 4.4, count: 902 }] },
  { id: "generators", name: "Generators", photo: "generator", icon: "bolt", blurb: "Running watts keep things going, starting watts get a motor turning. Inverter models run quieter and cleaner for electronics; open-frame models cost less per watt.", picks: [{ name: "3,500-Watt Gasoline Powered Portable Inverter Generator", price: 699, rating: 4.7, count: 3120 }, { name: "5,500-Watt Gasoline Powered Electric Start Portable Generator", price: 549, rating: 4.5, count: 1876 }, { name: "9,500-Watt Dual Fuel Portable Generator with Remote Start", price: 899, rating: 4.4, count: 744 }] },
  { id: "splitters", name: "Log Splitters", photo: "firewood", icon: "axe", blurb: "Splitting force is rated in tons. Twenty-five to thirty tons splits most hardwood; electric models trade force for a quiet start.", picks: [{ name: "25-Ton 208cc Gas Horizontal/Vertical Log Splitter", price: 1199, rating: 4.5, count: 689 }, { name: "5-Ton 15 Amp Electric Log Splitter", price: 379, rating: 4.3, count: 1105 }] },
  { id: "snow", name: "Snow Removal Equipment", photo: "snow", icon: "snow", blurb: "Clearing width and intake height say how much a snow blower takes in a pass. Two-stage machines throw further and cut through packed snow; single-stage ones scrape to the pavement.", picks: [{ name: "24 in. 2-Stage 212cc Electric Start Gas Snow Blower", price: 799, rating: 4.6, count: 1342 }, { name: "21 in. 40V Brushless Battery Single-Stage Snow Blower Kit", price: 599, rating: 4.4, count: 871 }] },
  { id: "combos", name: "Outdoor Power Combo Kits", icon: "box", blurb: "One battery across several tools: a trimmer, a blower and a saw on the same pack. The kit is cheaper than the tools alone.", picks: [{ name: "40V Cordless Attachment-Capable 15 in. String Trimmer and 550 CFM Blower Combo Kit", price: 329, was: 399, rating: 4.5, count: 1446 }, { name: "18V Brushless 3-Tool Outdoor Combo Kit", price: 399, rating: 4.6, count: 988 }] },
  { id: "chippers", name: "Wood Chippers", icon: "gear", blurb: "Branch capacity is the widest limb a chipper takes. Shredder-chippers add a hopper for leaves and garden waste.", picks: [{ name: "3 in. Capacity 212cc Gas Wood Chipper Shredder", price: 899, rating: 4.3, count: 412 }] },
  { id: "polesaws", name: "Pole Saws", icon: "saw", blurb: "A saw on a pole reaches limbs to about fifteen feet from the ground. Telescoping poles are lighter to carry and store.", picks: [{ name: "8 in. 18V Cordless Oil-Free Pole Saw (Tool Only)", price: 129, rating: 4.4, count: 1954 }, { name: "10 in. 40V Brushless Telescoping Pole Saw Kit", price: 249, rating: 4.5, count: 760 }] },
  { id: "trimmers", name: "Trimmers & Edgers", icon: "trim", blurb: "String trimmers cut where a mower cannot; edgers cut the line along a path or bed. Attachment-capable models swap the head for other tools.", picks: [{ name: "16 in. 18V Brushless Cordless String Trimmer (Tool Only)", price: 129, rating: 4.6, count: 1942 }, { name: "17 in. 40V Brushless String Trimmer and Edger Kit", price: 219, rating: 4.5, count: 1630 }] },
  { id: "mowers", name: "Lawn Mowers", photo: "mower", icon: "mower", blurb: "Cutting width and drive type matter most: push for small flat lawns, self-propelled for slopes and bigger ones. Battery mowers start with a button and fold for storage.", picks: [{ name: "21 in. 40V Brushless Self-Propelled Battery Lawn Mower Kit", price: 449, was: 549, rating: 4.7, count: 3302 }, { name: "21 in. 163cc Gas Self-Propelled Lawn Mower", price: 379, rating: 4.5, count: 4120 }, { name: "20 in. Corded Electric Push Lawn Mower", price: 189, rating: 4.2, count: 1604 }] },
  { id: "riding", name: "Riding Lawn Mowers", photo: "tractor", icon: "tractor", blurb: "Deck width sets how much grass a pass cuts; engine size sets how it handles slopes and bagging. Garden tractors tow carts and haul attachments.", picks: [{ name: "42 in. 18 HP Hydrostatic Gas Riding Lawn Tractor", price: 1999, rating: 4.5, count: 1187 }, { name: "46 in. 22 HP Automatic Gas Riding Mower", price: 2399, rating: 4.6, count: 904 }] },
  { id: "pressure", name: "Pressure Washers", photo: "pressure", icon: "drop", blurb: "Pressure is in psi and flow in gallons a minute; multiply them for cleaning power. Light work needs less; decks and siding want 2,500 psi and up.", picks: [{ name: "3,100 PSI 2.4 GPM Gas Pressure Washer with 4 Nozzles", price: 449, rating: 4.6, count: 2780 }, { name: "2,000 PSI 1.2 GPM Electric Pressure Washer", price: 179, rating: 4.4, count: 3511 }] },
  { id: "zero", name: "Zero Turn Riding Lawn Mowers", photo: "zero-turn", icon: "mower", blurb: "Lap-bar steering lets a mower pivot in place, so it trims close to beds and trees. Speed in miles an hour matters on acre lots.", picks: [{ name: "50 in. 24 HP Gas Zero Turn Riding Mower", price: 3299, rating: 4.7, count: 1015 }, { name: "42 in. 80V Battery Zero Turn Riding Mower Kit", price: 4299, rating: 4.5, count: 466 }] },
  { id: "hedge", name: "Hedge Trimmers", photo: "hedge", icon: "trim", blurb: "Blade length and tooth spacing decide how thick a branch a trimmer cuts. Pole models reach the tops of tall hedges from the ground.", picks: [{ name: "22 in. 18V Cordless Hedge Trimmer (Tool Only)", price: 99, rating: 4.6, count: 2214 }, { name: "24 in. 40V Brushless Hedge Trimmer Kit", price: 179, rating: 4.5, count: 1380 }] },
  { id: "tillers", name: "Rototillers & Cultivators", icon: "gear", blurb: "Tines turn soil for a new bed. Cultivators are for breaking up and mixing in what is already worked; tillers go deeper into sod.", picks: [{ name: "16 in. 40V Cordless Cultivator Kit", price: 349, rating: 4.4, count: 520 }] },
  { id: "stump", name: "Stump Grinders", icon: "gear", blurb: "Grinding takes a stump below grade without digging. A rental is cheaper than buying one for a single stump.", picks: [{ name: "Stump Grinder, rental by the day", price: 129, rating: 4.3, count: 302 }] },
  { id: "attach", name: "Riding Mower & Tractor Attachments", icon: "tractor", blurb: "Carts, spreaders, sweepers and baggers hitch to a tractor or a zero turn.", picks: [{ name: "10 cu. ft. Steel Tow-Behind Dump Cart", price: 229, rating: 4.6, count: 1730 }] },
  { id: "parts", name: "Outdoor Power Equipment Parts", icon: "gear", blurb: "Blades, filters, spark plugs, belts and fuel line, matched to a model number.", picks: [{ name: "21 in. Replacement Mulching Mower Blade", price: 19.97, rating: 4.7, count: 2204 }] },
];

/** The left-hand list of the reference's category page. */
export const POWER_NAV = ["Shop All Outdoor Power Equipment", "Outdoor Power Savings", "Leaf Blowers", "Chainsaws", "Generators", "Log Splitters", "Snow Removal Equipment", "Outdoor Power Combo Kits", "Wood Chippers", "Pole Saws", "Trimmers & Edgers", "Lawn Mowers", "Riding Lawn Mowers", "Pressure Washers", "Zero Turn Riding Lawn Mowers", "Hedge Trimmers", "Rototillers & Cultivators", "Stump Grinders", "Riding Mower & Tractor Attachments", "Outdoor Power Equipment Parts"];
export const HALLOWEEN_NAV = ["Animatronics & Giants", "Outdoor Halloween Decor", "Skeletons", "Halloween Inflatables", "Licensed Characters", "Tombstones", "Pumpkins", "Lights & Fog Machines"];

/** Home page's top categories. */
export const TOP_CATEGORIES: { name: string; photo?: string; icon: IconName; href?: string }[] = [
  { name: "Garden Center", photo: "yard-tools", icon: "leaf" },
  { name: "Power Tools", photo: "tool-wall", icon: "drill" },
  { name: "Outdoor Power Equipment", photo: "zero-turn", icon: "mower", href: PAGES.outdoor },
  { name: "Rugs", icon: "rug" },
  { name: "Bathroom Vanities", photo: "vanity", icon: "bath" },
  { name: "Hand Tools", photo: "hand-tools", icon: "hammer" },
  { name: "Tile", photo: "bath", icon: "tile" },
  { name: "Refrigerators", photo: "kitchen", icon: "fridge" },
  { name: "Vinyl Flooring", photo: "flooring", icon: "tile" },
  { name: "Halloween Decorations", photo: "haunted-yard", icon: "ghost", href: PAGES.halloween },
  { name: "Exterior Doors", icon: "door" },
  { name: "Living Room Furniture", icon: "sofa" },
  { name: "Showers", icon: "bath" },
  { name: "Bathroom Faucets", icon: "drop" },
  { name: "Patio Furniture", photo: "patio", icon: "sofa" },
  { name: "Plumbing Parts", icon: "wrench" },
  { name: "Interior Doors", icon: "door" },
  { name: "Washers & Dryers", photo: "laundry", icon: "washer" },
];

export const APPLIANCE_SAVINGS: { name: string; now: number; was: number; icon: IconName }[] = [
  { name: "36 in. Stainless Steel French Door Refrigerator", was: 3099, now: 1799, icon: "fridge" },
  { name: "Smart Front Load Washer and Dryer Pair", was: 2598, now: 1798, icon: "washer" },
  { name: "30 in. Electric Range", was: 1429, now: 1099, icon: "range" },
  { name: "24 in. Dishwasher", was: 899, now: 799, icon: "dish" },
];

export const ESSENTIALS = [
  { name: "Flooring", photo: "flooring", body: "Hardwood, vinyl plank, laminate and tile, by the box or by the square foot, with installation if you want it." },
  { name: "Heating, Venting & Cooling", icon: "fan" as IconName, body: "Furnaces, thermostats, vents and fans, with filters by size." },
  { name: "Home Decor", photo: "porch", body: "Mirrors, art, curtains and seasonal pieces for each room." },
  { name: "Lighting & Fans", photo: "ceiling-fan", body: "Pendants, flush mounts, vanity bars and ceiling fans, with the bulbs." },
];

/** Product page. */
export const PDP = {
  id: "barnaby",
  internet: "339865644", model: "26SV25320", sku: "1015092980",
  crumbs: ["Home", "Holiday Decorations", "Halloween Decorations", "Halloween Animatronics and Giants"],
  brand: "GIFdepot Accents Holiday",
  bullets: [
    "6 ft. barkeep has 5 phrases, 2 movements and tattooed arms",
    "2 movements: stirring mechanism and moving mouth",
    "5 phrases; LED-illuminated eyes and cocktail glass",
  ],
  more: "A figure at a bar: a skeleton in a canvas apron, a rag over one shoulder, a glass in its hand. It stands on a weighted base, runs on four D batteries or the included adapter, and works indoors or under cover outside. A sensor wakes it when someone comes near and it speaks one of five lines, stirs, and shuts its jaw as it talks. The eyes and the glass glow.",
  specs: [["Assembled height", "72 in."], ["Assembled width", "24 in."], ["Assembled depth", "18 in."], ["Weight", "21 lb."], ["Power", "4 D batteries (not included) or AC adapter (included)"], ["Sensor", "Motion; range up to 10 ft."], ["Movements", "2 (stirring arm, moving jaw)"], ["Phrases", "5"], ["Indoor / outdoor", "Covered outdoor or indoor"], ["Collection", "Boneyard"], ["Returnable", "30 days"]] as [string, string][],
  themes: ["Barkeep", "Bartender", "Merlot Mishap"],
  stock: { store: "Hazlet", inStock: 12, aisle: "Aisle E1, Bay 003", zip: "07730", delivery: 679 },
  plans: [{ id: "none", label: "No thanks", price: 0 }, { id: "2y", label: "2 Year", price: 20 }, { id: "3y", label: "3 Year", price: 28 }],
  rating: 4.6, count: 368, qa: 84,
  stars: [[5, 272], [4, 52], [3, 20], [2, 9], [1, 15]] as [number, number][],
};

export const FACTS = {
  limit: { line: "50", label: "Per order", body: "Large figures are limited to fifty an order, so a neighbourhood can be stocked and one buyer cannot take them all.", tone: "dark" as const },
  sixty: { line: "30", label: "Day returns", body: "Free and easy returns in a store or online within thirty days of purchase.", tone: "orange" as const },
  workshop: { line: "1st", label: "Saturday of the month", body: "Free in-store kids' workshops, nine to twelve. While supplies last.", tone: "orange" as const },
  mowers: { line: "4", label: "Ways to power a mower", body: "Push, self-propelled, riding and zero turn; each from battery, gas or a cord." },
  types: { line: "19", label: "Kinds of outdoor power", body: "From leaf blowers to stump grinders, in one list on the left." },
};

export const WORKSHOP = { title: "Free In-Store Kids Workshops", body: "Engaging activities for your future doers. Join us the first Saturday of every month, 9 a.m. to 12 noon. While supplies last.", cta: "Learn more" };

export const FOOTER: [string, string[]][] = [
  ["Support", ["Customer Service Center", "Pickup, Shipping & Delivery", "Order Cancellation", "Return Policy", "Refund Policy", "Product Recalls", "Privacy & Security Center"]],
  ["Resources", ["Specials & Offers", "Military Discount Benefit", "DIY Projects & Ideas", "Truck & Tool Rental", "Installation & Services", "Moving Supplies & Rentals", "Protection Plans", "Rebate Center", "Gift Cards", "Catalog"]],
  ["About Us", ["Careers", "Corporate Information", "Digital Newsroom", "Foundation", "Investor Relations", "Government Customers", "Suppliers & Providers", "Affiliate Program", "Eco Actions", "Corporate Responsibility"]],
];

export const POPULAR = ["Chafing Dishes", "Bathroom Accessories", "Outdoor Lighting", "Luggage Sets", "Exterior Wood Stains", "Halloween Decorations", "Garbage Disposals", "Insulation", "Torque Wrenches", "Laminate Flooring", "Artificial Plants", "Lifting Equipment"];

export const SEO = [
  ["Go big this Halloween", "A bigger, bolder and scarier Halloween begins with the figures that stand taller than a doorway: a 12-ft skeleton, a 9-ft tree-creature with colour-changing lights, a barkeep skeleton at his bar. Family-friendly inflatables, animated props and costumes sit beside them, so a yard can be frightening or funny. Touch- and motion-activated figures move when someone walks up."],
  ["Make your yard stand out", "Outdoor decorations make a front yard the one the neighbourhood talks about. Choose giants and animatronics that really move, inflatables, tombstones, mummies and skeletons by the dozen. A collection (Boneyard, Hollow Woods, Halloween Classics, Dead Tide) keeps a scene to one theme."],
];

export const usd = (n: number, cents = true) => `$${n.toLocaleString("en-US", { minimumFractionDigits: cents && n % 1 ? 2 : 0, maximumFractionDigits: 2 })}`;
export const SOURCE_KEYS: SourceKey[] = [];
