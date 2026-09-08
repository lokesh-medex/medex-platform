import Image from "next/image";
import { Button, Tag } from "antd";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import LangCountrySwitcher from "@/app/_components/shared/LangCountrySwitcher";
import {
  FOOTER_COLS_DATA,
  OFFICE_LOCATION,
  PAYMENT_PARTNERS_DATA,
  SOCIAL_LINKS_DATA,
} from "@/app/_lib/homepage-data";

const SOCIAL_ICON: Record<string, React.ReactNode> = {
  Facebook: <FaFacebookF size={13} />,
  Instagram: <FaInstagram size={13} />,
  LinkedIn: <FaLinkedinIn size={13} />,
  YouTube: <FaYoutube size={13} />,
};

export default function Footer() {
  return (
    <footer className="bg-slate-900 py-14 pb-7 font-sans">
      <div className="max-w-7xl mx-auto px-5 dt:px-8">
        <div className="grid grid-cols-1 dt:grid-cols-[1.1fr_1.4fr_1fr] gap-10 mb-10">
          <div className="min-w-65">
            <Image
              src="/medex.webp"
              alt="Medex"
              height={28}
              width={123}
              className="h-7 w-auto mb-4"
            />
            <p className="text-slate-300 text-sm max-w-[320px] m-0 mb-5">
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
                  className="h-8! w-8! bg-slate-800! text-slate-300! hover:text-white! hover:bg-slate-700!"
                  icon={SOCIAL_ICON[soc.label]}
                />
              ))}
            </div>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-8">
            {FOOTER_COLS_DATA.map((col) => (
              <div key={col.title}>
                <div className="font-heading text-white font-bold text-sm mb-4">
                  {col.title}
                </div>
                <div className="flex flex-col gap-2.5">
                  {col.items.map((item) => (
                    <a key={item} href="#" className="text-slate-300 text-sm">
                      {item}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div>
            <div className="font-heading text-white font-bold text-sm mb-4">
              Find Us
            </div>
            <div className="rounded-2xl overflow-hidden border border-slate-700">
              <iframe
                src={OFFICE_LOCATION.mapEmbedUrl}
                className="w-full h-37.5 block border-0 filter-[grayscale(0.3)_invert(0.92)_contrast(0.9)]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Medex office location"
              />
            </div>
            <div className="text-slate-400 text-xs mt-2.5 leading-relaxed">
              {OFFICE_LOCATION.address}
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 py-5 border-t border-b border-slate-800 mb-5">
          <span className="text-slate-400 text-xs font-bold">We accept</span>
          <div className="flex flex-wrap items-center gap-4">
            {PAYMENT_PARTNERS_DATA.map((pp) => (
              <Tag
                key={pp}
                variant="filled"
                className="m-0! bg-slate-800! text-slate-200! text-xs font-bold rounded-lg px-3 py-1.5 border-0!"
              >
                {pp}
              </Tag>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="text-slate-500 text-xs">
            © 2026 Medex. All rights reserved.
          </span>
          <div className="flex items-center gap-4">
            <a href="#" className="text-slate-500 text-xs">
              Privacy
            </a>
            <a href="#" className="text-slate-500 text-xs">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
