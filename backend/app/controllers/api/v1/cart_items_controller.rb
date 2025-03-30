class Api::V1::CartItemsController < ApplicationController

  def index
    cart = Cart.find_by(id: params[:cart_id])

    if cart
      cart_items = cart.cart_items.includes(:product)
      render json: cart_items.as_json(
        only: [:id, :quantity],
        include: {
          product: {
            only: [:name, :price_cents],
            methods: [:formatted_price]
           }
        }
      )
    else
      render json: { error: "Cart not found" }, status: :not_found
    end
  end

  def create
    cart = Cart.find_by(id: params[:cart_id])
    product = Product.find_by(id: params[:product_id])

    if cart.nil?
      render json: { error: "Cart not found" }, status: :not_found
      return
    end

    if product
      cart_item = cart.cart_items.find_or_initialize_by(product: product)
      cart_item.quantity = (cart_item.quantity || 0) + params[:quantity].to_i

      if cart_item.save
        ActionCable.server.broadcast(
          "cart_#{cart.id}",
          cart.cart_items.as_json(
            only: [:id, :quantity],
            include: {
              product: {
                only: [:name, :price_cents],
                methods: [:formatted_price]
              }
            }
          )
        )

        render json: cart_item.as_json(include: :product), status: :created
      else
        render json: { errors: cart_item.errors.full_messages }, status: :unprocessable_entity
      end
    else
      render json: { error: "Product not found" }, status: :not_found
    end
  end

  def update
    cart_item = CartItem.find_by(id: params[:id])

    if cart_item
      cart_item.quantity = params[:quantity].to_i

      if cart_item.save
        ActionCable.server.broadcast(
          "cart_#{cart_item.cart.id}",
          cart_item.cart.cart_items.as_json(
            only: [:id, :quantity],
            include: {
              product: {
                only: [:name, :price_cents],
                methods: [:formatted_price]
              }
            }
          )
        )

        render json: cart_item.as_json(include: :product)
      else
        render json: { errors: cart_item.errors.full_messages }, status: :unprocessable_entity
      end
    else
      render json: { error: "CartItem not found" }, status: :not_found
    end
  end

  def destroy
    cart_item = CartItem.find_by(id: params[:id])

    if cart_item
      cart = cart_item.cart
      cart_item.destroy

      ActionCable.server.broadcast(
        "cart_#{cart.id}",
        cart.cart_items.as_json(
          only: [:id, :quantity],
          include: {
            product: {
              only: [:name, :price_cents],
              methods: [:formatted_price]
            }
          }
        )
      )

      render json: { message: "CartItem removed successfully" }, status: :ok
    else
      render json: { error: "CartItem not found" }, status: :not_found
    end
  end
end
