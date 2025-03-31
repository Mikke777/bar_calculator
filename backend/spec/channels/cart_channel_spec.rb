require 'rails_helper'

RSpec.describe CartChannel, type: :channel do
  let(:cart_id) { 1 }

  it 'successfully subscribes to the channel' do
    subscribe(cart_id: cart_id)

    expect(subscription).to be_confirmed
    expect(subscription).to have_stream_from("cart_#{cart_id}")
  end
end
