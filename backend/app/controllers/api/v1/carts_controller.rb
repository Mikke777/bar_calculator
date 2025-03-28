class Api::V1::CartsController < ApplicationController
  def index
    carts = Cart.includes(:cart_items, :products).all
    render json: carts.as_json(include: { cart_items: { include: :product } })
  end

  def show
    cart = Cart.includes(:cart_items, :products).find_by(id: params[:id])
    if cart
      render json: cart.as_json(include: { cart_items: { include: :product } })
    else
      render json: { error: "Cart not found" }, status: :not_found
    end
  end

  def create
    cart = Cart.new
    if cart.save
      render json: cart.as_json(include: { cart_items: { include: :product } }), status: :created
    else
      render json: { errors: [ "Failed to create cart" ] }, status: :unprocessable_entity
    end
  end
end
