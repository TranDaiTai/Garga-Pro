// import "@/pages/product/index.css";


import { useState, useMemo ,useEffect} from "react"
import { ShoppingCart, Search, Star, ChevronDown } from "lucide-react"
// import Navbar from "@/components/layout/Navbar/navbar"
import { Link } from "react-router-dom";
import ShopContainer from "@/components/shopContainer/ShopContainer";

const SAMPLE_PRODUCTS = [
  {
    id: 1,
    name: "Dầu động cơ Mobil 5W-30",
    category: "Dầu & Chất lỏng",
    price: 350000,
    originalPrice: 380000,
    rating: 4.8,
    reviews: 245,
    sold: 1250,
    image: "/motor-oil-automotive.jpg",
    description: "Dầu động cơ chất lượng cao",
  },
  {
    id: 2,
    name: "Lốp xe Bridgestone 205/65R15",
    category: "Lốp xe",
    price: 1200000,
    originalPrice: 1200000,
    rating: 4.9,
    reviews: 523,
    sold: 890,
    image: "/tire-wheel-automotive.jpg",
    description: "Lốp xe độ bền cao",
  },
  {
    id: 3,
    name: "Bộ lọc không khí Bosch",
    category: "Lọc & Bộ lọc",
    price: 450000,
    originalPrice: 520000,
    rating: 4.7,
    reviews: 178,
    sold: 456,
    image: "/air-filter-engine.jpg",
    description: "Lọc không khí cao cấp",
  },
  {
    id: 4,
    name: "Pin xe ô tô DIN 60 Ah",
    category: "Điện & Pin",
    price: 2500000,
    originalPrice: 2800000,
    rating: 4.6,
    reviews: 412,
    sold: 734,
    image: "/car-battery.png",
    description: "Pin chất lượng khởi động mạnh",
  },
  
]


const CATEGORIES = [
  
]
const PRICE_RANGES = [
  
]
const RATINGS = [
 
]


 const SORT_OPTIONS = [
  { value: "relevant", label: "Liên Quan" },
  { value: "newest", label: "Mới Nhất" },
  { value: "best-selling", label: "Bán Chạy" },
]
 const PRICE_SORT_OPTIONS = [
  { value: "price-low", label: "Tăng dần" },
  { value: "price-high", label: "Giảm dần" },
]


const ITEMS_PER_PAGE = 8

export default function ProductsPage() {

 
  return (
   

    <div className="min-h-screen bg-background pb-20">
      {/* <Navbar /> */}
      <div className="products__header">
        <div className="products__container">
          <h1 className="products__title">Sản Phẩm</h1>
          <p className="products__subtitle">Khám phá bộ sưu tập phụ tùng và sản phẩm chăm sóc xe chất lượng cao</p>
        </div>
      </div>

     <ShopContainer
        SAMPLE_PRODUCTS={SAMPLE_PRODUCTS}
        CATEGORIES={CATEGORIES}
        PRICE_RANGES={PRICE_RANGES}
        RATINGS={RATINGS}
        PRICE_SORT_OPTIONS={PRICE_SORT_OPTIONS}
        SORT_OPTIONS={SORT_OPTIONS}
      />
    </div>
  )
}
