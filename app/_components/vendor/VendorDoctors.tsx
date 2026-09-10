import { Rate } from "antd";
import InitialsAvatar from "@/app/_components/shared/InitialsAvatar";
import { glass } from "@/app/_lib/glass";
import type { VendorDoctor } from "@/app/_lib/vendor-data";

interface VendorDoctorsProps {
  doctors: VendorDoctor[];
}

/** Read-only staff roster — no per-doctor booking flow exists yet, so cards are informational only. */
export default function VendorDoctors({ doctors }: VendorDoctorsProps) {
  if (doctors.length === 0) return null;

  return (
    <div className={`mt-7 rounded-[20px] p-6 ${glass.subtle}`}>
      <h2 className="font-heading text-slate-900 font-bold text-[19px] mb-3.5">
        Our doctors
      </h2>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
        {doctors.map((doc) => (
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
    </div>
  );
}
