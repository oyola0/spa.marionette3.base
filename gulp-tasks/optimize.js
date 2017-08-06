'use strict';

var gulp = require('gulp'),
    utils = require('./utils'),
    LIBS_CORE = 'libs/core.js',
    paths = utils.paths,
    requirejsOptimize = require('gulp-requirejs-optimize'),
    _ = require('underscore'),
    transform = require('gulp-transform'),
    distRequireConfig = paths.preBuild + '/' + utils.files.requireConfig,
    modulesInApp = [],
    requireOptimizeConfig = {
        useStrict: true,
        preserveLicenseComments: false,
        paths: _.extend({}, utils.requireConfigPaths, {
            'core': 'libs/core',
            'normalize': 'libs/require-css/normalize',
            'css-builder': 'libs/require-css/css-builder',
            'handlebars': 'libs/handlebars/handlebars.runtime'
        }),
        shim: utils.requireConfigShim
    };


var buildRequire = function (baseUrl, mainConfigFile, exclude, otherOptions) {
    var options = _.clone(requireOptimizeConfig);
    otherOptions = otherOptions || {};

    if (otherOptions.out === LIBS_CORE) {
        options.paths = _.omit(options.paths, 'core', 'application');
    }

    return requirejsOptimize(_.extend({
        baseUrl: baseUrl,
        mainConfigFile: mainConfigFile,
        exclude: exclude && _.values(options.paths)
    }, otherOptions, options));
};

var buildRequireTask = function (src, requireTask) {
    return gulp.src(src)
        .pipe(requireTask)
        .pipe(transform(function (content) {
            content = content.toString();
            var result, regUrl = /url\s*\(([^\)]*?)\)/gmi;
            while ((result = regUrl.exec(content)) !== null) {
                var regGlobal = /(.*)\/(fonts|images)\/(.*)/gmi,
                    toReplaceUrl,
                    url = result[1];

                if (regGlobal.test(url)) {
                    toReplaceUrl = url.replace(regGlobal, 'globals/$2/$3');
                    content = content.replace(url, toReplaceUrl);
                }
            }

            return content;
        }))
        .pipe(gulp.dest(paths.dist));
};

gulp.task('optimize-modules', function () {
    return buildRequireTask(
        _.union([paths.preBuild + '/**/**/module.js',
            utils.negate(paths.preBuild, '/app/**/*.js')
        ], modulesInApp),
        buildRequire(paths.preBuild + '/', distRequireConfig, true));
});

gulp.task('optimize-app', function () {
    return buildRequireTask(
        [distRequireConfig],
        buildRequire(paths.preBuild + '/', distRequireConfig, false, {
            deps: [paths.requirejs],
            out: 'main.js',
            onModuleBundleComplete: function (data) {
                _.each(data.included, function (path) {
                    var regPath = /modules\/(.*)\/module.js/gmi,
                        regExec = regPath.exec(path);

                    if (regExec) {
                        modulesInApp.push(utils.negate(paths.preBuild, '/' + _.first(regExec)));
                    }
                });
            }
        }));
});


gulp.task('optimize-core', function () {
    return gulp.src(['src/engine/core.js'])
        .pipe(buildRequire('src/', paths.srcRequireConfig, true, {
            out: LIBS_CORE
        }))
        .pipe(gulp.dest(paths.preBuild));
});