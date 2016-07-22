class BillableItem < ActiveRecord::Base
  serialize :concession_price , Array
  
  attr_accessible :item_code , :name , :price, :include_tax , :tax , :item_type 
  
  belongs_to :company
  
  # has_many :concessions , :through=> :company
  has_and_belongs_to_many :concessions , :dependent=> :destroy
  
#   later validations 
  validates_presence_of :name 
  validates :price , presence: true , numericality: {:greater_than=> 0}
  validates :tax , presence: true , if: Proc.new {|a| a.include_tax == true}

# ending here -----
  
  
end
