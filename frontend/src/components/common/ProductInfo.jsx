import { Star, ShoppingCart, Heart, User } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "@/context/CartContext";


const ProductInfo = ({ product }) => {
  const [showAddedNotification, setShowAddedNotification] = useState(false);
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { user } = useAuth();

  // Helper: format tiền Việt Nam
  const formatPrice = (price) => price + "₫";

const navigate = useNavigate();
const location = useLocation();

const handleAddToCart = async () => {
  if (!user) {
    
    navigate(
      `/login?redirect=${encodeURIComponent(
        location.pathname + location.search
      )}`
    );
    return;
  }

  addItem(product,quantity);

  setShowAddedNotification(true);
  setTimeout(() => setShowAddedNotification(false), 2000);
};

  const discount =
    product.originalPrice > product.price
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) *
            100
        )
      : 0;
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-accent font-bold uppercase tracking-wider">
          {product.category?.name}
        </p>
        <h1 className="text-4xl font-bold text-foreground mt-2">
          {product.name}
        </h1>
      </div>

      <div className="flex items-center gap-4 text-sm">
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-5 h-5 ${
                i < Math.floor(product.rating)
                  ? "fill-accent text-accent"
                  : "text-muted"
              }`}
            />
          ))}
        </div>
        <span className="text-foreground font-medium">
          {product.rating} ({product.reviewsCount} đánh giá)
        </span>
        <span className="text-muted-foreground">| Đã bán {product.sold}+</span>
      </div>

      {/* Giá */}
      <div className="border-y py-6 space-y-3">
        <div className="flex items-center gap-4">
          <span className="text-4xl font-bold text-accent">
            {formatPrice(product.price)}
          </span>
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
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-4 py-2 hover:bg-secondary"
            >
              −
            </button>
            <input
              type="number"
              value={quantity}
              readOnly
              className="w-16 text-center bg-transparent"
            />
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-4 py-2 hover:bg-secondary"
            >
              +
            </button>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            className="flex-1 bg-accent hover:bg-accent/90 text-white font-bold py-4 rounded-lg flex items-center justify-center gap-3 transition"
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
            <Heart
              className={`w-6 h-6 ${isWishlisted ? "fill-current" : ""}`}
            />
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
          {product.features?.map((f, i) => (
            <li
              key={i}
              className="flex items-center gap-3 text-muted-foreground"
            >
              <div className="w-2 h-2 bg-accent rounded-full" />
              {f}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductInfo;
