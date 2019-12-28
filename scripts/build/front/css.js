const gulp = require('gulp');
const sass = require('gulp-sass');
sass.compiler = require('node-sass');
const sourceMaps = require('gulp-sourcemaps');

const cssAssets = '../src/front/**/*.css';
const sassAssets = '../src/front/**/*.scss';
const sassOptions= {
    outputStyle: 'compressed',
};

gulp.task('build-front/css/plain', () => {
    return gulp.src(cssAssets)
        .pipe(gulp.dest('../build/front'));
});

gulp.task('build-front/css/sass', () => {
    return gulp.src(sassAssets)
        .pipe(sourceMaps.init())
        .pipe(sass(sassOptions).on('error', sass.logError))
        .pipe(sourceMaps.write())
        .pipe(gulp.dest('../build/front'));
});

gulp.task('build-front/css', gulp.series('build-front/css/plain', 'build-front/css/sass'));

gulp.task('watch-front/css/plain', () => {
    return gulp.watch(cssAssets, {ignoreInitial: false}, gulp.series('build-front/css/plain'));
});

gulp.task('watch-front/css/sass', () => {
    return gulp.watch(sassAssets, {ignoreInitial: false}, gulp.series('build-front/css/sass'));
});

gulp.task('watch-front/css', gulp.parallel('watch-front/css/plain', 'watch-front/css/sass'));
