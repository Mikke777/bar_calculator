import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCarts, createCart } from "../api";

const useCartManager = () => {
  const [carts, setCarts] = useState([]);
  const [currentCartId, setCurrentCartId] = useState(null);
  const [showBill, setShowBill] = useState(false);
  const [showIndexCarts, setShowIndexCarts] = useState(false);
  const [loading, setLoading] = useState(true);
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

  return {
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
  };
};

export default useCartManager;
