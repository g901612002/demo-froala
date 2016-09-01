module.exports = function(ngModule) {
  	ngModule.factory('ChannelService',[
  		'$http',
  		'Constants',
  		"AUTHCODE",
  		function($http,Constants,AUTHCODE){
	    	return {
	    		get:function(_pkey,_iscaroot){
		  			var config = {
		    			"headers": {
		    				"rootauthority": AUTHCODE.CAROOT
		    			}
					};
	    			var iscaroot = _iscaroot || false;
	    			var url = Constants.baseurl + "channel/" + _pkey;
	    			if(iscaroot){
	    				return $http.get(url,config);
	    			}else{
	    				return $http.get(url);
	    			}
	    		},
	        	query:function(_dataParam){
	          		return $http.post(Constants.baseurl + "channel/list",_dataParam);
	        	},
	    		add:function(_dataParam) {
	    			var url = Constants.baseurl + "channel";
	          		return $http.post(url,_dataParam);
	    		},
	    		update:function(_pkey,_dataParam){
	    			var url = Constants.baseurl + "channel/" + _pkey;
	    			return $http.put(url,_dataParam);
	    		},
	    		getapplist:function(_pkey){
	    			var url = Constants.baseurl +
	    						"channel/" +
	    						_pkey +
	    						"/applist";
	    			return $http.get(url);
	    		},
	    		setapplist:function(_pkey,_appidList){
	    			var url = Constants.baseurl +
	    						"channel/" +
	    						_pkey +
	    						"/applist";
	    			return $http.put(url,_appidList);
	    		},
	    		setfirstmsg:function(_pkey,_dataParam){
	    			var url = Constants.baseurl +
	    						"channel/" +
	    						_pkey +
	    						"/firstmsg";
	    			return $http.put(url,_dataParam);
	    		},
	    		setdefaultmsg:function(_pkey,_dataParam){
	    			var url = Constants.baseurl +
	    						"channel/" +
	    						_pkey +
	    						"/defaultmsg";
	    			return $http.put(url,_dataParam);
	    		},
	    		getKeywordlist:function(_pkey){
	    			var url = Constants.baseurl +
	    						"channel/" +
	    						_pkey +
	    						"/keyword";
	    			return $http.get(url);
	    		},
	    		setKeyword:function(_pkey,_dataParam){
	    			var url = Constants.baseurl +
	    						"channel/" +
	    						_pkey +
	    						"/keyword";
	    			return $http.put(url,_dataParam);
	    		},
	    		deleteKeyword:function(_pkey,_rulepkey){
	    			var url = Constants.baseurl +
	    						"channel/" +
	    						_pkey +
	    						"/keyword/" +
	    						_rulepkey;
	    			return $http.delete(url,_rulepkey);
	    		},
	    		addKeyword:function(_pkey,_dataParam){
	    			var url = Constants.baseurl +
	    						"channel/" +
	    						_pkey +
	    						"/keyword";
	    			return $http.post(url,_dataParam);
	    		},
	    		getPromotionData:function(_pkey){
	    			var url = Constants.baseurl +
	    						"channel/" +
	    						_pkey +
	    						"/promotion";
	    			return $http.get(url);
	    		},
	    		setPromotionData:function(_pkey,_dataParam){
	    			var url = Constants.baseurl +
	    						"channel/" +
	    						_pkey +
	    						"/promotion";
	    			return $http.post(url,_dataParam);
	    		}
	    	};
	    }
	]);
};