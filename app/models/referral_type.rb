class ReferralType < ActiveRecord::Base
  belongs_to :company
  serialize :referral_sub_category , Array

  scope :specific_attributes , ->{ select("id, referral_source, referral_sub_category")}
  scope :active_referral_type, ->{ where(status: true)}

  validates :referral_source , presence: true 
  validates_each :referral_sub_category do |record, attr, value|
    record.errors.add(attr, 'can not be blank') if value.nil? || value.blank? 
  end

end
