"use client";

/**
 * About page — built on the same Vivid Mesh primitives as `/listings`,
 * `/detail` and `/auth` (see CLAUDE.md) rather than flat section styling.
 * Reuses the home page's `StatsBand`, `Partners` and `CTA` sections outright
 * instead of re-deriving the same numbers/logos/close, matching the register
 * grouping convention documented in `Mesh.tsx` (FLAT SECTION GROUNDS): every
 * light section here shares the same `#F5F5F5` ground PageShell already
 * paints, and only the closing CTA switches to the dark register.
 */

import Link from "next/link";
import { Button } from "antd";
import {
  FiArrowRight,
  FiDollarSign,
  FiHeadphones,
  FiShield,
  FiSmartphone,
} from "react-icons/fi";
import PageShell from "@/app/_components/shared/PageShell";
import BackdropMotifs from "@/app/_components/shared/BackdropMotifs";
import { Parallax, Reveal } from "@/app/_components/shared/Motion";
import { glass } from "@/app/_lib/glass";
import Mesh from "@/app/_components/home/Mesh";
import StatsBand from "@/app/_components/home/StatsBand";
import Partners from "@/app/_components/home/Partners";
import CTA from "@/app/_components/home/CTA";
import Footer from "@/app/_components/home/Footer";
import MedexMark from "@/app/_components/about/MedexMark";

const VALUES = [
  {
    Icon: FiDollarSign,
    title: "Transparent pricing",
    body: "Compare costs across hospitals, labs and clinics before you book — no hidden fees, no phone-only quotes.",
  },
  {
    Icon: FiShield,
    title: "Verified network",
    body: "Every partner is checked for accreditation and quality before it's listed, not after a complaint.",
  },
  {
    Icon: FiSmartphone,
    title: "Digital-first care",
    body: "Book labs, checkups and consultations online, and get your results the same way.",
  },
  {
    Icon: FiHeadphones,
    title: "Human support, 24/7",
    body: "Licensed doctors and care coordinators are on call any hour, not just business hours.",
  },
];

export default function AboutPage() {
  return (
    <PageShell active="" showCart={false} showFooter={false}>
      <div className="overflow-hidden bg-[#F5F5F5]">
        <section className="relative">
          <Mesh preset="about" />
          <BackdropMotifs
            count={7}
            opacity={0.05}
            seed={92}
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
              <span className="font-semibold text-slate-900">About</span>
            </div>
          </div>

          <Reveal
            preset="standard"
            className="relative mx-auto max-w-[1280px] px-5 pt-10 pb-20 dt:px-8 dt:pt-16 dt:pb-28"
          >
            <MedexMark className="mb-9 h-28 w-28 dt:mb-11 dt:h-40 dt:w-40" />
            <div className="mx-auto max-w-[820px] text-center">
              <span className="font-sans text-[12px] font-bold tracking-[0.16em] text-secondary uppercase">
                About Medex
              </span>
              <h1 className="mt-3 font-heading text-[clamp(32px,5vw,56px)] leading-[1.04] font-bold tracking-[-0.04em] text-balance text-slate-900">
                Digital-first care, backed by real hospitals.
              </h1>
              <p className="mx-auto mt-6 max-w-[640px] font-sans text-[clamp(15px,1.6vw,18px)] leading-[1.6] text-slate-600">
                Medex is a one-stop digital care navigation concierge, backed by
                physical infrastructure across Asia — built to make finding and
                booking quality care simple, transparent and affordable.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Button
                  type="primary"
                  size="large"
                  href="/listings"
                  className="h-auto! px-7! py-3.5! text-[15px]! font-sans"
                >
                  <span className="flex items-center gap-2">
                    Explore the network
                    <FiArrowRight size={15} />
                  </span>
                </Button>
                <Button
                  type="text"
                  size="large"
                  href="/listings/doctors"
                  className="h-auto! border-[1.5px]! border-slate-900/15! bg-white/60! px-7! py-3.5! text-[15px]! text-slate-900! font-sans"
                >
                  Meet the doctors
                </Button>
              </div>
            </div>
          </Reveal>
        </section>

        <section className="relative py-20 dt:py-28">
          <Parallax
            yPercent={-8}
            className="pointer-events-none absolute inset-0"
          >
            <BackdropMotifs
              count={6}
              opacity={0.04}
              seed={53}
              zone="edges"
              minSize={110}
              maxSize={210}
            />
          </Parallax>

          <Reveal
            preset="subtle"
            className="relative mx-auto grid max-w-[1280px] grid-cols-1 gap-6 px-5 dt:grid-cols-2 dt:gap-8 dt:px-8"
          >
            <div className={`rounded-[28px] p-8 dt:p-10 ${glass.subtle}`}>
              <h2 className="mb-3 font-heading text-[22px] font-bold text-slate-900">
                Our story
              </h2>
              <p className="m-0 font-sans text-[14.5px] leading-[1.75] text-slate-600">
                Medex was incorporated amid the pandemic outbreak, initially
                providing top-notch testing facilities and hospital liaisons for
                COVID-19 patients. Since then we&apos;ve expanded into lab
                testing, health checkups, telemedicine, nurse-at-home visits,
                genetic testing and medical travel coordination — now operating
                out of Bangkok and Nepal.
              </p>
            </div>
            <div className={`rounded-[28px] p-8 dt:p-10 ${glass.subtle}`}>
              <h2 className="mb-3 font-heading text-[22px] font-bold text-slate-900">
                Where we&apos;re going
              </h2>
              <p className="m-0 font-sans text-[14.5px] leading-[1.75] text-slate-600">
                Our aim is to become the largest health care aggregator focused
                on delivering exceptional premium primary care and medical
                travel services — facilitating quality care at affordable costs,
                without sacrificing convenience.
              </p>
            </div>
          </Reveal>
        </section>

        <StatsBand variant="section" />

        <section className="relative py-4">
          <Reveal
            preset="subtle"
            className="relative mx-auto max-w-[1280px] px-5 text-center dt:px-8"
          >
            <span className="font-sans text-[12px] font-bold tracking-[0.16em] text-primary uppercase">
              Credentials
            </span>
            <h2 className="mx-auto mt-3 max-w-[620px] font-heading text-[clamp(26px,3.6vw,40px)] leading-[1.06] font-bold tracking-[-0.03em] text-balance text-slate-900">
              JCI-accredited hospitals, not just clinic listings.
            </h2>
          </Reveal>
        </section>

        <Partners />

        <section className="relative py-20 dt:py-28">
          <Parallax
            yPercent={-8}
            className="pointer-events-none absolute inset-0"
          >
            <BackdropMotifs
              count={6}
              opacity={0.04}
              seed={71}
              zone="edges"
              minSize={100}
              maxSize={200}
            />
          </Parallax>

          <div className="relative mx-auto max-w-[1280px] px-5 dt:px-8">
            <div className="mx-auto mb-12 max-w-[620px] text-center">
              <span className="font-sans text-[12px] font-bold tracking-[0.16em] text-secondary uppercase">
                How we work
              </span>
              <h2 className="mt-3 font-heading text-[clamp(28px,4vw,44px)] leading-[1.05] font-bold tracking-[-0.035em] text-balance text-slate-900">
                What makes Medex different.
              </h2>
            </div>

            <Reveal
              preset="standard"
              className="grid grid-cols-1 gap-5 sm:grid-cols-2 dt:grid-cols-4"
            >
              {VALUES.map(({ Icon, title, body }) => (
                <div
                  key={title}
                  className={`rounded-[24px] p-6 ${glass.subtle}`}
                >
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
                    <Icon size={17} />
                  </div>
                  <h3 className="mb-2 font-heading text-[16px] font-bold text-slate-900">
                    {title}
                  </h3>
                  <p className="m-0 font-sans text-[13.5px] leading-[1.6] text-slate-600">
                    {body}
                  </p>
                </div>
              ))}
            </Reveal>
          </div>
        </section>
      </div>

      <div className="overflow-hidden bg-[#0d0116]">
        <CTA />
        <Footer />
      </div>
    </PageShell>
  );
}
