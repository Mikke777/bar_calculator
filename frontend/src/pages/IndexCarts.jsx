import React from "react";

const IndexCarts = ({ carts, onViewCart }) => {
  return (
    <div>
      <h1>All Open Carts</h1>
      {carts.length === 0 ? (
        <p>No open carts available.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {carts.map((cart) => (
            <li key={cart.id} style={{ marginBottom: "10px" }}>
              <span>Cart ID: {cart.id}</span>
              <button
                style={{ marginLeft: "10px", padding: "5px 10px" }}
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
