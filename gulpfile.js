var gulp   = require('gulp');
var candor = require('gulp-candor');
var stylus = require('gulp-stylus');

gulp.task('default', ['candor', 'stylus']);

gulp.task('candor', function() {
    return gulp
        .src('index.cdor')
        .pipe(candor())
        .pipe(gulp.dest('./'));
});

gulp.task('stylus', function() {
    return gulp
        .src('app.styl')
        .pipe(stylus())
        .pipe(gulp.dest('./'));
});