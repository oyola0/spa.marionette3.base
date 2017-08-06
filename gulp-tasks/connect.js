'use strict';

var gulp = require('gulp'),
    connect = require('gulp-connect'),
    utils = require('./utils'),
    paths = utils.paths,
    open = require('gulp-open');

gulp.task('watch-all', function () {
    gulp.watch([paths.srcJS, utils.negate(paths.srcLibsJS)], ['js']);
    gulp.watch([paths.srcSCSS], ['sass']);
    gulp.watch([paths.srcHTML], ['html']);
});

gulp.task('html', function () {
    gulp.src(paths.srcHTML).pipe(connect.reload());
});

gulp.task('js', function () {
    gulp.src(paths.srcJS).pipe(connect.reload());
});

gulp.task('connectDevelop', function () {
    connect.server({
        root: paths.src,
        port: 9000,
        livereload: true
    })
    return gulp.src(paths.src).pipe(open({ uri: 'http://localhost:9000' }));
});

gulp.task('connectBuild', function () {
    connect.server({
        root: paths.dist,
        port: 9001
    });

    return gulp.src(paths.dist).pipe(open({ uri: 'http://localhost:9001' }));
});

gulp.task('open-coverage', function () {
    return gulp.src(paths.coverage).pipe(open({ uri: paths.srcIndex.replace('src', paths.coverage) }));
});