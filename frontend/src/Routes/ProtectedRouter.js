// src/routes/protectedLoader.js
import { redirect } from 'react-router-dom';
import { getCurrentUser } from '@/lib/auth';

export async function protectedLoader({ request }) {
  const user = getCurrentUser();

  if (!user) {
    const url = new URL(request.url); // ← request.url là full URL: http://localhost:5173/cart
    const pathnameAndSearch = new URL(url).pathname + new URL(url).search;

    throw redirect(`/login?redirect=${encodeURIComponent(pathnameAndSearch)}`);
  }

  // Nếu đã login thì trả về user để page dùng luôn (tùy chọn)
  return { user };
}