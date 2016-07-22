class SmsSetting < ActiveRecord::Base
  belongs_to :company
  has_one :sms_credit , :dependent=> :destroy
  
#   later validations 
 validates :sms_alert_no , :default_sms  , numericality: { only_integer: true }  
 validates :email , format: { :with => /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i , 
                              :message=> "email doesn't look like an email address" },
                    allow_nil: true           
                              
 validates :mob_no,  :allow_nil=> true , 
                     :numericality => { only_integer: true },
                     :length => { :minimum => 10}
                     
 #  ending here  -----                     
  
end
