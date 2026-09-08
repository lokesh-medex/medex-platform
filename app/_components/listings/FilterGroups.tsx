import { Checkbox, Slider } from "antd";
import {
  categoriesOf,
  type ListingsTab,
  type TabFilterState,
} from "@/app/_lib/listings-data";

interface FilterGroupsProps {
  tab: ListingsTab;
  filters: TabFilterState;
  onToggleCategory: (category: string) => void;
  onMaxPriceChange: (value: number) => void;
}

/**
 * The two filter groups (category checkboxes, price range) shared between
 * the desktop {@link FilterSidebar} and the mobile filter drawer, so both
 * stay in sync with one implementation.
 */
export default function FilterGroups({
  tab,
  filters,
  onToggleCategory,
  onMaxPriceChange,
}: FilterGroupsProps) {
  const categories = categoriesOf(tab.items);

  return (
    <>
      <div className="border-t border-slate-200 pt-4">
        <h4 className="font-sans text-slate-900 font-bold text-sm m-0 mb-3">
          Category
        </h4>
        <div className="flex flex-col gap-2.5">
          {categories.map((cat) => (
            <Checkbox
              key={cat}
              checked={filters.categories.includes(cat)}
              onChange={() => onToggleCategory(cat)}
              className="text-[13.5px]! text-slate-700!"
            >
              {cat}
            </Checkbox>
          ))}
        </div>
      </div>

      {tab.hasPrice && (
        <div className="border-t border-slate-200 pt-4">
          <h4 className="font-sans text-slate-900 font-bold text-sm m-0 mb-3">
            Price
          </h4>
          <Slider
            min={0}
            max={tab.maxPriceDefault}
            step={tab.priceStep}
            value={filters.maxPrice}
            onChange={(value) => onMaxPriceChange(value as number)}
            className="w-full"
          />
          <div className="flex items-center justify-between text-[12.5px] text-slate-500 mt-1.5">
            <span>NPR 0</span>
            <span className="font-bold text-slate-900">
              Up to NPR {filters.maxPrice.toLocaleString()}
            </span>
          </div>
        </div>
      )}
    </>
  );
}
