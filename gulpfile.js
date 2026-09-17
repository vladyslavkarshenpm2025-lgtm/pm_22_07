const gulp = require('gulp');
const fileInclude = require('gulp-file-include');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();

// 1. Обробка HTML (вставка компонентів через fileInclude)
function htmlTask() {
  return gulp.src('src/index.html')
    .pipe(fileInclude())
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
}

// 2. Компіляція SCSS в CSS + мініфікація
function stylesTask() {
  return gulp.src('src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
}

// 3. Обробка JavaScript (мініфікація)
function scriptsTask() {
  return gulp.src('src/js/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.stream());
}

// 4. Оптимізація зображень
function imagesTask() {
  return gulp.src('src/imgs/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/imgs'));
}

// 5. Сервер BrowserSync та відслідковування змін (Watcher)
function serveTask() {
  browserSync.init({
    server: { baseDir: './dist' }
  });

  gulp.watch('src/**/*.html', htmlTask);
  gulp.watch('src/scss/**/*.scss', stylesTask);
  gulp.watch('src/js/**/*.js', scriptsTask);
  gulp.watch('src/imgs/*', imagesTask);
}

// Головний запуск всіх завдань
exports.default = gulp.series(
  gulp.parallel(htmlTask, stylesTask, scriptsTask, imagesTask),
  serveTask
);