"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { CartEmpty } from "@/components/common/CartEmpty";
import { CartItem } from "@/components/common/CartItem";
import { Breadcrumb } from "@/components/common/Breadcrumb";

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, totalPrice,isLoading} =
    useCart();
  const [showCheckout, setShowCheckout] = useState(false);

  const shippingCost = items?.length > 0 ? 50000 : 0;
  const finalTotal = totalPrice + shippingCost;

  if ((items?.length === 0 && !showCheckout) ) {
    return (
    <CartEmpty
    />
    );
  }
 
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
     <Breadcrumb
     />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <CartItem
          items={items}
          updateQuantity={updateQuantity}
          clearCart={clearCart}
          removeItem={removeItem}
          />
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
