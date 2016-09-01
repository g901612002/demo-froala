module.exports = function(ngModule) {
    ngModule.directive('messagePictext', [
        "$log",
        "Util",
        function($log, Util) {

            var itemArray = function(_array) {
                _array = _array || [];
                _array.map(function(_item, index) {
                    var thisObject = _item;
                    thisObject.review = Util.getAssetUrl(_item.review);
                    thisObject.imgpath = Util.getAssetUrl(_item.imgpath);
                    return thisObject;
                });
            };

            var link = function($scope, $element, attrs, ngModelCtrl) {
                $scope.$watch("pictextJson",function(newVal,oldVal){
                    var item;
                    var contentType = $scope.contentType || 'string';
                    if (contentType === 'string') {
                        item = JSON.parse($scope.pictextJson).pictextContentDatas;
                    } else {
                        item = $scope.pictextJson.pictextContentDatas;
                    }
                    itemArray(item);
                    $scope.item = item;
                });
            };

            return {
                restrict: 'AE',
                template: require("./message-pictext.html"),
                transclude: true,
                controllerAs: 'ctrl',
                scope: {
                    pictextJson: '=',
                    contentType: '@'
                },
                link: link
            };
        }
    ]);
};
