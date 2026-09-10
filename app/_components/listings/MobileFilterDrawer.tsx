import { Drawer } from "antd";
import AppliedFilters from "@/app/_components/listings/AppliedFilters";
import FilterGroups from "@/app/_components/listings/FilterGroups";
import type { ListingsTab, TabFilterState } from "@/app/_lib/listings-data";

interface MobileFilterDrawerProps {
  open: boolean;
  tab: ListingsTab;
  filters: TabFilterState;
  onToggleCategory: (category: string) => void;
  onVendorsChange: (vendors: string[]) => void;
  onCategoriesChange: (categories: string[]) => void;
  onMaxPriceChange: (value: number) => void;
  onClear: () => void;
  onClose: () => void;
}

/** Slide-in filter panel for below the `dt` breakpoint, where {@link FilterSidebar} is hidden. */
export default function MobileFilterDrawer({
  open,
  tab,
  filters,
  onToggleCategory,
  onVendorsChange,
  onCategoriesChange,
  onMaxPriceChange,
  onClear,
  onClose,
}: MobileFilterDrawerProps) {
  return (
    <Drawer
      open={open}
      onClose={onClose}
      placement="right"
      size="min(320px, 88vw)"
      title={
        <span className="font-heading text-slate-900 font-bold text-lg">
          Filters
        </span>
      }
      className="dt:hidden!"
      styles={{
        section: {
          background: "rgba(255,255,255,0.6)",
          backdropFilter: "blur(24px)",
          border: "1px solid rgba(255,255,255,0.7)",
          boxShadow:
            "0 1px 2px rgba(15,23,42,0.04), 0 8px 24px rgba(15,23,42,0.06)",
        },
      }}
    >
      <div className="flex flex-col gap-4">
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
      </div>
    </Drawer>
  );
}
