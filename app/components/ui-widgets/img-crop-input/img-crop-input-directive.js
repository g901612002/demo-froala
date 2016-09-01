module.exports = function(ngModule) {
    ngModule.directive('imgCropInput', [
        "$log",
        function($log) {
            return {
                restrict: 'AEC',
                template: require("./img-crop-input.html"),
                controllerAs: 'ctrl',
                scope: {
                    imgSrc: "=",
                    hasImg: "="
                },
                link: function($scope, element, attributes, controller) {},
                controller: function($scope) {
                    var self = this;
                    self.isImgFileInputDisplay = false;
                    self.seeImgArea = false;
                    self.hasImg = $scope.hasImg;
                    $scope.myImage = '';
                    $scope.myCroppedImage = '';
                    $scope.fileName = '';

                    $scope.$watch("imgSrc", function(val) {
                        self.imgSrc = val;
                    });

                    // 清除 uploader 
                    self.clear_uploader = function() {
                        angular.element("#imgfile").val("");
                        $scope.myImage = '';
                        $scope.myCroppedImage = '';
                        $scope.fileName = '';
                        self.seeImgArea = false;
                    };

                    self.imgFileInputDisplay = function(_isDisplay) {
                        self.isImgFileInputDisplay = _isDisplay;
                        if (_isDisplay) {
                            self.clear_uploader();
                        }else{
                          if($scope.myImage && $scope.myImage.length>0){
                            $scope.$emit("changeImg",{imgSrc:$scope.myCroppedImage,fileName:$scope.fileName});
                          }
                        }
                        $scope.$emit("toggleImgFileInputDisplay", {
                            isDisplay: _isDisplay
                        });
                    };

                    self.imgDisplay = function() {
                        var isDisplay = false;
                        if (self.hasImg) {
                            if (self.imgSrc && self.imgSrc.length > 0) {
                                isDisplay = true;
                            }
                        }
                        return isDisplay;
                    };

                    self.saveImg = function(_isDisplay){
                      self.isImgFileInputDisplay = _isDisplay;
                      if($scope.myCroppedImage && $scope.myCroppedImage.length>0){
                        $log.debug("IN");
                        $scope.$emit("changeImg",{imgSrc:$scope.myCroppedImage,fileName:$scope.fileName});
                      }
                      $scope.$emit("toggleImgFileInputDisplay", {
                            isDisplay: _isDisplay
                        });
                    };

                    // 按下選擇檔案按鈕 
                    var handleFileSelect=function(evt) {
                      var file=evt.currentTarget.files[0];
                      self.seeImgArea = true;
                      self.hasImg = true;
                      var reader = new FileReader();
                      reader.onload = function (evt) {
                        $scope.$apply(function($scope){
                          $scope.myImage=evt.target.result;
                        });
                      };
                      reader.readAsDataURL(file);
                      $scope.fileName = file.name;
                      angular.element("#imgfile").val($scope.fileName);
                    };
                    angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);
                }
            };
        }
    ]);
};
