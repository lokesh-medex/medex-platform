"use client";

/**
 * Hero — full-bleed `100svh` (svh, so mobile browser chrome can't clip it),
 * a display-scale headline with a single gradient-clipped word, and a row of
 * three glass cards that deliberately hang past the section boundary into
 * the stats band below (negative bottom margin + `z-10` on the section,
 * `z-0` on the next one).
 */

import { useCallback, useEffect, useState } from "react";
import { Button } from "antd";
import { FiArrowRight, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FaFileMedicalAlt, FaRegClock, FaSearchPlus } from "react-icons/fa";
import ImageWithFallback from "@/app/_components/shared/ImageWithFallback";
import BackdropMotifs from "@/app/_components/shared/BackdropMotifs";
import { Parallax } from "@/app/_components/shared/Motion";
import { glass, glassScrim } from "@/app/_lib/glass";
import {
  SERVICES_DATA,
  SLIDES_DATA,
  VENDORS_DATA,
} from "@/app/_lib/homepage-data";
import Mesh from "./Mesh";

const HERO_INTERVAL_MS = 6500;

/** Brand gradient, lightened — the real one goes muddy clipped over a dark hero. */
const HEADLINE_GRADIENT = "linear-gradient(100deg, #ff9d86, #ffb3c9, #e879f9)";

const HERO_CARDS = [
  {
    Icon: FaSearchPlus,
    kicker: "Compare",
    value: `${VENDORS_DATA.length} vendors`,
    desc: "Hospitals, labs and wellness studios lined up in a single search.",
  },
  {
    Icon: FaRegClock,
    kicker: "Book",
    value: SERVICES_DATA[0].secondaryValue,
    desc: "Curated packages confirmed without the phone-call back-and-forth.",
  },
  {
    Icon: FaFileMedicalAlt,
    kicker: "Results",
    value: SERVICES_DATA[1].secondaryValue,
    desc: "Certified lab reports delivered digitally, straight to your phone.",
  },
];

/** Splits off the final word so exactly one word gets the gradient clip. */
function splitHeadline(title: string) {
  const words = title.trim().split(" ");
  const last = words.pop() ?? "";
  return { head: words.join(" "), last };
}

export default function Hero() {
  const [index, setIndex] = useState(0);
  const active = SLIDES_DATA[index];
  const { head, last } = splitHeadline(active.title);

  const go = useCallback((delta: number) => {
    setIndex((i) => (i + delta + SLIDES_DATA.length) % SLIDES_DATA.length);
  }, []);

  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % SLIDES_DATA.length),
      HERO_INTERVAL_MS
    );
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative z-10 flex min-h-[100svh] flex-col bg-[#170320]">
      {/* Slide imagery — clipped in its own layer so the section itself can
          let the stat cards overflow past its bottom edge. */}
      <div className="absolute inset-0 overflow-hidden">
        {SLIDES_DATA.map((slide, i) => (
          <div
            key={slide.id}
            aria-hidden={i !== index}
            className="absolute inset-0 transition-opacity duration-[900ms] ease-out"
            style={{ opacity: i === index ? 1 : 0 }}
          >
            <ImageWithFallback
              src={slide.bgSrc}
              alt=""
              fill
              priority={i === 0}
              sizes="100vw"
              className="scale-105 object-cover"
              fallback={
                <div
                  className="absolute inset-0"
                  style={{ background: slide.gradient }}
                />
              }
            />
            <div
              className="absolute inset-0 opacity-55"
              style={{ background: slide.gradient }}
            />
          </div>
        ))}

        {/* Mesh + motifs + a slow dashed ring, all decorative. */}
        <Parallax
          yPercent={-8}
          className="pointer-events-none absolute inset-0"
        >
          <Mesh preset="hero" />
        </Parallax>
        <Parallax
          yPercent={-12}
          className="pointer-events-none absolute inset-0"
        >
          <BackdropMotifs
            count={9}
            opacity={0.12}
            color="#ffffff"
            seed={21}
            zone="full"
            minSize={90}
            maxSize={200}
          />
        </Parallax>
        <div
          aria-hidden
          className="pointer-events-none absolute -right-[18vw] top-1/2 hidden h-[860px] w-[860px] -translate-y-1/2 rounded-full border border-dashed border-white/20 dt:block"
          style={{ animation: "heroSpin 60s linear infinite" }}
        >
          <div className="absolute left-1/2 top-1/2 h-[540px] w-[540px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/15" />
        </div>
        {/* Readability floor under the headline + a fade into the next band. */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,2,16,0.62)_0%,rgba(10,2,16,0.30)_42%,rgba(10,2,16,0.72)_100%)]" />
      </div>

      {/* Copy */}
      <div className="relative z-[5] mx-auto flex w-full max-w-[1280px] flex-1 flex-col justify-center px-5 pt-32 pb-14 dt:px-8">
        <div className="max-w-[920px]">
          <span
            className={`mb-7 inline-flex items-center gap-2 rounded-full px-4 py-2 text-[12.5px] font-bold tracking-[0.14em] text-white uppercase ${glass.dark}`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#ff8a75]" />
            {active.eyebrow}
          </span>

          <h1 className="mb-6 font-heading text-[clamp(40px,7vw,88px)] leading-[0.98] font-bold tracking-[-0.04em] text-balance text-white">
            {head}{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: HEADLINE_GRADIENT }}
            >
              {last}
            </span>
          </h1>

          <p className="mb-9 max-w-[560px] font-sans text-[clamp(16px,1.7vw,20px)] leading-[1.55] text-white/80">
            {active.desc}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              type="text"
              className="h-auto! bg-white! px-7! py-3.5! text-[15px]! text-slate-900! shadow-[0_18px_40px_rgba(0,0,0,0.35)]! transition-transform! duration-200! font-sans hover:-translate-y-0.5!"
            >
              <span className="flex items-center gap-2">
                {active.cta}
                <FiArrowRight size={16} />
              </span>
            </Button>
            <Button
              type="text"
              className={`h-auto! px-7! py-3.5! text-[15px]! text-white! transition-transform! duration-200! font-sans hover:-translate-y-0.5! ${glass.dark}`}
            >
              Talk to a doctor
            </Button>
          </div>

          {/* Slide controls */}
          <div className="mt-10 flex items-center gap-4">
            <div className="flex items-center gap-2">
              {SLIDES_DATA.map((slide, i) => (
                <button
                  key={slide.id}
                  onClick={() => setIndex(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className="h-1.5 rounded-full transition-all duration-300"
                  style={{
                    width: i === index ? 34 : 10,
                    background:
                      i === index ? "#ffffff" : "rgba(255,255,255,0.35)",
                  }}
                />
              ))}
            </div>
            <span className="font-mono text-xs text-white/50">
              {String(index + 1).padStart(2, "0")} /{" "}
              {String(SLIDES_DATA.length).padStart(2, "0")}
            </span>
            <div className="ml-1 flex items-center gap-2">
              <Button
                type="text"
                shape="circle"
                onClick={() => go(-1)}
                aria-label="Previous slide"
                className={`h-9! w-9! text-white! ${glass.dark}`}
                icon={<FiChevronLeft size={16} />}
              />
              <Button
                type="text"
                shape="circle"
                onClick={() => go(1)}
                aria-label="Next slide"
                className={`h-9! w-9! text-white! ${glass.dark}`}
                icon={<FiChevronRight size={16} />}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Overlap row — hangs 64px past the section into the stats band. */}
      <div className="relative z-10 -mb-16 w-full px-5 dt:px-8">
        <div className="mx-auto grid max-w-[1280px] gap-4 sm:grid-cols-3">
          {HERO_CARDS.map(({ Icon, kicker, value, desc }) => (
            <div
              key={kicker}
              className={`relative isolate rounded-3xl p-6 ${glass.vivid} ${glassScrim}`}
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(120deg,var(--color-primary),var(--color-secondary))] text-white">
                <Icon size={18} />
              </div>
              <div className="mb-1 font-sans text-[11px] font-bold tracking-[0.16em] text-primary-700 uppercase">
                {kicker}
              </div>
              <div className="mb-2 font-heading text-[26px] leading-tight font-bold tracking-[-0.02em] text-slate-900">
                {value}
              </div>
              <p className="m-0 font-sans text-[13.5px] leading-[1.5] text-slate-700">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
