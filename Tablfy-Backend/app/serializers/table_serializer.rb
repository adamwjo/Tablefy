class TableSerializer < ActiveModel::Serializer
  attributes :id, :occupied, :size
  has_many :reservations
end
