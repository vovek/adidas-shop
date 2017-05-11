var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')(),
    browserSync = require('browser-sync').create();


gulp.task('css', function() {
    gulp.src(['./src/sass/main.scss'])
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.sass({outputStyle: 'expanded'}).on('error', plugins.sass.logError))
        .pipe(plugins.autoprefixer())
        .pipe(plugins.sourcemaps.write())
        .pipe(gulp.dest('./public/css'))
        .pipe(browserSync.stream());
});

gulp.task('watch', function() {
    gulp.watch(['./src/sass/**/*.scss'], ['css']);
});

gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: './public'
        },
        browser: 'firefox'
    });
    gulp.watch(['public/*.html', 'src/sass/**/*.scss']).on('change', browserSync.reload)
});

gulp.task('default', ['css', 'watch', 'serve']);