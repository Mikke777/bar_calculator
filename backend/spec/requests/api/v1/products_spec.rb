require 'rails_helper'

RSpec.describe 'Products API', type: :request do
  describe 'GET /api/v1/products' do
    let!(:products) { FactoryBot.create_list(:product, 2) }

    it 'returns a list of products' do
      get '/api/v1/products'

      expect(response).to have_http_status(:success)
      json = JSON.parse(response.body)

      expect(json.size).to eq(products.size)
      products.each_with_index do |product, index|
        expect(json[index]['name']).to eq(product.name)
        expect(json[index]['formatted_price']).to eq(Money.new(product.price_cents, 'EUR').format)
        expect(json[index]['product_code']).to eq(product.product_code)
      end
    end

    it 'returns an empty array if no products exist' do
      Product.delete_all

      get '/api/v1/products'

      expect(response).to have_http_status(:success)
      json = JSON.parse(response.body)
      expect(json).to eq([])
    end
  end
end
