class ConcessionTypeController < ApplicationController
  respond_to :json
  before_filter :authorize
  before_action :find_company , :only =>[:index , :new  , :create ]
  
  def index 
    concessions = @company.concessions.select("id , name")
    render :json=>concessions
    
  end
  
  def new 

  end
  
  def create
    concession = @company.concessions.build(:name=>params[:concession_type][:name])
    if concession.valid?
      concession.save
      result = {:flag=> true , :concession_id => concession.id}
      render :json=> result
    else
      show_error_json(concession.errors.messages) 
    end
    
  end
  
  def edit  
    begin
      concession = Concession.find(params[:id])
      result = {id: concession.id , name: concession.name}   
    rescue
      result= {}
    end
    
    render :json=> result    
  end
  
  def update
    begin
      concession = Concession.find(params[:id])
      flag = concession.update_attributes(name: params[:name])
      if concession.valid?
        render :json=> flag  
      else
        show_error_json(concession.errors.messages)   
      end
    rescue Exception=> e
      render :json=> {flag: false , error: e.message}  
    end
    
  end
  
  def destroy
    concession = Concession.find(params[:id])
    flag = concession.destroy
    render :json=> {flag: flag}
  end
    
  
  
end
