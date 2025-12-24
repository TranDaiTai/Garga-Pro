import { useState, useEffect } from "react";
import ShopContainer from "@/components/shopContainer/ShopContainer";
import { productApi } from "@/api/product/product.services";
import { useSearchParams } from "react-router-dom";

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
  const [searchParams,setSearchParams] = useSearchParams()
// Khởi tạo filters từ URL (query params) khi mount
  const initialFilters = {
    search: searchParams.get("search") || "",
    categories: searchParams.getAll("category"), // getAll vì có thể nhiều category
    priceRanges: [], // sẽ xử lý riêng
    ratings: searchParams.getAll("rating").map(Number), // array number
    hasDiscount: searchParams.get("hasDiscount") === "true",
    sort: searchParams.get("sort") || "relevant",
    page: Number(searchParams.get("page")) || 1,
  };

  // Xử lý priceRanges từ minPrice & maxPrice (nếu backend gửi)
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  if (minPrice) {
    // Tìm range khớp với min-max
    const selectedRange = PRICE_RANGES.find(
      (r) => r.min === Number(minPrice) && (r.max === Infinity || r.max === Number(maxPrice))
    );
    if (selectedRange) {
      initialFilters.priceRanges = [selectedRange];
    } else {
      // Nếu nhiều range hoặc không khớp, bạn có thể xử lý khác
      initialFilters.priceRanges = [];
    }
  }
  const [productsData, setProductsData] = useState({
    data: [],
    pagination: { totalPages: 1, totalItems: 0, currentPage: 1 },
    loading: false,
    error: null,
  });
  const [filters, setFilters] = useState(initialFilters);
// Đồng bộ filters → URL mỗi khi filters thay đổi
  useEffect(() => {
    const params = new URLSearchParams();

    params.set("page", filters.page);
    params.set("limit", ITEMS_PER_PAGE);

    if (filters.search) params.set("search", filters.search);
    filters.categories.forEach((cat) => params.append("category", cat));

    // Price ranges: chỉ hỗ trợ 1 range cho đơn giản (có thể mở rộng)
    if (filters.priceRanges.length > 0) {
      const range = filters.priceRanges[0];
      params.set("minPrice", range.min);
      if (range.max !== Infinity) {
        params.set("maxPrice", range.max);
      }
      // Nếu max = Infinity → không set maxPrice
    }

    if (filters.ratings.length > 0) {
      const minRating = Math.min(...filters.ratings);
      params.set("rating", minRating);
    }

    if (filters.hasDiscount) params.set("hasDiscount", "true");

    params.set("sort", filters.sort);

    // Cập nhật URL mà KHÔNG gây re-fetch (vì fetch dựa vào filters)
    setSearchParams(params, { replace: true }); // replace: true để không thêm history entry mới
  }, [filters]);

  // Fetch products khi filters thay đổi
  useEffect(() => {
    const fetchProducts = async () => {
      setProductsData((prev) => ({ ...prev, loading: true, error: null }));

      try {
        const params = new URLSearchParams();
        params.set("page", filters.page);
        params.set("limit", ITEMS_PER_PAGE);

        if (filters.search) params.set("search", filters.search);
        filters.categories.forEach((cat) => params.append("category", cat));

        if (filters.priceRanges.length > 0) {
          const range = filters.priceRanges[0];
          params.set("minPrice", range.min);
          if (range.max !== Infinity) {
            params.set("maxPrice", range.max);
          }
        }

        if (filters.ratings.length > 0) {
          params.set("rating", Math.min(...filters.ratings));
        }

        if (filters.hasDiscount) params.set("hasDiscount", "true");

        params.set("sort", filters.sort);

        const res = await productApi.getProducts(params.toString());

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
  }, [filters]); // Chỉ phụ thuộc filters

  const handleFilterChange = (changes) => {
    setFilters((prev) => {
      const newFilters = { ...prev, ...changes };

      // Reset page về 1 khi thay đổi filter (trừ khi chỉ thay đổi page)
      if (changes.categories || changes.priceRanges || changes.ratings || changes.hasDiscount || changes.search) {
        newFilters.page = 1;
      }

      return newFilters;
    });
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
