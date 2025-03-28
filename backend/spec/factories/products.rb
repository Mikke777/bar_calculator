FactoryBot.define do
  factory :product do
    name { Faker::Commerce.product_name }
    product_code { "#{Faker::Alphanumeric.alpha(number: 2).upcase}#{Faker::Number.digit}" }
    price_cents { Faker::Number.between(from: 100, to: 10_000) }
  end
end
