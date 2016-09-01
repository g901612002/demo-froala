module.exports = function(ngModule) {
  ngModule.directive('switch', function(){
    return {
        restrict: 'AE',
        template:require("./switch.html"),
        scope:{
            ngModel: '=',
            ngDisabled:'='
        },
        link:{
            post:function(scope, element, attrs) {
                scope.trueValue = true;
                scope.falseValue = false;
                // If defined set true value
                if(attrs.ngTrueValue !== undefined) {
                    scope.trueValue = attrs.ngTrueValue;
                }
                // If defined set false value
                if(attrs.ngFalseValue !== undefined) {
                    scope.falseValue = attrs.ngFalseValue;
                }

                scope.onHandleClick = function() {
                    var disabled = (scope.ngDisabled) ? true : false;
                    if(disabled === false){
                        if(scope.ngModel === scope.trueValue){
                            scope.ngModel = scope.falseValue;
                        }else {
                            scope.ngModel = scope.trueValue;
                        }
                    }
                };
            }
        }
    };
  });
};