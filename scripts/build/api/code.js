const gulp = require('gulp');
const babel = require('gulp-babel');
const sourceMaps = require('gulp-sourcemaps');
const babelConfig = require('../util/babelConfig').api;

const codeAssets = [
    '../src/api/**/*.js',
    '!../src/api/node_modules/**/*',
];

gulp.task('build-api/code', () => {
    return gulp.src(codeAssets)
        .pipe(sourceMaps.init())
        .pipe(babel(babelConfig))
        .pipe(sourceMaps.write('.'))
        .pipe(gulp.dest('../build/api'));
});

gulp.task('watch-api/code', () => {
    return gulp.watch(codeAssets, gulp.series('build-api/code'));
});
