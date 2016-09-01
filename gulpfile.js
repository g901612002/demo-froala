/*
 * Copyright (C) 2014 Scott Beck, all rights reserved
 *
 * Licensed under the MIT license
 *
 */
(function() {
    'use strict';

    var $ = require('gulp-load-plugins')();

    var del = require("del");
    var gulp = require("gulp");
    var runSequence = require('run-sequence');
    var rev = require('gulp-rev-append');
    var cssmin = require('gulp-cssmin');
    var imagemin = require('gulp-imagemin');
    var pngquant = require('imagemin-pngquant');
    var htmlmin = require("gulp-minify-html");
    var ngAnnotate = require('gulp-ng-annotate');
    var uglify = require('gulp-uglify');

    var browserSync = require("browser-sync");
    var browserSyncSpa = require("browser-sync-spa");

    var webpackConfig = require("./webpack.config.js");

    // karma
    var karma = require('karma').server;
    var KarmaConfig = require('path').join(__dirname, './karma.conf.js');

    // protractor
    var gulpProtractorAngular = require('gulp-angular-protractor');

    // ## Tasks

    // ### task clean
    // Cleans up dist directory using [del](https://github.com/sindresorhus/del).
    gulp.task("clean", function(done) {
        del(["dist/*"], done);
    });

    // Copy asset task
    gulp.task('copyasset', function() {
        gulp.src('app/images/**/*.*')
            .pipe(gulp.dest('dist/images/'));
    });

    gulp.task('minimg', function() {
        return gulp.src('dist/images/*')
            .pipe(imagemin(
                [imagemin.gifsicle({ interlaced: true }),
                    imagemin.jpegtran({ progressive: true }),
                    pngquant(),
                    imagemin.svgo({ plugins: [{ removeViewBox: false }] })
                ], { verbose: true }
            ))
            .pipe(gulp.dest('dist/images/'));
    });

    //Pages task
    gulp.task('pages', function() {
        return gulp.src('app/**/*.html')
            .pipe(rev())
            .pipe(gulp.dest('dist'));
    });

    gulp.task('jshint', function() {
        return gulp.src('app/**/*.js')
            .pipe($.jshint())
            .pipe($.jshint.reporter('jshint-stylish'));
    });

    gulp.task('mincss', function() {
        return gulp.src('dist/*.css')
            .pipe(cssmin())
            .pipe(gulp.dest('dist'));
    });

    gulp.task('htmlmin', function() {
        return gulp.src('dist/**/*.html')
            .pipe(htmlmin({empty: true}))
            .pipe(gulp.dest('dist'));
    });

    gulp.task('minjs', function() {
        return gulp.src('dist/*.js')
            .pipe(ngAnnotate())
            .pipe(uglify())
            .pipe(gulp.dest('dist'));
    });

    // ### task webpack
    // Builds the main.js and any resources (bootstrap uses a few)
    // into the dist directory. Uses [gulp-webpack](https://github.com/shama/gulp-webpack).
    gulp.task("webpack", ["jshint"], function() {
        return gulp.src("app/app.js")
            .pipe($.webpack(webpackConfig))
            .pipe(gulp.dest('dist'));
    });

    gulp.task("webpack-watch", ["jshint"], function() {
        webpackConfig.watch = true;
        return gulp.src("app/app.js")
            .pipe($.webpack(webpackConfig))
            .pipe(gulp.dest('dist'));
    });

    gulp.task('serve', function() {
        browserSync.use(browserSyncSpa({
            selector: "[ng-app]" // Only needed for angular apps
        }));
        browserSync({
            server: {
                baseDir: "./dist/"
            },
            startPath: "/"
        });

        gulp.watch(['app/**/*.html'], function(event) {
            gulp.src(event.path, { base: './app/' })
                .pipe(gulp.dest('dist'));
        });
        gulp.watch(['dist/**/*.*'], function(event) {
            browserSync.reload(event.path);
        });
    });

    // ### task test
    // Run tests in [Karma](http://karma-runner.github.io/) using [FantomJS](http://phantomjs.org/).
    gulp.task("test", function(done) {
        karma.start({
            configFile: KarmaConfig,
            singleRun: true
        }, done);
    });

    // Setting up the test task 
    gulp.task('protractor', function(callback) {
        gulp
            .src(['test/e2e/api-helper.js', 'test/e2e/login-spec.js'])
            .pipe(gulpProtractorAngular({
                'configFile': 'protractor.conf.js',
                'debug': false,
                'autoStartStopServer': true
            }))
            .on('error', function(e) {
                console.log(e);
            })
            .on('end', callback);
    });

    gulp.task('dev', function(cb) {
        runSequence(
            'clean',
            'copyasset',
            'pages',
            'webpack-watch',
            cb
        );
    });

    gulp.task('build', function(cb) {
        runSequence(
            'clean',
            'copyasset',
            'pages',
            'webpack',
            'minimg',
            'mincss',
            'htmlmin',
            'minjs',
            cb
        );
    });

    // ### task default
    // Run test by default.
    gulp.task("default", ["build"]);

})();
