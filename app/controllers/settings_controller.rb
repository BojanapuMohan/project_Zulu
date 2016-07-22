class SettingsController < ApplicationController
  respond_to :json
  before_filter :authorize
  before_action :which_company , :only =>[:edit , :update]
   
  def edit
    @basic_info  = {comp_id: @company.id , company_name: @company.company_name , 
      first_name: @company.first_name , last_name: @company.last_name, email: @company.email, 
      country: @company.country , note_letter: @company.note_letter, time_zone: @company.time_zone,
      show_finance: @company.show_finance, show_attachment: @company.show_attachment,
       communication_email: @company.communication_email , calendar_setting: @company.calendar_setting ,
        multi_appointment: @company.multi_appointment, show_time_indicator: @company.show_time_indicator ,
         patient_name_by: @company.patient_name_by , attendees:@company.attendees , logo: @company.logo}
    
    render :json=> @basic_info
      
  end
  
  def update
    begin
      is_update = true
      calendar_setting = JSON.parse(params[:calendar_setting])
      unless calendar_setting["time_range"]["max_time"].to_i <= calendar_setting["time_range"]["min_time"].to_i
        is_update = @company.update_attributes(company_name: params[:company_name] , first_name: params[:first_name] , last_name: params[:last_name] , email: params[:email] , country: params[:country] , note_letter: params[:note_letter] , time_zone: params[:time_zone] ,show_finance: params[:show_finance] ,show_attachment: params[:show_attachment] ,  communication_email: params[:communication_email] , multi_appointment: params[:multi_appointment] , show_time_indicator: params[:show_time_indicator] , patient_name_by: params[:patient_name_by] , attendees: params[:attendees] , logo: params[:file])
        @company.calendar_setting["size"] = calendar_setting["size"]
        @company.calendar_setting["height"] = calendar_setting["height"]
        @company.calendar_setting["time_range"]["min_time"] = calendar_setting["time_range"]["min_time"]
        @company.calendar_setting["time_range"]["max_time"] = calendar_setting["time_range"]["max_time"]  
      else
        is_update = false
      end
      if @company.valid? && is_update
        @company.save
        @basic_info  ={com_id: @company.id , company_name: @company.company_name , first_name: @company.first_name , last_name: @company.last_name, email: @company.email, country: @company.country , note_letter: @company.note_letter, time_zone: @company.time_zone,show_finance: @company.show_finance, show_attachment: @company.show_attachment, communication_email: @company.communication_email , calendar_setting: @company.calendar_setting, multi_appointment: @company.multi_appointment, show_time_indicator: @company.show_time_indicator , patient_name_by: @company.patient_name_by , attendees: @company.attendees , :logo=> @company.logo}
        render :json=>{:flag=> true , data: @basic_info}
      else
        @company.errors.add(:calendar , " end hour needs to be later than calendar start hour")
        show_error_json(@company.errors.messages)
      end
    rescue
      @company.errors.add(:error , "company not found")
      show_error_json(@company.errors.messages)
    end
    
  end
  
  private 
  
  def which_company
     @company = Company.find(params[:id])
   end

end
