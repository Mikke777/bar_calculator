import React from "react";

const RightSidebar = ({ onToggleView, isCalculating }) => {
  return (
    <div className="right-sidebar">
      <h2 style={{ color: "black" }}>Actions</h2>
      <button
        style={{ width: "100%", marginBottom: "10px", padding: "10px" }}
        onClick={onToggleView}
      >
        {isCalculating ? "Come back to the cart" : "Calculate Price"}
      </button>
      <button style={{ width: "100%", marginBottom: "10px", padding: "10px" }}>Overview All Carts</button>
      <button style={{ width: "100%", marginBottom: "10px", padding: "10px" }}>Open New Cart</button>
    </div>
  );
};

export default RightSidebar;
