module.exports = function(ngModule) {
  
	ngModule.config(['$logProvider',function ($logProvider) {
    	$logProvider.debugEnabled(true);
  	}]); 

};