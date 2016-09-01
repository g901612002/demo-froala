module.exports = function(ngModule) {
  	ngModule.factory('CategoryService',[
  		'$http',
  		'Constants',
  		function($http,Constants){
	    	return {
	        	getList:function(){
	        		var url = Constants.baseurl + "category/list";
	          		return $http.post(url);
	        	},
	        	addCategory:function(_dataParam){
	        		var url = Constants.baseurl + "category";
	          		return $http.post(url,_dataParam);
	        	},
	        	updateCategory:function(_categorypkey,_dataParam){
	        		var url = Constants.baseurl + "category/" + _categorypkey;
	          		return $http.put(url,_dataParam);
	        	},
	        	deleteCategory:function(_categorypkey){
	        		var url = Constants.baseurl + "category/" + _categorypkey;
	          		return $http.delete(url);
	        	},
	        	saveCategoryOrder:function(_dataParam){
	        		var url = Constants.baseurl + "category/order";
	        		return $http.post(url,_dataParam);
	        	},
	        	getChannelList:function(_dataParam){
	        		var url = Constants.baseurl + "category/channellist";
	        		return $http.post(url,_dataParam);
	        	}
	    	};
	    }
	]);
};