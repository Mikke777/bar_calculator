class CartPricingCalculator
  DISCOUNTS = [
    Discounts::BuyOneGetOneFree,
    Discounts::BulkDiscount,
    Discounts::PriceReduction
  ]

  def initialize(cart)
    @cart = cart
    @discounted_prices = {}
  end

  def total_price
    total_cents = @cart.cart_items.includes(:product).sum do |item|
      discounted_price_for(item)
    end

    Money.new(total_cents.round, 'EUR')
  end

  def discounted_price_for(cart_item)
    @discounted_prices[cart_item.id] ||= apply_discounts(cart_item)
  end

  private

  def apply_discounts(cart_item)
    DISCOUNTS.each do |discount_class|
      discount = discount_class.new(cart_item)
      discounted_price = discount.apply

      if discounted_price < cart_item.product.price * cart_item.quantity
        return discounted_price.cents
      end
    end
    cart_item.product.price.cents * cart_item.quantity
  end
end
