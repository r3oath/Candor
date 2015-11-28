var gulp   = require('gulp');
var candor = require('gulp-candor');
var stylus = require('gulp-stylus');

gulp.task('default', function() {
    return gulp
        .src('index.cdor')
        .pipe(candor())
        .pipe(gulp.dest('./'));
});