"use client";

import { useState } from "react";
import { Button, Tag } from "antd";
import {
  FiClock,
  FiExternalLink,
  FiMail,
  FiMapPin,
  FiPhone,
} from "react-icons/fi";
import ImageWithFallback from "@/app/_components/shared/ImageWithFallback";
import InitialsAvatar from "@/app/_components/shared/InitialsAvatar";
import VendorContactModal from "@/app/_components/vendor/VendorContactModal";
import { glass } from "@/app/_lib/glass";
import type { Vendor } from "@/app/_lib/vendor-data";

interface VendorInfoPanelProps {
  vendor: Vendor;
}

/** Sticky (desktop) contact card — the vendor-page counterpart to
 * DetailPage's BuyBox: recap, embedded map, hours, quick contact links,
 * and the Contact Vendor CTA. */
export default function VendorInfoPanel({ vendor }: VendorInfoPanelProps) {
  const [contactOpen, setContactOpen] = useState(false);

  const mapQuery =
    vendor.lat != null && vendor.lng != null
      ? `${vendor.lat},${vendor.lng}`
      : encodeURIComponent(vendor.address);
  const mapSrc = `https://www.google.com/maps?q=${mapQuery}&z=15&output=embed`;
  const directionsHref = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;

  return (
    <>
      <div
        className={`flex flex-col gap-4.5 rounded-[20px] p-6 dt:sticky dt:top-28 ${glass.subtle}`}
      >
        <div className="flex items-center gap-3">
          {vendor.logo ? (
            <ImageWithFallback
              src={vendor.logo}
              alt={vendor.title}
              height={44}
              width={44}
              className="h-11 w-11 rounded-[10px] object-contain bg-white border border-slate-200"
              fallback={
                <InitialsAvatar
                  name={vendor.title}
                  rounded="lg"
                  className="h-11! w-11! text-lg!"
                />
              }
            />
          ) : (
            <InitialsAvatar
              name={vendor.title}
              rounded="lg"
              className="h-11! w-11! text-lg!"
            />
          )}
          <div className="min-w-0">
            <h2 className="font-heading text-slate-900 font-bold text-base leading-tight m-0 truncate">
              {vendor.title}
            </h2>
            <Tag
              variant="filled"
              className="m-0! mt-1! text-[11px]! font-bold text-secondary! bg-secondary-100! rounded-full px-2.5! py-0.5! border-0!"
            >
              {vendor.category}
            </Tag>
          </div>
        </div>

        <div className="flex items-start gap-2.5">
          <FiMapPin size={16} className="shrink-0 mt-0.5 text-slate-400" />
          <div className="min-w-0">
            <p className="text-[13.5px] text-slate-700 m-0">{vendor.address}</p>
            <a
              href={directionsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[12.5px] font-bold text-primary mt-1"
            >
              Get directions
              <FiExternalLink size={12} />
            </a>
          </div>
        </div>

        <div className="rounded-2xl overflow-hidden border border-slate-200 h-40">
          <iframe
            title={`Map showing ${vendor.title}`}
            src={mapSrc}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <div className="flex items-center gap-2.5 text-[13px] text-slate-600">
          <FiClock size={15} className="shrink-0 text-slate-400" />
          {vendor.hours}
        </div>

        <div className="flex flex-col gap-2 pt-2 border-t border-slate-200">
          <a
            href={`tel:${vendor.phone}`}
            className="flex items-center gap-2.5 text-[13.5px] font-semibold text-slate-700"
          >
            <FiPhone size={15} className="shrink-0 text-primary" />
            {vendor.phone}
          </a>
          <a
            href={`mailto:${vendor.email}`}
            className="flex items-center gap-2.5 text-[13.5px] font-semibold text-slate-700"
          >
            <FiMail size={15} className="shrink-0 text-primary" />
            {vendor.email}
          </a>
        </div>

        <Button
          type="text"
          block
          onClick={() => setContactOpen(true)}
          className="h-auto! py-3.5! text-white! text-[15px]! font-sans bg-[linear-gradient(120deg,var(--color-primary),var(--color-secondary))]!"
        >
          Contact Vendor
        </Button>
      </div>

      <VendorContactModal
        vendor={vendor}
        open={contactOpen}
        onClose={() => setContactOpen(false)}
      />
    </>
  );
}
