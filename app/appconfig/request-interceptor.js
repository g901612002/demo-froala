module.exports = function(ngModule) {
  ngModule.factory('RequestInterceptor',[
    '$rootScope',
    '$log',
    '$localStorage',
    '$q',
    '$injector',
    'Constants',
    'AUTHCODE',
    function($rootScope,$log,$localStorage,$q,$injector,Constants,AUTHCODE) {
    	return {
        request:function(config){
          var emptyauthdata = ($localStorage.authdata) ? false : true;
          config.headers = config.headers || {};
          if(!emptyauthdata){
            config.headers.accesstoken = $localStorage.authdata.accesstoken;
          }
          if(_.startsWith(config.url,"http")){
            $log.debug("req url ==> ",config.url);
            $log.debug("req header ==> ",config.headers);
          }
          if(config.headers.rootauthority && config.headers.rootauthority.length >0 ){
              config.headers.authority = angular.copy(config.headers.rootauthority);
              delete config.headers.rootauthority;
          }else{
            if(AUTHCODE.CURRENT && AUTHCODE.CURRENT.length>0){
              config.headers.authority = AUTHCODE.CURRENT;
            }
          }

          return config;
        },
        response:function(response){

          var $state = $injector.get('$state');
          var emptyauthdata = ($localStorage.authdata) ? false : true;
          var isForwardLogin = ($rootScope.nextState.name === "login") ? true : false; 

          if(_.startsWith(response.config.url,"http")){
              $log.debug("res returncode ==> ",response.data.returncode);
              $log.debug("res returnmsg ==> ",response.data.returnmsg);
          }

          if(!isForwardLogin){
            if(response.data.returncode === Constants.returncode.accesstokenfail || response.data.returncode === Constants.returncode.accesstokenempty){
              $rootScope.$broadcast('unauthorized');
              return $q.reject(response);
            }
            if(response.data.returncode === Constants.returncode.channelinvalid){
              $rootScope.$broadcast('channelinvalid');
              return $q.reject(response);
            }
            if(response.data.returncode === Constants.returncode.accountinvalid){
              $rootScope.$broadcast('accountinvalid');
              return $q.reject(response);
            }
            if(response.data.returncode === Constants.returncode.apinoauthority){
              $rootScope.$broadcast('apinoauthority');
              return $q.reject(response);
            }
          }

          return response || $q.when(response);
        },
        responseError:function(rejection){
          $rootScope.$broadcast('disconnect');
          return $q.reject(rejection);
        }
    	};
  }]);

};