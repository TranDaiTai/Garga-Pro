"use client"

import { ChevronDown } from "lucide-react"
import { useState } from "react"



export function SortBar({ 
  searchTerm, 
  onSearchChange, 
  sortBy, 
  onSortChange ,
  SORT_OPTIONS,
  PRICE_SORT_OPTIONS}) {
  const [visiblePriceSort, setVisiblePriceSort] = useState(false)

  return (
    <div className="flex items-center gap-2 mb-6 pb-4 border-b border-border flex-wrap">
      <input
        type="text"
        placeholder="Tìm kiếm sản phẩm..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="flex-1 min-w-[200px] pl-4 pr-4 py-2 bg-background border border-border rounded-lg text-sm text-foreground placeholder-muted-foreground transition-colors hover:border-accent focus:border-accent focus:outline-none"
      />

      <span className="text-sm text-muted-foreground whitespace-nowrap">Sắp xếp theo</span>

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
                  onSortChange(option.value)
                  setVisiblePriceSort(false)
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
  )
}
