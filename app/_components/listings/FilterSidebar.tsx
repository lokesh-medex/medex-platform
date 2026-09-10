import AppliedFilters from "@/app/_components/listings/AppliedFilters";
import FilterGroups from "@/app/_components/listings/FilterGroups";
import type { ListingsTab, TabFilterState } from "@/app/_lib/listings-data";
import { glass } from "@/app/_lib/glass";

interface FilterSidebarProps {
  tab: ListingsTab;
  filters: TabFilterState;
  onToggleCategory: (category: string) => void;
  onVendorsChange: (vendors: string[]) => void;
  onCategoriesChange: (categories: string[]) => void;
  onMaxPriceChange: (value: number) => void;
  onClear: () => void;
}

/** Desktop-only sticky filter panel alongside the results grid. */
export default function FilterSidebar({
  tab,
  filters,
  onToggleCategory,
  onVendorsChange,
  onCategoriesChange,
  onMaxPriceChange,
  onClear,
}: FilterSidebarProps) {
  return (
    <aside
      className={`hidden dt:flex w-68 shrink-0 sticky top-28 max-h-[calc(100vh-132px)] flex-col gap-5 overflow-y-auto rounded-[18px] p-5 ${glass.subtle}`}
    >
      <h3 className="font-heading text-slate-900 font-bold text-lg m-0">
        Filters
      </h3>
      <AppliedFilters
        tab={tab}
        filters={filters}
        onToggleCategory={onToggleCategory}
        onVendorsChange={onVendorsChange}
        onMaxPriceChange={onMaxPriceChange}
        onClear={onClear}
      />
      <FilterGroups
        tab={tab}
        filters={filters}
        onToggleCategory={onToggleCategory}
        onVendorsChange={onVendorsChange}
        onCategoriesChange={onCategoriesChange}
        onMaxPriceChange={onMaxPriceChange}
      />
    </aside>
  );
}
