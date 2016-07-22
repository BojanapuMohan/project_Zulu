class AppointmentTypeController < ApplicationController
  respond_to :json
  before_filter :authorize
  before_action :find_company , :only =>[:index , :new  , :create ]
  
  
  def index
    appointments = @company.appointment_types.select("id ,name , color_code ")
    render :json=>  appointments
  end
  
  def new 
    appointment_type = @company.appointment_types.new
    doctors = @company.users.select("id, first_name , last_name").doctors
    result ={appointment_type: appointment_type ,  doctors: doctors}
    render :json=> result 
  end
   
  def create
    params[:appointment_type].reject!{|k| k == "id" || k == "prefer_practi" || k == "company_id" ||k == "created_at" || k == "updated_at"}
    appointment_type = @company.appointment_types.build(params[:appointment_type])
    if appointment_type.valid?
      # appointment_type.prefer_practi = params[:doctors]
      appointment_type.save

#     To Assign practitioners for a appointment type
      params[:doctors].each do |doctor|
        AppointmentTypesUser.create(appointment_type_id: appointment_type.id , user_id: doctor["id"], is_selected: doctor["is_selected"] , first_name: doctor["first_name"] , last_name: doctor[:last_name] ) if doctor["is_selected"]
      end unless params[:doctors].nil?
       
      result = {flag: true , id: appointment_type.id}
      render :json=> result
    else
      show_error_json(appointment_type.errors.messages)  
    end
    
  end
  
  def edit
    appointment_type  = AppointmentType.select("id , name , description , category , duration_time , billable_item , default_note_template , related_product , color_code , confirm_email , send_reminder , allow_online, company_id").find(params[:id]) rescue nil
    unless appointment_type.nil?
      appnt_doctors = AppointmentTypesUser.where(["appointment_type_id=? ",appointment_type.id]).select("user_id as id , first_name , last_name, is_selected ")
      appnt_doctors_ids = appnt_doctors.map(&:id)
      all_doctors = appointment_type.company.users.doctors
      doctors = []
      all_doctors.each do |dc|
        if appnt_doctors_ids.include? dc.id
          item = {id: dc.id , first_name: dc.first_name , last_name: dc.last_name , is_selected: true}
        else
          item = {id: dc.id , first_name: dc.first_name , last_name: dc.last_name , is_selected: false}
        end 
        doctors << item
      end
      result ={appointment_type: appointment_type ,  doctors: doctors}  
    else
       result ={:error => "Record does not exist"}
    end
    render :json=> result     
  end
  
  def update
    appointment_type  = AppointmentType.find(params[:id])
    params[:appointment_type].reject!{|k| k=="id"}
    status =  appointment_type.update_attributes(params[:appointment_type])
    if status  
      params[:doctors].each do |doctor|
        if doctor[:is_selected]
          apnt_type_user = AppointmentTypesUser.find_by_appointment_type_id_and_user_id(appointment_type.id , doctor["id"])
          unless apnt_type_user.nil?
            apnt_type_user .update_attributes(:is_selected=> doctor[:is_selected])
          else
            AppointmentTypesUser.create(appointment_type_id: appointment_type.id , user_id: doctor["id"], is_selected: doctor["is_selected"] , first_name: doctor["first_name"] , last_name: doctor[:last_name] )
          end
        end 
      end unless params[:doctors].nil? 
      render :json=> {flag: status}
    else
      show_error_json(appointment_type.errors.messages)
    end
    
  end 
  
  def destroy
    appointment_type  = AppointmentType.find(params[:id])
    appointment_type.destroy
    render :json=> {flag:  true}
  end
  
end
