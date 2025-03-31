import React from "react";
import "../style/IndexCarts/IndexCarts.css";

const IndexCarts = ({ carts, onViewCart }) => {
  return (
    <div>
      <h1>All Open Carts</h1>
      {carts.length === 0 ? (
        <p>No open carts available.</p>
      ) : (
        <ul className="index-carts-list">
          {carts.map((cart) => (
            <li key={cart.id} className="index-carts-item">
              <span>Cart ID: {cart.id}</span>
              <button
                className="index-carts-button"
                onClick={() => onViewCart(cart.id)}
              >
                View Cart
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default IndexCarts;
