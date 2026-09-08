"use client";

import { useState } from "react";
import { Button, Dropdown } from "antd";
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

  const currentLangFlag =
    LANGUAGES_DATA.find((l) => l.name === language) ?? LANGUAGES_DATA[0];
  const currentCountryFlag =
    COUNTRIES_DATA.find((c) => c.name === country) ?? COUNTRIES_DATA[0];

  const triggerClassName = `flex! items-center! gap-1.5! h-auto! rounded-full! px-2.5! py-1! text-xs! font-sans ${
    invert ? "text-white/90!" : "text-slate-600!"
  }`;

  return (
    <div className="flex items-center gap-1 flex-wrap">
      <Dropdown
        trigger={["hover"]}
        open={langOpen}
        onOpenChange={(next) => {
          setLangOpen(next);
          if (next) setCountryOpen(false);
        }}
        popupRender={() => (
          <div className="w-37.5 rounded-xl border border-slate-200 bg-white py-1 shadow-[0_12px_32px_#0f172a17]">
            {LANGUAGES_DATA.map((lg) => (
              <Button
                key={lg.name}
                type="text"
                block
                onClick={() => {
                  setLanguage(lg.name);
                  setLangOpen(false);
                }}
                className={`flex! items-center! justify-start! gap-2! h-auto! w-full! text-left! text-sm! py-1.5! px-3! rounded-none! font-sans ${
                  lg.name === language
                    ? "text-primary! font-bold!"
                    : "text-slate-900! font-medium!"
                }`}
              >
                <FlagBadge
                  name={lg.name}
                  flag={lg.flag}
                  width={20}
                  height={15}
                />
                <span>{lg.name}</span>
              </Button>
            ))}
          </div>
        )}
      >
        <Button type="text" className={triggerClassName}>
          <FiGlobe size={13} />
          <FlagBadge name={language} flag={currentLangFlag.flag} />
          <span>{language}</span>
          <FiChevronDown size={11} />
        </Button>
      </Dropdown>
      <Dropdown
        trigger={["hover"]}
        open={countryOpen}
        onOpenChange={(next) => {
          setCountryOpen(next);
          if (next) setLangOpen(false);
        }}
        popupRender={() => (
          <div className="w-37.5 rounded-xl border border-slate-200 bg-white py-1 shadow-[0_12px_32px_#0f172a17]">
            {COUNTRIES_DATA.map((ct) => (
              <Button
                key={ct.name}
                type="text"
                block
                onClick={() => {
                  setCountry(ct.name);
                  setCountryOpen(false);
                }}
                className={`flex! items-center! justify-start! gap-2! h-auto! w-full! text-left! text-sm! py-1.5! px-3! rounded-none! font-sans ${
                  ct.name === country
                    ? "text-primary! font-bold!"
                    : "text-slate-900! font-medium!"
                }`}
              >
                <FlagBadge
                  name={ct.name}
                  flag={ct.flag}
                  width={20}
                  height={15}
                />
                <span>{ct.name}</span>
              </Button>
            ))}
          </div>
        )}
      >
        <Button type="text" className={triggerClassName}>
          <FiMapPin size={13} />
          <FlagBadge name={country} flag={currentCountryFlag.flag} />
          <span>{country}</span>
          <FiChevronDown size={11} />
        </Button>
      </Dropdown>
    </div>
  );
}
