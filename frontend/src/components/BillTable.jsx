import React from "react";
import { formatPrice } from "../utils/priceUtils";

const BillTable = ({ cartItems, totalPrice }) => {
  return (
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
  );
};

export default BillTable;
