const exec = require('child_process').exec;
const gulp = require('gulp');

const nodeModules = '../src/api/node_modules/**/*';
const packageJson = '../src/api/package.json';
const nonCodeAssets = [
    '../src/api/**/*.json',
    '!' + packageJson,
    '!../src/api/package-lock.json',
    '!' + nodeModules,
];

gulp.task('build-api/non-code/node_modules', gulp.series(() => {
    return gulp.src(packageJson)
        .pipe(gulp.dest('../build/api'));
}, (done) => {
    exec('cd ../build/api && npm install', (err, stdout, stderr) => {
        console.log(stdout);
        console.error(stderr);
        done(err);
    });
}));

gulp.task('build-api/non-code/others', () => {
    return gulp.src(nonCodeAssets)
        .pipe(gulp.dest('../build/api'));
});

gulp.task('build-api/non-code', gulp.parallel('build-api/non-code/node_modules', 'build-api/non-code/others'));

gulp.task('watch-api/non-code/node_modules', () => {
    return gulp.watch([nodeModules, packageJson], {ignoreInitial: false}, gulp.series('build-api/non-code/node_modules'));
});

gulp.task('watch-api/non-code/others', () => {
    return gulp.watch(nonCodeAssets, {ignoreInitial: false}, gulp.series('build-api/non-code/others'));
});

gulp.task('watch-api/non-code', gulp.parallel('watch-api/non-code/node_modules', 'watch-api/non-code/others'));
