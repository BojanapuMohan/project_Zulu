class RecallTypesController < ApplicationController
  respond_to :json
  before_filter :authorize
  before_action :find_company , :only =>[:index , :create ]
  
  def index 
    recall_types = @company.recall_types.select("id , name, period_name , period_val")
    render :json=> recall_types
  end
  
  def create
    recall_type = @company.recall_types.new(name: params[:recall_type][:name] , period_name: params[:recall_type][:period_name], period_val: params[:recall_type][:period_val])
    if recall_type.valid?
      recall_type.save
      result = {flag: true , id: recall_type.id}
      render :json=> result 
    else
      show_error_json(recall_type.errors.messages)
    end
    
    
  end
  
  def edit 
    recall_type =RecallType.select("id, name , period_name , period_val ").find(params[:id]) rescue nil
    render :json=> recall_type
    
  end
  
  def update
    recall_type = RecallType.find(params[:id]) rescue nil
    status = recall_type.update_attributes(name: params[:recall_type][:name], period_name: params[:recall_type][:period_name], period_val: params[:recall_type][:period_val])
    if status
      recall_type.save
      result = {flag: true , id: recall_type.id}
      render :json=> result 
    else
      show_error_json(recall_type.errors.messages)
    end
  end
  
  def destroy
    recall_type = RecallType.find(params[:id]) rescue nil
    recall_type.destroy
    render :json=>{flag: true}
    
  end
  
end
