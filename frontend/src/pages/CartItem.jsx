import React from "react";
import useCartItems from "../hooks/useCartItems";

const CartItem = ({ cartId, refresh }) => {
  const { cartItems, loading, error } = useCartItems(cartId, refresh);

  if (loading) {
    return <p>Loading cart items...</p>;
  }

  if (error) {
    return <p>Error loading cart items. Please try again later.</p>;
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
              {item.product.name} - Quantity: {item.quantity} -
              Price {item.product.formatted_price}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CartItem;
