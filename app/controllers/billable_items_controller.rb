class BillableItemsController < ApplicationController
  respond_to :json
  before_filter :authorize
  before_action :find_company , :only =>[:index , :new  , :create , :billable_item_list ]
  
  def index
    billable_items = @company.billable_items.select("billable_items.id, billable_items.item_code , billable_items.name, billable_items.price , billable_items.include_tax , billable_items.tax , billable_items.item_type")
    render :json=> billable_items
  end
  
  def new
    billable_item = @company.billable_items.new
    render :json => billable_item 
  end
  
  def create
      billable_item = @company.billable_items.build(params[:billable_item])
      if billable_item.valid?
        billable_item.concession_price =  params[:concession_price]
        billable_item.save
        params[:concession_price].each do |concession|
          name = Concession.find(concession["id"]).name
          BillableItemsConcession.create(billable_item_id: billable_item.id , concession_id: concession["id"], value: concession["value"] , name: name)    
        end
        result = {flag: true ,  id: billable_item.id}
        render :json=> result
      else
        show_error_json(billable_item.errors.messages) 
      end
    
  end
  
  def edit
    billable_item = BillableItem.select("id, item_code , name , price , include_tax , tax , item_type , concession_price ").find(params[:id])
    render :json => billable_item
  end
  
  def update
    billable_item = BillableItem.find(params[:id])
    billable_item.concession_price =  params[:concession_price]
    billable_item.save
    status  = billable_item.update_attributes(params[:billable_item])
    if status
      result = {flag: true}
      render :json => result
    else
      show_error_json(billable_item.errors.messages) 
    end    
     
  end
  
  def destroy
    billable_item = BillableItem.find(params[:id])
    flag =  billable_item.destroy
    result = {flag: true}
    render :json => result
  end  
  
  def billable_item_list
    billable_items = @company.billable_items.select("billable_items.id , billable_items.name")
    render :json=> billable_items
  end
  
end
