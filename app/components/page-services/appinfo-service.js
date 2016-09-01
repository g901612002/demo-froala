module.exports = function(ngModule) {
  	ngModule.factory('AppService',[
  		'$http',
  		'Constants',
  		function($http,Constants){
  			return {
  				getList:function(_dataParam){
  					var url = Constants.baseurl + "app/list";
	          		return $http.post(url,_dataParam);
  				},
  				addApp:function(_dataParam){
  					var url = Constants.baseurl + "app";
	          		return $http.post(url,_dataParam); 
  				},
  				getApp:function(_apppkey){
  					var url = Constants.baseurl + "app/" + _apppkey;
  					return $http.get(url);
  				},
  				updateApp:function(_apppkey,_dataParam){
  					var url = Constants.baseurl + "app/" + _apppkey;
  					return $http.put(url,_dataParam);
  				},
  				getAppCategoryList:function(_apppkey){
  					var url = Constants.baseurl + "app/" + _apppkey + "/categorylist";
  					return $http.get(url);
  				},
  				setAppCategoryList:function(_apppkey,_dataParam){
  					var url = Constants.baseurl + "app/" + _apppkey + "/categorylist";
  					return $http.put(url,_dataParam);
  				}
  			};
  	}]);
};