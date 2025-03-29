import React, { useEffect, useState } from "react";
import { fetchProducts } from "../api";

const Sidebar = () => {
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

  return (
    <div className="sidebar">
      <h2 style={{ color: "black" }}>Products</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {products.map((product) => (
          <li key={product.id} style={{ marginBottom: "10px", color: "black" }}>
            <button style={{ width:"100% "}}>
              {product.name} - {(product.formatted_price)}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
