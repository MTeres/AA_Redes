var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var nodemon = require('gulp-nodemon');
var rename = require('gulp-rename');
var browserSync = require('browser-sync');
var minifycss = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var reload = browserSync.reload;

gulp.task('sass', function() {
    gulp.src('www/scss/*.scss')
            .pipe(gulp.dest('www/styles'))
            .pipe(sass())
            .pipe(reload({ stream:true }))
            .pipe(rename({suffix: '.min'}))
            .pipe(gulp.dest('www/styles'))
});

gulp.task('uglify', function() {
    gulp.src('www/scripts/main.js')
            .pipe(uglify())
            .pipe(rename({suffix: '.min'}))
            .pipe(gulp.dest('www/scripts'))
            .pipe(reload({ stream:true }))
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
gulp.task('serve', ['sass','nodemon'], function() {
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
    gulp.watch('www/scripts/**/*.js', ['uglify'])
    gulp.watch(
        ['*.html', 'scripts/**/*.js'],
        {cwd:'www'},
        reload
    )
})