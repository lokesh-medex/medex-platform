/**
 * Membership — three `glass.dark` panels on the dark `membership` mesh
 * preset instead of flat white/gradient cards. Only the tier's
 * name/price/period/desc/features/isFeatured/cta are used — the data
 * module's other style fields (bg/border/shadow/textColor/...) were authored
 * for a light card and don't apply to a dark glass shell, so they're ignored
 * here. The featured tier scales up and glows on desktop; on mobile it just
 * leads the stack (scaling up would just make it awkwardly wide there).
 */

import { Button, Tag } from "antd";
import { FiArrowRight, FiCheck } from "react-icons/fi";
import BackdropMotifs from "@/app/_components/shared/BackdropMotifs";
import { Parallax, Reveal } from "@/app/_components/shared/Motion";
import { glass } from "@/app/_lib/glass";
import {
  MEMBERSHIP_TIERS_DATA,
  type MembershipTier,
} from "@/app/_lib/homepage-data";
import Mesh from "./Mesh";

function TierCard({ tier }: { tier: MembershipTier }) {
  return (
    <article
      className={`relative isolate flex flex-col rounded-[32px] p-8 transition-transform duration-300 dt:p-9 ${
        tier.isFeatured
          ? "dt:scale-105 shadow-[0_0_80px_rgba(243,59,39,0.35)]"
          : ""
      } ${glass.dark}`}
    >
      {tier.isFeatured && (
        <Tag className="absolute! -top-3! left-8! m-0! rounded-full! border-0! bg-[linear-gradient(120deg,var(--color-primary),var(--color-secondary))]! px-3! py-1! font-sans text-[11px]! font-bold! text-white! tracking-[0.1em]! uppercase!">
          Most popular
        </Tag>
      )}

      <h3 className="mb-2 font-heading text-[22px] font-bold tracking-[-0.02em] text-white">
        {tier.name}
      </h3>
      <div className="mb-4 flex items-baseline gap-1.5">
        <span className="font-heading text-[36px] leading-none font-bold tracking-[-0.03em] text-white">
          {tier.price}
        </span>
        {tier.period && (
          <span className="font-sans text-[13px] text-white/55">
            {tier.period}
          </span>
        )}
      </div>
      <p className="mb-7 font-sans text-[14px] leading-[1.6] text-white/70">
        {tier.desc}
      </p>

      <ul className="mb-8 flex flex-1 flex-col gap-3">
        {tier.features.map((f) => (
          <li
            key={f}
            className="flex items-start gap-2.5 font-sans text-[13.5px] leading-[1.5] text-white/85"
          >
            <FiCheck size={16} className="mt-0.5 shrink-0 text-[#ff8a75]" />
            {f}
          </li>
        ))}
      </ul>

      <Button
        type={tier.isFeatured ? "primary" : "default"}
        ghost={!tier.isFeatured}
        block
        size="large"
        className={
          tier.isFeatured
            ? "h-auto! border-0! bg-[linear-gradient(120deg,var(--color-primary),var(--color-secondary))]! py-3.5! text-[14.5px]! font-sans"
            : "h-auto! border-white/25! py-3.5! text-[14.5px]! text-white! font-sans hover:border-white/50! hover:text-white!"
        }
      >
        {tier.cta}
      </Button>
    </article>
  );
}

export default function Membership() {
  return (
    <section className="relative py-24 dt:py-32">
      <Parallax yPercent={-8} className="pointer-events-none absolute inset-0">
        <Mesh preset="membership" />
      </Parallax>
      <Parallax yPercent={-12} className="pointer-events-none absolute inset-0">
        <BackdropMotifs
          count={9}
          opacity={0.1}
          color="#ffffff"
          seed={53}
          zone="full"
          minSize={90}
          maxSize={200}
        />
      </Parallax>

      <div className="relative mx-auto max-w-[1280px] px-5 dt:px-8">
        <div className="mx-auto mb-16 max-w-[680px] text-center">
          <span className="font-sans text-[12px] font-bold tracking-[0.16em] text-[#ff8a75] uppercase">
            Membership
          </span>
          <h2 className="mt-3 font-heading text-[clamp(30px,4.4vw,52px)] leading-[1.02] font-bold tracking-[-0.04em] text-balance text-white">
            Pick the plan that fits your family.
          </h2>
          <div className="mt-7 flex justify-center">
            <Button
              type="text"
              href="/membership"
              className="h-auto! border-[1.5px]! border-white/25! bg-transparent! px-6! py-3! text-[14px]! text-white! font-sans hover:border-white/50! hover:text-white!"
            >
              <span className="flex items-center gap-2">
                Browse all plans
                <FiArrowRight size={14} />
              </span>
            </Button>
          </div>
        </div>

        <Reveal
          preset="standard"
          className="mx-auto grid max-w-[1080px] grid-cols-1 gap-6 dt:grid-cols-3 dt:items-center dt:gap-7"
        >
          {MEMBERSHIP_TIERS_DATA.map((tier) => (
            <TierCard key={tier.name} tier={tier} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
