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

  def calculate_total
    cart = Cart.find_by(id: params[:id])

    if cart
      calculator = CartPricingCalculator.new(cart)
      render json: {
        total_price: {
          cents: calculator.total_price.cents.to_i,
          currency_iso: calculator.total_price.currency.iso_code
        },
        cart_items: cart.cart_items.map do |item|
          discounted_price = Money.new(calculator.discounted_price_for(item), 'EUR')
          {
            id: item.id,
            product: {
              product_code: item.product.product_code,
              name: item.product.name,
              price: {
                cents: item.product.price.cents.to_i,
                currency_iso: 'EUR'
              }
            },
            quantity: item.quantity,
            discounted_price: {
              cents: discounted_price.cents.to_i,
              currency_iso: discounted_price.currency.iso_code
            }
          }
        end
      }
    else
      render json: { error: "Cart not found" }, status: :not_found
    end
  end
end
