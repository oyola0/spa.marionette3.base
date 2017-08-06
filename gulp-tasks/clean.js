'use strict';

var gulp = require('gulp'),
    paths = require('./utils').paths,
    clean = require('gulp-clean');

gulp.task('clean-pre-build', function () {
    return gulp.src(paths.preBuild, { read: false })
        .pipe(clean());
});

gulp.task('clean-coverage', function () {
    return gulp.src(paths.coverage, { read: false })
        .pipe(clean());
});

gulp.task('clean-karma-config', function () {
    return gulp.src(paths.test, { read: false })
        .pipe(clean());
});

gulp.task('clean-all', function () {
    return gulp.src([
            paths.preBuild,
            paths.dist,
            paths.srcLibs,
            paths.src + '/**/assets/*.css'], { read: false })
        .pipe(clean());
});