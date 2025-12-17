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

    // ❌ KHÔNG refresh cho /auth/me
    if (originalRequest.url.includes("/auth/me")) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await api.post("/api/auth/refresh", {}, { withCredentials: true });
        return api(originalRequest);
      } catch {
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);
export default api;