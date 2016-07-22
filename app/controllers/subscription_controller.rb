class SubscriptionController < ApplicationController
  respond_to :json
  before_filter :authorize
  before_action :find_company , :only =>[:index , :update]
  
  def index 
    subscription =  @company.subscription
    plans = Owner.find_by_role("Super Admin").plans.select("id , name , no_doctors , price , category")
    
    result = {}
    current_plans = []
    no_practitioners  =@company.users.doctors.count
    
#   To add subscription details
    subscription_details = {current_plan: subscription.name , avail_practi: no_practitioners , max_practi: subscription.doctors_no , next_billing_date: (subscription.purchase_date+30.days) , category: subscription.category , fee: subscription.cost , remaining_days: 30 -(Date.today.mjd-subscription.purchase_date.mjd) }      
    
    
#   To show list all  
    plans.each do |plan|
      if plan.name == subscription.try(:name) && plan.category == subscription.try(:category)
        item = {id: subscription.id,  name: subscription.name , no_doctors: subscription.doctors_no , price: subscription.cost  , category: subscription.category , is_selected: true }
      else
        if no_practitioners > plan.no_doctors
          item = {id: plan.id, name: plan.name , no_doctors: plan.no_doctors , price: plan.price  , category: plan.category , is_selected: false , not_available: true  } 
        else 
          item = {id: plan.id, name: plan.name , no_doctors: plan.no_doctors , price: plan.price  , category: plan.category , is_selected: false} 
        end
      end 
      current_plans << item         
    end    
    result[:subscription_detail] = subscription_details
    result[:plans] = current_plans    
    render :json => result
  end
  
  def update
    
    plan = Plan.find(params[:id]) rescue nil
#   TO update plan with current date     
    unless plan.nil?
      subscription = @company.subscription
      status =  subscription.update_attributes( name: plan.name , doctors_no: plan.no_doctors, purchase_date: Date.today, cost: plan.price, category: plan.category )
      if status
        result ={flag: status }
        render :json => result 
      else 
        show_error_json(subscription.errors.messages)
      end
    else 
      result ={flag: false} 
      render :json => result 
    end
  end
  
end
