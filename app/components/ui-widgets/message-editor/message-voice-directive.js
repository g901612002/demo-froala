module.exports = function(ngModule) {
    ngModule.directive('messageVoice', [
        "$log",
        "$modal",
        "Util",
        function($log, $modal, Util) {

            var link = function($scope, $element, attrs, ngModelCtrl) {
                $scope.$watch("voiceJson", function(newVal, oldVal) {
                    var item;
                    var messageShow = $scope.messageShow || 'false';
                    var voicePkey = $scope.voicePkey || '';
                    var contentType = $scope.contentType || 'string';
                    if (contentType === 'string') {
                        item = JSON.parse($scope.voiceJson);
                    } else {
                        item = $scope.voiceJson;
                    }
                    $scope.messageShow = messageShow;
                    $scope.voicePkey = voicePkey;
                    $scope.item = angular.copy(item);
                    $scope.item.voice = Util.getAssetUrl($scope.item.voice);
                    $scope.item.length = Util.secChangeTimeFormat($scope.item.length);
                });

                $scope.modalOpen = function(pkey, _item) {

                    var modalOption, modalInstance;
                    modalOption = {
                        controller: "MessageVoiceModalCtrl",
                        controllerAs: 'ctrl',
                        template: require("./message-voice-modal.html"),
                        windowClass: "layout-modal",
                        resolve: {
                            pkey: function() {
                                return pkey;
                            },
                            item: function() {
                                return _item;
                            }
                        }
                    };
                    $scope.$emit("clearMessageTimeout");
                    modalInstance = $modal.open(modalOption);
                    
                    modalInstance.result.then(function() {
                        $scope.$emit("setMessageTimeout");
                    }, function() {
                        $scope.$emit("setMessageTimeout");
                    });
                };
            };

            return {
                restrict: 'AE',
                template: require("./message-voice.html"),
                transclude: true,
                controllerAs: 'ctrl',
                scope: {
                    voiceJson: '=',
                    contentType: '@',
                    messageShow: '@',
                    voicePkey: '@'
                },
                link: link
            };
        }
    ]);
};
