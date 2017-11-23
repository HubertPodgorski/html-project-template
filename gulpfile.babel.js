import babelify from 'babelify';
import browserSync from 'browser-sync';
import browserify from 'browserify';
import buffer from 'vinyl-buffer';
import gulp from 'gulp';
import autoprefixer from 'gulp-autoprefixer';
import plugins from 'gulp-load-plugins';
import source from 'vinyl-source-stream';
import cleanCSS from 'gulp-clean-css';
import "babel-polyfill"; 


/* ----------------- */
/* Development
/* ----------------- */

gulp.task('development', ['scripts', 'styles'], () => {
    browserSync({
        'server': './',
        'snippetOptions': {
            'rule': {
                'match': /<\/body>/i,
                'fn': (snippet) => snippet
            }
        }
    });

    gulp.watch('./src/scss/*.scss', ['styles', browserSync.reload]);
    gulp.watch('./src/scss/*/*.scss', ['styles', browserSync.reload]);
    gulp.watch('./dist/js/*.js', ['styles', browserSync.reload]);
    gulp.watch('./src/js/*.js', ['scripts']);
    gulp.watch('./*.html', browserSync.reload);
});

/* ----------------- */
/* Development styles only
/* ----------------- */

gulp.task('development-styles-only', ['styles'], () => {
    browserSync({
        'server': './',
        'snippetOptions': {
            'rule': {
                'match': /<\/body>/i,
                'fn': (snippet) => snippet
            }
        }
    });

    gulp.watch('./src/scss/*.scss', ['styles', browserSync.reload]);
    gulp.watch('./src/scss/*/*.scss', ['styles', browserSync.reload]);
    gulp.watch('./*.html', browserSync.reload);
});


/* ----------------- */
/* Scripts
/* ----------------- */

gulp.task('scripts', () => {
    return browserify({
        'entries': ['./src/js/index.js'],
        'debug': true,
        'transform': [
            babelify.configure({
                'presets': ['latest']
            })
        ]
    })
    .add(require.resolve('babel-polyfill'))
    .bundle()
    .on('error', function () {
        var args = Array.prototype.slice.call(arguments);

        plugins().notify.onError({
            'title': 'Compile Error',
            'message': '<%= error.message %>'
        }).apply(this, args);

        this.emit('end');
    })
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./dist/js/'))
    .pipe(browserSync.stream());
});


/* ----------------- */
/* Styles
/* ----------------- */

gulp.task('styles', () => {
    return gulp.src('./src/scss/*.scss')
        .pipe(plugins().sourcemaps.init())
        .pipe(plugins().sass().on('error', plugins().sass.logError))
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(plugins().sourcemaps.write())
        .pipe(gulp.dest('./dist/css/'))
        .pipe(browserSync.stream());
});

/* ----------------- */
/* Watch changes - no localhost
/* ----------------- */

gulp.task('watch-no-auto-reload', ['scripts', 'styles'], () => {
    gulp.watch('./src/scss/*.scss', ['styles', browserSync.reload]);
    gulp.watch('./src/scss/*/*.scss', ['styles', browserSync.reload]);
    gulp.watch('./src/js/*.js', ['scripts']);
    gulp.watch('./*.html', browserSync.reload);
});

/* ----------------- */
/* Taks
/* ----------------- */

gulp.task('default', ['development']);