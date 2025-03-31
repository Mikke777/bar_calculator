import React, { useEffect, useState } from "react";
import { fetchCartItemsWithCalculation, calculateCartTotal, deleteCart } from "../api";
import "../style/Bill/Bill.css";

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
      <table className="bill-table">
        <thead>
          <tr>
            <th>Product Code</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Final Price</th>
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
                  <td>{item.product.product_code || "N/A"}</td>
                  <td>{item.product.name || "N/A"}</td>
                  <td>{item.quantity || 0}</td>
                  <td>
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
              <td colSpan="4" style={{ textAlign: "center" }}>
                No items in the cart.
              </td>
            </tr>
          )}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3">Total:</td>
            <td>
              <strong>{formatPrice(totalPrice)}</strong>
            </td>
          </tr>
        </tfoot>
      </table>
      <button onClick={handlePaid} className="bill-button">
        Paid
      </button>
    </div>
  );
};

export default Bill;
