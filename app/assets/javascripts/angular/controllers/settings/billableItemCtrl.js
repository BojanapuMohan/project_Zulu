app.controller('billableItemCtrl',["$scope", "$location", "$rootScope", "$http", "Data", "$modal", function ($scope, $location, $rootScope, $http, Data, $modal) {
	$rootScope.getBilable = function(){
        Data.get('/settings/'+$rootScope.comp_id+'/billable_items')
            .then(function(results){
                console.log(results);
                $scope.BilableItemsList = results;
        });
    }
    $rootScope.getBilable();
    $rootScope.btnText = 'S_button_update';
	$rootScope.billdeleteText = false;
	$scope.billDelete = function (size) {
	    $rootScope.modalInstance = $modal.open({
	      animation: $scope.animationsEnabled,
	      templateUrl: 'DeleteModal.html',
	      size: size
       });
	};
	$rootScope.okdelete = function () {
		$rootScope.modalInstance.close($rootScope.deleteBilable());
	 };
	 $rootScope.cancel = function () {
		$rootScope.modalInstance.dismiss('cancel');
	  };
	

}]);

app.controller('billableItemChildCtrl',["$scope", "$location", "$rootScope", "$http", "Data", "$stateParams", "$state", function ($scope, $location, $rootScope, $http, Data, $stateParams, $state) {
if($stateParams.bilable_id == 'newServ' || $stateParams.bilable_id == 'new'){
		$rootScope.btnText = 'S_button_save';
	$rootScope.billdeleteText = true;
}
else{
	$rootScope.btnText = 'S_button_update';
	$rootScope.billdeleteText = false;
}
	$scope.getTaxList = function(){
		Data.get('/settings/'+$rootScope.comp_id+'/tax_settings')
			.then(function(results){
				$scope.taxList = results;
				$scope.getBilableData();
			});
	}
	$scope.getTaxList();
	$scope.getBilableData = function(){
		$rootScope.cloading = true;
		//$scope.getTaxList();
		if($stateParams.bilable_id == 'newServ' || $stateParams.bilable_id == 'new'){
			Data.get('/settings/'+$rootScope.comp_id+'/billable_items/new')
				.then(function(results){
					results.tax = 'N/A'
					Data.get('/settings/'+$rootScope.comp_id+'/concession_type')
						.then(function(list){

							for(var i=0; i < list.length; i++){
								results.concession_price.push(list[i]);

							}
							setTimeout(function () {
				                $scope.$apply(function () {
				                   $scope.BilableItems = results;
				                   $rootScope.cloading = false;
				                   $scope.$watch(function() {
									  if($scope.BilableItems.tax && $scope.BilableItems.tax == 'N/A'){
									  	$scope.BilableItems.include_tax = false;
									  }
									});
				                });
				            });
							
						})
						})
		}
		else{
			Data.get('/billable_items/'+$stateParams.bilable_id+'/edit')
				.then(function(results){
					console.log(results);
					$scope.BilableItems = results;
					setTimeout(function () {
		                $scope.$apply(function () {
		                   $scope.BilableItems = results;
		                    $rootScope.cloading = false;
		                   $scope.$watch(function() {
							  if($scope.BilableItems.tax && $scope.BilableItems.tax == 'N/A'){
							  	$scope.BilableItems.include_tax = false;
							  }
							});
		                });
		            });
				});
		}
	}
	$scope.getBilableData();
	
	$scope.BilableSubmit = function(data){
		 $rootScope.cloading = true;
		$scope.getTaxList();
		if($stateParams.bilable_id == 'newServ' || $stateParams.bilable_id == 'new'){
			if($stateParams.bilable_id == 'newServ'){
				data.item_type=true;
			}
			else if($stateParams.bilable_id == 'new'){
				data.item_type=false;
			}
			//console.log(results);

			$http.post('/settings/'+$rootScope.comp_id+'/billable_items', data)
				.success(function(results){
					console.log(results);
				if(results.error){
	              $rootScope.cloading = false;
	                $rootScope.errors = results.error;
	               $rootScope.showMultyErrorToast();
	            }
            	else{
	    			$rootScope.showSimpleToast('Bilable Item Created Successfully');
					$rootScope.getBilable();
					$state.go('settings.billable-items.info',{bilable_id:results.id});
					 $rootScope.cloading = false;
					}
			});
		}
		else{
			$http.put('/billable_items/'+$stateParams.bilable_id, data)
				.success(function(results){
					console.log(results);
					if(results.error){
	              $rootScope.cloading = false;
	                $rootScope.errors = results.error;
	               $rootScope.showMultyErrorToast();
	            }
            	else{
	    			$rootScope.showSimpleToast('Bilable Item Updated Successfully');
					$rootScope.getBilable();
					$http.get('/billable_items/'+$stateParams.bilable_id+'/edit')
						.success(function(results){
							console.log(results);
							 $scope.BilableItems = results;
							 
				             $rootScope.cloading = false;
				             setTimeout(function () {
			                    $scope.BilableItems.tax = results.tax
				            });

						});
					 $rootScope.cloading = false;
					}

			});
		}
		console.log(data);
	}

	$rootScope.deleteBilable = function(){
		$rootScope.cloading = true;
	$http.delete('/billable_items/'+$stateParams.bilable_id)
			.success(function(results){
				console.log(results);
    			$rootScope.showSimpleToast('Item Deleted Successfully');
				$rootScope.getBilable();
				$state.go('settings.billable-items');
				$rootScope.cloading = false;

		});
	}
	
}]);