app.controller('UserSettingCtrl',["$scope", "$location", "$rootScope", "$http", "filterFilter", "Data", "$stateParams", function ($scope, $location, $rootScope, $http, filterFilter, Data, $stateParams) {
$rootScope.userBtnText = '';
$rootScope.showBlank = true;
$rootScope.settingtopClasses1 = 'col-md-12 col-xs-12 top-links';
$rootScope.settingtopClasses2 = 'hide';

    Data.getTimezone().then(function (results) {
        $rootScope.timezone = results;
    });
    
    //$scope.$watch(function(){ $scope.$broadcast('rebuild:me');});

    $scope.getUsersList = function(){
        Data.get('/settings/'+$rootScope.comp_id+'/users')
            .then(function(results){
                $scope.userList = results;
            })
    }
    
     $scope.getUsersList();
    $rootScope.getBusinessList = function(){
        Data.get('/settings/'+$rootScope.comp_id+'/business').then(function (results) {
            $rootScope.cloading = false;
                $rootScope.businessList = results;
                console.log(results);
        });
    }
    $rootScope.getBusinessList();
    


}]);



