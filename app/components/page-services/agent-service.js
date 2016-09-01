module.exports = function(ngModule) {
  	ngModule.factory('AgentService',[
  		'$http',
  		'Constants',
  		function($http,Constants){
	    	return {
	        	doAgent:function(_channelpkey){
	        		var url = Constants.baseurl + "agent/channel/" + _channelpkey;
	          		return $http.post(url);
	        	}
	    	};
	    }
	]);
};