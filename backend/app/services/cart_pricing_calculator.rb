class CartPricingCalculator
  def initialize(cart)
    @cart = cart
  end

  def total_price
    @cart.cart_items.includes(:product).sum do |item|
      item.product.price * item.quantity
    end
  end
end
