// src/Routes/AppRoutes.jsx

import { BrowserRouter, createBrowserRouter, Route } from "react-router-dom";
import DefaultLayout from "@/components/layout/DefaultLayout";
import Home from "@/pages/Home";
import Booking from "@/pages/Booking";
import Services from "@/pages/services";
import ServiceDetail from "@/pages/services/[id]";
import ProductPage from "@/pages/product/product";
import ProductDetailPage from "@/pages/product/[id]";
import CartPage from "@/pages/Cart";
import NotFound from "@/pages/Notfound";
import LoginPage from "@/pages/auth/login/Login";
import { protectedLoader } from "./ProtectedRouter";
import RegisterPage from "@/pages/auth/register";
import ForgotPasswordPage from "@/pages/auth/forgot-password";


export const router = createBrowserRouter([
  {
    element: <DefaultLayout />,
    children: [
      // Public routes
      { index: true, element: <Home /> },
      { path: "services", element: <Services /> },
      { path: "services/:id", element: <ServiceDetail /> },
      { path: "product", element: <ProductPage /> },
      { path: "product/:id", element: <ProductDetailPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "forgot-password", element: <ForgotPasswordPage /> },

      // Protected routes (sẽ thêm loader/auth sau)
      {
        loader: protectedLoader, // Tất cả children bên dưới đều được bảo vệ
        children: [
          { path: "booking", element: <Booking /> },
          { path: "cart", element: <CartPage /> },
          // thêm bao nhiêu trang protected cũng được
        ],
      },
      // 404 phải để cuối cùng
      { path: "*", element: <NotFound /> },
    ],
  },
]);
