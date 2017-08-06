'use strict';

var fs = require('fs'),
    _ = require('underscore'),
    folderSrc = './src',
    slash = '/',
    allJS = '/**/!(*.spec).js',
    allHTML = '/**/*.html',
    allCSS = '/**/*.css',
    allSCSS = '/**/*.scss',
    preBuild = './.pre-build',
    libs = 'libs',
    distBuild = './dist',
    requireConfig = 'require.config.js',
    srcRequireConfig = folderSrc + slash + requireConfig,
    requireConfigFile = fs.readFileSync(srcRequireConfig),
    getRequireContent = function (property) {
        var configRequire,
            require = function (content) {
                if (_.isObject(content) && content[property]) {
                    configRequire = content[property];
                }
            };
        eval(requireConfigFile.toString());
        return configRequire;
    },
    negate = function (path1, path2) {
        path1 = path1 || '';
        path2 = path2 || '';

        return '!' + path1 + path2;
    };

module.exports = {
    negate: negate,
    paths: {
        src: folderSrc,
        srcIndex: folderSrc + slash + 'index.html',        
        srcJS: folderSrc + allJS,
        srcSpec: folderSrc + '/**/test/**/*.spec.js',
        srcHTML: folderSrc + allHTML,
        srcCSS: folderSrc + allCSS,
        srcSCSS: folderSrc + allSCSS,
        srcEngine: folderSrc + '/engine/**/*.*',
        srcLibs: folderSrc + slash + libs,
        srcLibsJS: folderSrc + slash + libs + allJS,
        srcRequireConfig: srcRequireConfig,
   
        requirejs: 'libs/requirejs/require',
        libs: libs,
        dist: distBuild,
        preBuild: preBuild,
        test: '.test',
        coverage: 'coverage',
        gulpTask: './gulp-tasks/'
    },
    files: {        
        requireConfig: requireConfig,
        cssBuilder: 'css-builder.js'
    },
    requireConfigPaths: getRequireContent('paths'),
    requireConfigShim: getRequireContent('shim')
};
