import { Checkbox, Slider } from "antd";
import AppPaginatedSelect from "@/app/_components/form/AppPaginatedSelect";
import {
  categoriesOf,
  vendorNamesOf,
  type ListingsTab,
  type TabFilterState,
} from "@/app/_lib/listings-data";

interface FilterGroupsProps {
  tab: ListingsTab;
  filters: TabFilterState;
  onToggleCategory: (category: string) => void;
  onVendorsChange: (vendors: string[]) => void;
  onCategoriesChange: (categories: string[]) => void;
  onMaxPriceChange: (value: number) => void;
}

/**
 * The filter groups shared between the desktop {@link FilterSidebar} and the
 * mobile filter drawer, so both stay in sync with one implementation. The
 * "all" tab (merged across categories) swaps the category checkbox list for
 * Vendors/Services pickers; every other tab keeps the checkbox list. Price
 * range is shared by both.
 */
export default function FilterGroups({
  tab,
  filters,
  onToggleCategory,
  onVendorsChange,
  onCategoriesChange,
  onMaxPriceChange,
}: FilterGroupsProps) {
  const categories = categoriesOf(tab.items);

  return (
    <>
      {tab.id === "all" ? (
        <div className="border-t border-slate-200 pt-4 flex flex-col gap-4">
          <AppPaginatedSelect
            label="Vendors"
            mode="multiple"
            allowClear
            showSearch
            pageSize={5}
            value={filters.vendors}
            onChange={(vendors) => onVendorsChange(vendors as string[])}
            options={vendorNamesOf(tab.items).map((v) => ({
              label: v,
              value: v,
            }))}
          />
          <AppPaginatedSelect
            label="Services"
            mode="multiple"
            allowClear
            showSearch
            pageSize={6}
            value={filters.categories}
            onChange={(services) => onCategoriesChange(services as string[])}
            options={categories.map((cat) => ({ label: cat, value: cat }))}
          />
        </div>
      ) : (
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
      )}

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
