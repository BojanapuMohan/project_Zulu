app.controller('concessionTypesCtrl',["$scope", "$location", "$rootScope", "$http", "filterFilter", "Data", "$stateParams", "$state", "$modal", function ($scope, $location, $rootScope, $http, filterFilter, Data, $stateParams, $state, $modal) {
	$rootScope.buttonText = "UPDATE";
	$rootScope.deleteText = false;
    $rootScope.concessionList = function(){
        Data.get('/settings/'+$rootScope.comp_id+'/concession_type')
            .then(function(results){
                console.log(results);
                $scope.concessionTypes = results;
        });
    }
    if($state.params.concession_id == 'new'){
        $rootScope.buttonText = "S_button_save";
		$rootScope.deleteText = true;
    }
    else{
        $rootScope.buttonText = "S_button_update";
		$rootScope.deleteText = false;
    }
    $rootScope.concessionList();
	
	
	$scope.conDelete = function (size) {
	    $rootScope.modalInstance = $modal.open({
	      animation: $scope.animationsEnabled,
	      templateUrl: 'DeleteModal.html',
	      size: size
       });
	};
	$rootScope.okdelete = function () {
		$rootScope.modalInstance.close($rootScope.concessionDelete());
	 };
	 $rootScope.cancel = function () {
		$rootScope.modalInstance.dismiss('cancel');
	  };
	  
}]);
app.controller('concessionTypesChildCtrl',["$scope", "$location", "$rootScope", "$http", "filterFilter", "Data", "$stateParams", "$state", "$modal",  "$cookies", function ($scope, $location, $rootScope, $http, filterFilter, Data, $stateParams, $state, $modal,  $cookies) {
	console.log( $cookies.get('XSRF-TOKEN'));
    $scope.concessionData = function(){
        Data.get('/concession_type/'+$state.params.concession_id+'/edit')
            .then(function(results){
                $scope.concession = results;
        });
    }
	
	

    $rootScope.concessionList();
    $scope.concessionData();
    if($state.params.concession_id == 'new'){
        $rootScope.buttonText = 'S_button_save';
		$rootScope.deleteText = true;
    }
    else{
        $rootScope.buttonText = 'S_button_update';
		$rootScope.deleteText = false;
    }
    $scope.concessionSubmit = function(data){
    	$rootScope.cloading= true;
    	if($state.params.concession_id == 'new'){
	    	$http.post('/settings/'+$rootScope.comp_id+'/concession_type', data)
	    		.success(function(results){
	    			console.log(results);
		    		if(results.error){
		    			$rootScope.errors = results.error;
	                    $rootScope.showMultyErrorToast();
	                    $rootScope.cloading = false;
		           }
		           else{
		    			$state.go('settings.discount-types.edit',{concession_id:results.concession_id});
		    			$rootScope.showSimpleToast('Discount Created Successfully');
		    			$scope.concessionList();
		    			$rootScope.cloading= false;
		    		}
	    	});
	    }
	    else{
	    	$http.put('/concession_type/'+$state.params.concession_id, data)
	    		.success(function(results){
	    			console.log(results);
	    		if(results.error){
	    			$rootScope.errors = results.error;
                    $rootScope.showMultyErrorToast();
                    $rootScope.cloading = false;
	           }
	           else{
	    			$rootScope.showSimpleToast('Discount Updated Successfully');
	    			$scope.concessionList();
	    			$scope.concessionData();
	    			$rootScope.cloading= false;
	    		}

	    	});
	    }
    }
    $rootScope.concessionDelete = function(){
    	$http.delete('/concession_type/'+$state.params.concession_id)
	    		.success(function(results){
	    		if(results.error){
	    			$rootScope.errors = results.error;
                    $rootScope.showErrorToast(results.error);
                    $rootScope.cloading = false;
	           }
	           else{
	    			$scope.concessionList();
                    $rootScope.showSimpleToast('Concession Deleted Successfully');
	    			$state.go('settings.discount-types');
	    		}
	    });
    }
}]);
