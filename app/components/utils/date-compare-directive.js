module.exports = function(ngModule) {
    ngModule.directive('higherEqualThan', [
        "$log",
        "$filter",
        function($log, $filter) {

            var link = function(scope, element, attr, ctrl) {
                var customValidator = function(ngModelValue) {

                    var strCompareDate, strModelDate, modelDate;
                    var yyyy, mm, dd;
                    var mmpad = "00";
                    var ddpad = "00";

                    if (ngModelValue) {
                        strCompareDate = attr.higherEqualThan.toString();
                        strCompareDate = strCompareDate.replace(/"/g, "");
                        strCompareDate = strCompareDate.replace(/-/g, "");
                        strCompareDate = strCompareDate.split("T")[0];
                        if (typeof ngModelValue === "string") {
                          ngModelValue = new Date(ngModelValue);
                        }
                        yyyy = ngModelValue.getFullYear().toString();
                        mm = (ngModelValue.getMonth() + 1).toString();
                        mm = mmpad.substring(0, mmpad.length - mm.length) + mm;
                        dd = ngModelValue.getDate().toString();
                        dd = ddpad.substring(0, ddpad.length - dd.length) + dd;

                        strModelDate = yyyy + mm + dd;

                        ctrl.$setValidity('higherEqualThan', parseInt(strModelDate, 10) >= parseInt(strCompareDate, 10));

                        return ngModelValue;
                    }

                }; //--- end customValidator

                ctrl.$parsers.push(customValidator);

                attr.$observe('higherEqualThan', function(newVal) {
                    customValidator(ctrl.$modelValue);
                });

            }; //--- end link

            return {
                require: 'ngModel',
                link: link
            };
        }

    ]); //--- end directive

    ngModule.directive('lowerEqualThan', [
        "$log",
        "$filter",
        function($log, $filter) {

            var link = function(scope, element, attr, ctrl) {
                var customValidator = function(ngModelValue) {

                    var strCompareDate, strModelDate, modelDate;
                    var yyyy, mm, dd;
                    var mmpad = "00";
                    var ddpad = "00";
                    if (ngModelValue) {
                        strCompareDate = attr.lowerEqualThan.toString();
                        strCompareDate = strCompareDate.replace(/"/g, "");
                        strCompareDate = strCompareDate.replace(/-/g, "");
                        strCompareDate = strCompareDate.split("T")[0];
                        if (typeof ngModelValue === "string") {
                          ngModelValue = new Date(ngModelValue);
                        }
                        yyyy = ngModelValue.getFullYear().toString();
                        mm = (ngModelValue.getMonth() + 1).toString();
                        mm = mmpad.substring(0, mmpad.length - mm.length) + mm;
                        dd = ngModelValue.getDate().toString();
                        dd = ddpad.substring(0, ddpad.length - dd.length) + dd;

                        strModelDate = yyyy + mm + dd;

                        ctrl.$setValidity('lowerEqualThan', parseInt(strModelDate, 10) <= parseInt(strCompareDate, 10));

                        return ngModelValue;
                    }

                }; //--- end customValidator

                ctrl.$parsers.push(customValidator);

                attr.$observe('lowerEqualThan', function(newVal) {
                    customValidator(ctrl.$modelValue);
                });
            }; //--- end link

            return {
                require: 'ngModel',
                link: link
            };
        }

    ]); //--- end directive

};
