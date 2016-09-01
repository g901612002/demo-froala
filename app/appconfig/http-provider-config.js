module.exports = function(ngModule) {
  
  ngModule.config(['$httpProvider', function($httpProvider) {
    //Enable cross domain calls
    $httpProvider.defaults.useXDomain = true;

    //Remove the header containing XMLHttpRequest used to identify ajax call 
    //that would prevent CORS from working
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

    //Ref:http://samurails.com/tutorial/cors-with-angular-js-and-sinatra/
    //$httpProvider.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
  
    $httpProvider.interceptors.push('RequestInterceptor');

  }]);

};