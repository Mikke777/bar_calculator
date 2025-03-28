class CartPricingCalculator
  DISCOUNTS = [
    Discounts::BuyOneGetOneFree,
    Discounts::BulkDiscount,
    Discounts::PriceReduction
  ]

  def initialize(cart)
    @cart = cart
  end

  def total_price
    @cart.cart_items.includes(:product).sum do |item|
      apply_discounts(item)
    end
  end

  private

  def apply_discounts(cart_item)
    DISCOUNTS.each do |discount_class|
      discount = discount_class.new(cart_item)
      discounted_price = discount.apply

      if discounted_price < cart_item.product.price * cart_item.quantity
        return discounted_price
      end
    end
    cart_item.product.price * cart_item.quantity
  end
end
