import { useEffect, useState } from "react";
import { ShoppingCart, Search } from "lucide-react";
import { FilterSidebar } from "../common/FilterSidebar";
import { SortBar } from "../common/SortBar";
import ProductCard from "@/components/common/ProductCard";
import Pagination from "../common/Pagination";
import './index.css'
export default function ShopContainer({
  products = [],
  pagination = { totalPages: 1, currentPage: 1 },
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
  // State riêng cho ô input tìm kiếm
  const [searchInput, setSearchInput] = useState(filters.search || "");

  // Đồng bộ lại input khi filters.search thay đổi (back/forward browser, refresh)
  useEffect(() => {
    setSearchInput(filters.search || "");
  }, [filters.search]);

  // Scroll lên đầu khi đổi trang
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [filters.page]);

  const updateFilter = (changes) => {
    onFilterChange({
      ...changes,
      page: changes.page ?? (changes.search !== undefined ? 1 : filters.page),
    });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const trimmed = searchInput.trim();
    if (trimmed !== filters.search) {
      updateFilter({ search: trimmed });
    }
  };

  // Các hàm toggle giữ nguyên
  const toggleCategory = (categoryName) => {
    const newCategories = filters.categories.includes(categoryName)
      ? filters.categories.filter((c) => c !== categoryName)
      : [...filters.categories, categoryName];
    updateFilter({ categories: newCategories });
  };

  const togglePriceRange = (range) => {
    const isSelected = filters.priceRanges.some((r) => r.min === range.min && r.max === range.max);
    const newRanges = isSelected
      ? filters.priceRanges.filter((r) => !(r.min === range.min && r.max === range.max))
      : [...filters.priceRanges, range];
    updateFilter({ priceRanges: newRanges });
  };

  const toggleRating = (rating) => {
    const newRatings = filters.ratings.includes(rating)
      ? filters.ratings.filter((r) => r !== rating)
      : [...filters.ratings, rating];
    updateFilter({ ratings: newRatings });
  };

  const toggleDiscount = (checked) => {
    updateFilter({ hasDiscount: checked });
  };

  const handleSortChange = (sort) => {
    updateFilter({ sort });
  };

  const handlePageChange = (page) => {
    onFilterChange({ page });
  };

  // if (error) {
  //   return <div className="text-center py-10 text-red-500">{error}</div>;
  // }

  return (
    <div className="products__container">
      <div className="flex gap-6">
        <FilterSidebar
          selectedCategories={filters.categories}
          selectedPriceRanges={filters.priceRanges}
          selectedRatings={filters.ratings}
          hasDiscount={filters.hasDiscount}
          onToggleCategory={toggleCategory}
          onTogglePriceRange={togglePriceRange}
          onToggleRating={toggleRating}
          onToggleDiscount={toggleDiscount}
          CATEGORIES={CATEGORIES}
          PRICE_RANGES={PRICE_RANGES}
          RATINGS={RATINGS}
        />

        <div className="flex-1">
          <SortBar
            searchInput={searchInput}
            onSearchInputChange={setSearchInput}
            onSearchSubmit={handleSearchSubmit}
            sortBy={filters.sort}
            onSortChange={handleSortChange}
            SORT_OPTIONS={SORT_OPTIONS}
            PRICE_SORT_OPTIONS={PRICE_SORT_OPTIONS}
          />

          {loading ? (
            <div className="text-center py-10">Đang tải sản phẩm...</div>
          ) : products.length > 0 ? (
            <>
              <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 gap-6 mb-8">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              <Pagination
                currentPage={pagination.currentPage || 1}
                totalPages={pagination.totalPages || 1}
                onPageChange={handlePageChange}
              />
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-20">
              <ShoppingCart className="w-20 h-20 text-muted-foreground mb-4" />
              <p className="text-xl text-foreground font-medium">
                Không tìm thấy sản phẩm phù hợp
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}