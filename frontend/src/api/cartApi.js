import axiosInstance from "./axiosInstance.js";

export const getCart = async () => {
  const response = await axiosInstance.get("/cart");
  return response.data; // cart details
};

export const addToCart = async (productId, quantity) => {
  const response = await axiosInstance.post("/cart/add", {
    productId,
    quantity,
  });
  return response.data; // updated cart
};

export const updateCartItem = async (itemId, quantity) => {
  const response = await axiosInstance.put(`/cart/update/${itemId}`, {
    quantity,
  });
  return response.data; // updated cart
};

export const removeCartItem = async (itemId) => {
  const response = await axiosInstance.delete(`/cart/remove/${itemId}`);
  return response.data; // updated cart
};

export const clearCart = async () => {
  const response = await axiosInstance.delete("/cart/clear");
  return response.data; // empty cart
};
