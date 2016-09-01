module.exports = function(ngModule) {

  ngModule.config(['toastrConfig', function(toastrConfig) {
	  angular.extend(toastrConfig, {
	    containerId: 'toast-container',
	    positionClass: 'toast-top-center',
	    target: 'body',
	    timeout:500,
	    maxOpened: 1,
	    autoDismiss:true
	  });
  }]);

};