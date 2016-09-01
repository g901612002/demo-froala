module.exports = function(ngModule) {
  	ngModule.factory('InformationService',[
  		'$http',
  		'Constants',
  		function($http,Constants){
	    	return {
	        	updateInformation:function(_item){
	        		var url = Constants.baseurl + "information";
	          		return $http.put(url,_item);
	        	}
	    	};
	    }
	]);
};