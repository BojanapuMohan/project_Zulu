class BusinessController < ApplicationController
  respond_to :json
  before_filter :authorize
  before_action :find_company , :only =>[:index , :new  , :create ]
  
  def index
    businesses = @company.businesses.select("id , name , address , city , state , pin_code, country")
    render :json=> businesses
  end
  
  def new
    @business = @company.businesses.new
    render :json=> @business  
  end
  def create
    business = @company.businesses.new(business_params)
    if business.valid?
      business.save
      # set_availability(business)  # set user availability for this business 
      render :json=> {flag: true , :business_id => business.id }
    else
      show_error_json(business.errors.messages)
    end
    
  end
  
  def edit
    # company  =Company.find(params[:setting_id])
    business = Business.select("id ,name , address , city , state , pin_code, country, reg_name , reg_number , web_url , contact_info, online_booking").find(params[:id])
    render :json=> business 
    
  end
  
  def update
    business =  Business.find(params[:id])
    is_update = business.update(business_params)
    if is_update
      @basic_info  = Business.select("id, name, address, city , state, pin_code , country , reg_name , reg_number , web_url , contact_info , online_booking ").find(params[:id]) 
      render :json=>{:flag=> true , data: @basic_info}
    else
      business.company.mark_for_destruction
      show_error_json(business.errors.messages)
    end
  end
  
  def destroy
    business = Business.find(params[:id])
    # business.users.map{|user| user.destroy }
    is_done =  business.destroy
    if is_done
      render :json=>{:flag=> true}  
    else
      render :json=>{:flag=> false}
    end
    
  end 
  
  private 
   
   def set_availability(business)
     Date::DAYNAMES.each_with_index do |day, index|
       # BusinessAvail.create(day_name: day ,start_hr: 9, start_min: 0, end_hr: 17, end_min: 0 , is_selected: false, business_id: business.id)
       PractiAvail.create(day_name: day ,start_hr: 9, start_min: 0, end_hr: 17, end_min: 0 , is_selected: false, business_id: business.id)
    end
   end
   
   def business_params
     params.require(:business).permit(:id, :name , :address , :reg_name , :reg_number , :web_url , :contact_info , :online_booking , :city, :state, :pin_code, :country , :company_id)
   end
  
end
