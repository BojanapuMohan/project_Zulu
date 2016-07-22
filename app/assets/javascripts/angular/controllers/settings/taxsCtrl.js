app.controller('taxsCtrl',["$scope", "$location", "$rootScope", "$http", "filterFilter", "Data", "$stateParams", "$state", function ($scope, $location, $rootScope, $http, filterFilter, Data, $stateParams, $state) {
	$scope.TaxData = {
	name:'',
	period_val : '1',
	period_name: 'days'
};


console.log($state.params.TaxID);
if($state.params.TaxID == 'new'){
  $rootScope.btnText = 'S_button_save';
}
else if($state.params.TaxID != 'new'){
  $rootScope.btnText = 'S_button_update';
}
/*Functions*/
    
	$scope.getTaxList = function(){
		$rootScope.cloading = true;
		Data.get('/settings/'+$rootScope.comp_id+'/tax_settings')
			.then(function(list){
				$rootScope.TaxList = list;
				$rootScope.cloading = false;
			});
	}
	$scope.getTaxData = function(){
		$rootScope.cloading = true;
		if($state.params.TaxID == 'new'){
			$scope.TaxData = {
				name:'',
				amount : '0',
			};
		}
		else if($state.params.TaxID != 'new' && $state.params.TaxID != undefined){
			Data.get('/tax_settings/'+$state.params.TaxID+'/edit')
			.then(function(data){
				console.log(data);
				$scope.TaxData = data;
				$rootScope.cloading = false;
			});
		}
		console.log($scope.TaxData);
		
	}
$scope.getTaxData();
$scope.getTaxList();

  $scope.TaxSubmit = function(data){
  	console.log(data)
      $rootScope.cloading = true;
    if($state.params.TaxID == 'new'){
      $http.post('/settings/'+$rootScope.comp_id+'/tax_settings', data)
        .success(function(results){
        	console.log(results);
            if(results.error){
                  $rootScope.cloading = false;
                  $rootScope.errors = results.error;
                 $rootScope.showMultyErrorToast();
              }
              else{
                $state.go('settings.taxes.info',{TaxID:results.id});
                $rootScope.showSimpleToast('Tax Type Created Successfully');
                $scope.getTaxList();
                $rootScope.cloading = false;
              }
        });
    }
    else if($state.params.TaxID != 'new'){
      $http.put('/tax_settings/'+$state.params.TaxID, data)
        .success(function(results){
          console.log(results);
          if(results.error){
                  $rootScope.cloading = false;
                  $rootScope.errors = results.error;
                 $rootScope.showMultyErrorToast();
              }
              else{
              $rootScope.showSimpleToast('Tax Type Updated Successfully');
             $scope.getTaxList();
              $rootScope.cloading = false;
            }
        });
    }
  }


  $rootScope.DeleteTax = function(data){
      $rootScope.cloading = true;
      $http.delete('/Tax_types/'+$state.params.TaxID)
        .success(function(results){
          console.log(results);
          $state.go('settings.Tax-types');
          $rootScope.showSimpleToast('Tax Type Deleted Successfully');
          $scope.getTaxList();
          $rootScope.cloading = false;
        });
    }
}]);
