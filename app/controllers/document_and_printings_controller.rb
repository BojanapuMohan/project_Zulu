class DocumentAndPrintingsController < ApplicationController
 respond_to :json
  before_filter :authorize
  before_action :find_company , :only =>[:index , :create , :new ]
  before_action :find_document_and_printing , :only => [:edit , :update , :destroy]

  skip_before_filter :verify_authenticity_token, :unless => Proc.new { |c| c.request.format == 'application/json' }

	def index
      document_and_printing = DocumentAndPrinting.where(["company_id= ?", @company.id]).specific_attributes
      render json: document_and_printing
	end

  def new
	  document_and_printing = DocumentAndPrinting.new
      result = {} 
      result[:document_and_printing] = document_and_printing
      render json: result
	end

	def create
   	  document_and_printing = @company.build_document_and_printing(document_and_printing_params)
      if document_and_printing.valid?
         document_and_printing.save
         result = { flag: true, id: document_and_printing.id}
         render json: result
      else
         show_error_json(document_and_printing.errors.messages) 
      end
	end

	def edit
     render :json => @document_and_printing.specific_attributes.first 
	end

	def update
	  document_and_printing = @document_and_printing.first
    document_and_printing.update(document_and_printing_params)
 	    if document_and_printing.valid?
	       result = {flag: true }
	       render json: result  
	    else 
	      show_error_json(document_and_printing.errors.messages)
	    end
	end

  private

    def document_and_printing_params
      params.require(:document_and_printing).permit(:id, :logo_height, :in_page_size, :in_top_margin, :as_title, :l_space_un_logo,:l_top_margin, :l_bottom_margin, :l_bleft_margin, :l_right_margin, :tn_page_size,:tn_top_margin, :status )	
    end

    def find_document_and_printing
      @document_and_printing = DocumentAndPrinting.where(id: params[:id])
    end
end
