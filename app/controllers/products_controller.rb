class ProductsController < ApplicationController
  respond_to :json
  before_filter :authorize
  before_action :find_company , :only =>[:index , :create ]
  before_action :find_product , :only => [:update , :destroy]
  
  before_action :prevent_access_from_unauth
  before_action :stop_delete_unauth , :only => [:destroy]

  skip_before_filter :verify_authenticity_token, :unless => Proc.new { |c| c.request.format == 'application/json' }
  
  def index
    products  = @company.products.select("id ,item_code , name , serial_no , price_inc_tax , price_exc_tax , tax , cost_price , stock_number , note , price , supplier").active_products
    render :json=> {:product=> products}
  end
  
  def create
    product = @company.products.new(params_product)
    if product.valid?
      product.save
      # product.set_status
      product.create_stock(current_user.id)
      result = {flag: true , id: product.id }
      render :json => result 
    else 
      show_error_json(product.errors.messages)  
    end
  end
  
   
  def update
    status = @product.update(params_product)
    if @product.valid?
      @product.create_stock(current_user.id) if @product.product_stocks.count == 0
      result = {flag: true }
      render :json=> result  
    else 
      show_error_json(@product.errors.messages)
    end
    
  end
  
  def destroy
    status = @product.update_attributes(:status=> false)
    if status
      result ={flag: true }
      render :json=> result
    else 
      show_error_json(@product.errors.messages)
    end
    
  end 
  
  def params_product
    params.require(:product).permit(:id , :item_code , :name , :serial_no , :price , :include_tax , :tax , :cost_price , :stock_number , :note , :status , :supplier)
  end
  
  def find_product
    @product = Product.find(params[:id])    
  end
  
  # Filter to prevent access of scheduler 
  def prevent_access_from_unauth
    role = current_user.role
    if role.casecmp(ROLE[0]) == 0
      render :json=> {:restricted=>"user unauthorized"}
    end
  end
  
# Filter to prevent delete expense from unauthorized users - Scheduler  Receptionist  Practitioner

  def stop_delete_unauth
    role = current_user.role
    if role.casecmp(ROLE[1]) == 0 || role.casecmp(ROLE[2]) == 0
      render :json=> {:restricted=>"user unauthorized"}
    end
  end  
    
  
end
