class CartChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    stream_from "cart_#{params[:cart_id]}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
