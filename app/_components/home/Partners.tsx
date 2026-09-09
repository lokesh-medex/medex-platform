"use client";

/**
 * Partners — each marquee logo sits in its own `glass.vivid` chip instead of
 * a bare white card, so the mesh behind the strip still reads through.
 *
 * Carousel behavior mirrors Testimonials: an infinite marquee on desktop
 * (`dt:`, 1040px+), decoupled from page scroll and also `Draggable` — grabbing
 * the track pauses the auto-scroll, and releasing (with or without an inertia
 * throw) resyncs the tween's progress to wherever the drag left it before
 * resuming, so there's no snap. Mobile/tablet gets a native horizontal
 * swipe/snap rail instead.
 *
 * The marquee track renders two back-to-back copies of the data so looping
 * (drag-wrapped, or the auto-tween's `x: -copyWidth`) is seamless — the frame
 * right after the reset looks identical to the frame right before it.
 */

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { useGSAP } from "@gsap/react";
import BackdropMotifs from "@/app/_components/shared/BackdropMotifs";
import { Parallax, Reveal } from "@/app/_components/shared/Motion";
import { glass } from "@/app/_lib/glass";
import { PARTNER_LOGOS_DATA } from "@/app/_lib/homepage-data";
import Mesh from "./Mesh";

gsap.registerPlugin(useGSAP, Draggable, InertiaPlugin);

function LogoChip({ src, alt }: { src: string; alt: string }) {
  return (
    <div
      className={`flex h-[92px] w-[190px] shrink-0 snap-start items-center justify-center rounded-2xl p-4 ${glass.vivid}`}
    >
      <Image
        src={src}
        alt={alt}
        width={148}
        height={56}
        className="max-h-full max-w-full object-contain"
      />
    </div>
  );
}

export default function Partners() {
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        "(prefers-reduced-motion: no-preference) and (min-width: 1040px)",
        () => {
          const track = trackRef.current;
          if (!track) return;

          const copyWidth = track.scrollWidth / 2;
          const wrap = gsap.utils.wrap(-copyWidth, 0);
          const progressFor = (x: number) =>
            gsap.utils.wrap(0, 1, -x / copyWidth);

          const tween = gsap.to(track, {
            x: -copyWidth,
            duration: PARTNER_LOGOS_DATA.length * 6,
            ease: "none",
            repeat: -1,
          });

          let hovering = false;
          const resumeIfIdle = () => {
            if (!hovering) tween.play();
          };

          const onEnter = () => {
            hovering = true;
            tween.pause();
          };
          const onLeave = () => {
            hovering = false;
            resumeIfIdle();
          };
          track.addEventListener("mouseenter", onEnter);
          track.addEventListener("mouseleave", onLeave);

          const [draggable] = Draggable.create(track, {
            type: "x",
            inertia: true,
            onPress() {
              tween.pause();
            },
            onDrag() {
              this.x = wrap(this.x);
              gsap.set(track, { x: this.x });
            },
            onThrowUpdate() {
              this.x = wrap(this.x);
              gsap.set(track, { x: this.x });
            },
            onDragEnd() {
              if (!this.tween) {
                tween.progress(progressFor(this.x));
                resumeIfIdle();
              }
            },
            onThrowComplete() {
              tween.progress(progressFor(this.x));
              resumeIfIdle();
            },
          });

          return () => {
            track.removeEventListener("mouseenter", onEnter);
            track.removeEventListener("mouseleave", onLeave);
            draggable.kill();
            tween.kill();
          };
        }
      );

      return () => mm.revert();
    },
    { scope: trackRef }
  );

  return (
    <section id="partners" className="relative py-24 dt:py-28">
      <Parallax yPercent={-8} className="pointer-events-none absolute inset-0">
        <Mesh preset="partners" />
      </Parallax>
      <Parallax yPercent={-12} className="pointer-events-none absolute inset-0">
        <BackdropMotifs
          count={9}
          opacity={0.1}
          seed={104}
          zone="full"
          minSize={90}
          maxSize={200}
        />
      </Parallax>

      <div className="relative mx-auto max-w-[1280px] px-5 dt:px-8">
        <Reveal
          preset="standard"
          className="mx-auto mb-12 max-w-[620px] text-center"
        >
          <span className="font-sans text-[12px] font-bold tracking-[0.16em] text-primary uppercase">
            Featured hospital partners
          </span>
          <h2 className="mt-3 font-heading text-[clamp(28px,4vw,42px)] leading-[1.05] font-bold tracking-[-0.035em] text-balance text-slate-900">
            JCI-accredited care, ready for your team.
          </h2>
        </Reveal>
      </div>

      <div className="relative mt-4">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-[2] w-24 bg-[linear-gradient(90deg,#ffffff,transparent)]" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-[2] w-24 bg-[linear-gradient(270deg,#ffffff,transparent)]" />

        {/* Mobile/tablet: native swipe/snap rail, one copy of the data. */}
        <div className="relative overflow-x-auto px-5 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] dt:hidden [&::-webkit-scrollbar]:hidden">
          <div className="flex w-max snap-x snap-mandatory gap-5">
            {PARTNER_LOGOS_DATA.map((logo) => (
              <LogoChip key={logo.alt} src={logo.src} alt={logo.alt} />
            ))}
          </div>
        </div>

        {/* Desktop: infinite marquee, two copies of the data for a seamless
            loop. Draggable too — grab and swipe to scrub it manually. */}
        <div className="relative hidden overflow-hidden dt:block">
          <div
            ref={trackRef}
            className="flex w-max cursor-grab gap-5 px-8 select-none active:cursor-grabbing"
          >
            {[...PARTNER_LOGOS_DATA, ...PARTNER_LOGOS_DATA].map((logo, i) => (
              <LogoChip
                key={`${logo.alt}-${i}`}
                src={logo.src}
                alt={logo.alt}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
