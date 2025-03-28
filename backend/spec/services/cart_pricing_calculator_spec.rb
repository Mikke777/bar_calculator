require 'rails_helper'

RSpec.describe CartPricingCalculator, type: :service do
  describe '#total_price' do
    it 'calculates the total price of all items in the cart' do
      cart = FactoryBot.create(:cart)
      product1 = FactoryBot.create(:product, price_cents: 1000)
      product2 = FactoryBot.create(:product, price_cents: 2000)
      FactoryBot.create(:cart_item, cart: cart, product: product1, quantity: 2)
      FactoryBot.create(:cart_item, cart: cart, product: product2, quantity: 1)

      calculator = CartPricingCalculator.new(cart)
      total_price = calculator.total_price

      expect(total_price).to eq(Money.new(4000, 'EUR'))
    end

    it 'returns zero if the cart has no items' do
      cart = FactoryBot.create(:cart)

      calculator = CartPricingCalculator.new(cart)
      total_price = calculator.total_price

      expect(total_price).to eq(Money.new(0, 'EUR'))
    end
  end
end
