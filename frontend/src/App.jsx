import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import RightSidebar from "./components/RightSidebar";
import CartItem from "./pages/CartItem";
import Bill from "./pages/Bill";
import IndexCarts from "./pages/IndexCarts";
import { fetchCarts, createCart } from "./api";
import "./App.css";

const App = () => {
  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentCartId, setCurrentCartId] = useState(null);
  const [showBill, setShowBill] = useState(false);
  const [showIndexCarts, setShowIndexCarts] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadCarts = async () => {
      try {
        const data = await fetchCarts();
        setCarts(data);
        if (data.length > 0) {
          setCurrentCartId(data[0].id);
        }
      } catch (error) {
        console.error("Error fetching carts:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCarts();
  }, []);

  const handleOpenNewCart = async () => {
    try {
      const newCart = await createCart();
      setCarts((prevCarts) => [...prevCarts, newCart]);
      setCurrentCartId(newCart.id);
      setShowIndexCarts(false);
      navigate(`/cart/${newCart.id}`);
    } catch (error) {
      console.error("Error creating a new cart:", error);
    }
  };

  const handleToggleView = () => {
    setShowBill((prev) => !prev);
    setShowIndexCarts(false);
  };

  const handleViewAllCarts = () => {
    setShowIndexCarts(true);
    setShowBill(false);
    setCurrentCartId(null);
  };

  const handleViewCart = (cartId) => {
    setCurrentCartId(cartId);
    setShowIndexCarts(false);
    navigate(`/cart/${cartId}`);
  };

  const handleCartClosed = () => {
    const remainingCarts = carts.filter((cart) => cart.id !== currentCartId);
    setCarts(remainingCarts);
    setCurrentCartId(null);
    setShowBill(false);

    if (remainingCarts.length > 0) {
      setShowIndexCarts(true);
    } else {
      setShowIndexCarts(false);
    }
  };

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
