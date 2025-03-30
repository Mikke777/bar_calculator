import { useState, useEffect } from "react";
import { fetchCartItems } from "../api";
import cable from "../cable";

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

      const subscription = cable.subscriptions.create(
        { channel: "CartChannel", cart_id: cartId },
        {
          received: (data) => {
            console.log("WebSocket Update Received:", data);
            const sortedItems = (data || []).sort((a, b) => a.id - b.id);
            setCartItems(sortedItems);
          },
          connected: () => {
            console.log(`WebSocket connected to CartChannel for cart_id: ${cartId}`);
          },
          disconnected: () => {
            console.warn(`WebSocket disconnected from CartChannel for cart_id: ${cartId}`);
          },
          rejected: () => {
            console.error(`WebSocket subscription rejected for cart_id: ${cartId}`);
          },
        }
      );

      return () => {
        console.log(`Unsubscribing from CartChannel for cart_id: ${cartId}`);
        subscription.unsubscribe();
      };
    }
  }, [cartId, refresh]);

  return { cartItems, loading, error };
};

export default useCartItems;
