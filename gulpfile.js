const path = require('path');
const gulp = require('gulp');
const gulpApidoc = require('gulp-apidoc');
const tslint = require('gulp-tslint');


gulp.task('apidoc', function () {
    gulpApidoc({
        config: path.join(__dirname, './'),
        src: [
            path.join(__dirname, 'src/application/controllers'),
        ],
        dest: path.join(__dirname, 'apidoc')
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
