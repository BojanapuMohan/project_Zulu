app.controller('subcsriptionCtrl',["$scope", "$location", "$rootScope", "$http", "filterFilter", "Data", "$stateParams", "$state", "$modal", function ($scope, $location, $rootScope, $http, filterFilter, Data, $stateParams, $state, $modal) {
	$scope.planCat = "Monthly";
	$scope.cplane ='';

	$scope.getSubscriptionsList = function(){
		Data.get('/settings/'+$rootScope.comp_id+'/subscription')
		.then(function(results){
			console.log(results);
			$scope.subscriptionList = results.plans;
			$scope.subscriptDetails = results.subscription_detail;
			$scope.cplane = results.subscription_detail;
		})
	}
	$scope.getSubscriptionsList();
	$scope.SelectPlane = function(data){
		$rootScope.cloading = true;
		$http.put('/settings/'+$rootScope.comp_id+'/subscription', {'id':data})
			.success(function(results){
				console.log(results);
				$rootScope.showSimpleToast('ZULU Subscription Updated Successfully');
				$scope.getSubscriptionsList();
				$rootScope.cloading = false;
			});
	}


	$scope.openCardUpdate = function (size) {

	    $scope.modalInstance = $modal.open({
	      animation: $scope.animationsEnabled,
	      templateUrl: 'CardUpdate.html',
	      controller: 'CardUpdate',
	      size: 'sm',
	      resolve: {
	        cplane: function () {
	          return $scope.cplane;
		        }
	      }
	      
    	});
    	$scope.modalInstance.result.then(function (color) {
	      $scope.AppointmentData.appointment_type.color_code = color.color;
	    });
	};
	
		
		$scope.cancelCardUpdate = function (size) {

	    $scope.modalInstance = $modal.open({
	      animation: $scope.animationsEnabled,
	      templateUrl: 'cancelUpdate.html',
	      controller: 'cancelUpdate',
	      size: 'lg',
	      resolve: {
	        cplane: function () {
	          return $scope.cplane;
		        }
	      }
	      
    	});
	};

}]);



app.controller('CardUpdate',["$scope", "$modalInstance", "cplane", "$rootScope", function ($scope, $modalInstance, cplane, $rootScope) {
	$scope.cplane = cplane

  $scope.selectColor = function () {
	    $modalInstance.close($scope.selected.item);
 };

  $rootScope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}]);

app.controller('cancelUpdate',["$scope", "$modalInstance", "cplane", "$rootScope", function ($scope, $modalInstance, cplane, $rootScope) {
	$scope.cplane = cplane

	$scope.cancelsubs ='';
	$scope.resons=[
		{ text:'I don’t need a system anymore'},
		{text:'I’m using a different system instead.'},
		{text:'It’s missing functionality.'},
		{ text:'It’s too difficult to use.'},
		{ text:'It doesn’t work well on my device(s).'},
		{ text:'Something else.'}
	]

  $scope.selectColor = function () {
	    $modalInstance.close($scope.selected.item);
 };

  $rootScope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
  $rootScope.CancelSubs = function (data) {
    console.log(data);
    $rootScope.modalInstance.close();
  };

}]);
