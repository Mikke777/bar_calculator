module Discounts
  class PriceReduction < BaseDiscount
    def apply
      return @cart_item.product.price * @cart_item.quantity unless @cart_item.product.product_code == "CF1" && @cart_item.quantity >= 3

      Money.default_infinite_precision = true

      discounted_price_per_item = Money.new((@cart_item.product.price.cents * 2.0 / 3).round, @cart_item.product.price.currency.iso_code)

      total_discounted_price = discounted_price_per_item * @cart_item.quantity

      total_discounted_price
    end
  end
end
