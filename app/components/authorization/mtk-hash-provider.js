module.exports = function(ngModule) {

  //Ref:https://www.npmjs.com/package/node_hash
  ngModule.provider("MtkHash",function(){
    var hash = require('node_hash');
    var saltValue;
    return {
      setSalt:function(_saltValue){
        saltValue = _saltValue;
      },
      $get: function () {
        return {
          hash:function(_unhash){
            return hash.sha512(_unhash,saltValue);
          }
        };
      }
    };
  });

};