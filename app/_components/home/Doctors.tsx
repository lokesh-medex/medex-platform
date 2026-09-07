import { FaStar } from "react-icons/fa";
import ImageWithFallback from "@/app/_components/shared/ImageWithFallback";
import InitialsAvatar from "@/app/_components/shared/InitialsAvatar";
import { DOCTORS_DATA, type Doctor } from "@/app/_lib/homepage-data";

function Card({ d }: { d: Doctor }) {
  return (
    <div className="rounded-[20px] overflow-hidden bg-white border border-slate-200 flex flex-col transition-[transform,box-shadow] duration-250 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_#0f172a1f]">
      <div className="relative h-[280px] overflow-hidden bg-[linear-gradient(135deg,#ffe0dc,#f1dff1)]">
        <ImageWithFallback
          src={d.img}
          alt={d.name}
          fill
          sizes="(min-width: 1040px) 25vw, 50vw"
          className="object-cover"
          fallback={<InitialsAvatar name={d.name.replace("Dr. ", "")} rounded="lg" className="absolute inset-0 h-full w-full text-6xl" />}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,#0f172ae0_100%)] pointer-events-none" />
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-white rounded-full py-1 px-2.5">
          <FaStar size={13} color="#f33b27" />
          <span className="text-[#0f172a] font-bold text-xs font-sans">{d.rating}</span>
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <div className="font-[family-name:var(--font-heading)] text-white font-bold text-lg mb-0.5">{d.name}</div>
          <div className="text-white/85 text-[13px] font-sans">
            {d.specialty} · {d.exp} exp.
          </div>
        </div>
      </div>
      <div className="p-4">
        <button className="w-full text-sm py-2.5 rounded-full text-white font-bold border-none cursor-pointer font-sans bg-[linear-gradient(120deg,#f33b27,#872888)] transition-opacity duration-200 hover:opacity-88">
          Book Now
        </button>
      </div>
    </div>
  );
}

function SectionHeading() {
  return (
    <>
      <div>
        <span className="text-[#f33b27] font-bold text-sm font-sans">Meet the network</span>
        <h2 className="font-[family-name:var(--font-heading)] text-[#0f172a] font-bold text-[clamp(26px,3.2vw,36px)] tracking-[-0.02em] mt-2">
          Doctors ready to see you
        </h2>
      </div>
      <button className="text-[#0f172a] font-bold text-sm bg-transparent border-none cursor-pointer font-sans">
        View all doctors
      </button>
    </>
  );
}

export default function Doctors() {
  return (
    <section id="doctors" className="py-20 bg-white">
      <div className="max-w-[1280px] mx-auto px-5 dt:px-8">
        {/* Heading row: static on tablet/desktop, sticks below the header while scrolling on mobile */}
        <div className="hidden sm:flex items-end justify-between flex-wrap gap-4 mb-10">
          <SectionHeading />
        </div>
        <div className="sm:hidden sticky top-16 z-[5] bg-white flex items-end justify-between flex-wrap gap-4 pb-7">
          <SectionHeading />
        </div>

        {/* Tablet/desktop: plain grid */}
        <div className="hidden sm:grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-5">
          {DOCTORS_DATA.map((d) => (
            <Card key={d.name} d={d} />
          ))}
        </div>

        {/* Mobile: cards stack via position:sticky at a shared offset, cascading over each other while scrolling */}
        <div className="sm:hidden relative">
          {DOCTORS_DATA.map((d) => (
            <div key={d.name} className="sticky top-[180px] pb-6">
              <Card d={d} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
