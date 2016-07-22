app.factory("Signup", ['$http',
	function ($http) { 
var obj = {};
		obj.Post = function(q){
			return $http.post(q).then(function (results) {
                return results.data;
            });
		};
		obj.test = function(q){
			return q
		};
		return obj;
}]);