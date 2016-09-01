module.exports = function(ngModule) {
  	ngModule.factory('VoiceService',[
  		'$http',
  		'Constants',
  		function($http,Constants){
	    	return {
	        	getList:function(_channelpkey,_dataParam){
	        		var url = Constants.baseurl + "voice/"+ _channelpkey +"/list";
	          		return $http.post(url,_dataParam);
	        	},
	        	deleteList:function(_voicepkey){
	        		var url = Constants.baseurl + "voice/" + _voicepkey;
	          		return $http.delete(url);
	        	},
	        	modify:function(_masterpkey,_dataParam){
	        		var url = Constants.baseurl + "voice/" + _masterpkey;
	          		return $http.put(url,_dataParam);
	        	},
	        	add:function(_channelpkey,_dataParam){
	        		var url = Constants.baseurl + "voice/" + _channelpkey;
	          		return $http.post(url,_dataParam);
	        	},
	        	saveMaterial:function(_channelpkey,_dataParam){
	        		var url = Constants.baseurl + "voice/" + _channelpkey +"/materials";
	          		return $http.post(url,_dataParam);
	        	}
	    	};
	    }
	]);
};