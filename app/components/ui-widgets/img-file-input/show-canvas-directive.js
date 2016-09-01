module.exports = function(ngModule) {
    ngModule.directive('showCanvas', [
        '$log',
        '$window',
        function($log, $window) {
            var helper = {
                support: !!($window.FileReader && $window.CanvasRenderingContext2D),
                isFile: function(item) {
                    return angular.isObject(item) && item instanceof $window.File;
                },
                isImage: function(file) {
                    var type = '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
                    return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
                },
                isFileSmall500kb: function(file) {
                    return file.size / 1024 < 500;
                }
            };
            return {
                restrict: 'A',
                template: require("./show-canvas.html"),
                controllerAs: 'ctrl',
                link: function(scope, element, attributes,controller) {
                    var imgArea = element.find('.imgArea');
                    var canvas = element.find('canvas');
                    var filekb = element.find('.filekb');
                    var imgProblem = element.find('.imgProblem');

                    if (!helper.support) {
                        imgArea.hide();
                        imgProblem.html("不支援！請重新上傳檔案");
                        imgProblem.show();
                        return;
                    }
                    var params = scope.$eval(attributes.showCanvas);

                    if (!helper.isFile(params.file)) {
                        imgArea.hide();
                        imgProblem.html("不支援！請重新上傳檔案");
                        imgProblem.show();
                        return;
                    }
                    if (!helper.isImage(params.file)) {
                        imgArea.hide();
                        imgProblem.html("不支援檔案格式！請重新上傳檔案");
                        imgProblem.show();
                        return;
                    }
                    if (!helper.isFileSmall500kb(params.file)) {
                        imgArea.hide();
                        imgProblem.html("檔案大小超過500kb！請壓縮後重新上傳檔案");
                        imgProblem.show();
                        return;
                    }

                    var reader = new FileReader();
                    reader.onload = onLoadFile;
                    reader.readAsDataURL(params.file);

                    function onLoadFile(event) {
                        var img = new Image();
                        img.onload = onLoadImage;
                        img.src = event.target.result;
                    }

                    function onLoadImage() {
                        // 判斷寬高是否大於等於128
                        if (this.width <= 128 || this.height <= 128) {
                            imgProblem.html("");
                            imgProblem.hide();
                            imgArea.show();
                            // 判斷寬高是否一樣 
                            if (this.width == this.height) {
                                var width = params.width || this.width / this.height * params.height;
                                var height = params.height || this.height / this.width * params.width;
                                filekb.html(Math.ceil(params.file.size / 1024));
                                canvas.attr({
                                    width: width,
                                    height: height
                                });
                                canvas[0].getContext('2d').drawImage(this, 0, 0, width, height);
                                controller.setImg(this);
                            } else {
                                imgArea.hide();
                                imgProblem.html("圖片長寬不一致，請重新上傳。");
                                imgProblem.show();
                            }
                        } else {
                            imgArea.hide();
                            imgProblem.html("圖片大小超過128大小，請重新上傳。");
                            imgProblem.show();
                        }
                    }
                },
                controller: function($scope) {
                    var self = this;
                    self.setImg = function(_img){
                        // 抓取img src
                        var imgsrc = angular.element(_img).attr("src");
                        $scope.$emit("changeImg",{imgSrc:imgsrc,fileName:$scope.item._file.name});
                    };
                }
            };
        }
    ]);
};
