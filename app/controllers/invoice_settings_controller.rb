class InvoiceSettingsController < ApplicationController
 respond_to :json
  before_filter :authorize
  before_action :find_company , :only =>[:index , :create , :new ]
  before_action :find_invoice_setting, only: [:edit, :update, :destroy]

  skip_before_filter :verify_authenticity_token, :unless => Proc.new { |c| c.request.format == 'application/json' }

  def index
  	invoices = InvoiceSetting.where(["status= ? AND company_id= ?", true , @company.id]).specific_attributes
    render :json => invoices
  end

  def new
    invoice = InvoiceSetting.new
    result = {} 
    result[:invoice_setting] = invoice
    render :json =>  result
  end

  def create
  	invoice = @company.build_invoice_setting(invoice_setting_params)
      if invoice.valid?
         invoice.save
         result = { flag: true, id: invoice.id}
         render :json=>  result
       else
          show_error_json(invoice.errors.messages) 
       end
  end
  
  def edit
  render :json => @invoice.specific_attributes.first 
  end

  def update
  	invoice = @invoice.first
    invoice.update(invoice_setting_params)
    if invoice.valid?
    	result = {flag: true }
        render json: result  
    else 
    	show_error_json(invoice.errors.messages)
    end
  end

  def destroy 
    invoice = @invoice.first
    invoice.update(status: false)
      if invoice.valid?
         result = {flag: true }
         render json: result  
     else 
       show_error_json(invoice.errors.messages)
     end   
  end

  private 

    def find_invoice_setting
      @invoice = InvoiceSetting.where(id: params[:id])
    end

    def invoice_setting_params
      params.require(:invoice_setting).permit(:id,:title, :starting_invoice_number, :extra_bussiness_information, :offer_text, :default_notes, :show_business_info, :hide_business_details, :include_next_appointment)
    end
end
