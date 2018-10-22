Rails.application.routes.draw do
  resources :tables
  resources :reservations
  resources :hosts
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
