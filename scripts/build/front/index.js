const gulp = require('gulp');

require('./javascript'); // eslint-disable-line import/no-unassigned-import
require('./others'); // eslint-disable-line import/no-unassigned-import

gulp.task('build-front', gulp.parallel('build-front/javascript', 'build-front/others'));
gulp.task('watch-front', gulp.parallel('watch-front/javascript', 'watch-front/others'));
gulp.task('autobuild-front', gulp.parallel('build-front', 'watch-front'));
