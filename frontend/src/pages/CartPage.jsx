import React, { useEffect, useState } from "react";
import { fetchCart } from "../api";

const CartPage = () => {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    const loadCart = async () => {
      const cartId = 1; // Replace with dynamic cart ID
      const data = await fetchCart(cartId);
      setCart(data);
    };
    loadCart();
  }, []);

  if (!cart) return <p>Loading...</p>;

  return (
    <div>
      <h1>Cart</h1>
      <div>
        {cart.cart_items.map((item) => (
          <div key={item.id} style={{ marginBottom: "20px" }}>
            <h2>{item.product.name}</h2>
            <p>Quantity: {item.quantity}</p>
            <p>Price: {item.product.formatted_price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartPage;
