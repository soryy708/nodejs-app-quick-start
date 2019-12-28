const exec = require('child_process').exec;
const gulp = require('gulp');
const playSound = require('audio-play');
const loadSound = require('audio-loader');

let alertSound = null;


gulp.task('test-front', (done) => {
    exec('mocha "../build/front/**/*.test.js" --exit', async (err, stdout, stderr) => {
        console.log(stdout);
        console.log(stderr);
        if (err) {
            if (!alertSound) {
                alertSound = await loadSound('./alert.wav');
            }
            playSound(alertSound);
        }
        done();
    });
});

gulp.task('autotest-front', () => {
    return gulp.watch('../src/front/**/*.js', {ignoreInitial: false}, gulp.series('test-front'));
});
