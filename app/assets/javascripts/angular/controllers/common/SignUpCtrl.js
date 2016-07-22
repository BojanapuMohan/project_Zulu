// JavaScript Document

angular.module('clinikoApp').controller('SignUpCtrl',[ "$scope", "$location", "$rootScope", "$timeout", "$http", "$state", "$stateParams", "Data", "Signup" ,function ($scope, $location, $rootScope, $timeout, $http, $state, $stateParams, Data, Signup ) {
	$scope.user = [];
	$scope.error = false;
	$scope.loading = false;
	$scope.user.remember = false;
	$scope.user.comp_id ='';



	$scope.comp_id = $stateParams.comp_id;
	Data.getTimezone().then(function (results) {
    	$scope.timezone = results;
    	$scope.user.time_zone = ''+$scope.timezone[0].offset;

    });
    Data.getCountry().then(function (results) {
    	$scope.country = results;
    	$http.get('http://ipinfo.io/json')
        .success(function(results){
            console.log(results);
            $rootScope.ipDetails = results;
            $scope.user.country = $rootScope.ipDetails.country;
            $scope.Toffset = new Date().getTimezoneOffset();
        });
    	
    });
    /*$scope.test = '/registers',{'company':{'company_name':user.CompanyName ,'email': user.username, 'password': user.password}};
    Signup.test().then(function (results) {
    	console.log(results);
    });*/

	$scope.doRegister = function(user){

		$scope.loading = true;

		$http.post('/registers',{'company':{'company_name':user.CompanyName ,'email': user.username, 'password': user.password}})
	 		 .success(function(response, error){

	 		 	if(response.comp_id != null){
	 		 		$location.path("/signup/"+response.comp_id);
	 		 	}
	 		 	else{
					$scope.error = true ;
					console.log(response.error);
					$scope.msg = response.error;
					 $timeout(function(){$scope.error = false}, 3000);
					$scope.loading = false ;
				}
		});
	}
	$scope.doRegisterinfo = function(user){
		$scope.loading = true;
		$http.put('/registers/'+$scope.comp_id,{'company':{'id':$scope.comp_id ,'first_name': user.first_name, 'last_name': user.last_name, 'country':user.country, 'time_zone': user.time_zone}})
	 		 .success(function(response, error){
	 		 	console.log(response);
	 		 	if(response.flag == true){
	 		 		//$location.path("/settings/account/"+$scope.comp_id);
	 		 		//$state.go('settings/', { comp_id: $scope.comp_id});
	 		 		$state.go('settings.account',{comp_id:response.session_id});
	 		 	}
	 		 	else{
	 		 		$scope.msg = response.error;
					$scope.error = true ;
					 $timeout(function(){$scope.error = false}, 3000);
					$scope.loading = false ;
				}
		});
	}
}]);
