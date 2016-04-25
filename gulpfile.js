const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const cssnano = require('gulp-cssnano');
const rename = require('gulp-rename');
const compass = require('gulp-compass');

gulp.task('default', ['html', 'styles', 'scripts']);

gulp.task('styles', function() {
	return gulp.src('src/styles/{main,about}.scss')
		//.pipe(sass())
		.pipe(compass({
               config_file: './config.rb',
               css: 'stylesheets',
               sass: 'sass'
             }))
		.pipe(autoprefixer({
			browsers: ['last 2 versions']
		}))
		.pipe(concat('styles.css'))
		.pipe(cssnano())
		.pipe(rename('build.css'))
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