import { Button, Drawer } from "antd";
import FilterGroups from "@/app/_components/listings/FilterGroups";
import type { ListingsTab, TabFilterState } from "@/app/_lib/listings-data";

interface MobileFilterDrawerProps {
  open: boolean;
  tab: ListingsTab;
  filters: TabFilterState;
  onToggleCategory: (category: string) => void;
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
    >
      <Button
        type="text"
        onClick={onClear}
        className="font-sans! text-primary! font-bold! text-[13px]! h-auto! p-0! mb-4"
      >
        Clear all
      </Button>
      <div className="flex flex-col gap-4">
        <FilterGroups
          tab={tab}
          filters={filters}
          onToggleCategory={onToggleCategory}
          onMaxPriceChange={onMaxPriceChange}
        />
      </div>
    </Drawer>
  );
}
