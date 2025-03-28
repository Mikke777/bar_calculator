class Product < ApplicationRecord
  validates :name, presence: true
  validates :product_code, presence: true, uniqueness: true, format: { with: /\A[A-Z]{2}\d\z/ }
  monetize :price_cents, as: :price, numericality: { greater_than_or_equal_to: 0 }

  def formatted_price
    price.format(
      symbol: true,
      format: "%n %u",
      decimal_mark: ".",
      thousands_separator: ""
    )
  end
end
