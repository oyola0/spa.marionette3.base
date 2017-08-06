'use strict';

var gulp = require('gulp'),
    gulpSequence = require('gulp-sequence'),
    _ = require('underscore'),
    fs = require('fs');

var GULP_ROOT = './gulp-tasks/';

fs.readdirSync(GULP_ROOT).forEach(file => {
    if (!_.contains(['utils.js', 'test'], file)) {
        require(GULP_ROOT + file.replace('.js', ''));
    }
})

var libsSass = ['copy-libs', 'sass'];

gulp.task('lint', ['lint-js', 'lint-test']);

gulp.task('karma', gulpSequence(    
    _.union(['karma-config', 'clean-coverage'], libsSass),
    'start-karma',
    ['clean-karma-config', 'open-coverage']
));

gulp.task('test', gulpSequence('lint', 'karma'));

gulp.task('build', gulpSequence(
    'clean-all',    
    'test',
    ['optimize-core', 'copy-fonts', 'copy-images', 'css-min', 'compile-handlebars', 'remove-js-text-plugin', 'copy-js-libs'],
    ['optimize-index', 'optimize-app'],
    'optimize-modules',
    'clean-pre-build'
));

gulp.task('build-server', gulpSequence('build', 'connectBuild'));

gulp.task('develop', libsSass);
gulp.task('develop-server', gulpSequence('develop', 'connectDevelop', 'watch-all'));


