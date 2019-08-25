const gulp = require('gulp');
const vinylSource = require('vinyl-source-stream');
const vinylBuffer = require('vinyl-buffer');
const uglify = require('gulp-uglify');
const sourceMaps = require('gulp-sourcemaps');
const browserify = require('browserify');
const babelify = require('babelify');
const babelConfig = require('../util/babelConfig').front;

function build(entries, destination) {
    const browserified = browserify({
        entries: entries,
        debug: true, // Enables sourcemaps
    }).transform(babelify.configure(babelConfig));

    return browserified.bundle()
        .pipe(vinylSource('app.js'))
        .pipe(vinylBuffer())
        .pipe(sourceMaps.init({loadMaps: true}))
        .pipe(uglify())
        .pipe(sourceMaps.write('.'))
        .pipe(gulp.dest(`../build/front/${destination}`));
}

gulp.task('build-front/javascript/registration', () => {
    return build(['../src/front/website/registration.js'], 'website');
});

gulp.task('build-front/javascript', gulp.parallel('build-front/javascript/registration'));

gulp.task('watch-front/javascript', () => {
    return gulp.watch('../src/front/**/*.js', gulp.series('build-front/javascript'));
});
