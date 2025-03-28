module Discounts
  class BulkDiscount < BaseDiscount
    def apply
      if @cart_item.product.product_code == 'SR1' && @cart_item.quantity >= 3
        return Money.new(450, 'EUR') * @cart_item.quantity
      end

      @cart_item.product.price * @cart_item.quantity
    end
  end
end
