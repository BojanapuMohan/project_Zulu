class AppointmentRemindersController < ApplicationController
  respond_to :json
  before_filter :authorize
  before_action :find_company , :only =>[:index , :new  , :create ]
  before_action  :find_appointment_reminder, :only => [:show, :edit, :update, :destroy] 

  skip_before_filter :verify_authenticity_token, :unless => Proc.new { |c| c.request.format == 'application/json' }

  def index
    #appointment_reminder = AppointmentReminder.where(["company_id= ?", @company.id]).specific_attributes

    appointment_reminders = @company.appointment_reminder.order("created_at desc")
    render json: appointment_reminders
  
  end

  def new
    appointment_reminder = AppointmentReminder.new
    result = {} 
    result[:appointment_reminder] = appointment_reminder
    render json: result

  end

  def create
    appointment_reminder = @company.build_appointment_reminder(appointment_reminder_params)
      if appointment_reminder.valid?
         appointment_reminder.save
         result = { flag: true, id: appointment_reminder.id}
         render json: result
      else
         show_error_json(appointment_reminder.errors.messages) 
      end
  end

  def show
    appointment_reminder = @appointment_reminder
    result = {}
    result["appointment_reminder"] = appointment_reminder
    render json: result 
  end

  def edit
    appointment_reminder = @appointment_reminder
    result = {}
    result["appointment_reminder"] = appointment_reminder
    render json: result 
  end

  def update
    appointment_reminder = @appointment_reminder.first
    appointment_reminder.update(appointment_reminder_params)
      if appointment_reminder.valid?
         result = {flag: true }
         render json: result  
      else 
        show_error_json(appointment_reminder.errors.messages)
      end
  end

  def destroy
    appointment_reminder = @appointment_reminder.first
      if appointment_reminder.valid?
         result = {flag: true }
         render json: result  
      else 
        show_error_json(appointment_reminder.errors.messages)
      end   
  end

private
  
  def appointment_reminder_params
    params.require(:appointment_reminder).permit(:id, :d_reminder_type, :reminder_time, :skip_weekends, :reminder_period,
                :apply_reminder_type_to_all, :ac_email_subject, :ac_email_content,
                :ac_app_can_show, :hide_address_show, :reminder_email_subject,
                :reminder_email_enabled, :reminder_email_content, :reminder_app_can_show,
                :sms_enabled, :sms_text, :sms_app_can_show, :status )
  end
 
 def find_appointment_reminder
   @appointment_reminder = AppointmentReminder.where(id: params[:id])
 end

end
