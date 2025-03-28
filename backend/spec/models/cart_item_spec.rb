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

  it 'is valid with valid attributes' do
    cart = FactoryBot.create(:cart)
    product = FactoryBot.create(:product, price: 10.0)
    cart_item = FactoryBot.create(:cart_item, cart: cart, product: product, quantity: 3)

    expect(cart_item).to be_valid
    expect(cart_item.quantity).to eq(3)
    expect(cart_item.product.price).to eq(10.0)
  end
end
