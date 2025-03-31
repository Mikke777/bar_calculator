export const formatPrice = (price) => {
  if (!price || typeof price.cents !== "number") {
    return "€0.00";
  }
  return `${(price.cents / 100).toFixed(2)}€`;
};
