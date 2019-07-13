const gulp = require('gulp');

require('./api'); // eslint-disable-line import/no-unassigned-import
require('./front'); // eslint-disable-line import/no-unassigned-import

gulp.task('test', gulp.parallel('test-api', 'test-front'));
gulp.task('test-watch', gulp.parallel('test-watch-api', 'test-watch-front'));
