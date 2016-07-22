class SmsSettingController < ApplicationController
  respond_to :json
  before_filter :authorize
  before_action :find_company , :only =>[:edit , :update]
  
  def edit 
    sms_setting = @company.sms_setting
    sms_setting_detail = {id: sms_setting.id, sms_alert_no: sms_setting.sms_alert_no , mob_no: sms_setting.mob_no , email: sms_setting.email ,  default_sms: sms_setting.default_sms }
    
    sms_plans = Owner.find_by_role("Super Admin").sms_plans.select("id, amount , no_sms")
    result = { sms_setting_detail: sms_setting_detail , sms_plans: sms_plans } 
    render :json=> result  
  end
  
  def update
    sms_setting = SmsSetting.find(params[:sms_setting][:id])
    status  = sms_setting.update(sms_setting_params)
    if status
      
      sms_setting.save
      result = {flag: true , sms_setting_id: sms_setting.id}
      render :json=> result
     else 
      show_error_json(sms_setting.errors.messages)    
     end
    
  end
  
  private 

  def sms_setting_params
    params.require(:sms_setting).permit(:id , :sms_alert_no , :mob_no , :email , :default_sms)
  end
  
end
