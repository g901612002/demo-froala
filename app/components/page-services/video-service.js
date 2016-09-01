module.exports = function(ngModule) {
  	ngModule.factory('VideoService',[
  		'$http',
  		'Constants',
  		function($http,Constants){
	    	return {
	        	getList:function(_channelpkey,_dataParam){
	        		var url = Constants.baseurl + "video/"+ _channelpkey +"/list";
	          		return $http.post(url,_dataParam);
	        	},
	        	deleteList:function(_voicepkey){
	        		var url = Constants.baseurl + "video/" + _voicepkey;
	          		return $http.delete(url);
	        	},
	        	modify:function(_masterpkey,_dataParam){
	        		var url = Constants.baseurl + "video/" + _masterpkey;
	          		return $http.put(url,_dataParam);
	        	},
	        	islink:function(){
	        		var url = Constants.baseurl + "video/isonlylink";
	          		return $http.get(url);
	        	},
	        	add:function(_channelpkey,_dataParam){
	        		var url = Constants.baseurl + "video/" + _channelpkey;
	          		return $http.post(url,_dataParam);
	        	},
	        	saveMaterial:function(_channelpkey,_dataParam){
	        		var url = Constants.baseurl + "video/" + _channelpkey +"/materials";
	          		return $http.post(url,_dataParam);
	        	}
	    	};
	    }
	]);
};