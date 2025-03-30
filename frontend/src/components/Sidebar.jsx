import React from "react";
import useProducts from "../hooks/useProducts";
import { addProductToCart } from "../api";

const Sidebar = ({ cartId }) => {
  const { products, loading, error } = useProducts();

  const handleAddToCart = async (productId) => {
    try {
      if (!cartId) {
        console.error("No cart ID available");
        return;
      }

      await addProductToCart(cartId, productId);
      alert("Product added to cart!");
    } catch (err) {
      console.error("Error adding product to cart:", err);
    }
  };

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>Error loading products. Please try again later.</p>;
  }

  return (
    <div className="sidebar">
      <h2 style={{ color: "black" }}>Products</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {products.map((product) => (
          <li key={product.id} style={{ marginBottom: "10px", color: "black" }}>
            <button
              style={{ width: "100%" }}
              onClick={() => handleAddToCart(product.id)}
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
