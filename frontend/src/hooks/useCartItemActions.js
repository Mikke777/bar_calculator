import { addProductToCart, updateCartItem, deleteCartItem } from "../api";

const useCartItemActions = (cartId) => {
  const handleAddToCart = async (productId) => {
    try {
      if (!cartId) {
        console.error("No cart ID available");
        return;
      }

      await addProductToCart(cartId, productId);
    } catch (err) {
      console.error("Error adding product to cart:", err);
    }
  };

  const handleIncreaseQuantity = async (item) => {
    try {
      await updateCartItem(cartId, item.id, item.quantity + 1);
    } catch (err) {
      console.error("Error increasing quantity:", err);
    }
  };

  const handleDecreaseQuantity = async (item) => {
    try {
      if (item.quantity > 1) {
        await updateCartItem(cartId, item.id, item.quantity - 1);
      } else {
        await deleteCartItem(cartId, item.id);
      }
    } catch (err) {
      console.error("Error decreasing quantity:", err);
    }
  };

  const handleRemoveItem = async (item) => {
    try {
      await deleteCartItem(cartId, item.id);
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  return {
    handleAddToCart,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
    handleRemoveItem,
  };
};

export default useCartItemActions;
