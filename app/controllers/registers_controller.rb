class RegistersController < ApplicationController
  respond_to :json 
  skip_before_filter :verify_authenticity_token, :only => [:create , :update]

  def create
    comp = Company.new(params[:company])
    if comp.valid?
      comp.save
      render :json=> {:comp_id=> comp.id , :cycle=> "1" }  
    else
      show_error_json(comp.errors.messages)       
    end
  end
  
  def update
    comp = Company.find(params[:company][:id])
    if (params[:company].keys.include? "first_name") && (params[:company].keys.include? "last_name")
      comp.update_attributes(params[:company].except("id"))
      if comp.valid?
        user =  comp.users.last 
        session[:user_id] = user.id
        session[:user_name] = user.first_name
        session[:comp_id] =  comp.id 
        render :json=> {flag:true , session_id: session[:user_id] , :user_name=> session[:user_name] }
      else
        show_error_json(comp.errors.messages)
      end  
    else
       comp.errors.add(:first_name , "can't be left blank")
       comp.errors.add(:last_name , "can't be left blank") 
       show_error_json(comp.errors.messages)
    end
    
     
  end
  
end
