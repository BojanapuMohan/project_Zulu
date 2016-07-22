app.controller('expenseCtrl',["$rootScope", "$scope", "Data", "$state", "$http", 'filterFilter', function ($rootScope, $scope, Data, $state, $http, filterFilter) {
  
  $scope.exp_detail=true;
  $scope.selectedItem =null;
  $scope.searchText = null;
  $scope.selectedItemp = null;
  $scope.searchTextp = null;
  $scope.ExpenseDetails=true;
  $scope.edit_bar=false;
  $scope.show_edit_Expense=function(){

	$scope.ExpenseDetails=false;
  	$scope.edit_bar=true;
  }
  
  $scope.NewExpenses= {tax:'', include_product_price:'false', expense_products_attributes:[{name:'',unit_cost_price:'',quantity:'',prod_id:''}]};
  $scope.addExpenseProduct = function(){
    console.log($scope.NewExpenses)
    $scope.NewExpenses.expense_products_attributes.push({name:'',unit_cost_price:'',quantity:'', prod_id:''});
    console.log($scope.NewExpenses)
  };
  $scope.removeExpenseProduct = function(index){
    $scope.NewExpenses.expense_products_attributes.splice(index,1);
  };
  $scope.CalculateTax = function(){
  if($scope.NewExpenses.tax){
    $scope.TaxIndex = filterFilter($scope.taxList, {id:$scope.NewExpenses.tax});
 if($scope.NewExpenses.total_expense!=undefined && $scope.NewExpenses.total_expense!="")
{
   $scope.NewExpenses.tax_amount=parseFloat($scope.NewExpenses.total_expense-($scope.NewExpenses.total_expense)/(1 + ($scope.TaxIndex[0].amount/100))).toFixed(2);
}
else

{
$scope.NewExpenses.tax_amount='';

}

   //$scope.NewExpenses.tax_amount = $scope.NewExpenses.total_expense*$scope.TaxIndex[0].amount/100;
    //console.log($scope.NewExpenses.total_expense)

   //console.log(parseFloat((1 + ($scope.TaxIndex[0].amount/100))).toFixed(2));

  

   }
   else{
    $scope.NewExpenses.tax_amount='';
   }
  }
  $scope.CreateExpenses = function(data){
    $rootScope.cloading = true;
    for(var i = 0; i<data.expense_products_attributes.length; i++){

      data.expense_products_attributes[i].prod_id = data.expense_products_attributes[i].name.prod_id;
      data.expense_products_attributes[i].name = data.expense_products_attributes[i].name.name;
    }
      $http.post('/settings/'+$rootScope.comp_id+'/expenses', {expense:data})
        .success(function(results){
        console.log(results);
        if(results.error){
            $rootScope.cloading = false;
            $rootScope.errors = results.error;
            $rootScope.showMultyErrorToast();
        }
        else{ 
          $scope.getExpenseList();
          $rootScope.cloading = false;
          $rootScope.showSimpleToast('Expense Added Successfully');
          $scope.new_expense = false;
          $scope.NewExpenses= {tax:'', include_product_price:'false', expense_products_attributes:[{name:'',unit_cost_price:'',quantity:'',prod_id:''}]};

        }
      });
  }
  $scope.DeleteExpense= function(id, e){
    e.preventDefault();
     e.stopPropagation();
    $rootScope.cloading = true;
    $http.delete('/expenses/'+id)
      .success(function(results){
        console.log(results);
        if(results.error){
            $rootScope.cloading = false;
            $rootScope.errors = results.error;
            $rootScope.showMultyErrorToast();

        }
        else{
          $scope.businessInfo = results.data;
          $scope.getExpenseList();
          $rootScope.cloading = false;
          $rootScope.showSimpleToast('Expense Deleted Successfully');
        }
      });
  }
  
$scope.new_exp=function(){
  $scope.new_expense=true;
  $scope.NewExpenses= {tax:'', include_product_price:'false',business_name:''+$scope.businessList[0].id, expense_products_attributes:[{name:'',unit_cost_price:'',quantity:'',prod_id:''}]};
  console.log($scope.NewExpenses);
}
 $scope.new_exp_Hide=function(){

	 $scope.new_expense=false;
	 $scope.ExpenseDetails=true;
  	 $scope.edit_bar=false;
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
        $rootScope.cloading = true;
         $http.get(' /expenses/'+id+'/edit')
          .success(function(results){
            $scope.ExpenseDetail = results;
            $rootScope.cloading= false;
            console.log(results);
          });
        $scope.ShowEditExpense = false;
    	 	$scope.exp_detail=false;
    		$scope.ExpenseDetails=true;
  		  $scope.edit_bar=false;
      }
      else if(!$scope.ExpenseList[index].isopen){
         $scope.ExpenseDetail = '';
         console.log($scope.ExpenseDetail)
      }

    })
  }
$scope.sEditExpense  = function(index, id){
      if($scope.ExpenseList[index].isopen){
        $scope.ExpenseDetails = false;
         $scope.exp_detail=false;
         $scope.edit_bar =true;
         $scope.NewExpenses = $scope.ExpenseDetail;
         $scope.NewExpenses.include_product_price = ''+$scope.ExpenseDetail.include_product_price;
         for(var i = 0; i<$scope.NewExpenses.expense_products_attributes.length; i++){
          $scope.NewExpenses.expense_products_attributes[i].name = {name:$scope.NewExpenses.expense_products_attributes[i].name,prod_id:$scope.NewExpenses.expense_products_attributes[i].prod_id}
         }

         console.log($scope.NewExpenses);
    }
  	
  }

  $scope.UpdateExpenses = function(data){
    $rootScope.cloading = true;
    for(var i = 0; i<data.expense_products_attributes.length; i++){
      //console.log(data.expense_products_attributes[i]);
      data.expense_products_attributes[i].prod_id = data.expense_products_attributes[i].name.prod_id;
      data.expense_products_attributes[i].name = data.expense_products_attributes[i].name.name;
      console.log(data.expense_products_attributes[i]);
    }
      $http.put('expenses/'+data.id, {expense:data})
        .success(function(results){
        console.log(results);
        if(results.error){
            $rootScope.cloading = false;
            $rootScope.errors = results.error;
            $rootScope.showMultyErrorToast();
        }
        else{ 
          $scope.getExpenseList();
          $rootScope.cloading = false;
          $rootScope.showSimpleToast('Expense Updated Successfully');
          $scope.new_expense = false;
          $scope.NewExpenses= {tax:'', include_product_price:'false', expense_products_attributes:[{name:'',unit_cost_price:'',quantity:'',prod_id:''}]};

        }
      });
  }
$scope.getTaxList = function(){
    $http.get('/settings/'+$rootScope.comp_id+'/tax_settings')
      .success(function(taxList){
        $scope.taxList = taxList;
      });
}
$scope.getTaxList();
$scope.getBusinessList = function(){
  Data.get('/settings/'+$rootScope.comp_id+'/business').then(function (results) {
  		console.log(results);
      	$rootScope.cloading = false;
  		$rootScope.businessList = results;
  		//console.log(results);

  });
}
$scope.getBusinessList();

$scope.getProductList = function(){
  $http.get('/settings/'+$rootScope.comp_id+'/list/products')
    .success(function(list){
      console.log(list);
      $scope.ProductsList = list;
    });
}
$scope.getProductList();

}]);
