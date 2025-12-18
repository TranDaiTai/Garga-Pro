"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { Trash2, Plus, Minus, ChevronLeft, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, getTotalPrice,isLoading } =
    useCart();
  const [showCheckout, setShowCheckout] = useState(false);

  const totalPrice = getTotalPrice() ?? 0;
  const shippingCost = items.length > 0 ? 50000 : 0;
  const finalTotal = totalPrice + shippingCost;

  if ((items.length === 0 && !showCheckout) || !totalPrice ) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <div className="bg-card border-b border-border p-4">
          <div className="max-w-7xl mx-auto flex items-center gap-2">
            <Link
              to="/product"
              className="text-accent hover:text-accent/80 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-2xl font-bold text-foreground">Giỏ hàng</h1>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingCart className="w-10 h-10 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Giỏ hàng trống
            </h2>
            <p className="text-muted-foreground mb-6">
              Hãy thêm sản phẩm để bắt đầu mua sắm
            </p>
            <Link
              to="/product"
              className="inline-block bg-accent text-accent-foreground px-6 py-2 rounded-lg font-semibold hover:bg-accent/90 transition-colors"
            >
              Tiếp tục mua sắm
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border p-4">
        <div className="max-w-7xl mx-auto flex items-center gap-2">
          <Link
            to="/product"
            className="text-accent hover:text-accent/80 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold text-foreground">Giỏ hàng</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-card border border-border rounded-lg p-4 flex gap-4"
                >
                  {/* Product Image */}
                  <div className="w-24 h-24 flex-shrink-0 bg-secondary rounded-lg overflow-hidden">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <Link
                        to={`/product/${item.id}`}
                        className="text-foreground font-semibold hover:text-accent transition-colors"
                      >
                        {item.name}
                      </Link>
                      <p className="text-accent font-bold mt-1">
                        {item.price?.toLocaleString("vi-VN").slice(0, -3)}K
                      </p>
                    </div>

                    {/* Quantity Control */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="p-1 hover:bg-secondary rounded transition-colors"
                      >
                        <Minus className="w-4 h-4 text-foreground" />
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(
                            item.id,
                            Math.max(1, Number(e.target.value))
                          )
                        }
                        className="w-12 text-center border border-border rounded py-1 bg-background text-foreground text-sm"
                      />
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="p-1 hover:bg-secondary rounded transition-colors"
                      >
                        <Plus className="w-4 h-4 text-foreground" />
                      </button>
                    </div>
                  </div>

                  {/* Price & Remove */}
                  <div className="flex flex-col items-end justify-between">
                    <p className="font-bold text-foreground">
                      {(item.price * item.quantity)
                        .toLocaleString("vi-VN")
                        .slice(0, -3)}
                      K
                    </p>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 hover:bg-destructive/10 rounded transition-colors text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={clearCart}
              className="mt-4 text-sm text-destructive hover:text-destructive/80 transition-colors font-medium hover:cursor-pointer"
            >
              Xóa tất cả
            </button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-lg p-6 sticky top-4">
              <h2 className="text-lg font-bold text-foreground mb-4">
                Tóm tắt đơn hàng
              </h2>

              <div className="space-y-3 border-b border-border pb-4 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tạm tính:</span>
                  <span className="text-foreground font-semibold">
                    {totalPrice.toLocaleString("vi-VN").slice(0, -3)}K
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Vận chuyển:</span>
                  <span className="text-foreground font-semibold">
                    {shippingCost.toLocaleString("vi-VN").slice(0, -3)}K
                  </span>
                </div>
              </div>

              <div className="flex justify-between text-lg font-bold text-accent mb-6">
                <span>Tổng cộng:</span>
                <span>{finalTotal.toLocaleString("vi-VN").slice(0, -3)}K</span>
              </div>

              <button
                onClick={() => setShowCheckout(true)}
                className="w-full bg-accent text-accent-foreground py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors mb-3 hover:cursor-pointer"
              >
                Thanh toán
              </button>
              <Link
                to="/product"
                className="w-full block text-center bg-secondary text-foreground py-3 rounded-lg font-semibold hover:bg-secondary/80 transition-colors"
              >
                Tiếp tục mua
              </Link>
            </div>
          </div>
        </div>

        {/* Checkout Modal */}
        {showCheckout && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-card rounded-lg p-6 max-w-md w-full">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Xác nhận đơn hàng
              </h2>
              <div className="space-y-3 mb-6 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Số lượng sản phẩm:
                  </span>
                  <span className="font-semibold text-foreground">
                    {items.length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tổng cộng:</span>
                  <span className="font-semibold text-accent text-lg">
                    {finalTotal.toLocaleString("vi-VN").slice(0, -3)}K
                  </span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-6">
                Cảm ơn bạn đã lựa chọn. Chúng tôi sẽ xử lý đơn hàng của bạn ngay
                lập tức!
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    clearCart();
                    setShowCheckout(false);
                  }}
                  className="w-full bg-accent text-accent-foreground py-2 rounded-lg font-semibold hover:bg-accent/90 transition-colors"
                >
                  Hoàn tất
                </button>
                <button
                  onClick={() => {
                    setShowCheckout(false);
                  }}
                  className="w-full bg-black text-accent-foreground py-2 rounded-lg font-semibold hover:bg-black/90 transition-colors"
                >
                  Huỷ
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
