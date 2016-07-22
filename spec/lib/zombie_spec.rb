require "spec_helper"
require "zombie" 

describe Zombie do
  it "is named Ash" do 
    product = Zombie.new
    product.name.should=="Ash"
    
  end
  
  it "has no brain" do 
    product = Zombie.new
    
    product.brain.should == 0
    
  end
  
  it "is hungry" do
     
    product = Zombie.new
    product.rating.should == true    
    
  end     
end
