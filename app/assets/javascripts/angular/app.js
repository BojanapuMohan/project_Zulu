var app = angular.module('clinikoApp', ['ui.router', 'ngAnimate', 'ui.bootstrap', 'oc.lazyLoad', 'ng-token-auth','angular-datepicker', 'ngScrollbars', 'ngFileUpload', 'ngMaterial', 'ui.router.stateHelper', 'textAngular', 'ui.tree',  'ngCookies', 'pascalprecht.translate', 'angular-loading-bar']);
app.controller('MainCntl',["$scope", function ($scope) {
}]);
app.run(function ($rootScope, $location,  $state, $stateParams, $http, Auth,  $mdToast, toplink) {
        
        
        $rootScope.$on("$stateChangeStart", function (event, next, current, toState) {

            $rootScope.authenticated = false;
            console.log(window.navigator.language);
            $rootScope.cloading = true;
            Auth.getsession().then(function (results) {
                console.log(results);
                if(results.flag == true){
                    $rootScope.User_id = results.session_id;
                    $rootScope.name = results.user_name;
                    $rootScope.comp_id = results.comp_id;
                    $rootScope.isLoggedIn = true;

                    if(next.data.authRequire == false){
                        $state.go('dashboard')
                    }
                }
                else{
                    $rootScope.isLoggedIn = false;
                    if(next.data.authRequire == false){
                        return   
                    }
                    else{
                        $state.go("login");
                     }
                    
                }
            });

              

            $rootScope.logout = function(){
                $http.get('/signed_out')
                    .success(function(response){
                      $state.go("login");
                    });
            }
            $rootScope.showSimpleToast = function(content) {
                $mdToast.show(
                  $mdToast.simple()
                    .content(content)

                    .position('bottom right')
                    .hideDelay(3000)
                );
              };
              $rootScope.showErrorToast = function(content) {
                $mdToast.show(
                  $mdToast.simple()
                    .content(content)
                    .theme("error-toast")
                    .position('bottom right')
                    .hideDelay(3000)
                );
              };
              $rootScope.showMultyErrorToast = function(content) {
                $mdToast.show({
                  templateUrl: 'assets/angular/toast-template.html',
                  hideDelay: 6000,
                  position: 'bottom right'
                });
              };
            $rootScope.range = function(min, max, step){
                step = step || 1;
                var input = [];
                for (var i = min; i <= max; i += step) input.push(i);
                return input;
              };
           
        });
        $rootScope.$on("$stateChangeSuccess", function (event, next, current) {
            $rootScope.$watch(function(){ $rootScope.$broadcast('rebuild:me');});
            $rootScope.cloading = false;

        });
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    });



