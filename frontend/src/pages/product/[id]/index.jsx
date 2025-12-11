// src/pages/product/ProductDetailPage.jsx
import { useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import { Star, ChevronLeft, ShoppingCart, Heart, ChevronRight } from "lucide-react"
import { useCart } from "@/context/CartContext"
import Pagination from "@/components/common/Pagination"
import ProductCard from "@/components/common/ProductCard"
import ReviewCard from "@/components/common/ReviewCard"
// Dữ liệu mẫu (bạn có thể tách ra file riêng sau)

// Sample products data - same as products page
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
    fullDescription:
      "Dầu động cơ Mobil 5W-30 là sản phẩm dầu động cơ chất lượng cao được sản xuất bởi Mobil. Sản phẩm này được thiết kế để cung cấp bảo vệ tối ưu cho động cơ của bạn, đặc biệt là trong các điều kiện nhiệt độ cực đoan.",
    features: ["Bảo vệ động cơ hiệu quả", "Giảm tiêu hao dầu", "Tăng tuổi thọ động cơ", "Khả năng làm sạch tốt"],
    specifications: {
      viscosity: "5W-30",
      type: "Synthetic Blend",
      volume: "1 lít",
      engineType: "Động cơ xăng, diesel",
    },
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
    fullDescription:
      "Lốp xe Bridgestone 205/65R15 là lựa chọn hàng đầu cho xe ô tô. Được thiết kế với công nghệ tiên tiến, lốp này cung cấp khả năng bám đường tuyệt vời và độ an toàn cao.",
    features: ["Bám đường tốt", "Độ bền cao", "Tiết kiệm nhiên liệu", "An toàn trong mọi điều kiện"],
    specifications: {
      size: "205/65R15",
      type: "Lốp xe hơi",
      loadRating: "91H",
      warranty: "3 năm",
    },
  },
]

const SAMPLE_REVIEWS= [
  {
    id: 1,
    author: "e*****a",
    rating: 5,
    date: "2025-06-10 17:18",
    location: "Malaysia",
    title: "Vải theo giá, thích hợp sử dụng",
    content:
      "Sản phẩm này thực sự rất tốt. Chất lượng vượt quá mong đợi của tôi. Giao hàng nhanh và đóng gói cẩn thận.",
    images: ["/product-review-1.png", "/product-review-2.jpg"],
    likes: 125,
  },
  {
    id: 2,
    author: "h*****m",
    rating: 5,
    date: "2025-06-08 09:45",
    location: "Ho Chi Minh",
    title: "Rất hài lòng với chất lượng",
    content: "Sản phẩm chất lượng cao, đúng như mô tả. Sẽ mua lại lần nữa.",
    images: [],
    likes: 89,
  },
  {
    id: 3,
    author: "n*****g",
    rating: 4,
    date: "2025-06-05 14:20",
    location: "Ha Noi",
    title: "Tốt nhưng cần cải thiện",
    content: "Sản phẩm chất lượng, nhưng giá hơi cao. Vẫn đáng mua.",
    images: [],
    likes: 52,
  },
]

// Helper: format tiền Việt Nam
const formatPrice = (price) => price.toLocaleString("vi-VN") + "₫"

export default function ProductDetailPage() {
  const { id } = useParams()                    // ← Đây mới là cách đúng!
  const navigate = useNavigate()
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [likedReviews, setLikedReviews] = useState([])
 const { addToCart } = useCart()
  const [showAddedNotification, setShowAddedNotification] = useState(false)

  // Tìm sản phẩm theo id (chuyển string → number)
  const product = SAMPLE_PRODUCTS.find(p => p.id === Number(id))

  // Nếu không tìm thấy sản phẩm
  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-foreground">Không tìm thấy sản phẩm</h1>
          <button
            onClick={() => navigate("/products")}
            className="text-accent hover:underline flex items-center gap-2 mx-auto"
          >
            <ChevronLeft className="w-5 h-5" />
            Quay lại danh sách
          </button>
        </div>
      </div>
    )
  }

  const discount = product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  const productImages = [
    product.image,
    "/product-detail-angle-1.jpg",
    "/product-detail-angle-2.jpg",
    "/product-detail-angle-3.jpg",
  ].filter(Boolean)

  const handleLikeReview = (reviewId) => {
    setLikedReviews(prev =>
      prev.includes(reviewId)
        ? prev.filter(id => id !== reviewId)
        : [...prev, reviewId]
    )
  }
  
  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: quantity,
        image: product.image,
      })
      setShowAddedNotification(true)
      setTimeout(() => setShowAddedNotification(false), 2000)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Nút quay lại */}
      <div className="bg-card border-b border-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="font-medium">Quay lại</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Ảnh sản phẩm */}
          <div className="space-y-4">
            <div className="bg-secondary rounded-xl p-8 h-96 flex items-center justify-center top-24">
              <img
                src={productImages[selectedImageIndex] || "/placeholder.svg"}
                alt={product.name}
                className="max-w-full max-h-full object-contain"
              />
            </div>

            {/* Thumbnail */}
            {productImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {productImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg border-2 transition-all ${
                      selectedImageIndex === idx ? "border-accent" : "border-border hover:border-accent/50"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover rounded-md" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Thông tin sản phẩm */}
          <div className="space-y-6">
            <div>
              <p className="text-sm text-accent font-bold uppercase tracking-wider">{product.category}</p>
              <h1 className="text-4xl font-bold text-foreground mt-2">{product.name}</h1>
            </div>

            <div className="flex items-center gap-4 text-sm">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? "fill-accent text-accent" : "text-muted"}`} />
                ))}
              </div>
              <span className="text-foreground font-medium">{product.rating} ({product.reviews} đánh giá)</span>
              <span className="text-muted-foreground">| Đã bán {product.sold}+</span>
            </div>

            {/* Giá */}
            <div className="border-y py-6 space-y-3">
              <div className="flex items-center gap-4">
                <span className="text-4xl font-bold text-accent">{formatPrice(product.price)}</span>
                {discount > 0 && (
                  <>
                    <span className="text-2xl text-muted-foreground line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                    <span className="bg-red-500 text-white px-3 py-1 rounded font-bold text-lg">
                      -{discount}%
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Số lượng & Mua hàng */}
            <div className="space-y-6">
              <div className="flex items-center gap-6">
                <span className="font-medium">Số lượng:</span>
                <div className="flex items-center border rounded-lg">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-2 hover:bg-secondary">−</button>
                  <input type="number" value={quantity} readOnly className="w-16 text-center bg-transparent" />
                  <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-2 hover:bg-secondary">+</button>
                </div>
              </div>

              <div className="flex gap-4">
                <button className="flex-1 bg-accent hover:bg-accent/90 text-white font-bold py-4 rounded-lg flex items-center justify-center gap-3 transition"
                 onClick={handleAddToCart}
                >
                  <ShoppingCart className="w-5 h-5" />
                  Thêm vào giỏ hàng
                </button>
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    isWishlisted
                      ? "border-red-500 text-red-500 bg-red-50"
                      : "border-border hover:border-accent"
                  }`}
                >
                  <Heart className={`w-6 h-6 ${isWishlisted ? "fill-current" : ""}`} />
                </button>
              </div>
                {/* Notification */}
              {showAddedNotification && (
                <div className="bg-green-100/50 text-green-700 px-4 py-2 rounded border border-green-200 text-sm font-medium">
                  ✓ Đã thêm vào giỏ hàng
                </div>
              )}
            </div>

            {/* Đặc điểm nổi bật */}
            <div>
              <h3 className="font-bold text-lg mb-3">Đặc điểm nổi bật</h3>
              <ul className="space-y-2">
                {product.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-muted-foreground">
                    <div className="w-2 h-2 bg-accent rounded-full" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Detailed Description */}
        <div className="border-t border-border pt-8 space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Chi tiết sản phẩm</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">{product.fullDescription}</p>
          </div>

          {/* Specifications */}
          <div>
            <h3 className="text-xl font-bold text-foreground mb-4">Thông số kỹ thuật</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="bg-secondary rounded-lg p-4">
                  <p className="text-sm text-muted-foreground capitalize mb-1">
                    {key.replace(/([A-Z])/g, " $1").trim()}
                  </p>
                  <p className="font-semibold text-foreground">{String(value)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className=" grid grid-cols-[65%_35%] border-t border-border pt-8 space-y-8">

          {/* Reviews Header */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">ĐÁNH GIÁ SẢN PHẨM</h2>

            {/* Rating Summary */}
            <div className="bg-card border border-border rounded-lg p-6 mb-6">
              <div className="flex items-start gap-6 mb-6">
                {/* Overall Rating */}
                <div className="flex flex-col items-center">
                  <div className="text-4xl font-bold text-accent mb-2">{product.rating}</div>
                  <div className="flex gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating) ? "fill-accent text-accent" : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">Tất cả</p>
                </div>

                {/* Rating Filters */}
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: "5 Sao (1)", value: 5 },
                    { label: "4 Sao (0)", value: 4 },
                    { label: "3 Sao (0)", value: 3 },
                    { label: "2 Sao (0)", value: 2 },
                    { label: "1 Sao (0)", value: 1 },
                    { label: "Có Hình Ảnh / Video (1)", value: "media" },
                    { label: "Có Bình Luận (1)", value: "comments" },
                  ].map((filter) => (
                    <button
                      key={filter.value}
                      className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                        filter.value === 5
                          ? "border-accent text-accent bg-accent/5"
                          : "border-border text-foreground hover:border-accent"
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Reviews List */}
            <div className="space-y-4">
              {SAMPLE_REVIEWS.map((review) => {
                return (
                <ReviewCard
                  review={review}
                  liked={likedReviews}
                  onLike={setLikedReviews}
                />
             ) })}
              
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={1}
              totalPages={2}
              onPageChange={null}
            />
          </div>
          <div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16 border-t border-border pt-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">Sản phẩm liên quan</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {SAMPLE_PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id)
              .slice(0, 4)
              .map((relatedProduct) => 
                {
                  <ProductCard
                  key={relatedProduct.id}
                  product={relatedProduct}
                  />
                }
              )}
          </div>
          <div className="flex justify-center mt-6">
            <button className="relative w-20 h-auto rounded-sm ">
              Xem thêm
            </button>
          </div>
        </div>
        {/* Phần còn lại (mô tả, thông số, đánh giá, sản phẩm liên quan) giữ nguyên logic, chỉ sửa Link → useNavigate hoặc <Link to> */}
        {/* ... (đoạn đánh giá, mô tả chi tiết, sản phẩm liên quan bạn có thể giữ nguyên, chỉ đổi href → to) */}
      </div>
    </div>
  )
}