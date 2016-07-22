app.controller('businessNew',["$scope", "$location", "$rootScope", "$http", "filterFilter", "Data", "$stateParams", "$state", function ($scope, $location, $rootScope, $http, filterFilter, Data, $stateParams, $state) {
	$rootScope.showBlank = false;
	$rootScope.mainButton = 'S_button_create';
	$rootScope.hideBusinessCancel = false;
	$rootScope.settingtopClasses1 = 'col-md-9 col-xs-6 top-links';
	$rootScope.settingtopClasses2 = 'col-md-3 col-xs-6 top-btn';
	$rootScope.showDelete = false;
	$http.get('/settings/'+$rootScope.comp_id+'/business/new')
			.success(function (results) {
				$scope.businessInfo = results;
				console.log(results);
	});
	//$scope.$watch(function(){ $scope.$broadcast('rebuild:me');});
	$scope.CreateBusiness = function(data){
		$rootScope.cloading= true;
		console.log('/settings/'+$rootScope.comp_id+'/business/', data);
		$http.post('/settings/'+$rootScope.comp_id+'/business/', {business :data})
			.success(function (results) {
				 console.log(results);
				 if(results.error){
		                $rootScope.cloading = false;
		                $rootScope.errors = results.error;
		                $rootScope.showMultyErrorToast();

		            }
		            else{
		             	$scope.businessInfo = results.data;
					    console.log(results);
					    $rootScope.showSimpleToast('Business Added Successfully');
					    $state.go('settings.business.info',{business_id:results.business_id})
					    Data.get('/settings/'+$rootScope.comp_id+'/business').then(function (results) {
						    $scope.businessList = results;
						});
						$rootScope.getBusinessList();
		            }
			    
		});
	}

	Data.getCountry().then(function (results) {
	    	$scope.country = results;
	    	$scope.businessInfo.country = results[0].code;
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
	    			$scope.businessInfo.state = results[0].code;
	    	});
	});
	};
}]);
