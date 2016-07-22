app.controller('UserSettingInfoCtrl',["$scope", "$location", "$rootScope", "$http", "filterFilter", "Data", "$stateParams", "$state", function ($scope, $location, $rootScope, $http, filterFilter, Data, $stateParams, $state) {
    $scope.counter=0;
	$scope.acounter=0;
    $rootScope.settingtopClasses1 = 'col-md-9 col-xs-6 top-links';
    $rootScope.settingtopClasses2 = 'col-md-3 col-xs-6 top-btn';
    $rootScope.showBlank = false;
    $scope.user = '';
    $scope.userData='';
    $scope.userData.appointment_services=[];
    //$scope.userData.practi_info.notify_by = 'email';
    $rootScope.userBtnText = 'S_button_update';
    $scope.parctitioner = [ {id:$scope.counter} ];
	$scope.abreak = [ {id:$scope.acounter} ];
    $scope.getUsersList();
    $scope.weekDays =    [{
                            id:'',
                            day_name: "Sunday",
                            start_hr: "9",
                            start_min: "0",
                            end_hr: "17",
                            end_min: "0",
                            is_selected: false,
                            cust_break: [ ]
                        },
                        {
                            id:'',
                            day_name: "Monday",
                            start_hr: "9",
                            start_min: "0",
                            end_hr: "17",
                            end_min: "0",
                            is_selected: false,
                            cust_break: [ ]
                        },
                        {
                            id:'',
                            day_name: "Tuesday",
                            start_hr: "9",
                            start_min: "0",
                            end_hr: "17",
                            end_min: "0",
                            is_selected: false,
                            cust_break: [ ]
                        },
                        {
                            id:'',
                            day_name: "Wednesday",
                            start_hr: "9",
                            start_min: "0",
                            end_hr: "17",
                            end_min: "0",
                            is_selected: false,
                            cust_break: [ ]
                        },
                        {
                            id:'',
                            day_name: "Thursday",
                            start_hr: "9",
                            start_min: "0",
                            end_hr: "17",
                            end_min: "0",
                            is_selected: false,
                            cust_break: [ ]
                        },
                        {
                            id:'',
                            day_name: "Friday",
                            start_hr: "9",
                            start_min: "0",
                            end_hr: "17",
                            end_min: "0",
                            is_selected: false,
                            cust_break: [ ]
                        },
                        {
                            id:'',
                            day_name: "Saturday",
                            start_hr: "9",
                            start_min: "0",
                            end_hr: "17",
                            end_min: "0",
                            is_selected: false,
                            cust_break: [ ]
                        }];
    //$scope.$watch(function(){ $scope.$broadcast('rebuild:me');});
    $scope.getUserData = function(){
    $http.get('/settings/'+$rootScope.comp_id+'/users/'+$stateParams.user_id+'/edit')
        .success(function(results){
            $scope.userData = results;
            console.log(results);

            $http.get('/settings/'+$rootScope.comp_id+'/appointment_type')
                    .success(function(aptype){
                        $scope.aptype = aptype;
                        if(results.appointment_services.length <1){
                            for(var i =0;i< $scope.aptype.length ; i++){
                                $scope.userData.appointment_services.push($scope.aptype[i]);
                            }
                        }
                        });
                        if($scope.userData.user_refer.length <1){
                          //  $scope.userData.user_refer.push({ref_type:'', number:'', business_id: $rootScope.businessList[0].id} );
                            /*for(var i =0;i< $scope.userData.user_refer.length ; i++){
                                $scope.userData.user_refer[i].business_id = ''+$rootScope.businessList[i].id;
                                console.log( $rootScope.businessList[i].id);
                            }*/
                        }
                        for(var i = 0; i < $scope.userData.user_availability.length; i++){
                                if($scope.userData.user_availability[i].days.length < 1){
                                    //for(var a = 0; a < $scope.weekDays.length; a++){
                                                $scope.userData.user_availability[i].days.push({
                                                            id:'',
                                                            day_name: "Sunday",
                                                            start_hr: "9",
                                                            start_min: "0",
                                                            end_hr: "17",
                                                            end_min: "0",
                                                            is_selected: false,
                                                            cust_break: [ ]
                                                        },
                                                        {
                                                            id:'',
                                                            day_name: "Monday",
                                                            start_hr: "9",
                                                            start_min: "0",
                                                            end_hr: "17",
                                                            end_min: "0",
                                                            is_selected: false,
                                                            cust_break: [ ]
                                                        },
                                                        {
                                                            id:'',
                                                            day_name: "Tuesday",
                                                            start_hr: "9",
                                                            start_min: "0",
                                                            end_hr: "17",
                                                            end_min: "0",
                                                            is_selected: false,
                                                            cust_break: [ ]
                                                        },
                                                        {
                                                            id:'',
                                                            day_name: "Wednesday",
                                                            start_hr: "9",
                                                            start_min: "0",
                                                            end_hr: "17",
                                                            end_min: "0",
                                                            is_selected: false,
                                                            cust_break: [ ]
                                                        },
                                                        {
                                                            id:'',
                                                            day_name: "Thursday",
                                                            start_hr: "9",
                                                            start_min: "0",
                                                            end_hr: "17",
                                                            end_min: "0",
                                                            is_selected: false,
                                                            cust_break: [ ]
                                                        },
                                                        {
                                                            id:'',
                                                            day_name: "Friday",
                                                            start_hr: "9",
                                                            start_min: "0",
                                                            end_hr: "17",
                                                            end_min: "0",
                                                            is_selected: false,
                                                            cust_break: [ ]
                                                        },
                                                        {
                                                            id:'',
                                                            day_name: "Saturday",
                                                            start_hr: "9",
                                                            start_min: "0",
                                                            end_hr: "17",
                                                            end_min: "0",
                                                            is_selected: false,
                                                            cust_break: [ ]
                                                        });
                                                            //}
                                                           
                                                        }
                        }
            setTimeout(function () {
                $scope.$apply(function () {
                   $scope.user = $scope.userData;
                });
            });
            
    });
}
$scope.getUserData();

    $scope.newPractitioner = function(data){
        console.log($rootScope.businessList[0].id);
        $scope.user.user_refer.push(  { id:'', ref_type:'', number:'', business_id:''+$rootScope.businessList[0].id} );
    }
    $scope.removePractitioner = function(data){
            $scope.user.user_refer.splice(data, 1)
    }
    $scope.togglePracti = function(){
        //$scope.user.practi_info.notify_by = 'email';
        console.log('hi');
    }

    $scope.UpdateUser = function(user){
        $rootScope.cloading = true; 
        console.log(user);
        
    $http.put('/settings/'+$rootScope.comp_id+'/users/'+$stateParams.user_id, user)
        .success(function (results) {
            $scope.businessInfo = results.data;
             if(results.error){
              $rootScope.cloading = false;
                $rootScope.errors = results.error;
               $rootScope.showMultyErrorToast();
            }
            else{
                $rootScope.cloading = false;
                $rootScope.showSimpleToast('Account Data Updated Successfully');
                 $scope.getUsersList();
                 $scope.getUserData();
                 $rootScope.cloading = false;
            }
                
        });
    }





    $scope.NewBreak = function(pindex, index){
        
       





        $scope.user.user_availability[pindex].days[index].cust_break.push({id:'', start_hr:'1',start_min: '5', end_hr: '2', end_min:'5'} );
         
         //$scope.$broadcast('rebuild:me');
    }
    $scope.RemoveBreak = function(ppindex, pindex, index){
            $scope.user.user_availability[ppindex].days[pindex].cust_break.splice(index, 1)
          //  $scope.$broadcast('rebuild:me');
    }


    $rootScope.deleteuser = function(){
        $http.delete('/settings/'+$rootScope.comp_id+'/users/'+$stateParams.user_id)
        .success(function(results){
            if(results.flag == true){
                $state.go('settings.users');
                $rootScope.showBlank = true;
            }
        });
    }
   
}]);



