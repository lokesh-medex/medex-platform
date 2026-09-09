"use client";

/**
 * Testimonials — an infinite marquee on desktop (`dt:`, 1040px+), a native
 * horizontal swipe/snap rail on mobile and tablet. The marquee runs on its
 * own clock (duration + `repeat: -1`), decoupled from page scroll, so unlike
 * the pinned-scrub version this replaced, it can never fight the user's
 * scroll input or feel like it's "stuck".
 *
 * Desktop is also `Draggable` — grabbing the track pauses the auto-scroll,
 * and releasing (with or without an inertia throw) resyncs the tween's
 * progress to wherever the drag left it before resuming, so there's no snap.
 *
 * The marquee track renders two back-to-back copies of the data so looping
 * (drag-wrapped, or the auto-tween's `x: -copyWidth`) is seamless — the
 * frame right after the reset looks identical to the frame right before it.
 */

import { useRef } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { useGSAP } from "@gsap/react";
import { Rate } from "antd";
import BackdropMotifs from "@/app/_components/shared/BackdropMotifs";
import { Parallax } from "@/app/_components/shared/Motion";
import { glass, glassScrim } from "@/app/_lib/glass";
import InitialsAvatar from "@/app/_components/shared/InitialsAvatar";
import { TESTIMONIALS_DATA, type Testimonial } from "@/app/_lib/homepage-data";
import Mesh from "./Mesh";

gsap.registerPlugin(useGSAP, Draggable, InertiaPlugin);

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
            duration: TESTIMONIALS_DATA.length * 6,
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
    <section className="relative py-24 dt:py-32">
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

      {/* Mobile/tablet: native swipe/snap rail, one copy of the data. */}
      <div className="relative overflow-x-auto px-5 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] dt:hidden [&::-webkit-scrollbar]:hidden">
        <div className="flex w-max snap-x snap-mandatory gap-6">
          {TESTIMONIALS_DATA.map((t) => (
            <TestimonialCard key={t.name} t={t} />
          ))}
        </div>
      </div>

      {/* Desktop: infinite marquee, two copies of the data for a seamless loop.
          Draggable too — grab and swipe to scrub it manually. */}
      <div className="relative hidden overflow-hidden dt:block">
        <div
          ref={trackRef}
          className="flex w-max cursor-grab gap-6 px-8 select-none active:cursor-grabbing"
        >
          {[...TESTIMONIALS_DATA, ...TESTIMONIALS_DATA].map((t, i) => (
            <TestimonialCard key={`${t.name}-${i}`} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
