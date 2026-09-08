import { notFound } from "next/navigation";
import DetailPage from "@/app/_components/detail/DetailPage";
import { DETAIL_CATALOG, type DetailCategory } from "@/app/_lib/detail-data";

function isDetailCategory(value: string): value is DetailCategory {
  return value in DETAIL_CATALOG;
}

export function generateStaticParams() {
  return Object.keys(DETAIL_CATALOG).map((category) => ({ category }));
}

export default async function Page({
  params,
}: PageProps<"/detail/[category]">) {
  const { category } = await params;
  if (!isDetailCategory(category)) notFound();

  return <DetailPage category={category} />;
}
