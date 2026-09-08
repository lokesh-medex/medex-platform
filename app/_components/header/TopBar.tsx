"use client";

import { Button } from "antd";
import { FiPhone, FiShield, FiStar } from "react-icons/fi";
import LangCountrySwitcher from "@/app/_components/shared/LangCountrySwitcher";

/** Desktop-only utility strip above the main nav: language/country switchers, phone, and secondary CTAs. */
export default function TopBar() {
  return (
    <div className="hidden dt:block bg-slate-100 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-8 py-1.5 flex items-center justify-between">
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
          <Button
            variant="outlined"
            color="primary"
            icon={<FiShield size={12} />}
            className="flex! items-center! gap-1! text-xs! h-auto! pl-2.5! pr-3.5! py-1! bg-primary-50! hover:bg-primary! hover:text-white! font-sans"
          >
            Become a Partner
          </Button>
          <Button
            variant="outlined"
            icon={<FiStar size={12} />}
            className="flex! items-center! gap-1! text-xs! h-auto! pl-2.5! pr-3.5! py-1! border-secondary! text-secondary! bg-secondary-100! hover:bg-secondary! hover:text-white! font-sans"
          >
            Become a Member
          </Button>
        </div>
      </div>
    </div>
  );
}
