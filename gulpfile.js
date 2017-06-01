const gulp = require('gulp');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const nodemon = require('gulp-nodemon');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const browserSync = require('browser-sync');
const minifycss = require('gulp-minify-css');
const autoprefixer = require('gulp-autoprefixer');
const reload = browserSync.reload;
const browserify = require('gulp-browserify');

gulp.task('sass', function() {
    gulp.src('www/scss/*.scss')
            .pipe(gulp.dest('www/styles'))
            .pipe(sass())
            .pipe(reload({ stream:true }))
            .pipe(rename({suffix: '.min'}))
            .pipe(gulp.dest('www/styles'))
});

gulp.task('bundle', () => {
    gulp.src('www/**/main.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(concat('all.js'))
        .pipe(gulp.dest('www/js'));
});

gulp.task('final', function() {
    gulp.src('www/js/all.js')
    .pipe(browserify({
      insertGlobals : true,
      debug : !gulp.env.production
    }))
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('www/js/'))
})

gulp.task('nodemon', function (cb) {
    var callbackCalled = false;
    return nodemon({script: 'server.js'}).on('start', function () {
        if (!callbackCalled) {
            callbackCalled = true;
            cb();
        }
    });
});

// observa mudanças em arquivos na pasta SCSS e SCRIPTS
gulp.task('serve', ['sass', 'bundle', 'final', 'nodemon'], function() {
    browserSync.init(null, {
		proxy: "http://localhost:8081",
        port: 8082,
        logConnections: true,
        logLevel: 'debug',
		ghostMode: {
    		links: false
		}
    });

    gulp.watch('www/scss/**/*.scss', ['sass'])
    gulp.watch('www/scripts/**/*.js', ['bundle'])
    gulp.watch('www/js/all.js', ['final'])
    gulp.watch(
        ['*.html', 'scripts/**/*.js'],
        {cwd:'www'},
        reload
    )
})