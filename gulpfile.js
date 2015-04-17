var gulp = require('gulp'),
    connect = require('gulp-connect'),
    minifyHtml = require('gulp-minify-html'),
    browserify = require('gulp-browserify'),
    watch = require('gulp-watch'),
    argv = require('yargs').argv,
    del = require('del');

var config = {
  dest: 'dist',
  src: 'src'
};

gulp.task('default', ['clean', 'audio', 'html', 'js', 'watch', 'serve']);

gulp.task('audio', function () {
  return gulp.src(config.src + '/audio/**/*')
    .pipe(gulp.dest(config.dest + '/audio'));
});

gulp.task('clean', function (cb) {
  del(config.dest, cb);
});

gulp.task('serve', function () {
  connect.server({
    root: config.dest,
    port: 8000,
    livereload: true
  });
});

gulp.task('html', function () {
  return gulp.src(config.src + '/**/*.html')
    .pipe(minifyHtml())
    .pipe(gulp.dest(config.dest))
    .pipe(connect.reload());
});

gulp.task('js', function () {
  return gulp.src(config.src + '/js/app.js')
    .pipe(browserify({
      insertGlobals: false,
      debug: !argv.release
    }))
    .pipe(gulp.dest(config.dest + '/js'))
    .pipe(connect.reload());
});

gulp.task('watch', function () {
  function watchAndRun(path, task) {
    watch(config.src + path, function () {
      gulp.start(task);
    });
  }

  watchAndRun('/**/*.js', 'js');
  watchAndRun('/**/*.html', 'html');
});
