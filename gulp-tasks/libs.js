'use strict';

var NODE_MODULES = 'node_modules/',
    gulp = require('gulp'),
    _ = require('underscore'),
    copyTaks = [],
    paths = require('./utils').paths,
    libs = [
        "mobile-detect/mobile-detect.js",
        "requirejs-text/text.js",
        "require-css/!(*.min).js",
        "requirejs/**/*.js",
        "i18n/i18n.js",
        "jquery/dist/jquery.js",
        "underscore/underscore.js",
        "handlebars/dist/+(handlebars|handlebars.runtime).js",
        "backbone/backbone.js",
        "backbone.radio/build/backbone.radio.js",
        "backbone.marionette/lib/backbone.marionette.js",
        "bootstrap/dist/+(fonts|css)/+(bootstrap.css|glyphicons-halflings-regular.*)"
    ];


gulp.task('copy-libs', function () {
    var libsSrc = _.map(libs, function(lib) {
        return NODE_MODULES + lib;
    });

    return gulp.src(libsSrc)
        .pipe(gulp.dest(function (file) {
            return paths.srcLibs + '/' + file.base.replace(/(.*)\\node_modules\\([^\\]*?)\\(.*)/g, '$2');
        }));
});
