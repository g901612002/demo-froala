module.exports = function(ngModule) {
    ngModule.directive('datepickerPattern', function($modal,$log,$templateCache){
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope,elem,attrs,ngModelCtrl) {
              var dRegex = new RegExp(attrs.datepickerPattern);
              ngModelCtrl.$parsers.unshift(function(value) {
                if (typeof value === 'string') {
                  var isValid = dRegex.test(value);
                  ngModelCtrl.$setValidity('date',isValid);
                  if (!isValid) {
                    return undefined;
                  }
                }
                return value;
              });
            }
        };       
    });  
};