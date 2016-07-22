class CompanyObserver < ActiveRecord::Observer
  observe :company
 
  def after_create(company)
    business = company.businesses.create(:name=>company.company_name)
    company.users.map{|user| user.destroy}
    user = company.users.create(email: company.email , first_name: "temp", last_name: "temp " ,:password=> company.password , :password_confirmation => company.password , :role=>"Administrator" , :is_doctor=> true)
    user_info = user.create_practi_info()
    
    user_info.businesses << business
    user_refer = user_info.practi_refers.create(business_id: business.id)
    
#     create online booking for company
    company.create_online_booking(min_appointment: "1" , advance_booking_time: "1h" , min_cancel_appoint_time: "1h", notify_by: "None" )
    
#     create concession types
    CONCESSION_NAMES.each do |cs_name|
      company.concessions.create(:name=> cs_name )
    end
    
    
# To create default taxes      
    TAXES.each do |tax|
      company.tax_settings.create(:name=> tax , :amount=>10)
    end
    
# To create default payment types    
    PAYMENT_TYPES.each do |payment_name|
      company.payment_types.create(:name=> payment_name)
    end
    
#     To create billable items and their concessions and amounts
    BILLABLE_ITEM_NAMES.each_with_index do| bill_item ,index|
      if index==0
        billable_item = company.billable_items.create(:name=>bill_item, :price=> 100 , :include_tax=> false, :tax=>"N/A" )
      elsif index ==1
        billable_item = company.billable_items.create(:name=>bill_item, :price=> 50 , :include_tax=> false, :tax=>"N/A" )
      end
      billable_item.concession_price = []
      company.concessions.each do |concession|
        item_wise_concession = BillableItemsConcession.create(billable_item_id: billable_item.id , concession_id: concession.id, value: "" , name: concession.name )
        billable_item.concession_price << { id: concession.id,   name: concession.name , amount: ""}    
      end
      billable_item.save

    end
    
#     To create the template notes 
    TEMPLATE_NOTES_NAMES.each do |note_name|
      company.template_notes.create(:name=> note_name)  
    end
#     To create recall types 
    RECALL_TYPES.each_with_index do |recall_type, index|
      if index == 0
        company.recall_types.create(name: recall_type , period_name: "Month(s)" , period_val: "6")
      else
        company.recall_types.create(name: recall_type , period_name: "Month(s)" , period_val: "3")
      end
    end
    
    
   APPOINTMENT_NAMES.each_with_index do |appointment, index|
     if index == 0
      appointment = company.appointment_types.create(:name=> appointment, :duration_time=>45 , :billable_item=> [{id: company.billable_items.try(:first).try(:id) , name: company.billable_items.try(:first).try(:name)}] , default_note_template: "N/A", related_product: [] , color_code: "N/A" , confirm_email: false , send_reminder: true)

      # company.users.doctors.each do |doctor|
        # AppointmentTypesUser.create(appointment_type_id: appointment.id , user_id: doctor.id, first_name: doctor.first_name , last_name: doctor.last_name )
      # end

      service  = {id: appointment.id , name: appointment.name , is_selected: false}
      user_info.appointment_services << service
      user_info.save
      
     elsif index ==1
      appointment = company.appointment_types.create(:name=> appointment, :duration_time=>30 , :billable_item=> [{id: company.billable_items.try(:first).try(:id) , name: company.billable_items.try(:first).try(:name)}], default_note_template: "N/A", related_product: [] , color_code: "N/A" , confirm_email: false , send_reminder: true)

      # company.users.doctors.each do |doctor|
        # AppointmentTypesUser.create(appointment_type_id: appointment.id , user_id: doctor.id, first_name: doctor.first_name , last_name: doctor.last_name )
      # end

      service  = {id: appointment.id , name: appointment.name , is_selected: false}
      user_info.appointment_services << service
      user_info.save 
       
     end
   end
       
#   user availability in week days for a business
    Date::DAYNAMES.each_with_index do |day, index|
      if index ==0 || index==6
        PractiAvail.create(day_name: day ,start_hr: 9, start_min: 0, end_hr: 17, end_min: 0 , is_selected: false, business_id: business.id , practi_info_id: user_info.id)
        # BusinessAvail.create(day_name: day ,start_hr: 9, start_min: 0, end_hr: 17, end_min: 0 , is_selected: false, business_id: business.id )
      else
        PractiAvail.create(day_name: day ,start_hr: 9, start_min: 0, end_hr: 17, end_min: 0 , is_selected: true, business_id: business.id , practi_info_id: user_info.id)
        # BusinessAvail.create(day_name: day ,start_hr: 9, start_min: 0, end_hr: 17, end_min: 0 , is_selected: true, business_id: business.id )
      end
    end
    
#    Create a default sms-setting for company
    
    sms_setting = company.create_sms_setting(sms_alert_no: 100 , default_sms:  5)  

#     Creating default invoice setting of company 

    invoice_setting = company.build_invoice_setting(title: "Tax Invoice", starting_invoice_number:1  , extra_bussiness_information: nil, offer_text:nil , default_notes: nil, show_business_info: false, hide_business_details: false, include_next_appointment: true, status: true)
      if invoice_setting.valid? 
         invoice_setting.save
      end

#     Creating a default DocumentAndPrinting  of comapny
     document_and_printing =  company.build_document_and_printing(logo_height: 60, in_page_size: "A4", in_top_margin: 60, as_title: "Account Statement", l_space_un_logo: 21, l_top_margin: 15, l_bottom_margin: 20, l_bleft_margin: 15, l_right_margin: 15, tn_page_size: "A4", tn_top_margin: 70, l_display_logo: true, tn_display_logo: true, hide_us_cb: false)
       if document_and_printing.valid?
          document_and_printing.save
       end

#     To create subscription plan
    default_plan = Plan.where(["no_doctors = ? AND category = ? ", 5 , "Monthly"]).first 
    subscription  =company.build_subscription(name: default_plan.name , doctors_no: default_plan.no_doctors , cost: default_plan.price  , category: default_plan.category , purchase_date: Date.today)
    if subscription.valid?
      subscription.save
    end         
  end
  
  def after_update(company)
    user = company.users.last
    status = user.update_attributes(:first_name=> company.first_name , :last_name=> company.last_name, :time_zone=>company.time_zone , :password=> company.password , :password_confirmation => company.password)
      
  end
end