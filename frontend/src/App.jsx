import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import RightSidebar from "./components/RightSidebar";
import CartItem from "./pages/CartItem";
import { fetchCarts, createCart } from "./api";
import "./App.css";

const App = () => {
  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentCartId, setCurrentCartId] = useState(null);
  const navigate = useNavigate();

  console.log("Current Cart ID in App:", currentCartId);


  useEffect(() => {
    const loadCarts = async () => {
      try {
        const data = await fetchCarts();
        if (data.length > 0) {
          setCarts(data);
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
      setCarts([newCart]);
      setCurrentCartId(newCart.id);
      navigate(`/cart/${newCart.id}`);
    } catch (error) {
      console.error("Error creating a new cart:", error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="app">
      {currentCartId === null && (
        <div className="overlay">
          <div className="modal">
            <p style={{ color: "black" }}>
              Cart is not open. If you want to open a new cart, click below:
            </p>
            <button onClick={handleOpenNewCart}>Open New Cart</button>
          </div>
        </div>
      )}
      <Sidebar cartId={currentCartId} />
      <div className="main-content">
        {currentCartId && <CartItem cartId={currentCartId} />}
      </div>
      <RightSidebar />
    </div>
  );
};

export default App;
