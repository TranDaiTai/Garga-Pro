import { LogOut } from "lucide-react";
import api from "../api";
import { useAuth } from "@/context/AuthContext";

const PREFIX = "/api/auth";


export const authApi = {
  
  login: (email, password) => {
    
    return api.post(`${PREFIX}/login`, { email, password });
  },
  verify: () => {
    return api.get(`${PREFIX}/me`);
  },
  logout: () => {
    return api.post(`${PREFIX}/logout`);
  },
};
