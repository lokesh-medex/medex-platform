"use client";

import { useEffect, useRef, useState } from "react";
import { FiChevronDown, FiGlobe, FiMapPin, FiPhone, FiShield, FiStar } from "react-icons/fi";
import FlagBadge from "@/app/_components/shared/FlagBadge";
import { COUNTRIES_DATA, LANGUAGES_DATA } from "@/app/_lib/homepage-data";

/** Desktop-only utility strip above the main nav: language/country switchers, phone, and secondary CTAs. */
export default function TopBar() {
  const [langOpen, setLangOpen] = useState(false);
  const [countryOpen, setCountryOpen] = useState(false);
  const [language, setLanguage] = useState("English");
  const [country, setCountry] = useState("Nepal");

  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (barRef.current && !barRef.current.contains(e.target as Node)) {
        setLangOpen(false);
        setCountryOpen(false);
      }
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  const currentLangFlag = LANGUAGES_DATA.find((l) => l.name === language) ?? LANGUAGES_DATA[0];
  const currentCountryFlag = COUNTRIES_DATA.find((c) => c.name === country) ?? COUNTRIES_DATA[0];

  return (
    <div ref={barRef} className="hidden dt:block bg-slate-100 border-b border-slate-200">
      <div className="max-w-[1280px] mx-auto px-8 py-1.5 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLangOpen((v) => !v);
                setCountryOpen(false);
              }}
              className="flex items-center gap-1.5 border-none bg-transparent rounded-full px-2.5 py-1 text-xs text-slate-600 cursor-pointer font-sans"
            >
              <FiGlobe size={13} />
              <FlagBadge name={language} flag={currentLangFlag.flag} />
              <span>{language}</span>
              <FiChevronDown size={11} />
            </button>
            {langOpen && (
              <div className="absolute left-0 mt-1 w-[150px] rounded-xl border border-slate-200 bg-white py-1 shadow-[0_12px_32px_#0f172a17] z-50">
                {LANGUAGES_DATA.map((lg) => (
                  <button
                    key={lg.name}
                    onClick={(e) => {
                      e.stopPropagation();
                      setLanguage(lg.name);
                      setLangOpen(false);
                    }}
                    className="flex items-center gap-2 w-full text-left px-3 py-1.5 text-sm bg-transparent border-none cursor-pointer font-sans"
                    style={{
                      color: lg.name === language ? "#f33b27" : "#0f172a",
                      fontWeight: lg.name === language ? 700 : 500,
                    }}
                  >
                    <FlagBadge name={lg.name} flag={lg.flag} width={20} height={15} />
                    <span>{lg.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setCountryOpen((v) => !v);
                setLangOpen(false);
              }}
              className="flex items-center gap-1.5 border-none bg-transparent rounded-full px-2.5 py-1 text-xs text-slate-600 cursor-pointer font-sans"
            >
              <FiMapPin size={13} />
              <FlagBadge name={country} flag={currentCountryFlag.flag} />
              <span>{country}</span>
              <FiChevronDown size={11} />
            </button>
            {countryOpen && (
              <div className="absolute left-0 mt-1 w-[150px] rounded-xl border border-slate-200 bg-white py-1 shadow-[0_12px_32px_#0f172a17] z-50">
                {COUNTRIES_DATA.map((ct) => (
                  <button
                    key={ct.name}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCountry(ct.name);
                      setCountryOpen(false);
                    }}
                    className="flex items-center gap-2 w-full text-left px-3 py-1.5 text-sm bg-transparent border-none cursor-pointer font-sans"
                    style={{
                      color: ct.name === country ? "#f33b27" : "#0f172a",
                      fontWeight: ct.name === country ? 700 : 500,
                    }}
                  >
                    <FlagBadge name={ct.name} flag={ct.flag} width={20} height={15} />
                    <span>{ct.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          <a href="tel:+660254400001" className="flex items-center gap-1.5 text-xs text-slate-600 font-semibold">
            <FiPhone size={13} />
            +66-02-544-0001
          </a>
          <a href="#" className="text-xs font-bold px-1.5 py-1 text-[#872888]">About</a>
          <a href="#" className="text-xs font-bold px-1.5 py-1 text-[#872888]">Contact</a>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1 text-xs pl-2.5 pr-3.5 py-1 rounded-full border-[1.5px] border-[#f33b27] text-[#f33b27] bg-[#fff1ef] font-bold cursor-pointer transition-[transform,box-shadow,background,color] duration-150 hover:-translate-y-px hover:shadow-[0_4px_12px_#f33b2733] hover:bg-[#f33b27] hover:text-white">
            <FiShield size={12} />
            Become a Partner
          </button>
          <button className="flex items-center gap-1 text-xs pl-2.5 pr-3.5 py-1 rounded-full border-[1.5px] border-[#872888] text-[#872888] bg-[#f1dff1] font-bold cursor-pointer transition-[transform,box-shadow,background,color] duration-150 hover:-translate-y-px hover:shadow-[0_4px_12px_#87288833] hover:bg-[#872888] hover:text-white">
            <FiStar size={12} />
            Become a Member
          </button>
        </div>
      </div>
    </div>
  );
}
