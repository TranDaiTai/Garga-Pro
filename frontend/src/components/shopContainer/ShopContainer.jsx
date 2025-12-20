import { useState, useEffect } from "react"; // giữ import
import { ShoppingCart } from "lucide-react";
import "./index.css";
import { FilterSidebar } from "../common/FilterSidebar";
import { SortBar } from "../common/SortBar";
import ProductCard from "@/components/common/ProductCard";
import Pagination from "../common/Pagination";

export default function ShopContainer({
  products = [],
  pagination = { totalPages: 1 },
  loading = false,
  error = null,
  filters,
  onFilterChange,
  CATEGORIES = [],
  PRICE_RANGES = [],
  RATINGS = [],
  SORT_OPTIONS = [],
  PRICE_SORT_OPTIONS = [],
}) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [filters.page]);

  const toggleCategory = (category) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category];
    onFilterChange({ categories: newCategories });
  };

  const togglePriceRange = (range) => { // range = {min, max}
    const newRanges = filters.priceRanges.some(r => r.min === range.min && r.max === range.max)
      ? filters.priceRanges.filter(r => !(r.min === range.min && r.max === range.max))
      : [...filters.priceRanges, range];
    onFilterChange({ priceRanges: newRanges });
  };

  const toggleRating = (rating) => {
    const newRatings = filters.ratings.includes(rating)
      ? filters.ratings.filter((r) => r !== rating)
      : [...filters.ratings, rating];
    onFilterChange({ ratings: newRatings });
  };

  const toggleDiscount = (checked) => {
    onFilterChange({ hasDiscount: checked });
  };

  const handleSearchChange = (term) => {
    onFilterChange({ search: term });
  };

  const handleSortChange = (sort) => {
    onFilterChange({ sort });
  };

  const handlePageChange = (page) => {
    onFilterChange({ page });
  };

  if (error) return <div>{error}</div>;

  return (
    <div className="products__container">
      <div className="flex gap-6">
        {/* Sidebar Filters */}
        <FilterSidebar
          selectedCategories={filters.categories}
          selectedPriceRanges={filters.priceRanges} // array objects
          selectedRatings={filters.ratings}
          hasDiscount={filters.hasDiscount}
          onToggleCategory={toggleCategory}
          onTogglePriceRange={togglePriceRange}
          onToggleRating={toggleRating}
          onToggleDiscount={toggleDiscount}
          CATEGORIES={CATEGORIES}
          RATINGS={RATINGS}
          PRICE_RANGES={PRICE_RANGES}
        />

        {/* Main Content */}
        <div className="flex-1">
          <SortBar
            searchTerm={filters.search}
            onSearchChange={handleSearchChange}
            sortBy={filters.sort}
            onSortChange={handleSortChange}
            SORT_OPTIONS={SORT_OPTIONS}
            PRICE_SORT_OPTIONS={PRICE_SORT_OPTIONS}
          />

          {loading ? (
            <div>Đang tải...</div>
          ) : products.length > 0 ? (
            <>
              <div className="grid xl:grid-cols-4 lg:grid-cols-3 gap-4 mb-8">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              <Pagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                onPageChange={handlePageChange}
              />
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-12">
              <ShoppingCart className="w-12 h-12 text-muted-foreground mb-3" />
              <p className="text-foreground font-medium">
                Không tìm thấy sản phẩm phù hợp
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}