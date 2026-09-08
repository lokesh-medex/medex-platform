import Image from "next/image";
import { FiCheck } from "react-icons/fi";
import Mesh from "@/app/_components/home/Mesh";
import BackdropMotifs from "@/app/_components/shared/BackdropMotifs";

const BRAND_POINTS = [
  { text: "Compare prices across hospitals, labs and clinics", delay: "0s" },
  { text: "Book instantly, no phone calls needed", delay: "0.3s" },
  { text: "Manage bookings for your whole family", delay: "0.6s" },
];

/**
 * Left-hand marketing panel shown alongside the auth forms on desktop.
 * No local photo has been chosen for this slot yet, so it stays a plain
 * brand-gradient panel — swap in an `ImageWithFallback` background once
 * one is picked, following the same pattern as `Hero`.
 */
export default function AuthBrandPanel() {
  return (
    // `-mt-32` cancels PageShell's `pt-32` clearance so this grid item's
    // gradient/Mesh/BackdropMotifs backdrop reaches y=0, full-bleed behind
    // the fixed Header — same intent as ListingsView's intro band, but this
    // is a CSS Grid item (not block flow), so the mechanism differs: as a
    // grid item with default `align-self: stretch`, a negative margin-top
    // extends the item's own box upward without touching the grid row's
    // computed height, and its bottom edge still lands exactly on the row's
    // bottom edge — so AuthCard's column (the other grid item) is
    // unaffected. `pt-46` (184px = the original `p-14`'s 56px + the 128px
    // this margin cancels) restores the real content's clearance so the
    // copy/bullets render at the exact same position as before this fix;
    // decorative layers (Mesh/BackdropMotifs/svg) are unaffected by padding
    // since they're absolutely positioned to the padding box regardless.
    // Do not change `-mt-32` without adjusting `pt-46` to match (must
    // always sum to the padding-top this box would've had without the fix
    // plus 128).
    <div
      className="hidden dt:flex relative -mt-32 overflow-hidden flex-col justify-between pt-46 pr-14 pb-14 pl-14"
      style={{ background: "linear-gradient(135deg, #872888, #df321f)" }}
    >
      <Mesh preset="auth" />
      <BackdropMotifs
        count={5}
        opacity={0.08}
        color="#ffffff"
        seed={88}
        zone="edges"
        minSize={110}
        maxSize={210}
      />
      <svg
        viewBox="0 0 500 500"
        className="absolute -right-28 -top-14 w-[440px] h-[440px] opacity-50"
      >
        <circle
          cx="250"
          cy="250"
          r="200"
          fill="none"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="1"
          strokeDasharray="4 8"
          style={{
            transformOrigin: "250px 250px",
            animation: "heroSpin 22s linear infinite",
          }}
        />
        <circle
          cx="250"
          cy="250"
          r="140"
          fill="none"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="1"
          strokeDasharray="4 8"
          style={{
            transformOrigin: "250px 250px",
            animation: "heroSpinRev 15s linear infinite",
          }}
        />
      </svg>

      <div className="relative z-[1]">
        <Image
          src="/medex.webp"
          alt="Medex"
          height={26}
          width={114}
          className="h-[26px] w-auto mb-10 brightness-0 invert"
        />
        <h1 className="font-heading text-white font-bold text-[clamp(28px,3vw,36px)] leading-[1.2] tracking-[-0.02em] mb-4 max-w-[420px]">
          Every hospital, lab and clinic near you, in one place.
        </h1>
        <p className="text-white/75 text-[15px] leading-[1.6] max-w-[380px] m-0">
          Compare prices, book instantly, and manage your family&apos;s care
          from a single account.
        </p>
      </div>

      <div className="relative z-[2] flex flex-col gap-4">
        {BRAND_POINTS.map((bp) => (
          <div
            key={bp.text}
            className="flex items-start gap-3"
            style={{
              animation: "authFloat 5s ease-in-out infinite",
              animationDelay: bp.delay,
            }}
          >
            <div className="shrink-0 h-8 w-8 rounded-full bg-white/15 flex items-center justify-center">
              <FiCheck size={16} className="text-white" />
            </div>
            <span className="text-white text-[14.5px] font-semibold pt-1.5">
              {bp.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
