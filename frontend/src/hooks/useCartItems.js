import { useState, useEffect } from "react";
import { fetchCartItems } from "../api";
import cable from "../websockets/cable";

const useCartItems = (cartId, refresh) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    const loadCartItems = async () => {
      try {
        setLoading(true);
        const data = await fetchCartItems(cartId);
        const sortedItems = (data || []).sort((a, b) => a.id - b.id);
        setCartItems(sortedItems);
      } catch (err) {
        console.error("Error fetching cart items:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (cartId) {
      loadCartItems();

      // Subscribe to WebSocket channel
      cable.subscriptions.create(
        { channel: "CartChannel", cart_id: cartId },
        {
          received: (data) => {
            const sortedItems = (data || []).sort((a, b) => a.id - b.id);
            setCartItems(sortedItems);
          },
          connected: () => {},
          disconnected: () => {},
          rejected: () => {},
        }
      );
    }
  }, [cartId, refresh]);

  return { cartItems, loading, error };
};

export default useCartItems;
