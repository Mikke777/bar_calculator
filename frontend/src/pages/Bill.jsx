import React, { useEffect, useState } from "react";
import { fetchCartItemsWithCalculation, calculateCartTotal, deleteCart } from "../api";

const Bill = ({ cartId, onCartClosed }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState({ cents: 0, currency_iso: "EUR" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCartItems = async () => {
      try {
        setLoading(true);
        const items = await fetchCartItemsWithCalculation(cartId);
        setCartItems(items);

        const total = await calculateCartTotal(cartId);
        setTotalPrice(total);
      } catch (err) {
        console.error("Error loading cart items or calculating total:", err);
      } finally {
        setLoading(false);
      }
    };

    loadCartItems();
  }, [cartId]);

  const handlePaid = async () => {
    try {
      await deleteCart(cartId);
      alert("Cart successfully closed!");
      onCartClosed();
    } catch (err) {
      console.error("Error closing the cart:", err);
      alert("Failed to close the cart.");
    }
  };

  const formatPrice = (price) => {
    if (!price || typeof price.cents !== "number") {
      return "€0.00";
    }
    return `€${(price.cents / 100).toFixed(2)}`;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Bill</h1>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid black", padding: "8px" }}>Product Code</th>
            <th style={{ border: "1px solid black", padding: "8px" }}>Name</th>
            <th style={{ border: "1px solid black", padding: "8px" }}>Quantity</th>
            <th style={{ border: "1px solid black", padding: "8px" }}>Final Price</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.length > 0 ? (
            cartItems.map((item) => {
              const discountedPrice = item.discounted_price || { cents: 0, currency_iso: "EUR" };
              const productPrice = item.product?.price || { cents: 0, currency_iso: "EUR" };
              const originalPrice = {
                cents: productPrice.cents * (item.quantity || 0),
                currency_iso: productPrice.currency_iso,
              };

              return (
                <tr key={item.id}>
                  <td style={{ border: "1px solid black", padding: "8px" }}>{item.product.product_code || "N/A"}</td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>{item.product.name || "N/A"}</td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>{item.quantity || 0}</td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>
                    {discountedPrice.cents < originalPrice.cents ? (
                      <>
                        <span style={{ textDecoration: "line-through", color: "red" }}>
                          {formatPrice(originalPrice)}
                        </span>{" "}
                        {formatPrice(discountedPrice)}
                      </>
                    ) : (
                      formatPrice(originalPrice)
                    )}
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: "center", padding: "8px" }}>
                No items in the cart.
              </td>
            </tr>
          )}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3" style={{ border: "1px solid black", padding: "8px", textAlign: "right" }}>
              <strong>Total:</strong>
            </td>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              <strong>{formatPrice(totalPrice)}</strong>
            </td>
          </tr>
        </tfoot>
      </table>
      <button
        onClick={handlePaid}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "green",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Paid
      </button>
    </div>
  );
};

export default Bill;
