# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.firs
Host.destroy_all
Reservation.destroy_all
Table.destroy_all

mrguy = Host.create(name: "Adam", shift: "Dinner")
msgirl = Host.create(name: "Sarah", shift: "Lunch")
mrperson = Host.create(name: "Heero", shift: "Breakfast")


table1 = Table.create(size: 4)
table2 = Table.create(size: 2)
table3 = Table.create(size: 2)
table4 = Table.create(size: 6)
table5 = Table.create(size: 10)
table6 = Table.create(size: 5)
table7 = Table.create(size: 5)
table8 = Table.create(size: 2)


reservation1 = Reservation.create(name: "Johnson", telephone_number: "212-555-0101", date_of_reservation: "10/31/18", time: "5:00PM", num_of_people: 4, table_id: table1.id)

reservation1 = Reservation.create(name: "Scully", telephone_number: "212-555-0101", date_of_reservation: "10/31/18", time: "9:15PM", num_of_people: 2, table_id: table2.id)

reservation1 = Reservation.create(name: "Parker", telephone_number: "212-555-0101", date_of_reservation: "10/31/18", time: "7:15PM", num_of_people: 3, table_id: table6.id)

reservation1 = Reservation.create(name: "Kent", telephone_number: "212-555-0101", date_of_reservation: "10/31/18", time: "8:00PM", num_of_people: 7, table_id: table5.id)

reservation1 = Reservation.create(name: "Batson", telephone_number: "212-555-0101", date_of_reservation: "10/31/18", time: "5:45PM", num_of_people: 2, table_id: table8.id)

reservation1 = Reservation.create(name: "Prince", telephone_number: "212-555-0101", date_of_reservation: "10/31/18", time: "7:30PM", num_of_people: 3, table_id: table1.id)

reservation1 = Reservation.create(name: "Wayne", telephone_number: "212-555-0101", date_of_reservation: "10/31/18", time: "5:00PM", num_of_people: 5, table_id: table3.id)
