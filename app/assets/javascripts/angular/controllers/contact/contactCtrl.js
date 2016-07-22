app.controller('contactCtrl',["$rootScope", "$scope", "Data", "$state", "$http", "filterFilter", function ($rootScope, $scope, Data, $state, $http, filterFilter ) {
  
  $scope.new_con=false;
  $scope.exp_detail=true;
  
  $scope.contactDetails=true;
  $scope.edit_contact=false;
  
  $scope.EditContact=function(){
	$scope.contactDetails=false;
  	$scope.edit_contact=true;
    $scope.Contact = $scope.ContactDetails
  }
  

  $scope.Contact = {contact_type:'Standard',phone_list:[{contact_no:'',type:'Mobile'}]};
  $scope.addPhone = function(){
    $scope.Contact.phone_list.push({contact_no:'',type:'Mobile'});
  }
  $scope.removePhone = function(index){
    $scope.Contact.phone_list.splice(index,1);
  }
  $scope.CreateContact = function(data){
    console.log(data);
    $http.post('/settings/'+$rootScope.comp_id+'/contacts', data)
      .success(function(results){
        console.log(results);
        if(results.error){
          $rootScope.cloading = false;
          $rootScope.errors = results.error;
          $rootScope.showMultyErrorToast();

        }
        else{
          $scope.getContactList();
          $scope.new_con=false;
          $rootScope.cloading = false;
          $scope.Contact = '';
          $rootScope.showSimpleToast('Contact Added Successfully');
        }

      });
  }
  
  $scope.new_contact=function(){
	  $scope.new_con=true;
  }
 $scope.new_contact_Hide=function(){
	 $scope.new_con=false;
 }
 $scope.contact_Hide=function(){
	 $scope.contactDetails=true;
  	 $scope.edit_contact=false;
     $scope.Contact = '';
	 $scope.Contact = {contact_type:'Standard',phone_list:[{contact_no:'',type:'Mobile'}]};
 }
 
 
  
  $scope.getContactList = function(){
    console.log($rootScope.comp_id);
    $http.get('/settings/'+$rootScope.comp_id+'/contacts')
      .success(function(list){
        console.log(list);
         for(var i = 0; i < list.length; i++){
            list[i].isopen = false;
          }
        $scope.ContactList = list;
      });
  }
  $scope.getContactList();
  $scope.showExpenseDetails = function(index){
    if($scope.ContactList[index].isopen){
      return true;
    }
   }
  $scope.opened = function(index, id){
    console.log(id);
    setTimeout(function(){
      if($scope.ContactList[index].isopen){
        $rootScope.cloading = true;
         $http.get(' /contacts/'+id+'/edit')
          .success(function(results){
            if(results.country){
              $scope.Jfilename = filterFilter($scope.country, {code:results.country});
              console.log($scope.Jfilename)
              if($scope.Jfilename.length){
                Data.get('assets/angular/common/countries/'+$scope.Jfilename[0].filename+'.json').then(function (list) {
                  $scope.state = list;
                  $scope.ContactDetails = results;
                  $rootScope.cloading= false;
              });
              }
              else{
                 $scope.ContactDetails = results;
                $rootScope.cloading= false;
              }
              }
              else{
                $scope.ContactDetails = results;
                $rootScope.cloading= false;
              }
           
            console.log(results);

          });
		
		$scope.contactDetails=true;
  		$scope.edit_contact=false;
      }
      else if(!$scope.ContactList[index].isopen){
         $scope.ContactDetails = '';
         console.log($scope.ContactDetails)
      }
    })
  }
  /*$scope.EditExpense  = function(index){
    console.log(index);
    $scope.ExpenseDetails = false;
    $scope.ShowEditExpense = true;
	$scope.edit_bar=false;
	 $scope.exp_detail=true;
      
  }*/
    $scope.businessInfo = [];
	$scope.cntry = '';
	$scope.country = '';
	
	Data.getCountry().then(function (results) {
        $scope.country = results;
        $scope.Contact.country = results[0].code;
        $scope.GetStates('AF');
  });

  $scope.GetStates = function(data){
    $scope.state = '';
     Data.getCountry().then(function (results) {
        $scope.countryf = results;
        $scope.Jfilename = filterFilter($scope.countryf, {code:data});
        console.log($scope.Jfilename);
          Data.get('assets/angular/common/countries/'+$scope.Jfilename[0].filename+'.json').then(function (results) {
            $scope.state = results;
            $scope.Contact.state = results[0].code;
        });
  });
  };
  
 $scope.DeleteContact= function(id, e){
   e.preventDefault();
    e.stopPropagation();
   $rootScope.cloading = true;
   $http.delete('/contacts/'+id)
     .success(function(results){
       console.log(results);
       if(results.error){
           $rootScope.cloading = false;
           $rootScope.errors = results.error;
           $rootScope.showMultyErrorToast();
       }
       else{
         $scope.businessInfo = results.data;
         $scope.getContactList();
         $rootScope.cloading = false;
         $rootScope.showSimpleToast('Contact Deleted Successfully');
       }
     });
 }
 $scope.UpdateContact = function(data, id){
    console.log(id);
    console.log(data);
    $rootScope.cloading = true;
    $http.put('/contacts/'+id, {contact:data})
      .success(function(results){
        if(results.error){
                $rootScope.cloading = false;
                  $rootScope.errors = results.error;
                 $rootScope.showMultyErrorToast();
              }
        else{
         $scope.getContactList();
         $rootScope.showSimpleToast('Contact Updated Successfully');
         $rootScope.cloading = false;
       }
      })
  }
 
}]);
