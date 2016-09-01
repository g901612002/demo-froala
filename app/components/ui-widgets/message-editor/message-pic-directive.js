module.exports = function(ngModule) {
    ngModule.directive('messagePic', [
        "$log",
        "$modal",
        "Util",
        "Constants",
        function($log, $modal, Util, Constants) {

            var link = function($scope, $element, attrs, ngModelCtrl) {
                $log.debug("$scope.picUrl", $scope.picUrl);

                // 判斷有無http
                if ($scope.picUrl.indexOf(Constants.url) < 0) {
                    $scope.picUrl = Constants.url + $scope.picUrl;
                }

                $scope.modalOpen = function(_picUrl) {

                    var modalOption, modalInstance;
                    modalOption = {
                        controller: "MessagePicModalCtrl",
                        controllerAs: 'ctrl',
                        template: require("./message-pic-modal.html"),
                        windowClass: "layout-modal",
                        resolve: {
                            picUrl: function() {
                                return _picUrl;
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
                template: require("./message-pic.html"),
                transclude: true,
                controllerAs: 'ctrl',
                scope: {
                    picUrl: '='
                },
                link: link
            };
        }
    ]);
};
