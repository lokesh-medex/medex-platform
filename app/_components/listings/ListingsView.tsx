"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Badge, Button } from "antd";
import { FiSliders } from "react-icons/fi";
import FilterSidebar from "@/app/_components/listings/FilterSidebar";
import ListingCard from "@/app/_components/listings/ListingCard";
import MobileFilterDrawer from "@/app/_components/listings/MobileFilterDrawer";
import SearchSortBar from "@/app/_components/listings/SearchSortBar";
import TabPills from "@/app/_components/listings/TabPills";
import Mesh from "@/app/_components/home/Mesh";
import PageShell from "@/app/_components/shared/PageShell";
import BackdropMotifs from "@/app/_components/shared/BackdropMotifs";
import { Reveal } from "@/app/_components/shared/Motion";
import {
  getDetailCategoryByLabel,
  hrefForDetailCategory,
} from "@/app/_lib/detail-data";
import {
  LISTINGS_TABS,
  PAGE_SIZE,
  defaultFilterState,
  filterAndSortItems,
  sortOptionsFor,
  type ListingItem,
  type SortValue,
} from "@/app/_lib/listings-data";

interface ListingsViewProps {
  /**
   * Which tab is active, set by the route (/listings or /listings/[tab]) —
   * see app/listings/page.tsx and app/listings/[tab]/page.tsx. Filters and
   * pagination are only ever initialized once per mount, so the caller must
   * render this with `key={activeTabId}` — otherwise switching between two
   * tabs served by the same [tab]/page.tsx file re-renders this instance in
   * place instead of resetting it.
   */
  activeTabId: string;
}

export default function ListingsView({ activeTabId }: ListingsViewProps) {
  const tab =
    LISTINGS_TABS.find((t) => t.id === activeTabId) ?? LISTINGS_TABS[0];

  // Seeds the search box from `?q=` — set by NavSearch's result links (see
  // app/_components/home/NavSearch.tsx) — so following one lands pre-filtered.
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") ?? "";

  const [filters, setFilters] = useState(() => ({
    ...defaultFilterState(tab),
    search: initialQuery,
  }));
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  // Only labtests/packages/services/wellness have a detail page — it's one
  // static page per category, not per item, so every item in a tab shares
  // the same href. Vendors/doctors have no detail page to link to.
  const detailCategory = getDetailCategoryByLabel(tab.label);
  const detailHref = detailCategory
    ? hrefForDetailCategory(detailCategory)
    : undefined;

  const filtered = useMemo(
    () => filterAndSortItems(tab, filters),
    [tab, filters]
  );
  const visibleItems = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;
  const sortOptions = useMemo(() => sortOptionsFor(tab), [tab]);
  const activeFilterCount =
    filters.categories.length +
    (tab.hasPrice && filters.maxPrice < tab.maxPriceDefault ? 1 : 0);

  // Auto-load more results as the user nears the bottom of the page.
  useEffect(() => {
    const onScroll = () => {
      const nearBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 400;
      if (!nearBottom) return;
      setVisibleCount((current) =>
        Math.min(current + PAGE_SIZE, filtered.length)
      );
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [filtered.length]);

  const updateFilters = (updater: (f: typeof filters) => typeof filters) => {
    setFilters(updater);
    setVisibleCount(PAGE_SIZE);
  };

  const toggleCategory = (category: string) =>
    updateFilters((f) => ({
      ...f,
      categories: f.categories.includes(category)
        ? f.categories.filter((c) => c !== category)
        : [...f.categories, category],
    }));

  const setMaxPrice = (value: number) =>
    updateFilters((f) => ({ ...f, maxPrice: value }));

  const setSearch = (value: string) =>
    updateFilters((f) => ({ ...f, search: value }));

  const setSort = (value: SortValue) =>
    setFilters((f) => ({ ...f, sort: value }));

  const clearFilters = () => updateFilters(() => defaultFilterState(tab));

  // Every other linkable tab shares one detailHref per tab (one static
  // /detail/[category] page each); vendors need a distinct URL per card.
  const hrefFor = (item: ListingItem) =>
    tab.id === "vendors"
      ? item.slug
        ? `/vendor/${item.slug}`
        : undefined
      : detailHref;

  return (
    <PageShell showCart cartCount={cartCount} showFooter={false}>
      <div className="font-sans">
        <div className="relative overflow-hidden">
          <Mesh preset="listings" />
          <BackdropMotifs
            count={5}
            opacity={0.05}
            seed={42}
            zone="edges"
            minSize={110}
            maxSize={200}
          />
          <Reveal className="relative max-w-360 mx-auto px-5 dt:px-8 pt-8 pb-2">
            <h1 className="font-heading text-slate-900 font-bold text-[clamp(24px,3vw,32px)] tracking-[-0.02em] m-0 mb-5">
              Browse everything on the network
            </h1>
            <TabPills tabs={LISTINGS_TABS} activeTabId={tab.id} />
          </Reveal>
        </div>

        <div className="relative max-w-360 mx-auto px-5 dt:px-8 pt-7 pb-24 flex gap-8 items-start">
          {/*
            Not `overflow-hidden` — FilterSidebar below is `dt:sticky`, and
            wrapping a sticky ancestor in overflow-hidden breaks its sticky
            positioning. BackdropMotifs is safe here anyway: it's `absolute`
            (ignored by this flex row's sizing) and clips its own icons to
            its own box via its own internal `overflow-hidden`.
          */}
          <BackdropMotifs
            count={6}
            opacity={0.04}
            seed={19}
            zone="edges"
            minSize={120}
            maxSize={220}
          />
          <FilterSidebar
            tab={tab}
            filters={filters}
            onToggleCategory={toggleCategory}
            onMaxPriceChange={setMaxPrice}
            onClear={clearFilters}
          />

          <section className="flex-1 min-w-0">
            <Badge
              count={activeFilterCount}
              size="small"
              color="var(--color-secondary)"
              offset={[-8, 6]}
              className="dt:hidden! mb-5"
            >
              <Button
                onClick={() => setShowFilterDrawer(true)}
                className="flex! items-center! gap-2! h-auto! border-[1.5px]! border-slate-200! bg-white! px-4.5! py-2.5! font-sans font-bold! text-sm!"
              >
                <FiSliders size={16} />
                Filters
              </Button>
            </Badge>

            <SearchSortBar
              resultCount={filtered.length}
              search={filters.search}
              onSearchChange={setSearch}
              sort={filters.sort}
              onSortChange={setSort}
              sortOptions={sortOptions}
            />

            <Reveal className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-5">
              {visibleItems.map((item) => (
                <ListingCard
                  key={item.id}
                  item={item}
                  detailHref={hrefFor(item)}
                  onAddToCart={() => setCartCount((c) => c + 1)}
                />
              ))}
            </Reveal>

            {filtered.length === 0 && (
              <div className="text-center py-20 px-5 text-slate-500 font-sans">
                No results match your filters.
              </div>
            )}

            {filtered.length > 0 && (
              <div className="text-center pt-9 font-sans text-[13.5px] text-slate-400">
                {hasMore
                  ? "Loading more…"
                  : "You've reached the end of the list."}
              </div>
            )}
          </section>
        </div>

        <MobileFilterDrawer
          open={showFilterDrawer}
          tab={tab}
          filters={filters}
          onToggleCategory={toggleCategory}
          onMaxPriceChange={setMaxPrice}
          onClear={clearFilters}
          onClose={() => setShowFilterDrawer(false)}
        />
      </div>
    </PageShell>
  );
}
