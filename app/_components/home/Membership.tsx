/**
 * Membership teaser — reuses the same `PlanCard` + `MEMBERSHIP_PLANS_DATA`
 * as the full /membership page (see MembershipPage.tsx), rather than the
 * separate Basic/Plus/Family placeholder tiers this section used to carry.
 * That kept the homepage in sync with the real Essential/Advanced/Signature/
 * Prestige plans and let each card's CTA link straight to
 * `/auth/signup?tier=<slug>` for the plan actually being shown.
 */

import { Button } from "antd";
import { FiArrowRight } from "react-icons/fi";
import BackdropMotifs from "@/app/_components/shared/BackdropMotifs";
import { Parallax, Reveal } from "@/app/_components/shared/Motion";
import PlanCard from "@/app/_components/membership/PlanCard";
import { MEMBERSHIP_PLANS_DATA } from "@/app/_lib/membership-data";
import Mesh from "./Mesh";

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
          className="mx-auto grid max-w-[1200px] grid-cols-1 gap-6 sm:grid-cols-2 dt:grid-cols-4 dt:items-center dt:gap-6"
        >
          {MEMBERSHIP_PLANS_DATA.map((plan) => (
            <PlanCard key={plan.slug} plan={plan} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
