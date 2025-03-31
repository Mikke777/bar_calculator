import React from "react";
import useCartItems from "../hooks/useCartItems";
import useCartItemActions from "../hooks/useCartItemActions";
import "../style/CartItem/CartItem.css";

const CartItem = ({ cartId, refresh }) => {
  const { cartItems, loading, error } = useCartItems(cartId, refresh);
  const { handleIncreaseQuantity, handleDecreaseQuantity, handleRemoveItem } = useCartItemActions(cartId);

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
        <ul className="cart-item-list">
          {cartItems.map((item) => (
            <li key={item.id} className="cart-item">
              {item.product.name} - Quantity: {item.quantity} - Price: {item.product.formatted_price}
              <button onClick={() => handleIncreaseQuantity(item)}>+</button>
              {item.quantity > 1 ? (
                <button onClick={() => handleDecreaseQuantity(item)}>-</button>
              ) : (
                <button onClick={() => handleRemoveItem(item)} className="remove">
                  x
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CartItem;
