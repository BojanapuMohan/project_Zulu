class TemplateNote < ActiveRecord::Base
  belongs_to :company
  has_many :temp_sections , :dependent=> :destroy
  has_many :questions , :through => :temp_sections , :dependent=> :destroy
  
  accepts_nested_attributes_for :temp_sections , allow_destroy: true
  
#   later validations

  validates :name  , presence: true 
  
# ending here 
end
