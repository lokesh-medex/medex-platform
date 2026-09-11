"use client";

/**
 * Animated AI launcher button — slow-rotating partial ring around a
 * two-spark gradient mark, extracted from the standalone "AI Launcher Icon"
 * design export and rescaled to sit next to NavSearch's h-9.5/h-9 circular
 * button. White chrome — matches the logo chip and the tooltip, and reads
 * as a "chip" among the navbar's translucent glass buttons rather than
 * blending into them, since the animated ring and gradient mark already
 * carry the color. `onClick` is a placeholder until the AI chat feature it
 * launches exists.
 */

import { useId } from "react";
import { Tooltip } from "antd";
import { brand } from "@/app/_lib/theme";

interface AiLauncherIconProps {
  /** Mobile sizing matches NavSearch's `compact` — also drops the hover tooltip, which has no touch equivalent. */
  compact?: boolean;
  onClick?: () => void;
}

export default function AiLauncherIcon({
  compact,
  onClick,
}: AiLauncherIconProps) {
  // Desktop and mobile both render this component at once (one hidden via
  // CSS per breakpoint), so the gradient id must be unique per instance —
  // a shared id resolves `fill="url(#...)"` to whichever instance's <defs>
  // comes first in the DOM, which paints nothing when that instance is the
  // display:none one.
  const gradientId = `aiLauncherSpark-${useId()}`;

  const button = (
    <button
      type="button"
      aria-label="Ask AI"
      onClick={onClick}
      className="relative flex h-9.5 w-9.5 shrink-0 cursor-pointer items-center justify-center rounded-full bg-white shadow-[0_2px_10px_rgba(0,0,0,0.18)] transition-transform duration-150 hover:-translate-y-px"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0.5 rounded-full border-2 border-t-primary border-r-transparent border-b-transparent border-l-primary shadow-[0_0_6px_rgba(242,143,39,0.7)] motion-safe:animate-[aiLauncherOrbit_6s_linear_infinite]"
      />
      <svg
        viewBox="0 0 200 200"
        width={23}
        height={23}
        aria-hidden
        className="relative"
      >
        <defs>
          <linearGradient id={gradientId} x1="10%" y1="0%" x2="90%" y2="100%">
            <stop offset="0%" stopColor="#f28f27" />
            <stop offset="52%" stopColor="#ee4b26" />
            <stop offset="100%" stopColor="#98358f" />
          </linearGradient>
        </defs>
        <g transform="translate(100,100) scale(1.15) translate(-110,-82)">
          <path
            d="M88 34 Q101 75 142 88 Q101 101 88 142 Q75 101 34 88 Q75 75 88 34 Z"
            fill={`url(#${gradientId})`}
          />
          <path
            d="M150 22 Q157 51 186 58 Q157 65 150 94 Q143 65 114 58 Q143 51 150 22 Z"
            fill={`url(#${gradientId})`}
          />
        </g>
      </svg>
    </button>
  );

  if (compact) return button;

  return (
    <Tooltip
      title={
        <span
          className="bg-clip-text font-bold text-transparent"
          style={{
            backgroundImage: `linear-gradient(100deg, ${brand.primary}, ${brand.secondary})`,
          }}
        >
          AI Agent
        </span>
      }
      color="#fff"
    >
      {button}
    </Tooltip>
  );
}
