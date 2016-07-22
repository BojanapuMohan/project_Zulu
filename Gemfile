source 'http://rubygems.org'


# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '4.2.3'

# Use SCSS for stylesheets
gem 'sass-rails', '~> 5.0'
# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'
# Use CoffeeScript for .coffee assets and views
gem 'coffee-rails', '~> 4.1.0'
# See https://github.com/rails/execjs#readme for more supported runtimes
 gem 'therubyracer', platforms: :ruby

# Use jquery as the JavaScript library
gem 'jquery-rails'

# Turbolinks makes following links in your web application faster. Read more: https://github.com/rails/turbolinks
#gem 'turbolinks'
gem 'responders', '~> 2.0'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 2.0'
# bundle exec rake doc:rails generates the API under doc/api.
gem 'sdoc', '~> 0.4.0', group: :doc

# Use ActiveModel has_secure_password
gem 'bcrypt'

gem 'protected_attributes'

# Use Unicorn as the app server
gem 'unicorn'
gem 'mina'
gem 'mina-sidekiq', :require => false
gem 'mina-unicorn', :require => false
# Use Capistrano for deployment
# gem 'capistrano-rails', group: :development

gem 'thin'
gem 'angularjs-rails'
gem 'angular_rails_csrf'
gem 'rspec-rails' # for unit testing code 
gem 'rails-observers' # Observer has been removed out of rails 4 . It's a way to add it in rails 4
gem "paperclip" 
gem 'mysql2', :git => 'git://github.com/sodabrew/mysql2.git'

# both gems are using for assets availability of angularjs on production env 
# gem 'angular-rails-templates'
# gem 'bower-rails'


group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug'

  # Access an IRB console on exception pages or by using <%= console %> in views
  gem 'web-console'

  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
  
  # Use mysql2 as the database for Active Record
  

end

group :production do
  
  gem 'sprockets-rails', :require => 'sprockets/railtie'
  # gem 'rails_12factor'
  gem 'web-console'
  
end

