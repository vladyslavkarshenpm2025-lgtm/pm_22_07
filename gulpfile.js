const gulp = require('gulp');
const fileInclude = require('gulp-file-include');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename'); // Додано для перейменування файлу
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

// 2. Компіляція головного SCSS в index.min.css
function stylesTask() {
  return gulp.src('src/scss/main.scss') // Беремо тільки головний файл
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS())
    .pipe(rename('index.min.css')) // Задаємо назву за вимогами лабораторної
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
  return gulp.src('src/imgs/**/*', { encoding: false })
    .pipe(imagemin())
    .pipe(gulp.dest('dist/imgs'));
}

// 5. Копіювання CSS та JS файлів Bootstrap
function bootstrapCssTask() {
  return gulp.src('node_modules/bootstrap/dist/css/bootstrap.min.css')
    .pipe(gulp.dest('dist/css'));
}

function bootstrapJsTask() {
  return gulp.src('node_modules/bootstrap/dist/js/bootstrap.bundle.min.js')
    .pipe(gulp.dest('dist/js'));
}

// 6. Сервер BrowserSync та відслідковування змін (Watcher)
function serveTask() {
  browserSync.init({
    server: { baseDir: './dist' }
  });
  gulp.watch('src/**/*.html', htmlTask);
  gulp.watch('src/scss/**/*.scss', stylesTask); // Слідкує за всіма .scss, але запускає збірку через main.scss
  gulp.watch('src/js/**/*.js', scriptsTask);
  gulp.watch('src/imgs/*', imagesTask);
}

// Головний запуск всіх завдань
exports.default = gulp.series(
  gulp.parallel(bootstrapCssTask, bootstrapJsTask, htmlTask, stylesTask, scriptsTask, imagesTask),
  serveTask
);