(function() {
    require("./app.scss");

    var ngModule = angular.module('app', [
        'ui.bootstrap',
        'ui.bootstrap.datetimepicker',
        'ui.router',
        'uiRouterStyles',
        'ui.tree',
        'ngSanitize',
        'ngStorage',
        'ngResource',
        'validation.match',
        'angularFileUpload',
        'ngFileUpload',
        'isteven-multi-select',
        'ngAnimate',
        'toastr',
        "ui.checkbox",
        "bootstrapLightbox",
        "ngImgCrop",
        "froala",
        "ngAudio",
        "com.2fdevs.videogular",
        "com.2fdevs.videogular.plugins.controls",
        "com.2fdevs.videogular.plugins.overlayplay",
        "com.2fdevs.videogular.plugins.poster",
        "com.2fdevs.videogular.plugins.buffering",
        "info.vietnamcode.nampnq.videogular.plugins.youtube"
    ]);

    require("./appbeginrun")(ngModule);
    require("./appconfig/")(ngModule);
    require("./components/")(ngModule); //directives,services
    require("./main/")(ngModule);
})();
