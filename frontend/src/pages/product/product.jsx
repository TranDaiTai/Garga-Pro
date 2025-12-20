import { useState, useEffect } from "react";
import { ShoppingCart } from "lucide-react"; // giữ các import cần
import ShopContainer from "@/components/shopContainer/ShopContainer";
import { productApi } from "@/api/product/product.services";

const CATEGORIES = []; // fill data thực tế, ví dụ: ['phone', 'laptop']
const PRICE_RANGES = []; // ví dụ: [{label: 'Dưới 1tr', min: 0, max: 1000000}, ...]
const RATINGS = []; // ví dụ: [1,2,3,4,5]
const ITEMS_PER_PAGE = 8 
const SORT_OPTIONS = [
  { value: "relevant", label: "Liên Quan" },
  { value: "newest", label: "Mới Nhất" },
  { value: "best-selling", label: "Bán Chạy" },
];
const PRICE_SORT_OPTIONS = [
  { value: "price-low", label: "Tăng dần" },
  { value: "price-high", label: "Giảm dần" },
];

export default function ProductsPage() {
  const [filters, setFilters] = useState({
    search: "",
    categories: [], // array string
    priceRanges: [], // array {min, max}
    ratings: [], // array number
    hasDiscount: false,
    sort: "relevant",
    page: 1,
  });

  const [productsData, setProductsData] = useState({
    data: [],
    pagination: { totalPages: 1, totalItems: 0, currentPage: 1 },
    loading: false,
    error: null,
  });

  useEffect(() => {
    const fetchProducts = async () => {
      setProductsData((prev) => ({ ...prev, loading: true, error: null }));

      try {
        const params = new URLSearchParams();
        params.append("page", filters.page);
        params.append("limit", ITEMS_PER_PAGE); // ITEMS_PER_PAGE của bạn

        if (filters.search) params.append("search", filters.search);

        filters.categories.forEach((cat) => params.append("category", cat));

        // Price ranges: giả sử chỉ hỗ trợ 1 range, nếu nhiều thì tổng hợp min/max
        if (filters.priceRanges.length > 0) {
          const min = Math.min(...filters.priceRanges.map((r) => r.min));
          const max = Math.max(...filters.priceRanges.map((r) => r.max));
          params.append("minPrice", min);
          params.append("maxPrice", max);
        }

        // Rating: lấy min rating từ selected
        if (filters.ratings.length > 0) {
          const minRating = Math.min(...filters.ratings);
          params.append("rating", minRating);
        }

        if (filters.hasDiscount) params.append("hasDiscount", "true");

        params.append("sort", filters.sort);

        const res = await productApi.getProducts(params.toString());
        // const res = await productApi.getProductAll();

        setProductsData({
          data: res.data.product,
          pagination: res.data.pagination,
          loading: false,
          error: null,
        });
      } catch (err) {
        setProductsData((prev) => ({
          ...prev,
          loading: false,
          error: "Lỗi tải dữ liệu",
        }));
      }
    };

    fetchProducts();
  }, [filters]);

  const handleFilterChange = (changes) => {
    setFilters((prev) => ({ ...prev, ...changes, page: 1 }));
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="products__header">
        <div className="products__container">
          <h1 className="products__title">Sản Phẩm</h1>
          <p className="products__subtitle">
            Khám phá bộ sưu tập phụ tùng và sản phẩm chăm sóc xe chất lượng cao
          </p>
        </div>
      </div>

      <ShopContainer
        products={productsData.data}
        pagination={productsData.pagination}
        loading={productsData.loading}
        error={productsData.error}
        filters={filters}
        onFilterChange={handleFilterChange}
        CATEGORIES={CATEGORIES}
        PRICE_RANGES={PRICE_RANGES}
        RATINGS={RATINGS}
        SORT_OPTIONS={SORT_OPTIONS}
        PRICE_SORT_OPTIONS={PRICE_SORT_OPTIONS}
      />
    </div>
  );
}
