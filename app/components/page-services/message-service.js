module.exports = function(ngModule) {
  	ngModule.factory('MessageService',[
  		'$http',
  		'Constants',
  		function($http,Constants){
	    	return {
	        	getList:function(_dataParam){
	        		var url = Constants.baseurl + "message/list";
	          		return $http.post(url,_dataParam);
	        	},
	        	addMessage:function(_dataParam){
	        		var url = Constants.baseurl + "message";
	          		return $http.post(url,_dataParam);
	        	},
	        	singlesendpage:function(_dataParam){
	        		var url = Constants.baseurl + "message/personal";
	          		return $http.post(url,_dataParam);
	        	}
	    	};
	    }
	]);
};