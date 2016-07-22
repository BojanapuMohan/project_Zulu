app.controller('onlineBookingCtrl',["$scope", "$location", "$rootScope", "$http", "filterFilter", "Data", "$stateParams", "$state", "Upload", function ($scope, $location, $rootScope, $http, filterFilter, Data, $stateParams, $state, Upload) {
	$scope.booking_info = '';
	$scope.bookingData = function(){
        Data.get('/settings/'+$rootScope.comp_id+'/online_booking')
            .then(function(results){
                console.log(results);
                $scope.booking_info = results;
        });
    }
    $scope.bookingData();
    /*$scope.updateBooking = function(data){
    	console.log(data);
    	$http.put('/online_booking/'+data.id, data)
    		.success(function(results){
    			console.log(results);
    			if(results.error){
    				$rootScope.showErrorToast(results.error);
    			}
    			else{
    				$rootScope.showSimpleToast('Booking Data Updated Successfully');
    				$scope.bookingData();
    			}
    		});
    }*/
    $scope.updateBooking = function (file, data) {
        console.log(file);
        console.log(data);
        $rootScope.cloading = true;
        Upload.upload({
            url: '/online_booking/'+data.id,
            method: 'PUT',
            fields: data,
            file: file
        }).progress(function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        }).success(function (data, status, headers, config) {
            console.log(data);
            if(data.error){
                    $rootScope.errors = data.error;
                    $rootScope.showMultyErrorToast();
                    $rootScope.cloading = false;
            }
            else{
                $rootScope.showSimpleToast('Booking Data Updated Successfully');
                $scope.bookingData();
                 $rootScope.cloading = false;
            }
           
        }).error(function (data, status, headers, config) {
            console.log('error status: ' + status);
        })
    };
}]);