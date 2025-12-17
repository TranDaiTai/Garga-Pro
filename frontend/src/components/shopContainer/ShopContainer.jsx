import { useState, useMemo, useEffect } from "react";
import { ShoppingCart, Search, Star, ChevronDown } from "lucide-react";
import "./index.css";
import { FilterSidebar } from "../common/FilterSidebar";
import { SortBar } from "../common/SortBar";
import ProductCard from "@/components/common/ProductCard";
import Pagination from "../common/Pagination";

export default function ShopContainer({
  SAMPLE_PRODUCTS = [],
  CATEGORIES = [],
  PRICE_RANGES = [],
  RATINGS = [],
  SORT_OPTIONS = [],
  PRICE_SORT_OPTIONS = [],
}) {
  const ITEMS_PER_PAGE = 8;

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("relevant");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [hasDiscount, setHasDiscount] = useState(false);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [currentPage]);

  const filteredAndSortedProducts = useMemo(() => {
    if (!Array.isArray(SAMPLE_PRODUCTS)) return [];
    if (!SAMPLE_PRODUCTS.length) {
      return (
        <div className="flex justify-center py-20">Đang tải sản phẩm...</div>
      );
    }

    let filtered = SAMPLE_PRODUCTS.filter((product) => {
      const matchesSearch =
        product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category);

      const matchesPrice =
        selectedPriceRanges.length === 0 ||
        selectedPriceRanges.some((rangeIdx) => {
          const range = PRICE_RANGES[rangeIdx];
          if (!range) return false;
          return product.price >= range.min && product.price <= range.max;
        });

      const matchesRating =
        selectedRatings.length === 0 ||
        selectedRatings.some((ratingIdx) => {
          const rating = RATINGS[ratingIdx];
          if (!rating) return false;
          return product.rating >= rating.min;
        });

      const matchesDiscount =
        !hasDiscount || product.originalPrice > product.price;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesPrice &&
        matchesRating &&
        matchesDiscount
      );
    });

    switch (sortBy) {
      case "newest":
        filtered = [...filtered].sort((a, b) => b.id - a.id);
        break;
      case "best-selling":
        filtered = [...filtered].sort((a, b) => b.sold - a.sold);
        break;
      case "price-low":
        filtered = [...filtered].sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered = [...filtered].sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    return filtered;
  }, [
    SAMPLE_PRODUCTS,
    searchTerm,
    sortBy,
    selectedCategories,
    selectedPriceRanges,
    selectedRatings,
    hasDiscount,
    PRICE_RANGES,
    RATINGS,
  ]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredAndSortedProducts.length / ITEMS_PER_PAGE)
  );

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProducts = filteredAndSortedProducts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handlePageChange = (page) => {
    setCurrentPage(Math.min(Math.max(1, page), totalPages));
  };

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
    setCurrentPage(1);
  };

  const togglePriceRange = (index) => {
    setSelectedPriceRanges((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
    setCurrentPage(1);
  };

  const toggleRating = (index) => {
    setSelectedRatings((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
    setCurrentPage(1);
  };

  return (
    <div className="products__container">
      <div className="flex gap-6">
        {/* Sidebar Filters */}
        <FilterSidebar
          selectedCategories={selectedCategories}
          selectedPriceRanges={selectedPriceRanges}
          selectedRatings={selectedRatings}
          hasDiscount={hasDiscount}
          onToggleCategory={toggleCategory}
          onTogglePriceRange={togglePriceRange}
          onToggleRating={toggleRating}
          onToggleDiscount={setHasDiscount}
          CATEGORIES={CATEGORIES}
          RATINGS={RATINGS}
          PRICE_RANGES={PRICE_RANGES}
        />

        {/* Main Content */}
        <div className="flex-1">
          <SortBar
            searchTerm={searchTerm}
            onSearchChange={(term) => {
              setSearchTerm(term);
            }}
            sortBy={sortBy}
            onSortChange={setSortBy}
            SORT_OPTIONS={SORT_OPTIONS}
            PRICE_SORT_OPTIONS={PRICE_SORT_OPTIONS}
          />
          {currentProducts.length > 0 ? (
            <>
              <div className="grid xl:grid-cols-4 lg:grid-cols-3  gap-4 mb-8">
                {currentProducts.map((product) => {
                  return <ProductCard key={product.id} product={product} />;
                })}
              </div>

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
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
