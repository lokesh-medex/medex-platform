import { Button } from "antd";
import FilterGroups from "@/app/_components/listings/FilterGroups";
import type { ListingsTab, TabFilterState } from "@/app/_lib/listings-data";
import { glass } from "@/app/_lib/glass";

interface FilterSidebarProps {
  tab: ListingsTab;
  filters: TabFilterState;
  onToggleCategory: (category: string) => void;
  onMaxPriceChange: (value: number) => void;
  onClear: () => void;
}

/** Desktop-only sticky filter panel alongside the results grid. */
export default function FilterSidebar({
  tab,
  filters,
  onToggleCategory,
  onMaxPriceChange,
  onClear,
}: FilterSidebarProps) {
  return (
    <aside
      className={`hidden dt:flex w-68 shrink-0 sticky top-28 max-h-[calc(100vh-132px)] flex-col gap-5 overflow-y-auto rounded-[18px] p-5 ${glass.subtle}`}
    >
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-slate-900 font-bold text-lg m-0">
          Filters
        </h3>
        <Button
          type="text"
          onClick={onClear}
          className="font-sans! text-primary! font-bold! text-[13px]! h-auto! p-0!"
        >
          Clear all
        </Button>
      </div>
      <FilterGroups
        tab={tab}
        filters={filters}
        onToggleCategory={onToggleCategory}
        onMaxPriceChange={onMaxPriceChange}
      />
    </aside>
  );
}
