"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

export function FilterSidebar({
  selectedCategories,      // array string: ["Phụ tùng", "Dầu nhớt"]
  selectedPriceRanges,     // array object: [{ min: 0, max: 500000 }, ...]
  selectedRatings,         // array number: [5, 4]
  hasDiscount,
  onToggleCategory,        // truyền category.name (string)
  onTogglePriceRange,      // truyền range object { min, max, label }
  onToggleRating,          // truyền rating number
  onToggleDiscount,
  CATEGORIES = [],         // [{ id, name }]
  PRICE_RANGES = [],       // [{ label, min, max }]
  RATINGS = [],            // [5,4,3,2,1] hoặc [{ value: 5, label: "5 sao" }, ...]
}) {
  const [expandedFilters, setExpandedFilters] = useState({
    category: true,
    price: true,
    rating: true,
    discount: true,
  });

  const toggleFilter = (filterName) => {
    setExpandedFilters((prev) => ({
      ...prev,
      [filterName]: !prev[filterName],
    }));
  };

  // Helper: Kiểm tra price range đã chọn chưa (so sánh min + max)
  const isPriceRangeSelected = (range) => {
    return selectedPriceRanges.some(
      (r) => r.min === range.min && r.max === range.max
    );
  };

  // Helper: Kiểm tra rating đã chọn chưa
  const isRatingSelected = (ratingValue) => {
    return selectedRatings.includes(ratingValue);
  };

  return (
    <div className="w-64 flex-shrink-0">
      <div className="space-y-6">

        {/* Category Filter */}
        <div className="border border-border rounded-lg p-4 bg-card">
          <button
            onClick={() => toggleFilter("category")}
            className="w-full flex items-center justify-between font-semibold text-foreground hover:text-accent transition-colors"
          >
            Danh mục
            <ChevronDown
              className={`w-5 h-5 transition-transform duration-200 ${
                expandedFilters.category ? "rotate-180" : ""
              }`}
            />
          </button>

          {expandedFilters.category && (
            <div className="mt-4 space-y-3">
              {CATEGORIES.map((category) => (
                <label
                  key={category.id}
                  className="flex items-center gap-3 cursor-pointer text-sm text-foreground hover:text-accent transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category.name)}
                    onChange={() => onToggleCategory(category.name)}
                    className="w-4 h-4 rounded border-border text-accent focus:ring-accent"
                  />
                  <span>{category.name}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Price Range Filter */}
        <div className="border border-border rounded-lg p-4 bg-card">
          <button
            onClick={() => toggleFilter("price")}
            className="w-full flex items-center justify-between font-semibold text-foreground hover:text-accent transition-colors"
          >
            Khoảng giá
            <ChevronDown
              className={`w-5 h-5 transition-transform duration-200 ${
                expandedFilters.price ? "rotate-180" : ""
              }`}
            />
          </button>

          {expandedFilters.price && (
            <div className="mt-4 space-y-3">
              {PRICE_RANGES.map((range) => (
                <label
                  key={`${range.min}-${range.max}`} // key ổn định
                  className="flex items-center gap-3 cursor-pointer text-sm text-foreground hover:text-accent transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={isPriceRangeSelected(range)}
                    onChange={() => onTogglePriceRange(range)}
                    className="w-4 h-4 rounded border-border text-accent focus:ring-accent"
                  />
                  <span>{range.label}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Rating Filter */}
        <div className="border border-border rounded-lg p-4 bg-card">
          <button
            onClick={() => toggleFilter("rating")}
            className="w-full flex items-center justify-between font-semibold text-foreground hover:text-accent transition-colors"
          >
            Đánh giá
            <ChevronDown
              className={`w-5 h-5 transition-transform duration-200 ${
                expandedFilters.rating ? "rotate-180" : ""
              }`}
            />
          </button>

          {expandedFilters.rating && (
            <div className="mt-4 space-y-3">
              {RATINGS.map((rating) => {
                const value = typeof rating === "object" ? rating.value : rating;
                const label = typeof rating === "object" ? rating.label : `${rating} sao trở lên`;

                return (
                  <label
                    key={value}
                    className="flex items-center gap-3 cursor-pointer text-sm text-foreground hover:text-accent transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={isRatingSelected(value)}
                      onChange={() => onToggleRating(value)}
                      className="w-4 h-4 rounded border-border text-accent focus:ring-accent"
                    />
                    <span>{label}</span>
                  </label>
                );
              })}
            </div>
          )}
        </div>

        {/* Discount Filter */}
        <div className="border border-border rounded-lg p-4 bg-card">
          <label className="flex items-center gap-3 cursor-pointer font-semibold text-foreground hover:text-accent transition-colors">
            <input
              type="checkbox"
              checked={hasDiscount}
              onChange={(e) => onToggleDiscount(e.target.checked)}
              className="w-4 h-4 rounded border-border text-accent focus:ring-accent"
            />
            <span>Có khuyến mãi</span>
          </label>
        </div>
      </div>
    </div>
  );
}