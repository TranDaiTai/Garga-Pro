import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.DEV ? '/' : 'https://your-production.com', // dev thì dùng proxy
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// (Tùy chọn) lưu token vào localStorage sau khi login
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // có thể redirect về login
    }
    return Promise.reject(error);
  }
);
export default api;