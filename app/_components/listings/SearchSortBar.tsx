import { Input, Select } from "antd";
import { FiSearch } from "react-icons/fi";
import type { SortOption, SortValue } from "@/app/_lib/listings-data";

interface SearchSortBarProps {
  resultCount: number;
  search: string;
  onSearchChange: (value: string) => void;
  sort: SortValue;
  onSortChange: (value: SortValue) => void;
  sortOptions: SortOption[];
}

/** Result count, in-list search, and sort — sits above the results grid. */
export default function SearchSortBar({
  resultCount,
  search,
  onSearchChange,
  sort,
  onSortChange,
  sortOptions,
}: SearchSortBarProps) {
  return (
    <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
      <span className="font-sans text-slate-600 text-sm">
        <strong className="text-slate-900">{resultCount}</strong> results
      </span>
      <div className="flex items-center gap-2.5 flex-nowrap min-w-0">
        <Input
          size="large"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search within this list"
          prefix={<FiSearch size={15} className="text-slate-400" />}
          className="font-sans! text-[13.5px]! text-slate-900! border-[1.5px]! border-slate-200! rounded-full! bg-white! w-full min-w-0 flex-1"
        />
        <Select<SortValue>
          value={sort}
          onChange={onSortChange}
          options={sortOptions}
          popupMatchSelectWidth={false}
          className="font-sans text-[13.5px]! text-slate-900! shrink-0 [&_.ant-select-selector]:rounded-[10px]! [&_.ant-select-selector]:border-[1.5px]! [&_.ant-select-selector]:border-slate-200! [&_.ant-select-selector]:bg-white!"
        />
      </div>
    </div>
  );
}
