import Image from "next/image";
import { FiMapPin } from "react-icons/fi";
import { VENDORS_DATA, type Vendor } from "@/app/_lib/homepage-data";

function Card({ v }: { v: Vendor }) {
  return (
    <div className="rounded-2xl overflow-hidden bg-white border border-slate-200 flex flex-col transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-[0_16px_32px_#0f172a1a]">
      <div
        className="relative h-[140px] overflow-hidden"
        style={{ background: v.gradient }}
      >
        <Image
          src={v.img}
          alt={v.name}
          fill
          sizes="(min-width: 1040px) 25vw, 50vw"
          className="object-cover"
        />
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h4 className="font-heading text-slate-900 font-bold text-[15px] mb-2">
          {v.name}
        </h4>
        <div className="flex items-start gap-1.5 mb-4 flex-1">
          <FiMapPin size={14} className="shrink-0 mt-0.5 text-slate-500" />
          <p className="text-slate-500 text-xs leading-[1.4] m-0">
            {v.location}
          </p>
        </div>
        <button className="self-start text-[12.5px] py-2 px-4 rounded-full text-white font-bold border-none cursor-pointer font-sans bg-[linear-gradient(120deg,var(--color-primary),var(--color-secondary))]">
          Book Now
        </button>
      </div>
    </div>
  );
}

export default function Vendors() {
  return (
    <section id="vendors" className="py-20 bg-white">
      <div className="max-w-[1280px] mx-auto px-5 dt:px-8">
        {/* Heading: centered on tablet/desktop, sticks below the header while scrolling on mobile */}
        <div className="hidden sm:block text-center max-w-[560px] mx-auto mb-10">
          <span className="text-secondary font-bold text-sm font-sans">
            Our Network
          </span>
          <h2 className="font-heading text-slate-900 font-bold text-[clamp(26px,3.2vw,36px)] tracking-[-0.02em] mt-2">
            Our Vendors
          </h2>
        </div>
        <div className="sm:hidden sticky top-16 z-[5] bg-white text-center max-w-[560px] mx-auto pt-3 pb-7">
          <span className="text-secondary font-bold text-sm font-sans">
            Our Network
          </span>
          <h2 className="font-heading text-slate-900 font-bold text-[clamp(26px,3.2vw,36px)] tracking-[-0.02em] mt-2">
            Our Vendors
          </h2>
        </div>

        {/* Tablet/desktop: plain grid */}
        <div className="hidden sm:grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-5">
          {VENDORS_DATA.map((v, i) => (
            <Card key={`${v.name}-${i}`} v={v} />
          ))}
        </div>

        {/* Mobile: cards stack via position:sticky at a shared offset, cascading over each other while scrolling */}
        <div className="sm:hidden relative">
          {VENDORS_DATA.map((v, i) => (
            <div key={`${v.name}-${i}`} className="sticky top-[180px] pb-6">
              <Card v={v} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
