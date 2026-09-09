"use client";

/**
 * Global search — a primary-outlined icon button (matches TopBar's
 * Partner/Member treatment so it doesn't blend into the navbar's own
 * brand-gradient background) that opens a `BRAND_DARK_PANEL` dropdown (same
 * portaled-popup pattern as Navbar's mega-menus). Results are
 * grouped by listings tab, live-filtered against `LISTINGS_TABS` with no
 * debounce (in-memory array, not a network call). Plain controlled `Input`
 * rather than react-hook-form/AppInput — this is a live-filter-as-you-type
 * widget with no validation/submission, same category as the `/listings`
 * page's own `SearchSortBar`.
 */

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Dropdown, Input, type InputRef } from "antd";
import { FiSearch, FiX } from "react-icons/fi";
import { BRAND_DARK_PANEL } from "@/app/_lib/theme";
import { hrefForTab, searchListingItems } from "@/app/_lib/listings-data";

const MIN_QUERY_LENGTH = 2;

function ResultsList({
  query,
  onNavigate,
}: {
  query: string;
  onNavigate: () => void;
}) {
  const groups = searchListingItems(query);
  const showResults = query.trim().length >= MIN_QUERY_LENGTH;

  if (!showResults) {
    return (
      <p className="px-2 py-3 text-sm text-white/60">
        Search packages, lab tests, doctors, vendors and more…
      </p>
    );
  }

  if (groups.length === 0) {
    return (
      <p className="px-2 py-3 text-sm text-white/60">
        No matches for &ldquo;{query}&rdquo;.
      </p>
    );
  }

  return (
    <div className="flex max-h-[60vh] flex-col gap-1 overflow-y-auto">
      {groups.map(({ tab, items }) => {
        const Icon = tab.icon;
        return (
          <div key={tab.id} className="py-1.5">
            <div className="flex items-center gap-1.5 px-2 pb-1.5 text-[11px] font-bold tracking-[0.12em] text-white/50 uppercase">
              <Icon size={12} />
              {tab.label}
            </div>
            {items.map((item) => (
              <Link
                key={item.id}
                href={`${hrefForTab(tab)}?q=${encodeURIComponent(query)}`}
                onClick={onNavigate}
                className="flex items-center justify-between gap-2 rounded-lg px-2 py-2 text-sm text-white/85! transition-colors duration-150 hover:bg-white/10 hover:text-white!"
              >
                <span>{item.title}</span>
                <span className="text-xs text-white/50">{item.category}</span>
              </Link>
            ))}
          </div>
        );
      })}
    </div>
  );
}

interface NavSearchProps {
  /** Matches the mobile menu/cart buttons' smaller h-9 sizing instead of desktop's h-9.5. */
  compact?: boolean;
}

export default function NavSearch({ compact }: NavSearchProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<InputRef>(null);

  // Not `autoFocus`: this popup is portaled to <body> by antd's Dropdown and
  // positioned asynchronously, so a native autofocus can fire before that
  // position settles — the browser then scrolls the still-unpositioned
  // element into view, which sometimes jumps the whole page to the top.
  // `preventScroll` removes that scroll outright, independent of timing.
  useEffect(() => {
    if (open) inputRef.current?.focus({ preventScroll: true });
  }, [open]);

  return (
    <Dropdown
      trigger={["click"]}
      open={open}
      placement="bottomRight"
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) setQuery("");
      }}
      popupRender={() => (
        <div
          className={`w-[min(320px,calc(100vw-2rem))] rounded-2xl p-2 sm:w-96 ${BRAND_DARK_PANEL}`}
          onClick={(e) => e.stopPropagation()}
        >
          <Input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Medex"
            prefix={<FiSearch size={15} className="text-white/50" />}
            suffix={
              query && (
                <FiX
                  size={15}
                  className="cursor-pointer text-white/50 hover:text-white"
                  onClick={() => setQuery("")}
                />
              )
            }
            className="border-white/15! bg-white/10! text-white! [&_input]:text-white! [&_input::placeholder]:text-white/50!"
          />
          <div className="mt-1 border-t border-white/10 pt-1">
            <ResultsList query={query} onNavigate={() => setOpen(false)} />
          </div>
        </div>
      )}
    >
      <button
        type="button"
        aria-label="Search"
        className={`flex cursor-pointer items-center justify-center rounded-full border-2 border-primary bg-primary/15 transition-colors duration-150 hover:bg-primary/25 ${
          compact ? "h-9 w-9" : "h-9.5 w-9.5"
        }`}
      >
        <FiSearch size={compact ? 16 : 17} className="text-white" />
      </button>
    </Dropdown>
  );
}
