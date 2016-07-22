class LetterTemplate < ActiveRecord::Base
  belongs_to :company

  validates :template_name , :template_body , presence: true 
  scope :active_letter, ->{ where(status: true)}
end
