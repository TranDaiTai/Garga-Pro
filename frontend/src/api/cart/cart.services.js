import api from "../api";
const PREFIX = "/api/cart/";
export const CartApi = {
  addToCard: (product) => {
    return api.post(`${PREFIX}/add/${product.id}`);
  },
  pullToCard: () => {
    return api.post(`${PREFIX}`)
  },
};
