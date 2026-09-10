import { useState } from "react";
import { Button, Rate } from "antd";
import { FiChevronDown } from "react-icons/fi";
import InitialsAvatar from "@/app/_components/shared/InitialsAvatar";
import { glass } from "@/app/_lib/glass";
import type { VendorDoctor } from "@/app/_lib/vendor-data";

interface VendorDoctorsProps {
  doctors: VendorDoctor[];
}

// This grid's columns are auto-fill (responsive, no fixed count), so "3
// rows" is only exact at the ~3-column width this section usually renders
// at in the left column of the vendor page — narrower viewports just wrap
// the same batch into more visual rows.
const COLUMNS_ASSUMED = 3;
const ROWS_PER_PAGE = 3;
const DOCTORS_PER_PAGE = ROWS_PER_PAGE * COLUMNS_ASSUMED;

/** Read-only staff roster — no per-doctor booking flow exists yet, so cards are informational only. */
export default function VendorDoctors({ doctors }: VendorDoctorsProps) {
  const [visibleCount, setVisibleCount] = useState(DOCTORS_PER_PAGE);

  if (doctors.length === 0) return null;

  const visibleDoctors = doctors.slice(0, visibleCount);
  const hasMore = visibleCount < doctors.length;

  return (
    <div className={`mt-7 rounded-[20px] p-6 ${glass.subtle}`}>
      <h2 className="font-heading text-slate-900 font-bold text-[19px] mb-3.5">
        Our doctors
      </h2>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
        {visibleDoctors.map((doc) => (
          <div
            key={doc.name}
            className="rounded-2xl border border-slate-200 bg-white p-4"
          >
            <InitialsAvatar
              name={doc.name.replace("Dr. ", "")}
              rounded="lg"
              className="h-16! w-16! text-2xl! mb-3"
            />
            <h3 className="font-heading text-slate-900 font-bold text-[15px] leading-tight m-0 mb-1">
              {doc.name}
            </h3>
            <p className="text-primary-700 text-[12.5px] font-bold m-0 mb-2">
              {doc.specialty}
            </p>
            <Rate
              disabled
              allowHalf
              value={Number(doc.rating)}
              className="text-[11px]!"
            />
          </div>
        ))}
      </div>
      {hasMore && (
        <div className="mt-5 flex justify-center">
          <Button
            type="text"
            onClick={() =>
              setVisibleCount((c) =>
                Math.min(c + DOCTORS_PER_PAGE, doctors.length)
              )
            }
            className="h-auto! border-[1.5px]! border-slate-900/15! bg-white/60! px-6! py-3! text-[14px]! text-slate-900! font-sans"
          >
            <span className="flex items-center gap-2">
              Show more
              <FiChevronDown size={14} />
            </span>
          </Button>
        </div>
      )}
    </div>
  );
}
