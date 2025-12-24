"use client";
import { ChevronDown, Search } from "lucide-react";
import { useState } from "react";

export function SortBar({
  searchInput,
  onSearchInputChange,
  onSearchSubmit,
  sortBy,
  onSortChange,
  SORT_OPTIONS,
  PRICE_SORT_OPTIONS,
}) {
  const [visiblePriceSort, setVisiblePriceSort] = useState(false);

  return (
    <div className="flex items-center gap-2 mb-6 pb-4 border-b border-border flex-wrap">
      {/* Form tìm kiếm */}
      <form onSubmit={onSearchSubmit} className="flex-1 min-w-[200px]">
        <div className="relative flex items-center pl-4 pr-4 py-2 bg-background border border-border rounded-lg">
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            value={searchInput}
            onChange={(e) => onSearchInputChange(e.target.value)}
            className="flex-1 text-sm text-foreground placeholder-muted-foreground bg-transparent focus:outline-none"
          />
          <button
            type="submit"
            className="ml-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Search size={20} />
          </button>
        </div>
      </form>

      <span className="text-sm text-muted-foreground whitespace-nowrap">
        Sắp xếp theo
      </span>

      {SORT_OPTIONS.map((option) => (
        <button
          key={option.value}
          onClick={() => onSortChange(option.value)}
          className={`px-4 py-2 rounded transition-all whitespace-nowrap text-sm font-medium hover:cursor-pointer ${
            sortBy === option.value
              ? "bg-accent text-accent-foreground"
              : "bg-secondary text-foreground hover:bg-secondary/80"
          }`}
        >
          {option.label}
        </button>
      ))}

      <div className="relative ml-auto">
        <button
          className="px-4 py-2 rounded border border-border bg-background text-foreground hover:border-accent transition-all text-sm font-medium flex items-center gap-2 whitespace-nowrap hover:cursor-pointer"
          onClick={() => setVisiblePriceSort(!visiblePriceSort)}
        >
          Giá
          <ChevronDown className="w-4 h-4" />
        </button>

        {visiblePriceSort && (
          <div className="absolute right-0 mt-2 bg-background border border-border rounded shadow-lg z-10">
            {PRICE_SORT_OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onSortChange(option.value);
                  setVisiblePriceSort(false);
                }}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-secondary transition-colors ${
                  sortBy === option.value ? "bg-accent/20 text-accent" : "text-foreground"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}