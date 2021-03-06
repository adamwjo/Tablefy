class CreateTables < ActiveRecord::Migration[5.2]
  def change
    create_table :tables do |t|
      t.boolean :occupied, :default => false
      t.integer :size
      t.string :walked_in_at
      t.string :walked_out_at
      t.timestamps
    end
  end
end
