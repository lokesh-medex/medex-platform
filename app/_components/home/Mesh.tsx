/**
 * Mesh gradient backgrounds — the "ground" of the homepage's visual system:
 * 3-4 huge blurred radial blobs per section. Kept in one place so every
 * section pulls from the same four-hex palette (brand primary/secondary
 * bridged with rose/violet) and only the geometry changes per section —
 * that's what keeps a very loud page from turning rainbow.
 *
 * Server-safe (no hooks) so sections can render it without going client.
 * Purely decorative: `aria-hidden` + `pointer-events-none`.
 *
 * FLAT SECTION GROUNDS: individual `<section>`s do NOT paint their own flat
 * background. A run of consecutive sections in the same "register" (light
 * vs. dark) shares ONE background, painted once on a wrapping `<div>` in
 * `app/page.tsx` — `bg-[#f8f5fa]` around {StatsBand, FeaturedServices,
 * Vendors} and again around {Partners, Doctors, Testimonials}; `bg-[#100119]`
 * around {ServicesOrbital, Membership}; `bg-[#0d0116]` around {CTA, Footer}.
 * A per-section background would show as a visible seam at the shared
 * boundary even at an identical hex (anti-aliasing, subpixel rounding), and
 * a Mesh preset's blur can't hide it — it fades to transparent, not to the
 * neighbor's color. Adding a section to one of these runs means dropping its
 * own `bg-*` and adding it inside the matching wrapper in `page.tsx`, not
 * giving it a background of its own.
 *
 * For the same reason, this component does NOT clip itself with
 * `overflow-hidden` — that's owned by the same `page.tsx` wrapper `<div>`.
 * Each section's `<Parallax>` scrubs this layer's `yPercent` as the section
 * scrolls, so a per-section clip (or one baked into this component) slices a
 * visible straight edge off the layer right as it's mid-drift — exactly at
 * the boundary between two sections. Clipping once per register run instead
 * lets the drift bleed into the neighboring section within the same run.
 */

const MESH_HEX = {
  primary: "#f33b27",
  secondary: "#872888",
  rose: "#e11d48",
  violet: "#7c3aed",
} as const;

type MeshColor = keyof typeof MESH_HEX;

interface Blob {
  /** % of the layer's width/height, blob is centred on the point. */
  x: number;
  y: number;
  /** px diameter. Clamped against the viewport so mobile doesn't get one flat wash. */
  size: number;
  c: MeshColor;
  /** 0-1. Light grounds sit at 0.12-0.22, dark grounds can take much more. */
  o: number;
}

interface MeshSpec {
  /** `multiply` deepens overlaps on white; `screen` lifts them on near-black. */
  blend?: "multiply" | "screen";
  blobs: Blob[];
}

export type MeshPreset =
  | "hero"
  | "stats"
  | "features"
  | "vendors"
  | "orbital"
  | "membership"
  | "partners"
  | "doctors"
  | "testimonials"
  | "cta"
  | "footer"
  | "listings"
  | "auth"
  | "detail"
  | "cart"
  | "contact"
  | "about";

const MESH_PRESETS: Record<MeshPreset, MeshSpec> = {
  hero: {
    blend: "screen",
    blobs: [
      { x: 14, y: 26, size: 780, c: "primary", o: 0.4 },
      { x: 86, y: 20, size: 700, c: "secondary", o: 0.45 },
      { x: 62, y: 88, size: 620, c: "violet", o: 0.32 },
      { x: 34, y: 96, size: 520, c: "rose", o: 0.28 },
    ],
  },
  stats: {
    blobs: [
      { x: 8, y: 10, size: 620, c: "primary", o: 0.16 },
      { x: 72, y: 92, size: 700, c: "violet", o: 0.14 },
      { x: 96, y: 22, size: 480, c: "secondary", o: 0.12 },
    ],
  },
  features: {
    blobs: [
      { x: 92, y: 8, size: 760, c: "secondary", o: 0.16 },
      { x: 4, y: 44, size: 680, c: "primary", o: 0.15 },
      { x: 58, y: 78, size: 720, c: "violet", o: 0.13 },
      { x: 24, y: 100, size: 520, c: "rose", o: 0.12 },
    ],
  },
  vendors: {
    blobs: [
      { x: 18, y: 6, size: 640, c: "rose", o: 0.14 },
      { x: 88, y: 58, size: 760, c: "secondary", o: 0.15 },
      { x: 46, y: 104, size: 560, c: "primary", o: 0.12 },
    ],
  },
  orbital: {
    blend: "screen",
    blobs: [
      { x: 50, y: 46, size: 900, c: "secondary", o: 0.4 },
      { x: 14, y: 14, size: 620, c: "primary", o: 0.3 },
      { x: 90, y: 84, size: 660, c: "violet", o: 0.32 },
    ],
  },
  membership: {
    blend: "screen",
    blobs: [
      { x: 24, y: 18, size: 700, c: "primary", o: 0.3 },
      { x: 80, y: 34, size: 640, c: "secondary", o: 0.36 },
      { x: 52, y: 96, size: 720, c: "violet", o: 0.26 },
    ],
  },
  partners: {
    blobs: [
      { x: 10, y: 70, size: 560, c: "violet", o: 0.13 },
      { x: 90, y: 20, size: 600, c: "primary", o: 0.13 },
      { x: 50, y: 110, size: 460, c: "secondary", o: 0.1 },
    ],
  },
  doctors: {
    blobs: [
      { x: 6, y: 22, size: 700, c: "secondary", o: 0.15 },
      { x: 94, y: 74, size: 720, c: "primary", o: 0.15 },
      { x: 48, y: 4, size: 520, c: "violet", o: 0.12 },
    ],
  },
  testimonials: {
    blobs: [
      { x: 20, y: 84, size: 720, c: "primary", o: 0.15 },
      { x: 82, y: 16, size: 780, c: "violet", o: 0.15 },
      { x: 54, y: 54, size: 520, c: "rose", o: 0.1 },
    ],
  },
  cta: {
    blend: "screen",
    blobs: [
      { x: 22, y: 30, size: 760, c: "primary", o: 0.5 },
      { x: 78, y: 26, size: 720, c: "secondary", o: 0.5 },
      { x: 50, y: 100, size: 820, c: "violet", o: 0.4 },
      { x: 8, y: 92, size: 460, c: "rose", o: 0.35 },
    ],
  },
  // Quietest preset on the page — the footer is reference material, not a
  // moment, so it gets two small, low-opacity blobs rather than a wash.
  footer: {
    blobs: [
      { x: 12, y: 8, size: 520, c: "secondary", o: 0.14 },
      { x: 92, y: 86, size: 460, c: "primary", o: 0.12 },
    ],
  },
  // Confined to the listings intro band only — FilterSidebar further down
  // the page is sticky, and wrapping that region in overflow-hidden (which
  // every other Mesh usage pairs with) would become its sticky-positioning
  // ancestor. See docs/superpowers/specs/2026-09-08-vivid-mesh-listings-auth-detail-design.md.
  listings: {
    blobs: [
      { x: 10, y: 10, size: 640, c: "secondary", o: 0.14 },
      { x: 92, y: 6, size: 560, c: "primary", o: 0.13 },
      { x: 50, y: 100, size: 520, c: "violet", o: 0.1 },
    ],
  },
  auth: {
    blend: "screen",
    blobs: [
      { x: 20, y: 14, size: 620, c: "primary", o: 0.35 },
      { x: 88, y: 30, size: 560, c: "secondary", o: 0.4 },
      { x: 46, y: 96, size: 640, c: "violet", o: 0.3 },
    ],
  },
  // Confined to the breadcrumb strip only — same sticky-ancestor
  // constraint as `listings` (BuyBox is sticky).
  detail: {
    blobs: [
      { x: 8, y: 8, size: 600, c: "primary", o: 0.15 },
      { x: 94, y: 20, size: 560, c: "secondary", o: 0.13 },
      { x: 54, y: 100, size: 480, c: "violet", o: 0.1 },
    ],
  },
  // Same confined-strip constraint as `detail` — the order summary panel
  // below is sticky.
  cart: {
    blobs: [
      { x: 6, y: 12, size: 560, c: "secondary", o: 0.14 },
      { x: 92, y: 10, size: 520, c: "primary", o: 0.13 },
      { x: 50, y: 100, size: 460, c: "violet", o: 0.1 },
    ],
  },
  // Confined to the breadcrumb strip only, matching `cart`/`detail`.
  contact: {
    blobs: [
      { x: 10, y: 14, size: 580, c: "primary", o: 0.14 },
      { x: 90, y: 8, size: 540, c: "secondary", o: 0.13 },
      { x: 52, y: 100, size: 480, c: "violet", o: 0.1 },
    ],
  },
  // Runs behind the full intro section (breadcrumb + mission headline), not
  // just a thin strip, so it sits closer to `listings`/`partners` strength
  // than the confined `detail`/`cart`/`contact` presets.
  about: {
    blobs: [
      { x: 12, y: 18, size: 700, c: "secondary", o: 0.18 },
      { x: 88, y: 12, size: 640, c: "primary", o: 0.16 },
      { x: 50, y: 104, size: 600, c: "violet", o: 0.12 },
    ],
  },
};

interface IProps {
  preset: MeshPreset;
  className?: string;
}

export default function Mesh({ preset, className = "" }: IProps) {
  const spec = MESH_PRESETS[preset];

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 ${className}`}
    >
      {spec.blobs.map((b, i) => (
        <div
          key={i}
          className="absolute rounded-full blur-3xl"
          style={{
            left: `${b.x}%`,
            top: `${b.y}%`,
            width: `min(${b.size}px, 130vw)`,
            height: `min(${b.size}px, 130vw)`,
            background: MESH_HEX[b.c],
            opacity: b.o,
            mixBlendMode: spec.blend ?? "multiply",
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}
    </div>
  );
}
