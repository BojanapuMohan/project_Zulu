class ReferralTypesController < ApplicationController
  respond_to :json
  before_filter :authorize
  before_action :find_company , :only =>[:index , :create , :new ]
  before_action :find_referral_type , :only => [:edit , :update , :destroy]

   skip_before_filter :verify_authenticity_token, :unless => Proc.new { |c| c.request.format == 'application/json' }

  def index
    referral_types = @company.referral_types.order("created_at desc").select("id, referral_source, referral_sub_category")
    render json: referral_types
  end

  def new
    referral_type  = ReferralType.new
    result = {}
    result[:referral_type] =  referral_type
    render :json =>  result
  end

  def create
    referral_type = @company.referral_types.new(referral_type_params)
      if referral_type.valid?
         referral_type.save
         result = { flag: true, id: referral_type.id}
         render :json =>  result
      else
         show_error_json(referral_type.errors.messages) 
      end
  end

  def edit
    render :json => @referral_type.specific_attributes.first  
  end

  def update
   referral_type = @referral_type.first
   referral_type.update(referral_type_params)
     if referral_type.valid?
       result = {flag: true }
       render json: result  
      else 
        show_error_json(referral_type.errors.messages)
      end
  end

  def destroy
   referral_type = @referral_type.first
   referral_type.update_attributes(:status=> false)
    if referral_type.valid?
      result = {flag: true }
      render json: result  
    else 
      show_error_json(referral_type.errors.messages)
    end   
  end

  private

  def referral_type_params
    params.require(:referral_type).permit(:id , :referral_source , {referral_sub_category:[]})
  end
 
  def find_referral_type
    @referral_type = ReferralType.where(:id=> params[:id])
  end

end