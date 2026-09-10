import { Button, Tag } from "antd";
import type { ListingsTab, TabFilterState } from "@/app/_lib/listings-data";

interface AppliedFiltersProps {
  tab: ListingsTab;
  filters: TabFilterState;
  onToggleCategory: (category: string) => void;
  onVendorsChange: (vendors: string[]) => void;
  onMaxPriceChange: (value: number) => void;
  onClear: () => void;
}

/**
 * Chip row for the filters currently applied (categories + vendors + price
 * cap), shared between the desktop {@link FilterSidebar} and the mobile
 * filter drawer so both stay in sync with one implementation. Renders
 * nothing when no filter is active.
 */
export default function AppliedFilters({
  tab,
  filters,
  onToggleCategory,
  onVendorsChange,
  onMaxPriceChange,
  onClear,
}: AppliedFiltersProps) {
  const hasPriceFilter = tab.hasPrice && filters.maxPrice < tab.maxPriceDefault;
  const hasAnyFilter =
    filters.categories.length > 0 ||
    filters.vendors.length > 0 ||
    hasPriceFilter;

  if (!hasAnyFilter) return null;

  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-center justify-between">
        <h4 className="font-sans text-slate-900 font-bold text-sm m-0">
          Applied Filters
        </h4>
        <Button
          type="text"
          onClick={onClear}
          className="font-sans! text-primary! font-bold! text-[13px]! h-auto! p-0!"
        >
          Clear all
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {filters.categories.map((cat) => (
          <Tag
            key={cat}
            closable
            onClose={(e) => {
              e.preventDefault();
              onToggleCategory(cat);
            }}
            className="m-0! rounded-full! border-slate-200! bg-white! px-2.5! py-1! font-sans text-[12.5px]! text-slate-700!"
          >
            {cat}
          </Tag>
        ))}
        {filters.vendors.map((vendor) => (
          <Tag
            key={vendor}
            closable
            onClose={(e) => {
              e.preventDefault();
              onVendorsChange(filters.vendors.filter((v) => v !== vendor));
            }}
            className="m-0! rounded-full! border-slate-200! bg-white! px-2.5! py-1! font-sans text-[12.5px]! text-slate-700!"
          >
            {vendor}
          </Tag>
        ))}
        {hasPriceFilter && (
          <Tag
            closable
            onClose={(e) => {
              e.preventDefault();
              onMaxPriceChange(tab.maxPriceDefault);
            }}
            className="m-0! rounded-full! border-slate-200! bg-white! px-2.5! py-1! font-sans text-[12.5px]! text-slate-700!"
          >
            Up to NPR {filters.maxPrice.toLocaleString()}
          </Tag>
        )}
      </div>
    </div>
  );
}
