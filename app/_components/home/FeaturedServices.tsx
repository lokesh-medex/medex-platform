import Image from "next/image";
import { FiArrowRight } from "react-icons/fi";
import { HIGHLIGHT_CARDS_DATA, type HighlightCard } from "@/app/_lib/homepage-data";

function Card({ card }: { card: HighlightCard }) {
  return (
    <div className="relative rounded-[18px] overflow-hidden bg-white border border-slate-200 p-5 pt-6 flex flex-col transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-[0_16px_32px_#0f172a1a]">
      <div className="absolute top-0 left-0 right-0 h-1" style={{ background: card.gradient }} />
      <div
        className="h-14 w-14 rounded-[14px] flex items-center justify-center mb-4 p-2.5"
        style={{ background: card.iconBg }}
      >
        <Image src={card.icon} alt={card.name} width={36} height={36} className="max-h-full max-w-full object-contain" />
      </div>
      <span
        className="self-start text-[11px] font-bold tracking-[0.03em] rounded-full px-2.5 py-1 mb-3 font-sans"
        style={{ color: card.tagColor, background: card.tagBg }}
      >
        {card.tag}
      </span>
      <h3 className="font-[family-name:var(--font-heading)] text-[#0f172a] font-bold text-[17px] mb-2">{card.name}</h3>
      <p className="text-slate-500 text-[13px] leading-[1.55] mb-5 flex-1">{card.desc}</p>
      <a
        href={card.href}
        target="_blank"
        rel="noopener"
        className="self-start flex items-center gap-1.5 text-[13px] py-2 px-4 rounded-full text-white font-bold font-sans"
        style={{ background: card.gradient }}
      >
        {card.cta}
        <FiArrowRight size={13} />
      </a>
    </div>
  );
}

export default function FeaturedServices() {
  return (
    <section className="py-20 bg-[#F5F5F5]">
      <div className="max-w-[1280px] mx-auto px-5 dt:px-8">
        {/* Heading: centered on tablet/desktop, sticks below the header while scrolling on mobile */}
        <div className="hidden sm:block text-center max-w-[560px] mx-auto mb-10">
          <span className="text-[#f33b27] font-bold text-sm font-sans">Explore Medex</span>
          <h2 className="font-[family-name:var(--font-heading)] text-[#0f172a] font-bold text-[clamp(26px,3.2vw,36px)] tracking-[-0.02em] mt-2">
            Featured across our services
          </h2>
        </div>
        <div className="sm:hidden sticky top-16 z-[5] bg-[#F5F5F5] text-center max-w-[560px] mx-auto pt-3 pb-7">
          <span className="text-[#f33b27] font-bold text-sm font-sans">Explore Medex</span>
          <h2 className="font-[family-name:var(--font-heading)] text-[#0f172a] font-bold text-[clamp(26px,3.2vw,36px)] tracking-[-0.02em] mt-2">
            Featured across our services
          </h2>
        </div>

        {/* Tablet/desktop: plain grid */}
        <div className="hidden sm:grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-5">
          {HIGHLIGHT_CARDS_DATA.map((card) => (
            <Card key={card.name} card={card} />
          ))}
        </div>

        {/* Mobile: cards stack via position:sticky at a shared offset, cascading over each other while scrolling */}
        <div className="sm:hidden relative">
          {HIGHLIGHT_CARDS_DATA.map((card) => (
            <div key={card.name} className="sticky top-[180px] pb-6">
              <Card card={card} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
