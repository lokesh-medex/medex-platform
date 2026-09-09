import Link from "next/link";
import { Tag } from "antd";
import { formatPrice } from "@/app/_lib/detail-data";
import { glass } from "@/app/_lib/glass";
import type { VendorService } from "@/app/_lib/vendor-data";

interface VendorServicesProps {
  services: VendorService[];
}

/** Informational service list — links out to the matching /listings tab
 * (pre-filtered by name via the existing ?q= search convention) rather
 * than duplicating cart/booking logic on this page. */
export default function VendorServices({ services }: VendorServicesProps) {
  if (services.length === 0) return null;

  return (
    <div className={`mt-7 rounded-[20px] p-6 ${glass.subtle}`}>
      <h2 className="font-heading text-slate-900 font-bold text-[19px] mb-3.5">
        Services
      </h2>
      <div className="flex flex-col gap-2.5">
        {services.map((s) => (
          <Link
            key={s.name}
            href={`/listings/${s.listingsTab}?q=${encodeURIComponent(s.name)}`}
            className="flex items-center justify-between gap-3 bg-white border border-slate-200 rounded-xl px-4 py-3 transition-colors hover:border-primary"
          >
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
              <Tag
                variant="filled"
                className="m-0! text-[11px]! font-bold text-primary! bg-primary-100! rounded-full px-2.5! py-1! border-0!"
              >
                View
              </Tag>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
