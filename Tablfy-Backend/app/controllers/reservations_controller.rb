class ReservationsController < ApplicationController
  def index
    render json: Reservation.all
  end

  def show
    render json: Reservation.find(params[:id])
  end

  def create
    render json: Reservation.create(reservation_params)
  end

  def destroy
    render json: Reservation.find(params[:id]).destroy
  end

  def update
    render json: Reservation.find(params[:id]).update(reservation_params) 

  end

  private

  def reservation_params
    params.require(:reservation).permit(:name, :telephone_number, :date_of_reservation, :num_of_people, :table_id, :time)
  end
end
