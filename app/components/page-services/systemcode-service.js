module.exports = function(ngModule) {
  	ngModule.factory('SystemcodeService',[
  		'$http',
  		'Constants',
  		function($http,Constants){
	    	return {
	        	getAddresslist:function(){
	        		var url = Constants.baseurl + "systemcode/addresslist";
	          		return $http.get(url);
	        	}
	    	};
	    }
	]);
};