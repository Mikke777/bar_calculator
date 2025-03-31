import React from "react";
import Sidebar from "./components/Sidebar";
import RightSidebar from "./components/RightSidebar";
import CartItem from "./pages/CartItem";
import Bill from "./pages/Bill";
import IndexCarts from "./pages/IndexCarts";
import useCartManager from "./hooks/useCartManager";
import "./style/App.css";

const App = () => {
  const {
    carts,
    currentCartId,
    showBill,
    showIndexCarts,
    loading,
    handleOpenNewCart,
    handleToggleView,
    handleViewAllCarts,
    handleViewCart,
    handleCartClosed,
  } = useCartManager();

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="app">
      {currentCartId === null && !showIndexCarts && (
        <div className="overlay">
          <div className="modal">
            <p style={{ color: "black" }}>
              Cart is not open. If you want to open a new cart, click below:
            </p>
            <button onClick={handleOpenNewCart}>Open New Cart</button>
          </div>
        </div>
      )}
      <Sidebar cartId={currentCartId} isCalculating={showBill} />
      <div className="main-content">
        {showIndexCarts ? (
          <IndexCarts carts={carts} onViewCart={handleViewCart} />
        ) : currentCartId && !showBill ? (
          <CartItem cartId={currentCartId} />
        ) : (
          currentCartId && showBill && <Bill cartId={currentCartId} onCartClosed={handleCartClosed} />
        )}
      </div>
      <RightSidebar
        onToggleView={handleToggleView}
        isCalculating={showBill}
        onOpenNewCart={handleOpenNewCart}
        onViewAllCarts={handleViewAllCarts}
      />
    </div>
  );
};

export default App;
