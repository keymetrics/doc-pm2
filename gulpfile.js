const gulp = require('gulp');
const sass = require('gulp-sass');
const gutil = require('gulp-util');
const child = require('child_process');
const browserSync = require('browser-sync').create();
const prefix = require('gulp-autoprefixer');

const siteRoot = 'docs/';

// Serve static files and auto reload on CSS change
gulp.task('serve', () => {
  browserSync.init({
    files: [siteRoot + '/**'],
    port: 4010,
    proxy: 'localhost:4000'
  });

  gulp.watch('./_sass/**.scss', ['sass']);
});

// Start Jekyll
gulp.task('jekyll', () => {
  const jekyll = child.spawn('jekyll', [
    'serve',
    '--watch',
    '--incremental',
    '--drafts'
  ]);

  const jekyllLogger = (buffer) => {
    buffer.toString()
      .split(/\n/)
      .forEach((message) => gutil.log('Jekyll: ' + message));
  };

  jekyll.stdout.on('data', jekyllLogger);
  jekyll.stderr.on('data', jekyllLogger);
});

// Transpile scss
gulp.task('sass', function () {
  return gulp.src('./_sass/main.scss')
    .pipe(prefix())
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./docs/css'));
});

gulp.task('jekyll-build', (cb) => {
  const jekyll = child.spawn('jekyll', [
    'build'
  ]);

  const jekyllLogger = (buffer) => {
    buffer.toString()
      .split(/\n/)
      .forEach((message) => gutil.log('Jekyll: ' + message));
  };

  jekyll.on('exit', cb)
  jekyll.stdout.on('data', jekyllLogger);
  jekyll.stderr.on('data', jekyllLogger);
});

gulp.task('dist', ['jekyll-build'], function () {
  return gulp.src('./_sass/main.scss')
    .pipe(prefix())
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./docs/css'));
});

gulp.task('default', ['sass', 'jekyll', 'serve']);
