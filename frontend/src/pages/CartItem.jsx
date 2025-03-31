import React from "react";
import useCartItems from "../hooks/useCartItems";
import useCartItemActions from "../hooks/useCartItemActions";
import CartItemRow from "../components/CartItemRow";
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
      <h1>Cart #{cartId} Items</h1>
      {cartItems.length === 0 ? (
        <p>No cart items</p>
      ) : (
        <table className="cart-item-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <CartItemRow
                key={item.id}
                item={item}
                onIncrease={handleIncreaseQuantity}
                onDecrease={handleDecreaseQuantity}
                onRemove={handleRemoveItem}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CartItem;
