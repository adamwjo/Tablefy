class ReservationsController < ApplicationController
  def index
    render json: Reservation.all
  end

  def show
    render json: Reservation.find(params[:id])
  end

  def create
    Reservation.create(reservation_params)
  end

  private

  def reservation_params
    params.require(:reservation).permit(:name, :telephone_number, :date_of_reservation, :num_of_people, :table_id)
  end
end
