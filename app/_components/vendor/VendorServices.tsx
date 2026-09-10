import Link from "next/link";
import { Tag } from "antd";
import { formatPrice } from "@/app/_lib/detail-data";
import { getTabBySlug } from "@/app/_lib/listings-data";
import { glass } from "@/app/_lib/glass";
import type { VendorService } from "@/app/_lib/vendor-data";

interface VendorServicesProps {
  services: VendorService[];
  vendorName: string;
}

function hasMatchingListing(s: VendorService): boolean {
  const tab = getTabBySlug(s.listingsTab);
  if (!tab) return false;
  const name = s.name.toLowerCase();
  return tab.items.some((item) => item.title.toLowerCase() === name);
}

/** Informational service list — links out to the matching /listings tab
 * (pre-filtered by name via the existing ?q= search convention) rather
 * than duplicating cart/booking logic on this page. Rows with no real
 * catalog match (e.g. pharmacy-only services with nothing to link to)
 * render as plain, unlinked rows instead of a "View" affordance that
 * would dead-end on an empty results page. */
export default function VendorServices({
  services,
  vendorName,
}: VendorServicesProps) {
  if (services.length === 0) return null;

  return (
    <div className={`mt-7 rounded-[20px] p-6 ${glass.subtle}`}>
      <div className="flex items-center justify-between gap-3 mb-3.5">
        <h2 className="font-heading text-slate-900 font-bold text-[19px] m-0">
          Services
        </h2>
        <Link
          href={`/listings?vendor=${encodeURIComponent(vendorName)}`}
          className="shrink-0 text-[13px] font-bold text-primary hover:underline"
        >
          View All Services
        </Link>
      </div>
      <div className="flex flex-col gap-2.5">
        {services.map((s) => {
          const linkable = hasMatchingListing(s);
          const content = (
            <>
              <div className="min-w-0">
                <span className="block text-[13.5px] font-bold text-slate-900 truncate">
                  {s.name}
                </span>
                <span className="text-xs text-slate-500">
                  {s.category}
                  {s.duration ? ` · ${s.duration}` : ""}
                </span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {s.price != null && (
                  <span className="font-heading text-slate-900 font-bold text-[14px]">
                    {formatPrice(s.price)}
                  </span>
                )}
                {linkable && (
                  <Tag
                    variant="filled"
                    className="m-0! text-[11px]! font-bold text-primary! bg-primary-100! rounded-full px-2.5! py-1! border-0!"
                  >
                    View
                  </Tag>
                )}
              </div>
            </>
          );

          return linkable ? (
            <Link
              key={s.name}
              href={`/listings/${s.listingsTab}?q=${encodeURIComponent(s.name)}`}
              className="flex items-center justify-between gap-3 bg-white border border-slate-200 rounded-xl px-4 py-3 transition-colors hover:border-primary"
            >
              {content}
            </Link>
          ) : (
            <div
              key={s.name}
              className="flex items-center justify-between gap-3 bg-white border border-slate-200 rounded-xl px-4 py-3"
            >
              {content}
            </div>
          );
        })}
      </div>
    </div>
  );
}
