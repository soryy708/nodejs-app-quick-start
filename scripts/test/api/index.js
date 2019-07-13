const exec = require('child_process').exec;
const gulp = require('gulp');
const playSound = require('audio-play');
const loadSound = require('audio-loader');

let alertSound = null;

gulp.task('test-api', (done) => {
    exec('mocha "../build/api/**/*.test.js" --exit', async (err, stdout, stderr) => {
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

gulp.task('test-watch-api', () => {
    return gulp.watch('../src/api/**/*.js', gulp.series('test-api'));
});

gulp.task('autotest-api', gulp.series('test-api', 'test-watch-api'));
