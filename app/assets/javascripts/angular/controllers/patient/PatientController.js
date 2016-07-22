app.controller('PatientCtrl',["$rootScope", "$scope", "Data", "$state", "$http", "filterFilter", function ($rootScope, $scope, Data, $state, $http, filterFilter) {
	$scope.new_pati = false;
	$scope.Patient = {relationship:[], gender: 'Male', phone_list:[{contact_no:'', type:'mobile'}]};
	$scope.addRelative = function(){
		$scope.Patient.relationship.push({patient:'',type:'Parent'})
	}
	$scope.removeRelative = function(index){
		$scope.Patient.relationship.splice(index, 1)
	}
	$scope.addPhone = function(){
		$scope.Patient.phone_list.push({contact_no:'',type:'mobile'})
	}
	$scope.removePhone = function(index){
		$scope.Patient.phone_list.splice(index, 1)
	}
	$scope.getPatientsData = function(){
		$http.get('/patients')
			.success(function(data){
				console.log(data);
				$scope.PatientListData = data;
			});
	}
	$scope.getPatientsData();
	$scope.getConcessionList = function(){
		$http.get('/settings/'+$rootScope.comp_id+'/concession_type')
			.success(function(results){
				$scope.ConcessionTypeList = results;
				$scope.Patient.concession_type = ''+$scope.ConcessionTypeList[0].id
			})
	}
	$scope.getConcessionList();
	$scope.getDoctorList = function(){
		$http.get('/doctors')
		    .success(function(list){
		      console.log(list);
		      $scope.DoctorList = list;
		    });
	}
	$scope.getDoctorList();
	$scope.getPatientList = function(){
	  $http.get('/patients')
	    .success(function(list){
	      console.log(list);
	      $scope.PatientList = list;
	    });
	}
	$scope.getPatientList();
	$scope.getContactList = function(){
		$http.get('/referral')
			.success(function(list){
				console.log(list);
				$scope.ContactList = list;
			})
	}
	$scope.getContactList();	
	$scope.new_patient = function(){
		$scope.new_pati = true;
	}
	$scope.new_patient_Hide = function(){
		$scope.new_pati = false;
	}
	$scope.CreatePatient = function(data){
		$rootScope.cloading = true;
		console.log(data);
		$http.post('/patients',data)
			.success(function(results){
				if(results.error){
		            $rootScope.cloading = false;
		            $rootScope.errors = results.error;
		            $rootScope.showMultyErrorToast();
		        }
		        else{ 
		          $rootScope.cloading = false;
		          $rootScope.showSimpleToast('Patient Added Successfully');
		          $scope.Patient = {relationship:[], phone_list:[{contact_no:'', type:'mobile'}]};
		          $scope.new_pati = false;
		          $scope.getPatientsData();
		        }
			})
	}
	$scope.DeletePatient = function(id, e){
		 e.preventDefault();
     e.stopPropagation();
		$rootScope.cloading = true;
		$http.delete('/patients/'+id)
			.success(function(results){
				if(results.error){
		            $rootScope.cloading = false;
		            $rootScope.errors = results.error;
		            $rootScope.showMultyErrorToast();
		        }
		        else{ 
		          $rootScope.cloading = false;
		          $rootScope.showSimpleToast('Patient Deleted Successfully');
		          $scope.new_pati = false;
		          $scope.getPatientsData();
		        }
			})
	}
	$scope.cntry = '';
	$scope.country = '';
	
	Data.getCountry().then(function (results) {
        $scope.country = results;
        
        Data.getCurrentCountry().then(function(cntry){
        	console.log(cntry);
        	$scope.Patient.country = cntry.country;
        	$scope.GetStates(cntry.country);
        })
  });

  $scope.GetStates = function(data){
    $scope.state = '';
     Data.getCountry().then(function (results) {
        $scope.countryf = results;
        $scope.Jfilename = filterFilter($scope.countryf, {code:data});
        console.log($scope.Jfilename);
          Data.get('assets/angular/common/countries/'+$scope.Jfilename[0].filename+'.json').then(function (results) {
            $scope.state = results;
            $scope.Patient.state = results[0].code;
        });
  });
  };
}]);	