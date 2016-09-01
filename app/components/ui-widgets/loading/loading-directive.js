module.exports = function(ngModule) {
    ngModule.directive('loading', ["$log", function($log) {
        return {
            restrict: 'E',
            replace: true,
            template: '<div class="loading"><img src="images/loading.gif" width="60" height="60" /></div>',
            link: function(scope, element, attr) {
                scope.$watch('loading', function(val) {
                    if (val)
                        $(element).show();
                    else
                        $(element).hide();
                });
            }
        };
    }]);
};
