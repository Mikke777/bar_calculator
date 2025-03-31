import React from "react";
import useBill from "../hooks/useBill";
import BillTable from "../components/BillTable";
import "../style/Bill/Bill.css";

const Bill = ({ cartId, onCartClosed }) => {
  const { cartItems, totalPrice, loading, handlePaid } = useBill(cartId, onCartClosed);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Bill</h1>
      <BillTable cartItems={cartItems} totalPrice={totalPrice} />
      <button onClick={handlePaid} className="bill-button">
        Paid
      </button>
    </div>
  );
};

export default Bill;
