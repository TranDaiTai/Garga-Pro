// src/routes/authRoutes.jsx
import LoginPage from '@/pages/auth/login/Login';
import RegisterPage from '@/pages/auth/register';
import ForgotPasswordPage from '@/pages/auth/forgot-password';
import SeasonalLayout from '@/components/layout/SeasonalLayout';

// import ResetPassword from '@/pages/auth/ResetPassword';

const authRoutes = [
  { 
    path: '/login', 
    component: LoginPage, 
    layout: SeasonalLayout,
    meta: { 
      title: 'Đăng nhập',
      requiresGuest: true // Chỉ truy cập được khi chưa đăng nhập
    }
  }
 , { 
    path: '/register', 
    component: RegisterPage, 
    layout: SeasonalLayout,
    meta: { 
      title: 'Đăng ký',
      requiresGuest: true 
    }
  },
  { 
    path: '/forgot-password', 
    component: ForgotPasswordPage, 
    layout: SeasonalLayout,
    meta: { title: 'Quên mật khẩu' }
  }
//   { 
//     path: '/reset-password/:token', 
//     component: ResetPassword, 
//     layout: AuthLayout,
//     meta: { title: 'Đặt lại mật khẩu' }
//   }
];

export default authRoutes;