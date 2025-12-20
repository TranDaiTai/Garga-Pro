"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext"; // giả sử bạn có AuthContext như trước
import { CartApi } from "@/api/cart/cart.services";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth(); // lấy user từ AuthContext

  const loadCart = async () => {
    setIsLoading(true);
    if (user) {
      // Đã đăng nhập → lấy từ backend
      try {
        const res = await CartApi.getCart(); // API lấy giỏ hàng từ server
        setItems(res.data.items);
        setTotalPrice(res.data.totalAmount);
      } catch (err) {
        console.error("Load cart failed", err);
      }
    } else {
    }
    setIsLoading(false);
  };

  // Load giỏ hàng khi mount hoặc khi user thay đổi (login/logout)
  useEffect(() => {
    loadCart();
  }, [user]); // Chạy lại khi user login/logout

  // Các hàm thao tác giỏ hàng
  const addItem = async (product, quantity = 1) => {
    // Nếu đã login → gọi API đồng bộ lên server
    if (user) {
      await CartApi.addToCard(product.id, quantity).catch(console.error);
      loadCart();
    }
  };

  const removeItem = async (productId) => {
    if (user) {
      await CartApi.removeFromCart(productId).catch(console.error);
      loadCart();
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (user) {
      await CartApi.updateQuantity(productId, quantity).catch(console.error);
      loadCart();
    }
  };

  const clearCart = async () => {
    setItems([]);
    if (user) {
      await CartApi.clearCart().catch(console.error);
      loadCart();
    }
  };
  const paySubmit = () => {
    if (user) {
      CartApi.paySubmit();
    }
  };

  const getTotalItems = () => {
    if (!Array.isArray(items)) return 0;

    return items.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        isLoading,
        totalPrice,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getTotalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
