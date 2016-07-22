app.controller('appointmentCtrl', ["$scope", "$rootScope", "$http", "$modal", "Data", "$state", "$stateParams", function ($scope, $rootScope, $http, $modal, Data, $state, $stateParams) {
$scope.showAForm = true;
$rootScope.cloading= false;
$scope.appointment = [];
$rootScope.btnText = 'S_button_update';
$rootScope.appDeleteBtn = false;

$scope.appDelete = function (size) {
	    $rootScope.modalInstance = $modal.open({
	      animation: $scope.animationsEnabled,
	      templateUrl: 'DeleteModal.html',
	      size: size
    });
};
$rootScope.okdelete = function () {
	$rootScope.modalInstance.close($rootScope.DeleteAppointment());
 };
 $rootScope.cancel = function () {
	$rootScope.modalInstance.dismiss('cancel');
  };
  
if($stateParams.appointmentID == 'new'){
  $rootScope.btnText = 'S_button_save';
$rootScope.appDeleteBtn = true;
}
else if($stateParams.appointmentID != 'new'){
  $rootScope.btnText = 'S_button_update';
$rootScope.appDeleteBtn = false;
}
/*Functions*/
    
 $scope.readonly = false;
    $scope.selectedItem =null;
    $scope.searchText = null;
    $scope.selectedItemp = null;
    $scope.searchTextp = null;
	$scope.getBilable = function(){
        Data.get('/settings/'+$rootScope.comp_id+'/billableitemslist')
            .then(function(results){
                $scope.BilableItemsList = results;
        });
    }
    $scope.getTemplateNotes = function(){
        Data.get('/settings/'+$rootScope.comp_id+'/template_notes')
            .then(function(results){
                $scope.TemplateNotes = results;
        });
    }

	$scope.getAppointmentsList = function(){
		Data.get('/settings/'+$rootScope.comp_id+'/appointment_type')
			.then(function(list){
				$rootScope.AppointmentList = list;
				$rootScope.cloading = false;
			});
	}
	$scope.getAppointmentData = function(){
		if($stateParams.appointmentID == 'new'){
			Data.get('/settings/'+$rootScope.comp_id+'/appointment_type/new')
			.then(function(data){
				$scope.AppointmentData = data;
				$rootScope.cloading = false;
			});
		}
		else if($stateParams.appointmentID != 'new' && $stateParams.appointmentID != undefined){
			Data.get('/appointment_type/'+$stateParams.appointmentID+'/edit')
			.then(function(data){
        console.log(data);
        if(data.error){
          $state.go('settings.appointment.info',{appointmentID:'new'});
          $rootScope.showSimpleToast(data.error);
        }
				$scope.AppointmentData = data;
        //$scope.selectedItem = data.appointment_type.billable_item;
        //console.log($scope.selectedItem );
         
				$rootScope.cloading = false;
			});
		}
	}
	$scope.getAppointmentsList();
  $scope.getAppointmentData();
	$scope.getBilable();
	$scope.getTemplateNotes();

  $scope.SubmitAppointment = function(data){
     console.log(data);
      $rootScope.cloading = true;
    if($stateParams.appointmentID == 'new'){
      $http.post('/settings/'+$rootScope.comp_id+'/appointment_type', data)
        .success(function(results){
          if(results.error){
              $rootScope.cloading = false;
              $rootScope.errors = results.error;
             $rootScope.showMultyErrorToast();
          }
          else{
            $state.go('settings.appointment.info',{appointmentID:results.id});
            $rootScope.showSimpleToast('Appointment Type Created Successfully');
            $scope.getAppointmentsList();
            $rootScope.cloading = false;
        }
        });
    }
    else if($stateParams.appointmentID != 'new'){
      $http.put('/appointment_type/'+$stateParams.appointmentID, data)
        .success(function(results){
          console.log(results);
          if(results.error){
                $rootScope.cloading = false;
                  $rootScope.errors = results.error;
                 $rootScope.showMultyErrorToast();
            }
          else{
            $rootScope.showSimpleToast('Appointment Type Updated Successfully');
            $scope.getAppointmentsList();
            $rootScope.cloading = false;
            $scope.getAppointmentData();
          }
        });
    }
  }


  $rootScope.DeleteAppointment = function(data){
      $rootScope.cloading = true;
      $http.delete('/appointment_type/'+$stateParams.appointmentID)
        .success(function(results){
          console.log(results);
          $state.go('settings.appointment');
          $rootScope.showSimpleToast('Appointment Type Deleted Successfully');
          $scope.getAppointmentsList();
          $rootScope.cloading = false;
        });
    }
	
//$scope.colors=[{color:'#ff8da8'},{color:'#99f8ff'},{color:'#a2d7ff'},{color:'#dea8ff'},{color:'#ffa79e'},{color:'#e91849'},{color:'#16ddec'},{color:'#108fee'},{color:'#9813ea'},{color:'#eb2410'},{color:'#b93e5b'},{color:'#3db8c1'},{color:'#266da2'},{color:'#8457a0'},{color:'#e64d3d'},{color:'#930339'},{color:'#25777f'},{color:'#113d5f'},{color:'#6d2c67'},{color:'#a82113'}];



/*Initialization*/
$scope.colors=[{color:'#ff8da8'},{color:'#99f8ff'},{color:'#a2d7ff'},{color:'#dea8ff'},{color:'#00e9a8'},{color:'#e91849'},{color:'#16ddec'},{color:'#108fee'},{color:'#9813ea'},{color:'#00ca65'},{color:'#b93e5b'},{color:'#3db8c1'},{color:'#266da2'},{color:'#8457a0'},{color:'#009919'},{color:'#930339'},{color:'#25777f'},{color:'#113d5f'},{color:'#6d2c67'},{color:'#004d00'}];

	$scope.items= $scope.colors;
	$scope.set_Color = function(data){
		$rootScope.clr = data;
	}
	
	$scope.openColors = function (size) {

	    $scope.modalInstance = $modal.open({
	      animation: $scope.animationsEnabled,
	      templateUrl: 'selectColor.html',
	      controller: 'selectClr',
	      size: 'sm',
	      resolve: {
	        items: function () {
	          return $scope.items;
	        }
      }
    	});
    	$scope.modalInstance.result.then(function (color) {
	      $scope.AppointmentData.appointment_type.color_code = color.color;
	    });
	};

	 
    


}]);
	


app.controller('selectClr',["$scope", "$modalInstance", "items", function ($scope, $modalInstance, items) {

  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.selectColor = function () {
	    $modalInstance.close($scope.selected.item);
 };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
  
}]);
