module.exports = function(ngModule) {
  	ngModule.factory('FansInfoService',[
  		'$http',
  		'Constants',
  		"AUTHCODE",
  		function($http,Constants,AUTHCODE){
  			var config = {
    			"headers": {
    				"rootauthority": AUTHCODE.CAROOT
    			}
			};
	    	return {
	        	getFansInfoCount:function(_iscaroot){
	        		var iscaroot = _iscaroot || false;
	        		var url = Constants.baseurl + "channelfansinfo/count";
	          		if(iscaroot){
	          			return $http.get(url,config);
	          		}else{
	          			return $http.get(url);
	          		}
	        	},
	    		getFansInfo:function(dataparam,_iscaroot) {
	    			var iscaroot = _iscaroot || false;
	    			var url = Constants.baseurl + "channelfansinfo/list";
	          		if(iscaroot){
	          			return $http.post(url,dataparam,config);
	          		}else{
	          			return $http.post(url,dataparam);
	          		}
	          	},
	          	getAppOsInfo:function(dataparam){
					var url = Constants.baseurl + "channelfansinfo/appos";
	          		return $http.post(url,dataparam);
	          	},
	          	getPushInfo:function(dataparam){
					var url = Constants.baseurl + "channelfansinfo/push";
	          		return $http.post(url,dataparam);
	          	},
	          	getUserGroupList:function(dataparam){
					var url = Constants.baseurl + "channelfansinfo/usergrouplist";
	          		return $http.post(url,dataparam);
	          	},
	          	setBlackList:function(dataparam){
	          		var url = Constants.baseurl + "channelfansinfo/setblacklist";
	          		return $http.post(url,dataparam);
	          	},
	          	setUserGroup:function(dataparam){
	          		var url = Constants.baseurl + "channelfansinfo/setusergroup";
	          		return $http.post(url,dataparam);
	          	},
	          	setUserGroupDate:function(dataparam){
	          		var url = Constants.baseurl + "channelfansinfo/setusergroupdate";
	          		return $http.post(url,dataparam);
	          	},
	          	removeFromUserGroup:function(dataparam){
	          		var url = Constants.baseurl + "channelfansinfo/deleteusergroup";
	          		return $http.post(url,dataparam);
	          	}
	    	};
	    }
	]);
};