class TemplateNotesController < ApplicationController
  respond_to :json
  before_filter :authorize
  before_action :find_company , :only =>[:index , :new  , :create ]
  before_action :which_template , :only =>[:show , :edit , :update , :destroy, :download , :import_template_by_file ]
  
   def index 
    template_notes = @company.template_notes
    result = []
    
    template_notes.each do| note |
      option_list = ""
      record_temp  = {}
      record_temp[:id] = note.id
      record_temp[:name] = note.name
      record_temp[:no_quest] = note.questions.count
      record_temp[:no_section] = note.temp_sections.count

#     To add option list on hover of the note item   
      option_list = "Address ," if note.show_patient_addr
      option_list += "DOB ," if note.show_patient_dob
      option_list += "Medicare ," if note.show_patient_medicare
      option_list += "Occupation" if note.show_patient_occup  
      
      record_temp[:option_list] = option_list.chomp(",")
      result << record_temp  
    end
    
    render :json=> result  
   end
   
   def new 
     template_note = @company.template_notes.new
     
   end
   
   def create 
     template_note = @company.template_notes.new(template_note_params)
     if template_note.valid?
      template_note.save
      result = {flag: true , template_id: template_note.id}
      render :json=> result
     else 
      show_error_json(template_note.errors.messages)    
     end 
     
   end
   
   def show
    begin
      result = template_format(@template_note)
      render :json=> result  
    rescue
      render :json=> {:error=> "Record not found"}
    end 
     
   end
   
   def edit 
    begin
      result = template_format(@template_note)
      render :json=> result 
    rescue
      render :json=> {:error=> "Record not found"}
    end 
         
   end
   
   def update
     company = @template_note.company
     

     template_note = company.template_notes.new(template_note_params)
     if template_note.valid?
      @template_note.destroy
      template_note.save
      result = {flag: true , template_id: template_note.id}
      render :json=> result
     else 
      show_error_json(template_note.errors.messages)    
     end
     
   end
   
   def destroy
     @template_note.destroy
     render :json=> true
   end
   
#    TO export current template data in json file   
    def download
      begin
        file  = File.open("public/event.json","w")
        @data = template_format(@template_note , true)
        if file
          file.syswrite(@data.to_json)
          send_file file
        end
      rescue Exception => e
        render :nothing=> true 
      end
   end
   
#    Create template from json file 
   def import_template_by_file
     content = JSON.parse(File.read(params[:file].tempfile))
     company = Company.find(params[:id])
     template_note = company.template_notes.new(content)
     if template_note.valid?
       template_note.save
       result = {flag: true , id: template_note.id}
     else
       result = {flag: false} 
     end
     render :json=> result 
   end
    
   
   private

#  To show the specific attributes of template and its associations      

   def template_format(template_note , download_format=false)
      result = {}
      result[:id] = template_note.id unless download_format 
      result[:name] = template_note.name
      result[:temp_sections_attributes] = []
      sections  = template_note.temp_sections
      sections.each do |section|
        set_section = {}
        set_section[:id] = section.id unless download_format 
        set_section[:name] = section.name
        set_section[:questions_attributes] = []
        section.questions.each do |qs|
          set_qs = {}
          set_qs[:id] = qs.id unless download_format 
          set_qs[:title] = qs.title
          set_qs[:q_type] = qs.q_type
          set_qs[:quest_choices_attributes] = []
          qs.quest_choices.each do |choice|
            set_choice = {}
            set_choice[:id] = choice.id unless download_format 
            set_choice[:title] = choice.title
            set_qs[:quest_choices_attributes] << set_choice 
          end 
          set_section[:questions_attributes] << set_qs
        end
        result[:temp_sections_attributes] << set_section
      end
      result[:show_patient_addr] = template_note.show_patient_addr
      result[:show_patient_dob] = template_note.show_patient_dob
      result[:show_patient_medicare] = template_note.show_patient_medicare
      result[:show_patient_occup] = template_note.show_patient_occup
      
      return result 
   end
   
   def which_template
     @template_note = TemplateNote.find(params[:id]) rescue nil
   end 
   
   def template_note_params
    params.require(:template_note).permit(:name , :title , :show_patient_addr , :show_patient_dob , :show_patient_medicare , :show_patient_occup , temp_sections_attributes:[:name  , questions_attributes: [:title , :q_type , quest_choices_attributes: [:title ]]])
    # params.require(:template_note).permit!
   end
   
end
