class Plan < ActiveRecord::Base
  belongs_to :owner
  # has_many :subscriptions 
  # has_one :company , :through=> :subscriptions
end
