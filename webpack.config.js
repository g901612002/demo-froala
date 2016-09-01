var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  stats: { children: false },
  debug: true,
  entry: {
    app:"./app/app.js",
    vendor:
      [
        "jquery",
        "angular",
        "./vendor_components/froala_editor/css/froala_editor.css",
        "./vendor_components/froala_editor/js/froala_editor.js",
        "./vendor_components/froala_editor/css/froala_style.css",
        "./bower_components/angular-froala/src/angular-froala.js",
        "./bower_components/angular-froala/src/froala-sanitize.js",
        "./bower_components/angular-bootstrap/ui-bootstrap-tpls.js",
        "./bower_components/bootstrap-ui-datetime-picker/dist/datetime-picker",
        "bootstrap-sass!./bootstrap-sass.config.js",
        "./bower_components/angular-ui-router/release/angular-ui-router.js",
        "./bower_components/angular-ui-router-styles/ui-router-styles.js",
        "angular-sanitize",
        "angular-filter",
        "ngStorage",
        "angular-resource",
        'angular-validation-match',
        "lodash",
        "node_hash",
        "immutable",
        "videogular",
        "videogular-buffering",
        "videogular-controls",
        "videogular-overlay-play",
        "videogular-poster",
        "videogular-themes-default",
        "videogular-youtube",
        "./bower_components/angular-audio/app/angular.audio.js",
        "./bower_components/ng-img-crop/compile/unminified/ng-img-crop.js",
        "./bower_components/angular-animate/angular-animate.min.js",
        "./bower_components/font-awesome/scss/font-awesome.scss",
        "./bower_components/angular-file-upload/dist/angular-file-upload.min.js",
        "./bower_components/floatThead/dist/jquery.floatThead-slim.min.js",
        "./bower_components/angular-ui-tree/dist/angular-ui-tree.min.js",
        "./bower_components/angular-ui-tree/dist/angular-ui-tree.min.css",
        "./bower_components/angular-multi-select/isteven-multi-select.js",
        "./bower_components/angular-multi-select/isteven-multi-select.css",
        "./bower_components/angular-toastr/dist/angular-toastr.tpls.min.js",
        "./bower_components/angular-toastr/dist/angular-toastr.min.css",
        "./bower_components/angular-bootstrap-checkbox/angular-bootstrap-checkbox.js",
        "./bower_components/ng-file-upload/ng-file-upload.min.js",
        "./bower_components/angular-bootstrap-lightbox/dist/angular-bootstrap-lightbox.min.css",
        "./bower_components/angular-bootstrap-lightbox/dist/angular-bootstrap-lightbox.min.js",
        "./vendor_components/froala_editor/css/plugins/fullscreen.css",
        "./vendor_components/froala_editor/js/plugins/fullscreen.js",
        "./vendor_components/froala_editor/js/plugins/paragraph_format.js",
        "./vendor_components/froala_editor/js/plugins/font_family.js",
        "./vendor_components/froala_editor/js/plugins/font_size.js",
        "./vendor_components/froala_editor/css/plugins/colors.css",
        "./vendor_components/froala_editor/js/plugins/colors.js",
        "./vendor_components/froala_editor/js/plugins/align.js",
        "./vendor_components/froala_editor/js/plugins/link.js",
        "./vendor_components/froala_editor/css/plugins/table.css",
        "./vendor_components/froala_editor/js/plugins/table.js",
        "./vendor_components/froala_editor/css/plugins/image.css",
        "./vendor_components/froala_editor/js/plugins/image.js",
        "./vendor_components/froala_editor/css/plugins/image_manager.css",
        "./vendor_components/froala_editor/js/plugins/image_manager.js",
        "./vendor_components/froala_editor/css/plugins/line_breaker.css",
        "./vendor_components/froala_editor/js/plugins/line_breaker.js",
        "./vendor_components/froala_editor/js/plugins/inline_style.js",
        "./vendor_components/froala_editor/js/plugins/lists.js",
        "./vendor_components/froala_editor/js/plugins/quote.js",
        "./vendor_components/froala_editor/css/plugins/char_counter.css",
        "./vendor_components/froala_editor/js/plugins/char_counter.js",
        "./vendor_components/froala_editor/js/plugins/quote.js",
        "./vendor_components/froala_editor/js/plugins/entities.js",
        "./vendor_components/froala_editor/js/languages/zh_tw.js"
        //"./vendor_components/froala_editor/js/myplugins/custom_image.js",
      ]
  },
  output: {
    path: path.join(__dirname, './dist'),
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.html?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'raw'
      },
      {
        // imports?jQuery=jquery : 為了 bootstrap ，假如沒有jQery 要自己抓取
        // ExtractTextPlugin : 如果打包使用到 sass 和 compass 的話，會需要 node-sass,compass-mixins 其他 npm 來進行整合。
        test: /bootstrap-sass\/assets\/javascripts\//,
        loader: 'imports?jQuery=jquery'
      },
      { test: /\.css$/,
        loader: "style!css"
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(
          "style",
          "css"+
          "!sass?includePaths[]=" + path.resolve(__dirname, './node_modules/compass-mixins/lib') +
          "!import-glob-loader"
        )
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url?limit=10000&minetype=application/font-woff&name=fonts/[name].[ext]"
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file?name=fonts/[name].[ext]"
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        loader: "url?name=images/[name].[ext]"
      }
    ]
  },
  plugins: [
    /*  如果不特別對style做處理，在打包時是將require的css文件，直接輸出在html的head中，
        要獨立出.css文件必須使用到 extract-text-webpack-plugin */
    new ExtractTextPlugin("[name].css"),
    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery"
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
};

