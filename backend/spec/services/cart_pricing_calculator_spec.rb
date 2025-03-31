require 'rails_helper'

RSpec.describe CartPricingCalculator, type: :service do
  describe '#total_price' do
    let!(:green_tea) { FactoryBot.create(:product, name: 'Green Tea', product_code: 'GR1', price_cents: 311) }
    let!(:strawberries) { FactoryBot.create(:product, name: 'Strawberries', product_code: 'SR1', price_cents: 500) }
    let!(:coffee) { FactoryBot.create(:product, name: 'Coffee', product_code: 'CF1', price_cents: 1123) }

    it 'applies buy-one-get-one-free for green tea (GR1)' do
      cart = FactoryBot.create(:cart)
      FactoryBot.create(:cart_item, cart: cart, product: green_tea, quantity: 2)

      expected_price = Money.new(green_tea.price_cents, 'EUR')
      calculator = CartPricingCalculator.new(cart)

      expect(calculator.total_price).to eq(expected_price)
    end

    it 'applies bulk discount for strawberries (SR1)' do
      cart = FactoryBot.create(:cart)
      FactoryBot.create(:cart_item, cart: cart, product: strawberries, quantity: 3)

      discounted_price_per_item = 450
      expected_price = Money.new(discounted_price_per_item * 3, 'EUR')
      calculator = CartPricingCalculator.new(cart)

      expect(calculator.total_price).to eq(expected_price)
    end

    it 'applies price reduction for coffee (CF1)' do
      cart = FactoryBot.create(:cart)
      FactoryBot.create(:cart_item, cart: cart, product: coffee, quantity: 3)

      discounted_price_per_item = (coffee.price_cents * Rational(2, 3))
      expected_price = Money.new(discounted_price_per_item * 3, 'EUR')
      calculator = CartPricingCalculator.new(cart)

      expect(calculator.total_price).to eq(expected_price)
    end

    it 'returns zero for an empty cart' do
      cart = FactoryBot.create(:cart)

      expected_price = Money.new(0, 'EUR')
      calculator = CartPricingCalculator.new(cart)

      expect(calculator.total_price).to eq(expected_price)
    end

    it 'calculates the total price correctly for a large quantity' do
      cart = FactoryBot.create(:cart)
      FactoryBot.create(:cart_item, cart: cart, product: coffee, quantity: 10_000)

      discounted_price_per_item = (coffee.price_cents * Rational(2, 3))
      expected_total_price_cents = discounted_price_per_item * 10_000
      expected_price = Money.new(expected_total_price_cents, 'EUR')

      calculator = CartPricingCalculator.new(cart)

      expect(calculator.total_price).to eq(expected_price)
    end

    it 'calculates the total price for a product without discounts' do
      non_discounted_product = FactoryBot.create(:product, name: 'Water Bottle', product_code: 'WB1', price_cents: 150)
      cart = FactoryBot.create(:cart)
      FactoryBot.create(:cart_item, cart: cart, product: non_discounted_product, quantity: 5)

      expected_price = Money.new(non_discounted_product.price_cents * 5, 'EUR')
      calculator = CartPricingCalculator.new(cart)

      expect(calculator.total_price).to eq(expected_price)
    end
  end
end
