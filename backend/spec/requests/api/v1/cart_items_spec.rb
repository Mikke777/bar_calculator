require 'rails_helper'

RSpec.describe "Api::V1::CartItems", type: :request do
  let!(:cart) { FactoryBot.create(:cart) }
  let!(:product) { FactoryBot.create(:product, name: "Coffee", price_cents: 1123) }
  let!(:product1) { FactoryBot.create(:product, name: "Green Tea", price_cents: 311) }
  let!(:product2) { FactoryBot.create(:product, name: "Strawberries", price_cents: 500) }

  describe "GET /api/v1/carts/:cart_id/cart_items" do
    context "when the cart exists and has items" do
      before do
        FactoryBot.create(:cart_item, cart: cart, product: product1, quantity: 2)
        FactoryBot.create(:cart_item, cart: cart, product: product2, quantity: 1)
      end

      it "returns the cart items with product details" do
        get "/api/v1/carts/#{cart.id}/cart_items"

        expect(response).to have_http_status(:ok)
        json = JSON.parse(response.body)

        expect(json.length).to eq(2)

        expect(json[0]["product"]["name"]).to eq("Green Tea")
        expect(json[0]["product"]["price_cents"]).to eq(311)
        expect(json[0]["quantity"]).to eq(2)

        expect(json[1]["product"]["name"]).to eq("Strawberries")
        expect(json[1]["product"]["price_cents"]).to eq(500)
        expect(json[1]["quantity"]).to eq(1)
      end
    end

    context "when the cart exists but has no items" do
      it "returns an empty array" do
        get "/api/v1/carts/#{cart.id}/cart_items"

        expect(response).to have_http_status(:ok)
        json = JSON.parse(response.body)

        expect(json).to eq([])
      end
    end

    context "when the cart does not exist" do
      it "returns an error" do
        get "/api/v1/carts/9999/cart_items"

        expect(response).to have_http_status(:not_found)
        json = JSON.parse(response.body)

        expect(json["error"]).to eq("Cart not found")
      end
    end
  end

  describe "POST /api/v1/carts/:cart_id/cart_items" do
    it "adds a product to the cart" do
      quantity = Faker::Number.between(from: 1, to: 10)

      post "/api/v1/carts/#{cart.id}/cart_items", params: {
        product_id: product.id,
        quantity: quantity
      }

      expect(response).to have_http_status(:created)
      json = JSON.parse(response.body)

      expect(json["product"]["id"]).to eq(product.id)
      expect(json["quantity"]).to eq(quantity)
    end

    it "returns an error if the product does not exist" do
      post "/api/v1/carts/#{cart.id}/cart_items", params: {
        product_id: 9999,
        quantity: 1
      }

      expect(response).to have_http_status(:not_found)
      json = JSON.parse(response.body)

      expect(json["error"]).to eq("Product not found")
    end
  end

  describe "PUT /api/v1/carts/:cart_id/cart_items/:id" do
    it "updates the quantity of a product in the cart" do
      cart_item = FactoryBot.create(:cart_item, cart: cart, product: product, quantity: 1)
      new_quantity = Faker::Number.between(from: 2, to: 20)

      put "/api/v1/carts/#{cart.id}/cart_items/#{cart_item.id}", params: {
        quantity: new_quantity
      }

      expect(response).to have_http_status(:success)
      json = JSON.parse(response.body)

      expect(json["id"]).to eq(cart_item.id)
      expect(json["quantity"]).to eq(new_quantity)
    end

    it "returns an error if the cart item does not exist" do
      put "/api/v1/carts/#{cart.id}/cart_items/9999", params: {
        quantity: 5
      }

      expect(response).to have_http_status(:not_found)
      json = JSON.parse(response.body)

      expect(json["error"]).to eq("CartItem not found")
    end
  end

  describe "DELETE /api/v1/carts/:cart_id/cart_items/:id" do
    it "removes a product from the cart" do
      cart_item = FactoryBot.create(:cart_item, cart: cart, product: product)

      delete "/api/v1/carts/#{cart.id}/cart_items/#{cart_item.id}"

      expect(response).to have_http_status(:ok)
      json = JSON.parse(response.body)

      expect(json["message"]).to eq("CartItem removed successfully")
      expect(CartItem.exists?(cart_item.id)).to be_falsey
    end

    it "returns an error if the cart item does not exist" do
      delete "/api/v1/carts/#{cart.id}/cart_items/9999"

      expect(response).to have_http_status(:not_found)
      json = JSON.parse(response.body)

      expect(json["error"]).to eq("CartItem not found")
    end
  end
end
