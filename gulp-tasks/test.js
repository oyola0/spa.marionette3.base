'use strict';

var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    utils = require('./utils'),
    rename = require("gulp-rename"),
    transform = require('gulp-transform'),
    Server = require('karma').Server,
    _ = require('underscore'),
    globalVars = ['define', 'window', 'require'],
    jasmineGlobalVars = ['afterAll', 'afterEach', 'beforeAll', 'beforeEach', 'describe', 'expect', 'fail', 'fdescribe', 'fit','it', 'pending', 'spyOn', 'spyOnProperty', 'xdescribe', 'xit'],
    stylish = require('jshint-stylish');

var jslintTask = function (src, globalsKeys) {
    var globalsObject = {
        undef: true,
        unused: true,
        globals: {}
    };

    _.each(_.union((globalsKeys || []), globalVars), function (key) {
        globalsObject.globals[key] = true;
    });

    return gulp.src([src, utils.negate(utils.paths.srcLibsJS)])
        .pipe(jshint(globalsObject))
        .pipe(jshint.reporter(stylish))
        .pipe(jshint.reporter('fail'));
};

gulp.task('lint-js', function () {
    return jslintTask(utils.paths.srcJS);
});

gulp.task('lint-test', function () {
    return jslintTask(utils.paths.srcSpec, jasmineGlobalVars);
});

gulp.task('karma-config', function () {
    var options = {
        paths: JSON.stringify(utils.requireConfigPaths, null, 4),
        shim: JSON.stringify(utils.requireConfigShim, null, 4)
    };

    return gulp.src(utils.paths.gulpTask + 'test/*.template')
        .pipe(transform(function (content) {
            var template = _.template(content.toString());
            return template(options);            
        }))
        .pipe(rename({ extname: '.js' }))
        .pipe(gulp.dest(utils.paths.test));
});


gulp.task('start-karma', function (done) {
    new Server({        
        basePath: 'src/',
        //logLevel: 'DEBUG',
        frameworks: ['jasmine', 'requirejs'],
        files: [
            { pattern: '**/*.!(scss)', included: false },
            '../' + utils.paths.test + '/test-main.js',
        ],
        singleRun: true,
        exclude: [
            utils.files.requireConfig
        ],
        reporters: ['progress', 'coverage'],
        captureTimeout: 10000,
        browsers: ['PhantomJS'],
        preprocessors: {
            '!(libs)/**/!(*.spec).js': ['coverage']
        },
        coverageReporter: {
            includeAllSources: true,
            type: 'html',
            subdir: '.',
            dir: '../' + utils.paths.coverage + '/'
        }
    }, done).start();
});
