module.exports = function(ngModule) {
  	ngModule.factory('ReviewService',[
  		'$http',
  		'Constants',
  		function($http,Constants){
	    	return {
	        	getReview:function(_channelpkey,_accountpkey){
	        		var url = Constants.baseurl + "reviewgroup/"+_channelpkey+"/accountpkey/"+_accountpkey;
	          		return $http.get(url);
	        	},
	        	modifyReview:function(_dataParam){
	        		var url = Constants.baseurl + "reviewgroup";
	          		return $http.put(url,_dataParam);
	        	}
	    	};
	    }
	]);
};