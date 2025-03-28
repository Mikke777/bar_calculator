class Cart < ApplicationRecord
  has_many :cart_items, dependent: :destroy
  has_many :products, through: :cart_items

  def total_price
    CartPricingCalculator.new(self).total_price
  end
end
