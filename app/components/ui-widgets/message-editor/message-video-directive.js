module.exports = function(ngModule) {
    ngModule.directive('messageVideo', [
        "$log",
        "$modal",
        "Util",
        "Constants",
        function($log, $modal, Util, Constants) {

            var link = function($scope, $element, attrs, ngModelCtrl) {

                $scope.$watch("videoJson", function(newVal, oldVal) {
                    var item;
                    var messageShow = $scope.messageShow || 'false';
                    var contentType = $scope.contentType || 'string';
                    if (contentType === 'string') {
                        item = JSON.parse($scope.videoJson);
                    } else {
                        item = $scope.videoJson;
                    }
                    $scope.messageShow = messageShow;
                    $scope.item = angular.copy(item);
                    $log.debug("video data", $scope.item);
                    if ($scope.item.islink === 'N') {
                        // 判斷有無http
                        if ($scope.item.video.indexOf(Constants.url) < 0) {
                            $scope.item.video = Constants.url + $scope.item.video;
                        }
                        if ($scope.item.frontCover.indexOf(Constants.url) < 0) {
                            $scope.item.trustFrontCover = Constants.url + $scope.item.frontCover;
                        }else{
                            $scope.item.trustFrontCover = $scope.item.frontCover;
                        }
                    } else {
                        $scope.item.trustFrontCover = Util.trustAsHtml($scope.item.frontCover);
                    }
                });

                $scope.modalOpen = function(type, _item) {

                    var modalOption, modalInstance;
                    modalOption = {
                        controller: "MessageVideoModalCtrl",
                        controllerAs: 'ctrl',
                        template: require("./message-video-modal.html"),
                        windowClass: "layout-modal",
                        resolve: {
                            item: function() {
                                return _item;
                            },
                            type: function() {
                                return type;
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
                template: require("./message-video.html"),
                transclude: true,
                controllerAs: 'ctrl',
                scope: {
                    videoJson: '=',
                    contentType: '@',
                    messageShow: '@'
                },
                link: link
            };
        }
    ]);
};
