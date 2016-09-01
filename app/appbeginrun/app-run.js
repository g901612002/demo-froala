module.exports = function(ngModule) {

  ngModule.run([
    '$location',
    '$localStorage',
    '$log',
    '$rootScope',
    '$state',
    '$stateParams',
    'Constants',
    'Util',
    function($location,$localStorage,$log,$rootScope, $state, $stateParams,Constants,Util){
      $rootScope.$on('$stateChangeStart', function(event, nextState, nextStateParams) {
        $rootScope.clearAudiodata();
        $rootScope.nextState = nextState;
        $rootScope.nextStateParams = nextStateParams;
      });

      $rootScope.clearAudiodata = function(){
        if($rootScope.audiodata && $rootScope.audiodata.audio){
          $rootScope.audiodata.audio.stop();
        }
        $rootScope.audiodata = {
          "audio":null,
          "pkey":""
        };
      };

      $rootScope.Constants = Constants;
      $rootScope.$state = $state;
      $rootScope.Util = Util;
      $rootScope.clearAudiodata();

    }
  ]);

};