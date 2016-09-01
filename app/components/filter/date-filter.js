module.exports = function(ngModule) {
    ngModule.filter('localTime', function($filter) {
        return function(input) {
            if (input === null || input === "") {
                return "";
            }
            var _date = $filter('date')(new Date(input), 'HH:mm:ss');
            return _date.toUpperCase();
        };
    });

    ngModule.filter('localDate', function($filter) {
        return function(input) {
            if (input === null || input === "") {
                return "";
            }
            var _date = $filter('date')(new Date(input), 'yyyy-MM-dd');
            return _date.toUpperCase();
        };
    });

    ngModule.filter('localDateTime', function($filter) {
        return function(input) {
            if (input === null || input === "") {
                return "";
            }
            var _date = $filter('date')(new Date(input), 'yyyy-MM-dd HH:mm:ss');
            return _date.toUpperCase();
        };
    });
};
