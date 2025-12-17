// import "@/pages/product/index.css";

import { useState, useMemo, useEffect } from "react";
import { ShoppingCart, Search, Star, ChevronDown } from "lucide-react";

import ShopContainer from "@/components/shopContainer/ShopContainer";
// import { head } from "node_modules/axios/index.jsx";
// import axios from "axios";
import { productApi } from "@/api/product/product.services";

const CATEGORIES = [];
const PRICE_RANGES = [];
const RATINGS = [];

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
  const [products, setProducts] = useState(null);

  useEffect( () => {
    const fetchProducts = async () => {
      const res = await productApi.getProductAll();
      setProducts(res.data);
    };

    fetchProducts()
    // console.log(ddsd);  

  }, []);

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* <Navbar /> */}
      <div className="products__header">
        <div className="products__container">
          <h1 className="products__title">Sản Phẩm</h1>
          <p className="products__subtitle">
            Khám phá bộ sưu tập phụ tùng và sản phẩm chăm sóc xe chất lượng cao
          </p>
        </div>
      </div>

      <ShopContainer
        SAMPLE_PRODUCTS={products}
        CATEGORIES={CATEGORIES}
        PRICE_RANGES={PRICE_RANGES}
        RATINGS={RATINGS}
        PRICE_SORT_OPTIONS={PRICE_SORT_OPTIONS}
        SORT_OPTIONS={SORT_OPTIONS}
      />
    </div>
  );
}
