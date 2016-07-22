app.controller('UserSettingNewCtrl',["$scope", "$location", "$rootScope", "$http", "filterFilter", "Data", "$stateParams", "$state", function ($scope, $location, $rootScope, $http, filterFilter, Data, $stateParams, $state) {
    $scope.acounter=0;
    $rootScope.userBtnText = 'S_button_save';
    $rootScope.settingtopClasses1 = 'col-md-9 col-xs-6 top-links';
    $rootScope.settingtopClasses2 = 'col-md-3 col-xs-6 top-btn';
    $rootScope.showBlank = false;
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

     

    $http.get('/settings/'+$rootScope.comp_id+'/users/new')
            .success(function(results){
                 $scope.userData = results;
                 $http.get('/settings/'+$rootScope.comp_id+'/appointment_type')
                    .success(function(aptype){
                        $scope.aptype = aptype;
                            for(var i =0;i< $scope.aptype.length ; i++){
                                $scope.userData.appointment_services.push($scope.aptype[i]);
                            }
                            $scope.userData.user_refer.push({ref_type:'', number:'', business_id: $rootScope.businessList[0].id} );
                            for(var i =0;i< $scope.user.user_refer.length ; i++){
                                $scope.userData.user_refer[i].business_id = ''+$rootScope.businessList[i].id;
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
                    });
                setTimeout(function () {
                    $scope.$apply(function () {
                       $scope.user =  $scope.userData;
                       $scope.user.user_basic.time_zone = '-12';
                       $scope.user.user_basic.title = 'dr';
                       $scope.user.user_basic.role = 'Scheduler';
                       $scope.user.practi_info.default_type = 'N/A'
                    });
                });
        });
        $scope.CreateUser = function(data){
            $rootScope.cloading = true;
            console.log(data);
        $http.post('/settings/'+$rootScope.comp_id+'/users/', data)

        .success(function (results) {
            console.log(results);
                if(results.error){
                    $rootScope.cloading = false;
                $rootScope.errors = results.error;
               $rootScope.showMultyErrorToast();
                }
                else{
                    $state.go('settings.users.info',{user_id:results.user_id})
                    $scope.getUsersList();
                    $rootScope.cloading = false;
                    $rootScope.getBusinessList();
                    $rootScope.showSimpleToast('User Created Successfully');
                    //$state.go('settings.users');
                
                }
                
        });
    }
     $scope.newPractitioner = function(data){
        $scope.bid = ''+data ;
        $scope.user.user_refer.push({ ref_type:'', number:'', business_id: $scope.bid} );
    }
    $scope.removePractitioner = function(data){
            $scope.user.user_refer.splice(data, 1)
    }
    $scope.NewBreak = function(pindex, index){
        $scope.user.user_availability[pindex].days[index].cust_break.push({start_hr:'1',start_min: '5', end_hr: '2', end_min:'5'} );
    }
    $scope.RemoveBreak = function(ppindex, pindex, index){
            $scope.user.user_availability[ppindex].days[pindex].cust_break.splice(index, 1)
    }
   
}]);



