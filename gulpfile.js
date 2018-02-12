const path = require('path');
const gulp = require('gulp');
const gulpApidoc = require('gulp-apidoc');
const tslint = require('gulp-tslint');


gulp.task('apidoc', function () {
    gulpApidoc({
        config: path.join(__dirname, './'),
        src: [
            path.join(__dirname, 'src/modules'),
            path.join(__dirname, 'node_modules/auth-service/controllers'),
            path.join(__dirname, 'node_modules/user-service/controllers'),
        ],
        dest: path.join(__dirname, 'static/apidoc')
    }, function(error) {
        if (error) {
            console.log(error);
        }
    });
});

gulp.task('tslint', () => {
    return gulp.src(['src/**/*.tsx', 'src/**/*.ts'])
        .pipe(tslint({
            formatter: 'stylish'
        }))
        .pipe(tslint.report({
            emitError: false,
            summarizeFailureOutput: true
        }));
});
