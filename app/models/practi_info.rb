class PractiInfo < ActiveRecord::Base
  serialize :appointment_services , Array
  
  attr_accessible :designation , :desc , :default_type , :notify_by , :cancel_time, :is_online , :appointment_services , :allow_external_calendar

  belongs_to :user , :autosave => true
  
  has_many :practi_refers   ,:dependent=> :destroy

  has_and_belongs_to_many :businesses , :dependent=> :destroy
  
  has_many :practi_avails , :dependent=> :destroy

  has_many :practi_breaks , :through=> :practi_avails , :dependent=> :destroy
  
# later validations 
  # validates_associated :practi_refers  
  validates :cancel_time    , :numericality => { :only_integer => true , :greater_than_or_equal_to => 1 , :less_than_or_equal_to =>14 }, :allow_nil=> true
  
#   ending here -----
  
end
