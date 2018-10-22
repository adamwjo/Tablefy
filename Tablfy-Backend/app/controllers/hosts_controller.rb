class HostsController < ApplicationController
  def index
    render json: Host.all
  end

  def show
    render json: Host.find(params[:id])
  end
end
