import { useState, useEffect } from "react";
import ShopContainer from "@/components/shopContainer/ShopContainer";
import { productApi } from "@/api/product/product.services";

const CATEGORIES = []; // fill data thực tế, ví dụ: ['phone', 'laptop']
const PRICE_RANGES = [
  { label: "Dưới 500.000đ", min: 0, max: 500000 },
  { label: "500.000đ - 1.000.000đ", min: 500000, max: 1000000 },
  { label: "1.000.000đ - 2.000.000đ", min: 1000000, max: 2000000 },
  { label: "2.000.000đ -5.000.000đ", min: 2000000, max: 5000000 },
  { label: "Trên 5.000.000đ", min: 5000000, max: Infinity }, // backend xử lý max = null hoặc rất lớn
];
const RATINGS = [
  { value: 5, label: "5 sao" },
  { value: 4, label: "4 sao trở lên" },
  { value: 3, label: "3 sao trở lên" },
  { value: 2, label: "2 sao trở lên" },
  { value: 1, label: "1 sao trở lên" },
];
const ITEMS_PER_PAGE = 8;
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
        // Trong useEffect fetchProducts
        if (filters.priceRanges.length > 0) {
          const selectedRanges = filters.priceRanges;

          // Tìm min nhỏ nhất
          const min = Math.min(...selectedRanges.map((r) => r.min));

          // Tìm max lớn nhất, nhưng nếu có range nào max = Infinity → KHÔNG gửi maxPrice
          const hasUnlimitedMax = selectedRanges.some(
            (r) => r.max === Infinity || r.max === null || r.max === undefined
          );

          params.append("minPrice", min);

          if (!hasUnlimitedMax) {
            const max = Math.max(...selectedRanges.map((r) => r.max));
            params.append("maxPrice", max);
          }
          // Nếu hasUnlimitedMax → chỉ gửi minPrice, backend hiểu là >= min
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
    setFilters((prev) => ({ ...prev, ...changes }));
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
