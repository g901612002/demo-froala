module.exports = function(ngModule) {
  ngModule.directive('voiceplay', [
  "$log",
  "ngAudio",
  "$rootScope",
  function($log,ngAudio,$rootScope) {

      var ctrl = function($scope){
        var self = this;

        self.init = function(){
          $scope.showplay = false;
          $scope.playing = false;
        };

        self.togglePlay = function(){

          $scope.playing = ($scope.playing) ? false : true;

          if($rootScope.audiodata.audio){
            $rootScope.audiodata.audio.stop();
            $scope.showplay = false;
          }else{
            $scope.showplay = false;
          }

          if($rootScope.audiodata.pkey !== $scope.voicepkey){
            $rootScope.audiodata.audio = ngAudio.load($scope.voiceurl);
            $rootScope.audiodata.audio.play();
            $rootScope.audiodata.pkey = $scope.voicepkey;
          }else if($rootScope.audiodata.audio && $scope.playing){
            $rootScope.audiodata.audio = ngAudio.load($scope.voiceurl);
            $rootScope.audiodata.audio.play();
            $scope.showplay = true;
          }

        };

        $rootScope.$watch("audiodata.pkey",function(newVal){
          if(newVal === $scope.voicepkey){
            $scope.showplay = true;
          }else{
            $scope.showplay = false;
          }
        });

        $rootScope.$watch("audiodata.audio.progress",function(newVal){
          var currentProgress = newVal;
          if(currentProgress === 1){
            $scope.showplay = false;
          }
        });

      }; //End ctrl

      return {
        restrict: 'AEC',
        template: require("./voice-play.html"),
        controllerAs: 'ctrl',
        transclude:true,
        scope:{
          voiceurl:"=",
          voicepkey:"="
        },
        link: function($scope, element, attributes,controller) {
        },
        controller:ctrl
      };
  }]);
};
