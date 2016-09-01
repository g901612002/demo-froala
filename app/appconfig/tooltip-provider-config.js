module.exports = function(ngModule) {

  ngModule.config(['$tooltipProvider', function($tooltipProvider) {
    $tooltipProvider.options({
        placement: 'bottom',
        appendToBody: true
    });
	$tooltipProvider.setTriggers({
        'show': 'hide'
    });
  }]);

};