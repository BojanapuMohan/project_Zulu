module Authentication
  extend ActiveSupport::Concern
  
  included do
    attr_accessor :password
    before_save :encrypt_password
  end
  
  module ClassMethods
    def authenticate_by_email(email, password)     # only for user model using
      user = find_by_email(email)
      if user && user.password_hash == BCrypt::Engine.hash_secret(password, user.password_salt)
        user
      else
        nil
      end
    end
  end
  
  def encrypt_password
    if password.present?
      self.password_salt = BCrypt::Engine.generate_salt
      self.password_hash = BCrypt::Engine.hash_secret(password, password_salt)
    end
  end
  
  
end
