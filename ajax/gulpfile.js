var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create();


//SASS
gulp.task('sass', () => {
    return new Promise(function (resolve, reject) {
    gulp.src('assets/scss/*.scss')
        .pipe(sass({
            outputStyle: 'expanded'
        }).on('error', sass.logError))
        .pipe(autoprefixer('last 2 versions', 'safari 5', 'ie 7-9'))
        .pipe(gulp.dest('./dist'))
    resolve();
    })
});


//BROWSER SYNC. already set in webpack.config.js
gulp.task('watch', () => {
    return new Promise(function (resolve, reject) {
        browserSync.init({
            server: {
                baseDir: "./dist/main.css"
            },
            notify: false
        });
        resolve();
    //run it if anything changes
        gulp.watch('assets/scss/*.scss', ['sass']) //I'll work here
    // After you detect & update changes on *.scss files, please update browser and CSS files (read-only browsers)
        gulp.watch(['./dist/*.css']).on('change', browserSync.reload);
    })
});    

//

