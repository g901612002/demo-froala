module.exports = function(ngModule) {
  	ngModule.factory('ApplyTestService',[
  		'$http',
  		'Constants',
  		function($http,Constants){
  			return {
  				getAppList:function(){
  					var url = Constants.baseurl + "trialchannel/applist";
	          		return $http.get(url);
  				},
  				addApplyTestChannel:function(_dataParam){
  					var url = Constants.baseurl + "trialchannel/trial";
	          		return $http.post(url,_dataParam); 
  				},
          getDevice:function(_channelpkey){
            var url = Constants.baseurl + "trialchannel/"+_channelpkey+"/device";
                return $http.get(url);
          },
          setDevice:function(_channelpkey,_dataParam){
            var url = Constants.baseurl + "trialchannel/"+_channelpkey+"/device";
                return $http.post(url,_dataParam); 
          }
  			};
  	}]);
};