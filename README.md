Little Project Builder on Gulp

![wow](https://github.com/6thSence/assets-for-any-occasion/raw/master/200 (15).gif)

## gulpfile.js

```javascript
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

 // Задача с названием 'default' запускается автоматически по команде 'gulp' в консоле.
 // Эта конструкция работает синхронно, сначала выполняется задача 'clean' и только после ее завершнения запускается 'dev'.
 gulp.task('default', ['clean'], function() {
 	gulp.run('dev');
 });
 // Аналогично с предыдущей задачей.
 // Выполняет задача 'clean' и после ее завершения запускается 'build'.
 gulp.task('production', ['clean'], function() {
 	gulp.run('build');
 });
 // Задача 'dev' представляется собой сборку в режиме разработки.
 // Запускает build - сборку, watcher - слежку за файлами и browser-sync.
 gulp.task('dev', ['build', 'watch', 'browser-sync']);
 // Задача 'build' представляет собой сборку в режиме 'production'.
 // Собирает проект.
 gulp.task('build', ['html', 'styles', 'scripts', 'assets']);
 // Задача 'watch' следит за всеми нашими файлами в проекте и при изменении тех или иных перезапустает соответсвующую задачу.
 gulp.task('watch', function() {
 	gulp.watch('src/styles/**/*.scss', ['styles']); //стили
     gulp.watch('src/js/**/*.js', ['scripts']); //скрипты
     gulp.watch(['./bower.json', 'src/index.html'], ['html']); // html
     gulp.watch('./src/assets/**/*.*', ['assets']); //наши локальные файлы(картинки, шрифты)
     gulp.watch('src/**/*.*').on('change', browserSync.reload); //Перезапуск browserSynс
 });
 // Задача 'styles' выполняет сборку наших стилей.
 gulp.task('styles', function() {
 	return gulp.src('src/styles/{main,about}.scss')
 		.pipe(plumber({ // plumber - плагин для отлова ошибок.
 			errorHandler: notify.onError(function(err) { // nofity - представление ошибок в удобном для вас виде.
 				return {
 					title: 'Styles',
 					message: err.message
 				}
 			})
 		}))
 		.pipe(sourcemaps.init()) //История изменения стилей, которая помогает нам при отладке в devTools.
 		.pipe(sass()) //Компиляция sass.
 		.pipe(autoprefixer({ //Добавление autoprefixer.
 			browsers: ['last 2 versions']
 		}))
 		.pipe(concat('styles.css')) //Соединение всех файлом стилей в один и задание ему названия 'styles.css'.
 		.pipe(cssnano()) //Минификация стилей
 		.pipe(sourcemaps.write())
 		.pipe(rename('build.css')) //Переименование
 		.pipe(gulp.dest('build/styles'));
 });
 //Задача для удаление папки build.
 gulp.task('clean', function() {
 	return gulp.src('build/')
 		.pipe(clean());
 })

 gulp.task('html', function() {
 	gulp.src('src/index.html')
 		.pipe(wiredep({ //Добавление ссылок на плагины bower.
 			directory: 'bower_components/'
 		}))
 		.pipe(gulp.dest('build/'))
 		.on('end', function() { //запуск задачу 'useref' по завершению задачи 'html'.
 			gulp.run('useref');
 		});
 });

 gulp.task('useref', function() {
 	return gulp.src('build/index.html')
 		.pipe(useref()) //Выполняет объединение файлов в один по указанным в разметке html комментариев.
 		.pipe(gulp.dest('build/'));
 });

 gulp.task('scripts', function() {
 	return gulp.src('src/js/*.js')
 		.pipe(uglify()) //Минификация скриптов.
 		.pipe(gulp.dest('build/js'));
 });
 //Задача для запуска сервера.
 gulp.task('browser-sync', function() {
 	browserSync.init({
 		server: {
 			baseDir: './build/'
 		}
 	});
 });
 //Перемещение наших локальных файлов в папку build
 gulp.task('assets', function() {
 	return gulp.src('./src/assets/**/*.*')
 		.pipe(gulp.dest('./build/assets'));
 });
 ```