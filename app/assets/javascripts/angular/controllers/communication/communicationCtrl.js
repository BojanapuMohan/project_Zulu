app.controller('communicationCtrl',["$rootScope", "$scope", "Data", "$state", "$http", function ($rootScope, $scope, Data, $state, $http) {
  
  $scope.new_expense=false;
  $scope.new_exp=function(){
	  $scope.new_expense=true;
  }
 $scope. new_exp_Hide=function(){
	 $scope.new_expense=false;
 }
  
  $scope.getExpenseList = function(){
    console.log($rootScope.comp_id);
    $http.get('/settings/'+$rootScope.comp_id+'/expenses')
      .success(function(list){
        console.log(list);
         for(var i = 0; i < list.expense.length; i++){
            list.expense[i].isopen = false;
          }
        $scope.ExpenseList = list.expense;
      });
  }
  $scope.getExpenseList();
  $scope.showExpenseDetails = function(index){
    if($scope.ExpenseList[index].isopen){
      return true;
    }
   }
  $scope.opened = function(index, id){
    console.log(id);
    setTimeout(function(){
      if($scope.ExpenseList[index].isopen){
        $scope.ExpenseDetails = true;
        $scope.ShowEditExpense = false;
      }
    })
  }
  $scope.EditExpense  = function(index){
    console.log(index);
    $scope.ExpenseDetails = false;
    $scope.ShowEditExpense = true;
      /* if($scope.ProductsList[index].stock_number == null){
        $scope.showStocktext =false;
       }
       else if($scope.ProductsList[index].stock_number != null){
        $scope.showStocktext = true;
       }
*/
  }
  /*$scope.getTaxList = function(){
    $http.get('/settings/'+$rootScope.comp_id+'/tax_settings')
      .success(function(taxList){
        $scope.taxList = taxList;
      });
  }*/
 
}]);