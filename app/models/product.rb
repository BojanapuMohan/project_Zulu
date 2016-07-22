class Product < ActiveRecord::Base
  belongs_to :company
  has_many :product_stocks , :dependent => :destroy
  
  attr_accessor  :include_tax

  validates :name , presence:true 
  validates :price , numericality:{:greater_than_or_equal_to => 0} , :presence=> true
  validates :cost_price , numericality:{:greater_than_or_equal_to => 0}, :allow_nil=> true
  
  # validates :include_tax, inclusion: { in: [true, false] }
  
  validates :stock_number , numericality: { only_integer: true } , :allow_nil=> true 
  validates_presence_of :tax , :message=>"Tax must be selected if including tax in price" , if: Proc.new {|a| a.include_tax == true || a.tax=="N/A" } 
  
  # scope specific_attributes, ->{ select("id ,item_code , name , serial_no , price_inc_tax , price_exc_tax , tax , cost_price , stock_number , note , price , supplier")}
  scope :active_products, ->{ where(status: true)}
  
   before_create :set_prices 
   before_update :set_prices 
   
  def set_prices
    unless tax.nil?
      tax_amount = TaxSetting.find(tax).amount rescue nil  
    else 
      tax_amount = nil
    end
    if include_tax == true && !tax_amount.nil?
      self.price_exc_tax = ((price.to_f)/(1 + (tax_amount/100.0))).round(2)
      self.price_inc_tax = price 
    else
      self.price_exc_tax = price
      self.price_inc_tax = price 
    end
    
    self.price = self.price_exc_tax
    self.status = true
  end
  
  def create_stock(user_id)
    current_user = User.find(user_id) 
    product_stock = self.product_stocks.new(stock_level: true, stock_type: "Initial Stock Level", quantity: self.stock_number)
    if product_stock.valid?
      product_stock.save
    end
  end
    
   
end
