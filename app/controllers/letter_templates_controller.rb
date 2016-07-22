class LetterTemplatesController < ApplicationController
  respond_to :json
  before_filter :authorize
  before_action :find_company , :only =>[:index , :create ]
  before_action :find_letter_template , :only => [:edit , :update , :destroy]

  skip_before_filter :verify_authenticity_token, :unless => Proc.new { |c| c.request.format == 'application/json' }

  def index
 	letter_templates = @company.letter_templates.active_letter.order("created_at desc").select("id, template_name, template_body,default_email_subject")
  	render :json=> letter_templates
  end

  def new
    letter_template =  LetterTemplate.new
  	patient_attr = ["Patient.FullName",  "Patient.Title",  "Patient.FirstName",  "Patient.LastName"]
  	practitioner_attr = ["Practitioner.FullName", "Practitioner.Title", "Practitioner.FirstName"]
  	result = {} 
  	# result[:letter_template] = letter_template
    result[:letter_template] = letter_template
  	result[:patient] = patient_attr
  	result[:practitioner] = practitioner_attr
  	render:json => result
  end

  def create 
  	letter_template =@company.letter_templates.new(letter_template_params)
    if letter_template.valid?
      letter_template.save
      result = {flag: true , id:letter_template.id}
      render:json => result
   	else
      show_error_json(letter_template.errors.messages) 
  	end
  end
  
  def edit
  	letter_template = @letter_template.select("id , template_name , default_email_subject , template_body ").first
  	result = {}
  	result["letter_template"] = letter_template
  	render :json => result

  end

 def update
   letter_template = @letter_template.first
 	 letter_template.update_attributes(letter_template_params)
     if letter_template.valid?
        result = {flag: true }
        render :json => result  
     else 
      show_error_json-(letter_template.errors.messages)
     end
 end

  def destroy
  	letter_template = @letter_template.first
  	letter_template.update_attributes(:status=> false)
    if letter_template.valid?
      result = {flag: true }
      render :json => result  
    else 
      show_error_json-(letter_template.errors.messages)
    end
  end

   private

   def letter_template_params
     params.require(:letter_template).permit(:id, :template_name, :template_body, :default_email_subject)
   end

   def find_letter_template
   	 @letter_template = LetterTemplate.where(:id=> params[:id])
   end
end