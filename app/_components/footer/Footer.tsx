import Image from "next/image";
import { FOOTER_COLS_DATA } from "@/app/_lib/homepage-data";

export default function Footer() {
  return (
    <footer className="bg-[#0f172a] py-14 pb-7 font-sans">
      <div className="max-w-[1280px] mx-auto px-5 dt:px-8">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-10 mb-10">
          <div className="col-span-2 min-w-[260px]">
            <Image src="/medex.webp" alt="Medex" height={28} width={123} className="h-7 w-auto mb-4" />
            <p className="text-slate-300 text-sm max-w-[320px] m-0">
              The healthcare aggregator that brings hospitals, labs and wellness studios into one search.
            </p>
          </div>
          {FOOTER_COLS_DATA.map((col) => (
            <div key={col.title}>
              <div className="font-[family-name:var(--font-heading)] text-white font-bold text-sm mb-4">{col.title}</div>
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
        <div className="flex flex-wrap items-center justify-between gap-3 pt-6 border-t border-slate-800">
          <span className="text-slate-500 text-xs">© 2026 Medex. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <a href="#" className="text-slate-500 text-xs">Privacy</a>
            <a href="#" className="text-slate-500 text-xs">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
