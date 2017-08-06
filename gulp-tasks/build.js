'use strict';

var gulp = require('gulp'),
    utils = require('./utils'),
    paths = utils.paths,
    rename = require("gulp-rename"),
    _ = require('underscore'),
    htmlmin = require('gulp-htmlmin'),
    defineModule = require('gulp-define-module'),
    handlebars = require('gulp-handlebars'),
    transform = require('gulp-transform'),
    cleanCSS = require('gulp-clean-css'),
    replace = require('gulp-replace'),
    htmlminOptions = { collapseWhitespace: true, removeComments: true, keepClosingSlash: true, collapseInlineTagWhitespace: true },
    time = Date.now();

var removeTextHtmlImports = function (content, relative) {
    var defineReg = /define\s*\(\s*\[([^\]]*?)\]/gmi,
        depsExec = defineReg.exec(content),
        deps = [];

    if (depsExec){
        try {
            deps = JSON.parse('[' + depsExec[1].trim().replace(/'/g, '"') + ']');
        } catch (error) {
            throw new Error('Error define ==> ' + relative);
        }
    }
    _.each(deps, function (dep) {
        var replaced, textHtmlReg = /text!(.*)\.html/gmi;
        if (textHtmlReg.test(dep)) {
            replaced = dep.replace(/text!/gmi, '').replace(/\.html/gmi, '');
            content = content.replace(dep, replaced);
        }
    });

    return content;
};

gulp.task('compile-handlebars', function () {
    return gulp.src([paths.srcHTML, utils.negate(paths.srcIndex)])
        .pipe(htmlmin(htmlminOptions))
        .pipe(handlebars({
            handlebars: require('handlebars')
        }))
        .pipe(defineModule('amd'))
        .pipe(rename({ extname: '.js' }))
        .pipe(gulp.dest(paths.preBuild));
});

gulp.task('css-min', function () {
    return gulp.src(paths.srcCSS)
        .pipe(cleanCSS({ keepSpecialComments: 0 }))
        .pipe(gulp.dest(paths.preBuild));
});

gulp.task('remove-js-text-plugin', function () {
    return gulp.src([
            paths.srcJS,
            utils.negate(paths.srcLibsJS),
            utils.negate(paths.srcEngine)])
        .pipe(transform(function (content, file) {
            content = content.toString();
            content = removeTextHtmlImports(content, file.relative);

            if (file.relative === utils.files.requireConfig) {
                content = content.replace('Date.now()', time);
            }

            return content;
        }))
        .pipe(gulp.dest(paths.preBuild));
});

gulp.task('copy-js-libs', function () {
    return gulp.src(paths.srcLibsJS)
        .pipe(transform(function (content, file) {
            if (file.relative.indexOf(utils.files.cssBuilder) >= 0) {
                content = content.toString();
                content = content.replace('path.dirname(config.out)', "(typeof config.out === 'string' && path.dirname(config.out)) || ''");
            }
            return content;
        }))
        .pipe(gulp.dest(paths.preBuild + '/' + paths.libs));
});

gulp.task('copy-fonts', function () {
    gulp.src([paths.src + '/**/*.+(eot|svg|ttf|woff|woff2|otf)'])
        .pipe(rename(function (path) {
            path.dirname = 'globals\\fonts';
            return path;
        }))
        .pipe(gulp.dest(paths.dist));
});

gulp.task('copy-images', function () {
    gulp.src([paths.src + '/**/*.+(png|jpg|gif)'])
        .pipe(gulp.dest(paths.dist));
});

gulp.task('optimize-index', function () {
    return gulp.src(paths.srcIndex)
        .pipe(replace(/<script(.*)require(.*)<\/script>/g, '<script src="main.js?v=' + time + '"><\/script>'))
        .pipe(htmlmin(htmlminOptions))
        .pipe(gulp.dest(paths.dist));
});
