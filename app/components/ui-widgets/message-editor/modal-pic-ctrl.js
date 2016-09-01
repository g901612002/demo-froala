module.exports = function(ngModule) {

    ngModule.controller('ModalPicCtrl', [
        "$scope",
        "$modalInstance",
        "$log",
        "toastr",
        "PromiseFactory",
        "MediaGroupService",
        "ImageService",
        "AUTHCODE",
        "Constants",
        "channelpkey",
        function($scope,$modalInstance,$log,toastr,PromiseFactory,MediaGroupService,ImageService,AUTHCODE,Constants,channelpkey){
            var self = this;

            var asyncGetGroupList = function(){
                var dfd = PromiseFactory.defer();
                AUTHCODE.CURRENT = AUTHCODE.CAROOT;
                MediaGroupService
                    .getMediaPicGroupList(self.channelpkey)
                    .success(function(res){
                        if (res.returncode == Constants.returncode.success) {
                            self.grouplist = res.list;
                            dfd.resolve();
                        }else{
                            self.grouplist = [];
                            dfd.reject(res);
                        }
                    })
                    .error(function(err){
                        dfd.reject(err);
                    });
                return dfd.promise;
            };

            var asyncGetPicList = function(_selectgroup){
                var dfd = PromiseFactory.defer();
                var dataParam = {
                    "channelpkey": self.channelpkey,
                    "grouppkey": (_selectgroup.pkey) ? _selectgroup.pkey :"0",
                    "startpoint":self.startpoint,
                    "pagesize":self.pagesize
                };
                ImageService
                    .getPicList(dataParam)
                    .success(function(res){
                        var issuccess = (res.returncode === Constants.returncode.success);
                        var isempty = (res.returncode === Constants.returncode.emptyresult);
                        self.piclist = [];
                        self.totalcount=0;
                        if (issuccess || isempty) {
                            if(issuccess){
                                self.piclist = res.list;
                                self.totalcount = res.totalcount;
                            }
                            asyncGetGroupList();
                            dfd.resolve();
                        }else{
                            dfd.reject(res);
                        }
                    })
                    .error(function(err){
                        dfd.reject(err);
                    });
                return dfd.promise;
            };

            $scope.$on("finishpicupload",function(){
                toastr.success("圖片上傳成功");
                asyncGetPicList(self.selectgroup)
                    .success(function(res){
                        var firstpic = _.first(self.piclist);
                        self.doSelectPic(firstpic);
                    });
            });

            self.init = function(){
                self.channelpkey = channelpkey;
                self.grouplist = [];
                self.selectpiccount = 0;
                self.selectpiclimit = 1;
                self.selectpic = {};

                self.startpoint = 1;
                self.pagesize = 8;
                self.oldPage = 1;
                self.currentPage = 1;
                self.totalcount = 0;
                self.maxPagination = 10;

                asyncGetGroupList()
                    .success(function(){
                        self.selectgroup =  _.first(self.grouplist);
                        asyncGetPicList(self.selectgroup);
                    });
            };

            self.pageChanged = function() {
                self.startpoint = self.startpoint + self.pagesize * (self.currentPage - self.oldPage);
                asyncGetPicList(self.selectgroup)
                    .success(function(res){
                        self.oldPage = self.currentPage;
                    });
            };

            self.doSelectPic = function(_pic){
                _pic.selected = !_pic.selected;
                self.piclist.map(function(obj){
                    var rObj = obj;
                    if(_pic.pkey !== obj.pkey){
                        rObj.selected = false;
                    }
                    return rObj;
                });
                self.selectpiccount = (_pic.selected) ? 1 : 0;
                self.selectpic = angular.copy(_pic);
            };

            self.doSelectGroup = function(_group){
                self.selectgroup = _group;
                self.startpoint = 1;
                self.oldPage = 1;
                self.currentpage = 1;
                asyncGetPicList(self.selectgroup);
            };

            self.isSelected = function(_group) {
                var isSelected = false;
                if(self.selectgroup){
                     isSelected = (self.selectgroup.pkey === _group.pkey) ? true :false;
                }
                return isSelected;
            };

            self.ok = function() {
                $modalInstance.close(self.selectpic);
            };

            self.cancel = function() {
                $modalInstance.dismiss('cancel');
            };
        }
    ]);
};