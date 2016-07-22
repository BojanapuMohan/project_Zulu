class Company < ActiveRecord::Base
  include Authentication
  
  serialize :calendar_setting , JSON  
  
  attr_accessible  :company_name , :first_name , :last_name,
   :email , :password ,  :country, :time_zone , :attendees, :communication_email, :calendar_setting,
   :patient_name_by , :multi_appointment, :show_time_indicator ,:note_letter , 
   :show_finance, :show_attachment , :logo
   
   before_save :default_values , :default_calendar_settings
  
  has_attached_file :logo,
               styles: { medium: "300x300>", thumb: "100x100>" },
               default_url: "/assets/missing.png"
  validates_attachment_content_type :logo, content_type: /\Aimage\/.*\Z/
  
  
  # Explicitly do not validate
  do_not_validate_attachment_file_type :logo
  
#   all models associations  for setting module
  
  has_many :businesses , :dependent=> :destroy
  has_many :users  , :dependent=> :destroy
  has_many :appointment_types   , :dependent=> :destroy
  has_many :billable_items , :dependent=> :destroy
  has_many :payment_types , :dependent=> :destroy
  has_many :recall_types , :dependent=> :destroy  
  has_many :tax_settings , :dependent=> :destroy
  has_many :template_notes , :dependent=> :destroy
  has_many :concessions , :dependent=> :destroy
  has_many :temp_sections , :through=> :template_notes , :dependent=> :destroy
  has_one :online_booking , :dependent=> :destroy
  has_many :letter_templates , :dependent => :destroy
  has_many :referral_types , :dependent => :destroy
  has_one :invoice_setting , :dependent => :destroy 
  has_one :document_and_printing, :dependent => :destroy
  has_one :appointment_reminder,  :dependent => :destroy
  has_one :sms_setting , :dependent=> :destroy
  has_one :sms_credit , :through=> :sms_setting , :dependent=> :destroy  
  has_one :subscription , :dependent=> :destroy
  
#   ending here ----

  has_many :products , :dependent => :destroy
  has_many :expenses , :dependent => :destroy
  has_many :contacts , :dependent => :destroy
  has_many :patients , :dependent => :destroy
 
  validates_presence_of :company_name , :on=> [:create,:update] , :message=>" company name can't be left blank"
  validates_presence_of :email , :on=> :create , :message=>"email can't be left blank"  
  validates_presence_of :password , :on=> :create , :message=>"password can't be left blank"
  
  # validates_presence_of :first_name , :on=> :update , :message=> "first name can't be left blank"
  # validates_presence_of :last_name , :on=> :update , :message=> "last name can't be left blank"
  # validates_presence_of :country ,  :time_zone , :on=> :update
#   
  validates_uniqueness_of :company_name , :message=>"Company name already exists"
  validates_format_of :email , :with => /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i , :message=> " doesn't look like an email address"
  validates :password , length: { in: 6..20 , :message=>"password's length must be in between 6 to 20 characters"} , :on=>:create 
  
#   validations for test cases at last 
  
  validates :company_name , :length => { :maximum => 50,
    :too_long => "%{count} characters is the maximum allowed" }
  
  validates_presence_of :communication_email , presence: true , :on=>:update
  validates :attendees , inclusion: { in: %w(members patients clients),
    message: "%{value} is not a valid attendee" }
    
    
#   ending here -------    

  def default_values
    self.communication_email ||= self.email
  end
  
  def default_calendar_settings
    self.calendar_setting ||= {:size=>"15" , :height=>"small" , :time_range => {:min_time=> "7" , :max_time=>"22"} }
  end

end
