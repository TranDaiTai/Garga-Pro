import api from "../api";

const PREFIX = "/api/products";

export const productApi = {
  getProducts: async (queryString) => {
    const res = await api.get(`${PREFIX}/?${queryString}`);
    if (!res?.data.success) {
      return res.message;
    }
    
    const {success, ...result} = res.data
    return result;
  },

  getProductById: async (id) => {
    const res = await api.get(`${PREFIX}/${id}`);
    if (!res?.data.success) {
      return res.message;
    }
    
    const {success, ...result} = res.data
    return result;
  },
  getRelatedProduct: async (productId) => {
    const res = await api.get(`${PREFIX}/${id}`);
    if (!res?.data.success) {
      return res.message;
    }
    
    const {success, ...result} = res.data
    return result;
  },
};
