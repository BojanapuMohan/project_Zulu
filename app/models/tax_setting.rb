class TaxSetting < ActiveRecord::Base
  belongs_to :company
  
#   later validations 
  validates :name , presence: true
  validates :amount , numericality: { only_integer: false ,
                :greater_than=> 0 , :less_than=> 4000000000 }
            

# ending here 
  
end
