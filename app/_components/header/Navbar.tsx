"use client";

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
import { MOBILE_NAV_LABELS, NAV_MENUS_DATA } from "@/app/_lib/homepage-data";
import { getTabByLabel, hrefForTab } from "@/app/_lib/listings-data";
import {
  getDetailCategoryByLabel,
  hrefForDetailCategory,
} from "@/app/_lib/detail-data";

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

/** Main bar: logo, desktop mega-menu nav, auth/cart actions, and the mobile menu. */
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
    <div className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-5 dt:px-8">
        <div className="flex items-center justify-between gap-4 py-3.5">
          <Link href="/" className="shrink-0">
            <Image
              src="/medex.webp"
              alt="Medex"
              height={34}
              width={149}
              className="h-8.5 w-auto"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden dt:flex items-center gap-3 flex-nowrap min-w-0">
            {NAV_MENUS_DATA.map((menu) => {
              const isOpen = navMenuOpen === menu.label;
              const isActive = active === menu.label;
              const highlighted = isOpen || isActive;
              const menuTab = getTabByLabel(menu.label);
              const viewAllHref = menuTab ? hrefForTab(menuTab) : "/listings";
              const detailCategory = getDetailCategoryByLabel(menu.label);
              const itemHref = detailCategory
                ? hrefForDetailCategory(detailCategory)
                : viewAllHref;
              return (
                <Dropdown
                  key={menu.label}
                  trigger={["hover"]}
                  open={isOpen}
                  onOpenChange={(next) =>
                    setNavMenuOpen(next ? menu.label : null)
                  }
                  popupRender={() => (
                    <div className="w-56 rounded-2xl py-2 bg-secondary border border-secondary shadow-[0_12px_32px_#0f172a17]">
                      {menu.items.map((mi) => (
                        <Link
                          key={mi.label}
                          href={itemHref}
                          onClick={() => setNavMenuOpen(null)}
                          className="flex items-center justify-between gap-2 px-4 py-2 text-sm text-white! transition-colors duration-150 hover:bg-white/10"
                        >
                          <span>{mi.label}</span>
                          {mi.isNew && (
                            <Tag
                              variant="filled"
                              color="magenta"
                              className="m-0! bg-primary! text-white! rounded-full px-1.5 py-0.5 text-[10px] font-bold tracking-wide leading-none"
                            >
                              NEW
                            </Tag>
                          )}
                        </Link>
                      ))}
                      <div className="border-t border-white/20 mt-1 pt-1">
                        <Link
                          href={viewAllHref}
                          onClick={() => setNavMenuOpen(null)}
                          className="flex items-center gap-1.5 px-4 py-2 text-sm text-white! font-bold transition-colors duration-150 hover:bg-white/10"
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
                    className={`flex! items-center! gap-1.5! h-auto! text-sm! font-semibold! py-1.5! px-0.5! whitespace-nowrap! rounded-none! border-b-2! font-sans ${
                      highlighted
                        ? "text-primary! border-b-primary!"
                        : "text-slate-600! border-b-transparent!"
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
          <div className="hidden dt:flex items-center gap-1.5 shrink-0">
            <Link
              href="/auth/login"
              className="flex items-center gap-1.5 text-sm whitespace-nowrap px-2.5 py-1.5 rounded-full bg-transparent text-slate-900 font-bold cursor-pointer transition-colors duration-150 hover:bg-slate-100 font-sans"
            >
              <FiLogIn size={14} />
              Log in
            </Link>
            <Link
              href="/auth/signup"
              className="flex items-center gap-1.5 text-sm whitespace-nowrap px-3.5 py-1.5 rounded-full bg-primary text-white font-bold cursor-pointer transition-[transform,box-shadow] duration-150 hover:-translate-y-px hover:shadow-[0_4px_12px_#f33b2740] font-sans"
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
                  className="h-9.5! w-9.5! bg-slate-100!"
                  icon={<FiShoppingCart size={17} className="text-slate-900" />}
                />
              </Badge>
            )}
          </div>

          {/* Mobile right side */}
          <div className="flex dt:hidden items-center gap-2">
            {showCart && (
              <Badge count={cartCount} size="small" offset={[-2, 2]}>
                <Button
                  type="text"
                  shape="circle"
                  onClick={onCartClick}
                  aria-label="Cart"
                  className="h-9! w-9! bg-slate-100!"
                  icon={<FiShoppingCart size={16} className="text-slate-900" />}
                />
              </Badge>
            )}
            <Button
              type="text"
              shape="circle"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Menu"
              aria-expanded={mobileOpen}
              className="h-9! w-9! rounded-[10px]! bg-slate-100!"
              icon={<FiMenu size={18} className="text-slate-900" />}
            />
          </div>
        </div>

        {/* Mobile slide-down menu — purple, matching the desktop dropdown's mega-menu panel */}
        {mobileOpen && (
          <div className="dt:hidden -mx-5 px-5 pb-3.5 flex flex-col gap-0.5 bg-secondary">
            {MOBILE_NAV_LABELS.map((label) => {
              const menu = NAV_MENUS_DATA.find((m) => m.label === label);
              const isActive = label === active;

              // Vendors/Doctors have no submenu data — render as a plain link
              // straight to their /listings/<slug> tab.
              if (!menu) {
                const tab = getTabByLabel(label);
                return (
                  <Link
                    key={label}
                    href={tab ? hrefForTab(tab) : "/listings"}
                    onClick={() => setMobileOpen(false)}
                    className={`text-[14.5px] font-bold py-2.5 px-1 ${
                      isActive ? "text-primary" : "text-white"
                    }`}
                  >
                    {label}
                  </Link>
                );
              }

              const isOpen = mobileCategoryOpen === label;
              const menuTab = getTabByLabel(label);
              const viewAllHref = menuTab ? hrefForTab(menuTab) : "/listings";
              const detailCategory = getDetailCategoryByLabel(label);
              const itemHref = detailCategory
                ? hrefForDetailCategory(detailCategory)
                : viewAllHref;
              return (
                <div key={label}>
                  <Button
                    type="text"
                    block
                    onClick={() =>
                      setMobileCategoryOpen((v) => (v === label ? null : label))
                    }
                    className={`flex! items-center! justify-between! h-auto! text-left! text-[14.5px]! font-bold! py-2.5! px-1! font-sans ${
                      isOpen || isActive ? "text-primary!" : "text-white!"
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
                    <div className="flex flex-col gap-0.5 ml-2 pl-3 pb-2 border-l-2 border-white/25">
                      {menu.items.map((mi) => (
                        <Link
                          key={mi.label}
                          href={itemHref}
                          onClick={() => setMobileOpen(false)}
                          className="flex items-center justify-between gap-2 rounded-lg px-2 py-2 text-sm text-white/80 transition-colors duration-150 hover:bg-white/10 hover:text-white"
                        >
                          <span>{mi.label}</span>
                          {mi.isNew && (
                            <Tag
                              variant="filled"
                              color="magenta"
                              className="m-0! bg-primary! text-white! rounded-full px-1.5 py-0.5 text-[10px] font-bold tracking-wide leading-none"
                            >
                              NEW
                            </Tag>
                          )}
                        </Link>
                      ))}
                      <Link
                        href={viewAllHref}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-1.5 rounded-lg px-2 py-2 text-sm font-bold text-white transition-colors duration-150 hover:bg-white/10"
                      >
                        {menu.viewAll}
                        <FiArrowRight size={13} />
                      </Link>
                    </div>
                  )}
                </div>
              );
            })}

            <div className="flex items-center gap-2 mt-2">
              <Link
                href="/auth/login"
                onClick={() => setMobileOpen(false)}
                className="flex-1 flex items-center justify-center text-sm py-2.5 rounded-full bg-white text-slate-900 font-bold cursor-pointer font-sans"
              >
                Log in
              </Link>
              <Link
                href="/auth/signup"
                onClick={() => setMobileOpen(false)}
                className="flex-1 flex items-center justify-center text-sm py-2.5 rounded-full bg-primary text-white font-bold cursor-pointer font-sans"
              >
                Sign up
              </Link>
            </div>

            {/* Utility strip content — desktop-only in TopBar, folded in here so
                it's still reachable below the `dt` breakpoint. */}
            <div className="mt-3 pt-3 border-t border-white/20 flex flex-col gap-2.5">
              <LangCountrySwitcher invert />
              <a
                href="tel:+660254400001"
                className="flex items-center gap-1.5 text-xs text-white/80 font-semibold px-1  my-1"
              >
                <FiPhone size={13} />
                +66-02-544-0001
              </a>
              <div className="flex items-center gap-3 px-1 my-1">
                <a href="#" className="text-xs font-bold text-white">
                  About
                </a>
                <a href="#" className="text-xs font-bold text-white">
                  Contact
                </a>
              </div>
              <div className="flex flex-col gap-2">
                <Button
                  variant="outlined"
                  color="primary"
                  icon={<FiShield size={13} />}
                  className="flex! items-center! justify-center! gap-1.5! text-xs! py-2! h-auto! bg-primary-50! font-sans"
                >
                  Become a Partner
                </Button>
                <Button
                  variant="outlined"
                  icon={<FiStar size={13} />}
                  className="flex! items-center! justify-center! gap-1.5! text-xs! py-2! h-auto! border-white/40! text-white! bg-white/10! font-sans"
                >
                  Become a Member
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
