module.exports = function(ngModule) {
    ngModule.directive('floatThead', [
      function () {
        return {
          restrict: 'A',
          link: function($scope, $element, $attrs) {
            $element.floatThead({
              scrollContainer: function($element){
                return $element.closest('.wrapper');
              },
              autoReflow:true
            });
          }
        };
      }
    ]);  
};