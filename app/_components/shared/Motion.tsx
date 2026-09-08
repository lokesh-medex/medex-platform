"use client";

/**
 * GSAP scroll-motion primitives.
 *
 * Two wrappers so sections don't each re-implement GSAP boilerplate:
 *   <Reveal>   — fade/rise children into view as the section is scrolled to
 *   <Parallax> — drift a decorative layer against the scroll
 *
 * Guardrails baked in (from the motion design DB):
 *  - Every ScrollTrigger is SCOPED to its own container, so it doesn't
 *    re-scan the whole page on each refresh.
 *  - Everything sits inside `gsap.matchMedia("(prefers-reduced-motion:
 *    no-preference)")`. Users who ask for reduced motion get the static page,
 *    and `mm.revert()` on unmount puts any inline styles back.
 *  - `Reveal` uses `gsap.from`, never a CSS `opacity: 0` default. The markup
 *    ships visible and GSAP hides it at runtime, so crawlers and no-JS
 *    visitors still see the content.
 *  - `Parallax` is for decorative layers ONLY. Never wrap text or controls in
 *    it: parallaxed body copy hurts reading and can trigger motion sickness.
 */

import { useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const PRESETS = {
  /** Calm sections. Reads as a fade with the faintest lift. */
  subtle: { y: 12, duration: 0.35, ease: "power1.out", stagger: 0.06 },
  /** Higher-energy moments. More travel, more pronounced cascade. */
  standard: { y: 24, duration: 0.5, ease: "power2.out", stagger: 0.08 },
} as const;

interface RevealProps {
  children: ReactNode;
  className?: string;
  preset?: keyof typeof PRESETS;
  /**
   * CSS selector for what to animate, relative to the wrapper. Defaults to
   * the wrapper's direct children.
   */
  targets?: string;
  /** Override the preset's stagger. Keep the total cascade under ~0.6s. */
  stagger?: number;
  /** Delay before the cascade starts, in seconds. */
  delay?: number;
}

export function Reveal(props: RevealProps) {
  const {
    children,
    className = "",
    preset = "subtle",
    targets,
    stagger,
    delay,
  } = props;
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const el = ref.current;
        if (!el) return;

        const nodes = targets
          ? Array.from(el.querySelectorAll(targets))
          : Array.from(el.children);
        if (!nodes.length) return;

        const p = PRESETS[preset];

        // The DB caps a comfortable cascade at ~8 items; past that the tail
        // feels laggy, so compress the stagger instead of dropping items.
        const effStagger =
          stagger ??
          (nodes.length > 8 ? (p.stagger * 8) / nodes.length : p.stagger);

        gsap.from(nodes, {
          opacity: 0,
          y: p.y,
          duration: p.duration,
          ease: p.ease,
          stagger: effStagger,
          delay,
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            // One-shot: no replay when the user scrolls back up. Re-triggering
            // on every direction change is what makes scroll animation tiring.
            toggleActions: "play none none none",
          },
        });
      });

      return () => mm.revert();
    },
    { scope: ref, dependencies: [preset, targets, stagger, delay] }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

interface ParallaxProps {
  children: ReactNode;
  className?: string;
  /**
   * Total drift over the section's scroll, in % of the layer's own height.
   * Kept small (5-15) so foreground and background never visibly desync.
   */
  yPercent?: number;
  /** Smoothing on the scrub, in seconds. 0.5 feels good; `true` is 1:1. */
  scrub?: number | boolean;
}

export function Parallax(props: ParallaxProps) {
  const { children, className = "", yPercent = -10, scrub = 0.5 } = props;
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const el = ref.current;
        if (!el) return;

        const tween = gsap.to(el, {
          yPercent,
          ease: "none",
          scrollTrigger: {
            // Drive off the parent section, not the layer itself, so the drift
            // tracks the section's travel through the viewport.
            trigger: el.parentElement ?? el,
            start: "top bottom",
            end: "bottom top",
            scrub,
          },
        });

        // `will-change` is a GPU-memory reservation, so release it once the
        // scrub is idle rather than leaving it pinned for the whole page.
        gsap.set(el, { willChange: "transform" });
        return () => {
          tween.kill();
          gsap.set(el, { willChange: "auto" });
        };
      });

      return () => mm.revert();
    },
    { scope: ref, dependencies: [yPercent, scrub] }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
