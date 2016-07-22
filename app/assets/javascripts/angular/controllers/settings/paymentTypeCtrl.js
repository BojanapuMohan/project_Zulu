app.controller('paymentTypeCtrl',["$scope","$timeout", "$location", "$rootScope", "$http", "filterFilter", "Data", "$stateParams", "$state", "$modal", function ($scope,$timeout, $location, $rootScope, $http, filterFilter, Data, $stateParams, $state, $modal) {
	$scope.getpaymentList = function(){
		$rootScope.cloading = true;
		Data.get(' /settings/'+$rootScope.comp_id+'/payment_types')
			.then(function(list){
				console.log(list);
				$rootScope.paymentList = list;
				
				$rootScope.cloading = false;
			});
	}
	
	  
	$scope.getpaymentList();
	$rootScope.paymentdeleteText = true;
	if($stateParams.paymentID == 'new'){
	$rootScope.paymentdeleteText = true;
	$rootScope.payment_btn="S_button_save";
	}
	else if($stateParams.paymentID != 'new'){
	$rootScope.paymentdeleteText = false;
	$rootScope.payment_btn="S_button_update";
	}
	
	$scope.paymentSubmit = function(data){
		console.log(data);
		$rootScope.cloading = true;
		if($stateParams.paymentID == 'new'){
			$http.post('/settings/'+$rootScope.comp_id+'/payment_types', data)
				.success(function(results){
					if(results.error){
		              $rootScope.cloading = false;
		              $rootScope.errors = results.error;
		             $rootScope.showMultyErrorToast();
		          }
		          else{
					$rootScope.cloading = false;
					$rootScope.showSimpleToast('Payment Type Created Successfully');
					$scope.getpaymentList();
					console.log(results);
					$state.go('settings.payment-types.info',{paymentID:results.id})
				}
				});
		}
		else{
			$http.put('/payment_types/'+$stateParams.paymentID, data)
				.success(function(results){
				if(results.error){
		              $rootScope.cloading = false;
		              $rootScope.errors = results.error;
		             $rootScope.showMultyErrorToast();
		          }
		          else{
					$rootScope.cloading = false;
					$rootScope.showSimpleToast('Payment Type Updated Successfully');
					$scope.getpaymentList();
					console.log(results);
				}
				});
		}
	}
	
	$scope.getpaymentData = function(){
		if($stateParams.paymentID == 'new' || $stateParams.paymentID == undefined){
			
		}
		else{
			Data.get('/payment_types/'+$stateParams.paymentID+'/edit')
				.then(function(results){
					$scope.Payment = results;
				});
		}
	}
	
	$scope.getpaymentData();

	$rootScope.deletePayment = function(){
		$rootScope.cloading = true;
		$http.delete('/payment_types/'+$state.params.paymentID)
				.success(function(results){
					$rootScope.cloading = false;
					$rootScope.showSimpleToast('Payment Type Deleted Successfully');
					$scope.getpaymentList();
					$state.go('settings.payment-types');
					console.log(results);
				});
	}
	
	$scope.payDelete = function (size) {
	    $rootScope.modalInstance = $modal.open({
	      animation: $scope.animationsEnabled,
	      templateUrl: 'DeleteModal.html',
	      size: size
       });
	};
	$rootScope.okdelete = function () {
		$rootScope.modalInstance.close($rootScope.deletePayment());
	 };
	 $rootScope.cancel = function () {
		$rootScope.modalInstance.dismiss('cancel');
	  };
}]);