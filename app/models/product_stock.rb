class ProductStock < ActiveRecord::Base
  belongs_to :product
  
  # validates :stock_level, inclusion: { in: [true, false] }
  validates :quantity , numericality: { only_integer: true }
  
end
