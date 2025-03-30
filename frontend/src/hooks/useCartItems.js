import { useState, useEffect } from "react";
import { fetchCartItems } from "../api";

const useCartItems = (cartId, refresh) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCartItems = async () => {
      try {
        setLoading(true);
        const data = await fetchCartItems(cartId);
        setCartItems(data || []);
      } catch (err) {
        console.error("Error fetching cart items:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (cartId) {
      loadCartItems();
    }
  }, [cartId, refresh]);

  return { cartItems, loading, error };
};

export default useCartItems;
