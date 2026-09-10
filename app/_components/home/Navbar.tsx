"use client";

/**
 * Main nav bar — logo, mega-menu, auth/cart actions, mobile menu.
 *  - No background/border of its own; renders as the BOTTOM ROW inside
 *    Header's single floating glass.dark panel.
 *  - The mega-menu dropdown panel is a brand-dark gradient (`BRAND_DARK_PANEL`)
 *    rather than solid `bg-secondary` — it's portaled to <body> by antd, so it
 *    carries its own backdrop-filter rather than relying on Header's.
 *  - Auth actions match the Hero's button language: solid white pill for the
 *    primary action, glass for everything secondary.
 *  - The mobile slide-down is deliberately white glass (`glass.subtle`), not
 *    brand-dark like the rest of the chrome — see its own comment below for
 *    why.
 */

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Badge, Button, Dropdown, Tag } from "antd";
import {
  FiArrowRight,
  FiBox,
  FiChevronDown,
  FiHeart,
  FiLogIn,
  FiMenu,
  FiPhone,
  FiShield,
  FiShoppingCart,
  FiStar,
  FiUserPlus,
} from "react-icons/fi";
import { FaFlask } from "react-icons/fa";
import LangCountrySwitcher from "@/app/_components/shared/LangCountrySwitcher";
import NavSearch from "@/app/_components/home/NavSearch";
import { glass } from "@/app/_lib/glass";
import { BRAND_DARK_PANEL } from "@/app/_lib/theme";
import { MOBILE_NAV_LABELS, NAV_MENUS_DATA } from "@/app/_lib/homepage-data";
import { getTabByLabel, hrefForTab } from "@/app/_lib/listings-data";

export type HeaderActive =
  | ""
  | "Packages"
  | "Lab Tests"
  | "Services"
  | "Wellness"
  | "Vendors"
  | "Doctors";

interface NavbarProps {
  active: HeaderActive;
  showCart: boolean;
  cartCount: number;
  onCartClick?: () => void;
}

const NAV_ICON: Record<string, React.ReactNode> = {
  Packages: <FiBox size={15} />,
  "Lab Tests": <FaFlask size={13} />,
  Services: <FiStar size={15} />,
  Wellness: <FiHeart size={15} />,
};

export default function Navbar({
  active,
  showCart,
  cartCount,
  onCartClick,
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [navMenuOpen, setNavMenuOpen] = useState<string | null>(null);
  const [mobileCategoryOpen, setMobileCategoryOpen] = useState<string | null>(
    null
  );

  return (
    <div className="px-6">
      <div className="flex items-center justify-between gap-4 py-2.5">
        {/* Solid white chip, not just the bare mark: the logo's own red/purple
            hues match the brand mesh behind the hero and the brand-gradient
            dense panel alike, so without an opaque, color-neutral backdrop it
            blends into whatever's behind the header instead of standing out. */}
        <Link
          href="/"
          className="flex shrink-0 items-center rounded-full bg-white px-3 py-1.5 shadow-[0_2px_10px_rgba(0,0,0,0.18)]"
        >
          <Image
            src="/medex.webp"
            alt="Medex"
            height={24}
            width={105}
            className="h-6 w-auto"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden min-w-0 flex-nowrap items-center gap-3 dt:flex">
          {NAV_MENUS_DATA.map((menu) => {
            const isOpen = navMenuOpen === menu.label;
            const isActive = active === menu.label;
            const highlighted = isOpen || isActive;
            const menuTab = getTabByLabel(menu.label);
            const viewAllHref = menuTab ? hrefForTab(menuTab) : "/listings";
            return (
              <Dropdown
                key={menu.label}
                trigger={["hover"]}
                open={isOpen}
                onOpenChange={(next) =>
                  setNavMenuOpen(next ? menu.label : null)
                }
                popupRender={() => (
                  <div className={`w-56 rounded-2xl py-2 ${BRAND_DARK_PANEL}`}>
                    {menu.items.map((mi) => (
                      <Link
                        key={mi.label}
                        href={`${viewAllHref}?q=${encodeURIComponent(mi.label)}`}
                        onClick={() => setNavMenuOpen(null)}
                        className="flex items-center justify-between gap-2 px-4 py-2 text-sm text-white/85! transition-colors duration-150 hover:bg-white/10 hover:text-white!"
                      >
                        <span>{mi.label}</span>
                        {mi.isNew && (
                          <Tag
                            variant="filled"
                            className="m-0! rounded-full bg-primary! px-1.5 py-0.5 text-[10px] leading-none font-bold tracking-wide text-white!"
                          >
                            NEW
                          </Tag>
                        )}
                      </Link>
                    ))}
                    <div className="mt-1 border-t border-white/15 pt-1">
                      <Link
                        href={viewAllHref}
                        onClick={() => setNavMenuOpen(null)}
                        className="flex items-center gap-1.5 px-4 py-2 text-sm font-bold text-white! transition-colors duration-150 hover:bg-white/10"
                      >
                        {menu.viewAll}
                        <FiArrowRight size={13} />
                      </Link>
                    </div>
                  </div>
                )}
              >
                <Button
                  type="text"
                  className={`flex! h-auto! items-center! gap-1.5! rounded-none! border-b-2! px-0.5! py-1.5! text-sm! font-semibold! whitespace-nowrap! font-sans ${
                    highlighted
                      ? "border-b-white! text-white!"
                      : "border-b-transparent! text-white/65!"
                  }`}
                >
                  {NAV_ICON[menu.label]}
                  <span>{menu.label}</span>
                  <FiChevronDown
                    size={14}
                    className="transition-transform duration-200"
                    style={{ transform: isOpen ? "rotate(180deg)" : "none" }}
                  />
                </Button>
              </Dropdown>
            );
          })}
        </nav>

        {/* Desktop auth/cart */}
        <div className="hidden shrink-0 items-center gap-1.5 dt:flex">
          <NavSearch />
          <Link
            href="/auth/login"
            className="flex cursor-pointer items-center gap-1.5 rounded-full px-2.5 py-1.5 text-sm font-bold whitespace-nowrap text-white/85 transition-colors duration-150 hover:bg-white/10 hover:text-white font-sans"
          >
            <FiLogIn size={14} />
            Log in
          </Link>
          <Link
            href="/auth/signup"
            className="flex cursor-pointer items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-sm font-bold whitespace-nowrap text-slate-900 transition-transform duration-150 hover:-translate-y-px font-sans"
          >
            <FiUserPlus size={14} />
            Sign up
          </Link>
          {showCart && (
            <Badge count={cartCount} size="small" offset={[-4, 4]}>
              <Button
                type="text"
                shape="circle"
                onClick={onCartClick}
                aria-label="Cart"
                className={`h-9.5! w-9.5! ${glass.dark}`}
                icon={<FiShoppingCart size={17} className="text-white!" />}
              />
            </Badge>
          )}
        </div>

        {/* Mobile right side */}
        <div className="flex items-center gap-2 dt:hidden">
          <NavSearch compact />
          {showCart && (
            <Badge count={cartCount} size="small" offset={[-2, 2]}>
              <Button
                type="text"
                shape="circle"
                onClick={onCartClick}
                aria-label="Cart"
                className={`h-9! w-9! ${glass.dark}`}
                icon={<FiShoppingCart size={16} className="text-white!" />}
              />
            </Badge>
          )}
          <Button
            type="text"
            shape="circle"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={mobileOpen}
            className={`h-9! w-9! rounded-[10px]! ${glass.dark}`}
            icon={<FiMenu size={18} className="text-white!" />}
          />
        </div>
      </div>

      {/* Mobile slide-down menu — deliberately WHITE glass (`glass.subtle`)
          rather than the brand-dark treatment used by the header/mega-menu:
          it's the one surface a user reads for several seconds at a time
          (scanning a whole nav list), and a dense dark panel nested inside
          the header's own dark/glass bar read as one big dark mass. Every
          descendant color below is flipped to a dark-on-light palette to
          match — this is the only place in the chrome that's light instead
          of brand-dark. */}
      {mobileOpen && (
        <div
          className={`-mx-6 flex flex-col gap-0.5 px-6 pb-3.5 dt:hidden ${glass.subtle}`}
        >
          {MOBILE_NAV_LABELS.map((label) => {
            const menu = NAV_MENUS_DATA.find((m) => m.label === label);
            const isActive = label === active;

            if (!menu) {
              const tab = getTabByLabel(label);
              return (
                <Link
                  key={label}
                  href={tab ? hrefForTab(tab) : "/listings"}
                  onClick={() => setMobileOpen(false)}
                  className={`px-1 py-2.5 text-[14.5px] font-bold ${
                    isActive ? "text-primary" : "text-slate-800"
                  }`}
                >
                  {label}
                </Link>
              );
            }

            const isOpen = mobileCategoryOpen === label;
            const menuTab = getTabByLabel(label);
            const viewAllHref = menuTab ? hrefForTab(menuTab) : "/listings";
            return (
              <div key={label}>
                <Button
                  type="text"
                  block
                  onClick={() =>
                    setMobileCategoryOpen((v) => (v === label ? null : label))
                  }
                  className={`flex! h-auto! items-center! justify-between! py-2.5! px-1! text-left! text-[14.5px]! font-bold! font-sans ${
                    isOpen || isActive ? "text-primary!" : "text-slate-800!"
                  }`}
                >
                  <span>{label}</span>
                  <FiChevronDown
                    size={16}
                    className="transition-transform duration-200"
                    style={{ transform: isOpen ? "rotate(180deg)" : "none" }}
                  />
                </Button>
                {isOpen && (
                  <div className="mb-2 ml-2 flex flex-col gap-0.5 border-l-2 border-slate-900/10 pl-3">
                    {menu.items.map((mi) => (
                      <Link
                        key={mi.label}
                        href={`${viewAllHref}?q=${encodeURIComponent(mi.label)}`}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center justify-between gap-2 rounded-lg px-2 py-2 text-sm text-slate-600 transition-colors duration-150 hover:bg-slate-900/5 hover:text-slate-900"
                      >
                        <span>{mi.label}</span>
                        {mi.isNew && (
                          <Tag
                            variant="filled"
                            className="m-0! rounded-full bg-primary! px-1.5 py-0.5 text-[10px] leading-none font-bold tracking-wide text-white!"
                          >
                            NEW
                          </Tag>
                        )}
                      </Link>
                    ))}
                    <Link
                      href={viewAllHref}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-1.5 rounded-lg px-2 py-2 text-sm font-bold text-slate-900 transition-colors duration-150 hover:bg-slate-900/5"
                    >
                      {menu.viewAll}
                      <FiArrowRight size={13} />
                    </Link>
                  </div>
                )}
              </div>
            );
          })}

          <div className="mt-2 flex items-center gap-2">
            <Link
              href="/auth/login"
              onClick={() => setMobileOpen(false)}
              className="flex flex-1 cursor-pointer items-center justify-center rounded-full bg-slate-900/6 py-2.5 text-sm font-bold text-slate-900 font-sans"
            >
              Log in
            </Link>
            <Link
              href="/auth/signup"
              onClick={() => setMobileOpen(false)}
              className="flex flex-1 cursor-pointer items-center justify-center rounded-full bg-primary py-2.5 text-sm font-bold text-white font-sans"
            >
              Sign up
            </Link>
          </div>

          {/* Utility strip content — desktop-only in TopBar, folded in here so
              it's still reachable below the `dt` breakpoint. */}
          <div className="mt-3 flex flex-col gap-2.5 border-t border-slate-900/10 pt-3">
            <LangCountrySwitcher />
            <a
              href="tel:+660254400001"
              className="my-1 flex items-center gap-1.5 px-1 text-xs font-semibold text-slate-600"
            >
              <FiPhone size={13} />
              +66-02-544-0001
            </a>
            <div className="my-1 flex items-center gap-3 px-1">
              <a href="#" className="text-xs font-bold text-secondary">
                About
              </a>
              <a href="#" className="text-xs font-bold text-secondary">
                Contact
              </a>
            </div>
            <div className="flex flex-col gap-2">
              <Button
                type="text"
                icon={<FiShield size={13} />}
                className="flex! h-auto! items-center! justify-center! gap-1.5! bg-primary-50! py-2! text-xs! font-sans text-primary-700!"
              >
                Become a Partner
              </Button>
              <Button
                type="text"
                icon={<FiStar size={13} />}
                className="flex! h-auto! items-center! justify-center! gap-1.5! bg-secondary-100! py-2! text-xs! font-sans text-secondary-600!"
              >
                Become a Member
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
