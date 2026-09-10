/**
 * Membership page — the destination for the homepage's "Browse all plans"
 * and the header's "Become a Member" CTAs (previously both inert). Follows
 * the same Vivid Mesh composition as `/about`/`/contact`: a light breadcrumb
 * + hero on `Mesh preset="about"`, then a dark plan grid reusing the existing
 * `membership` mesh preset built for the homepage's teaser section, closing
 * with the shared dark CTA + Footer.
 */

import Link from "next/link";
import { Parallax, Reveal } from "@/app/_components/shared/Motion";
import BackdropMotifs from "@/app/_components/shared/BackdropMotifs";
import PageShell from "@/app/_components/shared/PageShell";
import Mesh from "@/app/_components/home/Mesh";
import CTA from "@/app/_components/home/CTA";
import Footer from "@/app/_components/home/Footer";
import { glass } from "@/app/_lib/glass";
import {
  MEMBERSHIP_FOOTNOTES,
  MEMBERSHIP_HERO,
  MEMBERSHIP_PLANS_DATA,
  MEMBERSHIP_STATS,
} from "@/app/_lib/membership-data";
import PlanCard from "@/app/_components/membership/PlanCard";

export default function MembershipPage() {
  return (
    <PageShell active="" showFooter={false}>
      <div className="overflow-hidden bg-[#F5F5F5]">
        <section className="relative">
          <Mesh preset="about" />
          <BackdropMotifs
            count={7}
            opacity={0.05}
            seed={41}
            zone="edges"
            minSize={100}
            maxSize={200}
          />

          <div className="relative mx-auto max-w-[1280px] px-5 pt-6 pb-2 dt:px-8">
            <div
              className={`inline-flex w-fit items-center gap-1.5 rounded-full px-4 py-2 text-[13px] text-slate-500 ${glass.subtle}`}
            >
              <Link href="/" className="text-slate-500">
                Home
              </Link>
              <span>/</span>
              <span className="font-semibold text-slate-900">Membership</span>
            </div>
          </div>

          <Reveal
            preset="standard"
            className="relative mx-auto max-w-[1280px] px-5 pt-10 pb-16 dt:px-8 dt:pt-14 dt:pb-20"
          >
            <div className="mx-auto max-w-[720px] text-center">
              <span className="font-sans text-[12px] font-bold tracking-[0.16em] text-secondary uppercase">
                {MEMBERSHIP_HERO.eyebrow}
              </span>
              <h1 className="mt-3 font-heading text-[clamp(32px,5vw,56px)] leading-[1.04] font-bold tracking-[-0.04em] text-balance text-slate-900">
                {MEMBERSHIP_HERO.title}
              </h1>
              <p className="mx-auto mt-6 max-w-[600px] font-sans text-[clamp(15px,1.6vw,18px)] leading-[1.6] text-slate-600">
                {MEMBERSHIP_HERO.desc}
              </p>
              <div
                className={`mx-auto mt-6 w-fit rounded-full px-5 py-2 font-sans text-[13.5px] font-semibold text-primary-700 ${glass.subtle}`}
              >
                {MEMBERSHIP_HERO.promo}
              </div>
            </div>
          </Reveal>

          <Reveal
            preset="subtle"
            className="relative mx-auto mb-16 grid max-w-[900px] grid-cols-2 gap-5 px-5 dt:grid-cols-4 dt:px-8"
          >
            {MEMBERSHIP_STATS.map((stat) => (
              <div
                key={stat.label}
                className={`rounded-[20px] p-5 text-center ${glass.subtle}`}
              >
                <div className="font-heading text-[26px] font-bold tracking-[-0.03em] text-slate-900">
                  {stat.value}
                </div>
                <div className="mt-1 font-sans text-[12.5px] text-slate-500">
                  {stat.label}
                </div>
              </div>
            ))}
          </Reveal>
        </section>
      </div>

      <div className="relative overflow-hidden bg-[#100119] py-24 dt:py-32">
        <Parallax
          yPercent={-8}
          className="pointer-events-none absolute inset-0"
        >
          <Mesh preset="membership" />
        </Parallax>
        <Parallax
          yPercent={-12}
          className="pointer-events-none absolute inset-0"
        >
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
              Plans
            </span>
            <h2 className="mt-3 font-heading text-[clamp(28px,4vw,44px)] leading-[1.04] font-bold tracking-[-0.035em] text-balance text-white">
              Pick the plan that fits your care needs.
            </h2>
          </div>

          <Reveal
            preset="standard"
            className="mx-auto grid max-w-[1200px] grid-cols-1 gap-6 sm:grid-cols-2 dt:grid-cols-4 dt:items-center dt:gap-6"
          >
            {MEMBERSHIP_PLANS_DATA.map((plan) => (
              <PlanCard key={plan.slug} plan={plan} />
            ))}
          </Reveal>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {MEMBERSHIP_FOOTNOTES.map((note) => (
              <span key={note} className="font-sans text-[13px] text-white/55">
                {note}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="overflow-hidden bg-[#0d0116]">
        <CTA />
        <Footer />
      </div>
    </PageShell>
  );
}
