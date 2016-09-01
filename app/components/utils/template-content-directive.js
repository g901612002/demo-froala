module.exports = function(ngModule) {
    ngModule.directive('templateContent', ['$compile', function ($compile) {
      return {
        scope: true,
        link: function($scope, $element, $attrs) {
          var el;
          $attrs.$observe('template', function (tpl) {
            el = $compile('<div>'+tpl+'</div>')($scope);
            $element.html("");
            $element.append(el);
          });
        }
      };
    }]);  
};