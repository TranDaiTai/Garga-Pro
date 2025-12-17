import { createContext, useState, useEffect, useContext } from "react";
import { authApi } from "@/api/auth/auth.services"; // authApi dùng instance api ở trên

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMe = async () => {
    try {
      const res = await authApi.verify(); // verify sẽ tự refresh nếu 401
      setUser(res.data.user);
    } catch (err) {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMe();
  }, []);

  const logout = () => {
    setUser(null);
    // Gọi API logout nếu cần
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);