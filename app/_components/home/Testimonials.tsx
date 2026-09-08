"use client";

/**
 * Testimonials — a GSAP-pinned horizontal scroll: the section pins in place
 * while the track of testimonial cards translates left as the page scrolls
 * vertically through the pinned duration (the `gsap.to(track, { x: ...
 * scrollTrigger: { pin: true } })` recipe).
 *
 * The DOM underneath is a genuinely-working `overflow-x-auto` snap rail on
 * its own — no layout branching between the two motion states. When
 * `prefers-reduced-motion: no-preference` is NOT set, GSAP never runs and the
 * rail behaves like any horizontally-scrollable row (drag/swipe/trackpad).
 * When motion is welcome, `mm.add` swaps the container to `overflow: hidden`
 * and hands scroll control to the pinned tween instead, so there's never a
 * moment where native scroll and the tween fight each other.
 *
 * `pinType: "transform"` is required here because the section (like every
 * homepage section) is `overflow-hidden` for its Mesh/BackdropMotifs layers —
 * GSAP's default `position: fixed` pin doesn't survive that ancestor, but a
 * transform-based pin does.
 */

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Rate } from "antd";
import BackdropMotifs from "@/app/_components/shared/BackdropMotifs";
import { Parallax } from "@/app/_components/shared/Motion";
import { glass, glassScrim } from "@/app/_lib/glass";
import InitialsAvatar from "@/app/_components/shared/InitialsAvatar";
import { TESTIMONIALS_DATA, type Testimonial } from "@/app/_lib/homepage-data";
import Mesh from "./Mesh";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <article
      className={`relative isolate flex w-[86vw] shrink-0 snap-start flex-col rounded-[32px] p-8 dt:w-[440px] dt:p-9 ${glass.vivid} ${glassScrim}`}
    >
      <Rate
        disabled
        value={t.rating}
        style={{ fontSize: 15 }}
        className="mb-6"
      />
      <p className="mb-8 flex-1 font-heading text-[19px] leading-[1.55] font-medium tracking-[-0.01em] text-balance text-slate-900">
        “{t.quote}”
      </p>
      <div className="flex items-center gap-3 border-t border-slate-900/10 pt-5">
        <InitialsAvatar
          name={t.name}
          className="h-11! w-11! shrink-0 text-[15px]!"
        />
        <div className="min-w-0">
          <div className="font-sans text-[14px] font-bold text-slate-900">
            {t.name}
          </div>
          <div className="truncate font-sans text-[12.5px] text-slate-600">
            {t.role}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const section = sectionRef.current;
        const container = containerRef.current;
        const track = trackRef.current;
        if (!section || !container || !track) return;

        // Native drag-scroll and the pinned tween would otherwise both try to
        // own horizontal position at once — hand it fully to GSAP while
        // motion is welcome, restore the native rail on cleanup.
        const prevOverflow = container.style.overflow;
        container.style.overflow = "hidden";

        const tween = gsap.to(track, {
          x: () => -(track.scrollWidth - container.clientWidth),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => "+=" + (track.scrollWidth - container.clientWidth),
            scrub: 1,
            pin: true,
            pinType: "transform",
            invalidateOnRefresh: true,
          },
        });

        return () => {
          tween.kill();
          container.style.overflow = prevOverflow;
        };
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-24 dt:py-32"
    >
      <Parallax yPercent={-8} className="pointer-events-none absolute inset-0">
        <Mesh preset="testimonials" />
      </Parallax>
      <Parallax yPercent={-12} className="pointer-events-none absolute inset-0">
        <BackdropMotifs
          count={9}
          opacity={0.1}
          seed={128}
          zone="full"
          minSize={90}
          maxSize={200}
        />
      </Parallax>

      <div className="relative mx-auto mb-14 max-w-[1280px] px-5 dt:px-8">
        <div className="mx-auto max-w-[680px] text-center">
          <span className="font-sans text-[12px] font-bold tracking-[0.16em] text-secondary uppercase">
            From people who&apos;ve booked
          </span>
          <h2 className="mt-3 font-heading text-[clamp(30px,4.4vw,52px)] leading-[1.02] font-bold tracking-[-0.04em] text-balance text-slate-900">
            What patients say.
          </h2>
        </div>
      </div>

      <div
        ref={containerRef}
        className="relative overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <div
          ref={trackRef}
          className="flex w-max snap-x snap-mandatory gap-6 px-5 pb-2 dt:px-8"
        >
          {TESTIMONIALS_DATA.map((t) => (
            <TestimonialCard key={t.name} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
