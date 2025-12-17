"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext"; // giả sử bạn có AuthContext như trước
import { CartApi } from "@/api/cart/cart.services";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth(); // lấy user từ AuthContext

  // Load giỏ hàng khi mount hoặc khi user thay đổi (login/logout)
  useEffect(() => {
    const loadCart = async () => {
      setIsLoading(true);
      if (user) {
        // Đã đăng nhập → lấy từ backend
        try {
          const res = await CartApi.getCart(); // API lấy giỏ hàng từ server
          setItems(res.data);
        } catch (err) {
          console.error("Load cart failed", err);
        }
      } else {
      }
      setIsLoading(false);
    };

    loadCart();
  }, [user]); // Chạy lại khi user login/logout

  // Các hàm thao tác giỏ hàng
  const addItem = (product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });

    // Nếu đã login → gọi API đồng bộ lên server
    if (user) {
      CartApi.addToCard(product, quantity).catch(console.error);
    }
  };

  const removeItem = (productId) => {
    setItems((prev) => prev.filter((item) => item.id !== productId));

    if (user) {
      CartApi.removeFromCart(productId).catch(console.error);
    }
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );

    if (user) {
      CartApi.updateQuantity(productId, quantity).catch(console.error);
    }
  };

  const clearCart = () => {
    setItems([]);
    if (user) {
      CartApi.clearCart().catch(console.error);
    }
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        isLoading,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getTotalPrice,
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