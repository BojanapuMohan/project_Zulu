class Expense < ActiveRecord::Base
  belongs_to :company
  has_many :expense_products , :dependent => :destroy
  
  accepts_nested_attributes_for :expense_products , :reject_if => lambda { |a| a[:unit_cost_price].blank? || a[:quantity].blank?  }, :allow_destroy => true
  
  validates_associated :expense_products
  validates_presence_of :expense_products , :message=>"Invalid product details" , if: "include_product_price == true"
  
  validates :total_expense , presence:true  , numericality: true
  validates :tax_amount , numericality: true , :allow=> nil ,  unless: "tax.nil? || tax.blank? "
  
  scope :active_expense, ->{ where(status: "active")}
  scope :specific_attributes , ->{ select("id, expense_date , vendor, category, total_expense , tax_amount , note  , sub_amount ,created_by")}
  
  before_create :set_subprice
  
  before_save :change_status_expense_products, if: :status_changed?

  def change_status_expense_products
    status =  self.status
    expense_products = self.expense_products
    expense_products.each do |exp_prod|
      exp_prod.update_attributes(:status=> false)
    end
    
  end
  
  def set_subprice
    if self.tax_amount.nil?
      self.tax_amount = 0.00
    end
    self.sub_amount = self.total_expense - self.tax_amount
  end
  
  def set_created_by(user_id)
    user = User.find(user_id)
    self.created_by = user.full_name
  end
  
end