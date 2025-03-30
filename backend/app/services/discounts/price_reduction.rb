module Discounts
  class PriceReduction < BaseDiscount
    def apply
      return @cart_item.product.price * @cart_item.quantity unless @cart_item.product.product_code == "CF1" && @cart_item.quantity >= 3

      discounted_price_cents = (@cart_item.product.price.cents * Rational(2, 3)).round

      discounted_price_per_item = Money.new(discounted_price_cents, @cart_item.product.price.currency.iso_code)

      discounted_price_per_item * @cart_item.quantity
    end
  end
end
