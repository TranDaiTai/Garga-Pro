

export function ProductCard({ product, discount }) {
  return (
    <div className="products__card group">
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
            <p className="text-sm font-bold text-accent">{product.price.toLocaleString("vi-VN").slice(0, -3)}K</p>
            {product.originalPrice > product.price && (
              <p className="text-xs text-muted-foreground line-through">
                {product.originalPrice.toLocaleString("vi-VN").slice(0, -3)}K
              </p>
            )}
            {discount > 0 && (
              <div className="text-destructive px-2 py-1 rounded font-bold text-xs z-10">-{discount}%</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
