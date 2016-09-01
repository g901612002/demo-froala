module.exports = function(ngModule) {
  	ngModule.factory('ChannelAnnounceService',[
  		'$http',
  		'Constants',
  		function($http,Constants){
	    	return {
	        	getAnnounceList:function(_dataparam){
	        		var url = Constants.baseurl + "channelannounce/list";
	          		return $http.post(url,_dataparam);
	        	},
	        	getAnnounce:function(_pkey){
	        		var url = Constants.baseurl + "channelannounce/" + _pkey;
	        		return $http.get(url);
	        	},
	        	addAnnonuce:function(_dataparam){
					var url = Constants.baseurl + "channelannounce";
	          		return $http.post(url,_dataparam);
	        	},
	        	updateAnnounce:function(_pkey,_dataparam){
					var url = Constants.baseurl + "channelannounce/" + _pkey;
	          		return $http.put(url,_dataparam);
	        	}
	    	};
	    }
	]);
};