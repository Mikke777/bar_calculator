class Product < ApplicationRecord
  validates :name, presence: true
  validates :product_code, presence: true, uniqueness: true, format: { with: /\A[A-Z]{2}\d\z/ }
  validates :price, presence: true, numericality: { greater_than_or_equal_to: 0 }
end
