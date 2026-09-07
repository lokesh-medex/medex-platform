"use client";

import { useEffect, useRef, useState } from "react";
import { FiChevronDown, FiGlobe, FiMapPin } from "react-icons/fi";
import FlagBadge from "@/app/_components/shared/FlagBadge";
import { COUNTRIES_DATA, LANGUAGES_DATA } from "@/app/_lib/homepage-data";

interface LangCountrySwitcherProps {
  /** Use light trigger-button text for a dark host background (the purple mobile drawer). The flyout list itself is always a white card, so it stays legible either way. */
  invert?: boolean;
}

/**
 * Language + country pill switchers — shared by the desktop {@link TopBar}
 * strip and the mobile nav drawer so both stay in sync with one
 * implementation instead of duplicating the dropdown/outside-click logic.
 */
export default function LangCountrySwitcher({
  invert = false,
}: LangCountrySwitcherProps) {
  const [langOpen, setLangOpen] = useState(false);
  const [countryOpen, setCountryOpen] = useState(false);
  const [language, setLanguage] = useState("English");
  const [country, setCountry] = useState("Nepal");

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setLangOpen(false);
        setCountryOpen(false);
      }
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  const currentLangFlag =
    LANGUAGES_DATA.find((l) => l.name === language) ?? LANGUAGES_DATA[0];
  const currentCountryFlag =
    COUNTRIES_DATA.find((c) => c.name === country) ?? COUNTRIES_DATA[0];

  return (
    <div ref={ref} className="flex items-center gap-1 flex-wrap">
      <div className="relative">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setLangOpen((v) => !v);
            setCountryOpen(false);
          }}
          className={`flex items-center gap-1.5 border-none bg-transparent rounded-full px-2.5 py-1 text-xs cursor-pointer font-sans ${
            invert ? "text-white/90" : "text-slate-600"
          }`}
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
                className={`flex items-center gap-2 w-full text-left px-3 py-1.5 text-sm bg-transparent border-none cursor-pointer font-sans ${
                  lg.name === language
                    ? "text-primary font-bold"
                    : "text-slate-900 font-medium"
                }`}
              >
                <FlagBadge
                  name={lg.name}
                  flag={lg.flag}
                  width={20}
                  height={15}
                />
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
          className={`flex items-center gap-1.5 border-none bg-transparent rounded-full px-2.5 py-1 text-xs cursor-pointer font-sans ${
            invert ? "text-white/90" : "text-slate-600"
          }`}
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
                className={`flex items-center gap-2 w-full text-left px-3 py-1.5 text-sm bg-transparent border-none cursor-pointer font-sans ${
                  ct.name === country
                    ? "text-primary font-bold"
                    : "text-slate-900 font-medium"
                }`}
              >
                <FlagBadge
                  name={ct.name}
                  flag={ct.flag}
                  width={20}
                  height={15}
                />
                <span>{ct.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
