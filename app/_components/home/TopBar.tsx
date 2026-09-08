"use client";

/**
 * Utility strip: lang/country switchers, phone, About/Contact, Become a
 * Partner/Member. Renders as the TOP ROW inside Header's single floating
 * glass.dark panel rather than its own flat bar, so it has no
 * background/border of its own — Header supplies both.
 */

import { Button } from "antd";
import { FiPhone, FiShield, FiStar } from "react-icons/fi";
import LangCountrySwitcher from "@/app/_components/shared/LangCountrySwitcher";

export default function TopBar() {
  return (
    <div className="hidden items-center justify-between px-6 py-1.5 dt:flex">
      <div className="flex items-center gap-1">
        <LangCountrySwitcher invert />
        <a
          href="tel:+660254400001"
          className="flex items-center gap-1.5 text-xs font-semibold text-white/70"
        >
          <FiPhone size={13} />
          +66-02-544-0001
        </a>
        <a
          href="#"
          className="px-1.5 py-1 text-xs font-bold text-white/70 transition-colors hover:text-white!"
        >
          About
        </a>
        <a
          href="#"
          className="px-1.5 py-1 text-xs font-bold text-white/70 transition-colors hover:text-white!"
        >
          Contact
        </a>
      </div>
      <div className="flex items-center gap-2">
        <Button
          type="text"
          icon={<FiShield size={12} />}
          className="flex! h-auto! items-center! gap-1! bg-white/8! py-1! pr-3.5! pl-2.5! text-xs! font-sans text-white/85! hover:bg-white/14!"
        >
          Become a Partner
        </Button>
        <Button
          type="text"
          icon={<FiStar size={12} />}
          className="flex! h-auto! items-center! gap-1! bg-white/8! py-1! pr-3.5! pl-2.5! text-xs! font-sans text-white/85! hover:bg-white/14!"
        >
          Become a Member
        </Button>
      </div>
    </div>
  );
}
