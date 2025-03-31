import React from "react";
import "../style/CartItem/CartItem.css";

const CartItemRow = ({ item, onIncrease, onDecrease, onRemove }) => {
  return (
    <tr className="cart-item-row">
      <td>{item.product.name}</td>
      <td>{item.quantity}</td>
      <td>{item.product.formatted_price}</td>
      <td>
        <button onClick={() => onIncrease(item)}>+</button>
        {item.quantity > 1 ? (
          <button onClick={() => onDecrease(item)}>-</button>
        ) : (
          <button onClick={() => onRemove(item)} className="remove">
            x
          </button>
        )}
      </td>
    </tr>
  );
};

export default CartItemRow;
