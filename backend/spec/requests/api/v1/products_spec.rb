require 'rails_helper'

RSpec.describe 'Products API', type: :request do
  describe 'GET /api/v1/products' do
    it 'returns a list of products' do
      # Arrange: Create some products
      FactoryBot.create(:product, name: 'Product 1', price_cents: 311, product_code: 'GR1')
      FactoryBot.create(:product, name: 'Product 2', price_cents: 500, product_code: 'SR1')

      # Act: Make a GET request to the index action
      get '/api/v1/products'

      # Assert: Check the response
      expect(response).to have_http_status(:success) # HTTP 200
      json = JSON.parse(response.body)
      expect(json.size).to eq(2)
      expect(json[0]['name']).to eq('Product 1')
      expect(json[0]['formatted_price']).to eq('3.11 €') # Updated to check formatted_price with a period
      expect(json[0]['product_code']).to eq('GR1')
      expect(json[1]['name']).to eq('Product 2')
      expect(json[1]['formatted_price']).to eq('5.00 €') # Updated to check formatted_price with a period
      expect(json[1]['product_code']).to eq('SR1')
    end

    it 'returns an empty array if no products exist' do
      # Act: Make a GET request to the index action
      get '/api/v1/products'

      # Assert: Check the response
      expect(response).to have_http_status(:success) # HTTP 200
      json = JSON.parse(response.body)
      expect(json).to eq([])
    end
  end
end
