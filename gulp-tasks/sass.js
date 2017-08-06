'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    connect = require('gulp-connect'),
    rename = require("gulp-rename"),
    paths = require('./utils').paths,
    autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function () {
    return gulp
        .src('./src/**/index.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(rename(function (path) {
            path.dirname = path.dirname.replace('\\scss', '\\assets');
            return path;
        }))
        .pipe(gulp.dest(paths.src, { overwrite: true, mode: 750 }))
        .pipe(connect.reload());
});