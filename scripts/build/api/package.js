const gulp = require('gulp');
const rename = require('gulp-rename');
const pkg = require('pkg');

function packageApi(targets = ['host']) {
    const execPkg = pkg.exec;
    return execPkg([
        '../build/api/package.json',
        '--target', targets.join(','),
        '--out-path', '../build/api-pkg',
    ]);
}

gulp.task('package-api/executable', () => {
    return packageApi();
});

// TODO: What if not using SQLite?
gulp.task('package-api/addons/sqlite3', () => {
    return gulp.src('../build/api/node_modules/sqlite3/lib/binding/*/node_sqlite3.node')
        .pipe(rename('node_sqlite3.node'))
        .pipe(gulp.dest('../build/api-pkg'));
});

gulp.task('package-api/addons/bcrypt', () => {
    return gulp.src('../build/api/node_modules/bcrypt/lib/binding/bcrypt_lib.node')
        .pipe(gulp.dest('../build/api-pkg'));
});

gulp.task('package-api/addons', gulp.parallel('package-api/addons/sqlite3', 'package-api/addons/bcrypt'));

gulp.task('package-api', gulp.parallel('package-api/executable', 'package-api/addons'));
