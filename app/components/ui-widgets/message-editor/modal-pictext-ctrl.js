module.exports = function(ngModule) {

    ngModule.controller('ModalPicTextCtrl', [
        "$scope",
        "$modalInstance",
        "$log",
        "$localStorage",
        "AUTHCODE",
        "Constants",
        "channelpkey",
        "PictextService",
        "Util",
        function($scope,$modalInstance,$log,$localStorage,AUTHCODE,Constants,channelpkey,PictextService,Util){
            var self = this;

            self.init = function(){
                self.selectpictext = {};
                self.channelpkey = channelpkey;
                self.selectpiccount = 0;
                self.selectpiclimit = 1;
                self.oldPage = 1;
                self.currentPage = 1;
                self.startpoint = 1;
                self.pagesize = 6;
                self.searchCondition = "";
                self.searchResult = false;
                self.errorMessage = "";
                self.loadData();
            };

            self.pageChanged = function(){
                self.startpoint = self.startpoint+5*(self.currentPage-self.oldPage);
                self.loadData();
            };

            self.loadData = function() {
                self.channelpkey = Util.getChannelPkey();
                AUTHCODE.CURRENT = AUTHCODE.CA_MEDIA_001;
                PictextService
                  .getList(self.channelpkey,{search:self.searchCondition,startpoint:self.startpoint,pagesize:self.pagesize})
                  .success(function(res){
                    if (res.returncode == Constants.returncode.success) {
                        self.item = res.list;
                        self.errorMessage = "";
                        self.totalcount = res.totalcount;
                        self.oldPage = self.currentPage;
                    }else if(res.returncode == Constants.returncode.emptyresult){
                        self.item = "";
                        self.totalcount = 0;
                        self.errorMessage = "";
                        self.searchResult = true;
                    }else{
                        self.item = "";
                        self.totalcount = 0;
                        self.errorMessage = res.returnmsg;
                    }
                  });
            };

            self.doSearch = function() {
                AUTHCODE.CURRENT = AUTHCODE.CA_MEDIA_001;
                self.startpoint = 1;
                self.loadData();
            };

            self.keyAction = function() {
                if (self.searchCondition === "" || self.searchCondition === undefined) {
                    self.showClearBtn = false;
                } else {
                    self.showClearBtn = true;
                }
            };

          self.doSelectPicText = function(_pictext){
                self.item.map(function(obj){
                    var rObj = obj;
                    rObj.selected = false;
                    return rObj;
                });
                _pictext.selected = !_pictext.selected;
                self.selectpiccount = (_pictext.selected) ? 1 : 0;
                self.selectpictext = angular.copy(_pictext);
            };

            self.clear = function() {
                self.searchCondition = "";
                self.showClearBtn = false;
            };

            self.ok = function(){
                $modalInstance.close(self.selectpictext);
            };

            self.cancel = function() {
                $modalInstance.dismiss('cancel');
            };
        }
    ]);
};