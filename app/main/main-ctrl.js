module.exports = function(ngModule) {

	ngModule.controller("MainCtrl",[
		"$rootScope",
		"$scope",
		"$log",
		"Constants",
		"AUTHCODE",
		function($rootScope,$scope,$log,Constants,AUTHCODE){

			var self = this;
			self.channel = {};

			self.init = function(){
			};

		}
	]);
};

