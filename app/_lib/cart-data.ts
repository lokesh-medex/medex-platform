// Sample cart content for the /cart page. No real cart state exists yet
// (every "Add to Cart" button elsewhere still just bumps a local, per-page
// counter) — this seeds the cart UI so it has something to render.

import { DETAIL_CATALOG, type DetailCategory } from "@/app/_lib/detail-data";

export interface CartItem {
  id: DetailCategory;
  qty: number;
}

export const CART_ITEMS: CartItem[] = [
  { id: "package", qty: 1 },
  { id: "labtest", qty: 2 },
  { id: "service", qty: 1 },
];

export function cartCatalogItem(id: DetailCategory) {
  return DETAIL_CATALOG[id];
}
