require 'rails_helper'

RSpec.describe Product, type: :model do
  describe 'validations' do
    it 'is valid with a name, product_code, and price' do
      product = FactoryBot.build(:product)
      expect(product).to be_valid
    end

    it 'is invalid without a name' do
      product = FactoryBot.build(:product, name: nil)
      expect(product).not_to be_valid
    end

    it 'is invalid without a product_code' do
      product = FactoryBot.build(:product, product_code: nil)
      expect(product).not_to be_valid
    end

    it 'is invalid without a price' do
      product = FactoryBot.build(:product, price: nil)
      expect(product).not_to be_valid
    end

    it 'is invalid if the product_code is not unique' do
      FactoryBot.create(:product, product_code: 'GR1')
      duplicate_product = FactoryBot.build(:product, product_code: 'GR1')
      expect(duplicate_product).not_to be_valid
    end

    it 'is invalid if the price is not a number' do
      product = FactoryBot.build(:product, price: 'not_a_number')
      expect(product).not_to be_valid
    end

    it 'is invalid if the price is less than 0' do
      product = FactoryBot.build(:product, price: -1.0)
      expect(product).not_to be_valid
    end

    it 'is invalid if the product_code does not match the required format' do
      product = FactoryBot.build(:product, product_code: '123')
      expect(product).not_to be_valid
    end
  end
end
