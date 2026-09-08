import Link from "next/link";
import { hrefForTab, type ListingsTab } from "@/app/_lib/listings-data";

interface TabPillsProps {
  tabs: ListingsTab[];
  activeTabId: string;
}

/**
 * Horizontal, scrollable row of pills switching between listing categories
 * (Lab Tests, Packages, ...). Each pill is a real link to that tab's own
 * /listings/<slug> URL, so the active tab always matches the current route.
 */
export default function TabPills({ tabs, activeTabId }: TabPillsProps) {
  return (
    <div className="flex gap-2.5 overflow-x-auto pb-1 flex-nowrap">
      {tabs.map((tab) => {
        const active = tab.id === activeTabId;
        const Icon = tab.icon;
        return (
          <Link
            key={tab.id}
            href={hrefForTab(tab)}
            className={`flex items-center gap-2 whitespace-nowrap rounded-full border-[1.5px] px-5 py-2.5 font-sans transition-colors duration-150 ${
              active
                ? "bg-secondary border-secondary"
                : "bg-white border-slate-200"
            }`}
          >
            <Icon
              size={16}
              className={active ? "text-white" : "text-secondary"}
            />
            <span
              className={`font-bold text-[14.5px] ${active ? "text-white" : "text-slate-900"}`}
            >
              {tab.label}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
