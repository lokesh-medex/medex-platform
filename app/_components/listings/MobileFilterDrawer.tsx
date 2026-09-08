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
