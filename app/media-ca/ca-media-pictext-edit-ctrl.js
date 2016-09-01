module.exports = function(ngModule) {
    ngModule.controller("CAMediaPicTextEditCtrl", [
        "$log",
        "$scope",
        "$state",
        "$stateParams",
        "$localStorage",
        "$modal",
        "toastr",
        "PictextService",
        "Constants",
        "AUTHCODE",
        "Util",
        function($log, $scope, $state, $stateParams, $localStorage, $modal, toastr, PictextService, Constants, AUTHCODE, Util) {
            var self = this;
            var strToast = "";
            var newList = {
                "pictextContentDatas": [{
                    "title": "標題",
                    "author": "",
                    "summary": "",
                    "imgpath":"",
                    "defaultImg": "images/pictextFirstPhoto.jpg",
                    "type": "web",
                    "content": "",
                    "showLink":false,
                    "link": ""
                }]
            };
            var allList = {};
            var addItem = {
                "title": "標題",
                "author": "",
                "summary": "",
                "imgpath":"",
                "defaultImg": "images/pictextOtherPhoto.jpg",
                "type": "web",
                "content": "",
                "showLink":false,
                "link": ""
            };

            $scope.$on("finishpicupload", function(event, data) {
                if (data && data.length > 0) {
                    $log.debug("imgpath", _.first(data).path);
                    self.editArea.imgpath = _.first(data).path;
                }
            });

            self.init = function() {
                self.now = 0;
                self.imgInputHide = true;
                self.loadData();
            };

            self.loadData = function() {
                $log.debug($stateParams);
                self.channelpkey = Util.getChannelPkey();
                if ($stateParams.type === "edit") {
                    self.masterpkey = $stateParams.masterpkey;
                    AUTHCODE.CURRENT = AUTHCODE.CA_MEDIA_001;
                    PictextService
                        .get(self.masterpkey)
                        .success(function(res) {
                            if (res.returncode == Constants.returncode.success) {
                                $log.debug(res);
                                allList = res;
                                self.item = allList.pictextContentDatas;
                                self.initState(self.item);
                                self.editArea = self.item[self.now];
                                self.stateTitle = "修改圖文消息";
                            } else {
                                strToast = res.returnmsg;
                                toastr.warning(strToast);
                            }
                        });  
                } else {
                    self.stateTitle = "新建圖文消息";
                    self.item = newList.pictextContentDatas;
                    self.editArea = self.item[self.now];
                }
            };
            self.editList = function(_index) {
                self.now = _index;
                // 顯示哪一個item並調整css位置
                self.showList();
            };
            self.deleteList = function(_index) {
                self.now = _index;
                self.item.splice(self.now, 1);
                // 顯示哪一個item並調整css位置
                self.showList();
            };
            self.addList = function() {
                if (self.item.length >= 8) {
                    strToast = "你最多只可以加入8條圖文消息！";
                    toastr.warning(strToast);
                } else {
                    self.item.push(angular.copy(addItem));
                    self.now = self.item.length - 1;
                    // 顯示哪一個item並調整css位置
                    self.showList();
                }
            };

            // 顯示哪一個item並調整css位置
            self.showList = function() {
                if (self.item.length === self.now) {
                    self.now = 0;
                    self.editAreaTOP = 0;
                } else {
                    if (self.now === 0) {
                        self.now = 0;
                        self.editAreaTOP = 0;
                    } else {
                        self.editAreaTOP = 160 + (self.now - 1) * 120;
                    }
                }
                self.editArea = self.item[self.now];
            };

            // 初始化
            self.initState = function(_list) {
                if (_list && _list.length > 0) {
                    _list.map(function(_item,index) {
                        var item = _item;
                        item.showLink = false;
                        if(index===0){
                            item.defaultImg = "images/pictextFirstPhoto.jpg";
                        }else{
                            item.defaultImg = "images/pictextOtherPhoto.jpg";
                        }
                        if(item.type==="html"){
                            item.editor = item.content;
                            if(item.link.length>0){
                                item.showLink = true;
                            }
                        }else{
                            item.urlLink = item.content;
                        }
                        return item;
                    });
                }
            };

            self.save = function(_type) {
                $log.debug("self.item",self.item);
                self.checkLink(self.item);
                self.checkFormat(self.item);
                var goTarget = _type || 'pictextList';
                AUTHCODE.CURRENT = AUTHCODE.CA_MEDIA_001;
                if ($stateParams.type === "edit") {        
                    PictextService
                        .modify(allList)
                        .success(function(res) {
                            if (res.returncode == Constants.returncode.success) {
                                $log.debug(res);
                                strToast = "儲存成功！";
                                toastr.info(strToast);
                                setTimeout(function(){ 
                                    self.goPage(goTarget,allList);
                                }, 3000);
                            } else {
                                strToast = res.returnmsg;
                                toastr.warning(strToast);
                            }
                        });
                } else {                             
                    PictextService
                        .add(self.channelpkey,newList)
                        .success(function(res) {
                            if (res.returncode == Constants.returncode.success) {
                                $log.debug(res);
                                strToast = "儲存成功！";
                                toastr.info(strToast);
                                setTimeout(function(){ 
                                    self.goPage(goTarget,newList);
                                }, 3000);
                            } else {
                                strToast = res.returnmsg;
                                toastr.warning(strToast);
                            }
                        });
                }
            };

            self.goPage = function(_target,_item){
                if(_target==='addPush'){                 
                    $state.go("main.ca-push.addpush",{jsonOject: _item,type:'pictext'});
                }else{
                    $state.go("main.ca-media.pictext-list");
                }
                
            };

            self.openPicModal = function() {
                var modalInstance = $modal.open({
                    template: require("../components/ui-widgets/message-editor/modal-pic.html"),
                    controller: "ModalPicCtrl",
                    controllerAs: "ctrl",
                    windowClass: "message-editor-pic-modal",
                    resolve: {
                        "channelpkey": function() {
                            return self.channelpkey;
                        }
                    }
                });

                modalInstance.result.then(function(selectpic) {
                    $log.debug("imgpath", selectpic.photo);
                    self.editArea.imgpath = selectpic.photo;
                    // self.item[self.now].imgpath = selectpic.photo;
                }, function() {
                    $log.debug('Modal dismissed');
                });
            };

            self.deleteImg = function(){
                self.editArea.imgpath = "";
            };

            self.checkFormat = function(_array){
                _array.map(function(_item,index) {
                    var thisArray = _item;
                    $log.debug("thisArray",thisArray);
                    if(thisArray.type==="html"){
                        thisArray.content = thisArray.editor;
                    }else{
                        thisArray.content = thisArray.urlLink;
                    }           
                });
            };

            self.checkLink = function(_array){
                _array.map(function(_item,index) {
                    var saveArray = _item;
                    $log.debug("saveArray",saveArray);
                    if(saveArray.showLink===false){
                        saveArray.link = '';
                    }          
                });
            };
        }
    ]);
};
