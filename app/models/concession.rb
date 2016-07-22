class Concession < ActiveRecord::Base
  belongs_to :company
  
  # has_many :billable_items , :through=> :company
  has_and_belongs_to_many :billable_items , :dependent=> :destroy
  
#   later validations 
  # validates_associated :company
  # validates :name , presence: true , uniqueness: { case_sensitive: false }
  validates :name , presence: true 
  
#   ending here ----  
  
  after_create :add_concession_in_billableitems
  after_update :update_concession_in_billableitems
  after_destroy :delete_concession_in_billableitems
  
  def add_concession_in_billableitems
    company = self.company
    company.billable_items.each do |item|

#     To create common record for both
      BillableItemsConcession.create( billable_item_id: item.id , concession_id: self.id , value: " " ,name: self.name)
      
#       To insert values of all concessions into all billable items
      item.concession_price = []
      BillableItemsConcession.where(["billable_item_id =?", item.id]).select("concession_id as id, name , value").each do |item_cs|
        item.concession_price << {id: item_cs.id , name: item_cs.name , value: item_cs.value}  
      end
      item.save 

    end
    
  end
  
  def update_concession_in_billableitems
    company = self.company
    BillableItemsConcession.where(["concession_id =?", self.id]).select("id, name").each do |item_cs|
      item_cs.update_attributes(:name=> item_cs.name)
    end
    serialize_billablecs_data(company)
    
  end
  
  def delete_concession_in_billableitems
    company = self.company
    BillableItemsConcession.where(["concession_id =?", self.id]).select("id, name").each do |item_cs|
      item_cs.destroy
    end
    serialize_billablecs_data(company)
    
  end
  
  private 
  
  def serialize_billablecs_data(company)
    company.billable_items.each do |item|
      item.concession_price = []
      BillableItemsConcession.where(["billable_item_id =?", item.id]).select("concession_id as id, name , value").each do |item_cs|
        item.concession_price << {id: item_cs.id , name: item_cs.name , value: item_cs.value}  
      end
      item.save
    end
  end 
  
end

