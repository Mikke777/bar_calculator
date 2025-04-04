# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
puts "Cleaning database..."
CartItem.destroy_all
Cart.destroy_all
Product.destroy_all
puts "Database cleaned"
puts "Creating products..."
Product.create([
  { product_code: "GR1", name: "Green Tea", price_cents: 311 },
  { product_code: "SR1", name: "Strawberries", price_cents: 500 },
  { product_code: "CF1", name: "Coffee", price_cents: 1123 }
])

puts "Seeded #{Product.count} products!"
