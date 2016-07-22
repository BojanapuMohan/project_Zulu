Rails.application.routes.draw do
  
  

  get "sign_in" => "authentication#sign_in" 
  post "sign_in" => "authentication#login", :defaults => { :format => 'json' }
  get "signed_out" => "authentication#signed_out"
  get "change_password" => "authentication#change_password"
  get "forgot_password" => "authentication#forgot_password"
  get "new_user" => "authentication#new_user"
  get "password_sent" => "authentication#password_sent"
    
  get "getsession" => "authentication#get_session" , :defaults => { :format => 'json' }
  
  
  
  resources :registers
  resources :letter_templates 
  resources :referral_types
  resources  :invoice_settings
  resources  :document_and_printings
  resources  :appointment_reminders
  
#    routes for settings module 
  resources :settings  do
    resources :business 
    resources :users
    resources :appointment_type , shallow: true
    resources :online_booking, shallow: true
    resources :concession_type , shallow: true
    resources :billable_items , shallow: true
    resources :tax_settings , shallow: true
    resources :payment_types , shallow: true
    resources :recall_types , shallow: true
    resources :products , shallow: true , only: [:index, :create, :update, :destroy] do 
      resources :product_stocks , only: [:index , :create]
    end
    
    resources :expenses , shallow: true 
    resources :contacts , shallow: true , only: [:index , :new , :create , :edit , :update , :destroy]
       
    resources :template_notes , shallow: true do 
      get 'download', on: :member
    end
    member do
      post "import/template" => "template_notes#import_template_by_file"
      
    end
    
    get "billableitemslist" => "billable_items#billable_item_list"
    
    match "/sms_setting/edit" => "sms_setting#edit" , :via=>[:get]
    match "/sms_setting" =>"sms_setting#update" , :via=>[:put]
    match "/subscription" =>"subscription#index" , :via=>[:get]
    match "/subscription" =>"subscription#update" , :via=>[:put]
    get "list/vendors" => "expenses#vendors_list"
    get "list/categories" => "expenses#category_list"
    get "list/products" => "expenses#product_list"
       
  end
  
   resources :patients

 # To get doctors list in patient module
   get "/doctors" => "patients#doctors_list"
   get "/referral" => "patients#referral_list"
   
   
   
   get 'home/index'

   root 'home#index'

   get '/\*path' => redirect('/?goto=%{path}')
   
end
