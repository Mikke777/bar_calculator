require 'rails_helper'

RSpec.describe 'Products API', type: :request do
  describe 'GET /api/v1/products' do
    it 'returns a list of products' do
      FactoryBot.create(:product, name: 'Product 1', price_cents: 311, product_code: 'GR1')
      FactoryBot.create(:product, name: 'Product 2', price_cents: 500, product_code: 'SR1')

      get '/api/v1/products'

      expect(response).to have_http_status(:success)
      json = JSON.parse(response.body)
      expect(json.size).to eq(2)
      expect(json[0]['name']).to eq('Product 1')
      expect(json[0]['formatted_price']).to eq('3.11 €')
      expect(json[0]['product_code']).to eq('GR1')
      expect(json[1]['name']).to eq('Product 2')
      expect(json[1]['formatted_price']).to eq('5.00 €')
      expect(json[1]['product_code']).to eq('SR1')
    end

    it 'returns an empty array if no products exist' do
      get '/api/v1/products'

      expect(response).to have_http_status(:success)
      json = JSON.parse(response.body)
      expect(json).to eq([])
    end
  end
end
