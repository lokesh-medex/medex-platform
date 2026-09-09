/**
 * Doctors — an overlapping stack of rotated glass cards instead of a plain
 * grid/rail: each card leans at its own small angle and straightens flat
 * (plus lifts to the front of the stack) on hover, matching the loud, layered
 * feel of the rest of the page. Collapses to a simple stacked column on
 * mobile, where an overlap would just clip content.
 */

import { Button, Rate } from "antd";
import { FiArrowRight, FiStar } from "react-icons/fi";
import ImageWithFallback from "@/app/_components/shared/ImageWithFallback";
import InitialsAvatar from "@/app/_components/shared/InitialsAvatar";
import BackdropMotifs from "@/app/_components/shared/BackdropMotifs";
import { Parallax, Reveal } from "@/app/_components/shared/Motion";
import { glass, glassScrim } from "@/app/_lib/glass";
import { DOCTORS_DATA, type Doctor } from "@/app/_lib/homepage-data";
import Mesh from "./Mesh";

/** One angle per card, alternating so the stack reads as loosely fanned. */
const ROTATE = ["-rotate-3", "rotate-2", "-rotate-2", "rotate-3"];
/** Arbitrary-value z-index per source position (never overridden by an
 * inline style, unlike a plain `style={{ zIndex }}` would be — so
 * `hover:z-40` below can still win). */
const BASE_Z = ["z-[1]", "z-[2]", "z-[3]", "z-[4]"];

function DoctorCard({ doc, i }: { doc: Doctor; i: number }) {
  return (
    <article
      className={`group relative w-full overflow-hidden rounded-[28px] p-5 transition-[transform,box-shadow] duration-400 ease-out dt:w-[260px] dt:shrink-0 ${
        i > 0 ? "dt:-ml-16" : ""
      } ${ROTATE[i % ROTATE.length]} ${BASE_Z[i % BASE_Z.length]} hover:z-40 hover:rotate-0 hover:-translate-y-3 hover:shadow-[0_28px_60px_rgba(15,23,42,0.28)] ${glass.vivid} ${glassScrim}`}
    >
      <div className="relative mb-4 h-56 w-full overflow-hidden rounded-[18px] bg-[linear-gradient(140deg,var(--color-primary-100),var(--color-secondary-100))]">
        <ImageWithFallback
          src={doc.img}
          alt={doc.name}
          fill
          sizes="260px"
          className="object-cover"
          fallback={
            <InitialsAvatar
              name={doc.name.replace("Dr. ", "")}
              rounded="lg"
              className="absolute inset-0 h-full! w-full! text-5xl!"
            />
          }
        />
        <span className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 shadow-[0_2px_8px_rgba(15,23,42,0.12)]">
          <FiStar size={12} className="fill-amber-400 text-amber-400" />
          <span className="font-sans text-[12px] font-bold text-slate-900 tabular-nums">
            {doc.rating}
          </span>
        </span>
      </div>

      <h3 className="mb-1 font-heading text-[18px] leading-tight font-bold tracking-[-0.02em] text-slate-900">
        {doc.name}
      </h3>
      <p className="mb-3 font-sans text-[13px] font-bold text-primary-700">
        {doc.specialty}
      </p>

      <div className="mb-4 flex items-center justify-between border-t border-slate-900/10 pt-3">
        <span className="font-sans text-[12px] text-slate-600">
          {doc.exp} experience
        </span>
        <Rate
          disabled
          allowHalf
          value={Number(doc.rating)}
          className="text-[11px]!"
        />
      </div>

      <Button
        type="primary"
        block
        className="h-auto! py-2.5! text-[13px]! font-sans"
      >
        Book now
      </Button>
    </article>
  );
}

export default function Doctors() {
  return (
    <section id="doctors" className="relative py-24 dt:py-32">
      <Parallax yPercent={-8} className="pointer-events-none absolute inset-0">
        <Mesh preset="doctors" />
      </Parallax>
      <Parallax yPercent={-12} className="pointer-events-none absolute inset-0">
        <BackdropMotifs
          count={9}
          opacity={0.12}
          seed={112}
          zone="full"
          minSize={90}
          maxSize={200}
        />
      </Parallax>

      <div className="relative mx-auto max-w-[1280px] px-5 dt:px-8">
        <div className="mx-auto mb-16 max-w-[680px] text-center">
          <span className="font-sans text-[12px] font-bold tracking-[0.16em] text-secondary uppercase">
            Meet the network
          </span>
          <h2 className="mt-3 font-heading text-[clamp(30px,4.4vw,52px)] leading-[1.02] font-bold tracking-[-0.04em] text-balance text-slate-900">
            Doctors ready to see you.
          </h2>
          <div className="mt-7 flex justify-center">
            <Button
              type="text"
              href="/listings/doctors"
              className="h-auto! border-[1.5px]! border-slate-900/15! bg-white/60! px-6! py-3! text-[14px]! text-slate-900! font-sans"
            >
              <span className="flex items-center gap-2">
                Browse all doctors
                <FiArrowRight size={14} />
              </span>
            </Button>
          </div>
        </div>

        <Reveal
          preset="standard"
          className="mx-auto flex max-w-[1040px] flex-col gap-8 pt-4 dt:flex-row dt:items-start dt:justify-center dt:gap-0 dt:pt-10"
        >
          {DOCTORS_DATA.map((doc, i) => (
            <DoctorCard key={doc.name} doc={doc} i={i} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
