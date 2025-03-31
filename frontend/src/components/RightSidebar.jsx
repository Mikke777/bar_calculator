import React from "react";
import "../style/RightSidebar/RightSidebar.css"; // Import the RightSidebar styles

const RightSidebar = ({ onToggleView, isCalculating, onOpenNewCart, onViewAllCarts }) => {
  return (
    <div className="right-sidebar">
      <h2 style={{ color: "black" }}>Actions</h2>
      <button onClick={onToggleView}>
        {isCalculating ? "Come back to the cart" : "Calculate Price"}
      </button>
      <button onClick={onOpenNewCart}>Open New Cart</button>
      <button onClick={onViewAllCarts}>Overview All Open Carts</button>
    </div>
  );
};

export default RightSidebar;
