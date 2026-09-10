import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DetailPage from "@/app/_components/detail/DetailPage";
import {
  DETAIL_CATALOG,
  getDetailCategoryByVendorAndService,
  getDetailPageTitle,
  hrefForDetailItem,
} from "@/app/_lib/detail-data";

export function generateStaticParams() {
  return (Object.keys(DETAIL_CATALOG) as (keyof typeof DETAIL_CATALOG)[]).map(
    (category) => {
      const [, vendor, service] = hrefForDetailItem(category).split("/");
      return { vendor, service };
    }
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ vendor: string; service: string }>;
}): Promise<Metadata> {
  const { vendor, service } = await params;
  const category = getDetailCategoryByVendorAndService(vendor, service);
  if (!category) return {};

  return { title: getDetailPageTitle(DETAIL_CATALOG[category]) };
}

export default async function Page({
  params,
}: {
  params: Promise<{ vendor: string; service: string }>;
}) {
  const { vendor, service } = await params;
  const category = getDetailCategoryByVendorAndService(vendor, service);
  if (!category) notFound();

  return <DetailPage category={category} />;
}
