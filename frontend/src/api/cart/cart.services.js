import api from "../api";
const PREFIX = "/api/cart";
export const CartApi = {
  addToCard: async (productId, quantity) => {
    const res = await api.post(`${PREFIX}/add`, {
      productId: productId,
      quantity: quantity,
    });
    if (!res?.data.success) {
      return res.message;
    }

    const { success, ...result } = res.data;
    return result;
  },
  getCart: async () => {
    const res = await api.get(`${PREFIX}`);
    if (!res?.data.success) {
      return res.message;
    }

    const { success, ...result } = res.data;
    return result;
  },
  removeFromCart: async (productId) => {
    const res = await api.post(`${PREFIX}/remove`, {
      productId: productId,
    });
    if (!res?.data.success) {
      return res.message;
    }

    const { success, ...result } = res.data;
    return result;
  },
  updateQuantity: async (productId, quantity) => {
    const res = await api.post(`${PREFIX}/update`, {
      productId: productId,
      quantity: quantity,
    });
    if (!res?.data.success) {
      return res.message;
    }

    const { success, ...result } = res.data;
    return result;
  },
  paySubmit: async () => {
    // const res = await api.post
  },
  clearCart : async ()=>{
      const res = await api.post(`${PREFIX}/clearcart`);
    if (!res?.data.success) {
      return res.message;
    }

    const { success, ...result } = res.data;
    return result;
  }
};
