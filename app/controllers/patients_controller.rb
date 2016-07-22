class PatientsController < ApplicationController
  respond_to :json
  before_filter :authorize
  before_action :find_company , :only =>[:index , :create , :doctors_list , :referral_list]
  before_action :find_patient , :only => [:edit , :update , :destroy , :show]
  
  # using only for postman to test API. Remove later  
  skip_before_filter :verify_authenticity_token, :unless => Proc.new { |c| c.request.format == 'application/json' }
  
  def index
    patient = @company.patients.active_patient.specific_attributes_for_index.order("created_at desc")
    patient_list = []
    patient.each do |item|
      patient = {}
      patient[:id] = item.id
      patient[:first_name] = item.first_name
      patient[:last_name] = item.last_name
      patient[:dob_day] = item.dob_day
      patient[:dob_month] = item.dob_month
      patient[:dob_year] = item.dob_year
      patient[:mobile_no] = item.phone_list.first["contact_no"]
      patient[:email] = item.email
      patient[:next_apt] = (DateTime.now + rand(7).days).strftime("On %A,%dTH %^b %Y %l:%M %p")
      patient_list << patient
    end
    render :json=> patient_list  
  end
  
  def create
    patient = @company.patients.new(patient_params)
    if patient.valid?

#     To set relationship attributes
      params[:patient][:relationship].each do |rs|
        item = {}
        item[:patient_id] = rs[:patient][:id]
        item[:type] = rs[:type]
        patient.relationship << item       
      end unless params[:patient][:relationship].nil? 
      
      patient.save
      result = {flag: true , patient_id: patient.id }
      render :json=> result
    else 
      show_error_json(patient.errors.messages)
    end
  end
  
  def show
    patient =  @patient.specific_attributes.first
    render :json=> patient 
  end
  
  def edit
    render :json=> @patient.specific_attributes.first  
  end
  
  def update
    patient = @patient.first 
    patient.update_attributes(patient_params)
    if patient.valid?
      result = {flag: true }
      render :json=> result
    else 
      show_error_json(patient.errors.messages)
    end
  end
  
  def destroy
    patient = @patient.first
    patient.update_attributes(:status=> false)
    if patient.valid?
      result = {flag: true }
      render :json=> result
    else 
      show_error_json(patient.errors.messages)
    end
  end
  
  def doctors_list
    doctors = @company.contacts.where(contact_type: "Doctor").select("id , first_name , last_name")
    render :json=> doctors
  end
  
  def referral_list
    referral = @company.contacts.where(contact_type: "Doctor").select("id , first_name , last_name")
    render :json=> referral 
  end
  
  
  
  private
  
  def patient_params                                                                                                                                                             
    params.require(:patient).permit(:id , :title, :first_name, :last_name, :dob_day, :dob_month, :dob_year, :gender, {relationship: []} , {phone_list: [:contact_no, :type]}, :email, :reminder_type, :sms_marketing, :address, :country, :state, :city, :postal_code, :concession_type, :invoice_to, :invoice_email, :invoice_extra_info, :occupation, :emergency_contact, :medicare_number, :reference_number, :refer_doctor, :notes, :referral_type, :referrer, :extra_info , :status).tap do |whitelisted|
      whitelisted[:referrer] = params[:patient][:referrer][:id]  unless params[:patient][:referrer].nil?       
    end 
  end 
    
  def find_patient
    @patient = Patient.where(:id=>params[:id])
  end
  
  
end
