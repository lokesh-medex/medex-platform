/**
 * Featured services — an asymmetric 6-column bento instead of a uniform
 * `auto-fit` grid. Two hero tiles (one 4x2 wide, one 2x2 tall) carry the full
 * card content; the remaining tiles are compact. Collapses to two columns at
 * `sm` and one on mobile, where spans would only produce unreadably narrow
 * cells.
 */

import Image from "next/image";
import { Button } from "antd";
import { FiArrowRight, FiArrowUpRight } from "react-icons/fi";
import BackdropMotifs from "@/app/_components/shared/BackdropMotifs";
import { Parallax, Reveal } from "@/app/_components/shared/Motion";
import { glass, glassScrim } from "@/app/_lib/glass";
import {
  HIGHLIGHT_CARDS_DATA,
  type HighlightCard,
} from "@/app/_lib/homepage-data";
import Mesh from "./Mesh";

/** Bento geometry, in source order. Index 0 is 4x2, index 3 is 2x2. */
const TILE_SPANS = [
  "dt:col-span-4 dt:row-span-2",
  "dt:col-span-2 dt:row-span-1",
  "dt:col-span-2 dt:row-span-1",
  "dt:col-span-2 dt:row-span-2",
  "dt:col-span-2 dt:row-span-1",
  "dt:col-span-2 dt:row-span-1",
  "dt:col-span-4 dt:row-span-1",
];

const FEATURE_INDEXES = new Set([0, 3]);
const CARDS = HIGHLIGHT_CARDS_DATA.slice(0, TILE_SPANS.length);

const SHELL =
  `group relative isolate flex flex-col overflow-hidden rounded-[28px] p-6 dt:p-7 ` +
  `transition-[transform,box-shadow] duration-300 hover:-translate-y-1.5 ` +
  `${glass.vivid} ${glassScrim}`;

function Tag({ card }: { card: HighlightCard }) {
  return (
    <span className="self-start rounded-full bg-white/70 px-3 py-1 font-sans text-[11px] font-bold tracking-[0.08em] text-primary-700 uppercase">
      {card.tag}
    </span>
  );
}

function FeatureTile({ card, span }: { card: HighlightCard; span: string }) {
  return (
    <article className={`${SHELL} ${span}`}>
      {/* Per-tile colour wash so the two hero tiles read hotter than the rest. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full opacity-25 blur-3xl"
        style={{ background: card.gradient }}
      />
      <div className="mb-6 flex items-start justify-between gap-4">
        <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white/70 p-3.5 shadow-[0_6px_18px_rgba(15,23,42,0.1)]">
          <Image
            src={card.icon}
            alt=""
            width={64}
            height={64}
            className="max-h-full max-w-full object-contain"
          />
        </div>
        <Tag card={card} />
      </div>

      <h3 className="mb-3 font-heading text-[clamp(22px,2.4vw,30px)] leading-[1.1] font-bold tracking-[-0.03em] text-slate-900">
        {card.name}
      </h3>
      <p className="mb-7 max-w-[46ch] flex-1 font-sans text-[14.5px] leading-[1.6] text-slate-700">
        {card.desc}
      </p>

      <Button
        type="text"
        href={card.href}
        target="_blank"
        rel="noopener"
        className="h-auto! self-start px-6! py-3! text-[14px]! text-white! transition-transform! duration-200! font-sans hover:-translate-y-0.5!"
        style={{ background: card.gradient }}
      >
        <span className="flex items-center gap-2">
          {card.cta}
          <FiArrowRight size={14} />
        </span>
      </Button>
    </article>
  );
}

function CompactTile({ card, span }: { card: HighlightCard; span: string }) {
  return (
    <a
      href={card.href}
      target="_blank"
      rel="noopener"
      className={`${SHELL} ${span}`}
    >
      <div className="mb-5 flex items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/70 p-2 shadow-[0_4px_12px_rgba(15,23,42,0.08)]">
          <Image
            src={card.icon}
            alt=""
            width={40}
            height={40}
            className="max-h-full max-w-full object-contain"
          />
        </div>
        <Tag card={card} />
      </div>

      <h3 className="mb-2 font-heading text-[19px] leading-[1.2] font-bold tracking-[-0.02em] text-slate-900">
        {card.name}
      </h3>
      <p className="m-0 line-clamp-2 flex-1 font-sans text-[13px] leading-[1.55] text-slate-700">
        {card.desc}
      </p>
      <span className="mt-5 flex items-center gap-1.5 font-sans text-[13px] font-bold text-primary-700">
        {card.cta}
        <FiArrowUpRight
          size={14}
          className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </span>
    </a>
  );
}

export default function FeaturedServices() {
  return (
    <section className="relative py-24 dt:py-32">
      <Parallax yPercent={-8} className="pointer-events-none absolute inset-0">
        <Mesh preset="features" />
      </Parallax>
      <Parallax yPercent={-12} className="pointer-events-none absolute inset-0">
        <BackdropMotifs
          count={9}
          opacity={0.12}
          seed={58}
          zone="full"
          minSize={90}
          maxSize={200}
        />
      </Parallax>

      <div className="relative mx-auto max-w-[1280px] px-5 dt:px-8">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-[640px]">
            <span className="font-sans text-[12px] font-bold tracking-[0.16em] text-secondary uppercase">
              Explore Medex
            </span>
            <h2 className="mt-3 font-heading text-[clamp(30px,4.4vw,52px)] leading-[1.02] font-bold tracking-[-0.04em] text-balance text-slate-900">
              Featured across every service we aggregate.
            </h2>
          </div>
          <Button
            type="text"
            href="/listings"
            className="h-auto! border-[1.5px]! border-slate-900/15! bg-white/60! px-6! py-3! text-[14px]! text-slate-900! font-sans"
          >
            <span className="flex items-center gap-2">
              Browse all services
              <FiArrowRight size={14} />
            </span>
          </Button>
        </div>

        <Reveal
          preset="standard"
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 dt:auto-rows-[minmax(220px,auto)] dt:grid-cols-6 dt:gap-5"
        >
          {CARDS.map((card, i) =>
            FEATURE_INDEXES.has(i) ? (
              <FeatureTile key={card.name} card={card} span={TILE_SPANS[i]} />
            ) : (
              <CompactTile key={card.name} card={card} span={TILE_SPANS[i]} />
            )
          )}
        </Reveal>
      </div>
    </section>
  );
}
