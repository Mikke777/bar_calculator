require 'rails_helper'

RSpec.describe Cart, type: :model do
  describe 'associations' do
    it { is_expected.to have_many(:cart_items).dependent(:destroy) }
    it { is_expected.to have_many(:products).through(:cart_items) }
  end

  describe 'methods' do
    it 'delegates total price calculation to CartPricingCalculator' do
      cart = FactoryBot.create(:cart)
      calculator = instance_double(CartPricingCalculator, total_price: Money.new(3000, 'EUR'))

      expect(CartPricingCalculator).to receive(:new).with(cart).and_return(calculator)
      expect(calculator).to receive(:total_price)

      total_price = cart.total_price

      expect(total_price).to eq(Money.new(3000, 'EUR'))
    end
  end
end
