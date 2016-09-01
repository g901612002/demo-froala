module.exports = function(ngModule) {
  	ngModule.factory('UsergroupService',[
  		'$http',
  		'Constants',
  		function($http,Constants){
	    	return {
	        	getList:function(_channelpkey){
	        		var dataParam = {
  						"channelpkey": _channelpkey
	        		};
	        		var url = Constants.baseurl + "usergroup/list";
	          		return $http.post(url,dataParam);
	        	},
	        	addGroup:function(_channelpkey,_groupname){
	        		var dataParam = {
  						"channelpkey": _channelpkey,
  						"name":_groupname
	        		};
	        		var url = Constants.baseurl + "usergroup";
	          		return $http.post(url,dataParam);
	        	},
	        	updateGroup:function(_grouppkey,_groupname){
	        		var dataParam = {
  						"name":_groupname
	        		};
	        		var url = Constants.baseurl + "usergroup/" + _grouppkey;
	          		return $http.put(url,dataParam);
	        	},
	        	deleteGroup:function(_grouppkey){
	        		var url = Constants.baseurl + "usergroup/" + _grouppkey;
	          		return $http.delete(url);
	        	}
	    	};
	    }
	]);
};