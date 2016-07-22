class User < ActiveRecord::Base
   include Authentication
  
  # serialize :phone , Array

  attr_accessible :email ,  :phone , :password  , :time_zone ,:auth_factor , :title , :first_name , 
  :last_name , :role , :acc_active , :is_doctor   , :password_salt, :password_hash , :password_confirmation
  
  attr_accessor :temp_password  # containing password temporary for Action mailer
  
  scope :doctors  , -> {where("is_doctor= ? " , true).order("created_at asc")}
  
#   To send email/password on user creation
  # after_create :send_email
  before_save :keep_password
  
  belongs_to :company
  has_one :practi_info , :dependent=> :destroy
  has_many :practi_refers , :through=> :practi_info , :dependent=> :destroy 
  has_many :practi_avails , :through=> :practi_info , :dependent=> :destroy
  has_and_belongs_to_many :appointment_types , :dependent=> :destroy
  # after_save :assign_doctors_appointments

  validates_presence_of :email ,:first_name , :last_name , :on => [:create , :update]
  
  validates_format_of :email, :with => /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i , :on => [:create , :update]
  
  # later validation 
  # validates :password , confirmation: true  , :on=> :update
  validates :password , confirmation: true  , :on=> [:update , :create]
  # validates :password_confirmation , presence: true  , :on=> [:update , :create]
  
  
  validates :phone,  :allow_nil=> true , 
                     :numericality => true,
                     :length => { :minimum => 10}

# ending here -----  
  
 
  
  def keep_password
    self.temp_password = self.password
  end
  
  # def send_email
     # UserMailer.welcome_email(self ,self.temp_password ).deliver    
   # end
   
   def full_name
    self.first_name+" "+self.last_name
  end
  
end
