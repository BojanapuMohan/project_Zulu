class OnlineBooking < ActiveRecord::Base
  belongs_to :company
  
  # attr_accessible :allow_online , :show_address , :ga_code , :min_appointment , :advance_booking_time , :min_cancel_appoint_time , :notify_by , :show_price , :hide_end_time , :req_patient_addr , :time_sel_info, :terms

  has_attached_file :logo, styles: { medium: "300x300>", thumb: "100x100>" }, default_url: "/assets/missing.png"
  validates_attachment_content_type :logo, content_type: /\Aimage\/.*\Z/
  
#   later validations 
  validates_associated :company 
  validates :notify_by , presence: true ,  inclusion: { in: %w(None sms email sms_email),
    message: "%{value} is not a valid notification" }
    
  
#   ending here -----
  
end
