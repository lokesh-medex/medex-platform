import Header from "@/app/_components/header/Header";
import Footer from "@/app/_components/footer/Footer";
import ListingsView from "@/app/_components/listings/ListingsView";
import { DEFAULT_LISTINGS_TAB } from "@/app/_lib/listings-data";

// /listings (no path segment) is an alias for its default tab — see
// app/listings/[tab]/page.tsx for the other tabs (/listings/packages, etc).
export default function ListingsPage() {
  return (
    <div className="min-h-screen">
      <Header active="" showCart={false} />
      <ListingsView activeTabId={DEFAULT_LISTINGS_TAB.id} />
      <Footer />
    </div>
  );
}
