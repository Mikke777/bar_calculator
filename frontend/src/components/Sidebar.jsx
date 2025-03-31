import React from "react";
import useProducts from "../hooks/useProducts";
import useCartItemActions from "../hooks/useCartItemActions";
import "../style/Sidebar/Sidebar.css";

const Sidebar = ({ cartId, isCalculating }) => {
  const { products, loading, error } = useProducts();
  const { handleAddToCart } = useCartItemActions(cartId);

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>Error loading products. Please try again later.</p>;
  }

  return (
    <div
      className="sidebar"
      style={{
        opacity: isCalculating ? 0.5 : 1,
        pointerEvents: isCalculating ? "none" : "auto",
      }}
    >
      <h2 style={{ color: "black" }}>Products</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {products.map((product) => (
          <li key={product.id} style={{ marginBottom: "10px", color: "black" }}>
            <button
              style={{ width: "100%" }}
              onClick={() => handleAddToCart(product.id)}
              disabled={isCalculating}
            >
              {product.name} - {product.formatted_price}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
