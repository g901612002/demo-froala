module.exports = function(ngModule) {
    ngModule.controller('MessageVoiceModalCtrl', [
        "$log",
        "$filter",
        "$rootScope",
        "$modalInstance",
        "item",
        "Util",
        function($log,$filter,$rootScope,$modalInstance,item,Util) {

            var self = this;

            self.init = function(){
                self.item = angular.copy(item);
                $log.debug("self.item",self.item);
            };

            self.cancel = function() {
                // 清除聲音
                $rootScope.clearAudiodata();
                $modalInstance.dismiss('cancel');
            };
        }
    ]);
};