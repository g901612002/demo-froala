module.exports = function(ngModule) {
  	ngModule.factory('SelfMenuService',[
  		'$http',
  		'Constants',
  		function($http,Constants){
	    	return {
	        	getMenus:function(_channelpkey){
	        		var url = Constants.baseurl + "appmenu/list";
	          		return $http.post(url,{channelpkey:_channelpkey});
	        	},
	        	addMenu:function(_dataParam){
	        		var url = Constants.baseurl + "appmenu";
	          		return $http.post(url,_dataParam);
	        	},
	        	updateMenu:function(_menupkey,_dataParam){
	        		var url = Constants.baseurl + "appmenu/" + _menupkey;
	          		return $http.put(url,_dataParam);
	        	},
	        	deleteMenu:function(_menupkey){
	        		var url = Constants.baseurl + "appmenu/" + _menupkey;
	          		return $http.delete(url);
	        	},
	        	saveMenuOrder:function(_dataParam){
	        		var url = Constants.baseurl + "appmenu/order";
	        		return $http.post(url,_dataParam);
	        	}
	    	};
	    }
	]);
};