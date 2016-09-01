module.exports = function(ngModule) {
  	ngModule.factory('AccountService',[
  		'$resource',
  		'Constants',
  		function($resource,Constants){
  		return $resource(Constants.baseurl+'account/:act/:id', { id: '@id',act:"@act" }, {
	    	query: {
	      		method: 'POST',
	      		params:{act:"list"}
	    	},
	    	add: {
	    		method: 'POST',
	      		params:{}
	    	},
	    	update: {
	    		method: 'PUT',
	      		params:{id:"@id"}
	    	},
	    	get:{
	    		method:'GET',
	    		params:{id:"@id"}
	    	}
	  	});
  	}]);
};