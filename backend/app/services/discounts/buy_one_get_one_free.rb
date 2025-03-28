module Discounts
  class BuyOneGetOneFree < BaseDiscount
    def apply
      return @cart_item.product.price * @cart_item.quantity unless @cart_item.product.product_code == 'GR1'

      quantity_to_pay = (@cart_item.quantity / 2.0).floor + (@cart_item.quantity % 2)
      @cart_item.product.price * quantity_to_pay
    end
  end
end
