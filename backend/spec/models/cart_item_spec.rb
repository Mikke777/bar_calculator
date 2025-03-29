require 'rails_helper'

RSpec.describe CartItem, type: :model do
  describe 'associations' do
    it { is_expected.to belong_to(:cart) }
    it { is_expected.to belong_to(:product) }
  end

  describe 'validations' do
    it { is_expected.to validate_presence_of(:quantity) }
    it { is_expected.to validate_numericality_of(:quantity).is_greater_than(0) }
  end

  describe 'factory' do
    it 'has a valid factory' do
      cart_item = FactoryBot.build(:cart_item)
      expect(cart_item).to be_valid
    end
  end

  it 'is valid with valid attributes' do
    product = FactoryBot.create(:product, price_cents: 1000)
    cart_item = FactoryBot.create(:cart_item, product: product, quantity: 1)

    expect(cart_item).to be_valid
    expect(cart_item.product.price).to eq(Money.new(1000, 'EUR'))
  end
end
