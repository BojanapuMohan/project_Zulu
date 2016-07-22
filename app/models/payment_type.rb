class PaymentType < ActiveRecord::Base
  belongs_to :company
  
#   later validations 
  validates_presence_of :name
  
#   ending here ----
  
end
