import PageShell from "@/app/_components/shared/PageShell";
import ListingsView from "@/app/_components/listings/ListingsView";
import { DEFAULT_LISTINGS_TAB } from "@/app/_lib/listings-data";

// /listings (no path segment) is an alias for its default tab — see
// app/listings/[tab]/page.tsx for the other tabs (/listings/packages, etc).
export default function ListingsPage() {
  return (
    <PageShell showCart={false}>
      <ListingsView activeTabId={DEFAULT_LISTINGS_TAB.id} />
    </PageShell>
  );
}
