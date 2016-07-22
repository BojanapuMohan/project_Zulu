class ProductStocksController < ApplicationController
  respond_to :json
  before_filter :authorize
  before_action :find_product , :only =>[:index ,:create ]
  
  def index
    prod_stocks = @product.product_stocks.order("created_at desc")
    result = { :product_stocks=> prod_stocks }
    render :json=> result 
    
  end
  
  def create 
#     getting values of product stock  
    stock_level= true
    quantity = params["product_stock"]["quantity"].to_i
    stock_type = params["product_stock"]["stock_type"]
    if params["product_stock"]["stock_level"]=="decreasing"
      stock_level=  false
      quantity = quantity*(-1)
    end
    product_stock = @product.product_stocks.new(stock_level: stock_level , stock_type: stock_type  , quantity: quantity  , adjusted_at: DateTime.now.strftime("%e %b %Y,%l:%M%p") , adjusted_by: current_user.full_name , note: params[:product_stock][:note])
    if product_stock.valid?
      product_stock.save
#     reflect changes in stock number of product as well
      unless @product.stock_number.nil?
        @product.stock_number +=  quantity.to_i  
      else
        @product.stock_number =  quantity.to_i
      end  
      @product.save
      
      result = {flag: true}
      render :json=> result 
    else
      show_error_json(product_stock.errors.messages)
    end
    
  end
  
  private 
  
  def find_product
    @product = Product.find(params[:product_id])
  end
  
end
