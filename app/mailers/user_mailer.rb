class UserMailer < ApplicationMailer
  default from: 'no-reply@zulu.com'
 
  def welcome_email(user , password)
    @user = user
    @url  = 'http://192.155.69.240/'
    @password = password
    mail(to: @user.email, subject: 'Welcome to My Awesome Site')
  end
end
