var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    rev = require('gulp-rev'),
    notify = require('gulp-notify'),
    batch = require('gulp-batch'),
    bower = require('gulp-bower'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    sass = require('gulp-ruby-sass'),
    uglify = require('gulp-uglify'),
    watch = require('gulp-watch'),
    rimraf = require('gulp-rimraf');

gulp.task('clean-js', function () {
    return gulp.src('public/js/main-*.js', {read: false})
        .pipe(rimraf({force: true}))
        .pipe(notify({message: 'Files Deleted'}));
});

gulp.task('jshint',function(){
    return gulp.src('resources/assets/scripts/**/*.js')
        // if flag is not defined default value is 'auto'
        .pipe(jshint.extract('auto'))
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('scripts', ['clean-js'], function () {
    return gulp.src('resources/assets/scripts/**/*.js')
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'))
        .pipe(rev())
        .pipe(concat('main.js'))
        .pipe(gulp.dest('public/assets/js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('public/assets/js'))
        .pipe(notify({message: 'Scripts task complete'}));
});

gulp.task('bower', function() {
    return bower()
        .pipe(gulp.dest('/'))
});

gulp.task('watch', function () {
    gulp.watch("resources/assets/scripts/**/*.js", ["scripts"]);
});