module.exports = function(ngModule) {
    ngModule.directive('imgFileInput', [
        "$log",
        "FileUploader",
        function($log,FileUploader) {
            return {
                restrict: 'AEC',
                template: require("./img-file-input.html"),
                controllerAs: 'ctrl',               
                scope:{
                    imgSrc:"=",
                    hasImg:"="
                },
                link: function($scope, element, attributes,controller) {
                },
                controller: function($scope) {
                    var self = this;
                    self.isImgFileInputDisplay = false;
                    self.hasImg = $scope.hasImg;

                    $scope.$watch("imgSrc", function(val){
                        self.imgSrc = val;
                    });

                    $scope.uploader = new FileUploader({
                      queueLimit: 1
                    });

                    // 清除 uploader 
                    function clear_uploader() {
                        $scope.uploader.clearQueue();
                        $scope.uploader.destroy();
                        angular.element("#imgfile").val("");
                    }

                    self.imgFileInputDisplay = function(_isDisplay) {
                        self.isImgFileInputDisplay = _isDisplay;
                        if(!_isDisplay){
                            clear_uploader();
                        }
                        $scope.$emit("toggleImgFileInputDisplay",{isDisplay:_isDisplay});                        
                    };  

                    self.imgDisplay = function(){
                      var isDisplay = false;
                      if(self.hasImg){
                        if(self.imgSrc && self.imgSrc.length>0){
                          isDisplay = true;
                        }
                      }
                      return isDisplay;
                    };        

                    // 按下選擇檔案按鈕
                    $scope.fileChange = function(element) {
                      var label = angular.element(element).val().replace(/\\/g, '/').replace(/.*\//, '');
                      $scope.$apply(function(scope) {
                          self.fileNew = element.files[0].name;
                          if (typeof(self.fileOrg) !== 'undefined') {
                              clear_uploader();
                          }
                          self.fileOrg = self.fileNew;
                          angular.element("#imgfile").val(label);
                          self.hasImg = true;
                      });
                    };

                    $scope.$on("changeImg",function(event, args){
                      angular.element("#imgfile").val(args.fileName);
                    });                  
                }
            };
        }
    ]);
};
