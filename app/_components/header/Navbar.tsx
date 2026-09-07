"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FiArrowRight,
  FiBox,
  FiChevronDown,
  FiHeart,
  FiLogIn,
  FiMenu,
  FiShoppingCart,
  FiStar,
  FiUserPlus,
} from "react-icons/fi";
import { FaFlask } from "react-icons/fa";
import { MOBILE_NAV_LABELS, NAV_MENUS_DATA } from "@/app/_lib/homepage-data";

export type HeaderActive = "" | "Packages" | "Lab Tests" | "Services" | "Wellness" | "Vendors" | "Doctors";

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
export default function Navbar({ active, showCart, cartCount, onCartClick }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [navMenuOpen, setNavMenuOpen] = useState<string | null>(null);

  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setNavMenuOpen(null);
      }
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  return (
    <div ref={navRef} className="bg-white border-b border-slate-200">
      <div className="max-w-[1280px] mx-auto px-5 dt:px-8">
        <div className="flex items-center justify-between gap-4 py-3.5">
          <Link href="/" className="shrink-0">
            <Image src="/medex.webp" alt="Medex" height={34} width={149} className="h-[34px] w-auto" priority />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden dt:flex items-center gap-3 flex-nowrap min-w-0 overflow-hidden">
            {NAV_MENUS_DATA.map((menu) => {
              const isOpen = navMenuOpen === menu.label;
              const isActive = active === menu.label;
              const color = isOpen || isActive ? "#f33b27" : "#475569";
              return (
                <div key={menu.label} className="relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setNavMenuOpen((v) => (v === menu.label ? null : menu.label));
                    }}
                    className="flex items-center gap-1.5 bg-transparent border-none cursor-pointer text-sm font-semibold py-1.5 px-0.5 whitespace-nowrap border-b-2 transition-colors duration-150 hover:text-[#f33b27] font-sans"
                    style={{ color, borderBottomColor: isOpen || isActive ? "#f33b27" : "transparent" }}
                  >
                    {NAV_ICON[menu.label]}
                    <span>{menu.label}</span>
                    <FiChevronDown
                      size={14}
                      className="transition-transform duration-200"
                      style={{ transform: isOpen ? "rotate(180deg)" : "none" }}
                    />
                  </button>
                  {isOpen && (
                    <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 z-50">
                      <div className="w-56 rounded-2xl py-2 bg-[#872888] border border-[#872888] shadow-[0_12px_32px_#0f172a17]">
                        {menu.items.map((mi) => (
                          <a
                            key={mi.label}
                            href="#"
                            className="flex items-center justify-between gap-2 px-4 py-2 text-sm text-white transition-colors duration-150 hover:bg-white/10"
                          >
                            <span>{mi.label}</span>
                            {mi.isNew && (
                              <span className="text-[10px] font-bold tracking-wide text-white bg-[#f33b27] rounded-full px-1.5 py-0.5">NEW</span>
                            )}
                          </a>
                        ))}
                        <div className="border-t border-white/20 mt-1 pt-1">
                          <a href="#" className="flex items-center gap-1.5 px-4 py-2 text-sm text-white font-bold transition-colors duration-150 hover:bg-white/10">
                            {menu.viewAll}
                            <FiArrowRight size={13} />
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Desktop auth/cart */}
          <div className="hidden dt:flex items-center gap-1.5 shrink-0">
            <button className="flex items-center gap-1.5 text-sm whitespace-nowrap px-2.5 py-1.5 rounded-full bg-transparent border-none text-[#0f172a] font-bold cursor-pointer transition-colors duration-150 hover:bg-slate-100 font-sans">
              <FiLogIn size={14} />
              Log in
            </button>
            <button className="flex items-center gap-1.5 text-sm whitespace-nowrap px-3.5 py-1.5 rounded-full bg-[#f33b27] border-none text-white font-bold cursor-pointer transition-[transform,box-shadow] duration-150 hover:-translate-y-px hover:shadow-[0_4px_12px_#f33b2740] font-sans">
              <FiUserPlus size={14} />
              Sign up
            </button>
            {showCart && (
              <button
                onClick={onCartClick}
                aria-label="Cart"
                className="relative h-[38px] w-[38px] rounded-full bg-slate-100 border-none flex items-center justify-center cursor-pointer"
              >
                <FiShoppingCart size={17} color="#0f172a" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-[18px] min-w-[18px] px-1 rounded-full bg-[#f33b27] text-white text-[10px] font-extrabold flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            )}
          </div>

          {/* Mobile right side */}
          <div className="flex dt:hidden items-center gap-2">
            {showCart && (
              <button
                onClick={onCartClick}
                aria-label="Cart"
                className="relative h-9 w-9 rounded-full bg-slate-100 border-none flex items-center justify-center cursor-pointer"
              >
                <FiShoppingCart size={16} color="#0f172a" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 min-w-4 px-1 rounded-full bg-[#f33b27] text-white text-[9px] font-extrabold flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            )}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Menu"
              aria-expanded={mobileOpen}
              className="h-9 w-9 rounded-[10px] bg-slate-100 border-none flex items-center justify-center cursor-pointer"
            >
              <FiMenu size={18} color="#0f172a" />
            </button>
          </div>
        </div>

        {/* Mobile slide-down menu */}
        {mobileOpen && (
          <div className="dt:hidden flex flex-col gap-0.5 pb-3.5">
            {MOBILE_NAV_LABELS.map((label) => (
              <a
                key={label}
                href="#"
                className="text-[14.5px] font-bold py-2.5 px-1"
                style={{ color: label === active ? "#f33b27" : "#0f172a" }}
              >
                {label}
              </a>
            ))}
            <div className="flex items-center gap-2 mt-2">
              <button className="flex-1 text-sm py-2.5 rounded-full bg-slate-100 border-none text-[#0f172a] font-bold cursor-pointer font-sans">
                Log in
              </button>
              <button className="flex-1 text-sm py-2.5 rounded-full bg-[#f33b27] border-none text-white font-bold cursor-pointer font-sans">
                Sign up
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
