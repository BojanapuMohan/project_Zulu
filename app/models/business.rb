class Business < ActiveRecord::Base
  # serialize :address , JSON
  # serialize :reg_info , JSON
  
  # attr_accessible  :name , :address , :reg_name , :reg_number , :web_url , :contact_info , :online_booking , :city, :state, :pin_code, :country 
  
  belongs_to :company 
  
  has_and_belongs_to_many :practi_infos , :dependent=> :destroy
  
  has_many :practi_avails , :dependent=> :destroy
  
  validates_presence_of :name , :on=>[:create , :update]

# later validations   
  # validates_associated :company , presence: true 
  validates :web_url, :presence => {:message => 'URL cannot be blank.'}, :format => {:with => /\A[www]+[A-Za-z0-9._%+-]+\.[A-Za-z]+\z/, :message => 'INCORRECT FORMAT!'} , allow_nil: true

#  ending here --------   

end
