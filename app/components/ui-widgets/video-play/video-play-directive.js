module.exports = function(ngModule) {
    ngModule.directive('videoplay', [
        "$log",
        "$sce",
        "Constants",
        "$timeout",
        function($log, $sce,Constants, $timeout) {

            var ctrl = function($scope) {
                var self = this;
                self.state = null;
                self.API = null;
                self.currentVideo = 0;

                self.config = {
                    width: "100%",
                    height: "320px",
                    preload: "none",
                    autoHide: false,
                    autoHideTime: 3000,
                    autoPlay: false,
                    sources: "",
                    plugins: {
                        poster: "",//預覽圖
                        controls: {
                            autoHide: true,
                            autoHideTime: 5000
                        }
                    }
                };
                var video = [{
                    src: "",
                    type: ""
                }];

                self.init = function() {
                    self.sources = video;
                    self.typle = $scope.typle;
                    if (self.typle === 'video') {
                      self.sources[0].type = "video/mp4";
                    }else{
                      self.sources[0].type = "video/youtube";
                    }
                    self.sources[0].src = $sce.trustAsResourceUrl($scope.videourl);
                };

            }; //End ctrl

            return {
                restrict: 'AEC',
                template: require("./video-play.html"),
                controllerAs: 'ctrl',
                transclude: true,
                scope: {
                    img: "@",
                    videourl: "@",
                    typle: "@"
                },
                link: function($scope, element, attributes, controller) {},
                controller: ctrl
            };
        }
    ]);
};
