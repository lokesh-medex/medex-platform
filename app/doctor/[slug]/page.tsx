import { notFound } from "next/navigation";
import DoctorDetailPage from "@/app/_components/doctor/DoctorDetailPage";
import { DOCTORS, getDoctorBySlug } from "@/app/_lib/doctor-data";

export function generateStaticParams() {
  return DOCTORS.map((doctor) => ({ slug: doctor.slug }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doctor = getDoctorBySlug(slug);
  if (!doctor) notFound();

  return <DoctorDetailPage doctor={doctor} />;
}
