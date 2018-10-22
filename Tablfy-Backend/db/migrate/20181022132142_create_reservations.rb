class CreateReservations < ActiveRecord::Migration[5.2]
  def change
    create_table :reservations do |t|
      t.string :name
      t.string :telephone_number
      t.datetime :date_of_reservation
      t.integer :num_of_people
      t.integer :table_id
      t.timestamps
    end
  end
end
