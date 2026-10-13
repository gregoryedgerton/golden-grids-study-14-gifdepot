GIFcommit00013

# Layout study — Home Depot, as GIFdepot

**Live:** [`https://gregoryedgerton.github.io/golden-grids-study-14-homedepot/`](https://gregoryedgerton.github.io/golden-grids-study-14-homedepot/)

An unaffiliated layout study. It rebuilds four pages of
[homedepot.com](https://www.homedepot.com/) (the home page, outdoor power
equipment, Halloween decorations and a product page) as stacked golden grids
under a parody name, GIFdepot. GIFdepot is not a retailer. Every product, price
and rating is invented, nothing can be bought, no form sends anything, and none
of the reference's sentences, photographs, product names or marks is
reproduced. Built with [Golden Grids](https://github.com/gregoryedgerton/golden-grids)
from the [study template](https://github.com/gregoryedgerton/golden-grids-study-template).

## Reference

Read on 2026-10-09 in a desktop browser at about 1,024px wide, signed out; text
and computed styles were taken from the pages and no screenshot is kept. The
lower parts of the product page load as it is scrolled and were not all
captured; they are drawn from how such pages are organised (description,
specifications, ratings, related products).

- **Home:** a promotion bar, the header (mark, store and zip, search with an
  orange button, and Shop All, Services, DIY, Log In and Cart as icons over
  names), then promotional banners, a tile grid of top categories, product rows
  with a price, a was-price and the amount saved, appliance deals with the
  price as the headline, home essentials, a fall-yard row, a workshops promo,
  the email offer and a footer of lists.
- **Outdoor Power Equipment:** the title in capitals, a list of subcategories
  down the left, two promotions, and a grid of nineteen types, each a tile with
  a picture and a name.
- **Halloween Decorations:** the title, a row of types, banners, a list of
  featured decorations (a badge, a rating, a model number, the name, a price and
  Add to Cart), four collections, prices bands, other holidays and a long
  passage of text.
- **A product page:** the ids, an exclusive badge, the maker line, the title, a
  rating, the price with the saving, three bullets, a store panel (stock and
  aisle), pickup and delivery, protection plans, Add to Cart and returns.

**Measured register:** a flat orange `#f96302` on white, ink `#202020`,
Helvetica Neue (Inter stands in), 8px corners on buttons and tiles, 1px
outlines on department tiles (the reference outlines them, so the study does
too) and none on product cards, prices with the dollars large and the cents
raised. The reference has one scheme on the web; dark is the study's own.
White text on the exact orange is 3.1:1 and fails at small sizes, so type on
the orange is ink `#202020` (5.3:1); only the mark's lettering (large text, 3:1) and the search
icon stay white. Orange text and links on white use a darker orange
`#a63d00`.

## Approach

The reference sets each module as a row or a grid of equal cards. The study sets
each as one grid: the first card in the largest square, the rest in descending
squares, with figures about the product or the store as large type among them.
A card's type is set from its square's side (`10px + 1.6%`, held between 12 and
20px), and what a square cannot hold it leaves out whole: the model number and
the saving first, then the rating, the name and the price, and in the smallest
squares the photograph with a price on a white pill. Add to Cart is in a card
when its square is at least 220 by 420px, and in every opened card.

## The pages

Four Vite entries, plain relative links, no router. `GridBand`
([`src/bands/bands.tsx`](src/bands/bands.tsx)) draws every band from cells;
`lib/plan.ts` chooses each grid. Below 1100px a band of five is dealt into two
grids, and a skip grid that would leave a square under 104px falls back to a
plain one.

| Page | Band | Cells |
| --- | --- | --- |
| Home | Offers | three promotions, a figure in the strip |
| | Top Categories | eighteen department tiles, in three bands of six, five and six |
| | Up to 35% off | four products, one in the strip |
| | Top Savings For You | three products and a figure |
| | Appliance Savings | four prices as large type, a figure in the strip |
| | Home Essentials | four tiles, a figure in the strip |
| | Fall Yard Cleanup | eight products in two bands |
| | Workshops | a promotion and four figures |
| Outdoor power | Offers | two promotions and a figure |
| | By type | eighteen tiles in four bands; each opens to a note and picks |
| | Savings | five products |
| Halloween | Offers | three promotions and a figure |
| | Featured | twenty products dealt five to a band, filtered and sorted |
| | Collections | four promotions that set the filter |
| | More holiday | two promotions and two figures |
| Product | Gallery | four photographs |
| | Buy box | flat: how to get it, a plan, quantity, the total |
| | Collection theme | three themes and a figure |
| | Related | nine products in two bands |

Flat modules stay flat: the search, the filter bar, the buy box, the
specifications table, the ratings, the email offer, the footer.

**What answers back.** Every photograph opens its square in place; Add to Cart
puts a line in the cart in the header, which is a panel with quantities, a
subtotal and a Check out that empties it. The search finds a kind of outdoor
equipment (and opens its tile) or Halloween decorations. On the Halloween list,
collection chips, a name search, a price slider and a sort re-deal the grids
from the new count; the collection promotions set the chip. On the product
page, pickup or delivery, a protection plan and a quantity price the line.

## Content and provenance

- **The structure is real; the products are invented.** Names, model numbers,
  ratings and review counts are made up in the shape of the reference's. No
  maker's name is used. The reference's Halloween line, Home Accents Holiday,
  is played as GIFdepot Accents Holiday, and its collections as Boneyard,
  Hollow Woods and Dead Tide. Prices are the ones the reference showed.
- **Photographs** are in [`src/photos.json`](src/photos.json), each with its
  author, licence, page and alt text: all from Unsplash under the Unsplash
  License (free to use; not a Creative Commons licence). Each shows a kind of
  thing, not a product offered here, and says so when opened.
  [`captures/pick.py`](captures/pick.py) downloaded and recorded them.
- **Icons** are the study's own drawings. **Text** is the study's own.

## Notes for review

Observations for whoever reviews this study, recorded without a verdict.
Whether the layout suits the page is assessed separately, after every study
has been reviewed.

- **Photographs stand in.** There are forty-three; a product card shows the
  nearest kind of thing, so several Halloween cards share a photograph.
- **Card sizes.** In a band of five at 1440 the squares are about 850, 520,
  330, 200 and 200px; the two smallest show a photograph and a price pill.
- **Add to Cart** appears in a square at least 220 by 420px; in the others it
  is one tap away.
- **Search** is a lookup on the study's two categories; it does not search the
  rest.
- **Accessibility.** `captures/scan.cjs` reports no overflow, no fitted line
  under 12px and no axe violations in Chrome and WebKit at 390, 820 and 1440,
  light and dark. No screen-reader user has tested it.
- **Not rebuilt.** The department menus, sign-in, store finder, reviews text,
  questions and answers, and checkout.

## Disclosure

Every page says it is a study in three places, all read from
[`src/study.json`](src/study.json): the page's metadata, a sticky notice at the
top, and "About this layout study", the last element on the page.

## Running it

```bash
npm install
npm run dev
NODE_PATH=<a node_modules with playwright> node captures/scan.cjs http://localhost:5173/ index outdoor halloween product
```

Pushing to `main` deploys to GitHub Pages.
