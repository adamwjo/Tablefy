# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2018_10_24_125253) do

  create_table "hosts", force: :cascade do |t|
    t.string "name"
    t.string "shift"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "reservations", force: :cascade do |t|
    t.string "name"
    t.string "telephone_number"
    t.string "date_of_reservation"
    t.integer "num_of_people"
    t.integer "table_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "time"
  end

  create_table "tables", force: :cascade do |t|
    t.boolean "occupied", default: false
    t.integer "size"
    t.string "walked_in_at"
    t.string "walked_out_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
