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
const wiredep = require('gulp-wiredep');
const useref = require('gulp-useref');
const browserSync = require('browser-sync').create();

gulp.task('default', ['clean'], function() {
	gulp.run('dev');
});

gulp.task('production', ['clean'], function() {
	gulp.run('build');
});

gulp.task('dev', ['build', 'watch', 'browser-sync']);
gulp.task('build', ['html', 'styles', 'scripts', 'assets']);

gulp.task('watch', function() {
	gulp.watch('src/styles/**/*.scss', ['styles']);
    gulp.watch('src/js/**/*.js', ['scripts']);
    gulp.watch(['./bower.json', 'src/index.html'], ['html']);
    gulp.watch('./src/assets/**/*.*'. ['assets']);
    gulp.watch('build/**/*.*').on('change', browserSync.reload);
});

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
	gulp.src('src/index.html')
		.pipe(wiredep({
			directory: 'bower_components/'
		}))
		.pipe(gulp.dest('build/'))
		.on('end', function() {
			gulp.run('useref');
		});
});

gulp.task('useref', function() {
	return gulp.src('build/index.html')
		.pipe(useref())
		.pipe(gulp.dest('build/'));
});

gulp.task('scripts', function() {
	return gulp.src('src/js/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('build/js'));
});

gulp.task('browser-sync', function() {
	browserSync.init({
		server: {
			baseDir: './build/'
		}
	});
});

gulp.task('assets', function() {
	return gulp.src('./src/assets/**/*.*')
		.pipe(gulp.dest(./build/assets));
});