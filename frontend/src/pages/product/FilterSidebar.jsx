"use client"

import { ChevronDown } from "lucide-react"
import { CATEGORIES, PRICE_RANGES, RATINGS } from "@/lib/products-constants"
import { useState } from "react"


export function FilterSidebar({
  selectedCategories,
  selectedPriceRanges,
  selectedRatings,
  hasDiscount,
  onToggleCategory,
  onTogglePriceRange,
  onToggleRating,
  onToggleDiscount,
}) {
  const [expandedFilters, setExpandedFilters] = useState({
    category: true,
    price: true,
    rating: true,
    discount: true,
  })

  const toggleFilter = (filterName) => {
    setExpandedFilters((prev) => ({ ...prev, [filterName]: !prev[filterName] }))
  }

  return (
    <div className="w-56 flex-shrink-0">
      <div className="space-y-4">
        {/* Category Filter */}
        <div className="border border-border rounded-lg p-4">
          <button
            onClick={() => toggleFilter("category")}
            className="w-full flex items-center justify-between font-semibold text-foreground hover:text-accent transition-colors"
          >
            Danh mục
            <ChevronDown className={`w-4 h-4 transition-transform ${expandedFilters.category ? "rotate-180" : ""}`} />
          </button>
          {expandedFilters.category && (
            <div className="mt-3 space-y-2">
              {CATEGORIES.map((category) => (
                <label key={category} className="flex items-center gap-2 cursor-pointer text-sm">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={() => onToggleCategory(category)}
                    className="w-4 h-4 rounded border-border accent-accent"
                  />
                  <span className="text-foreground hover:text-accent transition-colors">{category}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Price Range Filter */}
        <div className="border border-border rounded-lg p-4">
          <button
            onClick={() => toggleFilter("price")}
            className="w-full flex items-center justify-between font-semibold text-foreground hover:text-accent transition-colors"
          >
            Khoảng giá
            <ChevronDown className={`w-4 h-4 transition-transform ${expandedFilters.price ? "rotate-180" : ""}`} />
          </button>
          {expandedFilters.price && (
            <div className="mt-3 space-y-2">
              {PRICE_RANGES.map((range, index) => (
                <label key={index} className="flex items-center gap-2 cursor-pointer text-sm">
                  <input
                    type="checkbox"
                    checked={selectedPriceRanges.includes(index)}
                    onChange={() => onTogglePriceRange(index)}
                    className="w-4 h-4 rounded border-border accent-accent"
                  />
                  <span className="text-foreground hover:text-accent transition-colors">{range.label}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Rating Filter */}
        <div className="border border-border rounded-lg p-4">
          <button
            onClick={() => toggleFilter("rating")}
            className="w-full flex items-center justify-between font-semibold text-foreground hover:text-accent transition-colors"
          >
            Đánh giá
            <ChevronDown className={`w-4 h-4 transition-transform ${expandedFilters.rating ? "rotate-180" : ""}`} />
          </button>
          {expandedFilters.rating && (
            <div className="mt-3 space-y-2">
              {RATINGS.map((rating, index) => (
                <label key={index} className="flex items-center gap-2 cursor-pointer text-sm">
                  <input
                    type="checkbox"
                    checked={selectedRatings.includes(index)}
                    onChange={() => onToggleRating(index)}
                    className="w-4 h-4 rounded border-border accent-accent"
                  />
                  <span className="text-foreground hover:text-accent transition-colors">{rating.label}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Discount Filter */}
        <div className="border border-border rounded-lg p-4">
          <label className="flex items-center gap-2 cursor-pointer font-semibold text-foreground">
            <input
              type="checkbox"
              checked={hasDiscount}
              onChange={(e) => onToggleDiscount(e.target.checked)}
              className="w-4 h-4 rounded border-border accent-accent"
            />
            <span className="hover:text-accent transition-colors">Có khuyến mãi</span>
          </label>
        </div>
      </div>
    </div>
  )
}
