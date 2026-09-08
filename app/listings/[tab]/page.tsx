import { notFound } from "next/navigation";
import PageShell from "@/app/_components/shared/PageShell";
import ListingsView from "@/app/_components/listings/ListingsView";
import { LISTINGS_TABS, getTabBySlug } from "@/app/_lib/listings-data";

export function generateStaticParams() {
  return LISTINGS_TABS.map((tab) => ({ tab: tab.slug }));
}

export default async function ListingsTabPage({
  params,
}: {
  params: Promise<{ tab: string }>;
}) {
  const { tab: slug } = await params;
  const tab = getTabBySlug(slug);
  if (!tab) notFound();

  return (
    <PageShell showCart={false}>
      <ListingsView key={tab.id} activeTabId={tab.id} />
    </PageShell>
  );
}
