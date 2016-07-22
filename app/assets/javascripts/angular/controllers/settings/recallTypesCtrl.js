app.controller('recallTypesCtrl',["$scope", "$location", "$rootScope", "$http", "filterFilter", "Data", "$stateParams", "$state", "$modal", function ($scope, $location, $rootScope, $http, filterFilter, Data, $stateParams, $state, $modal) {
$scope.recalData = {
	name:'',
	period_val : '1',
	period_name: 'days'
};


$rootScope.recallDeleteBtn = true;
console.log($state.params.recallID);
if($state.params.recallID == 'new'){
  $rootScope.btnText = 'S_button_save';
  $rootScope.recallDeleteBtn = true;
}
else if($state.params.recallID != 'new'){
  $rootScope.btnText = 'S_button_update';
$rootScope.recallDeleteBtn = false;
}
/*Functions*/
    
	$scope.getRecallList = function(){
		$rootScope.cloading = true;
		Data.get('/settings/'+$rootScope.comp_id+'/recall_types')
			.then(function(list){
				$rootScope.RecallList = list;
				$rootScope.cloading = false;
			});
	}
	$scope.getRecallData = function(){
		$rootScope.cloading = true;
		if($state.params.recallID == 'new'){
			$scope.recalData = {
				name:'',
				period_val : '1',
				period_name: 'Day(s)'
			};
		}
		else if($state.params.recallID != 'new' && $state.params.recallID != undefined){
			Data.get('/recall_types/'+$state.params.recallID+'/edit')
			.then(function(data){
				console.log(data);
				        if(data.error){
				          $state.go('settings.recall-types.info',{recallID:'new'});
				          $rootScope.showSimpleToast(data.error);
				        }
				$scope.recalData = data;
				$rootScope.cloading = false;
			});
		}
		
	}
$scope.getRecallData();
$scope.getRecallList();

  $scope.RecallSubmit = function(data){
      $rootScope.cloading = true;
    if($state.params.recallID == 'new'){
      $http.post('/settings/'+$rootScope.comp_id+'/recall_types', data)
        .success(function(results){
        	if(results.error){
		              $rootScope.cloading = false;
		              $rootScope.errors = results.error;
		             $rootScope.showMultyErrorToast();
		          }
		          else{
			          $state.go('settings.recall-types.info',{recallID:results.id});
			          $rootScope.showSimpleToast('Recall Type Created Successfully');
			          $scope.getRecallList();
			          $rootScope.cloading = false;
			      }
        });
    }
    else if($state.params.recallID != 'new'){
      $http.put('/recall_types/'+$state.params.recallID, data)
        .success(function(results){
          if(results.error){
		              $rootScope.cloading = false;
		              $rootScope.errors = results.error;
		             $rootScope.showMultyErrorToast();
		          }
		          else{
		          $rootScope.showSimpleToast('Recall Type Updated Successfully');
		         $scope.getRecallList();
		          $rootScope.cloading = false;
		      }
        });
    }
  }


  $rootScope.DeleteRecall = function(data){
      $rootScope.cloading = true;
      $http.delete('/recall_types/'+$state.params.recallID)
        .success(function(results){
          console.log(results);
          $state.go('settings.recall-types');
          $rootScope.showSimpleToast('Recall Type Deleted Successfully');
          $scope.getRecallList();
          $rootScope.cloading = false;
        });
    }
	
	$scope.reDelete = function (size) {
	    $rootScope.modalInstance = $modal.open({
	      animation: $scope.animationsEnabled,
	      templateUrl: 'DeleteModal.html',
	      size: size
       });
	};
	$rootScope.okdelete = function () {
		$rootScope.modalInstance.close($rootScope.DeleteRecall());
	 };
	 $rootScope.cancel = function () {
		$rootScope.modalInstance.dismiss('cancel');
	  };
	  console.log('hyi');
}]);