/**
 * Mesh gradient backgrounds — the "ground" of the homepage's visual system:
 * 3-4 huge blurred radial blobs per section. Kept in one place so every
 * section pulls from the same four-hex palette (brand primary/secondary
 * bridged with rose/violet) and only the geometry changes per section —
 * that's what keeps a very loud page from turning rainbow.
 *
 * Server-safe (no hooks) so sections can render it without going client.
 * Purely decorative: `aria-hidden` + `pointer-events-none`.
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
  | "footer";

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
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
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
