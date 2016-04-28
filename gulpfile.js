var gulp = require('gulp'),
    rename = require('gulp-rename'),
    rev = require('gulp-rev'),
    notify = require('gulp-notify'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    watch = require('gulp-watch'),
    rimraf = require('gulp-rimraf');

gulp.task('clean-js', function () {
    return gulp.src('dist/*.js', {read: false})
        .pipe(rimraf({force: true}))
        .pipe(notify({message: 'Files Deleted'}));
});

gulp.task('jshint',function(){
    return gulp.src('src/**/*.js')
        // if flag is not defined default value is 'auto'
        .pipe(jshint.extract('auto'))
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('scripts', ['clean-js'], function () {
    return gulp.src('src/**/*.js')
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'))
        .pipe(rev())
        .pipe(concat('MiniMe.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('dist'))
        .pipe(notify({message: 'Scripts task complete'}));
});


gulp.task('watch', function () {
    gulp.watch("src/**/*.js", ["scripts"]);
});