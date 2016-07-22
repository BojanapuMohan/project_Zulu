class AuthenticationController < ApplicationController
  respond_to :json 
  skip_before_filter :verify_authenticity_token, :only => :login
  
  
  def sign_in
    @user = User.new
  end



  def login
    if params[:email].present? && params[:password].present?
      username_or_email = params[:email]
      password = params[:password]
      
      if username_or_email.include?('@')
        email=username_or_email
        user = User.authenticate_by_email(email, password)
      else
        username=username_or_email
        user = User.authenticate_by_username(username, password)
      end
  
      respond_to do |format|
        if user
          session[:user_id] = user.id
          session[:user_name] = user.first_name
          session[:comp_id] = user.company.id
          @result = {flag: true, user_id: user.id}
          format.any(:xml, :json) { render request.format.to_sym => @result } 
        else
          @result = {flag: false}
          format.any(:xml, :json) { render request.format.to_sym => @result }
        end  
      end
    else
      @result = {flag: false }
      render :json=> @result
    end
  end
  
  
#   method to get session at front end 
  def get_session
    begin
      if session[:user_id].present? && session[:user_name].present? && current_user.present?
        unless session[:comp_id].present?
          @result = {flag:true , session_id: session[:user_id] , :user_name=> session[:user_name]} 
        else
          @result = {flag:true , session_id: session[:user_id] , :user_name=> session[:user_name] , :comp_id=> session[:comp_id]}
        end 
        render :json=>@result
      else 
        reset_session 
        @result = {flag:false}
        render :json=>@result
      end  
    rescue Exception=> e
      reset_session 
      @result = {flag:false}
      render :json=>@result
    end
    
  end
  
  def signed_out
    reset_session
    render :json=>{flag: false}
  end
  
end
