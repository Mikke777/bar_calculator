module Discounts
  class BaseDiscount
    def initialize(cart_item)
      @cart_item = cart_item
    end

    def apply
      raise NotImplementedError, "Subclasses must implement the apply method"
    end
  end
end
