var gulp = require('gulp'),
    connect = require('gulp-connect'),
    gulpif = require('gulp-if'),
    minifyHtml = require('gulp-minify-html'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    watch = require('gulp-watch'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifyCss = require('gulp-minify-css'),
    argv = require('yargs').argv,
    sourcemaps = require('gulp-sourcemaps'),
    ghPages = require('gulp-gh-pages'),
    del = require('del');

var config = {
  dest: 'dist',
  src: 'src'
};

var buildChain = ['font', 'audio', 'html', 'css', 'js'];

gulp.task('default', ['clean'], function () {
  gulp.start(buildChain.concat('watch', 'serve'));
});

gulp.task('deploy', ['clean'], function () {
  return gulp.start('deploy:build');
});

gulp.task('deploy:build', buildChain, function () {
  return gulp.src(config.dest + '/**/*')
    .pipe(ghPages());
});

gulp.task('audio', function () {
  return gulp.src(config.src + '/audio/**/*')
    .pipe(gulp.dest(config.dest + '/audio'));
});

gulp.task('font', function () {
  return gulp.src(config.src + '/font/**/*')
    .pipe(gulp.dest(config.dest + '/font'));
});

gulp.task('clean', function (cb) {
  del(config.dest + '/**', cb);
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
  return gulp.src([
      config.src + '/js/app.js',
      config.src + '/js/**/!(init.js)',
      config.src + '/js/init.js'] )
    .pipe(sourcemaps.init())
      .pipe(concat('app.js'))
      .pipe(gulpif(argv.release, uglify()))
    .pipe(sourcemaps.write('.'))
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
