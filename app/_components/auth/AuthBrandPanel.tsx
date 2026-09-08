import Image from "next/image";
import { FiCheck } from "react-icons/fi";

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
    <div
      className="hidden dt:flex relative overflow-hidden flex-col justify-between p-14"
      style={{ background: "linear-gradient(135deg, #872888, #df321f)" }}
    >
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
