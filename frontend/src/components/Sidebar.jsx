import React, { useEffect, useState } from "react";
import { fetchProducts, addProductToCart } from "../api";

const Sidebar = ({ cartId }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    loadProducts();
  }, []);

  const handleAddToCart = async (productId) => {
    try {
      if (!cartId) {
        console.error("No cart ID available");
        return;
      }

      await addProductToCart(cartId, productId);
      alert("Product added to cart!");
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

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
