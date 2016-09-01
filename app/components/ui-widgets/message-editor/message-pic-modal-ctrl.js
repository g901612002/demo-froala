module.exports = function(ngModule) {
    ngModule.controller('MessagePicModalCtrl', [
        "$log",
        "$filter",
        "$modalInstance",
        "picUrl",
        function($log,$filter,$modalInstance,picUrl) {

            var self = this;

            self.init = function(){
                self.picUrl = picUrl;
            };

            self.cancel = function() {
                $modalInstance.dismiss('cancel');
            };
        }
    ]);
};