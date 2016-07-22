class InvoiceSetting < ActiveRecord::Base
  belongs_to :company

  scope :specific_attributes , ->{ select("id, title, starting_invoice_number, extra_bussiness_information, offer_text, default_notes, show_business_info, hide_business_details, include_next_appointment")}
  scope :active_invoices, ->{ where(status: true)}

  validates_presence_of :title, :starting_invoice_number, :on=> [:create] , :message=>"can't be left blank"
  validates_uniqueness_of :starting_invoice_number, :message=>"starting_invoice_number already exists"

end
