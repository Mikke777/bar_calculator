import React from "react";
import "../style/RightSidebar/RightSidebar.css";

const RightSidebar = ({ onToggleView, isCalculating, onOpenNewCart, onViewAllCarts, isOnBillPage, isOnIndexCarts }) => {
  return (
    <div className="right-sidebar">
      <h2 style={{ color: "black" }}>Actions</h2>
      <button onClick={onToggleView} disabled={isOnIndexCarts}>
        {isCalculating ? "Come back to the cart" : "Calculate Price"}
      </button>
      <button onClick={onOpenNewCart} disabled={isOnBillPage}>
        Open New Cart
      </button>
      <button onClick={onViewAllCarts}>Overview All Open Carts</button>
    </div>
  );
};

export default RightSidebar;
