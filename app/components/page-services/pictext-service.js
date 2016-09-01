module.exports = function(ngModule) {
  	ngModule.factory('PictextService',[
  		'$http',
  		'Constants',
  		function($http,Constants){
	    	return {
	        	getList:function(_channelpkey,_dataParam){
	        		var url = Constants.baseurl + "pictext/"+_channelpkey+"/list";
	          		return $http.post(url,_dataParam);
	        	},
	        	deleteList:function(_masterpkey){
	        		var url = Constants.baseurl + "pictext/" + _masterpkey;
	          		return $http.delete(url);
	        	},
	        	get:function(_masterpkey){
	        		var url = Constants.baseurl + "pictext/" + _masterpkey;
	          		return $http.get(url);
	        	},
	        	modify:function(_dataParam){
	        		var url = Constants.baseurl + "pictext";
	          		return $http.put(url,_dataParam);
	        	},
	        	add:function(_channelpkey,_dataParam){
	        		var url = Constants.baseurl + "pictext/" + _channelpkey;
	          		return $http.post(url,_dataParam);
	        	}
	    	};
	    }
	]);
};