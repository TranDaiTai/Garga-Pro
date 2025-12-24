import api from "../api";

const PREFIX = "/api/auth";


export const authApi = {
  
  login:async  (username, password) => {
    const res = await api.post(`${PREFIX}/login`, { username, password });

     if (!res?.data.success) {
      return res.message;
    }

    const { success, ...result } = res.data;
    return result;
  },
  verify:async () => {
    const res = await api.get(`${PREFIX}/verify`);
     if (!res?.data.success) {
      return res.message;
    }

    const { success, ...result } = res.data;
    return result;
  },
  logout: async() => {
    const res = await api.post(`${PREFIX}/logout`);
     if (!res?.data.success) {
      return res.message;
    }

    const { success, ...result } = res.data;
    return result;
  },
};
