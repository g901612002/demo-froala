module.exports = function(ngModule) {
  	ngModule.factory('ImageService',[
  		'$http',
  		'Constants',
  		'AUTHCODE',
  		function($http,Constants,AUTHCODE){
	    	return {
	        	getPicList:function(_dataParam){
	        		AUTHCODE.CURRENT = AUTHCODE.CAROOT;
	        		var url = Constants.baseurl + "images/list";
	          		return $http.post(url,_dataParam);
	        	},
	        	updatePic:function(_picpkey,_dataParam){
	        		AUTHCODE.CURRENT = AUTHCODE.CAROOT;
	        		var url = Constants.baseurl + "images/" + _picpkey;
	          		return $http.put(url,_dataParam);
	        	},
	        	deletePic:function(_dataParam){
	        		AUTHCODE.CURRENT = AUTHCODE.CAROOT;
	        		var url = Constants.baseurl + "images";
	        		return $http({
	        			method:"DELETE",
	        			url:url,
	        			data:_dataParam
	        		});
	        	},
	        	setGroup:function(_dataParam){
	        		AUTHCODE.CURRENT = AUTHCODE.CAROOT;
	        		var url = Constants.baseurl + "images/setgroup";
	        		return $http.post(url,_dataParam);
	        	}
	    	};
	    }
	]);
};