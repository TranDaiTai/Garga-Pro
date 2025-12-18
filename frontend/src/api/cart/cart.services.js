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
    return api.get(`${PREFIX}/`);
  },
  removeFromCart: (productId) => {
    return api.post(`${PREFIX}/remove`, {
      productId,
    });
  },
  updateQuantity: (productId, quantity) => {
    return api.post(`${PREFIX}/update`, {
      productId,
      quantity,
    });
  },
  paySubmit : ()=>{
    // return api.post
  }
};
