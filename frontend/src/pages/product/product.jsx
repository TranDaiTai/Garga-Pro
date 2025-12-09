"use client"

import { useState, useMemo } from "react"
import { ShoppingCart, Search, Star, ChevronDown } from "lucide-react"
// import Navbar from "@/components/layout/Navbar/navbar"

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
  {
    id: 5,
    name: "Mâm xe ô tô 17 inch",
    category: "Mâm & Vành",
    price: 3500000,
    originalPrice: 3900000,
    rating: 4.5,
    reviews: 234,
    sold: 567,
    image: "/alloy-wheels-rim.jpg",
    description: "Mâm xe hợp kim nhẹ",
  },
  {
    id: 6,
    name: "Phanh đĩa trước Brembo",
    category: "Hệ thống phanh",
    price: 850000,
    originalPrice: 950000,
    rating: 4.9,
    reviews: 389,
    sold: 623,
    image: "/brake-disc-pads.jpg",
    description: "Phanh chính hãng an toàn",
  },
  {
    id: 7,
    name: "Gương chiếu hậu điều chỉnh điện",
    category: "Phụ kiện",
    price: 1100000,
    originalPrice: 1250000,
    rating: 4.4,
    reviews: 156,
    sold: 312,
    image: "/side-mirror-automotive.jpg",
    description: "Gương điều chỉnh điện",
  },
  {
    id: 8,
    name: "Bổ sung làm mát động cơ Castrol",
    category: "Dầu & Chất lỏng",
    price: 250000,
    originalPrice: 280000,
    rating: 4.7,
    reviews: 267,
    sold: 890,
    image: "/coolant.jpg",
    description: "Chất lỏng làm mát hiệu quả",
  },
  {
    id: 9,
    name: "Nệm xe ô tô 5D cao cấp",
    category: "Nội thất",
    price: 1800000,
    originalPrice: 2100000,
    rating: 4.8,
    reviews: 445,
    sold: 678,
    image: "/car-mat.jpg",
    description: "Nệm xe 5D chống nước",
  },
  {
    id: 10,
    name: "Dầu ga động cơ Pertamina",
    category: "Dầu & Chất lỏng",
    price: 180000,
    originalPrice: 200000,
    rating: 4.6,
    reviews: 198,
    sold: 1050,
    image: "/engine-oil.jpg",
    description: "Dầu ga chất lượng cao",
  },
]

const CATEGORIES = [
  "Dầu & Chất lỏng",
  "Lốp xe",
  "Lọc & Bộ lọc",
  "Điện & Pin",
  "Mâm & Vành",
  "Hệ thống phanh",
  "Phụ kiện",
  "Nội thất",
]
const PRICE_RANGES = [
  { label: "Dưới 500K", min: 0, max: 500000 },
  { label: "500K - 1M", min: 500000, max: 1000000 },
  { label: "1M - 2M", min: 1000000, max: 2000000 },
  { label: "2M - 3M", min: 2000000, max: 3000000 },
  { label: "Trên 3M", min: 3000000, max: Number.POSITIVE_INFINITY },
]
const RATINGS = [
  { label: "5 sao", min: 4.5 },
  { label: "4 sao trở lên", min: 4 },
  { label: "3 sao trở lên", min: 3 },
]

const ITEMS_PER_PAGE = 8

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("relevant")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([])
  const [selectedRatings, setSelectedRatings] = useState([])
  const [hasDiscount, setHasDiscount] = useState(false)
  const [expandedFilters, setExpandedFilters] = useState({
    category: true,
    price: true,
    rating: true,
    discount: true,
  })
  const [visibleSort,setvisibleSort] =useState(false)

  const filteredAndSortedProducts = useMemo(() => {
    const filtered = SAMPLE_PRODUCTS.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category)

      const matchesPrice =
        selectedPriceRanges.length === 0 ||
        selectedPriceRanges.some((rangeIdx) => {
          const range = PRICE_RANGES[rangeIdx]
          return product.price >= range.min && product.price <= range.max
        })

      const matchesRating =
        selectedRatings.length === 0 ||
        selectedRatings.some((ratingIdx) => {
          const rating = RATINGS[ratingIdx]
          return product.rating >= rating.min
        })

      const matchesDiscount = !hasDiscount || product.originalPrice > product.price

      return matchesSearch && matchesCategory && matchesPrice && matchesRating && matchesDiscount
    })

    if (sortBy === "newest") {
      filtered.sort((a, b) => b.id - a.id)
    } else if (sortBy === "best-selling") {
      filtered.sort((a, b) => b.sold - a.sold)
    } else if (sortBy === "price-low") {
      filtered.sort((a, b) => a.price - b.price)
    } else if (sortBy === "price-high") {
      filtered.sort((a, b) => b.price - a.price)
    }

    return filtered
  }, [searchTerm, sortBy, selectedCategories, selectedPriceRanges, selectedRatings, hasDiscount])

  const totalPages = Math.ceil(filteredAndSortedProducts.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentProducts = filteredAndSortedProducts.slice(startIndex, endIndex)

  const handlePageChange = (page) => {
    setCurrentPage(Math.min(Math.max(1, page), totalPages))
  }

  const getDiscount = (original, current) => {
    if (original <= current) return 0
    return Math.round(((original - current) / original) * 100)
  }

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
    setCurrentPage(1)
  }

  const togglePriceRange = (index) => {
    setSelectedPriceRanges((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
    setCurrentPage(1)
  }

  const toggleRating = (index) => {
    setSelectedRatings((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
    setCurrentPage(1)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* <Navbar /> */}

      <div className="products__header">
        <div className="products__container">
          <h1 className="products__title">Sản Phẩm</h1>
          <p className="products__subtitle">Khám phá bộ sưu tập phụ tùng và sản phẩm chăm sóc xe chất lượng cao</p>
        </div>
      </div>

      <div className="products__container">
        <div className="mb-6">
          <div className="relative flex-1 max-w-md">
           
          </div>
        </div>

        <div className="flex gap-6">
          {/* Sidebar Filters */}
          <div className="w-56 flex-shrink-0">
            <div className="space-y-4">
              {/* Category Filter */}
              <div className="border border-border rounded-lg p-4">
                <button
                  onClick={() => setExpandedFilters((prev) => ({ ...prev, category: !prev.category }))}
                  className="w-full flex items-center justify-between font-semibold text-foreground hover:text-accent transition-colors"
                >
                  Danh mục
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${expandedFilters.category ? "rotate-180" : ""}`}
                  />
                </button>
                {expandedFilters.category && (
                  <div className="mt-3 space-y-2">
                    {CATEGORIES.map((category) => (
                      <label key={category} className="flex items-center gap-2 cursor-pointer text-sm">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(category)}
                          onChange={() => toggleCategory(category)}
                          className="w-4 h-4 rounded border-border accent-accent"
                        />
                        <span className="text-foreground hover:text-accent transition-colors">{category}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Price Range Filter */}
              <div className="border border-border rounded-lg p-4">
                <button
                  onClick={() => setExpandedFilters((prev) => ({ ...prev, price: !prev.price }))}
                  className="w-full flex items-center justify-between font-semibold text-foreground hover:text-accent transition-colors"
                >
                  Khoảng giá
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${expandedFilters.price ? "rotate-180" : ""}`}
                  />
                </button>
                {expandedFilters.price && (
                  <div className="mt-3 space-y-2">
                    {PRICE_RANGES.map((range, index) => (
                      <label key={index} className="flex items-center gap-2 cursor-pointer text-sm">
                        <input
                          type="checkbox"
                          checked={selectedPriceRanges.includes(index)}
                          onChange={() => togglePriceRange(index)}
                          className="w-4 h-4 rounded border-border accent-accent"
                        />
                        <span className="text-foreground hover:text-accent transition-colors">{range.label}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Rating Filter */}
              <div className="border border-border rounded-lg p-4">
                <button
                  onClick={() => setExpandedFilters((prev) => ({ ...prev, rating: !prev.rating }))}
                  className="w-full flex items-center justify-between font-semibold text-foreground hover:text-accent transition-colors"
                >
                  Đánh giá
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${expandedFilters.rating ? "rotate-180" : ""}`}
                  />
                </button>
                {expandedFilters.rating && (
                  <div className="mt-3 space-y-2">
                    {RATINGS.map((rating, index) => (
                      <label key={index} className="flex items-center gap-2 cursor-pointer text-sm">
                        <input
                          type="checkbox"
                          checked={selectedRatings.includes(index)}
                          onChange={() => toggleRating(index)}
                          className="w-4 h-4 rounded border-border accent-accent"
                        />
                        <span className="text-foreground hover:text-accent transition-colors">{rating.label}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Discount Filter */}
              <div className="border border-border rounded-lg p-4">
                <label className="flex items-center gap-2 cursor-pointer font-semibold text-foreground">
                  <input
                    type="checkbox"
                    checked={hasDiscount}
                    onChange={() => {
                      setHasDiscount(!hasDiscount)
                      setCurrentPage(1)
                    }}
                    className="w-4 h-4 rounded border-border accent-accent"
                  />
                  <span className="hover:text-accent transition-colors">Có khuyến mãi</span>
                </label>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-border ">
                <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                value={searchTerm}
                onChange={(e) => {
                    setSearchTerm(e.target.value)
                    setCurrentPage(1)
                }}
                className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-sm text-foreground placeholder-muted-foreground transition-colors duration-200 hover:border-accent focus:border-accent focus:outline-none"
                />
              <span className="text-sm text-muted-foreground whitespace-nowrap">Sắp xếp theo</span>
              {[
                { value: "relevant", label: "Liên Quan" },
                { value: "newest", label: "Mới Nhất" },
                { value: "best-selling", label: "Bán Chạy" },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    setSortBy(option.value)
                    setCurrentPage(1)
                  }}
                  className={`px-4 py-2 rounded transition-all whitespace-nowrap text-sm font-medium ${
                    sortBy === option.value
                      ? "bg-accent text-accent-foreground"
                      : "bg-secondary text-foreground hover:bg-secondary/80"
                  }`}
                >
                  {option.label}
                </button>
              ))}

              <div className="ml-auto relative group">
                <button className="px-4 py-2 rounded border border-border bg-background text-foreground hover:border-accent transition-all text-sm font-medium flex items-center gap-2 min-w-fit"
                onClick={(e)=> {
                  setvisibleSort(!visibleSort)
                }}>
                  Giá
                  <ChevronDown className="w-4 h-4" />
                </button>

                {/* Hover buffer – miếng đệm chống mất hover */}
                <div className="absolute left-0 right-0 top-full h-3 group-hover:block"></div>


                { visibleSort && <div className="absolute right-0 mt-1 bg-background border border-border rounded shadow-lg z-10 hidden group-hover:block ">
                  <button
                    onClick={() => {
                      setSortBy("price-low")
                      setCurrentPage(1)
                    }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-secondary transition-colors ${
                      sortBy === "price-low" ? "bg-accent/20 text-accent" : "text-foreground"
                    }`}
                  >
                    Tăng dần
                  </button>
                  <button
                    onClick={() => {
                      setSortBy("price-high")
                      setCurrentPage(1)
                    }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-secondary transition-colors ${
                      sortBy === "price-high" ? "bg-accent/20 text-accent" : "text-foreground"
                    }`}
                  >
                    Giảm dần
                  </button>
                </div> }
              </div>
            </div>

            {currentProducts.length > 0 ? (
              <>
                <div className="grid xl:grid-cols-4 lg:grid-cols-3  gap-4 mb-8">
                  {currentProducts.map((product) => {
                    const discount = getDiscount(product.originalPrice, product.price)
                    return (
                      <div key={product.id} className="products__card group">
                        <div className="relative overflow-hidden bg-secondary rounded-lg mb-3">
                          
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>

                        <div className="space-y-2 px-2">
                          <p className="text-xs text-muted-foreground line-clamp-1">{product.category}</p>
                          <h3 className="text-sm font-semibold text-foreground line-clamp-1 hover:text-accent transition-colors cursor-pointer">
                            {product.name}
                          </h3>

                          <div className="flex justify-between">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-3 h-3 ${
                                    i < Math.floor(product.rating) ? "fill-accent text-accent" : "text-muted-foreground"
                                  }`}
                                />
                              ))}
                                <span className="text-xs text-muted-foreground">({product.reviews})</span>

                            </div>
                            <p className="text-xs text-muted-foreground ml-auto">Đã bán: {Math.floor(product.sold / 100)}</p>

                          </div>


                          <div className="flex items-center justify-between gap-2 pt-2">
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-bold text-accent">
                                {product.price.toLocaleString("vi-VN").slice(0, -3)}K
                              </p>
                               {product.originalPrice > product.price && (
                                <p className="text-xs text-muted-foreground line-through">
                                  {product.originalPrice.toLocaleString("vi-VN").slice(0, -3)}K
                                </p>
                              )}
                              {discount > 0 && (
                                <div className="  text-destructive px-2 py-1 rounded font-bold text-xs z-10">
                                -{discount}%
                                </div>
                              )}
                            </div>
                            {/* <button className="p-2 bg-secondary rounded hover:bg-accent hover:text-accent-foreground transition-colors">
                              <ShoppingCart className="w-4 h-4" />
                            </button> */}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {totalPages > 1 && (
                  <div className="flex flex-col items-center gap-4 pt-8 border-t border-border">
                    <div className="text-sm text-muted-foreground">
                      Trang {currentPage} / {totalPages} ({filteredAndSortedProducts.length} sản phẩm)
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-3 py-2 rounded border border-border text-foreground hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
                      >
                        Trước
                      </button>
                      {[...Array(totalPages)].map((_, i) => {
                        const pageNum = i + 1
                        const show = pageNum === 1 || pageNum === totalPages || Math.abs(pageNum - currentPage) <= 1
                        return show ? (
                          <button
                            key={pageNum}
                            onClick={() => handlePageChange(pageNum)}
                            className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
                              pageNum === currentPage
                                ? "bg-accent text-accent-foreground"
                                : "border border-border text-foreground hover:bg-secondary"
                            }`}
                          >
                            {pageNum}
                          </button>
                        ) : pageNum === 2 && currentPage > 3 ? (
                          <span key="dots-start" className="px-2">
                            ...
                          </span>
                        ) : pageNum === totalPages - 1 && currentPage < totalPages - 2 ? (
                          <span key="dots-end" className="px-2">
                            ...
                          </span>
                        ) : null
                      })}
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-3 py-2 rounded border border-border text-foreground hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
                      >
                        Sau
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <ShoppingCart className="w-12 h-12 text-muted-foreground mb-3" />
                <p className="text-foreground font-medium">Không tìm thấy sản phẩm phù hợp</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
