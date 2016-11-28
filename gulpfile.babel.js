import gulp from 'gulp';
import babel from 'gulp-babel';
import source from 'vinyl-source-stream';
import babelify from 'babelify';
import browserify from 'browserify';

gulp.task('transpile', () => {
  return gulp.src('./components/*.js')
         .pipe(babel({
           presets: ['es2015', 'react']
         }))
         .pipe(gulp.dest('./public'))
});

gulp.task('browserify', () => {

 return browserify('./src/app.js')
       .transform('babelify', {presets: ['es2015', 'react']})
       .bundle()
       .pipe(source('bundle.js'))
       .pipe(gulp.dest('./public'))
});
gulp.task('watch', () => {
  gulp.watch('./components/*.js', ['transpile', 'browserify']);
});


gulp.task('default', ['transpile', 'browserify']);
