import { Suspense } from "react";
import { notFound } from "next/navigation";
import ListingsView from "@/app/_components/listings/ListingsView";
import { LISTINGS_TABS, getTabBySlug } from "@/app/_lib/listings-data";

export function generateStaticParams() {
  return LISTINGS_TABS.map((tab) => ({ tab: tab.slug }));
}

// ListingsView renders its own PageShell (it owns the cart count shown in
// the header — see its onAddToCart wiring).
export default async function ListingsTabPage({
  params,
}: {
  params: Promise<{ tab: string }>;
}) {
  const { tab: slug } = await params;
  const tab = getTabBySlug(slug);
  if (!tab) notFound();

  return (
    // ListingsView reads `?q=` via useSearchParams, which requires a
    // Suspense boundary on a statically generated page.
    <Suspense>
      <ListingsView key={tab.id} activeTabId={tab.id} />
    </Suspense>
  );
}
