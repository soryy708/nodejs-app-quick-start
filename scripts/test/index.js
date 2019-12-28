const gulp = require('gulp');

require('./api'); // eslint-disable-line import/no-unassigned-import
require('./front'); // eslint-disable-line import/no-unassigned-import

gulp.task('test', gulp.parallel('test-api', 'test-front'));
gulp.task('autotest', gulp.parallel('autotest-api', 'autotest-front'));
