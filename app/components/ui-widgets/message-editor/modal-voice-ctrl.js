module.exports = function(ngModule) {

    ngModule.controller('ModalVoiceCtrl', [
        "$scope",
        "$rootScope",
        "$modalInstance",
        "$log",
        "AUTHCODE",
        "Constants",
        "Util",
        "VoiceService",
        function($scope,$rootScope,$modalInstance,$log,AUTHCODE,Constants,Util,VoiceService){
            var self = this;

            self.init = function(){
                self.oldPage = 1;
                self.currentPage = 1;
                self.startpoint = 1;
                self.pagesize = 5;
                self.message = "";
                self.loadData();
            };

            self.loadData = function() {
                self.channelpkey = Util.getChannelPkey();
                AUTHCODE.CURRENT = AUTHCODE.CAROOT;
                VoiceService
                    .getList(self.channelpkey, {
                        startpoint: self.startpoint,
                        pagesize: self.pagesize
                    })
                    .success(function(res) {
                        if (res.returncode == Constants.returncode.success) {
                            self.voicelist = res.list;
                            self.message = "";
                            self.totalcount = res.totalcount;
                            self.oldPage = self.currentPage;
                        } else if (res.returncode == Constants.returncode.emptyresult) {
                            self.voicelist = [];
                            self.totalcount = 0;
                            self.message = "尚未建立語音，可點擊右上角新建語音";
                        } else {
                            self.item = [];
                            self.totalcount = 0;
                            self.message = res.returnmsg;
                        }
                    });
            };

            self.pageChanged = function() {
                $rootScope.clearAudiodata();
                self.startpoint = self.startpoint + self.pagesize * (self.currentPage - self.oldPage);
                self.loadData();
            };

            self.doSelectVoice = function(_voice){
                _voice.selected = true;
                self.voicelist.map(function(obj){
                    var rObj = obj;
                    if(_voice.pkey !== obj.pkey){
                        rObj.selected = false;
                    }
                    return rObj;
                });
                self.selectvoicecount = (_voice.selected) ? 1 : 0;
                self.selectvoice = angular.copy(_voice);
            };

            self.ok = function(){
                $modalInstance.close(self.selectvoice);
            };

            self.cancel = function() {
                $modalInstance.dismiss('cancel');
            };
        }
    ]);
};