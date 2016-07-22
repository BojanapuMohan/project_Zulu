class Contact < ActiveRecord::Base
  belongs_to :company
  
  validates :contact_type , inclusion: { in: ["Standard" , "Doctor", "3rd Party Payer"]}

  serialize :phone_list , Array
  
  validates :first_name , presence: true 
  validates :provider_number , :presence=> true , :if=> Proc.new{|a| a.contact_type=="doctor"}
  
  scope :specific_attributes , ->{ select("id , contact_type , title , first_name , last_name , preffered_name , occupation , company_name , provider_number , phone_list, email , address, city , state, post_code, country, notes")}
  scope :active_contact, ->{ where(status: true)}
  
end
