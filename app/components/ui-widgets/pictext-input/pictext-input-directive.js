module.exports = function(ngModule) {
    ngModule.directive('pictextInput', [
    "$log",
    "$modal",
    "Util",
    function($log){
        var ctrl = function($scope, $modal,Util){
            $log.debug($scope);
            var self = this;

            self.init = function(){
                var nowLength = 0;
                self.total = $scope.textMaxLength;
                self.myName = $scope.myName;
                self.isRequired = $scope.isRequired;

                $log.debug("textMaxLength",$scope.textMaxLength);
                $log.debug("ngModel",$scope.ngModel);
            };

            $scope.$watch("ngModel", function(newValue,oldValue){
                var maxLength = $scope.textMaxLength;
                var nowLength;
                if(newValue && newValue.length>0){
                    nowLength = newValue.length;
                    if (nowLength > maxLength) {
                        $scope.ngModel = oldValue;
                    }else{
                        self.modelLength = nowLength;
                    }
                }else{
                    self.modelLength = 0;
                }
            });
        };
        var link = function($scope,$element,attrs,ngModelCtrl) {
        };
        return {
            restrict: 'AE',
            template:require("./pictext-input.html"),
            transclude:true,
            controllerAs:'ctrl',
            scope:{
                myName:'@',
                isRequired:'@',
                textMaxLength:'@',
                ngModel:'='                
            },
            controller:ctrl,
            link:link
        };
    }]);
};