module.exports = function(ngModule) {
  	ngModule.factory('SystemAnnounceService',[
  		'$http',
  		'Constants',
  		function($http,Constants){
	    	return {
	        	getAnnounceList:function(_dataparam){
	        		var url = Constants.baseurl + "announce/list";
	          		return $http.post(url,_dataparam);
	        	},
	        	getAnnounce:function(_pkey){
	        		var url = Constants.baseurl + "announce/" + _pkey;
	        		return $http.get(url);
	        	},
	        	addAnnonuce:function(_dataparam){
					var url = Constants.baseurl + "announce";
	          		return $http.post(url,_dataparam);
	        	},
	        	updateAnnounce:function(_pkey,_dataparam){
					var url = Constants.baseurl + "announce/" + _pkey;
	          		return $http.put(url,_dataparam);
	        	},
	        	getChannelList:function(_pkey,_dataparam){
	        		var url = Constants.baseurl + "announce/" + _pkey + "/channellist";
	          		return $http.post(url,_dataparam);
	        	}
	    	};
	    }
	]);
};