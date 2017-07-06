var gulp = require('gulp'),
    minifyHtml = require('gulp-minify-html'),
    template = require('gulp-template'),
    templateCache = require('gulp-angular-templatecache');

var minifyHtmlOpts = {
    empty: true,
    cdata: true,
    conditionals: true,
    spare: true,
    quotes: true
};

gulp.task('bootstrap3', function () {
    gulp.src('template/bootstrap3/*.html')
        .pipe(template({catalog: false, shop:false}))
        .pipe(minifyHtml(minifyHtmlOpts))
        .pipe(templateCache('start-app-tpls-bootstrap3.js', {standalone: false, module: 'start.app'}))
        .pipe(gulp.dest('src'));
});

gulp.task('catalog-bootstrap3', function () {
    gulp.src('template/bootstrap3/*.html')
        .pipe(template({catalog: true, shop:false}))
        .pipe(minifyHtml(minifyHtmlOpts))
        .pipe(templateCache('start-app-catalog-tpls-bootstrap3.js', {standalone: false, module: 'start.app'}))
        .pipe(gulp.dest('src'));
});

gulp.task('shop-bootstrap3', function () {
    gulp.src('template/bootstrap3/*.html')
        .pipe(template({catalog: true, shop:true}))
        .pipe(minifyHtml(minifyHtmlOpts))
        .pipe(templateCache('start-app-shop-tpls-bootstrap3.js', {standalone: false, module: 'start.app'}))
        .pipe(gulp.dest('src'));
});

gulp.task('default', ['bootstrap3', 'catalog-bootstrap3', 'shop-bootstrap3']);