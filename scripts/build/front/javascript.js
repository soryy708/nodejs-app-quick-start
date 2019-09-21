const gulp = require('gulp');
const vinylSource = require('vinyl-source-stream');
const vinylBuffer = require('vinyl-buffer');
const uglify = require('gulp-uglify');
const sourceMaps = require('gulp-sourcemaps');
const watchify = require('watchify');
const browserify = require('browserify');
const babelify = require('babelify');
const babelConfig = require('../util/babelConfig').front;

const frontRoots = [
    // Add JS roots here
    'website/registration.js',
];

function createBundler(entry) {
    return browserify({
        entries: entry,
        debug: true, // Enables sourcemaps
        cache: {}, // Mandatory for watchify
        packageCache: {}, // Mandatory for watchify
    })
        .plugin(watchify, {
            ignoreWatch: ['**/node_modules/**']
        })
        .transform(babelify.configure(babelConfig));
}

function createBundlers() {
    function getDir(path) {
        const parts = path.split('/');
        if (parts.length === 0) {
            return parts;
        }
        return parts.slice(0, -1).join('/');
    }

    const srcPrefix = '../src/front/';
    return frontRoots.map((root) => {
        const bundler = createBundler(srcPrefix + root);
        return [bundler, getDir(root)];
    });
}

function bundle(bundler, dest) {
    return bundler.bundle()
        .pipe(vinylSource('app.js'))
        .pipe(vinylBuffer())
        .pipe(sourceMaps.init({loadMaps: true}))
        .pipe(uglify())
        .pipe(sourceMaps.write('.'))
        .pipe(gulp.dest('../build/front/' + dest))
        .on('error', console.error);
}

gulp.task('build-front/javascript', () => {
    const bundlers = createBundlers();
    bundlers.forEach(([bundler, dest]) => {
        bundle(bundler, dest);
    });
});

gulp.task('watch-front/javascript', () => {
    const bundlers = createBundlers();
    bundlers.forEach(([bundler, dest]) => {
        bundle(bundler, dest); // required for watchify to work
        bundler.on('update', () => {
            bundle(bundler, dest);
        });
    });
});
