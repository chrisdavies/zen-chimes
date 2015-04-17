var gulp = require('gulp'),
    connect = require('gulp-connect'),
    minifyHtml = require('gulp-minify-html');

var config = {
  dest: 'dist',
  src: 'src'
};

gulp.task('default', ['html', 'serve']);

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
