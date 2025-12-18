import api from "../api";

const PREFIX = "/api/products";

export const productApi = {
  getProducts: async (queryString) => {
    return api.get(`${PREFIX}/?${queryString}`);
  },
 
  getProductById: (id) => {
    return api.get(`${PREFIX}/${id}`);
  },
  getRelatedProduct: (productId) => {
    return api.get(`${PREFIX}/${id}`);
  },
};
