module.exports = function(ngModule) {

	ngModule.config(['$stateProvider','$urlRouterProvider',function($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise("main");
		$stateProvider
		  .state("main", {
		    url: "/main",
		    templateUrl: "main/main.html",
		    data: {css: ['app.css','vendor.css']}
		  });
	}]);

};