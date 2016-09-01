module.exports = function(ngModule) {

    ngModule.directive('modalAlert', [
        '$modal',
        '$log',
        '$templateCache',
        function($modal,$log,$templateCache){
            return {
                restrict: 'AE',
                template:require("./modal-alert.html"),
                transclude:true,
                scope:{
                    modalAlertOkText:'@',
                    modalAlertCancelText:'@',
                    modalAlertTitle:'@',
                    modalAlertBodyText:'@',
                    modalAlertBodyTemplate:'=',
                    modalAlertOkClick:'&',
                    modalItem:'='
                },
                controller:function($scope){
                    $scope.modalAlertOpen = function(){
                        var modalOption = {
                            templateUrl:"modal-alert-inner.html",
                            controller:'modalAlertCtrl',
                            controllerAs:'ctrl',
                            resolve: {
                                modalInfo:function(){
                                    return {
                                        ok:$scope.modalAlertOkText,
                                        cancel:$scope.modalAlertCancelText,
                                        title:$scope.modalAlertTitle,
                                        bodyText:$scope.modalAlertBodyText,
                                        bodyTemplate:$scope.modalAlertBodyTemplate
                                    };
                                }
                            }
                        };
                        var modalInstance = $modal.open(modalOption);
                        modalInstance.result.then(function() {
                            //close
                            $scope.modalAlertOkClick($scope.modalItem);
                        }, function () {
                            //dismiss
                            $log.debug('Modal dismissed at: ' + new Date());
                        });
                    };
                }
            };
        }
    ]);

    ngModule.controller('modalAlertCtrl',[
        '$log',
        '$modalInstance',
        'modalInfo',
        function($log,$modalInstance,modalInfo) {
            var self = this;
            self.modalInfo = modalInfo;
            $log.debug(self.modalInfo);
            self.ok = function() {
                $modalInstance.close();
            };
            self.cancel = function() {
                $modalInstance.dismiss();
            };
            self.displayBtn = function(btntext){
                var display = false;
                if(!_.isEmpty(btntext)){
                    display = true;
                }
                return display;
            };
        }
    ]);
};