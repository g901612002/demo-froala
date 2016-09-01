module.exports = function(ngModule) {
  	ngModule.factory('PushService',[
  		'$http',
  		'Constants',
  		function($http,Constants){
	    	return {
	    		getCount:function(_channelpkey,_accountpkey){
	        		var url = Constants.baseurl + "pushnotify/"+_channelpkey+"/accountpkey/"+_accountpkey;
	          		return $http.get(url);
	        	},
	        	getReviewmeList:function(_dataParam){
	        		var url = Constants.baseurl + "pushnotify/reviewme";
	          		return $http.post(url,_dataParam);
	        	},
	        	getReviewotherList:function(_dataParam){
	        		var url = Constants.baseurl + "pushnotify/reviewother";
	          		return $http.post(url,_dataParam);
	        	},
	        	getBookingList:function(_dataParam){
	        		var url = Constants.baseurl + "pushnotify/booking";
	          		return $http.post(url,_dataParam);
	        	},
	        	getList:function(_dataParam){
	        		var url = Constants.baseurl + "pushnotify/list";
	          		return $http.post(url,_dataParam);
	        	},
	        	addPush:function(_dataParam,_channelpkey){
	        		_dataParam.channelpkey = _channelpkey;
	        		var url = Constants.baseurl + "pushnotify";
	          		return $http.post(url,_dataParam);
	        	},
	        	deleteMePush:function(_pushnotifypkey){
	        		var url = Constants.baseurl + "pushnotify/"+_pushnotifypkey+"/deleteme";
	          		return $http.delete(url);
	        	},
	        	deleteOtherPush:function(_pushnotifypkey){
	        		var url = Constants.baseurl + "pushnotify/"+_pushnotifypkey+"/deleteother";
	          		return $http.delete(url);
	        	},
	        	agreePush:function(_pushnotifypkey){
	        		var url = Constants.baseurl + "pushnotify/"+_pushnotifypkey+"/review/y";
	          		return $http.put(url);
	        	},
	        	disagreePush:function(_pushnotifypkey){
	        		var url = Constants.baseurl + "pushnotify/"+_pushnotifypkey+"/review/n";
	          		return $http.put(url);
	        	},
	        	userDetail:function(_pushnotifyPKey,_dataParam){
	        		var url = Constants.baseurl + "pushnotify/" + _pushnotifyPKey;
	          		return $http.post(url,_dataParam);
	        	}
	    	};
	    }
	]);
};