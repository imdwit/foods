var gulp = require('gulp'),
  browserify = require('browserify'),
  source = require('vinyl-source-stream'),
  watch = require('gulp-watch'),
  rename = require('gulp-rename'),
  livereload = require('gulp-livereload');


gulp.task('default', function() {
  livereload.listen();
  watch(['./app/src/**/*', './style', 'index.html'], function() {
    gulp.run('bf');
  });
  watch(['./app/tests/js/testsource.js'], function() {
    gulp.run('tests');
  });
});

gulp.task('tests', function() {
  return browserify('./app/tests/js/testsource.js')
    .bundle()
    .pipe(source('tests.js'))
    .pipe(gulp.dest('./app/tests/js/'));
});

gulp.task('bf', function() {
  return browserify('./app/src/main.js')
    .bundle()
    .pipe(source('bundledup.js'))
    .pipe(gulp.dest('./build/'))
    .pipe(gulp.dest('./app/tests/js/'))
    .pipe(livereload());
});