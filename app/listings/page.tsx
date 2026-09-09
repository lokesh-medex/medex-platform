import { Suspense } from "react";
import ListingsView from "@/app/_components/listings/ListingsView";
import { DEFAULT_LISTINGS_TAB } from "@/app/_lib/listings-data";

// /listings (no path segment) is an alias for its default tab — see
// app/listings/[tab]/page.tsx for the other tabs (/listings/packages, etc).
// ListingsView renders its own PageShell (it owns the cart count shown in
// the header — see its onAddToCart wiring).
export default function ListingsPage() {
  return (
    // ListingsView reads `?q=` via useSearchParams, which requires a
    // Suspense boundary on a statically generated page.
    <Suspense>
      <ListingsView activeTabId={DEFAULT_LISTINGS_TAB.id} />
    </Suspense>
  );
}
