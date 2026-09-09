"use client";

import Link from "next/link";
import { Tag } from "antd";
import { FaStar } from "react-icons/fa";
import { FiCheck } from "react-icons/fi";
import PageShell from "@/app/_components/shared/PageShell";
import Mesh from "@/app/_components/home/Mesh";
import BackdropMotifs from "@/app/_components/shared/BackdropMotifs";
import VendorGallery from "@/app/_components/vendor/VendorGallery";
import VendorDoctors from "@/app/_components/vendor/VendorDoctors";
import VendorServices from "@/app/_components/vendor/VendorServices";
import { glass } from "@/app/_lib/glass";
import type { Vendor } from "@/app/_lib/vendor-data";

interface VendorDetailPageProps {
  vendor: Vendor;
}

export default function VendorDetailPage({ vendor }: VendorDetailPageProps) {
  return (
    <PageShell active="Vendors" showCart={false}>
      <div className="bg-[#F5F5F5]">
        <div className="relative overflow-hidden">
          <Mesh preset="detail" />
          <BackdropMotifs
            count={4}
            opacity={0.05}
            seed={64}
            zone="edges"
            minSize={100}
            maxSize={190}
          />
          <div className="relative max-w-[1280px] mx-auto px-5 dt:px-8 pt-6 pb-2">
            <div
              className={`inline-flex w-fit max-w-full items-center gap-1.5 rounded-full px-4 py-2 text-[13px] text-slate-500 ${glass.subtle}`}
            >
              <Link href="/" className="text-slate-500 shrink-0">
                Home
              </Link>
              <span className="shrink-0">/</span>
              <Link
                href="/listings/vendors"
                className="text-slate-500 shrink-0"
              >
                Vendors
              </Link>
              <span className="shrink-0">/</span>
              <span className="text-slate-900 font-semibold truncate">
                {vendor.title}
              </span>
            </div>
          </div>
        </div>

        <section className="relative max-w-[1280px] mx-auto px-5 dt:px-8 pt-5 pb-14 grid grid-cols-1 dt:grid-cols-[1.5fr_1fr] gap-9 items-start">
          {/* Not `overflow-hidden` on this section — the right column
              (VendorInfoPanel, added in Task 6) is `dt:sticky`, and
              wrapping a sticky ancestor in overflow-hidden breaks its
              sticky positioning, same constraint as DetailPage.tsx. */}
          <BackdropMotifs
            count={5}
            opacity={0.04}
            seed={41}
            zone="edges"
            minSize={110}
            maxSize={210}
          />

          {/* LEFT: header, gallery (Task 3), about, facilities, doctors (Task 4), services (Task 5) */}
          {/* `min-w-0` is required here: without it, a 1fr grid item defaults
              to `min-width: auto`, and antd's Carousel measures its own
              width before the grid has settled, blowing the grid track (and
              the whole section) out to match that stale measurement. */}
          <div className="min-w-0">
            <Tag
              variant="filled"
              className="m-0! mb-3! text-xs! font-bold text-secondary! bg-secondary-100! rounded-full px-3! py-1.5! border-0!"
            >
              {vendor.category}
            </Tag>
            <h1 className="font-heading text-slate-900 font-bold text-[clamp(24px,3vw,32px)] leading-[1.2] m-0 mb-2">
              {vendor.title}
            </h1>
            <div className="flex items-center gap-1.5 mb-6">
              <FaStar size={15} color="#f59e0b" />
              <span className="text-[13.5px] font-bold text-slate-900">
                {vendor.rating}
              </span>
              <span className="text-[13px] text-slate-400">
                ({vendor.reviewCount} reviews)
              </span>
              <span className="text-slate-300">&middot;</span>
              <span className="text-[13px] text-slate-500">{vendor.meta}</span>
            </div>

            <VendorGallery vendor={vendor} />

            <div className={`mt-7 rounded-[20px] p-6 ${glass.subtle}`}>
              <h2 className="font-heading text-slate-900 font-bold text-[19px] mb-3">
                About
              </h2>
              <p className="text-[13.5px] font-bold text-secondary m-0 mb-3">
                {vendor.tagline}
              </p>
              <p className="text-slate-600 text-[14.5px] leading-[1.7] m-0">
                {vendor.description}
              </p>
            </div>

            <div className={`mt-7 rounded-[20px] p-6 ${glass.subtle}`}>
              <h2 className="font-heading text-slate-900 font-bold text-[19px] mb-3.5">
                Facilities
              </h2>
              <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-2.5">
                {vendor.amenities.map((a) => (
                  <div
                    key={a}
                    className="flex items-center gap-2.5 bg-white border border-slate-200 rounded-xl px-3.5 py-2.5"
                  >
                    <FiCheck size={16} className="shrink-0 text-primary" />
                    <span className="text-[13.5px] text-slate-700 font-semibold">
                      {a}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <VendorDoctors doctors={vendor.doctors} />
            <VendorServices services={vendor.services} />
          </div>

          {/* RIGHT: sticky vendor info card (Task 6 replaces this placeholder) */}
          <div
            className={`flex flex-col gap-3 rounded-[20px] p-6 dt:sticky dt:top-28 ${glass.subtle}`}
          >
            <h2 className="font-heading text-slate-900 font-bold text-base m-0">
              {vendor.title}
            </h2>
            <p className="text-[13.5px] text-slate-600 m-0">{vendor.address}</p>
            <p className="text-[13.5px] text-slate-600 m-0">
              {vendor.phone} &middot; {vendor.email}
            </p>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
