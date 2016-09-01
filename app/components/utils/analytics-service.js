module.exports = function(ngModule) {
    ngModule.service('Analytics',function() {
        var self = this;
        self.recordPageview = function(url) {
            ga('set', 'page', url);
            ga('send', 'pageview');
        };
    });
};
