import axios from 'axios';
import { AuthContext } from '@/context/AuthContext';
const api = axios.create({
  baseURL: import.meta.env.DEV ? '/' : 'https://your-production.com', // dev thì dùng proxy
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});


api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    // THÊM ĐIỀU KIỆN NÀY: Nếu là request refresh thì KHÔNG retry refresh nữa
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== "/api/auth/refresh"  // <<< QUAN TRỌNG: bỏ qua nếu là refresh endpoint
    ) {
      originalRequest._retry = true;

      try {
        await api.post("/api/auth/refresh", {});
        return api(originalRequest);  // retry request gốc với cookie mới (nếu backend set access token cookie)
      } catch (refreshError) {
        // Refresh thất bại → logout user, redirect login
        // Ví dụ: dùng AuthContext để logout
        // const { logout } = useContext(AuthContext);
        // logout();
        // window.location.href = '/login';

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
export default api;