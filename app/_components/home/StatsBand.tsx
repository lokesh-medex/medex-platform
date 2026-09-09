"use client";

/**
 * Stats band — numbers count up once on scroll via GSAP, gated on
 * `prefers-reduced-motion: no-preference` — the final value is what ships in
 * the markup, so reduced-motion users and crawlers see the real number and
 * GSAP only rewinds it when motion is welcome.
 *
 * All four stats are one single `glass.vivid` panel rather than four cards, to
 * keep the page's backdrop-filter count down.
 */

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FiHeadphones, FiShield, FiStar, FiUsers } from "react-icons/fi";
import BackdropMotifs from "@/app/_components/shared/BackdropMotifs";
import { Parallax } from "@/app/_components/shared/Motion";
import { glass, glassScrim } from "@/app/_lib/glass";
import {
  PARTNER_LOGOS_DATA,
  TESTIMONIALS_DATA,
  VENDORS_DATA,
} from "@/app/_lib/homepage-data";
import Mesh from "./Mesh";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const AVG_RATING =
  TESTIMONIALS_DATA.reduce((sum, t) => sum + t.rating, 0) /
  TESTIMONIALS_DATA.length;

interface Stat {
  Icon: typeof FiUsers;
  value: number;
  decimals: number;
  prefix?: string;
  suffix?: string;
  label: string;
  sub: string;
}

const STATS: Stat[] = [
  {
    Icon: FiShield,
    value: PARTNER_LOGOS_DATA.length,
    decimals: 0,
    suffix: "+",
    label: "Hospital partners",
    sub: "JCI-accredited and ISO-certified facilities",
  },
  {
    Icon: FiUsers,
    value: VENDORS_DATA.length,
    decimals: 0,
    label: "Verified vendors",
    sub: "Clinics, labs, spas — vetted before listing",
  },
  {
    Icon: FiStar,
    value: AVG_RATING,
    decimals: 1,
    suffix: "/5",
    label: "Average rating",
    sub: "From patients who booked through Medex",
  },
  {
    Icon: FiHeadphones,
    value: 24,
    decimals: 0,
    suffix: "/7",
    label: "Doctor on call",
    sub: "Licensed GPs by phone or video, any hour",
  },
];

function format(n: number, decimals: number) {
  return n.toFixed(decimals);
}

/**
 * Hairline dividers for a grid that goes 1 → 2 → 4 columns: horizontal rules
 * while stacked, vertical ones once cells sit side by side.
 */
function cellClasses(i: number) {
  const cls = ["p-7 dt:p-9 border-white/45"];
  if (i > 0) cls.push("border-t");
  if (i < 2) cls.push("sm:border-t-0");
  if (i % 2 === 1) cls.push("sm:border-l");
  if (i > 0) cls.push("dt:border-t-0 dt:border-l");
  return cls.join(" ");
}

export default function StatsBand() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const nodes = gsap.utils.toArray<HTMLElement>("[data-countup]");
        if (!nodes.length) return;

        const tweens = nodes.map((node) => {
          const to = Number(node.dataset.to ?? 0);
          const decimals = Number(node.dataset.decimals ?? 0);
          const counter = { v: 0 };

          return gsap.to(counter, {
            v: to,
            duration: 1.4,
            ease: "power2.out",
            onUpdate: () => {
              node.textContent = format(counter.v, decimals);
            },
            scrollTrigger: {
              trigger: node,
              start: "top 92%",
              toggleActions: "play none none none",
            },
          });
        });

        return () => tweens.forEach((t) => t.kill());
      });

      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <section ref={ref} className="relative z-0 pt-40 pb-24 dt:pb-28">
      <Parallax yPercent={-8} className="pointer-events-none absolute inset-0">
        <Mesh preset="stats" />
      </Parallax>
      <Parallax yPercent={-12} className="pointer-events-none absolute inset-0">
        <BackdropMotifs
          count={9}
          opacity={0.1}
          seed={37}
          zone="full"
          minSize={90}
          maxSize={200}
        />
      </Parallax>

      <div className="relative mx-auto max-w-[1280px] px-5 dt:px-8">
        <div className="mb-10 max-w-[620px]">
          <span className="font-sans text-[12px] font-bold tracking-[0.16em] text-primary uppercase">
            The network so far
          </span>
          <h2 className="mt-3 font-heading text-[clamp(28px,4vw,46px)] leading-[1.04] font-bold tracking-[-0.035em] text-balance text-slate-900">
            Numbers that decide where you get care.
          </h2>
        </div>

        <div
          className={`relative isolate grid grid-cols-1 overflow-hidden rounded-[32px] sm:grid-cols-2 dt:grid-cols-4 ${glass.vivid} ${glassScrim}`}
        >
          {STATS.map(
            ({ Icon, value, decimals, prefix, suffix, label, sub }, i) => (
              <div key={label} className={cellClasses(i)}>
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-white/70 text-primary-700 shadow-[0_2px_8px_rgba(15,23,42,0.08)]">
                  <Icon size={17} />
                </div>
                <div className="flex items-baseline font-heading text-[clamp(38px,4.6vw,56px)] leading-none font-bold tracking-[-0.04em] text-slate-900">
                  {prefix}
                  <span
                    data-countup
                    data-to={value}
                    data-decimals={decimals}
                    className="tabular-nums"
                  >
                    {format(value, decimals)}
                  </span>
                  {suffix && (
                    <span className="text-secondary-600">{suffix}</span>
                  )}
                </div>
                <div className="mt-3 font-heading text-[15px] font-bold text-slate-900">
                  {label}
                </div>
                <p className="mt-1.5 m-0 font-sans text-[13px] leading-[1.5] text-slate-700">
                  {sub}
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
