module.exports = function(ngModule) {
    ngModule.controller('MessageVideoModalCtrl', [
        "$log",
        "$filter",
        "$modalInstance",
        "type",
        "item",
        "Util",
        function($log,$filter,$modalInstance,type,item,Util) {

            var self = this;

            self.init = function(){
                self.item = angular.copy(item);
                if(item.islink === 'N'){
                    self.type = "video";
                }
            };

            self.cancel = function() {
                $modalInstance.dismiss('cancel');
            };
        }
    ]);
};