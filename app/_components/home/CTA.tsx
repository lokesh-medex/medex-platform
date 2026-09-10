/**
 * Closing CTA — the loudest section on the page, by design: the `cta` mesh preset already
 * pushes blob opacity up to 0.4-0.5 with `screen` blending on a near-black
 * ground. A single centred `glass.dark` panel holds the close, rather than
 * splitting focus across cards.
 */

import { Button } from "antd";
import { FiArrowRight } from "react-icons/fi";
import BackdropMotifs from "@/app/_components/shared/BackdropMotifs";
import { Parallax, Reveal } from "@/app/_components/shared/Motion";
import { glass } from "@/app/_lib/glass";
import Mesh from "./Mesh";

export default function CTA() {
  return (
    <section className="relative py-24 dt:py-32">
      <Parallax yPercent={-8} className="pointer-events-none absolute inset-0">
        <Mesh preset="cta" />
      </Parallax>
      <Parallax yPercent={-12} className="pointer-events-none absolute inset-0">
        <BackdropMotifs
          count={9}
          opacity={0.1}
          color="#ffffff"
          seed={135}
          zone="full"
          minSize={90}
          maxSize={200}
        />
      </Parallax>

      <div className="relative mx-auto max-w-[1280px] px-5 dt:px-8">
        <Reveal preset="standard" className="mx-auto max-w-[820px]">
          <div
            className={`rounded-[40px] p-10 text-center dt:p-16 ${glass.dark}`}
          >
            <span className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 font-sans text-[12px] font-bold tracking-[0.16em] text-white uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-[#ff8a75]" />
              Ready when you are
            </span>

            <h2 className="mb-5 font-heading text-[clamp(32px,5vw,56px)] leading-[1.03] font-bold tracking-[-0.04em] text-balance text-white">
              Find and book your care in minutes, not phone calls.
            </h2>

            <p className="mx-auto mb-9 max-w-[520px] font-sans text-[clamp(15px,1.6vw,18px)] leading-[1.6] text-white/70">
              Compare hospitals, labs and wellness studios across our network,
              then confirm a booking without leaving the app.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button
                type="text"
                size="large"
                href="/auth/signup"
                className="h-auto! bg-white! px-8! py-4! text-[16px]! text-slate-900! shadow-[0_18px_40px_rgba(0,0,0,0.4)]! transition-transform! duration-200! font-sans hover:-translate-y-0.5!"
              >
                <span className="flex items-center gap-2">
                  Get started free
                  <FiArrowRight size={17} />
                </span>
              </Button>
              <Button
                type="text"
                size="large"
                href="/listings/doctors"
                className={`h-auto! px-8! py-4! text-[16px]! text-white! transition-transform! duration-200! font-sans hover:-translate-y-0.5! ${glass.dark}`}
              >
                Talk to a doctor
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
