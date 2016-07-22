class OnlineBookingController < ApplicationController
  respond_to :json
  before_filter :authorize
  before_action :find_company , :only =>[:index , :new  , :create ]
  
  
  def index
    online_booking = @company.online_booking
    unless online_booking.nil?
      booking_attr = {id: online_booking.id, allow_online: online_booking.allow_online , show_address: online_booking.show_address , ga_code: online_booking.ga_code, min_appointment: online_booking.min_appointment , advance_booking_time: online_booking.advance_booking_time , min_cancel_appoint_time: online_booking.min_cancel_appoint_time , notify_by: online_booking.notify_by , show_price: online_booking.show_price , hide_end_time: online_booking.hide_end_time , req_patient_addr: online_booking.req_patient_addr , time_sel_info: online_booking.time_sel_info, terms: online_booking.terms , logo: online_booking.logo , show_dob: online_booking.show_dob}
    else 
      booking_attr = {}        
    end
    render :json=> booking_attr 
        
  end
  
 
  def update
    begin
      online_booking_obj = OnlineBooking.find(params[:id])
      if online_booking_obj.show_address.nil?
        company = online_booking_obj.company
        booking_url = "http://#{company.first_name}.#{request.host}.com"
        online_booking_obj.update_attributes(show_address: booking_url)  
      end
      
      # params.reject!{|k| k=="id" || k=="controller" || k=="action"}
      is_update = online_booking_obj.update_attributes(allow_online: params[:allow_online], show_address: params[:show_address], ga_code: params[:ga_code], min_appointment: params[:min_appointment], advance_booking_time: params[:advance_booking_time], min_cancel_appoint_time: params[:min_cancel_appoint_time], notify_by: params[:notify_by], show_price: params[:show_price], hide_end_time: params[:hide_end_time], req_patient_addr: params[:req_patient_addr], time_sel_info: params[:time_sel_info], terms: params[:terms], logo: params[:file], show_dob: params[:show_dob])
      if online_booking_obj.valid?
        render :json=> {flag: true}    
      else
        show_error_json(online_booking_obj.errors.messages)
      end
    rescue Exception=> e
      res  ={error: e.message }
      render :json=> res     
    end
    
    
    
  end
  
  
end
