class BillableItemsConcession < ActiveRecord::Base
  belongs_to :billable_item
  belongs_to :concession
  
  validates :value ,  :numericality => {greater_than: 0} 
  
end
