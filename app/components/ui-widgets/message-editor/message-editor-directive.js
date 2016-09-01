module.exports = function(ngModule) {

    ngModule.factory("MessageAPI",["$rootScope",function($rootScope){
        return {
            message:{},
            clearAll:function(){
                this.message = {};
            },
            clearContent:function(msgtype){
                this.message[msgtype] = "";
                if(msgtype === 'voice'){
                    $rootScope.clearAudiodata();
                }
            }
        };
    }]);

    ngModule.directive('messageEditor', [
    "$log",
    "$rootScope",
    "$modal",
    "Util",
    function($log,$rootScope,$modal,Util){
        var ctrl = function($scope, $modal,Util,MessageAPI){

            var self = this;

            self.init = function(){
                var nowLength = 0;
                self.word = "還可以輸入" + $scope.textMaxLength + "字";
                self.identity = angular.copy($scope.identity);
                self.idchange = false;
                $scope.msgapi = MessageAPI;
                $scope.messagetype = ($scope.messagetype) ? $scope.messagetype : 'text';
                $scope.msgapi.clearContent($scope.messagetype);
                if($scope.ngModel && $scope.ngModel.length>0){
                    switch($scope.messagetype){
                        case "text":{
                            nowLength = ($scope.ngModel) ? $scope.ngModel.length : 0;
                            $scope.msgapi.message.text = $scope.ngModel;
                            self.word = "還可以輸入" + ($scope.textMaxLength - nowLength) + "字";
                            break;
                        }
                        case "video":
                        case "voice":
                        case "pic":
                        case "pictext":
                        case "api":{
                            $scope.msgapi.message[$scope.messagetype] = $scope.ngModel;
                            break;
                        }
                    }
                }
            };

            self.showType = function(_messagetype){
                var isshow = false;
                if(_.includes($scope.options,_messagetype)){
                    isshow = true;
                }
                return isshow;
            };

            self.hasContent = function(_messagetype){
                var isShow = false;
                var message = $scope.msgapi.message || {};
                var content = message[_messagetype] || "";
                if(_.isString(content) &&  content.length>0){
                    isShow = true;
                }
                return isShow;
            };

            self.setMessageType = function(_messagetype){
                $scope.messagetype = _messagetype;
                $scope.ngModel = $scope.msgapi.message[_messagetype];
            };

            self.getAssetUrl = function(_url){
                return Util.getAssetUrl(_url);
            };

            self.openVoiceModal = function(){
                var modalInstance = $modal.open({
                    template:require("./modal-voice.html"),
                    controller:"ModalVoiceCtrl",
                    controllerAs:"ctrl",
                    windowClass: "message-editor-voice-modal",
                    resolve:{
                        "channelpkey":function(){
                            return $scope.channelpkey;
                        }
                    }
                });

                modalInstance.result.then(function (_selectvoice) {
                    $rootScope.clearAudiodata();
                    var voicestr = JSON.stringify(_selectvoice);
                    $scope.msgapi.message.voice = voicestr;
                    $scope.ngModel = $scope.msgapi.message.voice ;
                }, function () {
                    $rootScope.clearAudiodata();
                    $log.debug('Modal dismissed');
                });
            };

            self.openVideoModal = function(){
                var modalInstance = $modal.open({
                    template:require("./modal-video.html"),
                    controller:"ModalVideoCtrl",
                    controllerAs:"ctrl",
                    windowClass: "message-editor-video-modal",
                    resolve:{
                        "channelpkey":function(){
                            return $scope.channelpkey;
                        }
                    }
                });

                modalInstance.result.then(function (_selectvideo) {
                    var videostr = JSON.stringify(_selectvideo);
                    $scope.msgapi.message.video = videostr;
                    $scope.ngModel = $scope.msgapi.message.video ;
                }, function () {
                    $log.debug('Modal dismissed');
                });
            };

            self.openPicModal = function(){
                var modalInstance = $modal.open({
                    template:require("./modal-pic.html"),
                    controller:"ModalPicCtrl",
                    controllerAs:"ctrl",
                    windowClass: "message-editor-pic-modal",
                    resolve:{
                        "channelpkey":function(){
                            return $scope.channelpkey;
                        }
                    }
                });

                modalInstance.result.then(function (selectpic) {
                    $scope.msgapi.message.pic = selectpic.photo;
                    $scope.ngModel = $scope.msgapi.message.pic ;
                }, function () {
                    $log.debug('Modal dismissed');
                });
            };

            self.openPicTextModal = function(){
                var modalInstance = $modal.open({
                    template:require("./modal-pictext.html"),
                    controller:"ModalPicTextCtrl",
                    controllerAs:"ctrl",
                    windowClass: "message-editor-pictext-modal",
                    resolve:{
                        "channelpkey":function(){
                            return $scope.channelpkey;
                        }
                    }
                });

                modalInstance.result.then(function (selectpictext) {
                    var pictextstr = JSON.stringify(selectpictext);
                    $scope.msgapi.message.pictext = pictextstr;
                    $scope.ngModel = $scope.msgapi.message.pictext;
                }, function () {
                    $log.debug('Modal dismissed');
                });
            };

            self.changeAPI = function(){
                $scope.ngModel = $scope.msgapi.message.api;
            };

            self.changeText = function(){
                var nowLength;
                var maxLength = $scope.textMaxLength;
                $scope.ngModel = $scope.msgapi.message.text;
                if($scope.ngModel && $scope.ngModel.length>0){
                    if($scope.ngModel){
                        nowLength = $scope.ngModel.length;
                    }else{
                        nowLength = 0;
                    }
                    if (nowLength <= maxLength) {
                        if(nowLength<maxLength){
                            self.word = "還可以輸入" + (maxLength - nowLength) + "字";
                        }else{
                            self.word = "字數己達" + maxLength + "字上限";
                        }
                    }
                }else{
                    self.word = "還可以輸入" + $scope.textMaxLength + "字";
                }
            };

            $scope.$on("finishpicupload",function(event,data){
                if(data && data.length > 0){
                    $scope.msgapi.message.pic = _.first(data).path;
                    $scope.ngModel = $scope.msgapi.message.pic;
                }
            });

            $scope.$watch("identity",function(newVal,oldVal){
                if(_.isEqual(newVal,oldVal)){
                    self.idchange = false;
                }else{
                    self.idchange = true;
                }
            });

            $scope.$watch("ngModel",function(newVal,oldVal){
                var nowLength;
                var maxLength = $scope.textMaxLength;
                if(self.idchange){
                    $scope.messagetype = ($scope.messagetype) ? $scope.messagetype : 'text';
                    $scope.msgapi.clearAll();
                }
                switch($scope.messagetype){
                    case "text":{
                        $scope.msgapi.message.text = newVal;
                        if(newVal){
                            nowLength = newVal.length;
                        }else{
                            nowLength = 0;
                        }
                        if (nowLength > maxLength) {
                            $scope.ngModel = oldVal;
                        }
                        if(self.idchange){
                            self.changeText();
                        }
                        break;
                    }
                    case "video":
                    case "voice":
                    case "pic":
                    case "pictext":
                    case "api":{
                        $rootScope.clearAudiodata();
                        $scope.msgapi.message[$scope.messagetype] = newVal;
                        break;
                    }
                }
            },true);
        };
        var compile = function(tElement,tAttrs){
            return {
                "pre":function($scope,iElement,iAttrs,ctrl){
                    $scope.options = ["pictext","text","pic","voice","video"];
                    if($scope.extraOptions && $scope.extraOptions.length>0){
                        _.forEach($scope.extraOptions,function(_option){
                            $scope.options.push(_option);
                        });
                    }
                },
                "post":function($scope,iElement,iAttrs,ctrl){
                    $scope.msgapi.clearAll();
                }
            };
        };
        return {
            restrict: 'AE',
            template:require("./message-editor.html"),
            transclude:true,
            controllerAs:'ctrl',
            scope:{
                channelpkey:"=",
                editorName:"@",
                editorRequired:"@",
                textMaxLength:'@',
                ngModel: '=',
                messagetype: '=',
                identity:"=",
                extraOptions:"=",
            },
            require: 'ngModel',
            controller:ctrl,
            compile:compile
        };
    }]);
};