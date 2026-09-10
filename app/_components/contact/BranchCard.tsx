import { FiMapPin, FiPhone } from "react-icons/fi";
import { glass } from "@/app/_lib/glass";
import type { Branch } from "@/app/_lib/contact-data";

export default function BranchCard({ branch }: { branch: Branch }) {
  return (
    <div className={`flex flex-col gap-4 rounded-[20px] p-5 ${glass.subtle}`}>
      <h3 className="font-heading text-slate-900 font-bold text-base m-0">
        {branch.name}
      </h3>

      <div className="flex flex-col gap-3">
        <a
          href={`tel:${branch.phone.replace(/-/g, "")}`}
          className="flex items-center gap-2.5 text-sm font-semibold text-slate-700"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary">
            <FiPhone size={14} />
          </span>
          {branch.phone}
        </a>
        <div className="flex items-start gap-2.5 text-sm text-slate-700">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary-100 text-secondary">
            <FiMapPin size={14} />
          </span>
          <span className="pt-1">{branch.address}</span>
        </div>
      </div>

      <div className={`overflow-hidden rounded-2xl p-0.5 ${glass.subtle}`}>
        <iframe
          src={branch.mapEmbedUrl}
          className="block h-36 w-full rounded-[14px] border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`${branch.name} location`}
        />
      </div>
    </div>
  );
}
