class RenamePriceToPriceCentsInProducts < ActiveRecord::Migration[7.2]
  def change
    rename_column :products, :price, :price_cents
    change_column :products, :price_cents, :integer
  end
end
