task :set_concession_name => :environment do
    Concession.all.each do |cons|
      comm = BillableItemsConcession.where(["concession_id = ?", cons.id])
      # puts "concession id : #{cons.id}"
      comm.each do |cm|
        cm.update_attributes(:name=>cons.name)
      end
    end
end

task :set_fullname_to_appointment_user => :environment do
  AppointmentTypesUser.all.each do|common|
    user = User.find(common.user_id) rescue nil
    unless user.nil?
      common.update_attributes(first_name: user.first_name ,last_name: user.last_name ,  is_selected: false)
    end
  end
  puts "done "
end