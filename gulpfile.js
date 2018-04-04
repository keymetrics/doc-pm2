var gulp        = require('gulp');
var browserSync = require('browser-sync');
var sass        = require('gulp-sass');
var prefix      = require('gulp-autoprefixer');
var cp          = require('child_process');
var concat      = require('gulp-concat');
var sourcemaps  = require('gulp-sourcemaps');
const reload    = browserSync.reload;

var jekyll   = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';
var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};


gulp.task('css', function () {
  return gulp.src('_src/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('bundle.css'))
    .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('docs/assets/css'))
    .pipe(gulp.dest('_site/docs/assets/css'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('js', function() {
    return gulp.src(["docs/assets/js/**/*.js"])
        .pipe(gulp.dest("_site/docs/assets/js"))
        .pipe(browserSync.reload({stream:true}));
});


// Build the Jekyll Site
gulp.task('jekyll-build', function (done) {
    browserSync.notify(messages.jekyllBuild);
    return cp.spawn( jekyll , ['build'], {stdio: 'inherit'})
    // return cp.spawn( jekyll , ['build','--incremental'], {stdio: 'inherit'})
        .on('close', done);
    reload;
});



// Rebuild Jekyll & do page reload
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
    browserSync.reload();
});

// Wait for jekyll-build, then launch the Server
gulp.task('browser-sync', ['css', 'js', 'jekyll-build'], function() {
    browserSync({
        open: false,
        logPrefix: 'PM2',
        logFileChanges: true,
        server: {
            baseDir: '_site'
        }
    });
});


/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task('watch', function () {
    gulp.watch('_src/scss/**/*.scss', ['css']);
    gulp.watch(['_i18n/**/*','runtime/**/*','monitoring/**/*','enterprise/**/*'], ['jekyll-rebuild']);
    gulp.watch('docs/assets/js/*.js', ['js']);
    gulp.watch(['*.md','*/*.md'], ['jekyll-rebuild']);
    gulp.watch(['*.yml','_data/*.yml'], ['jekyll-rebuild']);
    gulp.watch(['*.index.html', '_layouts/*.html', '_includes/*.html', '_includes/*.md',
    '_posts/*'], ['jekyll-rebuild']);
});


/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', ['browser-sync', 'watch']);
