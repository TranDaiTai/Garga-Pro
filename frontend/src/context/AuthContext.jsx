import { createContext, useState, useEffect, useContext } from "react";
import { authApi } from "@/api/auth/auth.services"; // authApi dùng instance api ở trên
import { useNavigate } from "react-router-dom";
export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchMe = async () => {
    try {
      const res = await authApi.verify(); // verify sẽ tự refresh nếu 401
      setUser(res.data);
    } catch (err) {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMe();
  }, []);

  const logout = async () => {
    await authApi.logout();
    await fetchMe();
    // Gọi API logout nếu cần
  };
  const login = async (username,password) => {
    // Gọi API logout nếu cần

    try {
      const response = await authApi.login(username, password);
      // alert(`Chào ${response.data.user.name}! Đăng nhập thành công`)
      //  login(response.data.user, response.data.accessToken);
      if (response.data.userId) {
        setUser(response.data.userId);
      }
      // Chuyển hướng sau khi login thành công
    } catch (err) {
      const msg = err.response?.data?.message || "Đăng nhập thất bại, thử lại!";
      setError(msg);
    } finally {
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, logout, login, error }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
