class TablesController < ApplicationController
  def index
    render json: Table.all
  end

  def update
    render json: Table.find(params[:id]).update(table_params)
  end

  private

  def table_params
    params.require(:table).permit(:id, :occupied, :size)
  end


end
