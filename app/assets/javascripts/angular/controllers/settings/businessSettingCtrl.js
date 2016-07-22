app.controller('businessSettingCtrl',["$scope", "$location", "$rootScope", "$http", "$modal", "filterFilter", "Data", "$state", function ($scope, $location, $rootScope, $http, $modal, filterFilter, Data, $state) {
$rootScope.showBlank = true;
$rootScope.settingtopClasses1 = 'col-md-12 col-xs-6 top-links';
$rootScope.settingtopClasses2 = 'col-md-2 col-xs-6 top-btn';
$rootScope.hideBusinessCancel = true;
$rootScope.showDelete = false;
$scope.countryf = [];


	//$scope.$watch(function(){ $scope.$broadcast('rebuild:me');});

	$rootScope.getBusinessList = function(){
		Data.get('/settings/'+$rootScope.comp_id+'/business').then(function (results) {
				console.log(results);
		    	$rootScope.cloading = false;
				$rootScope.businessList = results;
				//console.log(results);
				Data.getCountry().then(function (data) {
			    	$scope.countryf = data;

					for (var i=0; i<$rootScope.businessList.length; i++){
						  	$scope.Jfilename = filterFilter($scope.countryf, {code:$rootScope.businessList[i].country});
						  	$rootScope.businessList[i].country = $scope.Jfilename[0].name;	
						  	
					};
			});
		});
	}
	Data.getCountry().then(function (results) {
	    	$scope.country = results;
	});

	$rootScope.getBusinessList();
	$rootScope.DeleteBusiness = function(){
		console.log('/settings/'+$rootScope.comp_id+'/business/'+$rootScope.business_id);
		$http.delete('/settings/'+$rootScope.comp_id+'/business/'+$rootScope.business_id)
		.success(function(results){
			if(results.flag == true){
				$state.go('settings.business');
				$rootScope.showBlank = true;

			}
			$rootScope.getBusinessList();
		});
	}


	$scope.openDelete = function (size) {

	    $rootScope.modalInstance = $modal.open({
	      animation: $scope.animationsEnabled,
	      templateUrl: 'DeleteModal.html',
	      size: size
    });
    };
	$rootScope.okdelete = function () {
	    $rootScope.modalInstance.close($rootScope.DeleteBusiness());
	 };

	  $rootScope.cancel = function () {
	    $rootScope.modalInstance.dismiss('cancel');
	  };



	  $rootScope.showTooltip = function(data){
	  	console.log(data);
	  }



}]);

