/**
 * Partners — each marquee logo sits in its own `glass.vivid` chip instead of
 * a bare white card, so the mesh behind the strip still reads through. Uses
 * the same seamless-loop technique (list duplicated once, track animated to
 * -50%) via the shared `marqueeLeft` keyframe already defined in
 * `app/globals.css`.
 */

import Image from "next/image";
import BackdropMotifs from "@/app/_components/shared/BackdropMotifs";
import { Parallax, Reveal } from "@/app/_components/shared/Motion";
import { glass } from "@/app/_lib/glass";
import { PARTNER_LOGOS_DATA } from "@/app/_lib/homepage-data";
import Mesh from "./Mesh";

function LogoChip({ src, alt }: { src: string; alt: string }) {
  return (
    <div
      className={`flex h-[92px] w-[190px] shrink-0 items-center justify-center rounded-2xl p-4 ${glass.vivid}`}
    >
      <Image
        src={src}
        alt={alt}
        width={148}
        height={56}
        className="max-h-full max-w-full object-contain"
      />
    </div>
  );
}

export default function Partners() {
  return (
    <section
      id="partners"
      className="relative overflow-hidden bg-white py-24 dt:py-28"
    >
      <Parallax yPercent={-8} className="pointer-events-none absolute inset-0">
        <Mesh preset="partners" />
      </Parallax>
      <Parallax yPercent={-12} className="pointer-events-none absolute inset-0">
        <BackdropMotifs
          count={9}
          opacity={0.1}
          seed={104}
          zone="full"
          minSize={90}
          maxSize={200}
        />
      </Parallax>

      <div className="relative mx-auto max-w-[1280px] px-5 dt:px-8">
        <Reveal
          preset="standard"
          className="mx-auto mb-12 max-w-[620px] text-center"
        >
          <span className="font-sans text-[12px] font-bold tracking-[0.16em] text-primary uppercase">
            Featured hospital partners
          </span>
          <h2 className="mt-3 font-heading text-[clamp(28px,4vw,42px)] leading-[1.05] font-bold tracking-[-0.035em] text-balance text-slate-900">
            JCI-accredited care, ready for your team.
          </h2>
        </Reveal>
      </div>

      <div className="relative mt-4">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-[2] w-24 bg-[linear-gradient(90deg,#ffffff,transparent)]" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-[2] w-24 bg-[linear-gradient(270deg,#ffffff,transparent)]" />

        <div
          className="flex w-max gap-5"
          style={{ animation: "marqueeLeft 32s linear infinite" }}
        >
          {[...PARTNER_LOGOS_DATA, ...PARTNER_LOGOS_DATA].map((logo, i) => (
            <LogoChip key={`${logo.alt}-${i}`} src={logo.src} alt={logo.alt} />
          ))}
        </div>
      </div>
    </section>
  );
}
