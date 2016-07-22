app.controller('smsSettingCtrl',["$scope", "$location", "$rootScope", "$http", "filterFilter", "Data", "$stateParams", "$state", "$modal", function ($scope, $location, $rootScope, $http, filterFilter, Data, $stateParams, $state, $modal) {
	
	$scope.getSmsSettings = function(){
		Data.get('/settings/'+$rootScope.comp_id+'/sms_setting/edit')
			.then(function(results){
				console.log(results);
				$scope.smsSettings = results.sms_setting_detail;
				$scope.smsPlans = results.sms_plans;
				$scope.smsSettings.sms_alert_no = ''+$scope.smsSettings.sms_alert_no;
			});
	}
	$scope.getSmsSettings();
	$scope.SMSSubmit = function(data){
		$rootScope.cloading=true;
		console.log(data);
		console.log({'sms_setting':data});
		$http.put('/settings/'+$rootScope.comp_id+'/sms_setting', {'sms_setting':data})
			.success(function(results){
				console.log(results);
				if(results.error){
	                  $rootScope.cloading = false;
	                  $rootScope.errors = results.error;
	                 $rootScope.showMultyErrorToast();
	              }
	              else{
					$scope.getSmsSettings();
					$rootScope.showSimpleToast('SMS Settings are Updated Successfully');
					$rootScope.cloading=false;
				}
			});
	}
	$scope.openConfirm = function (data) {

	    $rootScope.modalInstance = $modal.open({
	      animation: $scope.animationsEnabled,
	      templateUrl: 'smsConfirm.html',
	      controller: 'SMSUpdate',
	      size: 'sm',
	      resolve: {
	        plan: function () {
	          return data;
		        }
	      }
    });
    };
}]);

app.controller('SMSUpdate',["$scope", "$modalInstance", "plan", "$rootScope", function ($scope, $modalInstance, plan, $rootScope) {
	$scope.plan = plan;
	$scope.UpdateSMSPlan = function(id){
		console.log(id);
		$http.put('')
			.success(function(results){
				$rootScope.cloading = false;
				$rootScope.showSimpleToast('Business Data Updated Successfully');
			});

	}
  $scope.hitSmsUPdate = function (id) {
	    $modalInstance.close($scope.UpdateSMSPlan(id));
 };

  $rootScope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}]);