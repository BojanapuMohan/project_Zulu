app.controller('settingCtrl',["$scope", "$location", "$rootScope", "$http", "Data", "Upload", "toplink", function ($scope, $location, $rootScope, $http, Data, Upload, toplink) {
    toplink.getTopLink().then(function(response){
      $rootScope.toplinks = response;
    })
    $rootScope.selected_timeZone = '-12';

}]);
app.controller('AccountsettingCtrl',["$scope", "$location", "$rootScope", "$http", "Data", "Upload", function ($scope, $location, $rootScope, $http, Data, Upload) {
	$scope.account = [];
	/*$scope.settingSubmit= function(data){
    console.log(data);
		$http.put('/settings/'+$rootScope.comp_id, data)
	 		 .success(function(response, error){
	 		 	$scope.account = response.data;
        $rootScope.showSimpleToast('Data Updated Successfully');
        $scope.uploadPic(data.logo);
		});

	}*/
  $scope.settingSubmit = function (file, data) {
    $rootScope.cloading = true;
        Upload.upload({
            url: '/settings/'+$rootScope.comp_id,
            method: 'PUT',
            fields: data,
            file: file
        }).progress(function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        }).success(function (data, status, headers, config) {
          console.log(data);
            if(data.error){
              $rootScope.cloading = false;
                $rootScope.errors = data.error;
               $rootScope.showMultyErrorToast();

            }
            else{
              $rootScope.cloading = false;
              $rootScope.showSimpleToast('Account Settings Updated Successfully');
            }
        }).error(function (data, status, headers, config) {
            console.log('error status: ' + status);
        })
    };
/*	$scope.settingSubmit = function(file, data) {
    file.upload = Upload.upload({
      url: '/settings/'+$rootScope.comp_id,
      method: 'PUT',
      headers: {
        'my-header': 'my-header-value'
      },
      fields: data,
      file: file,
      fileFormDataName: 'logo'
    });

    file.upload.then(function (response) {
      $timeout(function () {
        file.result = response.data;
      });
    }, function (response) {
      if (response.status > 0)
        $scope.errorMsg = response.status + ': ' + response.data;
    });

    file.upload.progress(function (evt) {
      // Math.min is to fix IE which reports 200% sometimes
      file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
    });
    }*/



	Data.getTimezone().then(function (results) {
    	$scope.timezone = results;
    	Data.getCountry().then(function (results) {
	    	$scope.country = results;
	    	$http.get('/settings/'+$rootScope.comp_id+'/edit')
			 		 .success(function(response, error){
			 		 	$scope.account = response;
            console.log(response);
			});
	    });
    });
   
	
}]);
