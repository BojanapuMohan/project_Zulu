class AppointmentType < ActiveRecord::Base
  serialize :prefer_practi , JSON
  serialize  :billable_item , Array
  serialize  :related_product , Array
  
  
  attr_accessible :name, :prefer_practi ,  :description, :category , :duration_time, :billable_item ,:default_note_template ,:related_product , :color_code, :reminder ,  :confirm_email, :send_reminder , :allow_online , :company_id
  
  belongs_to :company
  has_and_belongs_to_many :users , :dependent=> :destroy
  
#   later validations 
  validates_presence_of :name
  validates :duration_time ,  numericality: { only_integer: true , :greater_than_or_equal_to=> 0 , :less_than_or_equal_to => 360 } ,
                              presence: true 
                              
  
# ending here ----
  
end
