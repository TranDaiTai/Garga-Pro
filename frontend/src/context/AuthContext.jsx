import { authApi } from "@/api/auth/auth.services";
import { createContext, useState, useEffect, useContext } from "react";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMe = async () => {
    setIsLoading(true);
    try {
      const res = await authApi.verify();
      setUser(res.data.user);
    } catch (err) {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMe()
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, setUser }}>{children}</AuthContext.Provider>
  );
}
export const usAuth = () => useContext(AuthContext);
