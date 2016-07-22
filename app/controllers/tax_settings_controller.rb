class TaxSettingsController < ApplicationController
  respond_to :json
  before_filter :authorize
  before_action :find_company , :only =>[:index  , :create ]
  
  def index 
    taxes  = @company.tax_settings.select("id , name , amount")
    render :json => taxes  
  end
  
  def create
    tax = @company.tax_settings.new(name: params[:tax_setting][:name] , amount: params[:tax_setting][:amount])
    if tax.valid?
      tax.save
      result = {flag: true , id: tax.id}
      render :json=> result 
    else
      show_error_json(tax.errors.messages)
    end
    
  end
  
  def edit
    tax = TaxSetting.select("id, name , amount ").find(params[:id]) rescue nil
    render :json=> tax
    
  end
  
  def update
    tax = TaxSetting.find(params[:id]) rescue nil
    status = tax.update_attributes(name: params[:tax_setting][:name], amount: params[:tax_setting][:amount] )
    if status
      result = {flag: true , id: tax.id}
      render :json=> result
    else
      show_error_json(tax.errors.messages)
    end
  end
  
  def destroy
    # tax = TaxSetting.find(params[:id]) rescue nil
    # tax.destroy
    # render :json=>{flag: true}
  end

  
end
