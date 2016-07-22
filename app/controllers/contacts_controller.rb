class ContactsController < ApplicationController
  respond_to :json
  before_filter :authorize
  before_action :find_company , :only =>[:index , :create , :new ]
  before_action :find_contact , :only => [:edit , :update , :destroy]
  
  before_action :prevent_access_from_unauth
  before_action :stop_delete_unauth , :only => [:destroy]
  
  # using only for postman to test API. Remove later  
  skip_before_filter :verify_authenticity_token, :unless => Proc.new { |c| c.request.format == 'application/json' }

  
  def index 
    # contacts= @company.contacts.specific_attributes.active_contact.order("created_at desc")
    contacts= @company.contacts.order("created_at desc").active_contact.select("id, first_name , last_name , phone_list , occupation , company_name")
    contacts_list = []
    contacts.each do |item|
      contact = {}
      contact[:id] = item.id
      contact[:first_name] = item.first_name
      contact[:last_name] = item.last_name
      contact[:phone_list] = item.phone_list.first
      contact[:occupation] = item.occupation
      contact[:company_name] = item.company_name
      contacts_list << contact
    end
    render :json=> contacts_list     
    
  end
  
  def new 
    contact = @company.contacts.new
    render :json=> {contact: contact}
    
  end
  
  def create 
    contact = @company.contacts.new(contact_params)
    if contact.valid?
      contact.save
      result = {flag: true , id: contact.id }
      render :json=> result
      
    else
      show_error_json(contact.errors.messages) 
    end
  end 
  
  def edit
    render :json => @contact.specific_attributes.first  
  end
  
  def update
    contact = @contact.first  
    contact.update_attributes(contact_params)
    if contact.valid?
      contact.save
      result = {flag: true , id: contact.id }
      render :json=> result
      
    else
      show_error_json(contact.errors.messages) 
    end      
  end
  
  def destroy
    contact = @contact.first
    contact.update_attributes(status: false)
    if contact.valid?
      render :json=> {flag: true}
    else
      show_error_json(contact.errors.messages)
    end
  end
  
  private
  
  def contact_params
    params.require(:contact).permit( :id , :contact_type , :title , :first_name , :last_name , :preffered_name , :occupation , :company_name , :provider_number , {phone_list: [:contact_no, :type]} , :email , :address, :city , :state, :post_code, :country, :notes, :status)
  end
  
  def find_contact
    @contact = Contact.where(:id=> params[:id])
  end
  
  # Filter to prevent access of scheduler 
  def prevent_access_from_unauth
    role = current_user.role
    if role.casecmp(ROLE[0]) == 0 || role.casecmp(ROLE[3]) == 0
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




# {
  # "contact": {
    # "id": null,
    # "contact_type": null,
    # "title": null,
    # "first_name": null,
    # "last_name": null,
    # "preffered_name": null,
    # "occupation": null,
    # "company_name": null,
    # "provider_number": null,
    # "phone_list": [{:contact_no=>9501222018, :type=>"mobile"}],
    # "email": null,
    # "address_1": null,
    # "address_2": null,
    # "address_3": null,
    # "city": null,
    # "state": null,
    # "post_code": null,
    # "country": null,
    # "notes": null,
  # }
# }