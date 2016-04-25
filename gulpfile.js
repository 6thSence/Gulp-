const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const cssnano = require('gulp-cssnano');
const rename = require('gulp-rename');
const compass = require('gulp-compass');
const clean = require('gulp-clean');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');

gulp.task('default', ['clean', 'build']);
gulp.task('build', ['html', 'styles', 'scripts']);

gulp.watch('src/styles/**/*.scss', ['styles']);

gulp.task('styles', function() {
	return gulp.src('src/styles/{main,about}.scss')
		.pipe(plumber({
			errorHandler: notify.onError(function(err) {
				return {
					title: 'Styles',
					message: err.message
				}
			})
		}))
		.pipe(sourcemaps.init())
		.pipe(sass())
		//.pipe(compass({
          //     config_file: './config.rb',
          //     css: 'stylesheets',
          //     sass: 'sass'
        //     }))
		.pipe(autoprefixer({
			browsers: ['last 2 versions']
		}))
		.pipe(concat('styles.css'))
		.pipe(cssnano())
		.pipe(sourcemaps.write())
		.pipe(rename('build.css'))
		.pipe(gulp.dest('build/styles'));
});

gulp.task('clean', function() {
	return gulp.src('build/')
		.pipe(clean());
})

gulp.task('html', function() {
	return gulp.src('src/**/*.html')
		.pipe(gulp.dest('build/'));
});

gulp.task('scripts', function() {
	return gulp.src('src/js/*.js')
		.pipe(concat('scripts.js'))
		.pipe(uglify())
		.pipe(gulp.dest('build/js'));
});