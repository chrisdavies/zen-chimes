var gulp = require('gulp'),
    connect = require('gulp-connect'),
    gulpif = require('gulp-if'),
    minifyHtml = require('gulp-minify-html'),
    browserify = require('gulp-browserify'),
    watch = require('gulp-watch'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifyCss = require('gulp-minify-css'),
    argv = require('yargs').argv,
    del = require('del');

var config = {
  dest: 'dist',
  src: 'src'
};

gulp.task('default', ['clean', 'audio', 'html', 'css', 'js', 'watch', 'serve']);

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

gulp.task('css', function () {
  return gulp.src(config.src + '/css/main.scss')
    .pipe(sass())
    .on('error', function(err){
      console.log(err);
      this.emit('end');
    })
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulpif(argv.release, minifyCss()))
    .pipe(gulp.dest(config.dest + '/css'))
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
  watchAndRun('/**/*.scss', 'css');
});
