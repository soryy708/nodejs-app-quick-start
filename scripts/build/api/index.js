const gulp = require('gulp');

require('./code'); // eslint-disable-line import/no-unassigned-import
require('./notCode'); // eslint-disable-line import/no-unassigned-import
require('./package'); // eslint-disable-line import/no-unassigned-import

gulp.task('build-api', gulp.parallel('build-api/code', 'build-api/non-code'));
gulp.task('watch-api', gulp.parallel('watch-api/code', 'watch-api/non-code'));
gulp.task('autobuild-api', gulp.parallel('build-api', 'watch-api'));
