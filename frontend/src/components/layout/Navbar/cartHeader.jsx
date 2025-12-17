"use client";

import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";

function CartHeader() {
  const { items, isLoading, getTotalItems } = useCart();

  // Tính tổng số lượng sản phẩm trong giỏ
  const totalItems = getTotalItems();

  // Nếu đang load (ví dụ: đang fetch từ server khi user đăng nhập), có thể ẩn badge hoặc hiển thị skeleton
  // Ở đây mình chọn ẩn badge để tránh nhấp nháy số 0 → số thực
  if (isLoading) {
    return (
      <Link
        to="/cart"
        className="relative p-2 text-foreground hover:text-accent transition-colors"
        title="Giỏ hàng"
      >
        <ShoppingCart className="w-6 h-6" />
      </Link>
    );
  }

  return (
    <Link
      to="/cart"
      className="relative p-2 text-foreground hover:text-accent transition-colors"
      title="Giỏ hàng"
    >
      <ShoppingCart className="w-6 h-6" />

      {/* Chỉ hiển thị badge khi có sản phẩm */}
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs font-bold rounded-full min-w-5 h-5 flex items-center justify-center">
          {totalItems > 99 ? "99+" : totalItems}
        </span>
      )}
    </Link>
  );
}

export default CartHeader;