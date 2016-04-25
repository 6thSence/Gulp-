const gulp = require('gulp');

gulp.task('default', ['html', 'styles', 'scripts']);

gulp.task('styles', function() {
	return gulp.src('src/**/*.css')
		.pipe(gulp.dest('build/styles'));
});

gulp.task('html', function() {
	return gulp.src('src/**/*.html')
		.pipe(gulp.dest('build/'));
});

gulp.task('scripts', function() {
	return gulp.src('src/**/*.js')
		.pipe(gulp.dest('build/js'));
});