module.exports = function(ngModule) {
  	ngModule.factory('MediaGroupService',[
  		'$http',
  		'Constants',
  		function($http,Constants){
	    	return {
	        	getMediaPicGroupList:function(_channelpkey){
	        		var dataParam = {
  						"channelpkey": _channelpkey,
    					"type": "pic"
	        		};
	        		var url = Constants.baseurl + "mediagroup/list";
	          		return $http.post(url,dataParam);
	        	},
	        	addMediaPicGroup:function(_channelpkey,_groupname){
	        		var dataParam = {
  						"channelpkey": _channelpkey,
    					"type": "pic",
    					"name": _groupname
	        		};
	        		var url = Constants.baseurl + "mediagroup";
	          		return $http.post(url,dataParam);
	        	},
	        	updatePicGroup:function(_grouppkey,_dataParam){
	        		var url = Constants.baseurl + "mediagroup/"+_grouppkey;
	          		return $http.put(url,_dataParam);
	        	},
	        	deletePicGroup:function(_grouppkey){
	        		var url = Constants.baseurl + "mediagroup/"+_grouppkey;
	          		var dataParam = {
    					"type": "pic"
	        		};
	        		return $http({
	        			method:"DELETE",
	        			url:url,
	        			data:dataParam
	        		});
	        	}
	    	};
	    }
	]);
};