module.exports = function(ngModule) {
  
  ngModule.config(['MtkHashProvider',function (MtkHashProvider) {
    MtkHashProvider.setSalt('mtk86136982app');
  }]);

};