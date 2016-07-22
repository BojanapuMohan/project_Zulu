class PaymentTypesController < ApplicationController
  respond_to :json
  before_filter :authorize
  before_action :find_company , :only =>[:index , :new  , :create ]
  
  before_action :get_payment_type , :only =>[:edit , :update  , :destroy ]
  
  
  def index
    payment_types = @company.payment_types.select("id , name")
    render :json=> payment_types  
  end
  
   
  def create 
    payment_type = @company.payment_types.build(:name=> params[:payment_type][:name])
    if payment_type.valid?
      payment_type.save
      result ={flag: true , :id=> payment_type.id }
      render :json => result 
    else
      show_error_json(payment_type.errors.messages)
    end 
    
  end
  
  def edit
    render :json => @payment_type
  end
  
  def update 
    status = @payment_type.update_attributes(:name=> params[:name])
    if status
      result = {flag: status }
      render :json=> result   
    else 
      show_error_json(@payment_type.errors.messages)
    end
    
    
  end
  
  def destroy
    if @payment_type.destroy
      render :json=>{flag: true}
    else
      show_error_json(user.errors.messages , flag= false)
    end
  end
  
  private 
  
  def get_payment_type
    @payment_type = PaymentType.select("id , name").find(params[:id])
  end
  
end
