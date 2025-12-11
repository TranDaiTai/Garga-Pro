import { Link } from "react-router-dom";
import { Star } from "lucide-react";

export default function ProductCard({ product }) {
  const discount = getDiscount(product.originalPrice, product.price);

  return (
    <Link
      to={`/product/${product.id}`}
      className="products__card group block transform transition-all hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative overflow-hidden bg-secondary rounded-lg mb-3">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
        />

        {discount > 0 && (
          <div className="absolute top-2 left-2 bg-destructive text-white text-xs font-bold px-2 py-1 rounded">
            -{discount}%
          </div>
        )}
      </div>

      <div className="space-y-2 px-2 pb-4">
        <p className="text-xs text-muted-foreground line-clamp-1">
          {product.category}
        </p>

        <h3 className="text-sm font-semibold line-clamp-1 hover:text-accent transition-colors cursor-pointer">
          {product.name}
        </h3>

        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < Math.floor(product.rating)
                  ? "fill-accent text-accent"
                  : "text-muted-foreground"
              }`}
            />
          ))}
          <span className="text-xs text-muted-foreground">
            ({product.reviews})
          </span>

          <p className="text-xs text-muted-foreground ml-auto">
            Đã bán: {Math.floor(product.sold / 100)}
          </p>
        </div>

        <div className="flex items-center justify-between pt-2">
          <p className="text-sm font-bold text-accent">
            {product.price.toLocaleString("vi-VN")}₫
          </p>

          {product.originalPrice > product.price && (
            <p className="text-xs text-muted-foreground line-through mr-auto">
              {product.originalPrice.toLocaleString("vi-VN")}₫
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}

function getDiscount(original, price) {
  return Math.floor(((original - price) / original) * 100);
}
