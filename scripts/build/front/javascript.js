const gulp = require('gulp');
const vinylSource = require('vinyl-source-stream');
const vinylBuffer = require('vinyl-buffer');
const uglify = require('gulp-uglify');
const sourceMaps = require('gulp-sourcemaps');
const browserify = require('browserify');
const babelify = require('babelify');
const babelConfig = require('../util/babelConfig').front;

gulp.task('build-front/javascript/registration', () => {
    const browserified = browserify({
        entries: ['../src/front/website/registration.js'],
    }).transform(babelify.configure(babelConfig));

    return browserified.bundle()
        .pipe(vinylSource('app.js'))
        .pipe(vinylBuffer())
        .pipe(sourceMaps.init({loadMaps: true}))
        .pipe(uglify())
        .pipe(sourceMaps.write('.'))
        .pipe(gulp.dest('../build/front/website'));
});

gulp.task('build-front/javascript', gulp.parallel('build-front/javascript/registration'));

gulp.task('watch-front/javascript', () => {
    return gulp.watch('../src/front/**/*.js', gulp.series('build-front/javascript'));
});
