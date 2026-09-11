"use client";

/**
 * Services orbital — the homepage's centerpiece. Click a node and related
 * nodes light up; a 760px orbit, a radial brand glow behind it, and the node
 * detail sits in a persistent `glass.dark` panel beside the orbit (rather
 * than an antd Popover) so the section always shows content instead of
 * waiting for a click.
 *
 * Auto-rotation is a plain interval (not GSAP), so it checks
 * `prefers-reduced-motion` itself and simply never starts when motion is
 * unwelcome.
 */

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Button, Tag } from "antd";
import { FiArrowRight, FiHeart, FiStar } from "react-icons/fi";
import { FaFlask, FaStethoscope } from "react-icons/fa";
import BackdropMotifs from "@/app/_components/shared/BackdropMotifs";
import { Parallax } from "@/app/_components/shared/Motion";
import { glass } from "@/app/_lib/glass";
import {
  COLOR,
  SERVICES_DATA,
  type ServiceNode,
} from "@/app/_lib/homepage-data";
import { getTabByLabel, hrefForTab } from "@/app/_lib/listings-data";
import Mesh from "./Mesh";

const VIEWBOX = 760;
const CENTER = VIEWBOX / 2;
const RADIUS = 282;
const ORBIT_STEP_DEG = 0.1;
const ORBIT_INTERVAL_MS = 40;

/** Node accents, kept inside the primary→secondary family rather than a rainbow. */
const ICON_COLORS: Record<ServiceNode["icon"], string> = {
  stethoscope: "#ff8a75",
  flask: "#c4b5fd",
  star: "#f9a8d4",
  heart: "#e879f9",
};

function ServiceIcon({
  icon,
  color,
  size,
}: {
  icon: ServiceNode["icon"];
  color: string;
  size: number;
}) {
  switch (icon) {
    case "stethoscope":
      return <FaStethoscope size={size} color={color} />;
    case "flask":
      return <FaFlask size={size - 2} color={color} />;
    case "star":
      return <FiStar size={size + 2} color={color} />;
    case "heart":
      return <FiHeart size={size + 2} color={color} />;
  }
}

export default function ServicesOrbital() {
  const [angle, setAngle] = useState(0);
  const [activeId, setActiveId] = useState<number>(SERVICES_DATA[0].id);
  const paused = useRef(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      if (!paused.current) setAngle((a) => (a + ORBIT_STEP_DEG) % 360);
    }, ORBIT_INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  const active =
    SERVICES_DATA.find((s) => s.id === activeId) ?? SERVICES_DATA[0];
  const relatedIds = active.relatedIds;
  const activeColor = ICON_COLORS[active.icon];

  return (
    <section id="services" className="relative py-24 dt:py-36">
      <Parallax yPercent={-8} className="pointer-events-none absolute inset-0">
        <Mesh preset="orbital" />
      </Parallax>
      <Parallax yPercent={-12} className="pointer-events-none absolute inset-0">
        <BackdropMotifs
          count={9}
          opacity={0.08}
          color="#ffffff"
          seed={91}
          zone="full"
          minSize={90}
          maxSize={200}
        />
      </Parallax>

      <div className="relative mx-auto max-w-[1320px] px-5 dt:px-8">
        <div className="mx-auto mb-10 max-w-[760px] text-center dt:mb-14">
          <span className="font-sans text-[12px] font-bold tracking-[0.16em] text-[#ff8a75] uppercase">
            What Medex aggregates
          </span>
          <h2 className="mt-4 font-heading text-[clamp(32px,5vw,64px)] leading-[1.0] font-bold tracking-[-0.04em] text-balance text-white">
            One network, every service you need.
          </h2>
          <p className="mx-auto mt-5 max-w-[520px] font-sans text-[clamp(15px,1.6vw,18px)] leading-[1.6] text-white/60">
            Pick a node to see the vendors behind each service. Related services
            light up together.
          </p>
        </div>

        <div className="grid items-center gap-8 dt:grid-cols-[minmax(0,1fr)_400px] dt:gap-16">
          {/* ---------- Orbit ---------- */}
          <div
            className="relative mx-auto aspect-square w-[min(340px,82vw)] dt:w-[min(760px,92vw)]"
            onMouseEnter={() => (paused.current = true)}
            onMouseLeave={() => (paused.current = false)}
          >
            {/* Radial glow behind the whole orbit. */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-[-12%] rounded-full blur-3xl"
              style={{
                background: `radial-gradient(circle, ${activeColor}44 0%, ${COLOR.secondary}33 42%, transparent 68%)`,
                transition: "background 600ms ease",
              }}
            />

            <svg
              className="pointer-events-none absolute inset-0 h-full w-full"
              viewBox={`0 0 ${VIEWBOX} ${VIEWBOX}`}
            >
              {SERVICES_DATA.map((svc, i) => {
                const rad =
                  (((i / SERVICES_DATA.length) * 360 + angle) * Math.PI) / 180;
                const isActive = svc.id === active.id;
                const isRelated = relatedIds.includes(svc.id);
                return (
                  <line
                    key={svc.id}
                    x1={CENTER}
                    y1={CENTER}
                    x2={CENTER + RADIUS * Math.cos(rad)}
                    y2={CENTER + RADIUS * Math.sin(rad)}
                    stroke={
                      isActive
                        ? ICON_COLORS[svc.icon]
                        : isRelated
                          ? "rgba(255,255,255,0.35)"
                          : "rgba(255,255,255,0.1)"
                    }
                    strokeWidth={isActive ? 2.5 : 1.5}
                  />
                );
              })}
              <circle
                cx={CENTER}
                cy={CENTER}
                r={RADIUS}
                fill="none"
                stroke="rgba(255,255,255,0.14)"
              />
              <circle
                cx={CENTER}
                cy={CENTER}
                r={RADIUS - 74}
                fill="none"
                stroke="rgba(255,255,255,0.08)"
                strokeDasharray="3 12"
                style={{
                  transformOrigin: `${CENTER}px ${CENTER}px`,
                  animation: "heroSpin 90s linear infinite",
                }}
              />
              <circle
                cx={CENTER}
                cy={CENTER}
                r={RADIUS + 46}
                fill="none"
                stroke="rgba(255,255,255,0.06)"
                strokeDasharray="2 16"
                style={{
                  transformOrigin: `${CENTER}px ${CENTER}px`,
                  animation: "heroSpinRev 70s linear infinite",
                }}
              />
            </svg>

            {/* Hub */}
            <div className="absolute top-1/2 left-1/2 z-20 flex h-[100px] w-[100px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-[0_16px_60px_rgba(0,0,0,0.5)] dt:h-[172px] dt:w-[172px]">
              <div className="absolute -inset-3 animate-[heroPulse_3.4s_ease-in-out_infinite] rounded-full border border-white/25 dt:-inset-5" />
              <div className="absolute -inset-6 animate-[heroPulse_3.4s_ease-in-out_infinite] rounded-full border border-white/12 [animation-delay:0.7s] dt:-inset-11" />
              <Image
                src="/medex.webp"
                alt="Medex"
                height={40}
                width={176}
                className="h-6 w-auto max-w-[76%] object-contain dt:h-10"
              />
            </div>

            {/* Nodes */}
            {SERVICES_DATA.map((svc, i) => {
              const deg = (i / SERVICES_DATA.length) * 360 + angle;
              const rad = (deg * Math.PI) / 180;
              const xPct = ((CENTER + RADIUS * Math.cos(rad)) / VIEWBOX) * 100;
              const yPct = ((CENTER + RADIUS * Math.sin(rad)) / VIEWBOX) * 100;
              const isActive = svc.id === active.id;
              const isRelated = relatedIds.includes(svc.id);
              const dim = !isActive && !isRelated;
              const color = ICON_COLORS[svc.icon];

              return (
                <div
                  key={svc.id}
                  className="absolute"
                  style={{
                    left: `${xPct}%`,
                    top: `${yPct}%`,
                    transform: "translate(-50%,-50%)",
                    zIndex: isActive ? 30 : 10,
                  }}
                >
                  <div className="flex flex-col items-center">
                    {isActive && (
                      <div
                        aria-hidden
                        className="pointer-events-none absolute top-1/2 left-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl dt:h-44 dt:w-44"
                        style={{
                          background: `radial-gradient(circle, ${color}55, transparent 70%)`,
                        }}
                      />
                    )}
                    <Button
                      type="text"
                      shape="circle"
                      onClick={() => setActiveId(svc.id)}
                      aria-label={svc.title}
                      className="relative! h-14! w-14! transition-transform! duration-300! dt:h-24! dt:w-24!"
                      style={{
                        background: isActive
                          ? "#fff"
                          : isRelated
                            ? "rgba(255,255,255,0.16)"
                            : "rgba(255,255,255,0.06)",
                        border: `2px solid ${
                          isActive
                            ? color
                            : isRelated
                              ? "rgba(255,255,255,0.45)"
                              : "rgba(255,255,255,0.16)"
                        }`,
                        boxShadow: isActive ? `0 0 40px ${color}80` : "none",
                        transform: isActive
                          ? "scale(1.16)"
                          : dim
                            ? "scale(0.94)"
                            : "scale(1)",
                        backdropFilter: isActive ? "none" : "blur(6px)",
                      }}
                      icon={
                        <ServiceIcon
                          icon={svc.icon}
                          color={isActive ? COLOR.ink : color}
                          size={20}
                        />
                      }
                    />
                    <span
                      className="mt-2 font-sans text-[11px] font-bold tracking-[0.02em] whitespace-nowrap transition-colors duration-300 dt:mt-3.5 dt:text-[13px]"
                      style={{
                        color: isActive
                          ? "#fff"
                          : isRelated
                            ? "rgba(255,255,255,0.85)"
                            : "rgba(255,255,255,0.45)",
                      }}
                    >
                      {svc.title}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ---------- Detail panel ---------- */}
          <div className={`rounded-[32px] p-6 dt:p-8 ${glass.dark}`}>
            <div className="mb-4 flex items-center gap-3">
              <span
                className="flex h-11 w-11 items-center justify-center rounded-2xl"
                style={{ background: `${activeColor}22` }}
              >
                <ServiceIcon icon={active.icon} color={activeColor} size={20} />
              </span>
              <span
                className="font-sans text-[11px] font-bold tracking-[0.16em] uppercase"
                style={{ color: activeColor }}
              >
                {active.title}
              </span>
            </div>

            <p className="mb-7 font-sans text-[15px] leading-[1.6] text-white/75">
              {active.blurb}
            </p>

            <div className="mb-7 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/6 p-4">
                <div className="font-heading text-[26px] leading-none font-bold text-white">
                  {active.metricValue}
                </div>
                <div className="mt-2 font-sans text-[11.5px] leading-[1.35] text-white/50">
                  {active.metricLabel}
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/6 p-4">
                <div className="font-heading text-[26px] leading-none font-bold text-white">
                  {active.secondaryValue}
                </div>
                <div className="mt-2 font-sans text-[11.5px] leading-[1.35] text-white/50">
                  {active.secondaryLabel}
                </div>
              </div>
            </div>

            <div className="mb-7 border-t border-white/10 pt-5">
              <span className="font-sans text-[10.5px] font-bold tracking-[0.14em] text-white/45 uppercase">
                Top vendors
              </span>
              <div className="mt-3 flex flex-wrap gap-2">
                {active.vendors.map((v) => (
                  <Tag
                    key={v}
                    variant="filled"
                    className="m-0! rounded-full border! border-white/10! bg-white/8! px-3! py-1! text-[11.5px]! text-white/85! font-sans"
                  >
                    {v}
                  </Tag>
                ))}
              </div>
              <p className="mt-4 m-0 font-sans text-[12.5px] leading-[1.5] text-white/45">
                Tip: {active.pairWith}.
              </p>
            </div>

            <Button
              type="text"
              block
              href={
                getTabByLabel(active.title)
                  ? hrefForTab(getTabByLabel(active.title)!)
                  : "/listings"
              }
              className="h-auto! bg-white! py-3.5! text-[14px]! text-slate-900! transition-transform! duration-200! font-sans hover:-translate-y-0.5!"
            >
              <span className="flex items-center justify-center gap-2">
                Explore {active.title}
                <FiArrowRight size={14} />
              </span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
