class Api::V1::ProductsController < ApplicationController
  def index
    products = Product.all
    render json: products.as_json(only: [ :id, :name, :product_code, :price_cents ], methods: [ :formatted_price ])
  end
end
