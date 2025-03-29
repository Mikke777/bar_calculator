import React, { useState, useEffect } from "react";
import { fetchCartItems } from "../api";

const CartItem = ({ cartId, refresh }) => {
  console.log("Cart ID in CartItem:", cartId);

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCartItems = async () => {
      try {
        const data = await fetchCartItems(cartId);
        console.log("Fetched Cart Items:", data);
        setCartItems(data || []);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      } finally {
        setLoading(false);
      }
    };

    if (cartId) {
      loadCartItems();
    }
  }, [cartId, refresh]);

  if (loading) {
    return <p>Loading cart items...</p>;
  }

  return (
    <div>
      <h1>Cart Items</h1>
      {cartItems.length === 0 ? (
        <p>No cart items</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {cartItems.map((item) => (
            <li key={item.id} style={{ marginBottom: "10px" }}>
              {item.product.name} - Quantity: {item.quantity} - Price:{" "}
              {(item.product.price_cents / 100).toFixed(2)} €
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CartItem;
