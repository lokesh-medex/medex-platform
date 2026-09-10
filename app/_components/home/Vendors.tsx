/**
 * Vendors — large image-first cards with the name/location set ON the photo
 * behind a gradient scrim, rather than an image-above-text card. No glass
 * here on purpose — the photos are the texture, and the section sits between
 * two heavy glass bands.
 */

import Image from "next/image";
import Link from "next/link";
import { Button } from "antd";
import { FiArrowRight, FiArrowUpRight, FiMapPin } from "react-icons/fi";
import BackdropMotifs from "@/app/_components/shared/BackdropMotifs";
import { Parallax, Reveal } from "@/app/_components/shared/Motion";
import { VENDORS_DATA } from "@/app/_lib/homepage-data";
import { getVendorByName } from "@/app/_lib/vendor-data";
import Mesh from "./Mesh";

/**
 * A couple of the homepage showcase names ("Purnayau Hydro Facial", "Heavenly
 * Spa") don't have their own vendor record yet, so `getVendorByName` can't
 * resolve them. Rather than leaving those cards dead, route them to the
 * closest real vendor page we do have — the spa/therapy-offering "Nectar
 * Wellness Pvt Ltd" — until they get dedicated entries in vendor-data.ts.
 */
const FALLBACK_VENDOR_NAME = "Nectar Wellness Pvt Ltd";

/** Each row leads with a double-wide card, so no row reads as a flat 4-up. */
const SPANS = [
  "dt:col-span-2",
  "dt:col-span-1",
  "dt:col-span-1",
  "dt:col-span-2",
  "dt:col-span-1",
  "dt:col-span-1",
];

export default function Vendors() {
  return (
    <section id="vendors" className="relative py-24 dt:py-32">
      <Parallax yPercent={-8} className="pointer-events-none absolute inset-0">
        <Mesh preset="vendors" />
      </Parallax>
      <Parallax yPercent={-12} className="pointer-events-none absolute inset-0">
        <BackdropMotifs
          count={9}
          opacity={0.1}
          seed={73}
          zone="full"
          minSize={90}
          maxSize={200}
        />
      </Parallax>

      <div className="relative mx-auto max-w-[1280px] px-5 dt:px-8">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-[620px]">
            <span className="font-sans text-[12px] font-bold tracking-[0.16em] text-primary uppercase">
              Our network
            </span>
            <h2 className="mt-3 font-heading text-[clamp(30px,4.4vw,52px)] leading-[1.02] font-bold tracking-[-0.04em] text-balance text-slate-900">
              Vendors people actually rebook.
            </h2>
            <p className="mt-4 max-w-120 font-sans text-[14.5px] leading-[1.6] text-slate-700">
              Every listing is verified before it goes live — licences,
              facilities and pricing checked by our team.
            </p>
          </div>
          <Button
            type="text"
            href="/listings/vendors"
            className="h-auto! border-[1.5px]! border-slate-900/15! bg-white/60! px-6! py-3! text-[14px]! text-slate-900! font-sans"
          >
            <span className="flex items-center gap-2">
              Browse all vendors
              <FiArrowRight size={14} />
            </span>
          </Button>
        </div>

        <Reveal
          preset="standard"
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 dt:grid-cols-4 dt:gap-5"
        >
          {VENDORS_DATA.map((v, i) => {
            const vendor =
              getVendorByName(v.name) ?? getVendorByName(FALLBACK_VENDOR_NAME)!;
            return (
              <article
                key={`${v.name}-${i}`}
                className={`group relative h-[360px] overflow-hidden rounded-[28px] shadow-[0_18px_44px_rgba(15,23,42,0.16)] ${SPANS[i]}`}
              >
                <div
                  className="absolute inset-0"
                  style={{ background: v.gradient }}
                />
                <Image
                  src={v.img}
                  alt={v.name}
                  fill
                  sizes="(min-width: 1040px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-[700ms] ease-out group-hover:scale-[1.06]"
                />
                {/* Scrim: strong at the base so overlaid copy stays legible on
                  any photo, near-transparent at the top. */}
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,2,16,0.05)_0%,rgba(10,2,16,0.35)_45%,rgba(10,2,16,0.9)_100%)]" />
                <div
                  className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-40"
                  style={{ background: v.gradient }}
                />

                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="mb-2 font-heading text-[21px] leading-[1.15] font-bold tracking-[-0.02em] text-white">
                    {v.name}
                  </h3>
                  <div className="mb-5 flex items-start gap-2">
                    <FiMapPin
                      size={13}
                      className="mt-0.5 shrink-0 text-white/70"
                    />
                    <p className="m-0 line-clamp-2 font-sans text-[12.5px] leading-[1.45] text-white/75">
                      {v.location}
                    </p>
                  </div>
                  <Button
                    type="text"
                    href={`/vendor/${vendor.slug}`}
                    className="h-auto! bg-white! px-5! py-2.5! text-[13px]! text-slate-900! transition-transform! duration-200! font-sans group-hover:-translate-y-0.5!"
                  >
                    <span className="flex items-center gap-1.5">
                      Book now
                      <FiArrowUpRight size={13} />
                    </span>
                  </Button>
                </div>
                <Link
                  href={`/vendor/${vendor.slug}`}
                  aria-label={v.name}
                  className="absolute inset-0 z-10"
                />
              </article>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
