import { FiCheck } from "react-icons/fi";
import { MEMBERSHIP_TIERS_DATA } from "@/app/_lib/homepage-data";

export default function Membership() {
  return (
    <section id="membership" className="py-20 bg-[#F5F5F5]">
      <div className="max-w-[1280px] mx-auto px-5 dt:px-8">
        <div className="text-center max-w-[560px] mx-auto mb-10">
          <span className="text-[#872888] font-bold text-sm font-sans">Become a Member</span>
          <h2 className="font-[family-name:var(--font-heading)] text-[#0f172a] font-bold text-[clamp(26px,3.2vw,36px)] tracking-[-0.02em] mt-2">
            Membership plans for every need
          </h2>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-6 items-stretch">
          {MEMBERSHIP_TIERS_DATA.map((tier) => (
            <div
              key={tier.name}
              className="relative rounded-[20px] p-8 px-7 flex flex-col"
              style={{ background: tier.bg, border: tier.border, boxShadow: tier.shadow }}
            >
              {tier.isFeatured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[11px] font-bold tracking-[0.04em] text-white bg-[#f33b27] rounded-full px-3.5 py-1">
                  MOST POPULAR
                </span>
              )}
              <h3 className="font-[family-name:var(--font-heading)] font-bold text-xl mb-2" style={{ color: tier.textColor }}>
                {tier.name}
              </h3>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="font-[family-name:var(--font-heading)] font-bold text-[32px]" style={{ color: tier.textColor }}>
                  {tier.price}
                </span>
                <span className="text-sm" style={{ color: tier.subTextColor }}>{tier.period}</span>
              </div>
              <p className="text-[13.5px] leading-[1.5] mb-6" style={{ color: tier.subTextColor }}>{tier.desc}</p>
              <div className="flex flex-col gap-3 mb-7 flex-1">
                {tier.features.map((f) => (
                  <div key={f} className="flex items-start gap-2">
                    <FiCheck size={16} color={tier.checkColor} className="shrink-0 mt-px" />
                    <span className="text-[13.5px]" style={{ color: tier.textColor }}>{f}</span>
                  </div>
                ))}
              </div>
              <button
                className="w-full text-sm py-3 rounded-full font-bold cursor-pointer font-sans"
                style={{ background: tier.btnBg, color: tier.btnColor, border: tier.btnBorder }}
              >
                {tier.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
