module Discounts
  class PriceReduction < BaseDiscount
    def apply
      return @cart_item.product.price * @cart_item.quantity unless @cart_item.product.product_code == "CF1" && @cart_item.quantity >= 3

      discounted_price_cents = (@cart_item.product.price.cents * Rational(2, 3))

      total_discounted_price_cents = discounted_price_cents * @cart_item.quantity

      Money.new(total_discounted_price_cents, @cart_item.product.price.currency.iso_code)
    end
  end
end
