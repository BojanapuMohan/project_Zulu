class ApplicationController < ActionController::Base

   protect_from_forgery with: :exception 
   helper_method :current_user
   # rescue_from ActiveRecord::RecordNotFound, with: :current_user

   
   def current_user
      @current_user ||= User.find(session[:user_id]) if session[:user_id]    
   end
  
   def authorize
    redirect_to '/' unless current_user
   end
   
   
   protected
   
   def find_company
     @company = Company.find(session["comp_id"])
   end
   
   private
   
   def show_error_json(error_arr , flag= false)
    error_msg = []
    error_arr.keys.each do |key|
      item= {}
      item[:error_name] = key.to_s.split("_").join(" ") 
      item[:error_msg] = error_arr[key].first
      error_msg << item 
    end
    render :json=>{:error => error_msg , :flag=> flag}
  end
end
