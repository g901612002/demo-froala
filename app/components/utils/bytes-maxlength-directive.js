module.exports = function(ngModule) {
    ngModule.directive('bytesMaxlength', function() {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, element, attr, ctrl) {

        //計算字串的Byte長度
        //REF:http://www.puritys.me/docs-blog/article-107-String-Length-%E4%B8%AD%E6%96%87%E5%AD%97%E4%B8%B2%E9%95%B7%E5%BA%A6.html
        function stringBytes(_str){
          var n = _str.length;
          var charCode;
          var len = 0;
          for(var i = 0;i < n;i++){
            charCode = _str.charCodeAt(i);
            while( charCode > 0 ){
              len++;
              charCode = charCode >> 8;
            }
          }
          return len;
        }

        //自訂驗證器
        //REF:http://angularjs.io/how-to-create-a-custom-input-validator-with-angularjs/
        function customValidator(ngModelValue) {

          var maxlen = attr.bytesMaxlength;
          var bytelen = stringBytes(ngModelValue);

          if (bytelen <= maxlen) {
              ctrl.$setValidity('bytesMaxlength', true);
          } else {
              ctrl.$setValidity('bytesMaxlength', false);
          }
          return ngModelValue;
        }

        ctrl.$parsers.push(customValidator);

      }
    };
});
};