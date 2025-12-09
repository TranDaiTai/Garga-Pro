import api from "../api"

const PREFIX = "/api/auth"

export const authApi = {
  login: (email, password ) => 
    api.post(`${PREFIX}/login`, { email, password }),
}
