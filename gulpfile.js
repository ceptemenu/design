const gulp = require('gulp');
const changed = require('gulp-changed');

const tinypng = require('gulp-tinypng-compress');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const pug = require('gulp-pug');
const fsCache = require('gulp-fs-cache');
const autoprefix = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');

const browser_sync = require('browser-sync').create();

const images_path = './src/assets/img/**/*.{gif,svg,jpg,jpeg,png,webp}';
const fonts_path = './src/assets/fonts/**/*.{eot,svg,ttf,woff,woff2}';

gulp.task('css', function () {
    const cssFsCache = fsCache('tmp/csscache');

    return gulp.src('./src/scss/style.scss')
        .pipe(cssFsCache)
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'})).on('error', function (err) {
            console.log(err.toString());
            this.emit('end');
        })
        .pipe(autoprefix('last 15 version'))
        .pipe(sourcemaps.write('./maps'))
        .pipe(cssFsCache.restore)
        .pipe(gulp.dest('public/css'))
        .pipe(browser_sync.stream());
});

gulp.task('js', function () {
    const jsFsCache = fsCache('tmp/jscache');
    return gulp.src('./src/js/**/*.js')
        .pipe(jsFsCache)
        .pipe(uglify()).on('error', function (err) {
        console.log(err.toString());
        this.emit('end');
        })
        .pipe(jsFsCache.restore)
        .pipe(concat('all.js'))
        .pipe(gulp.dest('public/js'))
        .pipe(browser_sync.stream());
});

gulp.task('pug', function () {
    return gulp.src('./src/views/*.pug')
        .pipe(pug({
            pretty:true
        }).on('error', function (err) {
            console.log(err.toString());
            this.emit('end');
        }))
        .pipe(gulp.dest('public'))
        .pipe(browser_sync.stream());

});

gulp.task('move_images', function() {
	return gulp.src(images_path).pipe(gulp.dest('public/img'));
});

gulp.task('move_fonts', function() {
	return gulp.src(fonts_path).pipe(gulp.dest('public/fonts'));
});

gulp.task('watch', function () {
    browser_sync.init({
        server: 'public',
        files: ["dist/css/style.css", "dist/js/*.js", "dist/*.html"],
        browser: "chrome",
        online: true,
        tunnel: true,
    })
    gulp.watch('./src/views/**/*.pug', {usePolling:true},gulp.series('pug'));
    gulp.watch('./src/scss/**/*.scss', gulp.series('css'));
    gulp.watch('./src/js/**/*.js', gulp.series('js'));
    gulp.watch(fonts_path, gulp.series('move_fonts'));
    gulp.watch(images_path, gulp.series('move_images'));
});

gulp.task('default', gulp.series('css', 'js', 'pug', 'move_fonts', 'move_images'));
gulp.task('dev', gulp.series('default', 'watch'))
