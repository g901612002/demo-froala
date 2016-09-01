module.exports = function(ngModule) {
    ngModule.directive('enterSubmit', ["$log", function($log) {
        return {
            restrict: 'A',
            link: function($scope, elem, attrs) {
                elem.bind('keydown', function(event) {
                    var code = event.keyCode || event.which;
                    if (code === 13) {
                        if (!event.shiftKey) {
                            event.preventDefault();
                            $scope.$apply(attrs.enterSubmit);
                        }
                    }
                });
                elem.bind('keyup', function(event) {
                    $log.debug(elem.context.value);
                    $log.debug("w");
                    $scope.$emit("showLength",{length:elem.context.value.length});
                });
            }
        };
    }]);
};
