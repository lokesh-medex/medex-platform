"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Button, Popover, Tag } from "antd";
import { FiHeart, FiStar } from "react-icons/fi";
import { FaFlask, FaStethoscope } from "react-icons/fa";
import {
  COLOR,
  SERVICES_DATA,
  type ServiceNode,
} from "@/app/_lib/homepage-data";

const CENTER = 310;
const RADIUS = 210;
const VIEWBOX = 620;
const ORBIT_STEP_DEG = 0.12;
const ORBIT_INTERVAL_MS = 50;

const ICON_COLORS: Record<ServiceNode["icon"], string> = {
  stethoscope: "#60a5fa",
  flask: "#34d399",
  star: "#fbbf24",
  heart: "#f472b6",
};

function ServiceIcon({
  icon,
  color,
}: {
  icon: ServiceNode["icon"];
  color: string;
}) {
  switch (icon) {
    case "stethoscope":
      return <FaStethoscope size={22} color={color} />;
    case "flask":
      return <FaFlask size={20} color={color} />;
    case "star":
      return <FiStar size={24} color={color} />;
    case "heart":
      return <FiHeart size={24} color={color} />;
  }
}

export default function ServicesOrbital() {
  const [orbitAngle, setOrbitAngle] = useState(0);
  const [activeService, setActiveService] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = setInterval(() => {
      setOrbitAngle((prev) =>
        activeService === null ? (prev + ORBIT_STEP_DEG) % 360 : prev
      );
    }, ORBIT_INTERVAL_MS);
    return () => clearInterval(id);
  }, [activeService]);

  const activeSvcData =
    SERVICES_DATA.find((s) => s.id === activeService) ?? null;
  const relatedIds = activeSvcData ? activeSvcData.relatedIds : [];

  return (
    <section
      id="services"
      className="pt-20 pb-20 bg-[#1a0320] relative overflow-x-hidden"
    >
      <div className="max-w-[1280px] mx-auto px-5 dt:px-8 relative">
        <div className="text-center max-w-[560px] mx-auto mb-4">
          <span className="text-[#f472a0] font-bold text-sm font-sans">
            What Medex aggregates
          </span>
          <h2 className="font-heading text-white font-bold text-[clamp(26px,3.2vw,36px)] tracking-[-0.02em] mt-2 mb-3 text-balance">
            One network, every service you need
          </h2>
          <p className="text-white/60 text-base m-0 font-sans">
            Select a node to see which vendors sit behind each service. Related
            services pulse together.
          </p>
        </div>

        <div
          ref={containerRef}
          onClick={(e) => {
            if (e.target === e.currentTarget) setActiveService(null);
          }}
          className="relative mx-auto w-[min(620px,92vw)] h-[min(620px,92vw)]"
        >
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 620 620"
          >
            {SERVICES_DATA.map((svc, i) => {
              const angleDeg = (i / SERVICES_DATA.length) * 360 + orbitAngle;
              const rad = (angleDeg * Math.PI) / 180;
              const cx = CENTER + RADIUS * Math.cos(rad);
              const cy = CENTER + RADIUS * Math.sin(rad);
              const isActive = activeService === svc.id;
              const isRelated = relatedIds.includes(svc.id);
              const iconColor = ICON_COLORS[svc.icon];
              const lineColor = isActive
                ? iconColor
                : isRelated
                  ? "rgba(255,255,255,0.4)"
                  : "rgba(255,255,255,0.12)";
              return (
                <line
                  key={svc.id}
                  x1={CENTER}
                  y1={CENTER}
                  x2={cx}
                  y2={cy}
                  stroke={lineColor}
                  strokeWidth={isActive ? 2 : 1.5}
                />
              );
            })}
            <circle
              cx={CENTER}
              cy={CENTER}
              r="210"
              fill="none"
              stroke="rgba(255,255,255,0.12)"
              strokeWidth="1"
            />
          </svg>

          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[120px] h-[120px] rounded-full bg-white flex items-center justify-center z-20 shadow-[0_8px_24px_#00000033]">
            <div className="absolute -inset-3.5 rounded-full border border-white/25 animate-[heroPulse_3s_ease-in-out_infinite]" />
            <div className="absolute -inset-7 rounded-full border border-white/12 animate-[heroPulse_3s_ease-in-out_infinite] [animation-delay:0.6s]" />
            <Image
              src="/medex.webp"
              alt="Medex"
              height={32}
              width={140}
              className="h-8 w-auto max-w-[80%] object-contain"
            />
          </div>

          {SERVICES_DATA.map((svc, i) => {
            const angleDeg = (i / SERVICES_DATA.length) * 360 + orbitAngle;
            const rad = (angleDeg * Math.PI) / 180;
            const cx = CENTER + RADIUS * Math.cos(rad);
            const cy = CENTER + RADIUS * Math.sin(rad);
            const cxPct = (cx / VIEWBOX) * 100;
            const cyPct = (cy / VIEWBOX) * 100;
            const isActive = activeService === svc.id;
            const isRelated = relatedIds.includes(svc.id);
            const dim = activeService !== null && !isActive && !isRelated;
            const iconColor = ICON_COLORS[svc.icon];
            const bg = isActive
              ? "#fff"
              : isRelated
                ? "rgba(255,255,255,0.15)"
                : "rgba(255,255,255,0.05)";
            const borderColor = isActive
              ? iconColor
              : isRelated
                ? "rgba(255,255,255,0.5)"
                : "rgba(255,255,255,0.15)";
            const shadow = isActive ? `0 0 24px ${iconColor}80` : "none";
            const scale = isActive
              ? "scale(1.15)"
              : dim
                ? "scale(0.92)"
                : "scale(1)";
            const glow = isActive ? `${iconColor}40` : "transparent";
            const glowSize = isActive ? 140 : 0;
            const renderIconColor = isActive ? COLOR.ink : iconColor;
            const labelColor = isActive
              ? "#fff"
              : isRelated
                ? "rgba(255,255,255,0.85)"
                : "rgba(255,255,255,0.5)";
            const labelScale = isActive ? "scale(1.1)" : "scale(1)";

            return (
              <div
                key={svc.id}
                data-service-node
                className="absolute z-10 transition-opacity duration-400"
                style={{
                  left: `${cxPct}%`,
                  top: `${cyPct}%`,
                  transform: "translate(-50%,-50%)",
                  zIndex: isActive ? 30 : 10,
                }}
              >
                <Popover
                  trigger="click"
                  open={isActive}
                  onOpenChange={(next) =>
                    setActiveService(next ? svc.id : null)
                  }
                  placement="bottom"
                  arrow={false}
                  classNames={{
                    container: "p-0! bg-transparent! shadow-none!",
                  }}
                  content={
                    <div className="w-66 rounded-xl p-4.5 text-left bg-[rgba(10,14,24,0.96)] backdrop-blur-md border border-white/15 shadow-[0_24px_48px_#00000066]">
                      <div className="flex items-center justify-between mb-2.5">
                        <span
                          className="text-[10px] font-bold tracking-[0.08em] font-sans"
                          style={{ color: iconColor }}
                        >
                          {svc.title.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-white/75 text-[13px] leading-normal mb-3.5 font-sans">
                        {svc.blurb}
                      </p>
                      <div className="grid grid-cols-2 gap-2.5 mb-3.5">
                        <div className="bg-white/6 rounded-lg p-2.5">
                          <div className="font-heading text-white font-bold text-lg">
                            {svc.metricValue}
                          </div>
                          <div className="text-white/50 text-[10.5px] mt-0.5 font-sans">
                            {svc.metricLabel}
                          </div>
                        </div>
                        <div className="bg-white/6 rounded-lg p-2.5">
                          <div className="font-heading text-white font-bold text-lg">
                            {svc.secondaryValue}
                          </div>
                          <div className="text-white/50 text-[10.5px] mt-0.5 font-sans">
                            {svc.secondaryLabel}
                          </div>
                        </div>
                      </div>
                      <div className="border-t border-white/10 pt-3">
                        <span className="text-white/45 font-bold text-[10px] tracking-[0.06em] font-sans">
                          TOP VENDORS
                        </span>
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {svc.vendors.map((v) => (
                            <Tag
                              key={v}
                              variant="filled"
                              className="m-0! text-[11px]! rounded-full py-1! px-2.5! bg-white/8! text-white/85! border! border-white/10! font-sans"
                            >
                              {v}
                            </Tag>
                          ))}
                        </div>
                      </div>
                    </div>
                  }
                >
                  <div className="relative flex flex-col items-center">
                    <div
                      className="absolute rounded-full pointer-events-none"
                      style={{
                        background: `radial-gradient(circle, ${glow} 0%, transparent 70%)`,
                        width: glowSize,
                        height: glowSize,
                        left: "50%",
                        top: "40px",
                        transform: "translate(-50%,-50%)",
                      }}
                    />
                    <Button
                      type="text"
                      shape="circle"
                      className="relative! h-20! w-20! transition-transform! duration-300!"
                      style={{
                        background: bg,
                        border: `2px solid ${borderColor}`,
                        boxShadow: shadow,
                        transform: scale,
                      }}
                      icon={
                        <ServiceIcon icon={svc.icon} color={renderIconColor} />
                      }
                    />
                    <span
                      className="mt-3 whitespace-nowrap font-bold text-xs tracking-[0.02em] transition-[color,transform] duration-300 font-sans"
                      style={{ color: labelColor, transform: labelScale }}
                    >
                      {svc.title}
                    </span>
                  </div>
                </Popover>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
