import axios from "axios";

// Create an Axios instance with a base URL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/v1",
});

// Global error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response || error.message);
    return Promise.reject(error);
  }
);

// Fetch a specific cart
export const fetchCart = async (cartId) => {
  const response = await api.get(`/carts/${cartId}`);
  return response.data;
};

// Fetch all carts
export const fetchCarts = async () => {
  const response = await api.get("/carts");
  return response.data;
};

// Create a new cart
export const createCart = async () => {
  const response = await api.post("/carts", {});
  return response.data;
};

// Fetch all products
export const fetchProducts = async () => {
  const response = await api.get("/products");
  return response.data;
};

// Fetch all cart items for a specific cart
export const fetchCartItems = async (cartId) => {
  const response = await api.get(`/carts/${cartId}/cart_items`);
  return response.data;
};

// Fetch all cart items for a specific cart with calculation
export const fetchCartItemsWithCalculation = async (cartId) => {
  const response = await fetch(`http://localhost:3000/api/v1/carts/${cartId}/calculate_total`);
  const data = await response.json();
  return data.cart_items;
};

// Add a product to the cart
export const addProductToCart = async (cartId, productId) => {
  const response = await api.post(`/carts/${cartId}/cart_items`, {
    product_id: productId,
    quantity: 1,
  });
  return response.data;
};

// Update the quantity of a cart item
export const updateCartItem = async (cartId, cartItemId, quantity) => {
  const response = await api.put(`/carts/${cartId}/cart_items/${cartItemId}`, {
    quantity,
  });
  return response.data;
};

// Delete a cart item
export const deleteCartItem = async (cartId, cartItemId) => {
  const response = await api.delete(`/carts/${cartId}/cart_items/${cartItemId}`);
  return response.data;
};

// Calculate the total price of a cart (with discounts applied)
export const calculateCartTotal = async (cartId) => {
  const response = await api.get(`/carts/${cartId}/calculate_total`);
  return response.data.total_price;
};

// Checkout a cart
export const deleteCart = async (cartId) => {
  try {
    const response = await api.delete(`/carts/${cartId}`);
    return response.data;
  } catch (err) {
    console.error("Error in deleteCart API call:", err.response?.data || err.message);
    throw new Error(err.response?.data?.error || "Failed to delete cart");
  }
};
