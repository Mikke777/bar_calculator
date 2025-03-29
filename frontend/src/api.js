import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/v1",
});

export const fetchCart = async (cartId) => {
  try {
    const response = await api.get(`/carts/${cartId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching cart:", error);
    throw error;
  }
};

export const fetchCarts = async () => {
  try {
    const response = await api.get("/carts");
    return response.data;
  } catch (error) {
    console.error("Error fetching carts:", error);
    throw error;
  }
};

export const createCart = async () => {
  try {
    const response = await api.post("/carts", {});
    return response.data;
  } catch (error) {
    console.error("Error creating a new cart:", error);
    throw error;
  }
};

export const fetchProducts = async () => {
  try {
    const response = await api.get("/products");
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const fetchCartItems = async (cartId) => {
  try {
    const response = await api.get(`/carts/${cartId}/cart_items`);
    return response.data;
  } catch (error) {
    console.error("Error fetching cart items:", error);
    throw error;
  }
};

export const addProductToCart = async (cartId, productId) => {
  try {
    const response = await api.post(`/carts/${cartId}/cart_items`, {
      product_id: productId,
      quantity: 1,
    });
    return response.data;
  } catch (error) {
    console.error("Error adding product to cart:", error);
    throw error;
  }
};
