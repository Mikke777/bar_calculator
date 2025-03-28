require 'rails_helper'

RSpec.describe Cart, type: :model do
  describe 'associations' do
    it { is_expected.to have_many(:cart_items).dependent(:destroy) }
    it { is_expected.to have_many(:products).through(:cart_items) }
  end

  describe 'methods' do
    it 'calculates the total price of all items in the cart' do
      cart = FactoryBot.create(:cart)
      product = FactoryBot.create(:product, price: 10.0)
      FactoryBot.create(:cart_item, cart: cart, product: product, quantity: 3)

      total_price = CartPricingCalculator.new(cart).total_price
      expect(total_price).to eq(30.0)
    end
  end
end
