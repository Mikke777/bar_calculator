import { useState, useEffect } from "react";
import { fetchCartItemsWithCalculation, calculateCartTotal, deleteCart } from "../api";

const useBill = (cartId, onCartClosed) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState({ cents: 0, currency_iso: "EUR" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCartItems = async () => {
      try {
        setLoading(true);
        const items = await fetchCartItemsWithCalculation(cartId);
        setCartItems(items);

        const total = await calculateCartTotal(cartId);
        setTotalPrice(total);
      } catch (err) {
        console.error("Error loading cart items or calculating total:", err);
      } finally {
        setLoading(false);
      }
    };

    loadCartItems();
  }, [cartId]);

  const handlePaid = async () => {
    try {
      await deleteCart(cartId);
      alert("Cart successfully closed!");
      onCartClosed();
    } catch (err) {
      console.error("Error closing the cart:", err);
      alert("Failed to close the cart.");
    }
  };

  return { cartItems, totalPrice, loading, handlePaid };
};

export default useBill;
