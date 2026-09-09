import { notFound } from "next/navigation";
import VendorDetailPage from "@/app/_components/vendor/VendorDetailPage";
import { VENDORS, getVendorBySlug } from "@/app/_lib/vendor-data";

export function generateStaticParams() {
  return VENDORS.map((v) => ({ slug: v.slug }));
}

export default async function VendorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const vendor = getVendorBySlug(slug);
  if (!vendor) notFound();

  return <VendorDetailPage vendor={vendor} />;
}
