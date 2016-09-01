module.exports = function(ngModule) {

    ngModule.controller('ModalVideoCtrl', [
        "$scope",
        "$modalInstance",
        "$log",
        "AUTHCODE",
        "Constants",
        "Util",
        "VideoService",
        function($scope,$modalInstance,$log,AUTHCODE,Constants,Util,VideoService){
            var self = this;

            self.init = function(){
                self.modalTitle = "請選擇影片";
                self.oldPage = 1;
                self.currentPage = 1;
                self.startpoint = 1;
                self.pagesize = 6;
                self.message = "";
                self.display = false;
                self.loadData();
            };

            self.loadData = function() {
                self.channelpkey = Util.getChannelPkey();
                AUTHCODE.CURRENT = AUTHCODE.CAROOT;
                VideoService
                    .getList(self.channelpkey, {
                        startpoint: self.startpoint,
                        pagesize: self.pagesize
                    })
                    .success(function(res) {
                        self.videolist = [];
                        self.totalcount = 0;
                        if (res.returncode == Constants.returncode.success) {
                            self.videolist = res.list;
                            self.frontCoverUrl(self.videolist);
                            self.message = "";
                            self.totalcount = res.totalcount;
                            self.oldPage = self.currentPage;
                        } else if (res.returncode == Constants.returncode.emptyresult) {
                            self.message = "尚未建立影片，可點擊右上角新建影片";
                        } else {
                            self.message = res.returnmsg;
                        }
                    });
            };

            self.frontCoverUrl = function(item) {
                if (item && item.length > 0) {
                    item.map(function(_item) {
                        var currentItem = _item;
                        if (currentItem.islink === 'Y') {
                            currentItem.type = "toutube";
                            var videoUrl = currentItem.video;
                            var queryString = {};
                            videoUrl.replace(
                                new RegExp("([^?=&]+)(=([^&]*))?", "g"),
                                function($0, $1, $2, $3) {
                                    queryString[$1] = $3;
                                }
                            );
                            currentItem.frontCover = 'http://img.youtube.com/vi/' + queryString.v + '/mqdefault.jpg';
                        } else {
                            currentItem.type = "video";
                            currentItem.video = Constants.url + currentItem.video;
                            currentItem.frontCover = Constants.url + currentItem.frontCover;
                        }
                        $log.debug("currentItem",currentItem);
                        return currentItem;
                    });
                }
            };

            self.pageChanged = function() {
                self.selectvideo = null;
                self.startpoint = self.startpoint + self.pagesize * (self.currentPage - self.oldPage);
                self.loadData();
            };

            self.displayVideo = function(_video){
                self.clearSelectVideo();
                self.displayvideo = _video;
                self.display = true;
                self.modalTitle = "影片播放";
            };

            self.backToList = function(){
                self.display = false;
                self.modalTitle = "請選擇影片";
            };

            self.clearSelectVideo = function(){
                self.videolist.map(function(obj){
                    obj.selected = false;
                    return obj;
                });
                self.selectvideo = null;
            };

            self.doSelectVideo = function(_video){
                self.clearSelectVideo();
                _video.selected = true;
                self.selectvideo = angular.copy(_video);
            };

            self.ok = function(){
                $modalInstance.close(self.selectvideo);
            };

            self.cancel = function() {
                $modalInstance.dismiss('cancel');
            };
        }
    ]);
};