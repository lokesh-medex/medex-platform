"use client";

import { useRef } from "react";
import { FiPhone, FiShield, FiStar } from "react-icons/fi";
import LangCountrySwitcher from "@/app/_components/shared/LangCountrySwitcher";

/** Desktop-only utility strip above the main nav: language/country switchers, phone, and secondary CTAs. */
export default function TopBar() {
  const barRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={barRef}
      className="hidden dt:block bg-slate-100 border-b border-slate-200"
    >
      <div className="max-w-[1280px] mx-auto px-8 py-1.5 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <LangCountrySwitcher />
          <a
            href="tel:+660254400001"
            className="flex items-center gap-1.5 text-xs text-slate-600 font-semibold"
          >
            <FiPhone size={13} />
            +66-02-544-0001
          </a>
          <a href="#" className="text-xs font-bold px-1.5 py-1 text-secondary">
            About
          </a>
          <a href="#" className="text-xs font-bold px-1.5 py-1 text-secondary">
            Contact
          </a>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1 text-xs pl-2.5 pr-3.5 py-1 rounded-full border-[1.5px] border-primary text-primary bg-primary-50 font-bold cursor-pointer transition-[transform,box-shadow,background,color] duration-150 hover:-translate-y-px hover:shadow-[0_4px_12px_#f33b2733] hover:bg-primary hover:text-white">
            <FiShield size={12} />
            Become a Partner
          </button>
          <button className="flex items-center gap-1 text-xs pl-2.5 pr-3.5 py-1 rounded-full border-[1.5px] border-secondary text-secondary bg-secondary-100 font-bold cursor-pointer transition-[transform,box-shadow,background,color] duration-150 hover:-translate-y-px hover:shadow-[0_4px_12px_#87288833] hover:bg-secondary hover:text-white">
            <FiStar size={12} />
            Become a Member
          </button>
        </div>
      </div>
    </div>
  );
}
