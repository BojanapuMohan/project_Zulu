class ExpensesController < ApplicationController
  respond_to :json
  before_filter :authorize
  before_action :find_company , :only =>[:index , :create , :new , :vendors_list , :category_list , :product_list ]
  before_action :find_expense , :only => [:edit , :update , :destroy]
  
# Filters for grant permission to users as per their role  
  before_action :prevent_access_from_unauth
  before_action :stop_delete_unauth , :only => [:destroy]
  
# filter to make able current user in model ExpenseProduct
  before_filter :set_current_user , :only => [ :create , :edit , :update]

    

# using only for postman to test API. Remove later  
  skip_before_filter :verify_authenticity_token, :unless => Proc.new { |c| c.request.format == 'application/json' }
  
  def index
    expenses  = @company.expenses.active_expense.specific_attributes.order("created_at desc")
    render :json=> {:expense=> expenses }
  end
  
  def new 
        
  end
  
  def create
    expense = @company.expenses.new(params_expense)

    if expense.valid?
      expense.set_created_by(current_user.id)
      expense.save
#     TO reflect changes of stocks in products and product stock  
      # expense_products = expense.expense_products
      # expense_products.each do |exp_prod|
        # exp_prod.set_product_stock_on_create(current_user.id)  
      # end
      
      
      result = {flag: true }
      render :json => result 
    else
      show_error_json(expense.errors.messages)
    end
    
  end
  
  def edit
    begin
      item = {}
      item[:id] = @expense.id
      item[:business_name] = @expense.business_name
      item[:expense_date] = @expense.expense_date
      item[:vendor] = @expense.vendor
      item[:category] = @expense.category
      item[:total_expense] = @expense.total_expense
      item[:tax] = @expense.tax
      item[:tax_amount] = @expense.tax_amount 
      item[:note] = @expense.note 
      item[:include_product_price] = @expense.include_product_price
      item[:sub_amount] = @expense.sub_amount
      item[:created_by] = @expense.created_by
      item[:expense_products_attributes] = [] 
      @expense.expense_products.each do |exp_product|
        exp_product_item = {} 
        exp_product_item[:id] = exp_product.id
        exp_product_item[:prod_id] = exp_product.prod_id 
        exp_product_item[:name] = exp_product.name
        exp_product_item[:unit_cost_price] = exp_product.unit_cost_price
        exp_product_item[:quantity] = exp_product.quantity
        item[:expense_products_attributes] << exp_product_item 
      end
      render :json=> item
    rescue Exception=> e
      @expense.errors.add(:base , e.message)
      show_error_json(@expense.errors.messages)
      
    end
  end
  
  def update 
    begin
#     method to add _destroy:true  into params
      add_destory_key_to_params(params) unless params[:expense][:expense_products_attributes].nil?
      @expense.update(params_expense)
      if @expense.valid?
        result = { flag: true } 
      else
        result = { flag: false }
      end
      render :json => result
      
    rescue Exception=> e
      @expense.errors.add(:base , e.message)
      show_error_json(@expense.errors.messages)
    end
  end
  
  def destroy
    @expense.update_attributes(:status=> "deactive")
    if @expense.valid?
      result = { flag: true } 
    else
      result = { flag: false }
    end
    render :json => result
    
  end
  
  def vendors_list
    vendors = @company.expenses.map(&:vendor).uniq
    render :json => vendors
  end
  
  def category_list
    categories = @company.expenses.map(&:category).uniq
    render :json => categories
  end
  
  def product_list
    products = @company.products.active_products
    prod_list  = []
    products.each do |item|
      new_item = {}
      new_item["prod_id"] = item.id
      new_item["name"] = item.name
      prod_list << new_item
    end
    render :json => prod_list
  end
  
  
  
  private
  
#  adding _destroy:true into params for deleting record      
  def add_destory_key_to_params(params)
      expense_product_ids = params[:expense][:expense_products_attributes].map{|k| k["id"]}
      all_expense_product_ids = @expense.expense_products.map(&:id)
      
      exp_prod_deleteable = all_expense_product_ids - expense_product_ids
      
      exp_prod_deleteable.each do |id|
        exp_product = ExpenseProduct.find(id)
        exp_product_item = {} 
        exp_product_item[:id] = exp_product.id
        exp_product_item[:prod_id] = exp_product.prod_id 
        exp_product_item[:name] = exp_product.name
        exp_product_item[:unit_cost_price] = exp_product.unit_cost_price
        exp_product_item[:quantity] = exp_product.quantity
        exp_product_item[:_destroy] = true
        params[:expense][:expense_products_attributes] << exp_product_item 
      end
  end
#     Over here
  
  def set_current_user
    ExpenseProduct.current = current_user
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
  
  def params_expense
    params.require(:expense).permit(:id , :expense_date , :business_name , :vendor , :category , :total_expense , :tax , :tax_amount , :note , :include_product_price , :created_by, :sub_amount ,:expense_products_attributes => [:id , :prod_id , :name , :unit_cost_price , :quantity , :_destroy] )
  end
  
  def find_expense
    @expense = Expense.find(params[:id])
  end
  
  
end





# {
    # "expense":
        # {
            # "expense_date":"12/5/2015", 
            # "business_name":"flp", 
            # "vendor":"kiran", 
            # "category":"honda", 
            # "total_expense":"2000", 
            # "tax":"26", 
            # "tax_amount":"200", 
            # "note":"hello dear ", 
            # "include_product_price":true, 
            # "created_by":"anuj", 
            # "expense_products_attributes":[
                         # {
                             # "name":"freedom",
                             # "unit_cost_price":"1205", 
                             # "quantity":"10"
#                              
                         # }]
#             
        # }
#     
# }