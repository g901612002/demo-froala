module.exports = function(ngModule) {
  ngModule.factory('AuthService',[
    '$rootScope',
    '$localStorage',
    '$http',
    'Constants',
    'AUTHCODE',
    function($rootScope,$localStorage,$http,Constants,AUTHCODE) { 
      AUTHCODE.CURRENT = AUTHCODE.EMPTY; 	
      return {
        getCaptcha:function(){
          return $http.post(Constants.baseurl +"captcha",{});
        },
    		doLogin:function(_loginData) {
          return $http.post(Constants.baseurl + "login",_loginData);
    		},
        doLogout:function() {
          return $http.post(Constants.baseurl + "logout",{});
        },
        modifyPassword:function(_pwdData){
          return $http.post(Constants.baseurl + "password",_pwdData);
        },
        hasAuthData:function(){
          var _hasAuthData = false;
          var emptyauthdata = ($localStorage.authdata) ? false : true;
          if(!emptyauthdata){
            _hasAuthData = true;
          }
          return _hasAuthData;
        },
        getTestInfo:function(_param){
          return $http.get(Constants.baseurl + "captchakey/" + _param);
        },
        checkAuth:function(_authcode){
          return $http.get(Constants.baseurl + "module/checkauth/" + _authcode);
        },
        getReviewAuth:function(_accountpkey){
          return $http.get(Constants.baseurl + "module/" + _accountpkey + "/reviewauth");
        },
        setReviewAuth:function(_accountpkey,_hasAuth){
          return $http.put(Constants.baseurl + "module/" + _accountpkey + "/reviewauth/" + _hasAuth);
        }
    	};
  }]);

};