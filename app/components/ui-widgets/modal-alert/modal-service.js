//Ref:http://weblogs.asp.net/dwahlin/building-an-angularjs-modal-service
module.exports = function(ngModule) {
    ngModule.service("ModalService", [
        "$modal",
        "$modalStack",
        function($modal, $modalStack) {
            var modalDefaults = {
                backdrop: true,
                keyboard: true,
                modalFade: true,
                template: require("./modal-service-tpl.html")
            };

            var modalOptions = {
                closeButtonText: 'Close',
                actionButtonText: 'OK',
                headerText: 'Proceed?',
                bodyText: 'Perform this action?'
            };

            this.dismissAll = function() {
                $modalStack.dismissAll("dismiss all");
            };

            this.showModal = function(customModalDefaults, customModalOptions) {
                if (!customModalDefaults) customModalDefaults = {};
                customModalDefaults.backdrop = 'static';
                return this.show(customModalDefaults, customModalOptions);
            };

            this.show = function(customModalDefaults, customModalOptions) {
                //Create temp objects to work with since we're in a singleton service
                var tempModalDefaults = {};
                var tempModalOptions = {};

                //Map angular-ui modal custom defaults to modal defaults defined in service
                angular.extend(tempModalDefaults, modalDefaults, customModalDefaults);

                //Map modal.html $scope custom properties to defaults defined in service
                angular.extend(tempModalOptions, modalOptions, customModalOptions);

                if (!tempModalDefaults.controller) {
                    tempModalDefaults.controller = tempModalDefaultsCtrl;
                }

                tempModalDefaultsCtrl.$inject = ['$scope', '$modalInstance'];
                function tempModalDefaultsCtrl($scope, $modalInstance) {
                    $scope.modalOptions = tempModalOptions;
                    $scope.modalOptions.ok = function(result) {
                        $modalInstance.close(result);
                    };
                    $scope.modalOptions.close = function(result) {
                        $modalInstance.dismiss('cancel');
                    };
                    $scope.modalOptions.displayBtn = function(btntext) {
                        var display = false;
                        if (!_.isEmpty(btntext)) {
                            display = true;
                        }
                        return display;
                    };
                }

                return $modal.open(tempModalDefaults).result;
            };
        }
    ]);
};
