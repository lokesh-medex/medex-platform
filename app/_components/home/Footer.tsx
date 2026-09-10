/**
 * Site footer. Already dark (`bg-slate-900`), which made it a natural fit
 * for the same materials used throughout the homepage: a quiet `footer` mesh
 * preset (`../home/Mesh.tsx`, tuned much lower than any section above it —
 * this is reference material, not a moment), faint motifs, and glass chips
 * for payment partners and social icons instead of flat slate swatches.
 */

import Image from "next/image";
import Link from "next/link";
import { Button, Tag } from "antd";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import LangCountrySwitcher from "@/app/_components/shared/LangCountrySwitcher";
import BackdropMotifs from "@/app/_components/shared/BackdropMotifs";
import { glass } from "@/app/_lib/glass";
import {
  FOOTER_COLS_DATA,
  OFFICE_LOCATION,
  PAYMENT_PARTNERS_DATA,
  SOCIAL_LINKS_DATA,
} from "@/app/_lib/homepage-data";
import Mesh from "@/app/_components/home/Mesh";

const SOCIAL_ICON: Record<string, React.ReactNode> = {
  Facebook: <FaFacebookF size={13} />,
  Instagram: <FaInstagram size={13} />,
  LinkedIn: <FaLinkedinIn size={13} />,
  YouTube: <FaYoutube size={13} />,
};

export default function Footer() {
  return (
    <footer className="relative py-14 pb-7 font-sans">
      <Mesh preset="footer" />
      <BackdropMotifs
        count={5}
        opacity={0.05}
        color="#ffffff"
        seed={150}
        zone="edges"
        minSize={130}
        maxSize={230}
      />

      <div className="relative mx-auto max-w-7xl px-5 dt:px-8">
        <div className="mb-10 grid grid-cols-1 gap-10 dt:grid-cols-[1.1fr_1.4fr_1fr]">
          <div className="min-w-65">
            <Image
              src="/medex.webp"
              alt="Medex"
              height={28}
              width={123}
              className="mb-4 h-7 w-auto brightness-0 invert"
            />
            <p className="m-0 mb-5 max-w-[320px] text-sm text-white/60">
              The healthcare aggregator that brings hospitals, labs and wellness
              studios into one search.
            </p>
            <div className="mb-5 -ml-2.5">
              <LangCountrySwitcher invert />
            </div>
            <div className="flex items-center gap-2.5">
              {SOCIAL_LINKS_DATA.map((soc) => (
                <Button
                  key={soc.label}
                  type="text"
                  shape="circle"
                  href={soc.href}
                  aria-label={soc.label}
                  className={`h-8! w-8! text-white/70! hover:text-white! ${glass.dark}`}
                  icon={SOCIAL_ICON[soc.label]}
                />
              ))}
            </div>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-8">
            {FOOTER_COLS_DATA.map((col) => (
              <div key={col.title}>
                <div className="mb-4 font-heading text-sm font-bold text-white">
                  {col.title}
                </div>
                <div className="flex flex-col gap-2.5">
                  {col.items.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="text-sm text-white/55 transition-colors hover:text-white!"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div>
            <div className="mb-4 font-heading text-sm font-bold text-white">
              Find Us
            </div>
            <div className={`overflow-hidden rounded-2xl p-0.5 ${glass.dark}`}>
              <iframe
                src={OFFICE_LOCATION.mapEmbedUrl}
                className="block h-37.5 w-full rounded-[14px] border-0 filter-[grayscale(0.4)_invert(0.92)_contrast(0.9)]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Medex office location"
              />
            </div>
            <div className="mt-2.5 text-xs leading-relaxed text-white/45">
              {OFFICE_LOCATION.address}
            </div>
          </div>
        </div>

        <div className="mb-5 flex flex-wrap items-center justify-between gap-4 border-t border-b border-white/10 py-5">
          <span className="text-xs font-bold text-white/45">We accept</span>
          <div className="flex flex-wrap items-center gap-3">
            {PAYMENT_PARTNERS_DATA.map((pp) => (
              <Tag
                key={pp}
                variant="filled"
                className={`m-0! rounded-lg border-0! bg-white/10! px-3! py-1.5! text-xs font-bold text-white/80! ${glass.dark}`}
              >
                {pp}
              </Tag>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs text-white/40">
            © 2026 Medex. All rights reserved.
          </span>
          <div className="flex items-center gap-4">
            <Link
              href="/privacy"
              className="text-xs text-white/40 hover:text-white/70!"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-xs text-white/40 hover:text-white/70!"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
