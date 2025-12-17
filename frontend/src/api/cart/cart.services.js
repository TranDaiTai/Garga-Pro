import api from "../api";
const PREFIX = "/api/cart";
export const CartApi = {
  addToCard: (product, quantity) => {
    return api.post(`${PREFIX}/add`, {
      product: product,
      quantity: quantity,
    });
  },

  getCart: () => {
    return api.get(`${PREFIX}`);
  },
};
