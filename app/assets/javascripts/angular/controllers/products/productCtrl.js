app.controller('productCtrl',["$rootScope", "$scope", "Data", "$state", "$http", function ($rootScope, $scope, Data, $state, $http) {
		 $scope.new_product=false;
      $scope.AddProductshow = function(){
      $scope.new_product = true;
      $scope.product = {};
     }
      $scope.AddProductHide = function(){
       $scope.new_product = false;
    }
  $scope.getProductList = function(){
    $http.get('/settings/'+$rootScope.comp_id+'/products')
      .success(function(list){
        console.log(list);
          for(var i = 0; i < list.product.length; i++){
            list.product[i].isopen = false;
          }
        $scope.ProductsList = list.product;
      });
  }
  $scope.getTaxList = function(){
    $http.get('/settings/'+$rootScope.comp_id+'/tax_settings')
      .success(function(taxList){
        $scope.taxList = taxList;
      });
  }
  $scope.getProductList();
 $scope.showProductDetails = function(index){
  if($scope.ProductsList[index].isopen){
    return true;
  }
 }

    
 $scope.Stock={stock_level:'increasing'};
 


  $scope.opened = function(index, id){
    console.log(id);
    setTimeout(function(){
      if($scope.ProductsList[index].isopen){
        $scope.stockadjustment = true;
        $scope.editProduct = false;
        $scope.stockadjustmentEdit = false;
        $scope.getTaxList();
        $http.get('/products/'+id+'/product_stocks')
          .success(function(product_stocks){
            $scope.ProductStocks = product_stocks.product_stocks;
            $rootScope.cloading = false;
          });
      }
    })
  }
  $scope.EditProdcut = function(index){
    $scope.editProduct = true;
    $scope.stockadjustment = false;
    $scope.stockadjustmentEdit = false;

     $scope.getTaxList();
       if($scope.ProductsList[index].stock_number == null){
        $scope.showStocktext =false;
       }
       else if($scope.ProductsList[index].stock_number != null){
        $scope.showStocktext = true;
       }

  }
  $scope.EditStock = function(index){
    $scope.editProduct = false;
    $scope.stockadjustment = false;
    $scope.stockadjustmentEdit = true;
     $scope.Stock={};
     $scope.Stock={stock_level:'increasing', stock_type :'Stock Purchase'};
  }

  $scope.backToStock = function(){
    $scope.getProductList();
    $scope.editProduct = false;
    $scope.stockadjustmentEdit = false;
    $scope.stockadjustment = true;

  }
  $scope.UpdateProduct = function(data, id){
    console.log(id);
    console.log(data);
    $rootScope.cloading = true;
    $http.put('/products/'+id, {product:data})
      .success(function(results){
        if(results.error){
                $rootScope.cloading = false;
                  $rootScope.errors = results.error;
                 $rootScope.showMultyErrorToast();
              }
        else{
         $scope.getProductList();
         $rootScope.showSimpleToast('Product Updated Successfully');
         $rootScope.cloading = false;
       }
      })
  }
  $scope.UpdateStock = function(data, id){
    console.log(data);
    $http.post('/products/'+id+'/product_stocks', {product_stock:data})
      .success(function(results){
        if(results.error){
                $rootScope.cloading = false;
                  $rootScope.errors = results.error;
                 $rootScope.showMultyErrorToast();
              }
        else{
         $scope.getProductList();
         $rootScope.showSimpleToast('Stock Updated Successfully');
         $rootScope.cloading = false;
       }
      })
  }
  $scope.DeleteProduct = function(id, e){
    $rootScope.cloading = true;
      e.preventDefault();
     e.stopPropagation();
    $http.delete('/products/'+id, {status : false})
      .success(function(results){
         if(results.error){
                $rootScope.cloading = false;
                  $rootScope.errors = results.error;
                 $rootScope.showMultyErrorToast();
              }
              else{
                 $scope.getProductList();
                 $rootScope.showSimpleToast('Product Deleted');
                 $rootScope.cloading = false;
              }
      })
  }
  
  $scope.getTaxList();
  $scope.AddProduct = function(data ){
    $rootScope.cloading = true;
  $scope.new_product=true;
    console.log(data);
    $http.post('/settings/'+$rootScope.comp_id+'/products', {product:data})
      .success(function(results){
        console.log(results);
        if(results.error){
                $rootScope.cloading = false;
                  $rootScope.errors = results.error;
                 $rootScope.showMultyErrorToast();
              }
              else{
        $rootScope.showSimpleToast('Product Added Successfully');
        $state.go('products.list');
        $rootScope.cloading = false;
        $scope.getProductList();
        $scope.new_product = false;
        $scope.product = '';
      }
      })
  }
 
}]);
app.controller('productListCtrl',["$rootScope", "$scope", "Data", "$state", "$http", function ($rootScope, $scope, Data, $state, $http) {
 

}]);

