import { useEffect } from "react";
import { ShoppingCart } from "lucide-react";
import "./index.css";
import { FilterSidebar } from "../common/FilterSidebar";
import { SortBar } from "../common/SortBar";
import ProductCard from "@/components/common/ProductCard";
import Pagination from "../common/Pagination";

export default function ShopContainer({
  products = [],
  pagination = { totalPages: 1, currentPage: 1 },
  loading = false,
  error = null,
  filters,
  onFilterChange,
  CATEGORIES = [],      // [{ id, name }]
  PRICE_RANGES = [],    // [{ label, min, max }]
  RATINGS = [],         // [5,4,3,2,1]
  SORT_OPTIONS = [],
  PRICE_SORT_OPTIONS = [],
}) {
  // Scroll lên đầu khi đổi trang
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [filters.page]);

  // Helper: Reset page về 1 khi filter thay đổi (tránh page không tồn tại)
  const updateFilter = (changes) => {
    onFilterChange({
      ...changes,
      page: changes.page ?? 1, // nếu không phải đổi page → reset về 1
    });
  };

  // Toggle category (category giờ là string name)
  const toggleCategory = (categoryName) => {
    const newCategories = filters.categories.includes(categoryName)
      ? filters.categories.filter((c) => c !== categoryName)
      : [...filters.categories, categoryName];

    updateFilter({ categories: newCategories });
  };

  // Toggle price range (so sánh object đúng cách)
  const togglePriceRange = (range) => {
    const isSelected = filters.priceRanges.some(
      (r) => r.min === range.min && r.max === range.max
    );

    const newRanges = isSelected
      ? filters.priceRanges.filter((r) => !(r.min === range.min && r.max === range.max))
      : [...filters.priceRanges, range];

    updateFilter({ priceRanges: newRanges });
  };

  // Toggle rating
  const toggleRating = (rating) => {
    const newRatings = filters.ratings.includes(rating)
      ? filters.ratings.filter((r) => r !== rating)
      : [...filters.ratings, rating];

    updateFilter({ ratings: newRatings });
  };

  // Toggle discount
  const toggleDiscount = (checked) => {
    updateFilter({ hasDiscount: checked });
  };

  // Search & Sort
  const handleSearchChange = (term) => {
    updateFilter({ search: term });
  };

  const handleSortChange = (sort) => {
    updateFilter({ sort });
  };

  const handlePageChange = (page) => {
    onFilterChange({ page }); // chỉ đổi page → không reset
  };

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <div className="products__container">
      <div className="flex gap-6">
        {/* Sidebar Filters */}
        <FilterSidebar
          selectedCategories={filters.categories} // array string: ["Phụ tùng", "Dầu nhớt"]
          selectedPriceRanges={filters.priceRanges}
          selectedRatings={filters.ratings}
          hasDiscount={filters.hasDiscount}
          onToggleCategory={toggleCategory}
          onTogglePriceRange={togglePriceRange}
          onToggleRating={toggleRating}
          onToggleDiscount={toggleDiscount}
          CATEGORIES={CATEGORIES}       // truyền nguyên array object
          PRICE_RANGES={PRICE_RANGES}
          RATINGS={RATINGS}
        />

        {/* Main Content */}
        <div className="flex-1">
          <SortBar
            searchTerm={filters.search || ""}
            onSearchChange={handleSearchChange}
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