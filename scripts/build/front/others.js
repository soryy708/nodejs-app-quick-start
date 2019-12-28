const gulp = require('gulp');

const imageAssets = [
    '../src/front/**/*.svg',
    '../src/front/**/*.jpg',
    '../src/front/**/*.jpeg',
    '../src/front/**/*.png',
    '../src/front/**/*.gif',
];
const htmlAssets = '../src/front/**/*.html';
const cssAssets = '../src/front/**/*.css';
const allAssets = imageAssets.concat([htmlAssets]).concat([cssAssets]);

gulp.task('build-front/others', () => {
    return gulp.src(allAssets)
        .pipe(gulp.dest('../build/front'));
});

gulp.task('watch-front/others', () => {
    return gulp.watch(allAssets, {ignoreInitial: false}, gulp.series('build-front/others'));
});
