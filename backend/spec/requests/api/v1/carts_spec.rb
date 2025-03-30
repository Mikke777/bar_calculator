require 'rails_helper'

RSpec.describe 'Carts API', type: :request do
  let!(:product1) { FactoryBot.create(:product, name: 'Product 1', price_cents: 1000, product_code: 'PR1') }
  let!(:product2) { FactoryBot.create(:product, name: 'Product 2', price_cents: 2000, product_code: 'PR2') }

  describe 'GET /api/v1/carts' do
    it 'returns a list of carts with their items and products' do
      cart = FactoryBot.create(:cart)
      FactoryBot.create(:cart_item, cart: cart, product: product1, quantity: 2)
      FactoryBot.create(:cart_item, cart: cart, product: product2, quantity: 1)

      get '/api/v1/carts'

      expect(response).to have_http_status(:success)
      json = JSON.parse(response.body)
      expect(json.size).to eq(1)
      expect(json[0]['cart_items'].size).to eq(2)
      expect(json[0]['cart_items'][0]['product']['name']).to eq('Product 1')
      expect(json[0]['cart_items'][0]['quantity']).to eq(2)
      expect(json[0]['cart_items'][1]['product']['name']).to eq('Product 2')
      expect(json[0]['cart_items'][1]['quantity']).to eq(1)
    end

    it 'returns an empty array if no carts exist' do
      get '/api/v1/carts'

      expect(response).to have_http_status(:success)
      json = JSON.parse(response.body)
      expect(json).to eq([])
    end
  end

  describe 'GET /api/v1/carts/:id' do
    it 'returns a cart with its items and products' do
      cart = FactoryBot.create(:cart)
      FactoryBot.create(:cart_item, cart: cart, product: product1, quantity: 2)
      FactoryBot.create(:cart_item, cart: cart, product: product2, quantity: 1)

      get "/api/v1/carts/#{cart.id}"

      expect(response).to have_http_status(:success)
      json = JSON.parse(response.body)
      expect(json['cart_items'].size).to eq(2)
      expect(json['cart_items'][0]['product']['name']).to eq('Product 1')
      expect(json['cart_items'][0]['quantity']).to eq(2)
      expect(json['cart_items'][1]['product']['name']).to eq('Product 2')
      expect(json['cart_items'][1]['quantity']).to eq(1)
    end

    it 'returns a 404 error if the cart does not exist' do
      get '/api/v1/carts/9999'

      expect(response).to have_http_status(:not_found)
      json = JSON.parse(response.body)
      expect(json['error']).to eq('Cart not found')
    end

    it 'handles a cart with no items gracefully' do
      cart = FactoryBot.create(:cart)

      get "/api/v1/carts/#{cart.id}"

      expect(response).to have_http_status(:success)
      json = JSON.parse(response.body)
      expect(json['cart_items']).to eq([])
    end
  end

  describe 'POST /api/v1/carts' do
    it 'creates a new cart' do
      post '/api/v1/carts'

      expect(response).to have_http_status(:created)
      json = JSON.parse(response.body)
      expect(json['id']).not_to be_nil
    end

    it 'creates a new empty cart' do
      post '/api/v1/carts'

      expect(response).to have_http_status(:created)
      json = JSON.parse(response.body)
      expect(json['id']).not_to be_nil
      expect(json['cart_items']).to eq([])
    end

    it 'returns an error if the cart cannot be created' do
      allow_any_instance_of(Cart).to receive(:save).and_return(false)

      post '/api/v1/carts'

      expect(response).to have_http_status(:unprocessable_entity)
      json = JSON.parse(response.body)
      expect(json['errors']).to eq([ 'Failed to create cart' ])
    end
  end

  describe 'DELETE /api/v1/carts/:id' do
    let!(:cart) { FactoryBot.create(:cart) }

    it 'deletes the cart successfully' do
      delete "/api/v1/carts/#{cart.id}"

      expect(response).to have_http_status(:ok)
      json = JSON.parse(response.body)
      expect(json['message']).to eq('Cart successfully deleted')
      expect(Cart.find_by(id: cart.id)).to be_nil
    end

    it 'returns a 404 error if the cart does not exist' do
      delete '/api/v1/carts/9999'

      expect(response).to have_http_status(:not_found)
      json = JSON.parse(response.body)
      expect(json['error']).to eq('Cart not found')
    end
  end
end
