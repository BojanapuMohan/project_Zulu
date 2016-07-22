class Owner < ActiveRecord::Base
  include Authentication
  
  has_many :plans
  has_many :sms_plans
    
  
end
