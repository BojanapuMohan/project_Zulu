angular.module('clinikoApp').controller('dashboardCtrl',["$scope", "$location", "$rootScope", "$timeout", "$http", function ($scope, $location, $rootScope, $timeout, $http) {
$scope.status = {
    isopen: false
  };
  $scope.$broadcast('rebuild:me');
  $scope.postmessage = '';
  $scope.postMessage = function(postmessage){

  }


   

}]);
	