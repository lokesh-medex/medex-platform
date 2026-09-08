"use client";

import { useEffect, useRef, useState } from "react";
import { Button, Input } from "antd";
import {
  FiChevronLeft,
  FiChevronRight,
  FiSearch,
  FiShield,
} from "react-icons/fi";
import ImageWithFallback from "@/app/_components/shared/ImageWithFallback";
import { SLIDES_DATA } from "@/app/_lib/homepage-data";

const HERO_INTERVAL_MS = 6000;

function OrbitPattern() {
  return (
    <svg
      viewBox="0 0 500 500"
      className="absolute -right-16 top-1/2 -translate-y-1/2 w-[560px] h-[560px] opacity-90"
    >
      <circle
        cx="250"
        cy="250"
        r="200"
        fill="none"
        stroke="rgba(255,255,255,0.35)"
        strokeWidth="1"
        strokeDasharray="4 8"
        style={{
          transformOrigin: "250px 250px",
          animation: "heroSpin 18s linear infinite",
        }}
      />
      <circle
        cx="250"
        cy="250"
        r="140"
        fill="none"
        stroke="rgba(255,255,255,0.35)"
        strokeWidth="1"
        strokeDasharray="4 8"
        style={{
          transformOrigin: "250px 250px",
          animation: "heroSpinRev 12s linear infinite",
        }}
      />
      <circle
        cx="250"
        cy="250"
        r="60"
        fill="rgba(255,255,255,0.14)"
        style={{
          transformOrigin: "250px 250px",
          animation: "heroPulse 2.5s ease-in-out infinite",
        }}
      />
      <circle
        cx="450"
        cy="250"
        r="22"
        fill="rgba(255,255,255,0.5)"
        style={{
          transformOrigin: "450px 250px",
          animation: "heroFloat 3s ease-in-out infinite",
        }}
      />
      <circle
        cx="120"
        cy="90"
        r="14"
        fill="rgba(255,255,255,0.35)"
        style={{
          transformOrigin: "120px 90px",
          animation: "heroFloatSmall 2.6s ease-in-out infinite 0.5s",
        }}
      />
      <circle
        cx="90"
        cy="380"
        r="18"
        fill="rgba(255,255,255,0.3)"
        style={{
          transformOrigin: "90px 380px",
          animation: "heroFloat 3.4s ease-in-out infinite 1s",
        }}
      />
    </svg>
  );
}

function PackagePattern() {
  return (
    <svg
      viewBox="0 0 500 500"
      className="absolute -right-10 top-1/2 -translate-y-1/2 w-[520px] h-[520px] opacity-90"
    >
      <rect
        x="230"
        y="150"
        width="180"
        height="130"
        rx="18"
        fill="rgba(255,255,255,0.14)"
        style={{
          transformOrigin: "320px 215px",
          animation: "heroFloatSmall 2.8s ease-in-out infinite",
        }}
      />
      <rect
        x="270"
        y="200"
        width="180"
        height="130"
        rx="18"
        fill="rgba(255,255,255,0.22)"
        style={{
          transformOrigin: "360px 265px",
          animation: "heroFloatSmall 2.8s ease-in-out infinite 0.5s",
        }}
      />
      <rect
        x="200"
        y="260"
        width="180"
        height="130"
        rx="18"
        fill="rgba(255,255,255,0.3)"
        style={{
          transformOrigin: "290px 325px",
          animation: "heroFloatSmall 2.8s ease-in-out infinite 1s",
        }}
      />
      <line
        x1="290"
        y1="260"
        x2="290"
        y2="390"
        stroke="rgba(255,255,255,0.35)"
        strokeWidth="1.5"
      />
      <line
        x1="200"
        y1="325"
        x2="380"
        y2="325"
        stroke="rgba(255,255,255,0.35)"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function LabPattern() {
  return (
    <svg
      viewBox="0 0 500 500"
      className="absolute -right-10 top-1/2 -translate-y-1/2 w-[520px] h-[520px] opacity-90"
    >
      <rect
        x="250"
        y="90"
        width="46"
        height="220"
        rx="23"
        fill="none"
        stroke="rgba(255,255,255,0.35)"
        strokeWidth="2"
      />
      <path d="M250 230 a23 23 0 0 0 46 0 Z" fill="rgba(255,255,255,0.14)" />
      <circle
        cx="264"
        cy="270"
        r="7"
        fill="rgba(255,255,255,0.55)"
        style={{ animation: "heroRise 1.8s ease-in infinite" }}
      />
      <circle
        cx="282"
        cy="285"
        r="5"
        fill="rgba(255,255,255,0.4)"
        style={{ animation: "heroRise 2.1s ease-in infinite 0.6s" }}
      />
      <circle
        cx="140"
        cy="360"
        r="26"
        fill="none"
        stroke="rgba(255,255,255,0.35)"
        strokeWidth="1.5"
        style={{
          transformOrigin: "140px 360px",
          animation: "heroFloat 3.2s ease-in-out infinite",
        }}
      />
      <circle
        cx="380"
        cy="140"
        r="16"
        fill="rgba(255,255,255,0.3)"
        style={{
          transformOrigin: "380px 140px",
          animation: "heroFloatSmall 2.8s ease-in-out infinite 0.4s",
        }}
      />
    </svg>
  );
}

function WellnessPattern() {
  return (
    <svg
      viewBox="0 0 500 500"
      className="absolute -right-10 top-1/2 -translate-y-1/2 w-[520px] h-[520px] opacity-90"
    >
      <path
        d="M120 380 C180 300, 180 200, 120 120"
        fill="none"
        stroke="rgba(255,255,255,0.35)"
        strokeWidth="2"
      />
      <path
        d="M170 400 C240 300, 240 180, 170 80"
        fill="none"
        stroke="rgba(255,255,255,0.35)"
        strokeWidth="2"
      />
      <circle
        cx="360"
        cy="180"
        r="34"
        fill="rgba(255,255,255,0.14)"
        style={{
          transformOrigin: "360px 180px",
          animation: "heroPulse 2.4s ease-in-out infinite",
        }}
      />
      <circle
        cx="330"
        cy="330"
        r="18"
        fill="rgba(255,255,255,0.3)"
        style={{
          transformOrigin: "330px 330px",
          animation: "heroFloat 3.2s ease-in-out infinite 0.6s",
        }}
      />
    </svg>
  );
}

const PATTERN_BY_TYPE = {
  orbit: OrbitPattern,
  package: PackagePattern,
  lab: LabPattern,
  wellness: WellnessPattern,
};

export default function Hero() {
  const [heroIndex, setHeroIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setHeroIndex((i) => (i + 1) % SLIDES_DATA.length);
    }, HERO_INTERVAL_MS);
  };

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const goTo = (i: number) => {
    setHeroIndex(i);
    startTimer();
  };
  const prev = () =>
    goTo((heroIndex - 1 + SLIDES_DATA.length) % SLIDES_DATA.length);
  const next = () => goTo((heroIndex + 1) % SLIDES_DATA.length);

  const active = SLIDES_DATA[heroIndex];

  return (
    <section className="relative overflow-hidden h-[min(78vh,640px)] min-h-[460px]">
      {SLIDES_DATA.map((slide, i) => {
        const Pattern = PATTERN_BY_TYPE[slide.pattern];
        const isActive = heroIndex === i;
        return (
          <div
            key={slide.id}
            className="absolute inset-0 transition-opacity duration-700"
            style={{
              opacity: isActive ? 1 : 0,
              pointerEvents: isActive ? "auto" : "none",
            }}
            aria-hidden={!isActive}
          >
            <ImageWithFallback
              src={slide.bgSrc}
              alt=""
              fill
              priority={i === 0}
              sizes="100vw"
              className="object-cover"
              fallback={
                <div
                  className="absolute inset-0"
                  style={{ background: slide.gradient }}
                />
              }
            />
            <div
              className="absolute inset-0 opacity-60"
              style={{ background: slide.gradient }}
            />
            <Pattern />
          </div>
        );
      })}

      <div className="relative z-[5] h-full max-w-[1280px] mx-auto px-5 dt:px-8 flex flex-col items-center justify-center text-center pointer-events-none">
        <div className="max-w-[760px] pointer-events-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 mb-6 bg-white/16">
            <FiShield size={13} className="text-white" />
            <span className="text-[12.5px] font-bold text-white font-sans">
              {active.eyebrow}
            </span>
          </div>
          <h1 className="font-heading text-white font-bold leading-[1.08] text-[clamp(28px,4.2vw,48px)] tracking-[-0.02em] mb-5 max-w-[720px] text-balance">
            {active.title}
          </h1>
          <p className="text-white/88 text-[clamp(15px,1.6vw,18px)] mb-8 max-w-[520px] font-sans">
            {active.desc}
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex items-center gap-2 bg-white rounded-full py-1.5 pl-5 pr-1.5 w-full max-w-[460px] shadow-[0_12px_32px_#0f172a26]"
          >
            <FiSearch size={18} className="shrink-0 text-slate-500" />
            <Input
              type="text"
              variant="borderless"
              placeholder="Search pages, services, vendors..."
              className="flex-1 p-0! text-sm! text-slate-900! min-w-0 bg-transparent! font-sans shadow-none!"
            />
            <Button
              type="text"
              htmlType="submit"
              className="h-auto! text-sm! py-2.75! px-5.5! bg-primary! text-white! shrink-0 font-sans"
            >
              Search
            </Button>
          </form>
        </div>
      </div>

      <Button
        type="text"
        shape="circle"
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-4 dt:left-8 top-1/2 -translate-y-1/2 h-10! w-10! bg-white/20! z-10"
        icon={<FiChevronLeft size={20} className="text-white" />}
      />
      <Button
        type="text"
        shape="circle"
        onClick={next}
        aria-label="Next slide"
        className="absolute right-4 dt:right-8 top-1/2 -translate-y-1/2 h-10! w-10! bg-white/20! z-10"
        icon={<FiChevronRight size={20} className="text-white" />}
      />
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
        {SLIDES_DATA.map((slide, i) => (
          <Button
            key={slide.id}
            type="text"
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className="h-1.5! min-w-0! p-0! rounded-full! transition-all! duration-300!"
            style={{
              width: heroIndex === i ? "28px" : "8px",
              background:
                heroIndex === i ? "#ffffff" : "rgba(255,255,255,0.45)",
            }}
          />
        ))}
      </div>
    </section>
  );
}
