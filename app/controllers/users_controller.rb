class UsersController < ApplicationController
  respond_to :json
  before_filter :authorize
  before_action :find_company , :only =>[:index , :new  , :create ]
  
  def index
    begin
    users = @company.users.select("users.id , users.first_name , users.last_name , users.is_doctor , users.role")
    render :json=> users
    rescue Exception=> e
       render :json=>{session_valid: false}
     end
  end
  
  def new 
    begin 
    user = @company.users.build
    user_basic = {title: user.title , first_name: user.first_name , last_name: user.last_name , email: user.email , is_doctor: user.is_doctor, phone: user.phone , time_zone: user.time_zone , auth_factor: user.auth_factor , role: user.role  , acc_active: user.acc_active}
    user_info = user.build_practi_info
    appointment_services = user_info.appointment_services
    
    user_refer = user.practi_refers
    user_avail = []
    params[:user_basic]
#     Code to generate practitioner availability business wise --- begin here  
    @company.businesses.each do |business|
      record = {}
      record[:business_id] = business.id
      record[:business_name] = business.name
      record[:days] = []
      user_avail << record
    end
#     ------ end here 
    
    user_info_attr = {designation: user_info.designation , desc: user_info.desc, default_type: user_info.default_type , notify_by: user_info.notify_by , cancel_time: user_info.cancel_time , is_online: user_info.is_online , allow_external_calendar: user_info.allow_external_calendar }    
    res = {user_basic: user_basic ,practi_info: user_info_attr , user_refer:user_refer , appointment_services: appointment_services , user_availability: user_avail }
    
    render :json=> res
    
    rescue Exception=> e
       render :json=>{session_valid: false}
     end
  end
  
  def create 
    begin
      max_doctor  = @company.subscription.doctors_no 
      avail_doctor = @company.users.doctors.count
      user = @company.users.new(params[:user_basic])
      
      if (avail_doctor < max_doctor)
        if  user.valid? == true
          if user.is_doctor
            user_info = user.build_practi_info(params[:practi_info])
            user_info.appointment_services = params[:appointment_services]
            if user_info.valid? == true
              user.save
              user_info.save
              params[:user_refer].each do |refr|
                user_info.practi_refers.create(ref_type: refr[:ref_type], number: refr[:number] , business_id: refr[:business_id])
              end
              params[:user_availability].each do |availability|
                business  = @company.businesses.find(availability[:business_id])
                user_info.businesses <<  business
    #             Create practi availability
                availability[:days].each do |day|
                  practi_avail = PractiAvail.create(day_name: day[:day_name], start_hr: day[:start_hs], start_min: day[:start_min], end_hr: day[:end_hr] , end_min: day[:end_min] , is_selected: day[:is_selected] , business_id: business.id , practi_info_id: user_info.id ,cust_break: day[:cust_break] )
                  day[:cust_break].try(:each) do |day_break|
                    PractiAvail.create(:start_hr=> day_break[:start_hr] , :start_min=> day_break[:start_min], :end_hr=>day_break[:end_hr] , :end_min=> day_break[:end_min])
                  end  unless day[:cust_break].nil?             
                end
              end
              UserMailer.welcome_email(user ,user.temp_password ).deliver_now
              render :json=> {:flag => true , :user_id=> user.id}
              
            else
              show_error_json(user_info.errors.messages)
            end
          else
            user.save 
            UserMailer.welcome_email(user ,user.temp_password ).deliver_now
            render :json=> {:flag => true , :user_id=> user.id}
          end         
        else
          show_error_json(user.errors.messages)
        end
      else
        user.errors.add("subscription", "Practitioner can't be added. Out of subscription plan ")
        show_error_json(user.errors.messages)
      end  
              
    rescue Exception=> e
      user.errors.add(:base , e.message) 
      show_error_json(user.errors.messages)
    end
    
    
    
  end
  
  def edit
    user = User.select("id ,title , first_name , last_name , email , is_doctor , phone , time_zone , auth_factor , role , acc_active, company_id  ").find(params[:id]) rescue nil
    unless user.nil?   
      if user.is_doctor == true
        user_info = user.practi_info
        user_info_attr = {id: user_info.id , designation: user_info.designation , desc: user_info.desc, default_type: user_info.default_type , notify_by: user_info.notify_by , cancel_time: user_info.cancel_time , is_online: user_info.is_online , allow_external_calendar: user_info.allow_external_calendar }
        user_refer = user.practi_info.practi_refers.select("practi_refers.id , practi_refers.ref_type, practi_refers.number , practi_refers.business_id")
        appointment_services = user_info.appointment_services
    
    #   Add availability beginning here -->   
        user_avail = []
        user.company.businesses.each do |business|
         record = {}
         record[:business_id] = business.id
         record[:business_name] = business.name
         avail_days = PractiAvail.where(["business_id= ? AND practi_info_id = ?" ,business.id , user_info.id]).select("id , day_name , start_hr , start_min , end_hr , end_min , is_selected , cust_break")
         record[:days] = avail_days
         user_avail << record
        end  
        
        res = { user_basic: user, practi_info: user_info_attr , user_refer: user_refer , :appointment_services=> appointment_services , user_availability: user_avail }  
      else
        # user_info = PractiInfo.joins(:user).where(["users.id= ?", user.id]).select("practi_infos.id, practi_infos.designation , practi_infos.desc, practi_infos.default_type , practi_infos.notify_by , practi_infos.cancel_time, practi_infos.is_online")
        company = user.company
        user_refer=[]
        appointment_services = []
        user_availability = [] 
        company.businesses.each do |business|
          record = {}
          record[:business_id] = business.id
          record[:business_name] = business.name
          record[:days] = []
          user_availability << record
        end 
        res = { user_basic: user ,user_refer: user_refer , appointment_services: appointment_services , user_availability:user_availability }     
      end
      render :json=> res
    else
      render :json=> {:error=> "user Not found"}
    end
  end
  
  def update
    begin
      begin
        user = User.find(params[:id])
        user_info = user.practi_info   
        if user_info.nil? && params[:user_basic][:is_doctor]
          user_info = user.create_practi_info()
        end
      rescue Exception=> e
        user = nil
      end
      if user
       if params[:user_basic][:is_doctor]
          params[:user_basic].reject!{|k | k =="id" ||  k == "company_id"}
          basic_flag = user.update_attributes(params[:user_basic])
          if user.valid? 
            begin
              user_info.update_attributes(appointment_services:params[:appointment_services])
              params[:practi_info].reject!{|k | k =="id"}
              info_flag = user_info.update_attributes(params[:practi_info])  rescue nil
            rescue Exception=> e
            end
            user.practi_info.practi_refers = []
            params[:user_refer] = [] if params[:user_refer].nil?
            params[:user_refer].try(:each) do |user_refer|
              # find refer if exists 
              begin
                refer = PractiRefer.find(user_refer[:id])  
              rescue Exception => e
                refer = nil
              end
              
                # update refer if exists otherwise created one
              unless refer.nil?
                refer.update_attributes("ref_type"=>user_refer[:ref_type], "number"=>user_refer[:number], "business_id"=>user_refer[:business_id])
              else
                refer_flag = user.practi_info.practi_refers.create("ref_type"=>user_refer[:ref_type], "number"=>user_refer[:number], "business_id"=>user_refer[:business_id]) 
              end
            end     # ending of refer block 
            
    #         Create practitioner availability and their respective breaks
            params[:user_availability].each do |avail|
              avail[:days].each do |day|
                begin
                  avail_day = PractiAvail.find_by_id(day[:id])
                rescue
                  avail_day = nil
                end
                unless avail_day.nil?
                  avail_day.update_attributes(day_name: day[:day_name], start_hr: day[:start_hr] , :start_min=>day[:start_min], :end_hr=>day[:end_hr], :end_min=>day[:end_min], :is_selected=>day[:is_selected], :cust_break=>day[:cust_break])
                else
                  PractiAvail.create(day_name: day[:day_name], start_hr: day[:start_hr] , :start_min=>day[:start_min], :end_hr=>day[:end_hr], :end_min=>day[:end_min], :is_selected=>day[:is_selected], :cust_break=>day[:cust_break] ,:business_id=>avail[:business_id] , practi_info_id: user_info.id )
                end
              end
            end
            res = {:flag=>true , user_id: user.id}
            render :json=> res
          else
            show_error_json(user.errors.messages)
          end
          
       else
         # code to update for change practitioner as simple
         params[:user_basic].reject!{|k | k =="id" ||  k == "company_id"}
         basic_info = user.update_attributes(params[:user_basic])
         if user.valid? == true
          user_info.destroy unless user_info.nil?
          res = {:flag=>true , user_id: user.id}
          render :json=> res    
         else
           show_error_json(user.errors.messages)
         end
       end
      else
        render :json=> {:user=> "Not found"}       
      end
    rescue Exception=> e
      user.errors.add(:base , e.message) 
      show_error_json(user.errors.messages)
    end
  end
  
  def destroy
    user = User.find(params[:id])
    if user.destroy
      render :json=>{flag: true}
    else
      show_error_json(user.errors.messages , flag= false)
    end
    
  end
  
end
