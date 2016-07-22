app.controller('businessinfoCtrl',["$scope", "$location", "$rootScope", "$http", "filterFilter", "Data", "$stateParams", "$state", function ($scope, $location, $rootScope, $http, filterFilter, Data, $stateParams, $state) {
	$rootScope.showBlank = false;
	$scope.businessInfo = [];
	$scope.cntry = '';
	$scope.country = '';
	$rootScope.hideBusinessCancel = false;
	$rootScope.business_id = $stateParams.business_id;
	$rootScope.mainButton = 'S_button_update';
	$rootScope.settingtopClasses1 = 'col-md-8 col-xs-6 top-links';
	$rootScope.settingtopClasses2 = 'col-md-4 col-xs-6 top-btn';
	$rootScope.showDelete = true;
	
	
	Data.getCountry().then(function (results) {
	    	$scope.country = results;
	});

	$scope.GetStates = function(data){
	 	$scope.state = '';
	 	 Data.getCountry().then(function (results) {
	    	$scope.countryf = results;
	    	$scope.Jfilename = filterFilter($scope.countryf, {code:data});
	    		Data.get('assets/angular/common/countries/'+$scope.Jfilename[0].filename+'.json').then(function (results) {
	    			$scope.state = results;
	    	});
		});
	};

	$rootScope.getBusinessList()
	$scope.settingSubmit= function(data){
		$rootScope.cloading = true;
		$http.put('/settings/'+$rootScope.comp_id+'/business/'+$stateParams.business_id, data)
		.success(function (results) {
			console.log(results);
			 if(results.error){
		                $rootScope.cloading = false;
		                $rootScope.errors = results.error;
		                $rootScope.showMultyErrorToast();

		            }
		            else{
		             	$scope.businessInfo = results.data;
					    $rootScope.getBusinessList();
						$rootScope.cloading = false;
						$rootScope.showSimpleToast('Business Data Updated Successfully');
		            }
		    
		});

	}

	$http.get('/settings/'+$rootScope.comp_id+'/business/'+$stateParams.business_id+'/edit')
		.success(function (results) {
			$scope.businessResults = results;
			if($scope.businessResults.country){
				Data.getCountry().then(function (results) {
			    	$scope.countryf = results;
			    	$scope.Jfilename = filterFilter($scope.countryf, {code: $scope.businessResults.country});
			    		console.log($scope.Jfilename);
			    		Data.get('assets/angular/common/countries/'+$scope.Jfilename[0].filename+'.json')
			    		.then(function (results) {
			    			$scope.state = results;
			    			setTimeout(function () {
						        $scope.$apply(function () {
						            $scope.businessInfo = $scope.businessResults;
							            
						        });
						    });
			    	});
				});
			}
			else{
				setTimeout(function () {
			        $scope.$apply(function () {
			            $scope.businessInfo = $scope.businessResults;
			        });
				});
			}
		});

	


}]);
