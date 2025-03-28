FactoryBot.define do
  factory :product do
    name { Faker::Commerce.product_name }
    product_code { "#{Faker::Alphanumeric.alpha(number: 2).upcase}#{Faker::Number.digit}" }
    price { Faker::Commerce.price(range: 1.0..100.0, as_string: false) }
  end
end
