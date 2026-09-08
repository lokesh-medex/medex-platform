/**
 * Glass surface recipes for the homepage's visual system.
 *
 * Each preset is a complete Tailwind class string for a glass surface. They
 * differ in how much of the backdrop they let through — pick based on what's
 * behind the surface, not on how "premium" it should look.
 *
 * IMPORTANT: `backdrop-filter` samples whatever is painted behind the element.
 * On a flat background it produces nothing — the surface just reads as a
 * tinted box. Every preset below assumes a gradient wash, mesh, or imagery
 * sits behind it. Put glass on a flat color and it will look broken.
 */

export const glass = {
  /**
   * High-opacity white, crisp hairline edge, two-part shadow (tight contact
   * shadow + wide soft ambient). Text contrast stays safe because the
   * surface is mostly opaque — use for anything that needs to read cleanly
   * regardless of what's behind it (e.g. a mobile nav drawer).
   */
  subtle:
    "bg-white/60 backdrop-blur-xl border border-white/70 " +
    "shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_rgba(15,23,42,0.06)]",

  /**
   * Low opacity + saturation boost so a mesh/gradient behind it bleeds
   * through, plus an inset top highlight to fake a lit glass edge. Anything
   * text-bearing on this needs `glassScrim` behind the copy.
   */
  vivid:
    "bg-white/25 backdrop-blur-2xl backdrop-saturate-150 border border-white/40 " +
    "shadow-[0_8px_32px_rgba(15,23,42,0.12),inset_0_1px_0_rgba(255,255,255,0.6)]",

  /** For glass over dark grounds (ServicesOrbital, CTA, the scrolled header, dark dropdowns). Inverted: light film over dark ground. */
  dark:
    "bg-white/10 backdrop-blur-xl border border-white/15 " +
    "shadow-[0_24px_48px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.12)]",
} as const;

/**
 * Contrast rescue for text sitting on `glass.vivid`. Heavy/low-opacity glass
 * is a known WCAG text-contrast risk, so body copy over it gets this behind
 * it rather than relying on the blur alone.
 */
export const glassScrim =
  "before:absolute before:inset-0 before:-z-10 before:rounded-[inherit] " +
  "before:bg-white/45";

export type GlassPreset = keyof typeof glass;
