app.controller('PatientDetailCtrl',["$rootScope", "$scope", "Data", "$state", "$http", "filterFilter", "$modal", "$stateParams", function ($rootScope, $scope, Data, $state, $http, filterFilter, $modal, $stateParams) {
	$scope.PatientsDetail = function(){
		console.log($stateParams.patient_id);
		$http.get('/patients/'+$stateParams.patient_id)
			.success(function(data){
				console.log(data);
				$scope.PatientDetails = data;
			});
	}
	$scope.PatientsDetail();
	
	
	$rootScope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};
	$scope.openDetail = function (size) {

	    $scope.modalInstance = $modal.open({
	      animation: $scope.animationsEnabled,
	      templateUrl: 'patientFullDetail.html',
	      controller: 'fullPatientDetail',
	      size: 'xl',
	      resolve: {
	        cplane: function () {
	          return $scope.cplane;
		        }
	      }
    	});
	};
}]);	
app.controller('fullPatientDetail',["$rootScope", "$scope", "Data", "$state", "$http", "filterFilter", "$stateParams", function ($rootScope, $scope, Data, $state, $http, filterFilter, $stateParams) {
	$scope.PatientsDetail = function(){
		console.log($stateParams.patient_id);
		$http.get('/patients/'+$stateParams.patient_id)
			.success(function(data){
				console.log(data);
				$scope.PatientDetails = data;
			});
	}
	$scope.PatientsDetail();
	
}]);	