class AppointmentReminder < ActiveRecord::Base
  belongs_to :company
  #belongs_to :user
  #has_one :company, through: :user, :conditions => ['user.status = ?', true ]

    # scope :specific_attributes , ->{ select("id, d_reminder_type, reminder_time, skip_weekends, reminder_period,
    #             apply_reminder_type_to_all, ac_email_subject, ac_email_content,
    #             ac_app_can_show, hide_address_show, reminder_email_subject,
    #             reminder_email_enabled, reminder_email_content, reminder_app_can_show,
    #             sms_enabled, sms_text, sms_app_can_show")}

end
