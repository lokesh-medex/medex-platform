import { FaStar } from "react-icons/fa";
import InitialsAvatar from "@/app/_components/shared/InitialsAvatar";
import {
  COLOR,
  TESTIMONIALS_DATA,
  type Testimonial,
} from "@/app/_lib/homepage-data";

/** Google's multi-color "G" mark — kept as inline SVG since it's a brand logomark, not a generic icon. */
function GoogleLogo({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48">
      <path
        fill="#4285F4"
        d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"
      />
      <path
        fill="#34A853"
        d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"
      />
      <path
        fill="#FBBC05"
        d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24s.85 6.91 2.34 9.88l7.35-5.7z"
      />
      <path
        fill="#EA4335"
        d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"
      />
    </svg>
  );
}

interface ColumnItem extends Testimonial {
  key: string;
  stars: string[];
}

const COLUMN_COUNT = 4;

function buildColumn(colIndex: number): {
  anim: string;
  duration: string;
  items: ColumnItem[];
} {
  const offset = colIndex % TESTIMONIALS_DATA.length;
  const base = [
    ...TESTIMONIALS_DATA.slice(offset),
    ...TESTIMONIALS_DATA.slice(0, offset),
  ];
  const doubled = [...base, ...base];
  const items: ColumnItem[] = doubled.map((t, idx) => ({
    ...t,
    key: `${colIndex}-${idx}`,
    stars: [1, 2, 3, 4, 5].map((n) =>
      n <= t.rating ? COLOR.primary : COLOR.slate200
    ),
  }));
  return {
    anim: colIndex % 2 === 0 ? "marqueeVert" : "marqueeVertRev",
    duration: `${18 + colIndex * 3}s`,
    items,
  };
}

export default function Testimonials() {
  const columns = Array.from({ length: COLUMN_COUNT }, (_, i) =>
    buildColumn(i)
  );

  return (
    <section id="testimonials" className="py-20 bg-[#F5F5F5] overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-5 dt:px-8">
        <div className="text-center max-w-[560px] mx-auto mb-12">
          <span className="text-secondary font-bold text-sm font-sans">
            From people who&apos;ve booked
          </span>
          <h2 className="font-heading text-slate-900 font-bold text-[clamp(26px,3.2vw,36px)] tracking-[-0.02em] mt-2 mb-6">
            What patients say
          </h2>
          <div className="inline-flex items-center gap-3 rounded-2xl py-3 px-5 bg-white border border-slate-200">
            <GoogleLogo size={24} />
            <div className="text-left">
              <div className="flex items-baseline gap-2">
                <span className="font-heading text-slate-900 font-bold text-[22px]">
                  4.4
                </span>
                <div className="flex gap-px">
                  {[1, 1, 1, 1, 0].map((filled, i) => (
                    <FaStar
                      key={i}
                      size={13}
                      color={filled ? COLOR.primary : COLOR.slate200}
                    />
                  ))}
                </div>
              </div>
              <span className="text-slate-500 text-xs font-sans">
                Based on 642 Reviews
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="relative h-[460px] flex items-center justify-center overflow-hidden px-5 dt:px-8">
        <div className="flex gap-5 w-full max-w-[1000px] justify-center">
          {columns.map((col, i) => (
            <div
              key={i}
              className={`h-[420px] flex-1 min-w-0 max-w-[480px] dt:max-w-[230px] overflow-hidden ${i >= 2 ? "hidden dt:block" : ""}`}
            >
              <div
                className="flex flex-col gap-4"
                style={{
                  animation: `${col.anim} ${col.duration} linear infinite`,
                }}
              >
                {col.items.map((t) => (
                  <div
                    key={t.key}
                    className="rounded-[14px] p-4.5 bg-white border border-slate-200 shadow-[0_8px_20px_#0f172a12] shrink-0"
                  >
                    <div className="flex items-center gap-2.5 mb-3">
                      <InitialsAvatar
                        name={t.name}
                        className="h-[34px] w-[34px] shrink-0 text-sm"
                      />
                      <div>
                        <div className="text-slate-900 font-bold text-[13px] font-sans">
                          {t.name}
                        </div>
                        <div className="text-slate-500 text-[11px] font-sans">
                          {t.role}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 mb-2.5">
                      <div className="flex gap-px">
                        {t.stars.map((color, si) => (
                          <FaStar key={si} size={12} color={color} />
                        ))}
                      </div>
                      <GoogleLogo size={13} />
                    </div>
                    <p className="text-slate-700 text-[12.5px] leading-[1.5] m-0 font-sans">
                      &quot;{t.quote}&quot;
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg,#F5F5F5 0%, transparent 15%, transparent 85%, #F5F5F5 100%), linear-gradient(90deg,#F5F5F5 0%, transparent 10%, transparent 90%, #F5F5F5 100%)",
          }}
        />
      </div>
    </section>
  );
}
