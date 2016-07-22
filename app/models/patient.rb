class Patient < ActiveRecord::Base
  belongs_to :company
  
  serialize :relationship , Array
  serialize :phone_list , Array
  serialize :medical_alert , Array
  
  scope :active_patient, ->{ where(status: true)}
  scope :specific_attributes , ->{ select("id, title , first_name , last_name , dob_day , dob_month, dob_year, gender, relationship , phone_list, email, reminder_type, sms_marketing , address , country , state , city , postal_code , concession_type , invoice_to, invoice_email, invoice_extra_info, occupation, emergency_contact, medicare_number, reference_number, refer_doctor, notes, referral_type, referrer, extra_info age")}
  scope :specific_attributes_for_index , ->{ select("id, title , first_name , last_name , dob_day , dob_month, dob_year,  phone_list, email")}
  
  before_create :set_age
  
  private
  
  def set_age
    unless self.dob_day.nil? && self.dob_month.nil? && self.dob_year.nil?
      birthday = "#{self.dob_day}/#{self.dob_month}/#{self.dob_year}".to_date()
      now = Time.now.utc.to_date
      self.age =   now.year - birthday.year - (birthday.to_date.change(:year => now.year) > now ? 1 : 0)
    end
  end
  
  
end
