import { redirect } from 'react-router-dom';
import { authApi } from '@/api/auth/auth.services';

export async function protectedLoader({ request }) {
  try {
    const res = await authApi.verify(); // ✅ await để lấy dữ liệu
    const user = res.data.user; // tùy backend trả gì

    if (!user) {
      const url = new URL(request.url);
      const pathnameAndSearch = url.pathname + url.search;
      throw redirect(`/login?redirect=${encodeURIComponent(pathnameAndSearch)}`);
    }

    return { user }; // trả về user cho page
  } catch (err) {
    // 401 / lỗi verify → redirect login
    console.log(err)
    const url = new URL(request.url);
    const pathnameAndSearch = url.pathname + url.search;
    // sessionStorage.clear() ;
    throw redirect(`/login?redirect=${encodeURIComponent(pathnameAndSearch)}`);


  }
}
