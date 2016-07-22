class DocumentAndPrinting < ActiveRecord::Base
  belongs_to :company

  has_attached_file :logo,
               styles: { medium: "300x300>", thumb: "100x100>" },
               default_url: "/assets/missing.png"
  validates_attachment_content_type :logo, content_type: /\Aimage\/.*\Z/



  scope :specific_attributes , ->{ select("id, logo_height, in_page_size, in_top_margin, as_title, l_space_un_logo, l_top_margin, l_bottom_margin, l_bleft_margin, l_right_margin, tn_page_size, tn_top_margin")}

end

