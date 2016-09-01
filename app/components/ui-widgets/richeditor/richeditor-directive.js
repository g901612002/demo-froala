module.exports = function(ngModule) {

    ngModule.directive('richeditor', [
    "$log",
    "$modal",
    "Util",
    function($log,$modal,Util){
        var ctrl = function($scope){
            var self = this;
            self.init = function(){
                var buttonsOption =
                    [
                        "bold", "italic", "underline", "strikeThrough",
                        "color","|",
                        "paragraphFormat","align",'formatOL', 'formatUL', 'outdent', 'indent',"|",
                        "insertLink","insertImage","|",
                        "insertTable","undo","redo","fullscreen"
                    ];
                $scope.froalaOptions = {
                    zIndex:990,
                    toolbarButtons : buttonsOption,
                    linkAlwaysBlank:true
                };
            };

        };

        return {
            restrict: 'AEC',
            template:require("./richeditor.html"),
            transclude:true,
            controllerAs:'ctrl',
            scope:{
                channelpkey:"=",
                ngModel: '='
            },
            controller:ctrl
        };
    }]);
};