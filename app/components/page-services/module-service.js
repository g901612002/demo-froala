module.exports = function(ngModule) {
  	ngModule.factory('ModuleService',[
  		'$http',
  		'Constants',
  		function($http,Constants){
	    	return {
	        	getModules:function(_accountPKey){
	        		var url = Constants.baseurl + "module/" + _accountPKey;
	          		return $http.get(url);
	        	},
	        	getCAModules:function(_accountPKey){
	        		var url = Constants.baseurl + "module/ca";
	          		return $http.get(url);
	        	},
	        	setModules:function(_accountPKey,_nodedata){
	        		var url = Constants.baseurl + "module/" + _accountPKey;
	        		return $http.post(url,_nodedata);
	        	}
	    	};
	    }
	]);
};